# UX Brief
## FieldSync Field App — Task Management & SLA Workflow Module

| Field              | Detail                                                              |
|--------------------|---------------------------------------------------------------------|
| **Project**        | FieldSync Field App — Task Module                                      |
| **Client**         | LogicValley Technologies Pvt Ltd                                    |
| **Prepared by**    | UX Team                                                             |
| **Date**           | 10 March 2026                                                       |
| **Version**        | 1.0                                                                 |
| **Classification** | Internal — UX Working Document                                      |

---

## 1. Background

The FieldSync Field App is an operational platform used by field agents, area managers, and system administrators to coordinate and track field-based work across multiple business areas (e.g., Metering, Motor, Field). Currently, tasks are created and assigned to users within the organisation but lack a structured, governed workflow for tracking progress, ensuring accountability, and meeting defined service timelines.

The absence of standardised task-handling processes leads to:
- Delays in task resolution due to no SLA enforcement.
- Lack of accountability when tasks change hands without recorded context.
- Limited visibility for managers and admins over task health and urgency.
- No structured mechanism for escalation or priority management.

The **Task Management and SLA Workflow Module** is the response to these operational pain points. It introduces a governed task lifecycle, mandatory comment-driven audit trails, SLA monitoring with configurable thresholds per priority, escalation and reassignment workflows, and role-based dashboard visibility.

---

## 2. Objectives

| # | Objective                                                                                            |
|---|------------------------------------------------------------------------------------------------------|
| 1 | Provide a structured, auditable task lifecycle from creation to completion or cancellation.           |
| 2 | Enforce mandatory comments on every task action to ensure operational transparency.                   |
| 3 | Introduce SLA monitoring with priority-based timers (Critical 30 min, High 60 min, Medium 4 h, Low 8 h). |
| 4 | Deliver proactive notifications when tasks approach SLA thresholds (25% remaining) or breach SLA.    |
| 5 | Enable task escalation and reassignment with traceable ownership transfer.                            |
| 6 | Provide role-based dashboards (Admin, Manager, Agent) with Inside SLA / Approaching SLA / Overdue metrics. |
| 7 | Maintain a complete, timestamped audit trail for every task action.                                  |
| 8 | Allow administrators to configure SLA durations per priority level through Business Configuration.   |
| 9 | Support field app integration for lightweight task acknowledgement by field agents.                   |
| 10| Meet WCAG 2.2 AA accessibility standards across all task-related interfaces.                         |

---

## 3. Target Users

### 3.1 Primary Users

| Persona             | Platform        | Business Role                                                                         |
|---------------------|-----------------|---------------------------------------------------------------------------------------|
| **Agent / Assignee**| Web + Field App | Field operative assigned tasks; must action tasks within SLA; requires simplicity.    |
| **Manager**         | Web             | Business area supervisor monitoring SLA compliance and team workload.                 |
| **Admin**           | Web             | System administrator with global visibility; configures SLA rules and audits.         |

### 3.2 User Context
- **Agents** often work under time pressure in field environments; they need fast, unambiguous task action flows with minimal cognitive load.
- **Managers** need at-a-glance SLA risk assessment, flagging overdue and approaching-SLA tasks before they escalate.
- **Admins** require configuration power without complexity — a clean settings UI backed by a full audit trail.

---

## 4. User Needs

| User       | Core Need                                                                                     |
|------------|-----------------------------------------------------------------------------------------------|
| Agent      | Know exactly what tasks are assigned, what actions to take, and track status clearly.         |
| Agent      | Complete tasks without re-entering information already known to the system.                   |
| Agent      | Receive clear, timely notifications for overdue or approaching-SLA tasks.                     |
| Manager    | See all tasks in their business area with SLA proximity indicators on one screen.             |
| Manager    | Reassign or escalate tasks without losing audit history.                                      |
| Admin      | Configure SLA thresholds per priority with full change audit.                                 |
| Admin      | View tasks across all business areas with filter capabilities.                                |
| All        | Trust that the system records every action accurately with user, timestamp, and comment.      |

---

## 5. Core Challenges

| Challenge                            | Detail                                                                                                |
|--------------------------------------|-------------------------------------------------------------------------------------------------------|
| **Comment enforcement UX**           | The system must block actions until valid comments (10–100 chars) are entered without frustrating users. |
| **SLA awareness without overwhelm**  | Surfacing SLA urgency (approaching / overdue) clearly without creating notification fatigue.           |
| **Multi-business-area visibility**   | Designing switcher and filter patterns for Admin/Manager cross-area oversight.                        |
| **Linear vs grid layout preference** | Interviews confirm linear list is preferred; card expansion pattern needed for detail + actions.       |
| **Rejection rationale taxonomy**     | Structured reason picker needed so rejection causes can be tracked analytically.                      |
| **Reprioritisation SLA reset logic** | Users need to understand that changing priority resets the SLA — clear inline explanation required.    |
| **Audit trail readability**          | History log must be scannable (timestamp, user, action, comment) with no raw data dump aesthetics.    |
| **Accessibility**                    | SLA status colours (red = overdue, amber = approaching) must never rely on colour alone.              |

