# Personas — FinOps · Ad-hoc Payments (Phase 3)

**Version:** 1.0 · 08 July 2026
**Template:** `templates/Persona_Template.md` — *Name / Role · Goals · Frustrations · Daily Tasks · Motivations · Tech Comfort · Quotes*.
**Guidance:** `skills/uiux/personas.instructions.md`. Personas below reflect the desktop-web finance-workflow context; the field-agent Android persona from the wider MET catalogue is out of scope for this module.

Four primary personas cover 100% of the Phase-3 flows.

---

## Persona 1 — Priya Sharma · Finance Operations Analyst (Requester)

**Sound-bite:** *"I just need to raise it correctly the first time — I don’t want to be pinged tomorrow."*

**Age:** 29 · **Location:** Manchester office · **Reports to:** Finance Operations Lead
**Team:** Finance Operations (5) · **Tenure:** 2 years at Acme, 4 years total
**Channel:** Web (desktop, dual monitor); Microsoft Teams; Outlook.

### Goals
- Raise ad-hoc payments quickly and correctly, first time.
- Never have to ask Treasury a basic question ("which ledger?") again.
- Know exactly when the money will land, so she can reassure the supplier or requesting colleague.
- Keep an audit trail so she can prove she did the right thing.

### Frustrations
- Long, flat forms with fields she doesn’t know off the top of her head (ledger, cost centre).
- No confirmation of *when* the payment will reach the beneficiary.
- Rejections without a reason — she rebuilds from scratch.
- Losing form data when her browser tab crashes.
- Bulk notifications that flood her inbox with per-line emails.

### Daily tasks
- Triages 5–15 ad-hoc payment requests per week for her business unit.
- Chases missing evidence from colleagues (invoice PDFs, line-manager approval emails).
- Coordinates timing with Treasury for large or urgent payments.
- Attends month-end close and helps reconcile any mis-posted items.

### Motivations
- Being reliable — team lead trusts her with the more complex requests.
- Speed — she wants to close her queue by end of day.
- Learning the finance domain — but she is not a qualified accountant.

### Tech comfort
- **Medium-high.** Comfortable with Excel formulas, keyboard shortcuts, and web apps. Not a developer.
- Uses both mouse and keyboard; will use Tab through a form if it flows well.
- Notices when a UI is inconsistent — flags it in Teams.

### Accessibility considerations
- No known accessibility needs. Prefers larger text at end of day (uses browser zoom ~ 110%).

### Quotes
- *"Just tell me what you need — don’t make me guess."*
- *"If it’s going to fail, tell me why before I submit — not after."*
- *"The stepper looked clickable and I clicked past validation once — never again."*
- *"I trust the system to pick the right ledger if it knows the reason."*

### Design implications
- Prompt-led wizard, one question per step.
- Auto-populate ledger + cost centre from reason; make overrides possible but audit them.
- Live totals + will-reach date; calendar blocks weekends and UK bank holidays.
- Draft-and-resume; retain form state across tab crashes.
- Reject notifications carry the reason inline.

---

## Persona 2 — Marcus Okafor · Line Manager (Approver)

**Sound-bite:** *"Give me enough on the row to approve safely, and don’t make me open a drawer every time."*

**Age:** 42 · **Location:** London office, hybrid · **Reports to:** Operations Director
**Team:** Operations (12 direct + 40 dotted) · **Tenure:** 6 years at Acme
**Channel:** Web (desktop primary; occasional laptop from home); Outlook.

### Goals
- Clear the approval queue in one or two sittings per day.
- Approve safely — have enough context on the row without opening every request.
- Reject with a clear reason so the requester can fix it without a Teams chat.
- Keep an auditable trail — his signature is on every approval.

### Frustrations
- Rows that don’t show cost centre or attachment count — forces a drawer.
- One-click rejects with no reason (old flow) — audit team keeps flagging them.
- Approving a duplicate by accident because two requests look identical.
- Notification emails that don’t summarise value or count.

### Daily tasks
- Reviews and approves/rejects 10–30 ad-hoc payment requests per day at peak.
- Signs off supplier and vendor payments up to a delegation threshold; escalates above.
- Attends weekly operations review; occasional finance sync.
- Manages 12 direct reports (people work, not payments).

### Motivations
- Being trusted with delegated authority — doesn’t want to lose that trust.
- Efficiency — approval is 5% of his job, not 50%.
- Fairness — every rejection should be explainable.

### Tech comfort
- **High** for the tools he uses daily (Outlook, Teams, FinOps).
- **Medium** for anything new — prefers strong defaults over configurability.
- Keyboard user for repetitive actions when shortcuts exist.

### Accessibility considerations
- Colour-vision confirmed OK. Uses dark-mode-preferring OS but FinOps is light-mode only in Phase 3.
- Would benefit from keyboard shortcuts (`A` = approve, `R` = reject with comment) — Phase 3.1 candidate.

### Quotes
- *"If I have to open the drawer to see the cost centre, I’ve already lost 20 seconds."*
- *"I want to reject in one modal, not three."*
- *"Don’t email me every time — batch it or let me set a digest."*
- *"Show me the biggest value first — that’s where my attention should go."*

### Design implications
- Approvals list row must carry: reference, beneficiary, amount, reason, requester, cost centre, attachment indicator.
- Reject modal with a controlled reason vocabulary + free-text note.
- Undo window on approve / reject actions.
- Optimistic UI updates: row fades out immediately, queue counter decrements.
- Empty state on *Awaiting me* is positive and actionable.

---

## Persona 3 — Nadia Petrov · Treasury Officer

