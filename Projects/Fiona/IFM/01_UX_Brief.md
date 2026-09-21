# UX Brief — Integration Failure Management (IFM)

**Module:** FINOPS › Integration Failure Management
**Version:** 1.0 · 2026-06-10
**Owner:** Finance Systems team (Acme Holdings)
**Sources:** `business/IFM/FINOPS_Integration+Failure+Management_BRD_V1.0.doc` · `business/IFM/FINOPS Screen templates.xlsx` · `business/IFM/IFM_RBAC.xls` · `UX_Deliverables/prototype/IFM.html` · `UX_Deliverables/prototype/IFM_FailureTypes.html` · `UX_Deliverables/prototype/IFM_lookup.html`
**Design system:** MET-DS-V2 (light theme) · Accessibility target: **WCAG 2.2 AA**

---

## 1. Background

The Finance Systems team supports integrations between multiple operational systems — **Atlas, Onestep, Nexum, Fleet, Genesys, Exodus** — and **Microsoft Dynamics 365 (D365)**.

When files are processed in D365, the system runs validation checks against predefined **lookup (translation) tables**. If a mapping is missing or invalid (e.g. unmapped customer, supplier on hold, missing client fund code, closed period) the file fails to post and becomes an **integration failure**.

Today the team manages these failures in a **macro-based Excel workbook** combined with **email threads** between Finance Systems and Masterdata. This approach is:

- Inefficient at scale (volume is growing across six operating systems).
- Opaque — there is no single source of truth for status, ownership or SLA.
- Hard to audit — actions and approvals are scattered across mailboxes.
- Slow to resolve — the “returned to FS for redrop” loop has no enforced handoff.

The **Integration Failure Management (IFM) module** inside FINOPS replaces the workbook + email model with a structured, role-aware portal that captures every failure, drives it through a defined status flow and produces a defensible audit trail.

## 2. Objectives

1. **Single source of truth** for every integration failure across Atlas, Onestep, Nexum, Fleet, Genesys and Exodus.
2. **Reduce mean time to resolve** by replacing email handoff with an in-app status transition and triggered notification.
3. **Enforce role-based access** (RBAC) so Finance Systems, Masterdata and Approver users only see and act on what they own.
4. **Auditability** — capture who did what, when, and against which Halo / Redrop ticket.
5. **Configurability** — Failure Type → email recipient mapping must be editable by Finance Systems without code change.
6. **Operational visibility** — surface live counts per status so leads can spot backlogs early.

### Success measures (baseline + target)

| KPI | Baseline (workbook era) | Target (post-launch, 6 months) |
|-----|-------------------------|--------------------------------|
| Median time **Open → Closed** | Not measurable | < 2 business days |
| Median time **With Masterdata → With Finance Systems** | Email-dependent (days) | < 1 business day |
| % records with a Halo ticket captured before Masterdata email | Manual / inconsistent | 100% (system-enforced) |
| Records reopened without approval | Possible via email | 0 (gated by Approver role) |
| User-reported “lost record” incidents per month | ≥ 3 | 0 |

## 3. Target Users

Driven by `business/IFM/IFM_RBAC.xls`. Three primary user roles plus secondary stakeholders.

### Primary roles

| Role | Volume | Primary responsibility |
|------|--------|-----------------------|
| **Finance Systems User** | ~6–10 active users | Log failures, capture Halo ticket, trigger Masterdata email, review returned records, resolve / close, request reopen on resolved records. |
| **Masterdata User** | ~4–6 active users | Receive notification, action only records in `With Masterdata` status, add comments, change status to `With Finance Systems`. |
| **Approver** | 1–2 named approvers | Receive reopen notifications. Approve or reject reopen requests via the FINOPS portal. |

### Secondary stakeholders

- **Finance Team Lead** — reads KPI dashboard, no edit rights inside IFM.
- **RPA / Automation engineers** — monitor automated upstream feeds (out of scope for IFM screens themselves).
- **Audit & Compliance** — relies on the immutable audit trail.

## 4. User Needs

Expressed as user-story headlines, validated against the BRD “shall” statements.

