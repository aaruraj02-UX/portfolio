# User Journeys — Integration Failure Management (IFM)

**Module:** FINOPS › Integration Failure Management
**Version:** 1.0 · 2026-06-10
**Aligned to:** [01_UX_Brief.md](01_UX_Brief.md) · [03_Information_Architecture.md](03_Information_Architecture.md) · `business/IFM/IFM_RBAC.xls`

---

## Journey index

1. [Finance Systems — Log a new failure and route it to Masterdata](#1-finance-systems--log-a-new-failure-and-route-it-to-masterdata)
2. [Finance Systems — Receive a returned record and close it](#2-finance-systems--receive-a-returned-record-and-close-it)
3. [Masterdata — Action a record in the With Masterdata queue](#3-masterdata--action-a-record-in-the-with-masterdata-queue)
4. [Finance Systems — Request a reopen on a resolved record](#4-finance-systems--request-a-reopen-on-a-resolved-record)
5. [Approver — Review and decide on a reopen request](#5-approver--review-and-decide-on-a-reopen-request)

---

## 1. Finance Systems — Log a new failure and route it to Masterdata

**Persona:** Claire (Senior Finance Systems Technician)
**Goal:** Log an integration failure and get it in front of Masterdata as quickly as possible.
**Trigger:** D365 daily processing report shows file `CIR_20260608_001` failed with “Missing Customer Translation”.
**Pre-conditions:** Claire is signed in to FINOPS as Finance Systems User. She has the failed filename and a draft Halo ticket number (`MHL-12045`) already raised.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Land** | Opens FINOPS → IFM module. Sees “All Records” by default. | “Right — fresh queue, let’s get this one in.” | Focused, calm. | None. | Role banner reassures her she’s on full-access view. |
| **2. Create** | Clicks `Log New Failure`. Side panel slides in. Processed Date auto-fills to today. | “Good, one less click.” | Relieved. | — | Continue autofilling sensible defaults (e.g. agent name from session). |
| **3. Classify** | Selects OS = Atlas. File Type list narrows to CIR/CPR/Daily Journal/OPR. Selects File Type = CIR. Selects Failure Type = `Missing Customer Translation`. | “Form is reacting — only the relevant fields shown.” | Confident. | — | Show a small hint when conditional sections appear (“Two extra fields now required”). |
| **4. Fill** | Enters Filename, Client Code, Parent Group (picks from list), Fees Amount, Commission Amount. Pastes Halo ticket `MHL-12045`. | “I’ll do the Halo number now while I remember.” | Productive. | Halo ticket sits in a separate tracking section — easy to miss the first time. | Always show Halo field in the primary required cluster, not below the fold. |
| **5. Submit** | Clicks `Submit`. Toast: “Failure record created.” Side panel closes. New row appears at top of table with status `Open`. | “Done. Now let’s send it across.” | Satisfied. | — | Offer a “Create another” shortcut for batch entry days. |
| **6. Select & send** | Checks the row checkbox. Selection bar appears with `Send Email`. Confirms in modal. | “One email instead of five. Good.” | In control. | If she forgot the Halo ticket, the system blocks Send — she has to reopen the record. | Inline validation: show Halo missing as a chip on the row before Send is clicked. |
| **7. Outcome** | Toast: “Email sent successfully.” Row badge changes to `With Masterdata`. Row drops out of the “All Open” view if she filters. | “Off my plate for now.” | Accomplished. | — | Subtle pulse animation on the badge so the status change is unmistakable. |

**Success criteria**
- Failure logged with all required fields in < 60 seconds.
- Halo ticket captured before the email is sent.
- Status `Open → With Masterdata` written to audit with timestamp + actor.

**Failure modes & recovery**
- *Missed Halo:* Send Email button disabled, row tagged with “Halo required” chip.
- *Wrong file type / failure type:* Edit allowed any time before Close.
- *Wrong OS:* Edit allowed; file type list re-filters.

---

## 2. Finance Systems — Receive a returned record and close it

**Persona:** Claire (Senior Finance Systems Technician)
**Goal:** Confirm Masterdata’s fix, run the redrop, capture the redrop ticket and close the record.
**Trigger:** In-app + email notification: “Record F-0036 returned to Finance Systems by Masterdata (Priya).”
**Pre-conditions:** Record exists in status `With Finance Systems`.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Notify** | Sees notification badge in top nav. Clicks → IFM opens with the record’s side panel pre-opened on Details. | “Already cued up — nice.” | Efficient. | If multiple records are returned, the notification list could grow. | Group notifications by hour. |
| **2. Read context** | Reviews Masterdata’s note. Switches to Audit Trail tab to confirm what was changed in D365. | “Translation added — I can redrop now.” | Confident. | Audit reads top-down; long histories require scroll. | Filter chips on Audit (Status only, Comments only). |
| **3. Redrop** | Runs redrop in upstream system. Receives a new Halo redrop ticket `MHL-12077`. | — | Routine. | Two systems to flip between. | Phase 3 — capture redrop trigger inside IFM. |
| **4. Capture** | Returns to IFM side panel. Enters Redrop Ticket No in tracking section. | — | — | Tracking section is below the conditional fields — a long scroll if file type adds many fields. | Keep tracking sticky at the top of the side-panel body in `With Finance Systems` mode. |
| **5. Close** | Clicks `Mark as Closed`. Toast: “Record marked as Closed.” | “Done.” | Satisfied. | — | Optional close reason picker (Resolved / Duplicate / No action). |
| **6. Verify** | Filters to “Resolved Records”. Record appears with `Closed` badge. | — | Done. | — | KPI hint: “Resolved in 1d 4h.” |

**Success criteria**
- Redrop ticket captured before close.
- Status `With Finance Systems → Closed` written to audit.
- Notification cleared from the in-app list.

**Failure modes & recovery**
- *Redrop fails upstream:* FS reverts status back to `With Masterdata` from the side panel.
- *Wrong record closed:* Reopen path (see Journey 4) — never an unaudited revert.

---

## 3. Masterdata — Action a record in the With Masterdata queue

**Persona:** Priya (Masterdata Analyst)
**Goal:** Fix the translation mapping in D365 and pass the record back to Finance Systems with a clear note.
**Trigger:** Email notification: “4 records assigned to Masterdata for review.”
**Pre-conditions:** Priya is signed in as Masterdata User.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Land** | Opens IFM from the email link. Sidebar shows only `Queue → With Masterdata`. Status card row shows only `With Masterdata`. Table is pre-filtered. | “Exactly the four records — no noise.” | Reassured. | — | Surface count next to the queue label (“With Masterdata · 4”). |
| **2. Triage** | Sorts by Parent Group to batch similar fixes. Sees a mix of Customer-on-Hold and Missing Customer Translation. | “Customer-on-Hold first — quickest.” | In control. | — | Saved sort per user. |
| **3. Open record** | Clicks first row. Side panel opens read-only. Reads OS, File Type, Failure Type, D365 Customer No. | “Got it.” | Focused. | Form is read-only but visually identical to the editable FS view — must be unmistakable. | Subtle “View only” pill at the top of the side panel; greyed inputs. |
| **4. Fix upstream** | Switches to D365, releases the customer hold. Verifies translation. | — | Routine. | Tool-switching. | Phase 3 — deep links from IFM into the relevant D365 master record. |
| **5. Note** | Returns to IFM. Adds note: “Customer C00099 released from hold; translation in place.” | — | — | Notes textarea is in the form body — needs scroll if many conditional fields. | Pin Notes section above conditional fields for MD role. |
| **6. Handoff** | Clicks `Move to Finance Systems`. Toast: “Status updated to With Finance Systems.” Side panel closes. Row disappears from queue. | “One down, three to go.” | Productive. | — | Inline “Next record” shortcut to keep momentum. |
| **7. Loop** | Repeats steps 3–6 for remaining records. | — | — | Repetition — but acceptable in v1. | Bulk “Move to Finance Systems” with shared note in Phase 2. |

**Success criteria**
- Status `With Masterdata → With Finance Systems` written to audit with note.
- FS team auto-notified.
- MD only ever sees records the FS team has explicitly assigned (no leakage).

**Failure modes & recovery**
- *Mistaken handoff:* MD raises a comment; FS can revert to `With Masterdata`.
- *Missing context in record:* MD adds a comment requesting clarification, then waits — does not change status.

---

## 4. Finance Systems — Request a reopen on a resolved record

**Persona:** Claire (Senior Finance Systems Technician)
**Goal:** Resurrect a closed record after discovering the redrop produced a downstream issue.
**Trigger:** AR team reports invoice mismatch tied to record F-0028.
**Pre-conditions:** Record is in status `Closed`. Approver (Anita) is on shift.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Find** | Filters Resolved Records. Searches `F-0028`. Opens side panel. | — | Focused. | — | — |
| **2. Confirm read-only** | Sees every field disabled. Footer shows only `Reopen`. Audit trail tab shows full history. | “Good — I can’t accidentally change anything.” | Reassured. | — | Persistent “Closed — read-only” pill at top of panel. |
| **3. Request** | Clicks `Reopen`. Modal appears: “Reopening a closed record requires administrator approval before it can be moved back to an active state.” | “Right — I’m raising a request, not reopening it myself.” | Clear-headed. | Modal lacks a reason field in v1 — Approver gets only a system message. | Add optional reason textarea to the modal (Phase 1.1). |
| **4. Submit** | Clicks `Send for Admin Approval`. Toast: “Reopen request sent for admin approval.” | “Approver has it now.” | Trusting. | — | Surface request status on the record (“Reopen requested · awaiting Approver”). |
| **5. Wait** | Continues other work. Notification icon shows pending count. | — | — | No SLA shown in v1. | Phase 2 — show median Approver response time. |
| **6. Outcome** | Approver approves → notification: “Reopen approved — record sent to Masterdata.” Record now in status `Open` (or `With Masterdata` if rules applied). | “Back in motion.” | Satisfied. | — | — |

**Success criteria**
- No status change on Closed → Open without Approver action.
- Reopen request, decision and resulting status change all written to audit.
- Originator notified of outcome (approve or reject).

**Failure modes & recovery**
- *Approver rejects:* Record stays Closed; FS sees a rejection toast with reason (Phase 1.1).
- *Approver inactive:* Phase 2 escalation policy — second approver after N hours.

---

## 5. Approver — Review and decide on a reopen request

**Persona:** Anita (Finance Systems Lead / Named Approver)
**Goal:** Make a defensible approve / reject decision quickly.
**Trigger:** In-app + email: “Reopen request raised for record F-0028 by Claire.”
**Pre-conditions:** Anita is signed in as Approver. Role switcher remembers her last role from a previous session.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Notify** | Sees in-app notification. Clicks → IFM opens, filter = `Closed`, side panel = F-0028 on Audit Trail tab. | “Audit first — best place to judge from.” | Methodical. | — | Default to Audit tab for Approver role. |
| **2. Investigate** | Reads audit timeline: created by Claire, sent to Masterdata, returned, closed. Switches to Details tab to read original fields. | “Reasonable case to reopen.” | Confident. | Long audit on heavily-handled records. | Filter chips on Audit (Status changes only). |
| **3. Decide** | Anita has two buttons in the footer: `Reject` and `Approve` (Approver-only). | “One click, one verdict.” | Decisive. | No reason field in v1. | Add optional decision note (Phase 1.1). |
| **4. Approve** | Clicks `Approve`. Toast: “Reopen approved — record sent to Masterdata.” Side panel closes. Record reappears in `With Masterdata` (or `Open`) view. | “Done. Claire is notified.” | Done. | — | — |
| **4b. Reject** *(alt path)* | Clicks `Reject`. Toast: “Reopen request rejected.” Record stays `Closed`. | — | Done. | — | Decision reason audit row. |
| **5. Audit** | Anita can re-open the record any time; her decision is in the audit timeline with timestamp. | “Defensible.” | Confident. | — | — |

**Success criteria**
- Decision recorded with actor, role, timestamp.
- Originating FS user notified.
- Status only flips when Approver actually approves.

**Failure modes & recovery**
- *Accidental approve:* Approver can immediately re-close the record (creating a new audit row).
- *Approver away:* Phase 2 — escalation to second approver after N hours.

---

## Cross-journey notes

- All journeys share the same **role switcher persistence** (`localStorage.fionaIfmRole`), so QA / training can move between personas without re-login.
- All journeys honour **WCAG 2.2 AA**: focus moves into the side panel on open, returns to the originating row on close; toasts are `role="status" aria-live="polite"`.
- All status transitions are **server-enforced**; UI gating is the helpful first line, never the only line.
