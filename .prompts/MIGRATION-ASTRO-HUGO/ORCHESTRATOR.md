# Migration Orchestrator

You are orchestrating the Astro → Hugo migration using independent subagents.

## Your Job

1. Read `PLAN.md` to understand task dependencies
2. Spawn parallel subagents for independent tasks
3. Track progress by updating PLAN.md status
4. Coordinate dependencies between tasks

## Execution Strategy

### Phase 1: Foundation (Sequential)
Spawn agents for:
- TASK-1 (Hugo setup) - MUST complete first
- TASK-2 (Frontmatter analysis) - Can run parallel with TASK-1

Wait for completion before Phase 2.

### Phase 2: Base Template (After Phase 1)
Spawn agent for:
- TASK-3 (baseof.html)

Wait for completion before Phase 3.

### Phase 3: Parallel Implementation (After Phase 2)
Spawn ALL these agents in parallel:
- TASK-4 (list.html)
- TASK-5 (single.html)
- TASK-6 (index.html)
- TASK-7 (CSS)
- TASK-8 (Theme toggle JS)
- TASK-10 (RSS/sitemap)

Wait for all to complete before Phase 4.

### Phase 4: Final Integration (After Phase 3)
Spawn agent for:
- TASK-9 (External link handling - needs templates from Phase 3)

## How to Spawn Agents

For each task, use the Task tool with:
```
subagent_type: "general-purpose"
description: "TASK-X: [brief description]"
prompt: "
You are working on the Astro → Hugo migration.

Read these files:
- PROMPTS/MIGRATION-ASTRO-HUGO/TASK-X.md (your task spec)
- [other context files listed in TASK-X.md]

Follow the steps in TASK-X.md exactly.
Complete all acceptance criteria.
Report results when done.

Work independently - your context is isolated from other agents.
"
```

## Progress Tracking

After each agent completes:
1. Update PLAN.md task status (pending → completed)
2. Check if next phase can start
3. Spawn next batch of agents

## Important Notes

- Agents work independently with isolated contexts
- TASK-1 MUST complete before others (Hugo installation required)
- TASK-3 MUST complete before TASK-4/5/6 (templates extend baseof)
- TASK-9 MUST complete after TASK-4/5 (needs templates to modify)
- Phase 3 tasks are fully parallelizable
- Update PLAN.md after each completion

## Completion Criteria

All tasks marked completed in PLAN.md:
- [x] TASK-1 through TASK-10 complete
- [x] Build runs successfully: `hugo server`
- [x] All pages render
- [x] Theme switching works
- [x] RSS and sitemap generated
