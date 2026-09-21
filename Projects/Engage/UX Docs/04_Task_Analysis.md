# Task Analysis
## FieldSync Field App — Task Management & SLA Workflow Module

| Field          | Detail                                  |
|----------------|-----------------------------------------|
| **Project**    | FieldSync Field App — Task Module          |
| **Prepared by**| UX Team                                 |
| **Date**       | 10 March 2026                           |
| **Version**    | 1.0                                     |

---

## Overview

This task analysis decomposes the key workflows within the Task Management and SLA Workflow module into discrete steps, mapping them to the user performing each step, the frequency of execution, the pain points encountered in the current/expected workflow, and the UX opportunities that address those pains.

Three workflow groups are analysed:
1. **Agent Workflows** — Task action lifecycle (the primary daily operational flow)
2. **Manager Workflows** — Monitoring, reassignment, escalation, ad-hoc task creation
3. **Admin Workflows** — SLA configuration, global oversight, audit review

---

## 1. Agent Workflows — Ravi Krishnan (Field Agent / Assignee)

### Workflow 1.1 — Review Assigned Tasks at Start of Day

| Step | Action                                              | User   | Frequency | Pain Points                                                                | Opportunities                                                                         |
|------|-----------------------------------------------------|--------|-----------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1    | Log in to Engage web application                    | Agent  | Daily     | Username/password friction if session expired mid-shift                    | Persistent session within business hours; password-manager compatible login           |
| 2    | Navigate to Tasks section                           | Agent  | Daily     | Tasks may be buried in navigation; no shortcut to task list                | Task count badge on nav item; Tasks as default landing page for Agent role            |
| 3    | View list of assigned tasks                         | Agent  | Daily     | List may show all statuses mixed — hard to prioritise                      | Default sort: Priority descending, then SLA time remaining ascending                  |
| 4    | Identify highest-priority or most-urgent task       | Agent  | Daily     | SLA time remaining not visible on list row — must open each task           | SLA status pill (Inside / Approaching / Overdue) on every task card in list view      |
| 5    | Open task detail                                    | Agent  | Daily     | Full page reload delays; detail panel opens in separate view               | Expandable task card in-list (accordion) — no page navigation required                |

---

### Workflow 1.2 — Mark Task as In Progress

| Step | Action                                              | User   | Frequency | Pain Points                                                                | Opportunities                                                                         |
|------|-----------------------------------------------------|--------|-----------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1    | Open task detail (expand card or navigate to detail)| Agent  | Daily     | Grid layout confuses reading order; linear card preferred                  | Default linear list with accordion expansion                                          |
| 2    | Read task description and context                   | Agent  | Daily     | No previous history visible unless scrolled — context often missing        | Task history summary pinned at the top of the detail panel                            |
| 3    | Select "In Progress" from status action dropdown    | Agent  | Daily     | Dropdown label may not be intuitive — "Action Completed" vs "Complete"     | Clear, labelled action options with short description tooltips                        |
| 4    | Read reminder banner above comment box              | Agent  | Daily     | Banner may be dismissed or ignored after first exposure                    | Banner colour-coded and always visible; not dismissable                               |
| 5    | Enter mandatory comment (min 10 chars)              | Agent  | Daily     | Invalid character validation not clear until submission attempt            | Inline character counter from first keystroke; inline validation on blur              |
| 6    | Submit action via action button                     | Agent  | Daily     | Button is disabled until comment is valid — user must discover this         | Disabled button with tooltip explanation; button enables progressively as comment fills |
| 7    | Confirm action in confirmation popup                | Agent  | Daily     | Popup text is generic — does not specify which action is being confirmed    | Dynamic popup message: "Confirm: Mark TASK-00042 as In Progress?"                    |
| 8    | Task status updates in list; SLA timer continues    | Agent  | Daily     | No clear confirmation that the status successfully updated                 | Toast/snackbar: "TASK-00042 marked as In Progress"                                   |

---

### Workflow 1.3 — Complete a Task

