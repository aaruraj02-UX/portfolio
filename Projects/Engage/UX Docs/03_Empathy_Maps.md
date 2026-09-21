# Empathy Maps
## FieldSync Field App — Task Management & SLA Workflow Module

| Field          | Detail                                  |
|----------------|-----------------------------------------|
| **Project**    | FieldSync Field App — Task Module          |
| **Prepared by**| UX Team                                 |
| **Date**       | 10 March 2026                           |
| **Version**    | 1.0                                     |

---

## Overview

Empathy maps are produced for each of the three primary personas. They capture what each user **Thinks & Feels**, **Sees**, **Says & Does**, **Hears**, their **Pains**, and their **Gains** within the context of using the Task Management and SLA Workflow module.

---

## Empathy Map 1 — Ravi Krishnan (Field Agent / Assignee)

### Think & Feel

- *"I have 8 tasks today and I'm not sure which one to pick up first — the list just shows them all."*
- Feels anxious when SLA time is close but the interface doesn't urgently flag it.
- Frustrated when the comment validation blocks him without clear explanation of what's wrong.
- Feels relieved when a task is definitively closed and removed from his active list.
- Worried about being judged by his manager for Overdue tasks that weren't his fault (reassigned late).
- Thinks the mandatory comment is bureaucratic but understands it's for accountability.
- Feels lost when a task shows him as the new owner without context — "why was I escalated to?"
- Confident when he knows his SLA clock is ticking and he can see progress visually.
- ***Frustrated by notifications that appear repeatedly without a resolution path.***
- Feels more in control with a single, linear task list rather than a multi-panel grid.

### See

- The web task dashboard at the start of his shift — a list of tasks with status badges (Assigned, In Progress, Overdue).
- SLA progress indicators — potentially just a red/amber/green label or countdown.
- A mandatory comment input blocking the action button — a gating element.
- A reminder banner above the comment area telling him comments are required.
- A confirmation modal before any action is submitted.
- Push notifications on the field app mobile device when critical tasks are created.
- A task history panel showing who previously owned the task and what comments were made.
- Overdue tasks visually highlighted in red on the list — standing out from regular rows.
- A user-picker when a task needs to be reassigned (filtered to same area colleagues).
- The task ID (TASK-00001 format) which confirms his task is a real, trackable item.

### Say & Do

- *"Let me just pick In Progress and write a quick note."* — races through the comment to unblock the action.
- Opens the task detail, immediately looks at SLA time remaining before reading the full description.
- Scrolls through task history to understand context when a task has been escalated to him.
- Selects Completed as soon as he finishes the work — does not delay status updates.
- Types a comment, hits submit, expects the task to move off his list immediately.
- Calls his manager if he is unsure about a reprioritisation — the UI alone doesn't always clarify why.
- Ignores non-urgent notifications but acts immediately on critical task popups.
- Uses the business area filter to check if tasks from other areas have been routed to him incorrectly.

### Hear

- *"Why is this task still showing as overdue? Did you complete it or not?"* — from his manager.
- *"Remember, every action you take needs a comment — that's the process."* — from team briefing.
- *"We have a new critical task — motor fault in Zone 3, you need to pick it up now."* — system pop-up or verbal.
- *"The SLA for this one is 30 minutes — that means you need to start now."* — from colleagues.
- *"Your task history shows you reassigned this without a comment — we need that documented."* — compliance feedback.
- General team conversation: *"The grid is confusing — I don't know which section means what."*

### Pain Points

| Pain                              | Context                                                                                               |
|-----------------------------------|-------------------------------------------------------------------------------------------------------|
| **Overdue persistence**           | Tasks showing Overdue even after he believes they are resolved — no clear closure confirmation.       |
| **Comment validation opacity**    | Error message doesn't clearly explain which character was invalid or what the minimum length is.      |
| **Escalation context gap**        | Receives escalated tasks without sufficient context from the previous owner.                          |
| **Grid layout disorientation**    | Multi-panel task views create confusion about reading order and task priority.                        |
| **Notification noise**            | Repeated alerts for the same condition without a dismiss-with-reason option.                         |
| **SLA unclear at a glance**       | Time remaining is not immediately visible without opening the task detail.                           |
| **Re-entering known information** | Occasionally asked to enter details (area, name) that the system should already know from his profile. |
| **No structured rejection reason**| When rejecting a task, no guided reason picker exists — free-text only with no analytics value.       |

