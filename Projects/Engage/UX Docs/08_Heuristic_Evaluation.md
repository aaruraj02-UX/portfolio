# Heuristic & Accessibility Evaluation
## FieldSync Field App — Task Management & SLA Workflow Module

| Field          | Detail                                  |
|----------------|-----------------------------------------|
| **Project**    | FieldSync Field App — Task Module          |
| **Prepared by**| UX Team                                 |
| **Date**       | 10 March 2026                           |
| **Standard**   | Nielsen's 10 Usability Heuristics + WCAG 2.2 AA |
| **Version**    | 1.0                                     |

---

## Overview

This evaluation assesses the Task Management and SLA Workflow module against Nielsen's 10 Usability Heuristics and WCAG 2.2 Level AA accessibility criteria. Issues are rated using Nielsen's severity scale (0–4) combined with a business impact rating (Low / Medium / High) to prioritise remediation.

### Severity Scale (Nielsen)
| Severity | Label          | Definition                                             |
|----------|----------------|--------------------------------------------------------|
| 0        | Not a problem  | Agree it is not a usability problem                    |
| 1        | Cosmetic       | No need to fix unless extra time available             |
| 2        | Minor          | Low priority — fix in next iteration                   |
| 3        | Major          | Important to fix — high priority                       |
| 4        | Catastrophic   | Imperative to fix before product launch                |

---

## Part 1 — Nielsen's 10 Usability Heuristics

### H1 — Visibility of System Status

| Issue ID | Module / Screen                  | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|----------------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H1-01    | Task List                        | SLA time remaining is not visible on the task list row — users must open each task to see SLA status.     | 3        | High            | Add SLA status pill (Inside SLA / Approaching SLA [countdown] / Overdue) to every task card row.     |
| H1-02    | Task Action Flow                 | Submit button is disabled without explanation of why — user does not know what is missing.                | 3        | High            | Display tooltip on disabled button: "Enter a valid comment (minimum 10 characters) to enable."        |
| H1-03    | Dashboard Metrics                | Dashboard tiles do not indicate when they were last refreshed — data may be stale.                        | 3        | Medium          | Add "Last updated: Xs ago" timestamp beneath tiles; auto-refresh every 60 seconds.                   |
| H1-04    | Task Action Submission           | No loading indicator during API call after action submission — user may click multiple times.              | 3        | Medium          | Show spinner on Submit button during processing; disable button during call.                          |
| H1-05    | Task Status Update               | After action is submitted, no visual confirmation that status changed in the list — task card not updated. | 3        | High            | Show toast notification with task ID and new status; refresh task card state inline.                  |
| H1-06    | SLA Configuration (Admin)        | No indication of current SLA values being live vs saved draft — users unsure if pending changes apply.    | 2        | Medium          | Add "Saved" / "Unsaved changes" state indicator in the edit panel header.                            |
| H1-07    | Reprioritisation                 | No real-time preview of new SLA duration when selecting a new priority level before committing.            | 3        | High            | Show calculated SLA duration inline the moment a new priority is selected in the picker.              |

---

### H2 — Match Between System and Real World

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H2-01    | Status Action Dropdown   | "Action Completed" is formal and ambiguous — does not clearly communicate the agent is marking it done.   | 2        | Medium          | Relabel to "Mark as Complete" — natural language, result-oriented label.                              |
| H2-02    | Status Action Dropdown   | "Cancelled (Action no longer required)" is excessively verbose for a dropdown option.                     | 2        | Low             | Shorten to "Cancel Task" with a tooltip: "Task is no longer actionable or required."                 |
| H2-03    | Comment Box Reminder     | "Issue a comment for visibility" is formal corporate language — does not feel natural to field agents.     | 1        | Low             | Rephrase: "Please add a comment explaining what action you're taking and why."                        |
| H2-04    | SLA Labels               | "Inside SLA" / "Approaching SLA" / "Overdue" terminology may not be familiar to all users.                | 2        | Medium          | Add brief tooltips on first use: "Inside SLA = task is within the required timeframe."               |
| H2-05    | Task Lifecycle Status    | "Reprioritised" is spelt differently in the BRD (Reprioritised vs Reprioritized) — inconsistency.         | 1        | Low             | Standardise on "Reprioritised" (UK English) across all labels, tooltips, and audit entries.          |

---

