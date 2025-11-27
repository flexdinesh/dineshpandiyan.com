# Orchestrator-Subagent Agentic Workflow Pattern

This document describes a reusable pattern for breaking down complex tasks into independent subagent work with orchestration.

## When to Use This Pattern

Use this pattern when:
- Task has 5+ independent subtasks
- Subtasks can be parallelized
- Each subtask needs isolated context (avoid context pollution)
- Dependencies exist between task groups
- Total work exceeds comfortable context window (>50k tokens)

## Directory Structure

Create a task-specific directory under `PROMPTS/`:

```
PROMPTS/
└── YOUR-TASK-NAME/
    ├── PLAN.md              # Master plan with task list and dependencies
    ├── ORCHESTRATOR.md      # Orchestrator instructions
    ├── TASK-1.md           # Individual task specifications
    ├── TASK-2.md
    ├── TASK-N.md
    ├── work/               # Agent working directory (outputs go here)
    │   ├── [agent outputs]
    │   └── [deliverables]
    └── context/            # Optional: shared context files
        └── [reference files]
```

## Working Directory Convention

**CRITICAL**: All agent work must happen inside `PROMPTS/YOUR-TASK-NAME/work/`

- Agents create files in `work/` subdirectory
- Agents read source files from project root (read-only)
- Agents write outputs to `work/` (isolated workspace)
- Final deliverables moved from `work/` to project root after verification
- Keeps agent work contained and easy to clean up

## File Templates

### 1. PLAN.md Structure

```markdown
# [Project Name] Plan

## Overview
[Brief description of overall goal]

## Working Directory
All agent outputs go to: `PROMPTS/YOUR-TASK-NAME/work/`

Agents should NOT write files to project root during task execution.

## Independent Tasks Status

- [ ] **TASK-1**: [Brief description]
- [ ] **TASK-2**: [Brief description]
- [ ] **TASK-N**: [Brief description]

## Dependencies

Document which tasks must complete before others:
- TASK-1 must complete before TASK-3, TASK-4
- TASK-2 can run parallel with TASK-1
- TASK-5 depends on TASK-3 and TASK-4

## Parallel Execution Groups

**Group 1** (Sequential - Foundation):
1. TASK-1 (prerequisite for all)
2. TASK-2 (analysis/planning)

**Group 2** (After Group 1):
3. TASK-3 (base setup)

**Group 3** (Parallel - After TASK-3):
4. TASK-4
5. TASK-5
6. TASK-6
7. TASK-7

**Group 4** (After Group 3):
8. TASK-8 (integration)

## Success Criteria
- [Measurable outcome 1]
- [Measurable outcome 2]
- [Measurable outcome 3]

## Final Deployment
After all tasks complete, review outputs in `work/` and deploy to project root.
```

### 2. ORCHESTRATOR.md Structure

```markdown
# [Project Name] Orchestrator

You are orchestrating [project description] using independent subagents.

## Working Directory Setup

Before starting, create working directory:
```bash
mkdir -p PROMPTS/[TASK-DIR]/work
```

All agent outputs must go to `PROMPTS/[TASK-DIR]/work/`

## Your Job

1. Create `work/` directory if not exists
2. Read `PLAN.md` to understand task dependencies
3. Spawn parallel subagents for independent tasks
4. Track progress by updating PLAN.md status
5. Coordinate dependencies between task groups
6. Handle errors and retries if agents fail
7. Review outputs in `work/` directory after completion

## Execution Strategy

### Phase 1: [Phase Name] (Sequential)
Spawn agents for:
- TASK-X ([description]) - MUST complete first
- TASK-Y ([description]) - Can run parallel with TASK-X

Wait for completion before Phase 2.

### Phase 2: [Phase Name] (After Phase 1)
Spawn agent for:
- TASK-Z ([description])

Wait for completion before Phase 3.

### Phase 3: [Phase Name] (Parallel)
Spawn ALL these agents in parallel:
- TASK-A
- TASK-B
- TASK-C

Wait for all to complete before Phase 4.

### Phase N: Final Integration
Spawn agent for:
- TASK-FINAL ([description])

## How to Spawn Agents

For each task, use the Task tool with:
```
subagent_type: "general-purpose"
description: "TASK-X: [brief description]"
prompt: "
You are working on [project name].

IMPORTANT: Your working directory is PROMPTS/[TASK-DIR]/work/
Write all outputs to this directory. Do NOT write to project root.

Read these files:
- PROMPTS/[TASK-DIR]/TASK-X.md (your task spec)
- [other context files listed in TASK-X.md - READ ONLY]

Follow the steps in TASK-X.md exactly.
Complete all acceptance criteria.
Write all deliverables to PROMPTS/[TASK-DIR]/work/
Report results when done.