| Step | Action                                              | User   | Frequency | Pain Points                                                                | Opportunities                                                                         |
|------|-----------------------------------------------------|--------|-----------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1    | Open assigned task                                  | Agent  | Daily     | Same as above — list navigation friction                                   | Same as above                                                                         |
| 2    | Select "Action Completed" from dropdown             | Agent  | Daily     | Option label "Action Completed" slightly formal — not natural language     | Relabel to "Mark as Complete" for natural language alignment                          |
| 3    | Enter mandatory completion comment                  | Agent  | Daily     | Unclear whether completion requires a different comment length rule         | Same validation: 10–100 chars; hint text: "Summarise what was done and the outcome." |
| 4    | Confirm action in popup                             | Agent  | Daily     | Popup text must confirm task will move to Completed tab                    | Popup: "This task will be moved to Completed. This action cannot be undone."          |
| 5    | Task moves to Completed tab; removed from active list | Agent | Daily   | Agents don't always know the task went to Completed — feels like it disappeared | Toast: "TASK-00042 completed. View in Completed tab." with link.                  |

---

### Workflow 1.4 — Reject / Cancel a Task

| Step | Action                                              | User   | Frequency | Pain Points                                                                | Opportunities                                                                         |
|------|-----------------------------------------------------|--------|-----------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1    | Open task detail                                    | Agent  | Weekly    | —                                                                          | —                                                                                     |
| 2    | Select "Cancelled (Action no longer required)"      | Agent  | Weekly    | Option label is long and wordy; hard to scan in dropdown                   | Shorten to "Cancel Task" with tooltip "Task is no longer actionable"                  |
| 3    | Guided reason picker for cancellation reason        | Agent  | Weekly    | No structured reason picker — just free text — loses analytical value      | Radio picker: "Not applicable", "Duplicate task", "Resolved by other means", "Other" |
| 4    | Enter mandatory comment (free text with reason tag) | Agent  | Weekly    | Agent writes vague comments — no analytics value                           | Reason picker auto-populates comment prefix; agent adds detail.                       |
| 5    | Confirm action in popup                             | Agent  | Weekly    | Popup should clarify cancelled status persists in Completed tab            | Popup: "This task will be Cancelled and moved to the Completed tab."                  |
| 6    | Task moves to Completed tab with Cancelled status   | Agent  | Weekly    | Task disappears from active list — agent unsure if cancellation was saved  | Toast confirmation: "TASK-00042 cancelled."                                           |

---

### Workflow 1.5 — Reassign a Task

| Step | Action                                              | User   | Frequency  | Pain Points                                                                | Opportunities                                                                         |
|------|-----------------------------------------------------|--------|------------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1    | Select "Reassigned" from status action dropdown     | Agent  | Weekly     | —                                                                          | —                                                                                     |
| 2    | User picker opens — filtered to same business area | Agent  | Weekly     | Agent does not always know which colleagues are in the same business area  | User picker shows: Name + Business Area label + availability indicator                |
| 3    | Select new assignee                                 | Agent  | Weekly     | No indication if the selected user is overloaded                           | Show current open task count for each user in picker                                  |
| 4    | Enter mandatory reassignment comment                | Agent  | Weekly     | No prompt about what to include in the comment                             | Hint text: "Explain why you are reassigning and any context the new owner needs."     |
| 5    | Confirm action — ownership transfers                | Agent  | Weekly     | Agent may not realise they lose access to the active task                  | Popup: "You will no longer see this task in your active list. It will appear in your Task History." |
| 6    | Task transfers; SLA continues                       | Agent  | Weekly     | SLA not explicitly stated to continue — creates confusion for agents       | Confirmation popup includes: "Note: The SLA timer continues running."                |

---

### Workflow 1.6 — Escalate a Task

| Step | Action                                              | User   | Frequency  | Pain Points                                                                | Opportunities                                                                         |
|------|-----------------------------------------------------|--------|------------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1    | Select "Escalation" from status action dropdown     | Agent  | Monthly    | Difference between Escalation and Reassignment not obvious to all users    | Tooltip differentiator: "Escalation sends this task to someone with greater authority" |
| 2    | User picker opens — any user in same business area  | Agent  | Monthly    | No filter applied — may be overwhelming in large organisations             | Default filter: same area; option to expand to all areas if required                  |
| 3    | Select escalation recipient                         | Agent  | Monthly    | —                                                                          | Show user's role/title in picker to aid selection                                     |
| 4    | Enter mandatory escalation comment                  | Agent  | Monthly    | Agent feels embarrassed writing escalation reason formally                 | Hint: "Briefly explain the reason for escalation (e.g., requires senior decision)."  |
| 5    | Confirm action — ownership and history recorded     | Agent  | Monthly    | Agent not confident the history entry captures the escalation               | Popup: "Escalation recorded in task history. New owner will be notified."             |