### Gains

| Gain                              | What would delight this persona                                                                       |
|-----------------------------------|-------------------------------------------------------------------------------------------------------|
| **Zero-confusion closure**        | A clear confirmation that a task is complete and removed from the active list immediately.            |
| **SLA visibility in list view**   | SLA status badge visible on the task card without opening the detail — saves time.                   |
| **Pre-populated context**         | Task detail automatically shows previous history so he understands why he was assigned without asking. |
| **Inline comment guidance**       | Character counter and allowed-character hint shown below the comment box from the start.              |
| **Linear task list**              | Single-column list with expandable cards — logical top-to-bottom reading order.                       |
| **Structured rejection flow**     | A guided reason picker when rejecting (Cancelling) a task — no blank comments needed.                |
| **One-tap critical acknowledgement** | Field app allows simple acknowledgement of critical task without full web login.                   |

---

## Empathy Map 2 — Priya Meenakshisundaram (Business Area Manager)

### Think & Feel

- *"I need to know which tasks are about to breach before I've even had my coffee."*
- Feels responsible for the SLA performance of her whole team — a task becoming Overdue reflects on her as well.
- Concerned when she sees multiple Approaching SLA tasks simultaneously — which one does she act on first?
- Feels frustrated when she must open each task record individually to see the full SLA countdown.
- Confident when the dashboard summary gives her an accurate at-a-glance picture of task health.
- Thinks about cross-area visibility — Motor tasks may overflow into Metering during peak periods.
- Feels anxious when escalations arrive without clear context — she cannot make a good reassignment decision without it.
- Values the audit trail as a way to reduce misunderstandings with her agents about ownership.
- Concerned about agents who don't add meaningful comments — audit trail entries become useless.

### See

- A Task Dashboard with metric tiles: Total, Inside SLA, Approaching SLA, Overdue — at the top of her view.
- A filterable task list below the tiles showing all tasks across her business area.
- SLA proximity visually encoded — a warning amber badge on approaching tasks; red on overdue.
- A business area switcher — tabs or segmented control — to move between Motor and any cross-area view.
- Task cards in a linear list format — collapsed by default, expandable on click.
- Quick filter chips: Overdue Only, Approaching SLA, By Agent, By Priority.
- The task history panel when she opens a task detail to understand prior ownership.
- Ad-hoc task creation entry point — a "Create Task" button in the task list header.
- Confirmation popups before reassignment or escalation actions are committed.
- Received notifications (popup) for Critical task creation events in her area.

### Say & Do

- *"Let me filter by Approaching SLA first — those are the ones I need to act on."*
- Drills into a task's history before reassigning to understand why it's unresolved.
- Makes the decision to reassign or escalate based on agent availability and task context.
- Writes a mandatory comment when reassigning — includes rationale for her own records.
- Creates ad-hoc tasks for operational instructions not generated by the system.
- Reviews completion stats and rejection reasons at end of week for process review meetings.
- Trains new agents on the mandatory comment requirement — sets team expectations.

### Hear

- *"Priya, can you reassign TASK-00045? The assigned agent called in sick today."* — from team member.
- *"Your area has 3 overdue tasks this morning — what's the plan?"* — from Admin / senior leadership.
- *"The system sent me a notification for that critical task but I couldn't find it on the list quickly."* — from an agent.
- *"Why has TASK-00032 been sitting In Progress for 6 hours with no update?"* — self-questioning through dashboard review.
- Reports from agents: *"The comment block is too strict — I can't write what I need to."*

### Pain Points

| Pain                              | Context                                                                                               |
|-----------------------------------|-------------------------------------------------------------------------------------------------------|
| **No SLA summary in list view**   | Must open each task to see time remaining — no quick SLA proximity in the task list row.             |
| **Cross-area context loss**       | When tasks cross business areas via escalation, area label is ambiguous.                             |
| **Non-meaningful audit entries**  | Agents write minimal comments ("ok" / "done") that add no audit value.                               |
| **Escalation without context**    | Receiving escalated tasks without understanding the reasoning from the previous owner.                |
| **Notification volume**           | Receiving notifications for every status change — wants escalation and SLA alerts only.              |
| **Dashboard doesn't self-refresh**| Needs to reload to see updated counts — stale data is a decision-making risk.                        |