### Finance Systems User
- I need to **log a new failure** in under a minute from the file evidence I have on screen.
- I need conditional fields to **only ask what’s relevant** for the file type and failure type (no noise).
- I need to **enter the Halo Mapping Ticket No** before I can send anything to Masterdata.
- I need to **send one or many records to Masterdata in a single email** so I am not spamming inboxes.
- I need to **see records that came back to me** in a clear queue so I can redrop them.
- I need to **close a record** with confidence and a clear audit trail.
- I need to **request a reopen** on a resolved record (and know that it’s gated by approval).

### Masterdata User
- I need to **see only the records the Finance Systems team has assigned to me** — nothing else.
- I need to **add notes** explaining what mapping I fixed.
- I need to **hand the record back** with one click when I’m done — no email required.

### Approver
- I need to **see pending reopen requests** with full context (who requested it, why, original record).
- I need to **approve or reject** in one click, with the reason recorded in audit.

## 5. Constraints

### Technical
- Must run inside the existing **FINOPS portal** (React + MUI v5, MET-DS-V2 tokens).
- Must integrate with the existing **Halo ticketing system** (ticket number entered manually in v1).
- Email sending uses the **existing FINOPS email infrastructure**; recipient mapping is configurable, default Masterdata DL is `masterdata@acmeholdings.co.uk`.
- Status transitions must be **server-enforced** — UI gating alone is insufficient.
- Audit trail must be **immutable** and retained for at least 7 years (audit / SOX-style requirement).

### Process
- v1 does **not** automate ticket creation in Halo (ticket number is captured manually).
- Email templates, distribution lists and recipient routing are defined and managed **outside the portal** (configurable mapping, not free-text templates).
- Reopening of closed records is **always** subject to Approver sign-off — no exceptions.

### Accessibility
- **WCAG 2.2 AA** mandatory across every screen.
- Full keyboard operability for the table, side panels, modals and the role switcher.
- All status badges, conditional fields and toasts must be screen-reader announced.
- Focus order must follow the flow: top nav → role switcher → page actions → status filters → table → side panel.

### Brand
- **MET-DS-V2** light theme only.
- Tokens for colour, spacing (8pt scale), radius (8/100px), shadow, focus rings.
- Primary `#3276CF`, page bg `#F2F5FA`, card bg `#FFFFFF`, body text `#212121`.

## 6. Brand & Visual Direction

| Layer | Decision |
|-------|----------|
| Design system | MET-DS-V2 (React + MUI v5) |
| Page background | `#F2F5FA` (`--color-primary-25`) |
| Card / surface | `#FFFFFF`, `elevation={0}`, radius 16px (cards), 8px (inputs/buttons), 100px (pills) |
| Typography | Roboto, system fallback. H1 24px / H2 20px / H3 16px / Body 14px / Caption 12px |
| Spacing | 8pt scale (2/4/8/12/16/20/24/32/40/48) |
| Buttons | `disableElevation`, primary `#3276CF` / hover `#2C66B4` |
| Status badges | Open = warning amber; With Masterdata = neutral gold; With Finance Systems = primary blue; Closed = success green |
| Role banner | Primary-25 background with primary-700 icon — always visible under page title |
| Iconography | Material Symbols Outlined, 20px in chrome, 24px in actions |

## 7. Core Challenges

1. **Workflow visibility vs. role boundaries.** Finance Systems sees everything; Masterdata sees only their queue; Approver sees only what needs approval. The same screen must feel *complete* for each role without leaking other roles’ work.
2. **Conditional data capture.** The Data Capture form has heavy field conditionality (failure type × file type × operating system). Without progressive disclosure the form would feel like a 30-field wall.
3. **Two valid paths through the flow.**
   - *Long path:* Open → With Masterdata → With Finance Systems → Closed (translation rules required).
   - *Short path:* Open → With Finance Systems → Closed (handled internally, no Masterdata involvement).
   The UI must make it obvious which path a record is on.
