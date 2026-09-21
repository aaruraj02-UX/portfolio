# UX Handoff Package
## FieldSync Field App — Task Management & SLA Workflow Module

| Field               | Detail                                               |
|---------------------|------------------------------------------------------|
| **Project**         | FieldSync Field App — Task Management & SLA Workflow    |
| **Prepared by**     | UX Team                                              |
| **Date**            | March 2026                                           |
| **Handoff Version** | 1.0 — Pre-Development Baseline                      |
| **Framework**       | React + MUI v5 (`@mui/material`)                    |
| **Design System**   | MET-DS-V2                                            |

---

## 1. Deliverable Index

All UX artefacts are located in `d:\VS\Engage\UX_Deliverables\`. The following deliverables are included in this handoff package:

| # | File                              | Description                                                       | Status   |
|---|-----------------------------------|-------------------------------------------------------------------|----------|
| 1 | `01_UX_Brief.md`                  | Project brief, objectives, constraints, scope                    | ✅ Final  |
| 2 | `02_Personas.md`                  | 3 user personas: Agent, Manager, Admin                           | ✅ Final  |
| 3 | `03_Empathy_Maps.md`              | Empathy maps for all 3 personas                                  | ✅ Final  |
| 4 | `04_Task_Analysis.md`             | Workflow decomposition for 13 key task flows                     | ✅ Final  |
| 5 | `05_Information_Architecture.md`  | Sitemap, navigation model, role-based access matrix              | ✅ Final  |
| 6 | `06_User_Journeys.md`             | 4 end-to-end journey maps with emotional curves                  | ✅ Final  |
| 7 | `07_Wireframes.html`              | Annotated HTML prototype (7 screens, MET-DS-V2 tokens, WCAG 2.2 AA) | ✅ Final |
| 8 | `08_Heuristic_Evaluation.md`      | Nielsen 10 heuristics + WCAG 2.2 AA evaluation with remediation backlog | ✅ Final |
| 9 | `09_UX_Research_Plan.md`          | Research objectives, methods, scenarios, participant profiles     | ✅ Final  |
| 10| `10_UX_Backlog.csv`               | 25 prioritised UX issues with problem and solution statements    | ✅ Final  |
| 11| `11_UX_Handoff_Package.md`        | This document                                                    | ✅ Final  |

---

## 2. Design System Reference — MET-DS-V2

### 2.1 Core Token Reference

All components must reference design tokens from the `:root` CSS block or MUI theme. Never hardcode hex values.

| Token                   | Value       | Usage                                      |
|-------------------------|-------------|--------------------------------------------|
| `--color-primary`       | `#3276CF`   | Primary buttons, active nav, focus ring, links |
| `--color-primary-dark`  | `#1E5CA8`   | Button hover/active states                |
| `--color-error`         | `#E53935`   | Error text, error badge, error toast       |
| `--color-error-dark`    | `#D32F2F`   | Error text on white (5.1:1 contrast verified) |
| `--color-warning`       | `#FF9800`   | Approaching SLA badge, warning toast       |
| `--color-success`       | `#43A047`   | Completed badge, success toast             |
| `--color-bg`            | `#F2F5FA`   | Page background                            |
| `--color-card`          | `#FFFFFF`   | Cards, panels, modals                      |
| `--color-text-primary`  | `#212121`   | Body text, headings                        |
| `--color-text-secondary`| `#757575`   | Labels, metadata, captions                 |
| `--color-border`        | `#E0E0E0`   | Card borders, dividers, input outlines     |
| `--color-focus`         | `#3276CF`   | Focus ring colour                          |
| `--radius-card`         | `8px`       | Cards, modals, inputs                      |
| `--radius-pill`         | `100px`     | Status badges, filter chips, SLA pills     |
| `--font-size-h1`        | `24px`      | Page titles                                |
| `--font-size-h2`        | `20px`      | Section headings                           |
| `--font-size-h3`        | `16px`      | Sub-section headings                       |
| `--font-size-body`      | `14px`      | Standard body text                         |
| `--font-size-caption`   | `12px`      | Timestamps, metadata, helper text          |
| `--space-2`             | `8px`       | Base unit (3× applied = 24px standard gap)|