**Sound-bite:** *"Generate the bank file today; write the journal only when the money has actually moved."*

**Age:** 38 · **Location:** Head office · **Reports to:** Head of Treasury
**Team:** Treasury (4) · **Tenure:** 5 years at Acme, 12 years in treasury/banking
**Channel:** Web (dual monitor: FinOps + Excel + bank portal); Outlook; occasional command-line.

### Goals
- Deliver a correct daily payment run — every Lloyds file balanced, every journal line traceable.
- Never let a failed payment reach the general ledger.
- Notify requesters promptly when a payment fails, with a reason they can act on.
- Own and curate the payment-reason lookups so the business is self-serving.

### Frustrations
- Old system generated Lloyds and Journal together — one failed payment poisoned the ledger.
- Bank response file matched manually against FinOps lines — error-prone.
- Failure reasons inconsistent across officers — requesters bounced back for clarification.
- Bulk operations that silently partial-failed.
- Reference-data changes that required an engineering ticket and a release.

### Daily tasks
- Runs two payment cycles per day (pre-14:00 and after-14:00).
- Generates Lloyds files, sends to bank, reconciles bank response, marks lines Complete or Failed.
- Owns Payment Reason lookup governance (with the Treasury admin).
- Attends daily finance stand-up and monthly close.

### Motivations
- Correctness — audit findings are personal.
- Predictability — she wants a system that respects her guardrails.
- Empowering the business — she prefers self-serve lookups over ticket queues.

### Tech comfort
- **High.** Comfortable with pivot tables, SFTP, bank portals, ISO 20022. Not a developer, but comfortable with CSVs and file formats.
- Deeply distrusting of any automation she can’t explain.

### Accessibility considerations
- No known access needs. Prefers dense information layouts and multi-select tables.

### Quotes
- *"If it can’t explain the failure, I don’t want the system marking it Failed."*
- *"The journal is the record — treat it that way."*
- *"Give me bulk actions with real progress, not just a spinner."*
- *"I don’t want to file a ticket to add a new reason."*

### Design implications
- Lloyds file generation must **not** trigger journal generation.
- Journal generation happens only on *Mark Complete*, per line.
- *Mark Failed* requires a controlled reason + free-text note; requester email carries both.
- Bulk operations show progress and per-line errors with recovery.
- Payment Reason lookup fully self-serve; changes never rewrite historical data.
- All Treasury actions appear in the request timeline with actor + timestamp.

---

## Persona 4 — Karan Iyer · Treasury Admin (Reference-data owner)

**Sound-bite:** *"I’m the librarian — small changes here have big consequences downstream."*

**Age:** 34 · **Location:** Head office · **Reports to:** Head of Treasury
**Team:** Treasury Operations (2) · **Tenure:** 3 years at Acme
**Channel:** Web (single monitor); Outlook; Teams.

### Goals
- Keep the Payment Reason lookup accurate, complete, and current — with no engineering dependency.
- Make sure requesters get correct auto-populated ledger and cost-centre values.
- Preserve the integrity of historical data — deactivate, don’t delete.
- Provide a clean audit trail for governance and month-end sign-off.

### Frustrations
- Old lookup was code-controlled — every change was a release.
- No preview of impact before saving.
- Sort-code entry errors that led to failed payments.
- Deactivations that broke old drafts.

### Daily tasks
- Adds new payment reasons when the business asks (a few per month).
- Edits existing reasons (ledger drift, cost-centre re-orgs, sort-code corrections).
- Publishes a monthly change log for governance.
- Trains new Treasury joiners on the lookup and its consequences.

### Motivations
- Accuracy and clarity.
- Being useful without being a bottleneck.
- Ownership of a well-run reference-data domain.

### Tech comfort
- **Medium-high.** Comfortable with structured data, filters, imports, exports. Not a developer.
- Reads the audit log; understands why non-destructive edits are important.

### Accessibility considerations
- No known access needs.

### Quotes
- *"If I deactivate a reason, don’t touch anything that already used it."*
- *"Give me the same form for Add and Edit, please."*
- *"Show me who edited what, when, and why."*
- *"Requesters shouldn’t know I exist — they should just see the right defaults."*

### Design implications
- Same drawer for Add and Edit; consistent required-field indicators.
- 6-digit sort-code validation at entry.
- Deactivate (not delete) preserves historical requests.
- Audit metadata visible in the drawer: *created by / on*, *last edited by / on*.
- Auto-populate map is *derived* from the lookup — no parallel hard-coded map.
- Export (CSV) and monthly diff report for governance.

---

## Persona map at a glance

| Persona | Frequency of use | Primary screens | Key capability | Highest-risk action |
|---|---|---|---|---|
| Priya — Requester | 5–15 requests / week | Payments (list + wizard) | Prompt-led wizard, auto-populate, draft/resume | Submitting the wrong sort code or wrong cost centre |
| Marcus — Approver | 10–30 approvals / day | Approvals | Row-level approve/reject with reason | Approving a duplicate; rejecting without reason |
| Nadia — Treasury | 2 cycles / day | Generated Files | Lloyds file gen; Mark Complete / Failed | Marking a failed payment Complete |
| Karan — Admin | ~ 5 lookup edits / month | Payment Reason | Self-service lookup | Deactivating a reason mid-cycle |

All four personas share:

- The **same shell, sidebar, header, help affordance, and colour semantics**.
- The **same audit trail** on every request.
- **Consistent verbs** — Submit, Approve, Reject, Complete, Fail — used identically across screens.
- **WCAG 2.2 AA** parity — no persona benefits from an inaccessible shortcut over another.
