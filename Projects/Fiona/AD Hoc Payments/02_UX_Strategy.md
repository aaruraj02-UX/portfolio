# UX Strategy — FinOps · Ad-hoc Payments (Phase 3)

**Version:** 1.0 · 08 July 2026
**Owner:** UX Team (FinOps)
**Aligned with:** UX Brief v1.0, MET-DS-V2, WCAG 2.2 AA

---

## 1. Vision

> A finance user should be able to raise a correct, compliant, ad-hoc payment in **under three minutes**, without needing to ask Treasury a single question first — and know exactly when the money will reach the recipient before they click Submit.

The Phase-3 Ad-hoc Payments module treats the form less like data entry and more like a **guided conversation**. The system knows the rules (sort-code shape, bank cut-offs, working days, ledger defaults per reason) and applies them for the user, so the user only supplies what a machine cannot infer.

## 2. Principles

Aligned with `skills/uiux/ux-strategy.instructions.md` (Clarity, Reliability, Guidance, Transparency, Consistency, Efficiency), interpreted for the finance workflow:

1. **Clarity — one question at a time.** Each wizard step asks a single question with the minimum context needed to answer it. Titles are questions, not nouns.
2. **Guidance over freedom.** The form guides the user through legal payment paths (valid dates, valid sort codes, valid ledgers for the chosen reason). Overrides exist but they are visible, audited, and require intent.
3. **Reliability — no invalid state ever leaves the client.** Client validation and server validation share the same rules (sort code = 6 digits, date is a UK working day, total = net + VAT, max 10 attachments).
4. **Transparency — the user sees the consequence before they commit.** Every step shows the derived value (will-reach date, total, ledger-to-debit) live, not on a separate summary page.
5. **Consistency — one design system, one voice.** All Ad-hoc screens (Payments, Approvals, Generated Files, Payment Reason) share the same tokens, spacing, iconography, and language. Buttons named the same across screens do the same thing.
6. **Efficiency — remove re-entry.** Reason → ledger, type, cost centre auto-populate. Draft → resume returns to the last completed step. Session data is never asked twice (WCAG SC 3.3.7).

## 3. Objectives & KPIs

| Objective | Metric | Baseline | Target (90 days post-launch) | Owner |
|---|---|---|---|---|
| Shorten submission | Median time-to-submit | 6–8 min | ≤ 3 min | Product |
| Improve first-time-right | % submissions with no approver reject | ~ 65% | ≥ 90% | UX + Treasury |
| Eliminate journal contamination | Journals raised for failed payments per month | Non-zero | 0 | Engineering |
| Consolidate notifications | Emails per bulk-upload batch | 1 per line | 1 per batch | Engineering |
| Restore outcome visibility | Payment success/failure notification delivery rate | Unknown / unreliable | ≥ 99% with retry | Engineering |
| Accessibility conformance | WCAG 2.2 AA success criteria | Partial | 100% pass on release checklist | UX |
| Requester satisfaction | Post-submit micro-survey (1–5) | Not measured | ≥ 4.2 | UX |
| Reduce Treasury re-work | Manual corrections to submitted requests per week | ~ 8–12 | ≤ 2 | Treasury |
| Zero-code reference-data change | New payment reasons launched by Treasury without engineering | 0% | 100% | Treasury + Product |

## 4. Pillars

Interpreting the standard MET pillars (simplify workflows, offline-first, scheduling transparency, smarter notifications, evidence capture, role-based consistency) for a desktop-web finance workflow. Offline-first does not apply the same way as it does to field-agent modules; the equivalent here is **draft-and-resume + zero data loss on session drop**.

### Pillar 1 — Simplified workflows

- 6-step wizard with question-led titles.
- Auto-populated ledger, ledger number, and cost centre from the payment reason lookup.
- Live derivation of *Will reach recipient on* from payment method + due date + system clock.
- Only what a machine cannot infer is asked of the user.

### Pillar 2 — Session resilience (offline-first equivalent)

- Draft status on every incomplete request, with the last completed step recorded.
- Resume returns the user to that exact step with all data restored.
- Sort code, dates, and other formatted fields re-hydrate correctly on reload.
- Session storage of in-flight wizard state so a browser tab crash never loses work.

### Pillar 3 — Scheduling transparency

- Custom calendar popover greys out weekends **and** UK bank holidays; the user cannot pick an invalid date at all.
- *Payment Date Information* callout in plain English (FP/CHAPS/BACS × before/after 14:00).
- *Will reach recipient on* recalculates on every relevant change and is never editable.
- Legend under the calendar explains what "greyed out" means.

### Pillar 4 — Smarter notifications

- One consolidated email per bulk-upload batch (summary table, batch link, failed-line breakdown).
- Retry queue on 4xx/5xx delivery response for success and failure notifications.
- Approvers receive a single daily digest option (opt-in) alongside real-time notifications.
- Requester receives a follow-up email only on state change (approved / rejected / paid / failed).

### Pillar 5 — Evidence capture

- Supporting documents attached inline in the wizard (max 10, PDF/PNG/JPG/MSG/EML), previewable and removable.
- Line manager approval expected via attached email (tooltip guidance in the wizard).
- Attachments carry through to the Approvals pane and are preview-friendly.
- Attachments included in the payment audit trail and generated-file record.

### Pillar 6 — Role-based consistency

