# UX Strategy — Integration Failure Management (IFM)

**Module:** FINOPS › Integration Failure Management
**Version:** 1.0 · 2026-06-10
**Aligned to:** [01_UX_Brief.md](01_UX_Brief.md) · BRD V1.0 · IFM_RBAC.xls · MET-DS-V2

---

## 1. Vision

> **“Every integration failure is logged once, routed to the right person automatically, and resolved with a defensible audit trail — without anyone opening Excel or email.”**

IFM replaces the macro-workbook + email handoff with a **single role-aware portal** where the *current status* of every failure is unambiguous, the *next action* is obvious to the role that owns it, and the *history* is permanent.

## 2. Design Principles

These principles govern every screen, interaction and copy decision in IFM.

| # | Principle | What it means in practice |
|---|-----------|---------------------------|
| 1 | **Role decides what you see** | Each role lands on the queue that matters to them. Other queues are hidden, not just disabled. The role banner is always visible. |
| 2 | **Status is the source of truth** | Status badges, sidebar, status cards and side-panel actions all read from the same status taxonomy: `Open · With Masterdata · With Finance Systems · Closed`. |
| 3 | **Progressive disclosure** | The Data Capture form shows only the fields relevant to the chosen OS → file type → failure type. Nothing more. |
| 4 | **Required gates, never silent failures** | The system blocks state transitions that would create an audit gap (no Halo ticket = no email to Masterdata; no approval = no reopen). |
| 5 | **Defensible audit** | Every transition writes a typed timeline entry. Read access to the audit trail is universal across roles. |
| 6 | **Accessible by default** | WCAG 2.2 AA isn’t a phase — it’s baked into every component (focus rings, ARIA, keyboard order, motion-reduce). |
| 7 | **MET-DS-V2 or nothing** | Tokens, components and spacing follow MET-DS-V2; bespoke styling is justified in code review or rejected. |
| 8 | **Empty + error states are first-class** | Every list, panel, modal and toast has an explicit empty / error / loading / offline treatment. |

## 3. Objectives & KPIs

### Business objectives

| Objective | KPI | Baseline | Target (T+6 months) |
|-----------|-----|---------:|--------------------:|
| Cut median resolution time | Median Open → Closed | Not measured | < 2 business days |
| Eliminate email-driven handoff | % handoffs done in-app | ~0% | 100% |
| Enforce ticketing discipline | % records with Halo ticket before Masterdata email | Inconsistent | 100% |
| Eliminate ungoverned reopens | Reopens without Approver record | Possible | 0 |
| Reduce “lost record” incidents | Lost-record tickets per month | ≥ 3 | 0 |

### UX objectives

| Objective | UX KPI | Target |
|-----------|--------|-------:|
| Form efficiency | Median time to log new failure | < 60 sec |
| Discoverability | % of MD users reaching their queue in one click after login | 100% |
| Error prevention | % failed Send-Email attempts due to missing Halo | < 1% (gated upstream) |
| Accessibility | Axe / Lighthouse audit (any screen) | 0 serious, 0 critical issues |
| Comprehension | SUS score (post-launch survey) | ≥ 80 |
| Audit completeness | % status changes with full audit row | 100% |

## 4. Strategic Pillars

### Pillar A — Role-first information architecture
Each role has a default landing queue, a constrained navigation set, and a status-card row tuned to their workload.

- Finance Systems lands on **All Records**, has access to every status view + configuration.
- Masterdata lands on **With Masterdata**, sees no other queue and no configuration.
- Approver lands on **Closed / Pending Reopen**, sees only what needs approval.

### Pillar B — A single working surface (the table + side panel)
One records table + one slide-in side panel is the spine of the module. Every flow happens here.

- Filters: status cards + OS + failure type + free-text search.
- Selection: per-row checkbox + select-all + persistent selection bar.
- Side panel: two tabs only — **Details** and **Audit Trail**.

### Pillar C — Conditional, guided data entry
The Data Capture form is split into clearly labelled sections (Failure Context · Identifiers · File-type-specific values · Tracking · Notes). Fields appear / disappear in response to OS, File Type and Failure Type, driven by `business/IFM/FINOPS Screen templates.xlsx`.

### Pillar D — Configurable lookups, not hardcoded rules
Failure types and recipient mapping live in the **Lookup Table** and **Failure Types** screens. Adding a new failure type or routing rule is a config change, not a release.

### Pillar E — Audit trail as a feature, not a log file
Every record’s side panel exposes an **Audit Trail** tab — a visual timeline with actor avatar, role chip, timestamp and action verb. Read-only to every role.

### Pillar F — Accessibility & responsiveness baked in
Spacing, focus rings, keyboard order, ARIA roles and screen-reader live regions are part of the component contract, not a finishing step.

## 5. Experience Pillars Mapped to Screens