### H3 — User Control and Freedom

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H3-01    | Task Completion          | Once "Mark as Complete" is confirmed, there is no undo capability — task moves to Completed tab.          | 3        | High            | Confirmation popup includes 5-second grace window with "Undo" option; after grace period, irreversible. |
| H3-02    | Reassignment             | Once reassignment is confirmed, original owner loses access to active task — no way to reclaim.           | 2        | Medium          | Confirmation popup clearly explains this; Manager can reverse via reassignment back.                  |
| H3-03    | Comment Input            | If a user selects a new action type after typing a comment, the comment is not cleared or preserved — UX ambiguous. | 2 | Medium    | Auto-clear comment when action type changes; warn user: "Changing the action will clear your comment." |
| H3-04    | Critical Task Popup      | Critical popup does not allow Escape key dismissal — user cannot close without acknowledging.             | 2        | Medium          | Documented behaviour for critical tasks — deliberate. Add clear "Acknowledge" CTA so user knows how to proceed. |
| H3-05    | SLA Config Edits         | No Cancel button is visible after initiating an edit in the SLA configuration panel.                      | 2        | Medium          | Always expose [Cancel] alongside [Save Changes] in edit panels.                                       |

---

### H4 — Consistency and Standards

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H4-01    | Action Dropdown Labels   | Action labels in dropdown do not match status labels used in history entries (e.g., "Reassigned" vs "Reassign"). | 2 | Medium | Use consistent verb form: actions = verb (e.g., "Reassign"), states = past participle (e.g., "Reassigned"). |
| H4-02    | Status Badges            | Status badge styling inconsistently applied — some use icons, some do not across screens.                 | 2        | Low             | Enforce icon + text label + colour token rule on every status badge without exception.                |
| H4-03    | Button Hierarchy         | Primary and secondary button styles not consistently applied — some modals use wrong hierarchy.            | 2        | Medium          | All primary actions: btn-primary (filled). All cancel/dismiss: btn-ghost. All secondary: btn-secondary. |
| H4-04    | Navigation Positioning   | Help or support link location not standardised across all views (WCAG 3.2.6 Consistent Help).             | 3        | High            | Place a "Help / Support" link in the same position (footer or top-right area) on every page.         |

---

### H5 — Error Prevention

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H5-01    | Comment Validation       | Users do not receive inline feedback on invalid characters until they submit — discovery only on failure.  | 4        | High            | Validate on each keystroke; show inline warning immediately when an invalid character is typed.       |
| H5-02    | Reprioritisation         | No warning shown to user that reprioritisation resets the SLA timer before they select the action.        | 4        | High            | Show inline info tooltip/callout when "Reprioritise" is highlighted in dropdown — before selection.   |
| H5-03    | Task Completion          | No distinction between Cancelled status and Completed status in confirmation popup — user may cancel by mistake. | 3 | High     | Use distinct popup colours and titles: Completion = green header "Mark as Complete", Cancel = red header "Cancel Task". |
| H5-04    | SLA Config Change        | No preview of downstream impact when an admin changes SLA duration — existing Approaching SLA tasks may be reclassified. | 3 | High | Show impact warning: "X tasks currently Approaching SLA for Critical will be recategorised as Inside SLA." |
| H5-05    | Reassignment Filter      | Business area filter is not visible to user in user picker — they may not realise the list is restricted. | 3        | Medium          | Show clear label in picker: "Showing Metering area agents only" — explain the filter applied.        |

---

### H6 — Recognition Rather Than Recall

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H6-01    | Comment Box              | Users do not know allowed characters without accessing documentation — must recall from training.         | 3        | High            | Show allowed characters inline below comment box on first focus: "Allowed: letters, numbers, , . - \" /" |
| H6-02    | SLA Priority Table       | Admins must recall what SLA values they previously set — not surfaced unless they remember to check table. | 2 | Medium   | Show last-changed metadata on every SLA table row (modified by, date, reason).                       |
| H6-03    | Escalation vs Reassign   | Users must recall the difference between Escalation and Reassignment — not described inline.              | 3        | High            | Provide inline description/tooltip on each option in dropdown when highlighted.                       |
| H6-04    | Task ID Format           | The TASK-00001 format is not explained to users — they may not know it is unique or how to search by it. | 1        | Low             | Include brief label near task ID: "Unique task reference — use for search."                          |

---

### H7 — Flexibility and Efficiency of Use

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H7-01    | Dashboard                | Filter selections do not persist between sessions — manager must re-apply preferred filters daily.        | 2        | Medium          | Persist last-applied filters in user session (browser session storage).                              |
| H7-02    | Metric Tile Drill-Through | No shortcut from metric tile to filtered list — requires separate filter application.                    | 3        | High            | Clicking a metric tile automatically applies the corresponding filter to the task list below.        |
| H7-03    | Keyboard Shortcuts        | No keyboard shortcuts documented for power users (Admin/Manager) — all navigation requires mouse.        | 1        | Low             | Consider: / for search focus, F for apply filter, T for new task — document in help overlay.         |
| H7-04    | Search                   | Search does not support task ID format (TASK-XXXXX) — must search by partial text only.                  | 2        | Medium          | Support exact-match task ID search in global search bar.                                             |

