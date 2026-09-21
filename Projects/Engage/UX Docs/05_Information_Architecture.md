# Information Architecture
## FieldSync Field App — Task Management & SLA Workflow Module

| Field          | Detail                                  |
|----------------|-----------------------------------------|
| **Project**    | FieldSync Field App — Task Module          |
| **Prepared by**| UX Team                                 |
| **Date**       | 10 March 2026                           |
| **Version**    | 1.0                                     |

---

## Overview

This document defines the Information Architecture (IA) for the Task Management and SLA Workflow module within the Engage platform. It covers:
- Web application sitemap for all roles
- Mobile (field app) lightweight task acknowledgement surface
- Role-based visibility and access matrix
- Navigation model and patterns
- Content taxonomy and labelling

---

## 1. Web Application — Sitemap

### 1.1 Top-Level Navigation Structure

```
Engage Web Application
├── Dashboard
│   ├── Task Metrics Overview [All Roles]
│   │   ├── Total Tasks
│   │   ├── Inside SLA
│   │   ├── Approaching SLA
│   │   └── Overdue
│   ├── Jobs (existing module)
│   ├── Scheduler (existing module)
│   ├── Messages (existing module)
│   └── Documents (existing module)
│
├── Tasks [TASK MODULE — New]
│   ├── Active Tasks
│   │   ├── My Tasks (Agent view — own tasks only)
│   │   ├── Area Tasks (Manager view — business area)
│   │   └── All Tasks (Admin view — all areas)
│   ├── Completed Tasks
│   │   └── Completed / Cancelled / Historical
│   └── [+ Create Task] (Manager / Admin only)
│
├── Task Detail [Contextual — opened from task list]
│   ├── Task Header (ID, title, priority, status badge, SLA indicator)
│   ├── Task Description
│   ├── Task History / Audit Trail
│   ├── Action Panel
│   │   ├── Status Action Dropdown
│   │   ├── Mandatory Comment Input
│   │   ├── Comment Reminder Banner
│   │   ├── User Picker (Reassign / Escalate)
│   │   ├── Priority Picker (Reprioritise)
│   │   └── Submit Action Button
│   └── Confirmation Popup (modal)
│
├── Admin
│   ├── Business Configuration
│   │   ├── SLA Configuration
│   │   │   ├── SLA Priority Table (Critical / High / Medium / Low)
│   │   │   ├── Edit SLA Duration
│   │   │   └── SLA Audit Trail
│   │   └── Other Business Settings
│   └── User Management (out of scope — existing module)
│
└── Search (Global)
    └── Results: Tasks by ID / Agent / Type / Status
```

---

### 1.2 Tasks Section — Detailed Sub-Map

```
Tasks
├── Active Tasks Tab [default]
│   ├── Filter Bar
│   │   ├── Quick Filters: [All] [Overdue] [Approaching SLA] [Inside SLA]
│   │   ├── Filter by Business Area (Manager / Admin only)
│   │   ├── Filter by Priority: Critical / High / Medium / Low
│   │   ├── Filter by Status: Assigned / In Progress / Reassigned / Reprioritised / Escalated
│   │   ├── Filter by Agent (Manager / Admin only)
│   │   └── Filter by Overdue Flag
│   ├── Search Bar (by task name, task ID, agent name, task type)
│   ├── Task List (linear list, sortable)
│   │   └── Task Card [collapsed]
│   │       ├── Task ID (e.g., TASK-00042)
│   │       ├── Task Title
│   │       ├── Priority Badge (Critical / High / Medium / Low)
│   │       ├── Status Badge (Assigned / In Progress / Overdue etc.)
│   │       ├── SLA Indicator Pill (Inside SLA / Approaching SLA [hh:mm] / Overdue)
│   │       ├── Assigned To
│   │       └── [Expand] → Task Detail (accordion or navigation to detail page)
│   └── Pagination / Infinite Scroll
│
├── Completed Tab
│   ├── Filter by Outcome: Completed / Cancelled
│   ├── Filter by Date Range
│   ├── Filter by Agent
│   ├── Analytics Summary (Admin / Manager):
│   │   ├── Completion Rate
│   │   ├── Cancellation Rate
│   │   ├── Rejection Reason Breakdown (pie/bar)
│   │   └── Average Resolution Time per Priority
│   └── Task List [completed tasks, read-only]
│       └── Task Card → Task History (read-only)
│
└── [+ Create Task] Button → Task Creation Form
    ├── Task Title (required)
    ├── Task Description (required)
    ├── Priority (required: Critical / High / Medium / Low)
    ├── Business Area (auto-populated from creator profile)
    ├── Assign To (user picker — same business area)
    ├── Mandatory Initial Comment
    └── [Create Task] Button → Confirmation popup → Created
```

---

### 1.3 Admin — SLA Configuration Sub-Map