### 2.2 MUI Theme Configuration

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#3276CF', dark: '#1E5CA8' },
    error:   { main: '#E53935', dark: '#D32F2F' },
    warning: { main: '#FF9800' },
    success: { main: '#43A047' },
    background: { default: '#F2F5FA', paper: '#FFFFFF' },
    text: { primary: '#212121', secondary: '#757575' },
  },
  shape: { borderRadius: 8 },
  spacing: 4, // MUI spacing base = 4px; use multiples of 2 to achieve 8pt grid
  typography: {
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    h1: { fontSize: '1.5rem', fontWeight: 600 },
    h2: { fontSize: '1.25rem', fontWeight: 600 },
    h3: { fontSize: '1rem', fontWeight: 600 },
    body1: { fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem' },
  },
  components: {
    MuiButton:    { defaultProps: { disableElevation: true } },
    MuiCard:      { defaultProps: { elevation: 0 } },
    MuiTextField: { defaultProps: { variant: 'outlined' } },
  },
});
```

---

## 3. Component Specifications

### 3.1 Task Card (List Item)

**Purpose:** Displays a single task entry in the task list panel.

**States:** Default / Hovered / Focused / Expanded / Selected / Overdue / Approaching SLA / Completed / Cancelled

**Collapsed state content (required elements):**
| Element           | Content                                             | Notes                                       |
|-------------------|-----------------------------------------------------|---------------------------------------------|
| Task ID           | e.g., TASK-00005                                    | Caption size; text-secondary                |
| Task Title        | e.g., "Meter fault inspection — 14 Oak Lane"       | Body 14px; text-primary; semibold           |
| SLA Pill          | e.g., "Overdue by 1h 20m"                          | icon + text + background colour token       |
| Status Badge      | e.g., "In Progress"                                 | icon + text + colour token pill             |
| Priority Label    | e.g., "High"                                        | Caption; text-secondary                     |

**Expanded state adds:**
- Assigned agent name + Business Area
- Creation date + Last modified
- Task description
- Inline action panel (Agent role) OR Reassign / Escalate prompt (Manager role)

**ARIA:**
```html
<li role="listitem" aria-label="TASK-00005 — Meter fault inspection — In Progress — Overdue">
  <button aria-expanded="false" aria-controls="task-00005-detail">…</button>