- Requester, Approver, Treasury, and Admin roles see the same shell, the same nav, and the same components.
- Row actions in every list follow the same pattern (icon-only, `aria-label`, ≥ 24 px target, ≥ 44 px for primary).
- Language is consistent: *Submit*, *Reject*, *Complete*, *Failed* are the only verbs used across all four screens.
- Status badges (Draft, Awaiting approval, Approved, Rejected, File generated, Complete, Failed) are shared components.

## 5. Roadmap (Phases)

### Phase 3.0 — Foundation (this release)

- Prompt-led wizard.
- Draft-and-resume.
- Payment Reason lookup + auto-populate.
- Custom calendar (weekends + UK bank holidays disabled).
- Sort-code 6-digit validation.
- 10-document cap.
- Consolidated bulk-upload email.
- Lloyds file / journal decoupling with failure-reason capture.
- Restored payment-outcome notifications with retry.
- WCAG 2.2 AA on all screens.

### Phase 3.1 — Refinement (30–60 days post-launch)

- Approver bulk-actions (approve/reject multiple lines in one operation).
- Requester dashboard widget showing "Awaiting approval", "Rejected — action required", "Recently paid".
- Keyboard shortcuts for approvers (`A` approve, `R` reject with comment).
- Micro-survey after submission.
- CSV export of the Payment Reason lookup for Treasury audit.

### Phase 3.2 — Optimisation (60–120 days)

- Auto-fetch UK bank holidays annually from [gov.uk/bank-holidays.json](https://www.gov.uk/bank-holidays.json).
- FX rate hint on international payments (informational only, no conversion).
- "Similar past requests" panel to help requesters copy a prior request as a starting draft.
- Approver assignment rules (route by cost centre or value threshold).
- Analytics dashboard for Treasury (time-to-submit, reject reasons, most-used reasons).

### Phase 4 — Adjacent (candidate)

- Recurring / scheduled ad-hoc payments.
- Mobile approver experience (approve on the go).
- Multi-tenancy for group entities.
- API for downstream systems to raise a request programmatically.

## 6. Design & Technical Standards

- **Design system:** MET-DS-V2 (React + MUI v5). All new work uses tokens and components defined in `skills/uiux/design-system-tokens.instructions.md` and `design-system-components.instructions.md`.
- **Prototypes:** Static HTML with the same tokens, so a React port is a direct swap. No prototype uses hardcoded hex; only `var(--token)`.
- **Accessibility:** WCAG 2.2 AA verified against `skills/uiux/accessibility-checklist.instructions.md`. Focus ring `outline: 2px solid #3276CF; outline-offset: 2px`. Colour never the only carrier of meaning. Interactive targets ≥ 24 × 24 px, primary ≥ 44 × 44 px.
- **Content:** All labels are sentence case; button verbs are imperative and singular. Errors state the fix, not just the fault. Dates displayed DD/MM/YYYY, stored ISO. Currency shown with symbol and code on first mention, symbol only in inline lists.
- **Empty states:** Every list has an empty state that explains what the list is *for* and how to add the first item.
- **Testing standard:** Automated a11y (axe-core), manual keyboard-only pass, and screen-reader smoke test (NVDA + JAWS) per release.

## 7. Risks & Mitigation

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| S1 | Payment Reason lookup + auto-populate map drift | Medium | High | Single source of truth in React; sync comment in prototypes; year-end audit | Engineering + Treasury |
| S2 | Bank holiday list not refreshed for new year | Medium | Medium | Annual fetch from gov.uk; alert Treasury 30 days before year-end | Engineering |
| S3 | Over-reliance on auto-populate hides incorrect defaults | Medium | Medium | Approvers see "auto-populated" chip; overrides flagged in audit trail | UX + Treasury |
| S4 | Bulk email consolidation drops per-line failure detail | Low | Medium | Batch email includes full per-line failure breakdown with reason | Engineering |
| S5 | Journal generation lag on completion creates end-of-month cut-off issues | Medium | High | Nightly journal-catch-up job; Treasury dashboard shows *completed, awaiting journal* count | Engineering |
| S6 | Custom calendar popover a11y regression | Low | High | Automated tests for focus trap, Escape close, arrow-key roadmap; screen-reader smoke | UX + Engineering |
| S7 | Adoption resistance from long-standing requesters | Medium | Medium | In-app "what's changed" panel; short guide; keep field IDs stable so shortcuts still work | UX + Change mgmt |
| S8 | Approver context insufficient for high-value requests | Low | High | Configurable value threshold that surfaces extra context (attachments, comments) inline | Product + Treasury |

## 8. Governance

- **Design changes** to any Ad-hoc screen must pass the MET-DS-V2 checklist and the accessibility quick-gate before merge.
- **Reference-data changes** (Payment Reason, Cost centre) are owned by Treasury and audited monthly.
- **Copy changes** must follow `skills/uiux/ux-content-styleguide.instructions.md` and go through UX review.
- **Cross-persona journeys** (requester → approver → treasury → requester) must be validated end-to-end before a Phase-3.x release.

## 9. Definition of Done (per feature)

A feature is *done* when:

1. It meets the acceptance criteria in the UX Brief and the User Journey.
2. It passes the MET-DS-V2 checklist and the WCAG 2.2 AA quick-gate.
3. It is validated by automated a11y (axe-core clean) and a manual keyboard-only pass.
4. It has empty, loading, error, and success states designed and built.
5. It has been reviewed by Treasury for reference-data accuracy.
6. It has been demoed to a requester, an approver, and a Treasury officer, and no P1/P2 usability issue is open.