---

### H8 — Aesthetic and Minimalist Design

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H8-01    | Task Card (collapsed)    | Too much information visible on collapsed card — priority, status, SLA, agent, area all compete.          | 2        | Medium          | Prioritise: ID, Title, SLA Pill, Status Badge. Show agent name in collapsed view; secondary metadata on expand. |
| H8-02    | Reminder Banner          | Reminder banner appears persistently even after the user has already entered a comment.                   | 2        | Medium          | Hide the reminder banner once comment reaches 10+ characters — feedback indicates progress.          |
| H8-03    | SLA Audit Trail          | Audit trail table shows all audit entries without pagination — very long on scroll.                       | 2        | Low             | Implement pagination (25 rows per page) with date range filter applied by default.                   |

---

### H9 — Help Users Recognise, Diagnose, and Recover from Errors

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H9-01    | Comment Validation Error | Error message "Invalid input" does not explain which character was invalid or how to fix it.              | 4        | High            | Error: "Comment contains unsupported character: [char]. Allowed: letters, numbers, spaces, , . - \" /" |
| H9-02    | Comment Length Error     | Error states comment is too short but does not show how many more characters are needed.                  | 3        | High            | Error: "Comment is too short (5/10 characters minimum). Please add at least 5 more characters."      |
| H9-03    | Network / API Error      | If task action submission fails due to network error, there is no user-facing error message.              | 4        | High            | Show error toast: "Action could not be saved — check your connection and try again. [Retry]"         |
| H9-04    | SLA Config Save Error    | If SLA configuration save fails, inline edit panel does not communicate the failure.                     | 3        | High            | Show inline error below Save button: "Save failed — please try again. If problem persists, contact support." |

---

### H10 — Help and Documentation

| Issue ID | Module / Screen          | Issue Description                                                                                          | Severity | Business Impact | Recommendation                                                                                        |
|----------|--------------------------|------------------------------------------------------------------------------------------------------------|----------|-----------------|-------------------------------------------------------------------------------------------------------|
| H10-01   | All Screens              | No contextual help available — no tooltips on complex fields (e.g., SLA calculation method).              | 2        | Medium          | Add ? icon buttons next to complex fields linking to inline help text or help drawer.                |
| H10-02   | SLA Rules                | Business hours rule (08:00–16:00) for SLA calculation is not documented in the UI.                        | 3        | High            | Show inline note near SLA countdown: "SLA calculates within business hours: 08:00–16:00."            |
| H10-03   | Comment Rules            | Character rules (10 min, 100 max, allowed symbols) are not documented in context.                        | 3        | High            | Always show character hint below comment box — never require user to discover rules on error.        |
| H10-04   | Overall                  | No help/support link consistently placed across all pages.                                                | 3        | High            | Add "Help & Support" link in fixed position (footer or nav) on every page (WCAG 3.2.6).             |

---

## Part 2 — WCAG 2.2 Level AA Accessibility Checklist

### Critical Issues (Must Fix Before Launch)