```
Admin > Business Configuration > SLA Configuration
├── SLA Priority Table
│   ├── Row: Critical — [current duration] — [Edit]
│   ├── Row: High — [current duration] — [Edit]
│   ├── Row: Medium — [current duration] — [Edit]
│   └── Row: Low — [current duration] — [Edit]
├── Edit SLA Duration Inline Panel
│   ├── Priority (read-only label)
│   ├── Current Value (read-only)
│   ├── New Duration Input (minutes, positive integer, max 480)
│   ├── Reason for Change (mandatory, 10–100 chars)
│   └── [Save Changes] → Confirmation Modal → Saved + Audit Entry
└── SLA Audit Trail
    ├── Filter by Date Range
    ├── Filter by Priority
    └── Audit Log Table
        ├── Timestamp
        ├── Modified By
        ├── Priority
        ├── Old Value
        ├── New Value
        └── Reason
```

---

## 2. Mobile / Field App — Lightweight Task Surface

The field app integration is lightweight for v1.0. Field agents receive push notifications for critical tasks and can perform a simple acknowledgement action without requiring a full task module in the mobile app.

```
Field App (Mobile)
├── Push Notification
│   ├── [Critical Task] TASK-00042: [Task Title] — Tap to acknowledge
│   └── [Approaching SLA] TASK-00038: SLA expires in 12 minutes — Tap to view
│
├── Task Acknowledgement Screen (lightweight)
│   ├── Task Header (ID, Title, Priority, SLA Indicator)
│   ├── Task Description (read-only)
│   ├── Simple Action Buttons
│   │   ├── [Acknowledge — I am working on this] → marks In Progress on web
│   │   └── [View Full Details] → deep-link to web dashboard task detail
│   └── Note: Full action set only available on web
│
└── Settings
    └── Notification Preferences (for task alerts)
```

---

## 3. Role-Based Visibility Matrix

| Screen / Feature                             | Agent (Assignee) | Manager          | Admin            |
|----------------------------------------------|------------------|------------------|------------------|
| **Task Dashboard Metrics (own area)**        | ✓ Own tasks only | ✓ Area-wide      | ✓ All areas      |
| **Active Task List — My Tasks**              | ✓ Own tasks      | ✓ Own + Area     | ✓ All areas      |
| **Active Task List — Area Tasks**            | ✗                | ✓                | ✓ All areas      |
| **Completed Task List**                      | ✓ Own tasks      | ✓ Area tasks     | ✓ All areas      |
| **Task Detail — View**                      | ✓ Own tasks      | ✓ Area tasks     | ✓ All tasks      |
| **Task Detail — Action Panel**               | ✓ Own tasks      | ✓ Area tasks     | ✓ All tasks      |
| **Status Action: In Progress**               | ✓                | ✓                | ✓                |
| **Status Action: Complete**                  | ✓                | ✓                | ✓                |
| **Status Action: Cancel**                    | ✓                | ✓                | ✓                |
| **Status Action: Reassign**                  | ✓ (same area)    | ✓ (same area)    | ✓ (all areas)    |
| **Status Action: Escalate**                  | ✓ (same area)    | ✓ (same area)    | ✓ (all areas)    |
| **Status Action: Reprioritise**              | ✓                | ✓                | ✓                |
| **Task History Audit Trail**                 | ✓ Own tasks      | ✓ Area tasks     | ✓ All tasks      |
| **Create Task (Ad-Hoc)**                     | ✗                | ✓                | ✓                |
| **Business Configuration — SLA Settings**    | ✗                | ✗                | ✓                |
| **SLA Audit Trail**                          | ✗                | ✗                | ✓                |
| **Global Search (all areas)**                | ✗                | ✗ (area-scoped)  | ✓                |
| **Business Area Switcher**                   | ✗                | ✓ (own areas)    | ✓ (all areas)    |
| **Notification: Critical Task Created**      | ✓ (assigned)     | ✓ (area)         | ✓ (global)       |
| **Notification: Approaching SLA**            | ✓ (assigned)     | ✓ (area)         | ✓ (global)       |
| **Notification: Overdue (SLA Expired)**      | ✓ (assigned)     | ✓ (area)         | ✓ (global)       |
| **Field App Push Notification**              | ✓                | ✓                | ✓                |
| **Completed Section Analytics**              | ✗                | ✓ (area)         | ✓ (global)       |
| **Export (Audit / Task List)**               | ✗                | ✓ (area)         | ✓ (global)       |

---

## 4. Navigation Model

### 4.1 Web Application — Navigation Patterns

**Primary Navigation:** Left sidebar navigation (persistent, role-adaptive)

```
[Logo / Branding]
─────────────────
🏠  Dashboard
📋  Tasks         [badge: open task count]
📅  Scheduler
💬  Messages
📄  Documents
─────────────────
⚙️  Admin          [Admin only]
🔍  Search         [Global search — Admin only / area-scoped for others]
─────────────────
👤  User Profile
🔔  Notifications  [badge: unread count]
```

**Navigation Principles:**
- Tasks item carries a badge showing total active task count for the user's scope.
- Active navigation item uses `--leftnav-text-active: #3276CF` with left border indicator.
- All navigation items have a minimum touch target of 44×44px.
- Focus order: Skip-to-main → Top bar (notifications, profile) → Left nav → Main content.
- Skip link is the first focusable element on every page.