```

**MUI Reference:** `<Card>` + `<CardContent>` + `<Collapse>` for accordion behaviour

---

### 3.2 Action Panel

**Purpose:** Allows Agent/Manager to submit a lifecycle action on a task.

**Components:**
- Action type `<Select>` — labelled "Select action"
- Comment `<TextField multiline>` — labelled "Comment (required)"
  - Helper text: "Minimum 10, maximum 100 characters. Allowed: letters, numbers, spaces, , . - \" /"
  - Live character counter displayed below input: `{count}/100 characters`
  - `inputProps={{ maxLength: 100 }}`
- Submit `<Button variant="contained">` — disabled until action selected + comment valid
- Reminder banner — `<Alert severity="info">` — hidden once comment ≥ 10 chars

**Validation rules (client-side):**
- Comment length: 10–100 characters
- Allowed pattern: `/^[a-zA-Z0-9 ,."\-\/]+$/`
- Validate on each `onChange` event — not only on submit

**ARIA on Submit button when disabled:**
```html
<Button disabled aria-describedby="submit-hint">Submit</Button>
<span id="submit-hint" className="sr-only">
  Enter a valid comment of at least 10 characters to enable this button.
</span>
```

**States:** Idle / Comment too short / Invalid character / Comment valid / Submitting / Success / Error

---

### 3.3 Confirmation Modal

**Purpose:** Confirms an irreversible task lifecycle action before submission.

**Props:** `actionType`, `taskId`, `taskTitle`, `currentSla`, `agentName` (for reassignment)

**Dynamic content rules:**

| Action Type   | Modal Title (colour)      | Body Summary                                    |
|---------------|---------------------------|-------------------------------------------------|
| Mark Complete  | "Mark as Complete" (green header) | Task ID + Title; "SLA status will be recorded at time of completion." |
| Cancel Task    | "Cancel Task" (red header)       | Task ID + Title; "This action cannot be undone." |
| Reassign       | "Reassign Task" (blue header)    | Task ID; New owner name; "SLA continues — timer not reset." |
| Escalate       | "Escalate Task" (amber header)   | Task ID; Escalation target; "SLA continues — timer not reset." |
| Reprioritise   | "Reprioritise Task" (amber header)| Task ID; Old priority → New priority; **"SLA timer will reset. New deadline: [calculated]."** |

**Required ARIA:**
```html
<dialog role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-body">
  <h2 id="modal-title">Mark as Complete</h2>
  <div id="modal-body">…</div>
  <footer>
    <Button onClick={onCancel}>Cancel</Button>
    <Button variant="contained" onClick={onConfirm}>Confirm</Button>
  </footer>
</dialog>
```

**Focus management:** Move focus to modal heading on open. Return focus to trigger button on close. Focus trap active while modal is open.

---

### 3.4 SLA Status Pill

**Purpose:** Communicates SLA urgency on task cards, detail pages, and dashboard.

**Variants:**

| State            | Icon     | Label                      | Background Token        | Text Token             |
|------------------|----------|----------------------------|-------------------------|------------------------|
| Inside SLA       | ✓ (check)| "Inside SLA (2h 30m)"     | `--color-success` @12% | `--color-success`      |
| Approaching SLA  | ⚠ (warn) | "Approaching (15m left)"  | `--color-warning` @12% | `--color-warning-dark` |
| Overdue          | ✗ (cross)| "Overdue by 1h 10m"       | `--color-error` @10%   | `--color-error-dark`   |

**Rules:**
- Never use colour alone — icon and label are mandatory.
- Always use `--radius-pill: 100px`
- Countdown shown in: Xd Xh Xm format (omit leading zero segments)
- ARIA: `aria-label="SLA: Overdue by 1 hour 10 minutes"` on pill (includes full text for screen readers)

---

### 3.5 Toast Notifications

| Type          | `role`    | `aria-live`  | Auto-dismiss | Close button |
|---------------|-----------|--------------|--------------|--------------|
| Success       | `status`  | `polite`     | 8s (pause on focus/hover) | Yes |
| Info          | `status`  | `polite`     | 8s           | Yes          |
| Warning       | `status`  | `polite`     | 8s           | Yes          |
| Error         | `alert`   | `assertive`  | No           | Yes (required) |
| Critical SLA  | `alert`   | `assertive`  | No           | No — requires Acknowledge button |

**Position:** Bottom-left, stacked vertically. Maximum 3 visible at once — queue additional.

---

### 3.6 User Picker (Reassignment Dialog)

**Purpose:** Allows Manager to select an agent to reassign a task to.

**Content per list item:**
- Agent full name
- Workload badge: count of active tasks (colour-coded)
- Last active timestamp (e.g., "Active 5 mins ago")
- Business Area label

**Workload colour rules:**
- 0–4 active tasks: `--color-success`
- 5–7 active tasks: `--color-warning`
- 8+ active tasks: `--color-error`

**Filter applied:** Restricted to agents in the same Business Area as the task. Show label above list:
`"Showing agents in [Business Area] only"` — never suppress or hide this filter.

**ARIA:**
```html
<div role="dialog" aria-label="Reassign task — select an agent" aria-modal="true">
  <ul role="listbox" aria-label="Available agents">
    <li role="option" aria-selected="false">…</li>
  </ul>
</div>
```

---

### 3.7 SLA Configuration Table (Admin)

**Purpose:** Allows Admin to view and edit SLA thresholds by priority level.

**Columns:** Priority | SLA Duration | Last Modified | Modified By | Last Change Reason | Actions

**Behaviour on Edit:**
1. Inline edit panel slides in (right panel or accordion below row)
2. Current value pre-populated
3. Impact warning appears if value would reclassify active tasks
4. Reason for Change field (mandatory, 10+ chars)
5. Save / Cancel buttons always visible in edit panel
6. On Save: confirmation toast + audit entry written

**ARIA:** Each row has a unique ID for `aria-labelledby`; edit panel associated with row via `aria-controls`.

---

## 4. Screen-by-Screen Acceptance Criteria

### WF-01 — Task Dashboard (Manager)

| AC# | Criterion                                                                                       | Priority |
|-----|-------------------------------------------------------------------------------------------------|----------|
| AC-01-01 | Dashboard displays 4 metric tiles: Total Tasks, Inside SLA, Approaching SLA, Overdue.  | Must     |
| AC-01-02 | Each tile is a focusable button; activating applies the corresponding filter to the task list. | Must |
| AC-01-03 | Task list defaults to linear accordion card layout (not grid).                                 | Must     |
| AC-01-04 | Each task card in the collapsed state shows: Task ID, Title, SLA Pill, Status Badge, Priority. | Must |
| AC-01-05 | SLA Pill shows icon + text + colour (never colour alone).                                      | Must     |
| AC-01-06 | Dashboard data refreshes every 60 seconds with "Last updated: Xs ago" label.                  | Must     |
| AC-01-07 | Business Area Switcher visible in toolbar for Manager (own area default) and Admin (all areas).| Must     |
| AC-01-08 | Filter chips above list allow filtering by: Status, Priority, Agent, Date. Active filter shows × clear. | Must |
| AC-01-09 | All interactive elements have visible focus ring: `outline: 2px solid #3276CF; outline-offset: 2px`. | Must |
| AC-01-10 | Page includes `<a href="#main">Skip to main content</a>` as first focusable element.           | Must     |

---

### WF-02 — Task Detail + Action Panel (Agent)

| AC# | Criterion                                                                                       | Priority |
|-----|-------------------------------------------------------------------------------------------------|----------|
| AC-02-01 | Task detail shows all fields as read-only after creation: Title, Description, Priority, Area, Assignee, Task ID. | Must |
| AC-02-02 | Task history accordion visible in detail panel; expanded by default for Manager/Admin roles.   | Must     |
| AC-02-03 | SLA status and countdown visible in task header area.                                          | Must     |
| AC-02-04 | SLA business hours notice displayed: "SLA calculated within business hours: Mon–Fri 08:00–16:00." | Must |
| AC-02-05 | Action panel contains: action type select + comment textarea + submit button.                  | Must     |
| AC-02-06 | Comment hint text displayed before typing: "Minimum 10, maximum 100 characters. Allowed: letters, numbers, spaces, , . - \" /" | Must |
| AC-02-07 | Live character counter shown on first keypress: "{count}/100 characters".                      | Must     |
| AC-02-08 | Invalid characters prevented on input; inline warning shown immediately (not on submit).       | Must     |
| AC-02-09 | Reminder banner ("Add a comment to proceed") hides once comment reaches 10+ characters.        | Must     |
| AC-02-10 | Submit button disabled with `aria-describedby` hint until action + valid comment provided.     | Must     |
| AC-02-11 | Activating Submit opens confirmation modal with dynamic content matching selected action.       | Must     |
| AC-02-12 | On "Reprioritise" selection in dropdown: inline SLA reset warning shown before submission.     | Must     |

---

### WF-03 — Confirmation Modal

| AC# | Criterion                                                                                       | Priority |
|-----|-------------------------------------------------------------------------------------------------|----------|
| AC-03-01 | Modal uses `role="dialog"` with `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.   | Must     |
| AC-03-02 | On modal open: focus moves to modal heading (or first CTA if heading is decorative).           | Must     |
| AC-03-03 | Focus is trapped within modal: Tab and Shift+Tab do not reach background content.              | Must     |
| AC-03-04 | On modal close: focus returns to the element that triggered the modal.                         | Must     |
| AC-03-05 | Modal title and body content reflect the specific action type (not generic placeholder text).  | Must     |
| AC-03-06 | Reprioritise modal explicitly states: new priority level, new SLA deadline, and SLA timer reset notice. | Must |
| AC-03-07 | Cancel/dismiss button present and clearly labelled; positioned before Confirm in tab order.    | Must     |
| AC-03-08 | Pressing Escape closes the modal (for non-irreversible actions); Confirm/Cancel available for all. | Must |

---

### WF-04 — Critical Task Popup

| AC# | Criterion                                                                                       | Priority |
|-----|-------------------------------------------------------------------------------------------------|----------|
| AC-04-01 | Critical popup appears when a Critical priority task is assigned; uses `role="alert"` with `aria-live="assertive"`. | Must |
| AC-04-02 | Popup shows: Task ID, Task Title, Priority (Critical), SLA remaining (30 minutes), Source (who assigned). | Must |
| AC-04-03 | Popup includes an Acknowledge button; acknowledgement is logged in task history.               | Must     |
| AC-04-04 | Popup does not auto-dismiss; persists until Acknowledged.                                      | Must     |
| AC-04-05 | SLA timer in popup counts down in real time.                                                   | Must     |
| AC-04-06 | On Field App: push notification triggers; Acknowledge button available from notification. If not acknowledged within 10 minutes, auto-escalates. | Must |

---

### WF-05 — User Picker (Reassignment)

| AC# | Criterion                                                                                       | Priority |
|-----|-------------------------------------------------------------------------------------------------|----------|
| AC-05-01 | User picker shows only agents in the same Business Area as the task.                          | Must     |
| AC-05-02 | A label above the list always displays: "Showing agents in [Area] only."                      | Must     |
| AC-05-03 | Each agent row shows: name, workload count (colour-coded), last-active timestamp.             | Must     |
| AC-05-04 | Workload count colours: ≤4 = success, 5–7 = warning, 8+ = error. Never colour alone.         | Must     |
| AC-05-05 | Selection is keyboard operable: arrow keys navigate list; Enter/Space selects.                | Must     |
| AC-05-06 | Selected agent is announced to screen reader immediately on selection.                        | Must     |
| AC-05-07 | Focus trapped within picker dialog; returns to trigger on close.                              | Must     |

---

### WF-06 — SLA Configuration (Admin)

| AC# | Criterion                                                                                       | Priority |
|-----|-------------------------------------------------------------------------------------------------|----------|
| AC-06-01 | SLA config table shows: Priority, Duration, Last Modified date, Modified By, Last Reason.     | Must     |
| AC-06-02 | Edit action opens inline panel with current value pre-filled and a Reason for Change field.   | Must     |
| AC-06-03 | Reason for Change is mandatory (minimum 10 characters); Save button disabled until satisfied. | Must     |
| AC-06-04 | Impact warning shown if the value change would reclassify active in-flight tasks.             | Must     |
| AC-06-05 | Cancel button always visible alongside Save in the edit panel.                                | Must     |
| AC-06-06 | On Save: success toast, audit trail entry created, table row updated.                         | Must     |
| AC-06-07 | SLA Audit Trail accessible below config table; shows full history with date range filter.     | Must     |
| AC-06-08 | Export buttons: "Download CSV" and "Download PDF" — export audit trail filtered by current date range. | Must |

---

### WF-07 — Toast Notifications

| AC# | Criterion                                                                                       | Priority |
|-----|-------------------------------------------------------------------------------------------------|----------|
| AC-07-01 | Success/info/warning toasts use `role="status"` and `aria-live="polite"`.                     | Must     |
| AC-07-02 | Error/critical toasts use `role="alert"` and `aria-live="assertive"`.                         | Must     |
| AC-07-03 | Non-critical toasts auto-dismiss after minimum 8 seconds; timer pauses on keyboard focus or mouse hover. | Must |
| AC-07-04 | Error toasts do not auto-dismiss; require explicit close (×) button.                          | Must     |
| AC-07-05 | Close (×) button present on all toasts; minimum 44×44px target size.                          | Must     |
| AC-07-06 | Toast text is meaningful and complete ("TASK-00005 marked as Complete" not "Success").         | Must     |
| AC-07-07 | Maximum 3 toasts visible simultaneously; additional toasts queue below stack.                 | Should   |

---

## 5. Error States

| Screen               | Error Trigger                                | Error Message                                                                                       | Recovery              |
|----------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------|
| Comment Box          | Comment < 10 chars on submit attempt         | "Comment is too short (X/10 characters minimum). Please add at least Y more characters."           | Continue typing       |
| Comment Box          | Invalid character typed                      | Inline inline warning: "'{char}' is not an allowed character. Allowed: letters, numbers, spaces, , . - \" /" | Remove character |
| Action Panel         | Submit fails (network error)                 | Error toast: "Action could not be saved — check your connection and try again. [Retry]"            | Retry button in toast |
| SLA Config Save      | Save fails                                   | Inline error below Save: "Save failed — please try again. If problem persists, contact support."   | Retry or cancel edit  |
| User Picker          | No agents available in area                  | Empty state: "No agents available in [Area] at this time. Contact your Area Manager."              | Close picker          |
| Dashboard            | Data load fails                              | Inline banner: "Unable to load task data. [Retry]" — tiles show "--" (em-dash) not zero           | Retry via link        |
| Authentication       | Session expired                              | Full-page message: "Your session has expired. Please sign in again." — redirect to login          | Sign-in redirect      |

---

## 6. Empty States

| Screen               | Empty Trigger                                | Empty State Content                                                                                 |
|----------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Task List            | No tasks match current filters               | Icon + "No tasks match your current filters." + [Clear filters] button                            |
| Task List            | Agent has no tasks assigned                  | Icon + "You have no tasks assigned right now."                                                     |
| Dashboard — Overdue  | Zero overdue tasks                           | Tile shows "0" with green text; on drill-through: "No overdue tasks — great work!"                |
| Task History         | No history events                            | "No history recorded for this task yet."                                                           |
| SLA Audit Trail      | No audit entries in date range               | "No SLA changes recorded in the selected date range."                                              |
| User Picker          | No agents in business area                   | "No agents available in [Area] at this time. Contact your Area Manager."                          |

---

## 7. Offline and Sync States

| Scenario                        | Behaviour                                                                                              |
|---------------------------------|--------------------------------------------------------------------------------------------------------|
| Browser loses connectivity      | Show persistent banner: "You are offline — task updates may not save. Reconnecting…" with spinner.   |
| Connectivity restored           | Banner updates: "Back online." Automatically retry any pending actions.                              |
| Submission fails (offline)      | Store action locally in sessionStorage. On reconnect: prompt "You have 1 pending action — submit now?" |
| SLA timer when offline          | Continue countdown from last known server time. On reconnect: reconcile and correct timer.           |
| Field App (push notification)   | Notification delivered via OS push — does not require app to be open.                                |
| Field App — acknowledgement offline | Queue acknowledgement; sync on reconnect. Show pending state in task history.                    |

---

## 8. Data Contracts and API Assumptions

### 8.1 Task Object

```typescript
interface Task {
  taskId: string;          // Format: "TASK-00001" — zero-padded 5 digits
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Assigned' | 'In Progress' | 'Reassigned' | 'Reprioritised' | 'Escalated' | 'Completed' | 'Cancelled' | 'Overdue';
  businessArea: string;
  assigneeId: string;
  assigneeName: string;
  createdAt: string;       // ISO 8601
  updatedAt: string;       // ISO 8601
  slaDeadline: string;     // ISO 8601 — calculated in business hours (08:00–16:00 Mon–Fri)
  slaStatus: 'inside' | 'approaching' | 'overdue';
  slaRemainingMinutes: number | null;  // null if overdue or completed
  history: TaskHistoryEntry[];
}
```

### 8.2 Task History Entry

```typescript
interface TaskHistoryEntry {
  eventId: string;
  eventType: 'Assigned' | 'In Progress' | 'Completed' | 'Cancelled' | 'Reassigned' | 'Escalated' | 'Reprioritised';
  timestamp: string;         // ISO 8601
  performedByUserId: string;
  performedByName: string;
  comment: string;           // 10–100 chars; chars: [a-zA-Z0-9 ,."\-\/]
  fromValue?: string;        // e.g., "Low" (for priority change)
  toValue?: string;          // e.g., "High"
  slaResetApplied?: boolean; // true when reprioritisation resets SLA timer
}
```

### 8.3 SLA Configuration Entry

```typescript
interface SlaConfig {
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  durationMinutes: number;   // e.g., 30 for Critical
  lastModifiedAt: string;    // ISO 8601
  lastModifiedByUserId: string;
  lastModifiedByName: string;
  lastChangeReason: string;  // 10+ chars
}
```

### 8.4 SLA Calculation Rules
- Business hours: Monday–Friday 08:00–16:00 (local time)
- SLA timer paused outside business hours
- SLA does NOT reset on Reassignment or Escalation
- SLA DOES reset on Reprioritisation (new duration from time of reprioritisation, within business hours)
- SLA alert threshold: fires once at 25% remaining duration (single fire per task)
- SLA calculated server-side; UI receives `slaDeadline` ISO timestamp and derives countdown client-side

### 8.5 Comment Validation
- Client-side pattern: `/^[a-zA-Z0-9 ,."\-\/]{10,100}$/`
- Server-side: match same pattern; reject and return 400 with `{ error: "INVALID_COMMENT", message: "…" }` if invalid
- Never silently modify comment characters on save

### 8.6 Role-Based API Access
- Agent: read own tasks only; write actions on own assigned tasks
- Manager: read all tasks in own business area; write reassign/reprioritise/escalate across own area
- Admin: read all tasks across all areas; write SLA configuration; read audit trail

---

## 9. i18n and Localisation Notes

| Item                       | Notes                                                                                          |
|----------------------------|------------------------------------------------------------------------------------------------|
| **Language**               | English (UK) — use UK spelling throughout (e.g., "Reprioritised" not "Reprioritized").        |
| **Date format**            | DD/MM/YYYY (UK format) — e.g., "14/03/2026"                                                  |
| **Time format**            | 24-hour clock — e.g., "14:30" not "2:30 PM"                                                  |
| **SLA countdown format**   | Xd Xh Xm — omit leading zero segments (e.g., "1h 15m" not "0d 1h 15m")                      |
| **Character encoding**     | UTF-8 — comment box restricts to ASCII subset; display-only text supports full UTF-8         |
| **Right-to-left (RTL)**    | Not required for v1.0 — design uses flex/grid layout that supports RTL extension in future   |
| **Task ID**                | Non-translatable — always display as TASK-XXXXX regardless of locale                          |
| **Status labels**          | Must appear verbatim as defined in content taxonomy (IA document Section 6.4) — do not abbreviate |

---

## 10. Accessibility Implementation Notes

### Required on every page / view:
- `<html lang="en">` on every page
- `<a class="skip-link" href="#main-content">Skip to main content</a>` as the very first focusable DOM element
- `<main id="main-content">` wraps all primary page content
- ARIA landmarks: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section aria-label="…">` as appropriate
- `:focus-visible` ring: `outline: 2px solid #3276CF; outline-offset: 2px` on every interactive element
- `@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }`

### Component-specific requirements:
| Component              | Requirement                                                                                  |
|------------------------|----------------------------------------------------------------------------------------------|
| Icon-only buttons      | `aria-label` required on every icon button (e.g., notification bell, close ×, refresh)     |
| Status badges          | `aria-label` must read full status text (not rely on icon alone)                            |
| SLA Pills              | `aria-label="SLA: Overdue by 1 hour 10 minutes"` — full text for screen readers            |
| Modals                 | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`, focus trap    |
| User Picker            | `role="listbox"` + `role="option"` + `aria-selected` on each item                         |
| Toast Notifications    | `role="alert"` (error/critical) or `role="status"` (success/info); `aria-live` set accordingly |
| Dropdown (Action)      | `aria-describedby` linking to action description helper text                               |
| Comment textarea       | `aria-describedby` linking to both hint text and error message                            |
| Submit button (disabled)| `aria-describedby` linking to explanation of what is needed to enable                    |
| Dashboard tiles        | `aria-label="View X Overdue tasks"` if interactive                                        |
| Accordion cards        | `aria-expanded` state toggled on expand/collapse trigger                                   |

### Minimum touch / click target sizes:
- Primary action buttons: ≥ 44×44px
- Secondary icon buttons: ≥ 44×44px
- Absolute minimum for any interactive element: 24×24px (WCAG 2.5.8 AA)
- Filter chips: ≥ 44×44px recommended (frequently used)

---

## 11. Analytics and Instrumentation

### Recommended Events to Track

| Event Name                    | Trigger                                              | Properties                                         |
|-------------------------------|------------------------------------------------------|----------------------------------------------------|
| `task_action_submitted`       | Agent/Manager submits task action                    | taskId, actionType, userRole, slaStatus at time   |
| `task_action_failed`          | Action submission fails (validation or network)      | taskId, actionType, failureReason                  |
| `comment_validation_error`    | Comment fails validation                             | errorType (too_short / invalid_char), charCount   |
| `sla_alert_shown`             | SLA 25% remaining popup fires                        | taskId, priority, remainingMinutes                 |
| `critical_task_popup_shown`   | Critical task popup displayed                        | taskId                                             |
| `critical_task_acknowledged`  | Agent acknowledges Critical popup                    | taskId, timeToAcknowledgeSeconds                   |
| `reassignment_completed`      | Task successfully reassigned                         | taskId, fromAgentId, toAgentId, businessArea       |
| `sla_config_changed`          | Admin saves SLA configuration change                 | priority, oldDuration, newDuration, hasImpactedTasks |
| `metric_tile_clicked`         | Dashboard metric tile activated                      | tileType (overdue / approaching / inside / total) |
| `filter_applied`              | Task list filter applied                             | filterType, filterValue                            |
| `business_area_switched`      | User switches Business Area in switcher             | fromArea, toArea, userRole                         |

### QA Checklist (Post-Development)

| Check                                                              | Tool / Method                  |
|--------------------------------------------------------------------|-------------------------------- |
| WCAG 2.2 AA automated scan                                         | axe-core / Lighthouse          |
| All interactive elements reachable by keyboard only (no mouse)     | Manual keyboard-only walkthrough |
| Screen reader test: NVDA + Chrome + all critical flows             | Manual with NVDA               |
| All toast announcements read aloud correctly                       | Screen reader test              |
| 200% zoom layout intact (no overflow, no data truncation)          | Browser zoom test              |
| 320px viewport reflow (no horizontal scroll)                       | Responsive DevTools             |
| Focus ring visible at all times on all interactive elements        | Visual QA                       |
| Colour contrast: all text ≥ 4.5:1; UI components ≥ 3:1           | Colour Contrast Analyser       |
| Comment validation: client + server-side patterns match            | Unit test + API integration test |
| SLA calculation matches business hours rule (08:00–16:00)         | Unit test with edge cases       |
| SLA reset fires ONLY on reprioritisation (not reassign/escalate)  | Integration test                |
| Confirmation modal content matches action type (not generic)       | Automated snapshot test         |
| Task ID sequential format TASK-00001                               | DB constraint + API test        |

---

*End of UX Handoff Package — FieldSync Field App Task Management & SLA Workflow Module v1.0*