Work independently - your context is isolated from other agents.
Do not read or modify files outside your task scope.
"
```

## Progress Tracking

After each agent completes:
1. Update PLAN.md task status: `- [ ]` → `- [x]`
2. Verify outputs exist in `work/` directory
3. Check if next phase can start (dependencies satisfied)
4. Spawn next batch of agents
5. If agent fails, retry once or escalate

## Context Management

- Each agent sees only its TASK-X.md and specified context files
- Agents do not share context or state
- Orchestrator maintains global state via PLAN.md
- All agent outputs isolated in `work/` directory
- Use PLAN.md comments to communicate between phases

## Final Deployment

After all tasks complete:
1. Review all outputs in `work/` directory
2. Run tests/verification on outputs
3. Move verified files from `work/` to project root
4. Clean up `work/` directory or keep for reference

## Important Notes

- Create `work/` directory before spawning agents
- All agent outputs MUST go to `work/` subdirectory
- Agents read source files (read-only), write to `work/`
- Read PLAN.md dependencies carefully before spawning
- Spawn parallelizable tasks in a SINGLE message (multiple Task tool calls)
- Sequential tasks must complete before proceeding
- Update PLAN.md immediately after each completion
- Monitor for agent failures and retry if needed

## Completion Criteria

All tasks marked completed in PLAN.md:
- [x] TASK-1 through TASK-N complete
- [x] All outputs in `work/` directory verified
- [x] [Additional verification step]
- [x] [Final test passes]
- [x] Ready for deployment to project root
```

### 3. TASK-X.md Structure

```markdown
# TASK-X: [Task Name]

## Working Directory
**IMPORTANT**: Write all outputs to `PROMPTS/[TASK-DIR]/work/`

Do NOT write files to project root during task execution.

## Objective
[Clear, concise objective - what needs to be accomplished]

## Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement N]

## Context Files to Read
Read these files (READ ONLY):
1. `PROMPTS/[TASK-DIR]/TASK-X.md` - This file (your spec)
2. `path/to/source/file1` - [Why you need this]
3. `path/to/source/file2` - [Why you need this]

Do NOT modify these files.

## Steps to Execute

### 1. [Step Name]
[Detailed instructions]

Write output to: `PROMPTS/[TASK-DIR]/work/output-file-name`

```bash
# Example commands if applicable
```

### 2. [Step Name]
[Detailed instructions]

### N. [Final Step]
[Detailed instructions]

## Deliverables

All deliverables go to `PROMPTS/[TASK-DIR]/work/`

### 1. [Deliverable Name]
Create file: `PROMPTS/[TASK-DIR]/work/[filename]`

[Specification of what to create]

Example:
```
[Code example or template]
```

### 2. [Deliverable Name]
Create file: `PROMPTS/[TASK-DIR]/work/[filename]`

[Specification]

## File Organization

```
PROMPTS/[TASK-DIR]/work/
├── [deliverable-1]
├── [deliverable-2]
└── [deliverable-N]
```

## Acceptance Criteria Checklist

After completing work, verify:
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion N]
- [ ] All steps completed
- [ ] All deliverables created in `work/` directory
- [ ] No files written to project root
- [ ] Tested successfully

## Output Required

When done, report:
1. Files created (list paths in `work/` directory)
2. [What to report - e.g., "Test results"]
3. [What to report - e.g., "Any issues encountered"]

## Important Notes
- **Write all outputs to `work/` directory**
- Read project files (source context) but do not modify
- [Critical warning or constraint]
- [Special consideration]
- [Testing requirement]
- Keep scope limited to this task only
- Do not read or modify files outside task scope
```

## Usage Instructions

### Step 1: Plan Your Work

1. Break complex task into 5-15 independent subtasks
2. Identify dependencies between subtasks
3. Group tasks into parallel execution phases
4. Estimate context requirements per task (<20k tokens per task ideal)

### Step 2: Create Directory Structure

```bash
mkdir -p PROMPTS/YOUR-TASK-NAME/work
mkdir -p PROMPTS/YOUR-TASK-NAME/context  # optional
```

### Step 3: Write PLAN.md

- Specify working directory: `PROMPTS/YOUR-TASK-NAME/work/`
- List all tasks with brief descriptions
- Document dependencies clearly
- Define parallel execution groups
- Specify success criteria
- Note final deployment steps

### Step 4: Write ORCHESTRATOR.md

- Include working directory setup
- Define execution phases based on dependencies
- Specify how to spawn agents for each phase (include working dir in prompt)
- Include progress tracking instructions
- Add error handling notes
- Add final deployment/verification steps

### Step 5: Write TASK-X.md Files

For each task, create detailed specification:
- **Specify working directory at top**
- Clear objective and requirements
- Context files to read (minimize to essentials, READ ONLY)
- Step-by-step instructions (with working directory paths)
- Deliverables with paths in `work/` directory
- Acceptance criteria checklist (include "no files in project root")
- Output format for reporting back

### Step 6: Execute

Start new Claude Code session:
```
Follow instructions in PROMPTS/YOUR-TASK-NAME/ORCHESTRATOR.md
```

Orchestrator will:
1. Create `work/` directory
2. Read PLAN.md
3. Spawn agents in correct order (with working directory instruction)
4. Track progress
5. Update PLAN.md
6. Verify outputs in `work/`
7. Report completion

### Step 7: Deploy