| Issue ID | WCAG SC         | Module / Screen              | Issue                                                                                              | Severity | Fix                                                                                         |
|----------|-----------------|------------------------------|----------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------------------------|
| A-01     | 1.4.1 (AA)      | Task List Status Badges       | Status colours (red = overdue, amber = approaching) used without icon or text label on some variants. | 4   | Always pair colour with icon + text label. Never rely on colour alone for any badge.       |
| A-02     | 1.4.3 (AA)      | Comment Box Error Text        | Error message text `#E53935` on `#FFFFFF` background — meets 4.5:1 threshold minimally.           | 3        | Verify contrast: #E53935 on white = 4.49:1 — borderline. Use `#D32F2F` (error-dark) = 5.1:1. |
| A-03     | 2.4.7 (AA)      | All Interactive Elements      | Focus ring not consistently visible on all interactive elements in current prototype.              | 4        | Apply `outline: 2px solid #3276CF; outline-offset: 2px` to all `:focus-visible` states.  |
| A-04     | 2.5.8 (AA, NEW) | Action Buttons in Task Card   | Action buttons inside collapsed task cards may be below 24×24px target size.                      | 4        | Enforce minimum 44×44px for all primary action buttons; 24×24px absolute minimum for all. |
| A-05     | 4.1.2 (AA)      | Status Action Dropdown        | Dropdown does not announce selected value change to screen readers — aria-live not implemented.    | 4        | Ensure `<select>` announces change; add `aria-describedby` for action descriptions.        |
| A-06     | 4.1.3 (AA)      | Toast Notifications           | SLA approaching / overdue toasts do not use role="alert" or aria-live — not announced.            | 4        | Use `role="alert"` + `aria-live="assertive"` for urgent toasts; `role="status"` for others. |
| A-07     | 3.3.1 (AA)      | Comment Validation            | Errors identified only with red colour — no text identification of which field errored.            | 4        | Always use text label + icon for error identification; connect via `aria-describedby`.      |
| A-08     | 2.1.1 (A)       | Modal Dialogs                 | Focus does not trap within modal dialogs — keyboard users can tab behind modal to background.      | 4        | Implement focus trap on all `role="dialog"` modals; restore focus to trigger on close.     |
| A-09     | 2.4.1 (AA)      | All Pages                    | No skip-to-main link implemented — keyboard users must tab through full navigation on every page. | 4        | Add `<a href="#main">Skip to main content</a>` as first focusable element on all pages.    |
| A-10     | 3.2.6 (AA, NEW) | All Pages                    | Help / support mechanism not consistently positioned across views.                                | 3        | Place help link in the same position (e.g., footer) on every page/view.                   |

---

### Major Issues (Fix in Current Sprint)

| Issue ID | WCAG SC         | Module / Screen              | Issue                                                                                              | Severity | Fix                                                                                         |
|----------|-----------------|------------------------------|----------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------------------------|
| A-11     | 1.3.1 (A)       | Task List Table              | Task list uses `<div>` elements instead of semantic list/table markup.                            | 3        | Use `<ul>/<li>` for task list or `<table>` with proper headers if tabular data layout.      |
| A-12     | 2.4.6 (AA)      | Task Detail Page             | Heading hierarchy is incorrect — `<h1>` task title followed by `<h1>` action panel title.         | 3        | Use `<h1>` for page title; `<h2>` for major sections; `<h3>` for sub-sections.             |
| A-13     | 1.4.12 (AA)     | Task Cards                   | Card layout breaks at 200% text zoom on some viewports.                                           | 3        | Test all cards at 200% zoom; use relative units (rem/em) not fixed pixel heights.          |
| A-14     | 3.3.2 (AA)      | Mandatory Comment Field      | No instruction visible on what comment must contain before the user starts typing.                | 3        | Display hint text: "Minimum 10 characters. Allowed: letters, numbers, , . - \" /"          |
| A-15     | 2.4.3 (A)       | User Picker Dialog           | Focus not moved to dialog on open — keyboard users unaware dialog has appeared.                   | 3        | Move focus to dialog's first focusable element on open; announce with aria-modal="true".   |
| A-16     | 1.3.5 (AA)      | Task Creation Form           | Input fields for agent name, business area do not use `autocomplete` attributes.                  | 2        | Add appropriate `autocomplete` values to all applicable form fields.                       |
| A-17     | 2.4.11 (AA, NEW)| Action Panel Submit Button   | Focus ring may not meet 2.4.11 focus appearance requirements (area ≥ perimeter × 2px).           | 3        | Verify: `outline: 2px solid #3276CF; outline-offset: 2px` meets perimeter calculation.     |
| A-18     | 3.3.7 (AA, NEW) | Task Action Flow             | If agent changed action type mid-flow, previously entered comment is cleared — redundant re-entry. | 2     | Warn before clearing: "Changing the action will clear your current comment. Continue?"     |

---

### Minor Issues (Fix in Next Iteration)

| Issue ID | WCAG SC         | Module / Screen              | Issue                                                                                              | Severity | Fix                                                                                         |
|----------|-----------------|------------------------------|----------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------------------------|
| A-19     | 1.4.10 (AA)     | Task Dashboard               | Metric tiles do not reflow correctly at 320px viewport width.                                     | 2        | Metric grid: 1-column at 320px, 2-column at 480px, 4-column at 900px.                     |
| A-20     | 3.1.1 (A)       | All Pages                   | `<html lang="en">` not set on prototype.                                                          | 2        | Add `lang="en"` to `<html>` tag on every page.                                             |
| A-21     | 2.3.1 (A)       | SLA Overdue Visual           | Confirm no red overdue flash > 3 times per second if animated.                                    | 2        | Use static colour indicator — no animation that flashes; `prefers-reduced-motion` honoured. |
| A-22     | 2.2.1 (AA)      | Toast Notifications           | Non-urgent toasts auto-dismiss after a set duration — users may not have read them.               | 2        | Allow users to pause auto-dismiss on hover/focus; minimum 8 seconds before dismissal.      |
| A-23     | 2.5.3 (AA)      | Icon Buttons                | Filter chip buttons: `aria-label` must contain or match visible label text.                       | 2        | Ensure `aria-label` = visible text for all filter chips (currently label is implicit).      |