---

### Workflow 1.7 — Reprioritise a Task

| Step | Action                                              | User   | Frequency  | Pain Points                                                                | Opportunities                                                                         |
|------|-----------------------------------------------------|--------|------------|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 1    | Select "Reprioritise" from status action dropdown   | Agent/Manager | Occasional | Agent unaware that priority change resets SLA timer                | Inline info notice in dropdown when Reprioritise is highlighted: "SLA timer will reset" |
| 2    | Priority picker opens — all levels available        | Agent/Manager | Occasional | No current vs new priority displayed side-by-side                  | Show: "Current: High (60 min SLA) → Select New Priority"                              |
| 3    | Select new priority level                           | Agent/Manager | Occasional | New SLA duration not immediately shown before committing            | Show new SLA duration inline after selection: "Critical = 30 min SLA"                 |
| 4    | Enter mandatory reprioritisation comment            | Agent/Manager | Occasional | Agents write vague comments for reprioritisations                   | Hint: "Explain why the priority has changed."                                          |
| 5    | Confirm action — SLA recalculated and timer reset   | Agent/Manager | Occasional | Users surprised SLA reset — expect continuation                    | Popup clearly states: "SLA timer will reset. New SLA: [duration] from now."           |

---

## 2. Manager Workflows — Priya Meenakshisundaram (Business Area Manager)

### Workflow 2.1 — Morning SLA Review

| Task                                         | User    | Frequency | Pain Points                                                 | Opportunities                                                                       |
|----------------------------------------------|---------|-----------|-------------------------------------------------------------|------------------------------------------------------------------------------------|
| Open Task Dashboard                          | Manager | Daily     | Metrics not auto-refreshed — stale data possible            | Auto-refresh dashboard tiles every 60 seconds; show "Last updated" timestamp       |
| Review metric tiles: Total / Inside SLA / Approaching / Overdue | Manager | Daily | No drill-through from tile to filtered task list    | Click tile to filter task list to that category (e.g., click Overdue → shows overdue list) |
| Apply Approaching SLA filter                 | Manager | Daily     | Filter must be manually re-applied every session            | Remember last-applied filter per user session; persist filter state                |
| Review task list for approaching SLA         | Manager | Daily     | SLA time remaining not visible on list row                  | Show SLA badge (Approaching/Overdue) and time remaining (e.g., "12 min left") on list card |
| Open at-risk task and decide: reassign or let it run | Manager | Daily | Must open task to see history before deciding          | Quick preview panel: expand task summary without full page load                    |

---

### Workflow 2.2 — Reassign Task on Behalf of Agent

| Task                                         | User    | Frequency | Pain Points                                                 | Opportunities                                                                       |
|----------------------------------------------|---------|-----------|-------------------------------------------------------------|------------------------------------------------------------------------------------|
| Open affected task                           | Manager | Weekly    | —                                                           | —                                                                                  |
| Select Reassigned action                     | Manager | Weekly    | Same friction as agent reassignment flow                    | Manager sees extended picker with workload view (open task count per agent)        |
| Write reassignment comment                   | Manager | Weekly    | Manager-specific context not templated                      | Hint: "State reason for manager reassignment (e.g., agent absence, workload rebalance)" |
| Confirm and verify history log entry         | Manager | Weekly    | No inline confirmation that history was logged              | Toast: "Task reassigned. History entry created."                                  |

---

### Workflow 2.3 — Create Ad-Hoc Task

| Task                                         | User    | Frequency | Pain Points                                                 | Opportunities                                                                       |
|----------------------------------------------|---------|-----------|-------------------------------------------------------------|------------------------------------------------------------------------------------|
| Click "Create Task" in task list header       | Manager | Weekly    | Create Task entry point not discoverable                    | Prominent "+ Create Task" button in task list header, fixed position               |
| Fill task creation form (title, description, assign, priority) | Manager | Weekly | Form fields not pre-populated with manager defaults | Auto-populate business area from manager profile; pre-select a default priority    |
| Assign to an agent (same business area)       | Manager | Weekly    | Agent picker not filtered by business area automatically    | Auto-filter agent picker to manager's area; show agent workload counts             |
| Submit — task created with status Assigned    | Manager | Weekly    | No immediate visual confirmation of creation                | Toast: "TASK-00093 created and assigned to Ravi Krishnan."                        |

