# User Journey Maps
## FieldSync Field App — Task Management & SLA Workflow Module

| Field          | Detail                                  |
|----------------|-----------------------------------------|
| **Project**    | FieldSync Field App — Task Module          |
| **Prepared by**| UX Team                                 |
| **Date**       | 10 March 2026                           |
| **Version**    | 1.0                                     |

---

## Overview

Four primary user journeys are documented representing the most critical and frequently-executed scenarios within the Task Management and SLA Workflow module. Each journey maps the user's stages, actions, thoughts, feelings (emotional curve), pain points, and UX opportunities end-to-end.

| Journey | Persona      | Scenario                                               |
|---------|--------------|--------------------------------------------------------|
| J-01    | Ravi (Agent) | Receive, action, and complete an assigned task          |
| J-02    | Ravi (Agent) | Handle a Critical task notification mid-shift           |
| J-03    | Priya (Manager) | Morning SLA review and at-risk task reassignment    |
| J-04    | Anitha (Admin) | Reconfigure SLA thresholds and review audit trail    |

---

## Journey J-01 — Agent: Receive, Action, and Complete an Assigned Task

**Persona:** Ravi Krishnan (Field Agent)
**Trigger:** Task TASK-00078 is created and assigned to Ravi at 08:15.
**End State:** Task is marked Complete, removed from active list, stored in Completed tab.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Awareness** — Task notified | Ravi receives a browser/app notification: "New task assigned: TASK-00078 — Water Meter Inspection — Metering" | "I have a new task. What's the priority? How long do I have?" | Neutral → Uncertain | No immediate SLA context in notification | Notification includes priority badge and SLA time (e.g., "High — 60 min SLA") |
| **2. Login & Navigation** — Access task list | Opens Engage web app; navigates to Tasks from left nav | "Which task should I start first — I have 4 already." | Slightly anxious | Task list shows all statuses mixed; no obvious prioritisation | Default sort: Priority descending, then SLA time ascending; SLA pill visible on each row |
| **3. Discovery** — Find the task | Scans list; spots TASK-00078 with amber "Approaching SLA" badge — only 42 minutes left | "That's approaching SLA already — how? It's new." | Surprised, concerned | SLA started at task creation — not communicated clearly | SLA timer explanation inline: tooltip "SLA starts when task is created" on clock icon |
| **4. Context Review** — Open task detail | Clicks to expand task card — reads description, sees task was just created with Assigned status | "OK, I know what I need to do. Let me get started." | Focused | No previous history to review (new task) — but no indicator that this is a new task with no prior history | Show "No previous history" placeholder in History section to confirm this is the first action |
| **5. Status Update** — Mark In Progress | Opens action dropdown; selects "Mark as In Progress" | "I should log this immediately to stop the SLA from being misrepresented." | Purposeful | Action labelling slightly formal ("Action Completed" label in original BRD) — user instinctively looks for "Complete" | Relabelled to "Mark as Complete"; dropdown options use natural language |
| **6. Comment Entry** — Write mandatory comment | Sees reminder banner at top of comment box: "A comment is required for every action." Starts typing: "Starting inspection now. Water meter at Zone 7 access point." (53 chars) | "Is this enough? What's the character limit?" | Slightly uncertain | Character limit not immediately visible | Live character counter: "53 / 100" shown below input on first keystroke; allowed characters listed |
| **7. Submission** — Submit action | Submit button was disabled — now enabled since comment is valid. Clicks Submit. | "Is it working? I don't want to click twice by accident." | Momentarily uncertain | No loading feedback during API call | Spinner on button during submission; toast on success: "TASK-00078 marked as In Progress" |
| **8. Confirmation** — Popup modal | Popup appears: "Confirm: Mark TASK-00078 as In Progress? This action will be recorded in the task history." | "Good — it tells me what it's going to do." | Reassured | Generic confirmation popup text that doesn't name the task | Dynamic popup message includes task ID and action name |
| **9. SLA Continues** — Works the task | Ravi performs the physical inspection for ~40 minutes. SLA is still running. | "I hope I have enough time — I can't see the countdown while I'm away from the screen." | Mildly anxious | SLA timer not visible while working away from screen | Field app push notification at 25% remaining: "TASK-00078: SLA approaches in 10 min" |
| **10. Return & Complete** — Mark Complete | Returns to task list; opens TASK-00078; selects "Mark as Complete"; writes comment: "Inspection complete. Meter reading recorded as 342 kWh. No faults observed." | "Is the task going to disappear? I want confirmation." | Focused, slightly apprehensive | No visual difference between task-in-progress and task-being-completed in the list until action is submitted | Completed tasks immediately move to Completed tab with toast: "TASK-00078 completed. View in Completed tab →" |
| **11. Closure Confirmation** — Task removed from active list | Active task list updates; TASK-00078 gone. Toast shows. Ravi clicks the Completed tab link to verify. | "Done. And it's in the completed list. Clean." | Relieved, satisfied | In prior experience, tasks stayed visible causing confusion about whether the close was successful | Clear, immediate removal + toast with Completed tab link removes ambiguity |