---

## Part 3 — MET Prototype Quick-Gate Results

| # | Check                                                            | Status  | Notes                                                                           |
|---|------------------------------------------------------------------|---------|---------------------------------------------------------------------------------|
| 1 | All normal text ≥ 4.5:1 contrast                                 | ✅ Pass  | #212121 on #FFFFFF = 16.1:1; #757575 on #FFFFFF = 4.48:1 — borderline secondary |
| 2 | All UI components ≥ 3:1 contrast                                 | ✅ Pass  | Border #E0E0E0 on #FFFFFF — review; icon colours pass                           |
| 3 | Focus ring visible on every interactive element                  | ⚠ Review| Not consistently applied across all components in current prototype              |
| 4 | Focus ring: outline 2px solid #3276CF; outline-offset 2px        | ✅ Pass  | CSS defined in prototype; needs consistent application                          |
| 5 | All targets ≥ 24×24px; primary actions ≥ 44×44px                 | ⚠ Review| Task card action buttons need audit for minimum target size                     |
| 6 | No drag-only interactions                                        | ✅ Pass  | No drag interactions in task module                                             |
| 7 | Error states use text + icon (not colour alone)                  | ⚠ Review| Comment error message — ensure icon consistently present                        |
| 8 | alt on every img; aria-label on every icon button                | ⚠ Review| Icon-only notification bell button needs `aria-label` audit                     |
| 9 | html lang="en" present                                           | ✅ Pass  | Set in wireframe HTML                                                           |
| 10| @media prefers-reduced-motion wraps all animations               | ✅ Pass  | Included in CSS token block                                                     |
| 11| Keyboard-only: no traps, logical tab order                       | ⚠ Review| Modal focus trap needs implementation; tab order needs end-to-end keyboard test |
| 12| Help/support link in same position on every view                 | ❌ Fail  | Not consistently placed — see H10-04, A-10                                     |
| 13| No re-entry of data already submitted in session                 | ✅ Pass  | Business area auto-populated from profile; no redundant entry identified        |
| 14| Auth flows support paste + password manager                      | ✅ Pass  | Out of scope for task module; login handled by existing auth                    |
| 15| Prerecorded video/audio has captions and transcript              | N/A      | No media in task module                                                         |
| 16| Nothing flashes > 3 times per second                             | ✅ Pass  | No animations that flash                                                        |
| 17| Time limits are user-adjustable or removable                     | ✅ Pass  | Toast auto-dismiss pauses on hover/focus; SLA timers are business requirement   |
| 18| Auto-playing audio has independent volume/pause control          | N/A      | No audio in task module                                                         |
| 19| Text is not presented as images of text                          | ✅ Pass  | All text is HTML text — no image-based text                                    |
| 20| Multiple routes exist to reach any page                          | ✅ Pass  | Direct URL, left nav, search, notification links all available                  |
| 21| Device-motion actions have UI alternative                        | ✅ Pass  | No device-motion interactions in task module                                    |

---

## Part 4 — Prioritised Remediation Backlog

| Priority | Issue IDs                              | Category                        | Target Release |
|----------|----------------------------------------|---------------------------------|----------------|
| P0       | A-01, A-03, A-04, A-05, A-06, A-07, A-08, A-09, H5-01, H9-01, H9-03 | Critical Accessibility + Critical Error Prevention | Before MVP |
| P1       | H1-01, H1-02, H1-05, H5-02, H5-03, H6-01, H6-03, H10-02, H10-03, H10-04, A-11, A-12, A-13, A-15 | High Usability + Major Accessibility | Sprint 1 post-MVP |
| P2       | H1-03, H1-04, H1-07, H3-01, H4-04, H7-02, H8-02, A-14, A-16, A-17, A-18 | Medium Usability + WCAG 2.2 new criteria | Sprint 2 |
| P3       | H2-01, H2-02, H4-01, H4-02, H7-01, H8-01, H8-03, A-19, A-20, A-22, A-23 | Cosmetic + Minor                | Iteration 3    |