| Pillar | Manifested in (prototype) |
|--------|---------------------------|
| Role-first IA | Role switcher in [UX_Deliverables/prototype/IFM.html](../prototype/IFM.html); role-gated sidebar + status cards |
| Single working surface | Records table + side panel in `IFM.html` |
| Conditional data entry | `IFM.html` side panel sections + [UX_Deliverables/prototype/IFM_FailureTypes.html](../prototype/IFM_FailureTypes.html) for rule configuration |
| Configurable lookups | [UX_Deliverables/prototype/IFM_lookup.html](../prototype/IFM_lookup.html) tabs: User Assignments + Failure Types |
| Audit as a feature | Side-panel **Audit Trail** tab on every record |
| Accessibility | All three prototypes — role banner is `role="status" aria-live="polite"`; modals are `role="dialog" aria-modal="true"`; focus management on panel open/close |

## 6. Roadmap

### Phase 0 — Discovery & alignment (current)
- Validate this UX pack with Finance Systems lead, Masterdata lead and Compliance.
- Sign off RBAC matrix against `IFM_RBAC.xls`.

### Phase 1 — MVP (v1.0)
- Records table + side panel (Details + Audit).
- Log New Failure flow (FS).
- Send Email flow with Halo ticket gating (FS).
- Masterdata queue + `Move to Finance Systems` action (MD).
- Mark as Closed (FS).
- Reopen request → Approve / Reject (FS + Approver).
- Lookup Table CRUD (FS).
- Failure Types CRUD (FS).
- Role switcher (for QA / demo).
- WCAG 2.2 AA audit pass on every screen.

### Phase 2 — Operational depth (v1.1)
- KPI surfacing back to FINOPS Admin Dashboard (data feed).
- Saved table views per user.
- Bulk export (CSV) of filtered table.
- Inline comments thread on records.

### Phase 3 — Automation hooks (v1.2)
- Halo ticket creation from inside FINOPS (replaces manual entry).
- Automated reminder when a record sits in a status > N days.
- Pre-populated failure context from D365 webhook.

### Phase 4 — Mobile-first refinement (v1.3)
- Native mobile patterns for MD users actioning queues on the go.
- Push notifications for Approver pending requests.

## 7. Content & Voice

| Surface | Tone | Example |
|---------|------|---------|
| Page titles | Direct, noun-led | “Integration Failures”, “Failure Types”, “Lookup Table” |
| Status badges | One canonical phrase | `Open`, `With Masterdata`, `With Finance Systems`, `Closed` |
| Buttons | Verb + object (or verb only when clear) | `Log New Failure`, `Send Email`, `Approve`, `Reject`, `Mark as Closed` |
| Toasts | Past tense, factual | “Record sent to Masterdata”, “Reopen approved — record sent to Masterdata” |
| Errors | What happened + how to recover | “Halo Mapping Ticket No is required before sending to Masterdata” |
| Empty states | Acknowledge + next step | “No records With Masterdata. New work will appear here as Finance Systems sends it.” |

## 8. Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| Role boundaries leak in UI | Server-enforced RBAC + UI `data-role-allow` gating + dedicated test suite per role |
| Form abandonment due to field count | Progressive disclosure, autofill (e.g. today’s date, file type on OS selection), inline hints |
| Bulk email misuse | Halo gating + selection-count confirmation + grouped per recipient rule |
| Reopen-without-approval bypass | UI Reopen button creates a *request* only; state transition `Closed → Open` only via Approver action on server |
| Audit trail noise | Typed event verbs + filter affordance in future phases |
| Approver bottleneck | Notification on every reopen request + dashboard KPI for pending approvals |
| Lookup drift between Failure Types and routing | Single source of truth in Lookup Table; Failure Types page reads, never duplicates |

## 9. Measurement & Review

- **Pre-launch:** usability test (5 users per role) + accessibility audit (Axe + manual keyboard + manual screen-reader).
- **At launch:** instrument all transitions (`open → with-md`, `with-md → with-fs`, `with-fs → closed`, `closed → reopen-requested`, `reopen-requested → open|rejected`) with event timing.
- **T+30 days:** review KPI dashboard, gather qualitative feedback from each role, log issues into backlog.
- **T+90 days:** repeat usability test on the same flows + SUS score.
- **T+6 months:** measure against the targets in §3 and feed learnings into Phase 2 backlog.

## 10. Alignment with Organisation Standards

- **Design system:** MET-DS-V2 enforced via `.github/copilot-instructions.md`.
- **Accessibility:** WCAG 2.2 AA per `skills/uiux/accessibility-checklist.instructions.md`.
- **Persona / IA / Journey standards:** templates under `templates/` and skill instructions under `skills/uiux/*.instructions.md`.
- **Document order:** UX Brief → UX Strategy → Personas → Empathy → Task Analysis → IA → Journeys → Wireframes → Audits → Backlog → Handoff (per copilot-instructions). This pack delivers steps 1–6.
