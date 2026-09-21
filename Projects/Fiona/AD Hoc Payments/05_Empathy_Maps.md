# Empathy Maps — FinOps · Ad-hoc Payments (Phase 3)

**Version:** 1.0 · 08 July 2026
**Template:** `templates/EmpathyMap_Template.md` — *Think & Feel · See · Say & Do · Hear · Pain · Gain*
**Emphasis:** Frustrations around form friction, delayed / missing notifications, invalid-date guessing, journal correctness. Design for **relief**: clear status, fewer fields, live derivations, session-safe drafts.

Four maps, one per primary persona (see `06_Personas.md`).

---

## Empathy Map 1 — Priya · Finance Operations Analyst (Requester)

**Context:** Raises 5–15 ad-hoc payments a week. Desktop, dual monitor. Under time pressure at month-end. Not a banker — knows the *what*, not the *plumbing*.

### Think & Feel
- "I hope I’ve got the right sort code."
- "Is this the right ledger for this reason? I never remember."
- "How long until the supplier actually gets the money?"
- **Feels:** anxious about accuracy, judged for mistakes, time-pressured, dependent on Treasury for answers.

### See
- A long form with fields she doesn’t recognise (ledger, cost centre) mixed with fields she does (name, amount).
- Progress stepper that looks clickable but isn’t.
- An email trail with the supplier’s invoice and the line manager’s approval.
- A date field that lets her pick a Saturday, only to be told later that it isn’t allowed.

### Say & Do
- Copies sort code from the invoice one character at a time.
- Opens Slack to ask Treasury *"What ledger for a court fee?"*.
- Retypes the beneficiary name because the 15-char limit truncated it.
- Rechecks total three times because VAT changed it.

### Hear
- Line manager: *"Just get it in today please."*
- Treasury (Slack): *"Use ledger 80510033 for court fees."*
- Supplier email: *"Chasing payment for invoice #4472."*
- Colleague: *"FinOps rejected mine — no reason given."*

### Pain
1. Guessing sort code format (with / without hyphens, leading zero).
2. Guessing which ledger / cost centre matches the payment reason.
3. Not knowing which day the supplier will actually receive the money.
4. Rejection emails that don’t say *why*, forcing a rebuild from scratch.
5. Attachments failing silently on flaky office Wi-Fi.
6. Losing all form data when the tab crashes.

### Gain
1. **Prompt-led wizard** — one question at a time, so she can’t get lost.
2. **6-digit sort-code validation with live formatting** — she can’t mis-type any more.
3. **Reason ▸ auto-populate** — ledger, ledger number, cost centre appear on their own.
4. **Live will-reach-date** — she sees when the money lands *before* clicking Submit.
5. **Calendar with weekends and UK bank holidays greyed out** — invalid dates are literally unclickable.
6. **Draft-and-resume** — safe to close the tab and come back.
7. **Reject reason surfaced** — she knows exactly what to fix.

### Design implications
- Keep every wizard step to one primary question.
- Show live derivations (total, will-reach date, auto-populated ledger) so the user sees consequence before commitment.
- Explain every "no" (invalid sort code, invalid date, missing evidence) with a fix, not just a fault.

---

## Empathy Map 2 — Marcus · Line Manager (Approver)

**Context:** Approves ad-hoc payments for his team. Not a finance specialist. Splits his day across email, FinOps, and operational tools. Wants to be fair, fast, and audit-safe.

### Think & Feel
- "Do I have enough to approve this safely?"
- "If I reject, will the requester know how to fix it?"
- "Am I about to approve a duplicate?"
- **Feels:** accountable, time-poor, uncomfortable with high-value approvals in ambiguity.

### See
- An inbox with a FinOps notification and 30 other things.
- A queue with rows he can scan quickly — beneficiary, amount, reason, requester.
- A drawer with attachments and a comment thread when he needs more context.
- Colleagues asking *"Have you approved mine yet?"*.

### Say & Do
- Skims the row, expands the drawer only for high-value or unusual reasons.
- Uses keyboard shortcuts when they exist.
- Types reject reasons quickly — appreciates a controlled dropdown.
- Batches approvals into a single sitting once or twice a day.

### Hear
- Requester on Teams: *"Any chance you can approve mine before lunch?"*
- Treasury: *"Please make sure high-value approvals include evidence."*
- Auditor: *"We need a reject reason on every rejection."*

### Pain
1. Approving with insufficient context (no attachment preview, no cost centre visible).
2. Old one-click rejects that gave no reason and no audit trail.
3. Approving duplicates because the queue doesn’t flag them.
4. Not knowing his queue depth without opening FinOps.
5. Losing his place in the list when a row is approved (page reload).

### Gain
1. Queue with amount, reason, cost centre, requester, attachment icon on the row.
2. Reject requires a controlled reason + free-text note; requester gets both.
3. Optimistic UI — approved row fades out; queue depth updates.
4. Undo window on approve/reject for accidents.
5. *Awaiting me* tab distinct from *All*; empty state feels rewarding.

