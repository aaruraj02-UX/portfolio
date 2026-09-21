# User Journeys — FinOps · Ad-hoc Payments (Phase 3)

**Version:** 1.0 · 08 July 2026
**Scope:** Four end-to-end journeys across all Ad-hoc Payments personas, aligned to the Phase-3 prototypes.
**Template:** `templates/JourneyMap_Template.md` — *Stage · Actions · Thoughts · Feelings · Pain points · Opportunities*.

Each journey is followed by acceptance criteria and offline/online (session-resilience) transitions where relevant. "Offline-first equivalent" for this desktop-web finance workflow means **draft-and-resume + zero data loss on session drop**.

---

## Journey 1 — Requester raises a new ad-hoc payment

**Persona:** Priya (Finance Operations Analyst)
**Goal:** Raise a compliant one-off payment to a supplier and get it into the approval queue in under three minutes.
**Trigger:** A supplier email arrives requesting payment of an ad-hoc invoice.
**Success:** Request submitted, sitting in Approvals, requester sees a *Awaiting approval* status.

| Stage | Actions | Thoughts | Feelings | Pain points | Opportunities |
|---|---|---|---|---|---|
| **1. Discover** | Opens FinOps, clicks *Ad-hoc Payments ▸ Payments*, then *New request*. | "Where do I raise a one-off?" | Confident — clear entry point. | *(fixed in Phase 3: sidebar has one named entry point per screen.)* | Add a dashboard tile: *Raise ad-hoc payment* for one-click access. |
| **2. Beneficiary** | Types the supplier name (15 chars max). Clicks Next. | "Which name goes here — the trading name or the legal name?" | Slightly unsure. | 15-char cap is aggressive for some supplier names. | Show a hint under the field: *Use the name that appears on the invoice.* Show live character counter. |
| **3. Bank details** | Chooses *No — UK payment*, types sort code, account number, picks currency. | "Is this the right sort code? I don’t want to send it to the wrong account." | Anxious about accuracy. | Sort code format easy to mis-type. | 6-digit sort-code validation with auto-hyphenation (done). Account-number checksum (Phase 3.1). Confirm-account API check (Phase 3.2). |
| **4. Amount** | Enters net, chooses *VAT applicable = Yes*, enters VAT amount. Total updates live. | "Is the total correct?" | Reassured — sees total change live. | Users used to entering gross — need to be reminded VAT is on top. | Prefix labels with the currency symbol; add a small caption *Gross amount* next to the live Total. |
| **5. When** | Picks a due date from the calendar. Weekends and UK bank holidays are greyed out. The *Will reach recipient on* date updates. | "Will this be paid before the invoice deadline?" | Reassured — sees the reach date immediately. | Users don’t know the bank cut-off rules. | Callout *Payment Date Information* (done). Show the current system time next to the cut-off (Phase 3.1). |
| **6. What for** | Picks a payment reason. Ledger type, ledger number, and cost centre auto-populate. Attaches the invoice PDF and the line-manager approval email. Adds a comment. | "Am I sure this is the right ledger?" | Trusting the system defaults. | Requester may not know if a default is wrong. | Show a small "Auto-populated from *Reason*" chip next to each populated field; allow override with a *(edited)* audit note. Cap attachments at 10 (done). |
| **7. Review** | Reviews summary card, ticks *I confirm the details are correct*, clicks Submit. | "I don’t want to have to redo this." | Nervous → relieved. | Rejected requests currently require re-typing. | Draft-and-resume already retains data; add *Duplicate this request* on completed/rejected requests to accelerate re-raise. |
| **8. Confirmation** | Toast confirms submission; row appears in the list with status *Awaiting approval*. | "Did it definitely go?" | Confident. | Some environments hide toasts too fast. | Toast with an *Undo* link for 8 seconds; keep the row highlighted for 30 seconds. Auto-refresh the list. |

### Offline / session-resilience transitions

- If the browser tab crashes mid-wizard, on reopen the request appears as a Draft. Clicking *Resume* returns the requester to the last completed step with all fields restored (sort code re-formatted, VAT toggle restored, attachments listed).
- Attachment upload is chunked and retried on flaky connections; the file list shows a per-file spinner + retry action.

### Acceptance criteria

1. A first-time requester completes the wizard end-to-end in ≤ 3 minutes with no help.
2. The wizard cannot submit an invalid sort code, weekend/holiday due date, VAT-inconsistent total, or > 10 attachments.
3. Auto-populated ledger fields match the values defined in the Payment Reason lookup for the chosen reason.
4. On submit, the request appears with status *Awaiting approval* and the correct requester in the audit trail.
5. On tab crash, opening Ad-hoc Payments ▸ Payments shows a Draft with all data intact and a *Resume* action.

