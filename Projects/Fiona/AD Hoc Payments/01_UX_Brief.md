# UX Brief — FinOps · Ad-hoc Payments (Phase 3)

**Product owner:** Treasury Team, Acme Holdings
**Design lead:** Arumugam V
**Prepared by:** UX Team (FinOps)
**Version:** 1.0 · 08 July 2026
**Status:** For sign-off (directional approval received from Paul Bliss & Seema Mathiyarasu)

**Source inputs**
- `business/AD-HOC/New Automation Request - Ad Hoc payments phase 3.pdf`
- `business/AD-HOC/Interview+Discussion.doc` (UX Review Meeting minutes)
- Existing Phase-3 prototypes: `UX_Deliverables/prototype/AdHocPayments.html`, `AdHocPaymentTypeLookup.html`, `AdHocApprovals.html`, `AdHocGeneratedFiles.html`
- Governance: `.github/copilot-instructions.md`, `skills/uiux/*.instructions.md`, WCAG 2.2 AA, MET-DS-V2

---

## 1. Background

FinOps’s Ad-hoc Payments module lets Acme teams raise one-off payments that fall outside the standard bulk-payment flow (e.g. refunds, court fees, supplier invoices, goodwill gestures). The current implementation:

- Only supports **direct bank payments** — not supplier or vendor payments.
- Presents a long, flat form where mandatory data must be **guessed** by the requester (bank details, ledger references, cost centre).
- Sends a **notification per line** on bulk uploads, flooding recipient inboxes.
- Generates the Lloyds bank file **and** the accounting journal at the same time — before Treasury has confirmed the payment succeeded, so failed payments contaminate the ledger.
- Success and failure notifications to requesters are **not currently firing**.
- Progress indicators appear clickable, tempting users to jump between stages and skip validation.

Phase 3 is a functional and experiential re-platforming of the module: it expands scope (all payment types), converts the form into a **prompt-led wizard**, moves reference data into Treasury-managed lookups, and separates the Lloyds file from the journal so the journal is only written on confirmed completion.

## 2. Objectives

**Business objectives**

1. Reduce time-to-submit for an ad-hoc payment by ≥ 40% by removing “guess-the-field” friction.
2. Eliminate journal contamination from failed payments (target: 0 failed-payment journals in a rolling 30 days).
3. Consolidate bulk-upload email traffic to **one email per batch** (target: > 95% reduction in notification volume for bulk runs).
4. Move all reference data (payment reasons, ledger defaults, currencies, cost centres) into Treasury-owned lookups so no code change is needed to add a new reason.
5. Restore reliable payment-success and payment-failure notifications to requesters (target: 100% delivery rate, with retry).

**UX objectives**

1. Deliver a **prompt-led, one-question-at-a-time** wizard that a first-time requester can complete unaided.
2. Auto-populate ledger account type, ledger account number, and cost centre from the selected payment reason — no re-keying.
3. Prevent invalid submissions at the field level (sort code = 6 digits; date ≠ weekend / UK bank holiday; total = net + VAT; max 10 documents).
4. Provide a **Draft → Resume** pattern so partially completed requests can be paused and returned to at the last completed step.
5. Meet **WCAG 2.2 Level AA** and the **MET-DS-V2** design system on every screen.

## 3. Target Users

| # | User type | Channel | Primary role |
|---|---|---|---|
| 1 | Requester (Finance / Operations) | Web desktop | Raises the payment request |
| 2 | Line manager / Approver | Web desktop + email | Approves or rejects requests |
| 3 | Treasury officer | Web desktop | Generates the Lloyds file, marks payments complete/failed, maintains lookups |
| 4 | System administrator (Treasury) | Web desktop | Manages Payment Reason, Currency, and Cost centre lookups |

Volumes (indicative, from stakeholder discussion): 30–80 requests/day; 3–5 Treasury officers; ~120 approvers; ~350 requester accounts across business units.

## 4. User Needs

