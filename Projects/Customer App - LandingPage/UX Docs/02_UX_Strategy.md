# UX Strategy — Acme Customer App Landing Page

> **Related:** [01_UX_Brief.md](01_UX_Brief.md) · BRD v1.0 (21-May-2026) · MET-DS-V2

---

## 1. Vision

> *"A trusted self-service journey that helps every customer understand where they stand and act with confidence — powered by content that business teams can change in hours, not weeks, under unbreakable governance."*

We deliver this through **two coordinated surfaces**:

- **External (Landing Pages)** — clarity, security, and a single primary action for the customer.
- **Internal (Landing Page Settings module)** — WYSIWYE editing under enforced Author → Reviewer → Publisher governance.

## 2. Design Principles

| # | Principle | What it means in practice |
|---|-----------|---------------------------|
| P1 | **Clarity over cleverness** | Plain-English copy, single primary action, large readable type, simplified enforcement timeline |
| P2 | **What-you-see-is-what-you-edit** | The editor renders the customer view; structural elements (timeline, layout) cannot be moved or removed |
| P3 | **Guided action, never dead ends** | Every screen, success or error, provides a clear next step |
| P4 | **Governance is visible, not hidden** | Status pill + role-aware buttons + always-on audit drawer make state obvious |
| P5 | **Accessible by default** | WCAG 2.2 AA on first build, not retrofit; tokens enforce contrast |
| P6 | **Progressive disclosure** | Secondary actions (Reject, Refuse, Audit, Live Preview) ride behind icon-only controls with tooltips, keeping primary path clean |
| P7 | **Data integrity over editorial flexibility** | Variables resolve at runtime only; authors can never overwrite system data |
| P8 | **Offline-tolerant** | Local Save before Submit; navigation never loses an unsaved draft |

## 3. Objectives & KPIs

### 3.1 Customer-facing KPIs
| Objective | KPI | Baseline (assumed) | Target (12 mo) |
|-----------|-----|---------------------|----------------|
| Increase digital payment conversion | % authenticated sessions that complete a payment | 32% | **≥ 48%** |
| Reduce time to first action | Median seconds from Home load → Pay Now click | 75 s | **≤ 40 s** |
| Reduce confusion contacts | Inbound calls referencing "what stage" / "what next" per 1000 sessions | 22 | **≤ 10** |
| Increase self-service trust | Post-payment 1-question CSAT (1–5) | n/a | **≥ 4.2** |
| Maintain accessibility | WCAG 2.2 AA automated + manual issues at release | – | **0 AA blockers** |

### 3.2 Internal-editor KPIs
| Objective | KPI | Target |
|-----------|-----|--------|
| Cut content change lead time | Median hours from Author submit → Publisher publish | **≤ 8 working hours** |
| 100% governed releases | % published changes with Author + Reviewer + Publisher stamps | **100%** |
| Reduce rework | % submissions rejected at review | **≤ 20%** |
| Audit traceability | % actions with user + timestamp + payload diff | **100%** |
| Editor adoption | Active Authors per month (target user base) | **≥ 80%** of trained pool |

## 4. Strategic Pillars

### Pillar 1 — Trusted Customer Journey
Secure entry → personalised timeline → single primary action → no dead ends. Covers Sign-In, Home/Timeline, Make a Payment, Enforcement Info, Support, Alerts.

### Pillar 2 — Governed Content Authoring
The Landing Page Settings module: structured tabbed editor that mirrors the live page; inline click-to-edit panels; mandatory Save → Submit; Approve/Publish/Reject/Refuse modals with comments.

### Pillar 3 — Visible Governance & Audit
Status pill (Draft / In Review / In Publish / Published); always-accessible audit drawer; immutable timeline of actions with user, timestamp, action, and template context.

### Pillar 4 — Design System Discipline
MET-DS-V2 tokens are the only allowed colour/spacing/radius source. Components are MUI v5 with the standard defaults (`disableElevation`, `elevation={0}`, `variant="outlined"`).

### Pillar 5 — Accessibility & Inclusion
WCAG 2.2 AA on every screen. Keyboard-only paths for all internal flows. Screen-reader landmarks. Variables presented as non-editable chips, announced with their resolved meaning in Live Preview.

## 5. Roadmap (Phases)