---

## Journey 2 — Approver reviews and approves (or rejects) a request

**Persona:** Marcus (Line Manager — Operations)
**Goal:** Clear the day’s approval queue in one sitting, with confidence that each approval is auditable.
**Trigger:** Approver receives an email (or opens FinOps at the start of the day).
**Success:** Every awaiting request is either approved or rejected with a reason; requesters are notified in each case.

| Stage | Actions | Thoughts | Feelings | Pain points | Opportunities |
|---|---|---|---|---|---|
| **1. Notify** | Sees an email *You have 4 requests awaiting approval*. | "How many? What’s the largest value?" | Task-focused. | Email doesn’t summarise totals or top values. | Batch email lists items with amount + reason; link deep to *Awaiting me* tab. |
| **2. Enter queue** | Clicks the email link → *Ad-hoc Payments ▸ Approvals ▸ Awaiting me*. | "Right, let me start with the biggest." | Confident. | List doesn’t sort by value by default. | Default sort by value descending in *Awaiting me*; sticky column selectors persist per user. |
| **3. Scan a row** | Sees Beneficiary, Amount, Reason, Requester, Cost centre. | "Does this look reasonable?" | Ready to act. | Approver needs attachment preview without opening full view. | Icon shows attachment count; hover reveals filenames. Row menu offers *Preview attachment*. |
| **4. Approve** | Clicks Approve (with optional comment). | "Done. Next." | Fast. | Approvers occasionally approve the wrong row. | *Undo* toast for 10 seconds; approvals only committed after undo window (Phase 3.1). |
| **5. Reject** | Clicks Reject; modal prompts for a mandatory reason; chooses *Missing evidence*; adds a note; confirms. | "The requester needs to know exactly what to fix." | Firm but fair. | Old flow’s reject was one-click with no reason. | Mandatory reason chosen from a controlled vocabulary + free-text note. Requester email shows both. |
| **6. Move on** | Row disappears from *Awaiting me*; counter decrements. | "How many left?" | Momentum. | Counter didn’t always decrement. | Optimistic UI: row fades out immediately, reconciles server-side; error rolls back with toast. |
| **7. Done** | Empty state: *You’re all caught up.* | "Great." | Satisfied. | Empty state currently shows a plain "No results". | Empty state shows a positive message, next-actions (*View team requests*, *Adjust notification frequency*). |

### Acceptance criteria

1. Approver can approve or reject any awaiting request without leaving the row (drawer only on demand).
2. Reject requires a controlled reason and optionally a note; requester receives an email with both.
3. Approver has visible attachment indicator per row.
4. Empty state gives a positive message + next actions.
5. All approve/reject actions appear in the request timeline with actor + timestamp + note.

---

## Journey 3 — Treasury generates files and confirms outcomes

**Persona:** Nadia (Treasury Officer)
**Goal:** Batch-generate Lloyds files for the day’s approved payments, submit to the bank, then mark each line Complete or Failed so the journal is right.
**Trigger:** Daily run at ~ 11:30 (pre-14:00 cut-off) and again at ~ 16:00 for after-cut-off items.
**Success:** All approved lines end the day either Complete (journal written) or Failed (requester notified with reason); no journal entry exists for a failed payment.

| Stage | Actions | Thoughts | Feelings | Pain points | Opportunities |
|---|---|---|---|---|---|
| **1. Enter** | Opens *Ad-hoc Payments ▸ Generated Files*. | "How many are queued this run?" | Focused. | Old view mixed Lloyds and Journal tabs; Treasury tabbed constantly. | Two clear tabs (done). Lloyds header shows count of approved lines waiting. |
| **2. Generate Lloyds** | Selects approved lines → *Generate Lloyds file*. | "Just the Lloyds — journal comes later." | Reassured (Phase-3 separates them). | Old flow generated journal at the same time. | Lloyds and Journal are now decoupled (done). Confirmation modal reminds *Journal will be generated only when you mark each line Complete.* |
| **3. Send to bank** | Downloads file, transfers to the bank portal. | "Standard process." | Routine. | Manual step. | Phase 3.2: direct SFTP push option with confirmation callback. |
| **4. Wait / receive bank response** | Receives per-line success or failure from the bank. | "Which ones failed?" | Attentive. | Bank response file is CSV; manual matching. | Phase 3.1: import bank response file, auto-mark lines. |
| **5. Mark Complete** | Selects successful lines → *Mark Complete*. Journal generates. | "Ledger will now be right." | Confident. | Bulk mark previously flaky. | Bulk mark with progress bar and per-line error surfacing. |
| **6. Mark Failed** | Selects failed lines → *Mark Failed*. Modal requires a reason (e.g. *Bank rejected — insufficient beneficiary details*). Adds a note. Requester emailed with reason. | "Requester needs a clear next step." | Focused. | Old flow gave no reason; requesters chased Treasury. | Reason from controlled list + free-text note. Notification includes both and a deep link to the request so the requester can edit and resubmit. |
| **7. Verify** | Checks Journal tab — new journal file exists for the completed lines only. | "Perfect — no failed lines in the journal." | Relieved. | Old flow contaminated the journal. | Journal tab shows "0 failed-line entries" as a KPI badge (Phase 3.2). |