4. **Reopen-with-approval.** A closed record is read-only until an Approver signs off. The “Reopen” affordance must be present but unmistakably *requesting* not *doing*.
5. **Bulk Masterdata email.** Users select N records and send a single grouped email. The selection state, gating (Halo required), and the confirmation modal must be bullet-proof.
6. **Audit trail discoverability.** Every record needs a side-panel tab that tells the full story without overwhelming the primary edit view.
7. **Switching roles for testing.** Internal QA, demos and stakeholder reviews need an in-app role switcher that persists across pages — without ever blurring the production RBAC contract.

## 8. Scope & Deliverables

### In scope — v1

| Area | Deliverable |
|------|-------------|
| Records list | All Records / Open / With Masterdata / With Finance Systems / Closed status views, all driven by the same table |
| Record CRUD | Log new failure (FS only), edit (FS, status-aware), view (all roles, role-filtered) |
| Status transitions | Open → With Masterdata, Open → With Finance Systems, With Masterdata → With Finance Systems (MD), With Finance Systems → Closed (FS), With Finance Systems → With Masterdata (FS revert), Closed → reopen request → (Approver) → Open / rejected |
| Bulk Masterdata email | Multi-select + grouped email + Halo ticket gating |
| Role switcher | In-app for QA / demo, persisted in `localStorage`, never bypasses server RBAC |
| Failure Type configuration | Add / edit / deactivate failure types, assign roles, set Needs-Email vs No-Email category |
| Lookup table | User assignments (user → role → failure type) + Failure Type definitions |
| Audit trail | Immutable timeline per record, visible to all roles, written on every state change |

### In scope — design artefacts (this UX pack)

1. UX Brief *(this doc)*
2. UX Strategy
3. Information Architecture (sitemap, navigation, role matrix, data flows)
4. User Journeys (3 primary roles)
5. Empathy Maps (3 primary roles)
6. Personas (3 primary roles + 1 secondary)

### Out of scope — v1

- Automated Halo ticket creation (manual entry only).
- KPI Dashboard inside IFM (handled by the existing FINOPS Admin Dashboard; data feed only).
- Mobile-native experience (responsive web only; mobile-first patterns still applied).
- Self-service email template editor (mapping is configurable, content is not free-text).
- SSO / IDP changes (uses existing FINOPS auth).

## 9. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------:|-------:|------------|
| Masterdata users see records outside their queue | Low | High (data exposure) | Server-enforced RBAC + UI role-gating + audit log; QA test plan covers every role-status combination |
| Halo ticket field bypass via API | Low | Medium | Server validation: status can’t change to `With Masterdata` unless Halo populated |
| Reopen approval bypass | Low | High (compliance) | Status transition `Closed → Open` only via Approver action; UI Reopen button only creates a *request* |
| Bulk email floods Masterdata DL | Medium | Medium | Confirmation modal with selection count; grouped email per failure type rule |
| Form abandonment due to length | Medium | Medium | Progressive disclosure: conditional fields appear only when relevant (OS → file type → failure type) |
| Role switcher confused with production access control | Low | High | Persistent “Viewing as …” banner; switcher is a *view filter* on top of the real RBAC, never a privilege escalation |
| Audit trail performance on long-lived records | Low | Medium | Paginated audit feed; index by record id + timestamp |
| Migration of legacy Excel records | Medium | Medium | One-off import script + sign-off; out of scope of UI v1 |

## 10. Acceptance Criteria (cross-cutting)

These apply to every flow and screen in v1.

1. Every screen renders against MET-DS-V2 tokens only — no hardcoded hex.
2. Every interactive control passes WCAG 2.2 AA (contrast, focus visible, keyboard reachable, name/role/value exposed).
3. Every status change writes an audit entry containing actor, role, timestamp, from-status, to-status, comment.
4. Every destructive or irreversible action (Send Email, Mark as Closed, Reopen, Approve, Reject) is confirmed via modal or inline confirmation toast.
5. Every role + status combination has a defined edit / read-only / hidden treatment (see IA role matrix).
6. The role switcher persists across all IFM pages via `localStorage` key `fionaIfmRole` and never elevates server permissions.
7. Empty states, loading states, error states and offline/sync conflict states are designed and signed off before dev handoff.