### Gains

| Gain                              | What would delight this persona                                                                       |
|-----------------------------------|-------------------------------------------------------------------------------------------------------|
| **SLA progress in list rows**     | Amber/Red SLA pill on each task row without needing to open the task.                                |
| **Smart notification filtering**  | Only escalation and SLA threshold alerts — not every In Progress update.                             |
| **Business area switcher**        | Single click switches between Metering / Motor / Field within the same dashboard.                    |
| **Minimum comment enforcer**      | System rejects comments that are too vague — helps Priya get quality audit entries automatically.    |
| **Auto-refresh dashboard tiles**  | Metrics tiles update in near-real-time so she sees the current picture at all times.                 |
| **Task creation for ad-hoc work** | Quick-create form with assignment and comment field — no complex wizard.                             |

---

## Empathy Map 3 — Anitha Subramaniam (System Administrator)

### Think & Feel

- *"If I change the SLA for Critical from 30 to 20 minutes and nobody can prove I did it, that's a compliance failure."*
- Feels responsible for the integrity of the entire system — every configuration change carries risk.
- Confident when she can see a real-time, global view of task health across all business areas simultaneously.
- Concerned about rogue SLA changes made without proper documentation or rationale.
- Thinks about audit reports constantly — needs evidence that the system behaves as configured.
- Feels overwhelmed when task data is fragmented across multiple views without cross-area filtering.
- Values predictability — the system should behave consistently and log consistently everywhere.

### See

- An Admin Task Dashboard with global metrics — all areas combined, with filter capabilities.
- Business area filter panel — Metering, Motor, Field — with multi-select.
- The Business Configuration screen for SLA management — a table of priority/duration pairs with Edit controls.
- Confirmation modal when changing SLA values — with a required "reason for change" comment.
- The SLA Configuration audit trail — a list of every change with who, what, when, and why.
- Critical task notifications from all business areas.
- Task history entries for every task in the system — accessible via global search.
- Search results by task ID, agent name, task type, status.

### Say & Do

- *"I'm going to change Critical SLA to 25 minutes — let me record the reason as 'busier season adjustment'."*
- Reviews the SLA audit trail before a compliance meeting to confirm all configurations were documented.
- Runs global search to investigate a specific task ID raised in an escalation report.
- Exports task completion data for performance trend analysis.
- Manages user profiles and business area assignments to ensure reassignment filtering works correctly.
- Contacts manager when a task pattern suggests a training gap (e.g., agents consistently writing invalid comments).

### Hear

- *"Anitha, can you confirm what the SLA was set to for Critical tasks on 5 March?"* — compliance query.
- *"We need a report on all Overdue tasks from the Motor area last month."* — management request.
- *"The notification fired for a critical task in Metering — but it was the wrong threshold."* — bug report.
- *"Why can any user escalate to anyone? Shouldn't that be restricted to the same area?"* — business rule query.

### Pain Points

| Pain                              | Context                                                                                               |
|-----------------------------------|-------------------------------------------------------------------------------------------------------|
| **SLA change audit gaps**         | If config screen doesn't enforce a reason-for-change, audit trail is incomplete.                     |
| **Fragmented cross-area view**    | No single screen for global task health — must switch areas manually.                                |
| **Untracked configuration changes**| Current absence of full audit trail for SLA config feels like a compliance gap.                    |
| **Notification undifferentiation**| Cannot distinguish urgency of notifications — all look the same visually.                            |
| **No export capability**          | Cannot generate downloadable reports for compliance reviews without manual data extraction.           |

### Gains

| Gain                              | What would delight this persona                                                                       |
|-----------------------------------|-------------------------------------------------------------------------------------------------------|
| **Full SLA config audit trail**   | Every change logged with user, timestamp, old value, new value, and mandatory reason comment.        |
| **Global dashboard with area filter** | Single dashboard with multi-select filter for all business areas simultaneously.               |
| **Exportable task data**          | CSV/PDF export of filtered task lists and audit trails for compliance evidence packages.             |
| **Confirmation + reason gate**    | Confirmation modal on SLA changes requiring a reason — makes audit entry automatic.                  |
| **Search by task ID globally**    | Instantly retrieve any task record by TASK-00001 ID format across all areas.                         |
| **Differentiated notifications**  | Visual and audio distinction between Critical, Approaching SLA, and Overdue notifications.           |