**Emotional Curve (J-01):**
Neutral → Uncertain → Concerned → Focused → Purposeful → Uncertain → Reassured → Anxious → Focused → Relieved → Satisfied

**Key Opportunities:**
- SLA context in notification payload
- Natural-language action labels
- Live character counter with allowed-char hint
- Dynamic confirmation popup with task ID
- Field app SLA approach notification
- Immediate removal + toast on completion

---

## Journey J-02 — Agent: Handle a Critical Task Mid-Shift

**Persona:** Ravi Krishnan (Field Agent)
**Trigger:** A Critical priority task is created and assigned to Ravi mid-shift (11:30). He is currently working on TASK-00081 (In Progress).
**End State:** Critical task acknowledged, actioned, and completed within 30-minute SLA.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Interruption** — Critical popup appears | Working on existing task. Suddenly a modal popup appears: "Critical Task Assigned: TASK-00087 — Motor Fault — Zone 3. Priority: Critical. SLA: 30 minutes. Action required immediately." Buttons: [Acknowledge] [View Full Details] | "What? 30 minutes — I need to stop what I'm doing right now." | Alarmed, urgent | Popup may appear on top of current work without context about existing task conflict | Popup includes "You are currently working on TASK-00081. Switching will not cancel it." |
| **2. Decision** — Prioritise Critical task | Clicks "Acknowledge" — task status set to In Progress automatically on acknowledgement | "I'll deal with TASK-00081 later — this takes priority." | Decisive | No way to quickly save or note progress on current task before switching | Optional: "Add a note to your current task before switching?" micro-UX moment |
| **3. Navigation** — Navigate to Critical task | Task list reorders — TASK-00087 appears at the top with "Critical" red badge and "30 min SLA" countdown | "There it is — right at the top. Good." | Focused | If list didn't re-sort automatically, finding the critical task could waste precious seconds | Critical tasks automatically sort to the top of the list; countdown visible on card |
| **4. Context Review** — Read task brief | Opens task detail — reads description of motor fault; no prior history (new task) | "OK, Zone 3. I know where that is. Let me go." | Very focused | Task description may be minimal for ad-hoc tasks | Ad-hoc task creation form encourages descriptive title and description field |
| **5. SLA Clock Visible** — Clock ticking | SLA countdown is visible in task detail header: "Approaching SLA — 22 min remaining" | "I'm losing time. I need to move." | Pressured | SLA is also counting business hours — Ravi unsure if a break would pause it | Tooltip on SLA countdown: "SLA is calculated within business hours (08:00–16:00)" |
| **6. Field Work** — Resolves the fault | Performs the motor fault check and resolves within 18 minutes | "Got it done. Now I need to log this." | Relieved | If back at desk: no issue. If on mobile: full task action requires web | Field app allows lightweight "Mark as Complete" with comment field for field-away scenario |
| **7. Complete** — Mark Complete with comment | Logs into web / uses field app; opens TASK-00087; selects "Mark as Complete"; writes: "Motor fault confirmed and resolved. Replaced fuse — unit operational. Zone 3 clear." | "Under 18 minutes — good." | Proud, relieved | Comment box on mobile must be keyboard-friendly without autocorrect interfering | Mobile comment box: disable autocorrect for operational text; large touch target |
| **8. SLA met** — Task shows Inside SLA on completion | TASK-00087 marked Complete before SLA expires; moves to Completed tab showing "Inside SLA" | "Done within SLA. That'll show up on my metrics." | Satisfied | Agent has no visibility of their own SLA performance metrics | Agent-facing metric on Completed tab: "SLA Met / SLA Missed" outcome per task |
| **9. Return to Previous Task** — TASK-00081 | Returns to active list; TASK-00081 still In Progress | "Good — it wasn't lost." | Settled | Task list may have reordered — TASK-00081 may no longer be at the top | Persisted scroll position or pinned indicator for "currently active" task |

**Emotional Curve (J-02):**
Neutral → Alarmed → Decisive → Focused → Very Focused → Pressured → Relieved → Proud → Satisfied → Settled

**Key Opportunities:**
- Critical popup includes task switchover context
- Auto-sort Critical tasks to top with countdown
- SLA business-hours tooltip
- Field app completion action
- Agent-level SLA outcome metric on Completed tab