- **Requesters** need to be *told* what to enter next, not guess. They need a clear indication of what the payment will cost and when it will land, plus proof they submitted the right ledger and cost centre.
- **Approvers** need enough context in one glance to approve or reject (beneficiary, amount, reason, evidence attachment, requester, cost centre) — with an audit trail.
- **Treasury** needs deterministic file generation: **Lloyds file on demand, journal only on confirmed completion.** They need a single place to update payment reasons and lookups without a developer.
- **All users** need reliable status notifications (success, failure, awaiting approval) and, in the failure case, a stated reason so it can be re-raised.

## 5. Constraints

**Business**

- Journal must not be generated until Treasury has confirmed a payment successful.
- Lloyds bank file format is fixed by the bank — output structure cannot change.
- Bulk-upload notifications must consolidate to one email per batch.
- Vehicle Release Payment VAT logic must be reused verbatim (no re-derivation, per Paul Bliss).
- Payment reason list is managed and edited by Treasury only.

**Technical**

- Implementation platform: **React + MUI v5** (`@mui/material`) with MET-DS-V2 tokens (see `.github/copilot-instructions.md`).
- Prototypes are static HTML using the same tokens for parity with the target React build.
- Payment method matrix (from stakeholder brief): FP / CHAPS ≤ 14:00 → same day; > 14:00 → next working day. BACS ≤ 14:00 → 3 working days; > 14:00 → 4 working days.
- UK bank holidays sourced from [gov.uk/bank-holidays](https://www.gov.uk/bank-holidays); update annually.

**Accessibility & compliance**

- **WCAG 2.2 Level AA** on every view (see `skills/uiux/accessibility-checklist.instructions.md`).
- Focus ring: `outline: 2px solid #3276CF; outline-offset: 2px`.
- Colour is never the only carrier of meaning — every error/success uses icon + text.
- Minimum interactive target: 24×24 px; primary actions ≥ 44×44 px.
- All non-textual meaning has a text alternative.

## 6. Brand & Visual Direction

**Design system:** MET-DS-V2 (React + MUI v5). All prototypes use the same token set so a React port is a direct swap.

- Primary brand `#3276CF` · Page bg `#F2F5FA` · Card bg `#FFFFFF` · Body `#212121`
- Spacing scale (8pt): 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 px
- Border-radius: 8 px (cards, buttons, inputs); 100 px pills
- Typography: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- Components: `<Button disableElevation>`, `<Card elevation={0}>`, `<TextField variant="outlined">`
- Tone: calm, precise, factual. Progressive disclosure over dense forms.

## 7. Core Challenges

1. **Cognitive load:** legacy form asks for information (ledger number, cost centre, sort code) that many requesters do not know by heart. Solved by auto-populating from the payment reason lookup.
2. **Guessing dates:** requesters do not know which day the bank will actually post the payment. Solved by an auto-calculated *Will reach recipient on* date with a plain-English rules callout, and a calendar picker that greys out weekends and UK bank holidays so an invalid date cannot be chosen.
3. **Failed-payment journals:** current release writes the journal at file-generation time. Solved by splitting Lloyds file (immediate) from journal (on completion), with a "Reason for failure" prompt when Treasury marks a line failed.
4. **Notification storms:** bulk uploads send one email per line. Solved by batching to one email per run with a summary table + link to the batch record.
5. **Silent success/failure:** notifications currently fail silently. Solved with a retriable outbound queue and status flag surfaced in the Approvals screen.
6. **Reference-data drift:** every reason change today needs a release. Solved with the Treasury-managed Payment Reason lookup that owns the default paying-from, ledger, and cost-centre metadata.

## 8. Scope & Deliverables

**In scope — Phase 3**

- Prompt-led request wizard: 6 steps (Beneficiary → Bank details → Amount → When → What for → Review).
- Draft-and-resume: any incomplete request can be saved and reopened at the last completed step.
- Custom calendar popover that blocks weekends and UK bank holidays.
- 6-digit UK sort-code validation with live formatting.
- Payment Reason lookup (Treasury-managed) with columns for reason, default paying-from, ledger + cost centre, currency, status; adds/edits via side drawer.
- Auto-population of ledger account type, ledger account number, and cost centre from the selected reason (with the ability to override).
- Cap of **10 supporting documents** with clear over-limit feedback.
- One consolidated email per bulk-upload batch.
- Lloyds file generation decoupled from journal generation; journal only on confirmed completion.
- Failure workflow with mandatory "Reason for failure" and requester notification.
- Restored payment-success and payment-failure notifications with retry.

**In scope — UX deliverables (this pack)**

1. UX Brief *(this document)*
2. UX Strategy
3. Information Architecture
4. User Journeys
5. Empathy Maps
6. Personas

Downstream (already delivered in `UX_Deliverables/prototype/`):

- Interactive HTML prototypes for Payments, Payment Reason lookup, Approvals, Generated Files.

**Out of scope — Phase 3**

- Standing-order / recurring payments (Phase 4 candidate).
- Mobile client (desktop web only; roadmap consideration).
- Multi-currency FX rate capture (currencies are configurable but conversion is not calculated).
- Full replacement of the Vehicle Release Payment module (VAT logic is *reused*, not migrated).

## 9. Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Bank holiday list becomes stale | Medium | Medium — invalid dates accepted | Fetch annually from [gov.uk/bank-holidays JSON](https://www.gov.uk/bank-holidays.json); alert Treasury 30 days before year-end |
| R2 | Payment reason lookup and auto-populate map drift out of sync between lookup and wizard | Medium | High — wrong ledger posted | Single source in the React build; sync comment in prototypes; add end-of-year audit report |
| R3 | Requesters override auto-populated ledger fields with incorrect values | Medium | High | Auto-populated fields are editable but pre-fill flagged in audit trail; approver sees "overridden from default" chip |
| R4 | Journal decoupling creates race conditions (Treasury marks complete before Lloyds file confirmed accepted) | Low | High | State machine: `Ready → File Generated → Bank Accepted → Complete/Failed`; only `Complete` writes journal |
| R5 | Existing users struggle with new question-led layout | Medium | Medium | In-app "what changed" panel on first login; short guide linked from Help menu; keep field IDs stable |
| R6 | Notification consolidation misses failures at the row level | Low | Medium | Batch summary email lists each failed line with reason; per-batch email still triggers a retry queue on any 4xx/5xx delivery response |
| R7 | Approver context is thin for high-value payments | Low | High | Show total, currency, reason, cost centre, attachment icon, and requester on the approval row; expand pane shows full audit + comments |
| R8 | Accessibility regression on custom calendar popover | Low | High | Popover implements `role="dialog"`, `aria-label`, arrow-key navigation (roadmap), Escape to close, focus trap, focus return; disabled cells set `aria-disabled="true"` |

## 10. Success Metrics (baseline TBD)

| Metric | Baseline | Target (90 days post-launch) |
|---|---|---|
| Median time to submit a request | 6–8 min (self-report) | ≤ 3 min |
| First-time-right submissions (no approver reject) | ~ 65% | ≥ 90% |
| Failed-payment journals per month | > 0 (unknown volume) | 0 |
| Bulk-upload emails per batch | 1 per line | 1 per batch |
| Payment-outcome notification delivery rate | Unreliable | ≥ 99% with retry |
| Requester satisfaction (post-submit micro-survey) | Not measured | ≥ 4.2 / 5 |
| Accessibility conformance (automated + manual) | Partial | Full WCAG 2.2 AA |

## 11. Sign-off

| Role | Name | Approval |
|---|---|---|
| Product sponsor | Paul Bliss | Directional ✅ (interview) |
| Business lead | Joanne Bliss | Directional ✅ |
| Delivery lead | Seema Mathiyarasu | Approved for build |
| Design lead | Arumugam V | Author |
| Treasury representative | *TBC* | Pending |
| Accessibility lead | *TBC* | Pending |
