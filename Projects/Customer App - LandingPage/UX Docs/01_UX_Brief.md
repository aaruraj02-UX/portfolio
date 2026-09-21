# UX Brief — Acme Customer App Landing Page & Landing Page Settings Module

> **Project:** Acme Customer App — Landing Page (BRD v1.0, 21-May-2026)
> **Author:** UX Practice, Acme Holdings
> **Standards:** MET-DS-V2 · WCAG 2.2 AA · Acme governance model (Author → Reviewer → Publisher)
> **Sources:** `business/BRD+Landing+Page.doc`, `UX_Deliverables/prototype/Landing-Page.html`

---

## 1. Background

Acme Holdings provides enforcement and recovery services to local authorities and central government. Customers (citizens) currently engage through inconsistent digital touchpoints and high-friction agent-assisted channels, which limits self-service adoption, slows payment conversion, and increases dispute volumes.

The BRD defines a combined capability that ships in two parts:

1. **Customer-Facing Landing Pages** — a structured, post-authentication, personalised journey that lets citizens view their case, understand their enforcement stage, and complete the primary action (most often a payment).
2. **Customer App — Landing Page Settings module** — an internal, governed content management surface that lets authorised business users edit those Landing Pages (text, formatting, variables, hyperlinks, alerts/popups) without a development release, under a three-step **Author → Reviewer → Publisher** workflow with a full audit trail.

The clickable prototype (`UX_Deliverables/prototype/Landing-Page.html`) demonstrates the **internal editor** side: four template tabs (`Enforcement Stages`, `Make a Payment`, `Support`, `Alerts / Popups`), a status pill (Draft → In Review → In Publish → Published), Approve / Publish / Reject / Refuse actions, audit-log drawer, preview / live-preview, and inline click-to-edit panels that mirror the live Landing Page layout.

## 2. Objectives

### 2.1 Business Objectives (from BRD §2)
| ID | Objective | Success Indicator |
|----|-----------|-------------------|
| O-CUS-1 | Drive self-service adoption on customer Landing Pages | ↑ digital sessions completing a payment vs. agent-assisted |
| O-CUS-2 | Increase payment conversion via clear primary CTA & timeline | ↑ "Pay Now" CTR; ↓ time-to-first-payment |
| O-CUS-3 | Reduce confusion and disputes | ↓ inbound support contacts referencing "what does this stage mean" |
| O-OPS-1 | Eliminate dev dependency for content updates | ↓ change-request lead time from days to hours |
| O-GOV-1 | Enforce three-step governance & segregation of duties | 100% of published changes carry Author/Reviewer/Publisher stamps |
| O-GOV-2 | Provide complete, immutable audit trail | All actions (create/edit/submit/approve/reject/publish) timestamped & traceable |
| O-COMP-1 | Maintain WCAG 2.2 AA compliance across all published Landing Pages | Zero AA violations in automated + manual audit |

### 2.2 UX Objectives
- **Predictability over novelty** — internal users follow the same Edit → Save → Approve → Publish rhythm on every tab.
- **What-you-see-is-what-you-edit** — the editor must visually mirror the live Landing Page so authors can predict the customer view (BRD §6 design principle).
- **Progressive disclosure** — secondary actions (Reject, Refuse, Audit, Live Preview) live behind clearly labelled controls so the primary path stays uncluttered.
- **Offline-tolerant editing** — local Save before Submit, so a network drop never costs the author their draft.
- **Accessible by default** — all content tokens, variables, alerts, and modals meet WCAG 2.2 AA.

## 3. Target Users

### 3.1 Customer-Facing (external)
| User | Description | Primary Goal |
|------|-------------|--------------|
| Citizen / Debtor (Customer) | Receives an SMS link, authenticates via ID&V, views case | Resolve the case — usually by paying — quickly and without confusion |

### 3.2 Internal (Customer App)
| User | Description | Primary Goal |
|------|-------------|--------------|
| **Author** | Comms / content / business analyst editing Landing Page copy, variables, hyperlinks, alerts | Submit accurate, on-brand content for review |
| **Reviewer** | Compliance / business sign-off on submitted changes | Validate accuracy, compliance & policy alignment; approve or reject with feedback |
| **Publisher** | Senior business owner releasing approved content to production | Final readiness check & publish; refuse if not ready |
| **Compliance Lead** | Oversight role auditing the entire process | Inspect audit logs, confirm segregation of duties |

> **Constraint (BR-P-02):** A single user cannot perform two roles for the same change request. The UI must surface a clear, accessible "not eligible to act" state when this rule is triggered.

## 4. User Needs

### Customer (external) needs
- Confidence that the page is **secure** and they are looking at their own case only.
- A **plain-English** explanation of "what stage am I at" and "what happens next".
- A **single, obvious** way to pay; alternative actions discoverable but not competing.
- A way to access **help / vulnerability / complaints** without losing their place.
- An experience that works on a **mid-range Android phone over 4G**.

### Internal user needs
- A view that **looks like the live page**, so what they edit is what the customer sees.
- **Inline editing** within the structural panels, with no risk of breaking layout.
- **Formatting, variable insertion, and hyperlink** tools that don't require HTML knowledge.
- **Clear status** of the current change (Draft / In Review / In Publish / Published) at a glance.
- An **audit log drawer** they can open from anywhere to see "who did what, when".
- **Confidence to reject / refuse** with mandatory comment, knowing the system enforces the workflow.
- **Live Preview** so they can view the change in the customer-facing context before approving.

## 5. Constraints