---

## Journey J-03 — Manager: Morning SLA Review and At-Risk Task Reassignment

**Persona:** Priya Meenakshisundaram (Business Area Manager)
**Trigger:** Priya opens the Engage dashboard at 08:00 to review task health across the Motor business area.
**End State:** At-risk tasks identified, one reassigned before SLA breach, dashboard reflects updated state.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Dashboard Open** — Review metrics | Opens Engage; navigates to Tasks section; sees dashboard metric tiles: Total: 18 / Inside SLA: 12 / Approaching SLA: 4 / Overdue: 2 | "Two overdue already? And 4 approaching? I need to act." | Concerned, alert | Dashboard tiles may be stale — not auto-refreshed | Auto-refresh every 60 seconds + "Last refreshed: 30 sec ago" under tiles |
| **2. Overdue Drill-Through** — Click Overdue tile | Clicks "Overdue: 2" tile — task list auto-filters to show 2 overdue tasks | "Who are these assigned to?" | Focused | No drill-through from tiles — must manually apply filter | Click-tile → auto-filter applied to list (tile acts as filter shortcut) |
| **3. Overdue Investigation** — Review overdue tasks | Opens overdue task 1 — TASK-00043; reads history. Previous owner wrote "agent unavailable" but no reassignment was made. | "This should have been reassigned yesterday. Why wasn't it?" | Frustrated | Task history shows minimal comment — "agent unavailable" — not enough context | Comment validation (10-char min) with hint text ensures richer entries; mandatory structured comment |
| **4. Reassignment** — Reassign TASK-00043 | Selects "Reassign"; user picker opens showing Motor area agents; sees current task counts per agent: Ravi (3 tasks), Kavitha (1 task). Selects Kavitha. | "She has capacity. Good." | Decisive | Picker doesn't show workload without this feature | User picker shows open task count per agent: "Kavitha — 1 open task" |
| **5. Comment Entry** — Write reassignment comment | Types: "Reassigning due to previous assignee absence. Kavitha to action with priority — task is Overdue." | "That's a clear enough comment." | Purposeful | No hint text exists for manager reassignment context | Hint text: "Include reason for reassignment and any context needed by the new owner." |
| **6. Confirm** — Submit reassignment | Popup: "Reassign TASK-00043 to Kavitha? Note: SLA timer continues running." Confirms. | "Good — at least the SLA is continued and the record is clear." | Reassured | SLA continuation not always understood post-reassignment | Popup explicitly states SLA continuation — reduces misunderstanding |
| **7. Approaching SLA Review** — Switch to filter | Returns to dashboard; clicks "Approaching SLA: 4" tile | "Now let me look at the 4 approaching — which ones can still be saved?" | Focused | Approaching SLA filter merges tasks from all agents — no agent grouping | Filter option: "Group by Agent" toggle in list view |
| **8. Decision: Let Agent Handle** — 2 tasks reachable | Two approaching tasks are actively In Progress — agents are working them | "They look under control — SLA should be met." | Cautiously optimistic | No way to see if the agent is currently active (last login time) | Agent "last active" timestamp in task card (e.g., "Ravi — active 8 min ago") |
| **9. Decision: Escalate** — 1 task needs escalation | TASK-00056 — Reassigned 3 times with no resolution — now approaching SLA | "This needs a senior decision. I'll escalate." | Decisive | Escalation vs Reassignment distinction not always clear in UI | Tooltip differentiator inline in dropdown — clear distinction with context |
| **10. Create Ad-Hoc Task** — New operational instruction | A report arrives: Zone 3 generator check required. Not a system task. Clicks "+ Create Task" | "I need to create this manually." | Task-oriented | Create Task button location not always findable | Fixed "+ Create Task" button in task list header, always visible to Manager/Admin |
| **11. Task Created** — Assigned to Ravi | Task created: TASK-00094 — Zone 3 Generator Check — High priority — assigned to Ravi | "Done. He'll get notified." | Satisfied | No confirmation that Ravi was notified | Toast: "TASK-00094 created and assigned to Ravi Krishnan." + push notification sent |
| **12. Dashboard Reflects Changes** — End of review | Dashboard tiles update: Overdue: 1 / Approaching SLA: 3 (one now In Progress) | "Better. One still overdue — I'll monitor that one." | Settled | Dashboard required manual refresh to see updated totals | Auto-refresh reflects the two reassignment actions within 60 seconds |

**Emotional Curve (J-03):**
Concerned → Alert → Focused → Frustrated → Decisive → Purposeful → Reassured → Focused → Cautiously Optimistic → Decisive → Task-Oriented → Satisfied → Settled