### Design implications
- Approval density matters — don’t force a drawer for every action.
- All approvals must be reversible for a short window.
- Reject reason vocabulary should be small, opinionated, and audit-friendly.

---

## Empathy Map 3 — Nadia · Treasury Officer

**Context:** Runs the daily payment cycles. Owns the correctness of the general ledger. Painfully aware of the cost of a wrong journal entry. Uses spreadsheets and FinOps side-by-side.

### Think & Feel
- "The Lloyds file is one part. The journal is the *real* record."
- "If I mark a failed payment complete by mistake, I create a ledger problem."
- "Requesters need to hear about failures fast, with a reason."
- **Feels:** responsible for accounting truth, sceptical of automation, appreciative when a system respects her guardrails.

### See
- Two tabs: Lloyds files and Journal files.
- Bulk-generate action; download links; per-line action menu.
- The bank’s CSV response with successes and rejections.
- Approved lines waiting to be filed.

### Say & Do
- Generates Lloyds file → sends → waits for bank response → marks lines Complete or Failed.
- Manually cross-checks the bank response against the FinOps list on the second monitor.
- Fills in a failure reason from a mental list; rewrites it if she thinks a requester will be confused.
- Refuses to generate the journal until she is *certain* the payment landed.

### Hear
- CFO: *"Any surprises in this month’s payments?"*
- Auditor: *"Every journal line traces back to a completed payment."*
- Requester: *"Why did mine fail?"*

### Pain
1. Old system generated Lloyds + Journal together — failures polluted the ledger.
2. Manually matching bank response to FinOps lines.
3. No standardised failure reasons — requesters bounced back with clarifying questions.
4. Bulk actions occasionally silently partial-failed.
5. Reference-data changes required an engineering ticket.

### Gain
1. **Journal only on *Mark Complete*** — never on file generation.
2. **Mandatory failure reason** from a controlled list + free-text note.
3. **Bulk actions with progress + per-line error surfacing.**
4. **Payment Reason lookup owned by Treasury**, no dev needed.
5. Clear separation of Lloyds and Journal tabs; auditable one-to-one map.

### Design implications
- Confirmations before irreversible actions (mark Complete generates a journal line).
- Everything Treasury does must appear in the audit trail with actor + timestamp.
- Reference-data changes must be safe: additions and edits, but historical data must not be retroactively rewritten.

---

## Empathy Map 4 — Karan · Treasury Admin (Reference-data owner)

**Context:** Curates payment reasons, currencies, cost centres. Sees himself as the *librarian* of the Ad-hoc system. Not a coder; a business analyst by background.

### Think & Feel
- "If I get this reason wrong, hundreds of requests will post to the wrong ledger."
- "I want to add a reason without waiting for the next release."
- "Existing requests must not be silently rewritten."
- **Feels:** ownership, care, mild anxiety about ripple effects.

### See
- A list of reasons, filterable by status.
- A drawer for add/edit with three neat sections: Basics, Default paying-from, Default ledger & cost centre.
- Requesters pinging him: *"Can we add a reason for X?"*

### Say & Do
- Opens the drawer, mirrors an existing reason for consistency.
- Sanity-checks the sort code and ledger number with Treasury before saving.
- Deactivates rather than deletes obsolete reasons.
- Publishes a short note in Teams when a new reason goes live.

### Hear
- Requesters: *"There’s no reason for a compensation payment."*
- Treasury: *"Please make sure the cost centre matches the entity."*
- Auditor: *"We need a monthly diff of reason changes."*

### Pain
1. Old build required a code change for any new reason.
2. Sort-code errors slipped through and caused failed payments.
3. Deactivations sometimes broke old requests still in Draft.
4. No visible impact assessment before publishing changes.

### Gain
1. Self-service Payment Reason lookup with validation.
2. **6-digit sort code** enforced at entry.
3. Deactivate (not delete) preserves history; historical requests keep their original values.
4. Auto-populate map is derived from this lookup — changes take effect on the next wizard open.

### Design implications
- Never let a lookup change retroactively rewrite historical data.
- Show *last edited by / when* per reason.
- Provide an export (CSV) and a monthly change report for audit.

---

## Shared design implications across empathy maps

- **Speak plainly.** Errors say what to fix, callouts explain the rule (not the mechanism).
- **Live over lagged.** Totals, will-reach dates, auto-populated ledgers appear as the user types — not after Submit.
- **Guardrails, not gates.** Invalid dates and invalid sort codes are unreachable; overrides are auditable, not blocked.
- **Consistency across roles.** Requesters, approvers, and Treasury share the same layout, badges, verbs, and help affordance so cognitive load is minimised for anyone who wears more than one hat.
- **Session safety.** Nothing a user does in the wizard is lost on a tab close; nothing a Treasury officer does is silent — every action is audited and reversible where safe.