### Acceptance criteria

1. Generating a Lloyds file does **not** generate a journal.
2. Journal generation only occurs on *Mark Complete*.
3. *Mark Failed* requires a controlled reason and triggers a requester notification with the reason.
4. Bulk operations show progress and per-line errors.
5. Journal tab shows an audit-friendly one-to-one mapping between completed request lines and journal entries.

---

## Journey 4 — Admin (Treasury) adds a new Payment Reason

**Persona:** Karan (Treasury Admin)
**Goal:** Add a new payment reason with default paying-from, ledger, and cost centre so that requesters get correct auto-populate values on day one.
**Trigger:** Business asks for a new reason (e.g. *Compensation — customer complaint*).
**Success:** Reason appears in the Payments wizard dropdown; selecting it auto-populates the ledger and cost centre fields correctly.

| Stage | Actions | Thoughts | Feelings | Pain points | Opportunities |
|---|---|---|---|---|---|
| **1. Enter** | Opens *Ad-hoc Payments ▸ Payment Reason*. | "Let’s add a new one." | Confident. | Old flow required a dev release. | Treasury owns the lookup (done). |
| **2. Add** | Clicks *Add payment reason*; drawer opens. | "What are the mandatory fields?" | Neutral. | Old form didn’t indicate required. | Required fields marked with `*` and hinted in the label. |
| **3. Basics** | Enters name; leaves status *Active*. | "Name should read naturally in the dropdown." | Careful. | Naming inconsistency across reasons. | Show existing names alphabetically in a side-panel for reference. |
| **4. Default paying-from** | Picks bank, types sort code (6 digits, auto-hyphenated), picks currency and legal entity. | "Must match Treasury’s book." | Careful. | Sort code mistyped in old flow. | 6-digit validation (done); error line explains the fix. |
| **5. Ledger & cost centre** | Picks ledger type; types ledger number; types cost centre (`CC-XXXX · Name`). | "Requesters should never see the wrong ledger." | Focused. | Auto-populate map was hard-coded in old build. | Fields drive the wizard auto-populate map (done). |
| **6. Save** | Clicks *Save reason*. Toast confirms. Row appears in the list. | "New reason should show up in the wizard now." | Satisfied. | Cache invalidation used to lag. | Optimistic list update; wizard dropdown refreshes on next open. |
| **7. Verify** | Opens *Payments ▸ New request*; picks the new reason; ledger and cost centre auto-populate. | "It works." | Confident. | – | Add a *Preview in wizard* action in the drawer that opens a test-mode wizard step 5 with the new reason pre-selected (Phase 3.2). |

### Acceptance criteria

1. A Treasury admin can add a new reason and see it available to requesters within one refresh.
2. Sort code accepts only 6 digits, with live formatting.
3. All three ledger fields (type, number, cost centre) are optional at the lookup level (a reason like *Other* is intentionally blank) but if any of them are provided, they are used in the wizard auto-populate.
4. Deactivating a reason (`status = Inactive`) removes it from the wizard dropdown but keeps historical values on already-submitted requests.
5. Changes are audit-logged with actor + timestamp; a monthly report is generated for governance.

---

## Cross-journey acceptance summary

- Every state transition (Draft → Awaiting → Approved / Rejected / Complete / Failed) is recorded in a timeline visible to all authorised roles.
- Every failure to the user is stated with a fix (WCAG SC 3.3.3 *Error Suggestion*).
- No destructive action fires without a confirmation or undo (WCAG SC 3.3.4 *Error Prevention*).
- All personas share the same sidebar, header, help affordance, and colour/badge semantics (WCAG SC 3.2.3, SC 3.2.4, SC 3.2.6).
- The Ad-hoc module’s KPIs (time to submit, first-time-right, journal purity, notification delivery, satisfaction, a11y conformance) are all measurable end-to-end.