### Phase 0 — Foundations *(complete / in flight)*
- MET-DS-V2 tokens published
- Interactive prototype (`Landing-Page.html`) approved for 4 tabs

### Phase 1 — MVP: Internal Editor & Core Customer Pages *(release 1)*
- Landing Page Settings module: Enforcement Stages, Make a Payment, Support tabs
- Author → Reviewer → Publisher workflow (Approve / Publish + Reject + Refuse modals)
- Audit drawer (single-tenant, append-only)
- Customer Landing Pages: Sign-In, Home/Timeline, Make a Payment, Support
- Personalisation via runtime variables (`case_reference`, `balance`, `stage`)
- WCAG 2.2 AA accessibility audit

### Phase 2 — Alerts & Popups *(release 2)*
- Alerts / Popups tab with three legal templates (Late Fee, Council Tax case, Parking fine)
- Vertical tab rail to switch between popup variants
- Scheduling: alert valid-from / valid-until
- Per-segment alert targeting (read-only segments from Atlas)

### Phase 3 — Enforcement Info Deep-Dive & Multi-Case *(release 3)*
- Full Enforcement Information pages (stage explanations, consequences, next steps)
- Multi-case selection on Customer Home page with prioritisation rules
- Inline case-switcher

### Phase 4 — Compliance & Reporting *(release 4)*
- Compliance Lead dashboard with faceted audit filters (user, date, action, template)
- Diff viewer per audit entry
- Export to CSV/PDF for external audit
- Saved review queries

### Phase 5 — Optimisation *(continuous)*
- A/B test variants of primary CTA copy under governance
- Heatmaps on Customer Home & Make a Payment
- Conversion-led tuning of timeline visualisation copy

## 6. Risks & Mitigation

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|----|------|------------|--------|------------|-------|
| S-R1 | Authors apply non-DS formatting that breaks accessibility | Med | High | Lock formatting palette to DS tokens; reject on Save if violation found | Design Systems |
| S-R2 | Variable tokens accidentally typed as plain text | Med | High | `var-token` chips are `contenteditable="false"`; insertion via picker only | Eng |
| S-R3 | Workflow gridlock: Reviewer / Publisher unavailable | Med | Med | Role delegation (out of scope for MVP) noted in Phase 4 | Product |
| S-R4 | Audit log growth degrades performance | Med | Low | Server-side pagination + index on (user, timestamp, template) | Eng |
| S-R5 | Customer rendering drifts from editor preview | Med | High | Single rendering layer used by both Live Preview & runtime | Eng |
| S-R6 | Misuse of Alerts as marketing surface | Low | High | Templates restricted to legal/compliance-approved variants; cannot create custom alert types in MVP | Compliance |
| S-R7 | Mobile customer experience under-tested | Med | High | Real-device QA matrix (mid-range Android, iPhone SE); responsive Live Preview toggle | QA |
| S-R8 | "Refuse" and "Reject" confused by users | Low | Med | Distinct icons, tooltips, modal copy, and audit verbs ("rejected" vs. "refused at publish") | UX |
| S-R9 | Pre-auth content leak via deep link | Low | Critical | Session-bound rendering; deep links resolve to Sign-In page first | Security |

## 7. Governance & Operating Model

- **Design Authority:** Acme Design Systems team owns MET-DS-V2; UX leads own component patterns for Landing Pages.
- **Content Authority:** Compliance Lead approves any template-level changes (e.g., new alert variant) before they reach the Author tooling.
- **Release cadence:** Internal editor follows continuous deployment under feature flags; Customer Landing Pages follow weekly release windows.
- **Definition of Done (UX):** WCAG 2.2 AA verified · MET-DS-V2 tokens · Audit entry generated · Live Preview parity · Keyboard path validated.

## 8. Measurement Plan

| Source | Captured | Used for |
|--------|----------|----------|
| Customer App audit log | Author/Reviewer/Publisher actions, timestamps, diffs | Lead time, rejection rate, governance KPIs |
| Customer Landing Page analytics | Page views, CTA clicks, session duration, drop-off | Conversion, time-to-action |
| Post-payment micro-survey | 1-question CSAT | Trust / clarity KPI |
| Support contact tagging | Reason codes ("what stage", "how to pay") | Confusion-contact KPI |
| Accessibility scan (axe-core in CI) | AA violations | Accessibility KPI |
