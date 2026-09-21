# Personas
## FieldSync Field App — Task Management & SLA Workflow Module

| Field          | Detail                                  |
|----------------|-----------------------------------------|
| **Project**    | FieldSync Field App — Task Module          |
| **Prepared by**| UX Team                                 |
| **Date**       | 10 March 2026                           |
| **Version**    | 1.0                                     |

---

## Overview

Three primary personas have been identified from the Business Requirements Document, Minutes of Meeting, and Interview Summary. Each persona represents a distinct user group with unique goals, contexts, pain points, and interaction modes with the Task Management module.

---

## Persona 1 — Ravi Krishnan, Field Agent / Assignee

> *"I just need to know what I have to do, do it, and move on. Don't make me fill in the same thing twice."*

### Profile

| Attribute          | Detail                                                           |
|--------------------|------------------------------------------------------------------|
| **Name**           | Ravi Krishnan                                                    |
| **Role**           | Field Agent / Task Assignee                                      |
| **Age**            | 32                                                               |
| **Location**       | Coimbatore, Tamil Nadu                                           |
| **Business Area**  | Metering                                                         |
| **Platform**       | Web (dashboard) + Field App (mobile acknowledgement)            |
| **Tech Comfort**   | Medium — comfortable with smartphones and web apps; avoids anything with too many steps |

### Goals

1. Start a task quickly after it is assigned and know what action is expected of me.
2. Update task status (In Progress, Completed) without unnecessary friction.
3. Understand how much time I have left before my SLA expires — without having to calculate it.
4. Add a comment that explains my action without being penalised for short or unclear notes.
5. Be notified immediately if I receive a critical task so I can reprioritise my queue.
6. Know that once I complete a task it is off my active list and I am not haunted by repeat notifications.

### Daily Tasks

- Logs into the web dashboard at the start of each working day (08:00) to review assigned tasks.
- Picks up the highest-priority tasks first; scans SLA time remaining.
- Opens task detail, reads instructions, and selects a status action (In Progress / Completed / Reassign).
- Writes a mandatory comment explaining the action taken.
- Handles escalated or reprioritised tasks that arrive mid-day.
- Acknowledges field app push notification for critical task creation.
- At end of day, ensures no open tasks remain unactioned (avoids Overdue flag).

### Frustrations

- Tasks that keep showing as Overdue even after he believes they are done — needs a definitively closed state.
- Not knowing why a task was escalated to him — lacks context when ownership transfers without explanation.
- Comment box validation that blocks him without clear guidance on what is wrong (character limit, invalid symbol).
- Grid layouts that confuse reading order; does not know which column to read first.
- Notifications that repeat constantly without resolving — creates noise fatigue.
- Being asked to re-enter information the system already knows (e.g., his name, business area).

### Motivations

- Completing work efficiently and being seen as reliable by his manager.
- Avoiding overdue flags that reflect poorly on his performance metrics.
- Receiving recognition for resolving critical tasks within the 30-minute SLA window.

### Tech Comfort

**Medium.** Uses smartphones and web apps daily. Prefers linear interfaces with clear CTAs. Becomes frustrated with complex multi-panel layouts. Comfortable with notifications; dislikes pop-up fatigue.

### Accessibility Needs

No specific disabilities reported. Works in environments with ambient lighting variation; high-contrast status indicators beneficial. Needs large enough tap targets for mobile acknowledgement actions.

### Quote

> "If a task is overdue, tell me clearly — don't just make the row red. Give me a way to sort it out fast."

---

## Persona 2 — Priya Meenakshisundaram, Business Area Manager

> *"I need to see where my team's time is going and catch problems before they become SLA breaches."*

### Profile

| Attribute          | Detail                                                           |
|--------------------|------------------------------------------------------------------|
| **Name**           | Priya Meenakshisundaram                                          |
| **Role**           | Business Area Manager — Motor Division                           |
| **Age**            | 41                                                               |
| **Location**       | Coimbatore, Tamil Nadu                                           |
| **Business Area**  | Motor (also oversees Metering tasks during cross-area escalations) |
| **Platform**       | Web                                                              |
| **Tech Comfort**   | High — experienced in operational web tools; relies on data summaries |

### Goals

1. See a real-time overview of all tasks in my business area — Inside SLA, Approaching SLA, Overdue — from a single dashboard screen.
2. Identify and act on at-risk tasks before they breach SLA without having to open each task individually.
3. Reassign or escalate tasks when agents are unavailable or overloaded.
4. Review the complete history of a task to understand context before making a decision.
5. Create ad-hoc tasks and assign them directly to agents for operational instructions.
6. Monitor cross-business-area task visibility when tasks spill across her supervision scope.

### Daily Tasks