---

## 3. Admin Workflows — Anitha Subramaniam (System Administrator)

### Workflow 3.1 — Review Global Task Dashboard

| Task                                         | User  | Frequency | Pain Points                                                 | Opportunities                                                                       |
|----------------------------------------------|-------|-----------|-------------------------------------------------------------|------------------------------------------------------------------------------------|
| Open Admin Task Dashboard                    | Admin | Daily     | No multi-area view — must switch area tabs one at a time    | Combined global dashboard with multi-area filter (checkbox select: All / Metering / Motor / Field) |
| Filter by business area                      | Admin | Daily     | Filter resets on page navigation                            | Persist filter selections in session/local state                                   |
| Search by task ID / agent name / task type   | Admin | Daily     | No global search — must know which area the task is in      | Global search bar: returns tasks across all areas; ranked by relevance             |
| Identify systemic patterns (e.g., high rejection rate in Motor) | Admin | Weekly | No analytics view for rejection trends | Completed section includes outcome analytics: rejection reason breakdown by area   |

---

### Workflow 3.2 — Configure SLA Thresholds

| Task                                         | User  | Frequency   | Pain Points                                                 | Opportunities                                                                       |
|----------------------------------------------|-------|-------------|-------------------------------------------------------------|------------------------------------------------------------------------------------|
| Navigate to Business Configuration > SLA     | Admin | Occasionally| Configuration screen buried in settings hierarchy           | Direct link from Admin Dashboard: "Configure SLA" CTA                             |
| View current SLA table (Priority / Duration)  | Admin | Occasionally| Table shows current values but no last-changed metadata     | Show: Last Modified By / Date / Reason next to each row                           |
| Edit a SLA value                             | Admin | Occasionally| No inline validation of valid duration ranges               | Inline validation: "Must be a positive integer; maximum 480 minutes (8 hours)"    |
| Enter mandatory reason for change            | Admin | Occasionally| No reason-for-change enforcement currently                  | Reason field required before Save is enabled; shown in confirmation modal         |
| Confirm change in modal                      | Admin | Occasionally| Confirmation modal lacks specificity                        | Modal: "Change Critical SLA from 30 min to 25 min? Reason: [reason]. This will be logged." |
| Change saved and added to SLA audit trail    | Admin | Occasionally| No confirmation of audit trail entry                        | Toast: "SLA updated. Change recorded in audit trail."                             |

---

### Workflow 3.3 — Review Audit Trail

| Task                                         | User  | Frequency | Pain Points                                                 | Opportunities                                                                       |
|----------------------------------------------|-------|-----------|-------------------------------------------------------------|------------------------------------------------------------------------------------|
| Navigate to Task History / Audit section     | Admin | Weekly    | Audit trail per task; no global audit view                  | Global Audit Trail page: all task actions across all areas, filterable by user/date/action |
| Filter by date range, user, action type      | Admin | Weekly    | Filter options are limited                                  | Date picker, user search, action type checkboxes (Reassigned, Escalated, Completed, etc.) |
| Export audit trail for compliance            | Admin | Monthly   | No export capability                                        | "Export CSV" and "Export PDF" buttons on filtered audit view                       |

---

## Summary Opportunity Matrix

| UX Opportunity                             | Addresses Persona Pain              | Priority |
|--------------------------------------------|-------------------------------------|----------|
| SLA progress pill on task list rows        | Agent + Manager                     | High     |
| Inline comment validation with counter     | Agent                               | High     |
| Linear list with accordion card expansion  | Agent + Manager                     | High     |
| Dynamic confirmation popup messages        | Agent + Manager + Admin             | High     |
| Structured reason picker on Cancel/Reject  | Agent + Priya                       | High     |
| Auto-refresh dashboard metrics             | Manager + Admin                     | High     |
| Drill-through from metric tiles to list    | Manager + Admin                     | High     |
| Business area switcher on dashboard        | Manager + Admin                     | High     |
| SLA timer reset notice on Reprioritise     | Agent + Manager                     | High     |
| Reason-for-change gate on SLA config       | Admin                               | High     |
| Global search across all areas             | Admin                               | Medium   |
| Task workload count in user picker         | Manager                             | Medium   |
| Export capability for audit trail          | Admin                               | Medium   |
| Task history pinned at top of detail panel | Agent                               | Medium   |
| Field app critical task acknowledgement    | Agent                               | Medium   |