### 4.2 Task List — Contextual Navigation

- **Tab navigation within Tasks section:** Active | Completed (persistent across the task list views)
- **Task card expansion:** Accordion in-list — no page navigation required for quick review.
- **Task detail:** Available as full-page view (keyboard accessible, deep-linkable URL) for complex actions.
- **Breadcrumb:** Tasks > Active Tasks > TASK-00042 [shown in task detail full-page view]

### 4.3 Filter and Search — Navigation Model

- Filters persist within the session; cleared on explicit "Clear All" action.
- Active filters shown as dismissable chips above the task list.
- Business area filter (Manager/Admin) shown as a prominent segmented/tab control at top of task list.
- Search is persistent in toolbar; results update inline below the search bar.

### 4.4 Notification Navigation

- Notification bell in top bar; clicking opens notification panel (drawer/flyout).
- Each notification links directly to the relevant task detail.
- Notification types: Critical (red badge), Approaching SLA (amber badge), Overdue (red badge).
- Popup notifications (modal) appear for Critical creation, Approaching SLA, SLA Expiry — each fires once per event.

---

## 5. Content Taxonomy and Labelling

### 5.1 Task Status Labels

| System Status   | Display Label          | Colour Token             | Icon                    |
|-----------------|------------------------|--------------------------|-------------------------|
| Assigned        | Assigned               | `--color-primary`        | ● Assignment icon       |
| In Progress     | In Progress            | `--color-warning`        | ▶ Progress icon         |
| Reassigned      | Reassigned             | `--grey-600`             | ↔ Transfer icon         |
| Reprioritised   | Reprioritised          | `--color-primary-700`    | ↑↓ Priority icon        |
| Escalated       | Escalated              | `--orange-700`           | ↑ Escalation icon       |
| Cancelled       | Cancelled              | `--grey-500`             | ✗ Cancel icon           |
| Completed       | Completed              | `--color-success`        | ✓ Tick icon             |
| Overdue         | Overdue                | `--color-error`          | ⚠ Warning icon          |

### 5.2 SLA Indicator Labels

| SLA State         | Display Label              | Colour Token           | Additional Context         |
|-------------------|----------------------------|------------------------|----------------------------|
| Inside SLA        | Inside SLA                 | `--color-success`      | Time remaining shown       |
| Approaching SLA   | Approaching SLA — Xh Xm    | `--color-warning`      | Countdown shown            |
| Overdue           | Overdue                    | `--color-error`        | Duration exceeded shown    |

### 5.3 Priority Labels

| Priority   | Display Label | Colour Token         | SLA Duration          |
|------------|---------------|----------------------|-----------------------|
| Critical   | Critical      | `--color-error`      | 30 minutes            |
| High       | High          | `--orange-600`       | 60 minutes            |
| Medium     | Medium        | `--color-warning`    | 4 hours               |
| Low        | Low           | `--color-success`    | 8 hours               |

### 5.4 Action Labels (Status Action Dropdown)

| System Action                    | Display Label in Dropdown          | Tooltip / Description                                     |
|----------------------------------|------------------------------------|-----------------------------------------------------------|
| In Progress                      | Mark as In Progress                | Acknowledge you have started working on this task         |
| Action Completed                 | Mark as Complete                   | Task has been resolved and no further action is required  |
| Reassigned                       | Reassign                           | Transfer ownership to a colleague in the same area        |
| Reprioritise                     | Reprioritise                       | Change task priority — note: this will reset the SLA timer|
| Cancelled (Action no longer req.)| Cancel Task                        | Task is no longer actionable or required                  |
| Escalation                       | Escalate                           | Transfer to a senior user requiring immediate attention   |

---

## 6. URL Structure (Deep-Link Model)

```
/tasks                              → Active Tasks list (role-scoped)
/tasks/completed                    → Completed Tasks list
/tasks/create                       → Task creation form (Manager/Admin only)
/tasks/{task-id}                    → Task detail page (e.g., /tasks/TASK-00042)
/tasks/{task-id}/history            → Task history / audit trail

/admin/config/sla                   → SLA Configuration (Admin only)
/admin/config/sla/audit             → SLA Audit Trail (Admin only)

/search?q={query}&area={area}       → Global search results
```

---

## 7. IA Accessibility Considerations

- Every page has a descriptive `<title>` element (e.g., "Active Tasks — Engage" / "TASK-00042 — Task Detail — Engage").
- Skip-to-main link is the first focusable element on every page.
- Left navigation uses `<nav>` landmark with `aria-label="Primary navigation"`.
- Task list is a semantic `<ul>` with `<li>` per task card; role-appropriate ARIA labels.
- Status badges never use colour alone — always icon + text label + colour token.
- Tab panel switching (Active / Completed) uses `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-selected`.
- All filter controls are keyboard accessible; filter state change does not auto-submit — requires explicit apply or real-time update with `aria-live` announcement of result count.
- Notification panel drawer receives focus on open; focus trapped within; `Escape` dismisses.
- Confirmation modals use `role="dialog"`, `aria-modal="true"`, focus trapped, `aria-labelledby` and `aria-describedby`.