- Reviews the Task Dashboard first thing each morning — focuses on Approaching SLA and Overdue counts.
- Drills into individual task timelines for critical or overdue items.
- Reassigns tasks from overloaded or absent agents to available team members.
- Escalates tasks to senior agents or cross-area specialists where workload demands.
- Creates ad-hoc tasks via the web interface for one-off operational instructions.
- Reviews completion rates and rejection reasons at end-of-week for process improvement.
- Receives popup notifications for Critical tasks created in her business area.

### Frustrations

- Not being able to see task SLA proximity without opening each individual record — needs a summary view.
- Tasks that disappear from active view without a clear audit trail entry explaining the transition.
- Difficulty distinguishing between tasks in her primary area vs tasks she received as escalations from others.
- Escalated tasks losing context — receiving a task without understanding the full previous history.
- Receiving notifications for every small status change — prefers escalation/SLA notifications only.

### Motivations

- Maintaining SLA compliance targets for her team so business KPIs are met.
- Empowering agents to work independently while having oversight when needed.
- Building trust with the administration by demonstrating a clean, well-governed task operation.

### Tech Comfort

**High.** Proficient in operational web tools; uses dashboards and data summaries daily. Comfortable with complex filter and search UI. Expects system to remember her preferences (e.g., last-applied filters).

### Accessibility Needs

No specific disabilities. High-resolution display environment; expects dense information presentation without loss of clarity. Status colours must be reinforced with icons/text labels for moments of screen sharing or printing.

### Quote

> "Show me which tasks are about to breach SLA — that's the only number that matters first thing in the morning."

---

## Persona 3 — Anitha Subramaniam, System Administrator

> *"I need full visibility across everything, and when I change a setting, I need to know it's been logged."*

### Profile

| Attribute          | Detail                                                           |
|--------------------|------------------------------------------------------------------|
| **Name**           | Anitha Subramaniam                                               |
| **Role**           | System Administrator                                             |
| **Age**            | 38                                                               |
| **Location**       | Coimbatore, Tamil Nadu                                           |
| **Business Area**  | All (global visibility across Metering, Motor, Field)            |
| **Platform**       | Web                                                              |
| **Tech Comfort**   | Very High — power user; expects data density and configuration depth |

### Goals

1. View all active tasks across every business area with filter capability (Metering, Motor, Field).
2. Configure SLA thresholds per priority level through an admin-facing Business Configuration screen.
3. Trust that every SLA configuration change is logged with who made it, when, and why.
4. Receive notifications for critical tasks regardless of business area.
5. Run trend analysis reports on task outcomes — completion rates, escalation frequencies, rejection reasons.
6. Perform global searches across task IDs, agent names, task types, and status.

### Daily Tasks

- Reviews the Admin Task Dashboard — monitors tasks across all business areas simultaneously.
- Adjusts SLA thresholds when operational conditions change (e.g., seasonal demand variation).
- Handles escalations that have been redirected beyond the manager level.
- Reviews the audit trail for compliance purposes, generating reports on demand.
- Manages user profiles and business area assignments used in reassignment filtering.
- Monitors critical task notifications and ensures appropriate handling.
- Investigates SLA breaches post-event to understand patterns.

### Frustrations

- SLA configuration changes that do not produce an audit record — creates compliance risk.
- Inability to filter tasks by business area quickly from the global view.
- Discovering that tasks have changed hands multiple times with no traceable comment history.
- Notification systems that cannot distinguish between informational and urgent alerts.

### Motivations

- Organisational compliance and auditability — every change must be traceable.
- Operational efficiency across all teams without micro-management.
- Being the first to know when a systemic problem is emerging from task data patterns.

### Tech Comfort

**Very High.** Power user. Expects dense dashboards, multi-filter capability, and exportable data. Comfortable navigating complex configuration screens provided they are clearly labelled and reversible.

### Accessibility Needs

No specific disabilities. Print/export capability needed for compliance reports. System must maintain keyboard navigability across all admin screens for audit scenarios.

### Quote

> "Every time I change an SLA value, I need a paper trail — who, what, when, and why. No exceptions."

---

## Persona Summary Matrix

| Attribute              | Ravi (Agent)          | Priya (Manager)         | Anitha (Admin)              |
|------------------------|-----------------------|-------------------------|-----------------------------|
| **Platform**           | Web + Field App       | Web                     | Web                         |
| **Tech Comfort**       | Medium                | High                    | Very High                   |
| **Primary Goal**       | Act on tasks fast     | Monitor SLA health      | Configure + audit system    |
| **Key Pain**           | Overdue confusion, comment friction | Missing SLA summary     | Untracked config changes    |
| **Notification Need**  | Critical + Overdue    | Approaching SLA + Overdue | Critical + cross-area       |
| **Visibility Scope**   | Own tasks only        | Business area tasks     | All tasks, all areas        |
| **Decision Authority** | Update own task       | Reassign / Escalate     | Configure SLA rules         |
| **Preferred Layout**   | Linear list           | Dashboard + list        | Dense dashboard + filters   |