### 5.1 Regulatory / Compliance
- WCAG 2.2 AA across all customer-facing and editor surfaces.
- UK GDPR — **no personal or case data exposed pre-authentication**; variables resolve at runtime only (BRD §9, §11).
- Acme's enforcement messaging must be factual, non-coercive, and policy-aligned.
- Three-step workflow is **mandatory**; no bypass for "minor" content edits.

### 5.2 Technical
- Internal app is built in **React + MUI v5** against **MET-DS-V2** tokens (`design_system/`).
- Customer-facing pages render personalisation **server-side at runtime**, not client-side (BRD §9).
- Integration with **Atlas** (case data) and an existing **ticketing system** for change requests.
- Payment is handled by a **secure external gateway** (out of scope to design).
- **Out of scope:** RBAC framework, timeline structural redesign, dispute / payment-plan flows, live-chat logic.

### 5.3 Design System (MET-DS-V2 — MANDATORY)
- Primary `#3276CF` · Page bg `#F2F5FA` · Card bg `#FFFFFF` · Body text `#212121`
- 8pt spacing scale only (2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 px)
- Border-radius 8 px (cards / buttons / inputs); 100 px for pills
- Font stack: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- All MUI `Button` → `disableElevation`; `Card` → `elevation={0}`; `TextField` → `variant="outlined"`
- All colours via CSS variables (`var(--token)`); no hardcoded hex outside the token file

## 6. Brand & Visual Direction

- **Tone:** clear, neutral, supportive — not punitive. We are recovering money owed, but we are talking to a person under stress.
- **Hierarchy:** large case-summary block, single primary CTA in brand blue, secondary actions ghosted.
- **Iconography:** Material Symbols (rounded, filled where state is "on"). Status semantics: `warning` = action required; `check_circle` = approved/published.
- **Photography / imagery:** evidential only (e.g., parking-fine photo) — never decorative people stock.
- **Density:** comfortable on mobile, compact on internal editor desktop.

## 7. Core Challenges

| # | Challenge | Why it matters |
|---|-----------|----------------|
| C1 | Balancing **clarity for stressed customers** with **legal accuracy** of enforcement messaging | Wrong tone increases complaints; wrong content increases compliance risk |
| C2 | Letting non-technical authors edit **structured, personalised** content without breaking layout, variable resolution, or accessibility | Layout drift would corrupt the customer view at runtime |
| C3 | Enforcing **segregation of duties** in the UI without making the workflow feel obstructive | Authors must clearly see why an action is disabled and what unblocks it |
| C4 | Making the **audit trail** useful in practice, not just an after-the-fact log | Compliance Leads need to inspect a change in seconds, not minutes |
| C5 | Ensuring **what-you-see-is-what-you-edit** parity across web/mobile customer views from a single editor | Otherwise authors must mentally render two viewports |
| C6 | Designing **alert/popup** templates (late-fee, case-reference, parking-fine) that authors can vary without losing legal phrasing | Alerts are the highest-impact, highest-risk content surface |

## 8. Scope & Deliverables

### 8.1 In Scope (UX Pack)
1. UX Brief *(this document)*
2. UX Strategy
3. Information Architecture (Web + Mobile, role-based access)
4. User Journeys (Customer + Internal Author/Reviewer/Publisher)
5. Empathy Maps (per persona)
6. Personas (5 — 1 customer + 4 internal)
7. Wireframes — *referenced from existing `prototype/Landing-Page.html`*
8. Heuristic & Accessibility audit — *referenced as separate deliverable*
9. UX Backlog
10. Handoff Package

### 8.2 Out of Scope
- Visual design system tokens (already delivered via MET-DS-V2)
- Backend Atlas changes
- Ticketing system UI
- Payment gateway UI
- Dispute / payment-plan flows
- Timeline visualisation redesign

## 9. Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R1 | Authors apply formatting that breaks accessibility (e.g., colour-only emphasis) | Medium | High | Constrain formatting palette to DS tokens; lint on Save |
| R2 | Variable tokens (`{{case_reference}}`) accidentally edited to plain text | Medium | High | Render variables as non-editable chips (`var-token`) — already in prototype |
| R3 | Reviewer / Publisher reject without clear comment, blocking Author | Medium | Medium | Mandatory comment field on Reject/Refuse modal (already in prototype) |
| R4 | Single user assigned multiple workflow roles | Low | High | Enforce SoD at request creation; disable action with explanatory tooltip |
| R5 | Customer accesses Landing Page on stale session | Medium | Medium | Session-bound rendering; force re-auth on expiry |
| R6 | Alerts/popups misused for promotional content | Low | High | Alert template library restricted to legal / compliance-approved variants |
| R7 | Audit log volume makes inspection slow | Medium | Low | Faceted filters by user, date, action, template |
| R8 | Mobile customer view drifts from desktop editor preview | Medium | High | Responsive preview toggle inside editor (Live Preview) |

## 10. Acceptance Criteria (Brief-level)

- **AC-B1** Every flow covered in the IA + Journey docs maps to a BRD requirement (BR-01..08 or BR-P-01..10).
- **AC-B2** All personas are derived from BRD §4 (Users and Roles).
- **AC-B3** All wireframe assertions are demonstrable in the prototype (`Landing-Page.html`).
- **AC-B4** Empathy maps and journeys explicitly cover **sync / conflict** cases (e.g., two authors editing same template; case data refresh during preview).
- **AC-B5** Every error state has a recovery path; no dead ends (BRD business rule "no dead-end states").
- **AC-B6** All deliverables reference MET-DS-V2 tokens and WCAG 2.2 AA criteria where applicable.