After orchestrator completes:
1. Review all files in `work/` directory
2. Run tests/verification
3. Move verified files to project root
4. Update project files as needed
5. Clean up or archive `work/` directory

## Best Practices

### Context Management

- **Keep task context small**: Each TASK-X.md should reference <5 files
- **Isolate contexts**: Agents should not share state or read each other's outputs
- **Use PLAN.md for coordination**: Status updates, notes, cross-task communication
- **Minimize file reads**: Only include essential context files in task specs
- **Working directory isolation**: All outputs in `work/`, source files read-only

### Task Granularity

- **Too small**: <2k tokens of work, overhead dominates
- **Too large**: >30k tokens of context, agent loses focus
- **Sweet spot**: 5-15k tokens of work, clear deliverable, 1-3 hours of work

### Dependencies

- **Sequential**: Use when output of Task A is input to Task B
- **Parallel**: Use when tasks share no dependencies or outputs
- **Batch dependencies**: Group dependent tasks into phases
- **Document clearly**: Explicit dependency graph in PLAN.md

### Working Directory Benefits

1. **Isolation**: Agent outputs don't pollute project root
2. **Easy cleanup**: Delete `work/` to start over
3. **Review before deploy**: Verify all outputs before moving to project
4. **Parallel safety**: Multiple agents writing to `work/` without conflicts
5. **Rollback**: Keep project root clean until verification complete

### Error Handling

- **Agent fails**: Orchestrator retries once with clarified instructions
- **Wrong location**: If agent writes to project root, stop and correct
- **Partial completion**: Update PLAN.md with partial status, continue
- **Blocking failure**: Pause, fix issue, resume from failed task
- **Context overflow**: Split task into smaller subtasks

### Progress Tracking

- **Update PLAN.md immediately**: After each task completion
- **Use task list syntax**: `- [ ]` for pending, `- [x]` for completed
- **Add notes**: Comment on blockers, decisions, changes
- **Checkpoint**: Commit PLAN.md updates after each phase
- **Verify outputs**: Check `work/` directory after each task

## Example: Corrected Migration Structure

```
PROMPTS/
└── MIGRATION-ASTRO-HUGO/
    ├── PLAN.md
    ├── ORCHESTRATOR.md
    ├── TASK-1.md through TASK-10.md
    └── work/
        ├── hugo.toml            # TASK-1 output
        ├── layouts/
        │   ├── _default/
        │   │   ├── baseof.html   # TASK-3 output
        │   │   ├── list.html     # TASK-4 output
        │   │   └── single.html   # TASK-5 output
        │   └── index.html        # TASK-6 output
        ├── assets/
        │   └── css/
        │       └── main.css      # TASK-7 output
        └── FRONTMATTER-MAPPING.md  # TASK-2 output
```

After verification, move from `work/` to project root:
```bash
cp -r PROMPTS/MIGRATION-ASTRO-HUGO/work/layouts ./
cp -r PROMPTS/MIGRATION-ASTRO-HUGO/work/assets ./
cp PROMPTS/MIGRATION-ASTRO-HUGO/work/hugo.toml ./
```

## Advantages of This Pattern

1. **Context isolation**: Each agent sees only relevant files (5-10k tokens vs 100k+)
2. **Parallelization**: 6+ agents work simultaneously
3. **Focus**: Agents complete small, clear tasks without distraction
4. **Reliability**: Failures isolated to single task, easy retry
5. **Scalability**: Pattern works for 5-50 subtasks
6. **Reusability**: Template structure applies to any complex task
7. **Transparency**: PLAN.md shows progress, dependencies, status
8. **Clean workspace**: Outputs isolated in `work/`, project root stays clean
9. **Review before deploy**: Verify all outputs before moving to project
10. **Easy rollback**: Delete `work/` if something goes wrong

## Limitations

1. **Coordination overhead**: Orchestrator must manage dependencies
2. **Setup time**: Requires upfront planning and task breakdown
3. **No shared state**: Agents cannot directly share outputs (use files in `work/`)
4. **Manual updates**: PLAN.md must be updated manually by orchestrator
5. **Best for batch work**: Not ideal for exploratory/iterative tasks
6. **Extra step**: Must move files from `work/` to project root after verification

## When NOT to Use

- Simple tasks (<5 subtasks)
- Highly exploratory work (unclear requirements)
- Deeply interdependent tasks (can't parallelize)
- Real-time coordination needed
- Shared mutable state required
- Total work <10k tokens of context
- Direct modification of project files needed immediately

## Conclusion

This pattern transforms large, monolithic tasks into parallelized, focused work. The working directory convention keeps agent outputs isolated and project root clean until verification.

Use it for:
- Migrations (like Astro → Hugo)
- Large refactors
- Feature implementations
- Code generation
- Documentation generation
- Multi-step analysis

The upfront investment in planning and directory structure pays off through:
- Faster execution (parallel agents)
- Better focus (isolated contexts)
- Higher reliability (easy cleanup/retry)
- Safer deployment (review before moving to project)
- Cleaner project (no intermediate files in root)