---

## 6. Brand & Visual Direction

The Task Module adopts the **MET-DS-V2** design system, implemented in **React + MUI v5**.

| Token                | Value              | Usage                               |
|----------------------|--------------------|-------------------------------------|
| `--color-primary`    | `#3276CF`          | Primary actions, links, active states |
| `--color-bg`         | `#F2F5FA`          | Page background                     |
| `--color-card`       | `#FFFFFF`          | Card and panel backgrounds          |
| `--text-primary`     | `#212121`          | Body text, headings                 |
| `--color-error`      | `#E53935`          | Overdue state, validation errors    |
| `--color-warning`    | `#FF9800`          | Approaching SLA indicator           |
| `--color-success`    | `#43A047`          | Completed / Inside SLA              |
| `--radius-card`      | `8px`              | Cards, buttons, inputs              |
| `--radius-pill`      | `100px`            | Status badges / pills               |
| **Font**             | system-ui / Segoe UI / Roboto | Consistent OS-native rendering |
| **Spacing**          | 8pt grid           | All layout spacing                  |

**Tone:** Clear, operational, trustworthy. No marketing language. Prioritise scanability and hierarchy.

---

## 7. Scope & Deliverables

### 7.1 In Scope
- Task list views (Agent / Manager / Admin roles)
- Task detail / action panel (status update, mandatory comment, confirmation popup)
- Reassignment user-picker (same business area restriction)
- Escalation user-picker (any user in same area)
- Reprioritisation priority-picker with SLA recalculation notice
- Task completion and cancellation flows
- SLA indicator — real-time visual progress, approaching and overdue states
- Notification popups — Critical task creation, approaching SLA, SLA expiry
- Dashboard metrics — Total / Inside SLA / Approaching SLA / Overdue
- Task history / audit trail panel per task
- Business Configuration — SLA duration settings per priority with admin audit trail
- Task ID generation (TASK-00001 sequential format)
- Search and filter — by agent name, task name, task type, status, assigned personnel, overdue flag
- Business area switcher for Manager/Admin views

### 7.2 Out of Scope (v1.0)
- Full native mobile task module (field app receives lightweight acknowledgement only)
- Deep system linking for ad-hoc web-created tasks
- Snooze/Dismiss pattern (explored in v2 if operationally required)

### 7.3 UX Deliverables
1. UX Brief (this document)
2. User Personas (3 personas)
3. Empathy Maps (per persona)
4. Task Analysis
5. Information Architecture
6. User Journey Maps
7. Annotated Wireframes (HTML prototype)
8. Heuristic & Accessibility Evaluation
9. UX Research Plan
10. UX Backlog
11. UX → Engineering Handoff Package

---

## 8. Constraints

| Constraint                     | Detail                                                                                             |
|--------------------------------|----------------------------------------------------------------------------------------------------|
| **Design System**              | MET-DS-V2 mandatory. No custom colour tokens outside the `:root` block.                           |
| **Accessibility**              | WCAG 2.2 Level AA. Colour-only status communication prohibited.                                   |
| **Platform**                   | Web-first (React + MUI v5). Field app is lightweight, notification-only for v1.                   |
| **Comment validation**         | 10–100 characters; letters, numbers, spaces, `,`, `.`, `-`, `"`, `/` only.                        |
| **SLA calculation**            | Business hours 08:00–16:00 only. Timer not reset by reassignment or escalation.                   |
| **Audit requirements**         | Every action must produce a history entry with timestamp, user, action type, and comment.          |
| **Task ID format**             | TASK-00001, sequential, system-generated, immutable.                                              |

---

## 9. Risks

| Risk                                          | Impact  | Likelihood | Mitigation                                                                                 |
|-----------------------------------------------|---------|------------|--------------------------------------------------------------------------------------------|
| Notification fatigue from SLA popups          | High    | Medium     | Limit popup to one occurrence per threshold event; rely on persistent dashboard indicators. |
| Comment enforcement causing workflow friction | Medium  | High       | Clear inline guidance, character counter, early validation while typing.                   |
| SLA misconfiguration by admins                | High    | Low        | Confirmation modal + full audit trail for every SLA change.                               |
| Business area mismatch in reassignment        | Medium  | Medium     | Auto-filter user picker to same business area; display user's area alongside name.          |
| Colour contrast for overdue/approaching states| High    | Medium     | Use icon + text label + colour; never colour alone. Test all states with contrast checker. |
| Adoption resistance from field agents         | Medium  | Medium     | Prioritise minimal-step flows; linear card list; no grid confusion.                        |
| Escalation hierarchy data not available       | High    | Low        | Confirm source-of-truth for org hierarchy; dependency flagged as open item.                |