**Key Opportunities:**
- Click-through tiles → auto-filter
- Agent workload in user picker
- Last-active timestamp on task cards
- Clear Escalation vs Reassignment UI with tooltips
- Fixed "+ Create Task" button
- Auto-refresh dashboard

---

## Journey J-04 — Admin: Reconfigure SLA and Review Audit Trail

**Persona:** Anitha Subramaniam (System Administrator)
**Trigger:** Operations Manager requests Critical SLA to be reduced from 30 minutes to 20 minutes for winter peak season.
**End State:** SLA updated, change audited, compliance report ready.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Request Received** — Business instruction | Receives email from Ops Manager: "Please update Critical SLA to 20 minutes from Monday." | "I need to do this carefully and make sure the audit trail captures the reason." | Careful, responsible | No formal change-request workflow for SLA modifications | Change request reference field (optional) in SLA edit form: "Reference / Reason code" |
| **2. Navigation** — Find SLA Configuration | Opens Engage; Admin > Business Configuration > SLA Configuration | "The path is a bit long — I hope I don't have to click through 4 menus." | Mildly impatient | Configuration buried in multi-level menu hierarchy | Direct admin shortcut: "Configure SLA" quick-link from Admin Dashboard tile |
| **3. SLA Table Review** — See current values | Opens SLA Configuration page; sees table: Critical → 30 min / High → 60 min / Medium → 240 min / Low → 480 min. Shows Last Modified: 12 Jan 2026, by Anitha. | "Good — I can see when it was last changed and by whom." | Reassured | If last-modified metadata not shown, trust in the table is reduced | Show Last Modified By / Date / Reason in each row as tooltips or expandable cells |
| **4. Edit SLA Value** — Initiate edit for Critical | Clicks Edit beside Critical row; inline edit panel opens showing: Priority (read-only), Current: 30 min, New Value: input | "I'll change it to 20." Types "20" | Focused | No validation hint on valid range | Inline hint: "Enter a value in minutes. Minimum: 1. Maximum: 480 (8 hours)." |
| **5. Reason Required** — Mandatory reason field | Below input: "Reason for change (required, 10–100 chars) — This will be recorded in the audit trail." Types: "Seasonal peak demand — Ops Manager instruction ref OPS-2026-003." | "Good — this forces me to document the reason formally." | Confident, professional | If reason is not enforced, audit log is incomplete | Reason field mandatory before Save button activates; reason auto-populated in audit row |
| **6. Confirmation Modal** — Review before commit | Modal: "Change Critical SLA from 30 minutes to 20 minutes? Reason: Seasonal peak demand… [Confirm] [Cancel]" | "Let me double-check… yes, that's right. Confirm." | Careful | Generic modal without old/new value comparison | Modal shows old → new value explicitly: "30 min → 20 min" |
| **7. Saved** — Change confirmed | Toast: "Critical SLA updated to 20 minutes. Change recorded in audit trail." | "Perfect. Now let me verify the audit entry." | Satisfied | No direct link to audit trail from the toast | Toast includes "View audit trail →" link |
| **8. Audit Trail Review** — Verify the record | Navigates to SLA Audit Trail; sees new entry: Timestamp 09:12 / Anitha Subramaniam / Critical / 30 min → 20 min / Reason: "Seasonal peak demand…" | "That's exactly what I need for the compliance record." | Reassured, professional | If audit trail cannot be exported, evidence gathering is manual | [Export CSV] and [Export PDF] buttons on filtered audit view |
| **9. Export** — Compliance report | Applies date filter: "Last 30 days". Clicks "Export PDF". Receives compliance-ready document. | "Done. I can send this to the compliance team directly." | Satisfied, efficient | Exporting was not available in original scope — identified as gap | Export function generates printable audit evidence with timestamp, system name, admin name |
| **10. Global Task Review** — Cross-area check | While in Admin view, reviews global task dashboard — filters by all three business areas | "Motor has 2 overdue. That's fine — Priya will handle those." | Monitoring mode | No global combined view — currently separate per area | Multi-select area filter on admin dashboard — all areas visible simultaneously |

**Emotional Curve (J-04):**
Careful → Mildly Impatient → Reassured → Focused → Confident → Careful → Satisfied → Reassured → Satisfied → Monitoring

**Key Opportunities:**
- Admin Dashboard shortcut to SLA config
- Last-modified metadata in SLA table
- Mandatory reason field with audit integration
- Old → new value in confirmation modal
- Toast link to audit trail
- PDF/CSV export of audit trail
- Multi-select area filter on admin dashboard
