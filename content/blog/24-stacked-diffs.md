---
title: Stacked Diffs with `git rebase --onto`
slug: stacked-diffs-with-rebase-onto
description: Using git `rebase --onto` workflow to work with stacked diffs
date: 2025-12-01
params:
  featured: true
  external: false
---

_**tldr;** Use `git rebase --onto` to cleanly rebase a dependent branch without dragging along commits that don't belong to it._

```bash
git rebase --onto <new-base> <old-base> <branch>
```

If you've ever worked on a larger feature and split your work into multiple PRs that depend on each other, you've probably experienced the pain of keeping them in sync. This workflow is called **stacked diffs** (or stacked PRs), and it's incredibly powerful. But it comes with a learning curve. The secret weapon? `git rebase --onto`.

Here's what we'll cover:

- Why stacked diffs are worth the effort
- The difference between a regular `git rebase` and `git rebase --onto`
- Step-by-step: first sync, ongoing syncs, and post-merge cleanup

## Why Stacked Diffs?

Let's say you're building a large feature. You could dump everything into one massive PR, but reviewers hate that. Large PRs get superficial reviews (or no reviews at all), and you end up waiting forever for approvals.

**Stacked diffs** solve this by breaking your work into smaller, dependent PRs:

```text {linenos=false}
main
  └── feature-1 (auth layer)
        └── feature-2 (user profile)
              └── feature-3 (profile settings)
```

Each PR is small, focused, and easy to review. The catch? When `main` updates or when `feature-1` gets rebased, you need to sync all the downstream branches. That's where most people get stuck.

## Regular rebase vs rebase --onto

### Regular rebase

A regular `git rebase main` replays your commits on top of the target branch:

```text {linenos=false}
Before:
main:      A---B---C
                \
feature:         D---E

After git rebase main:
main:      A---B---C
                    \
feature:             D'---E'
```

Simple enough. But what happens with stacked branches?

### The Problem with Stacked Branches

Here's a typical stacked setup:

```text {linenos=false}
main:        A---B---C
                  \
feature-1:         D---E
                        \
feature-2:               F---G
```

Now `main` gets updated with new commits:

```text {linenos=false}
main:        A---B---C---H---I
                  \
feature-1:         D---E
                        \
feature-2:               F---G
```

You rebase `feature-1` onto `main`:

```text {linenos=false}
main:        A---B---C---H---I
                  \          \
old:               D---E      D'---E'  ← feature-1 (new hashes!)
                        \
feature-2:               F---G  ← Still based on old D---E!
```

See the problem? `feature-2` is still based on the **old** `D---E` commits. If you try a regular `git rebase feature-1` on `feature-2`, git will try to include those old commits again and you'll end up with duplicates or conflicts.

### Enter: git rebase --onto

This is where `git rebase --onto` shines. It lets you specify exactly which commits to move and where to put them:

```bash {linenos=false}
git rebase --onto <new-base> <old-base> <branch>
                      ↑          ↑          ↑
                new parent  old parent   branch to rebase
```

Think of it as saying: "Take everything after `<old-base>` on `<branch>`, and replay it onto `<new-base>`."

## Step-by-Step: Using rebase --onto

### First rebase --onto

When you first create `feature-2` off of `feature-1`, also create a marker branch:

```bash
git checkout feature-1
git checkout -b feature-2

# feature-2-base is your marker
# when you update feature-1 later,
# the marker will have feature-1 branch's previous state
git branch feature-2-base feature-1
```

The first time `main` updates and you need to sync your stack:

```bash
# 1. Rebase feature-1 onto main
git checkout feature-1
git rebase main

# 2. Rebase feature-2 onto the updated feature-1
git rebase --onto feature-1 feature-2-base feature-2

# 3. Update the marker branch after successful rebase
git branch -f feature-2-base feature-1
```

> That last step is critical. Without it, your next sync will break.

### Syncing main

Every time `main` updates, you repeat the same pattern:

```bash
# Rebase feature-1 onto main
git checkout feature-1
git rebase main

# Sync feature-2
git rebase --onto feature-1 feature-2-base feature-2
git branch -f feature-2-base feature-1  # ← Don't forget!
```

The marker update isn't optional. It's what makes repeat syncs work.

### Once a feature branch merges

When `feature-1` finally lands in `main`, you no longer need its commits in your `feature-2` history. Here's how to clean up:

```bash
git checkout feature-2
git rebase -i main
```

In the interactive rebase, you'll see all commits including the ones from `feature-1`:

```text {linenos=false}
pick abc123 D' ...  ← DELETE (from feature-1)
pick def456 E' ...  ← DELETE (from feature-1)
pick 789ghi F  ...  ← KEEP (your work)
pick 012jkl G  ...  ← KEEP (your work)
```

Delete (or mark as `drop`) the commits from `feature-1`, and Git will replay only your `feature-2` commits directly onto `main`.

### Putting it all together visually

```text {linenos=false}
BEFORE REBASE:
==============
main:             A---B---C---H---I
                       \
feature-1:              D---E              (needs rebase onto main)
                            ↑
feature-2-base:             * (marker pointing to E)
                             \
feature-2:                    F---G


AFTER REBASING FEATURE-1:
=========================
main:             A---B---C---H---I
                       \          \
old commits:            D---E      D'---E'  (feature-1, new hashes!)
                            ↑
feature-2-base:             * (still pointing to old E!)
                             \
feature-2:                    F---G         (orphaned on old commits)


AFTER REBASE --ONTO:
====================
main:             A---B---C---H---I
                                  \
feature-1:                         D'---E'
                                        ↑
feature-2-base:                         * (updated to new E')
                                         \
feature-2:                                F'---G'  (synced!)
```

## Closing Thoughts

`git rebase --onto` is one of those commands that looks intimidating but becomes second nature once you understand what each parameter does:

The marker branch pattern takes the guesswork out of tracking the old base. Use it, update it, and your stacked diffs will stay clean.

Here are a few thoughts to keep in mind when using this workflow:

1. **Force pushes are required**: Every rebase changes commit hashes, so you'll be doing `git push --force-with-lease` a lot.

2. **Marker branches need discipline**: If you forget to update your marker, your next sync will be painful. Consider aliasing the full command:

   ```bash
   alias gsync='git rebase --onto $1 $2-base $2 && git branch -f $2-base $1'
   ```

3. **Merge conflicts multiply**: If you have conflicts when rebasing `feature-1`, you might hit them again when rebasing `feature-2`. That's the nature of the beast.

4. **Don't stack too deep**: Two or three levels is manageable. Beyond that, the maintenance overhead outweighs the benefits. I personally try to keep it at 2 levels max.

Is this workflow more complex than just having one big branch? Absolutely. But the payoff (smaller PRs, faster reviews, and cleaner history) is worth the investment. Just remember to update those marker branches!

Happy rebasing! Have a great day!
