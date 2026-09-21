# UX Strategy
## FieldSync Field App — Task Management & SLA Workflow Module

| Field               | Detail                                               |
|---------------------|------------------------------------------------------|
| **Project**         | FieldSync Field App — Task Management & SLA Workflow    |
| **Organisation**    | LogicValley Technologies Pvt Ltd / Acme           |
| **Prepared by**     | UX Team                                              |
| **Date**            | March 2026                                           |
| **Version**         | 1.0                                                  |
| **Design System**   | MET-DS-V2 (React + MUI v5)                          |
| **Accessibility**   | WCAG 2.2 Level AA                                    |

---

## 1. Executive Summary

The FieldSync Field App Task Management & SLA Workflow Module is a mission-critical operational tool used by field Agents, Business Area Managers, and System Administrators to manage, track, and resolve field tasks within defined SLA timeframes. The system serves LogicValley's client Acme and operates across multiple business areas (Metering, Gas, Billing, etc.).

This UX Strategy defines the vision, principles, measurable objectives, design pillars, phased roadmap, and risk posture for the user experience of this module. It is grounded in the Business Requirements Document (BRD), structured stakeholder interviews, and the full suite of UX artefacts already produced (Brief, Personas, Empathy Maps, Task Analysis, IA, User Journeys, Wireframes, Heuristic Evaluation).

The strategy is oriented around one central challenge: **field workers need to action tasks confidently and quickly under time pressure, while managers need real-time SLA visibility without noise**. Every design decision must serve that challenge.

---

## 2. UX Vision

> **"Every field agent knows exactly what to do next, every manager knows exactly where SLA risk is, and every action taken is traceable — without friction getting in the way."**

This vision statement guides all design decisions in the module. It has three dimensions:

| Dimension        | Meaning                                                                                                 |
|------------------|---------------------------------------------------------------------------------------------------------|
| **Clarity**      | Agents always know their next priority task. Status, SLA, and required actions are instantly readable. |
| **Control**      | Managers have real-time, actionable SLA visibility with zero reliance on manual refresh or manual triage. |
| **Confidence**   | Every lifecycle action — complete, cancel, reassign, escalate, reprioritise — is guided, confirmed, and auditable. |

---

## 3. UX Principles

Six core principles govern all design, interaction, content, and accessibility decisions in the Engage Task Module.

### P1 — Clarity Over Completeness
Show users only what they need to act, not everything the system knows. Collapse metadata unless requested. Surface the highest-urgency information first.

- **In practice:** Task cards show ID, Title, SLA pill, and Status. All secondary detail is behind an accordion expand.
- **Measure:** Time-to-identify-highest-priority-task < 8 seconds in usability testing.

### P2 — Reliability Without Noise
The system must be trustworthy: data is always current, alerts are meaningful, and no false urgency is created. Users should never need to question whether what they see is up to date.

- **In practice:** Dashboard and task list auto-refresh every 60 seconds. SLA 25% alert fires once per task. Toast notifications are informative, not decorative.
- **Measure:** Zero instances of stale data reported in UAT. SLA alert false-positive rate = 0%.

### P3 — Guided Actions, Not Guesswork
Every lifecycle action is explicitly described, previewed in context, and confirmed before commitment. Users are never surprised by the consequences of an action.

- **In practice:** Confirmation modal content is dynamic — specific to action type. Reprioritise action shows SLA reset consequence before confirmation. Comment rules are surfaced inline, not discovered on error.
- **Measure:** Comment submission failure rate < 5% in first 30 days post-launch.

### P4 — Role-Based Simplicity
Each role sees only the controls, data, and navigation relevant to their responsibilities. Admin power does not pollute Agent simplicity. Manager dashboards do not distract Agents.

- **In practice:** Role-based visibility matrix enforced at API level and reflected in UI. Admin SLA configuration never appears in Agent views. Agent action panel is the focal point of the task detail page.
- **Measure:** Cross-role navigation errors < 2% in usability testing.

### P5 — Accessibility as Baseline, Not Afterthought
WCAG 2.2 AA is the minimum standard — not a stretch goal. Every component is designed with keyboard operation, screen reader compatibility, colour-independent communication, and sufficient touch targets as non-negotiable requirements.

- **In practice:** Focus ring always visible. Status badges always use icon + text + colour. All modals trap focus. Skip-to-main on every page. Min target 44×44px on all primary actions.
- **Measure:** Zero WCAG 2.2 AA critical barriers in accessibility audit prior to launch.

### P6 — Transparency in Consequence
Every action that changes system state — especially irreversible ones — is communicated with its consequence before the user commits. Audit trails are surfaced in context, not buried in admin screens.

- **In practice:** Cancel and Complete confirmations explicitly state irreversibility. SLA reset displayed before reprioritise confirmation. Admin SLA changes require a reason and show impact count.
- **Measure:** Accidental irreversible action rate = 0% in UAT.

---

## 4. Strategic Objectives and KPIs

The UX strategy targets five measurable outcomes that connect user experience quality directly to business value.

### SO-1 — Reduce SLA Breach Rate

| Attribute       | Detail                                                                                  |
|-----------------|-----------------------------------------------------------------------------------------|
| **Problem**     | Agents cannot see SLA urgency in the task list — they open tasks one-by-one to assess priority. |
| **UX Response** | SLA pill visible on every task card. Dashboard metric tile drill-through. Auto-refresh. |
| **KPI**         | SLA breach rate reduced by ≥ 25% within 90 days of launch vs. baseline.               |
| **Leading indicator** | Time-to-identify-most-urgent-task < 8 seconds in usability testing.           |

### SO-2 — Reduce Comment Submission Errors

| Attribute       | Detail                                                                                  |
|-----------------|-----------------------------------------------------------------------------------------|
| **Problem**     | Agents discover comment rules only when validation fails on submit — causing re-entry loops. |
| **UX Response** | Inline character counter. Allowed characters shown on field focus. Instant character validation. |
| **KPI**         | Comment field validation error rate < 5% within 60 days of launch.                    |
| **Leading indicator** | Comment hint text visibility confirmed in ≥ 90% of usability test sessions.   |

### SO-3 — Increase Manager Triage Efficiency

| Attribute       | Detail                                                                                  |
|-----------------|-----------------------------------------------------------------------------------------|
| **Problem**     | Managers manually filter tasks every morning to assess SLA health. No drill-through from KPI tiles. |
| **UX Response** | Metric tile drill-through. Business area switcher. Persistable filters.                |
| **KPI**         | Manager morning SLA review task time reduced by ≥ 40% vs. baseline.                  |
| **Leading indicator** | Metric tile click-to-filtered-list in < 2 steps confirmed in usability testing.  |

### SO-4 — Eliminate Accidental Irreversible Actions

| Attribute       | Detail                                                                                  |
|-----------------|-----------------------------------------------------------------------------------------|
| **Problem**     | Confirmation popup shows generic text — users cannot reliably distinguish Cancel from Complete before confirming. |
| **UX Response** | Dynamic confirmation modals with action-specific titles, colours, and consequence statements. |
| **KPI**         | Accidental irreversible actions = 0 in UAT and ≤ 0.1% in first 90 days production.   |
| **Leading indicator** | 100% of usability test participants correctly identify action type from modal heading. |

### SO-5 — Achieve WCAG 2.2 AA Compliance at Launch

| Attribute       | Detail                                                                                  |
|-----------------|-----------------------------------------------------------------------------------------|
| **Problem**     | Heuristic evaluation identified 10 critical WCAG violations across focus management, colour independence, and screen reader compatibility. |
| **UX Response** | Pre-launch accessibility testing programme. Component-level WCAG requirements in handoff package. |
| **KPI**         | Zero WCAG 2.2 AA Level A or AA critical barriers in accessibility audit at launch.    |
| **Leading indicator** | All P0 issues from Heuristic Evaluation remediated before UAT.                  |

---

## 5. Strategic Design Pillars

The six pillars below are the operational expression of the UX principles. Each pillar defines a specific design stance and the backlog work that delivers it.

### Pillar 1 — Simplify Workflows

**Stance:** Every user flow must be completable in the minimum number of steps. Remove steps that don't add safety, meaning, or traceability.

| Design Initiative                     | Backlog Item | Priority |
|---------------------------------------|--------------|----------|
| Linear accordion card list as default | UX-011       | P1       |
| Metric tile drill-through             | UX-006       | P1       |
| Business area switcher (one click)    | UX-007       | P1       |
| Structured reason picker (cancel/reject) | UX-005    | P2       |

**Success signal:** Task action completion time (Agent) reduced by ≥ 30% vs. baseline task analysis timing.

---

### Pillar 2 — Offline-First Resilience

**Stance:** Field workers operate in environments with poor or intermittent connectivity. The system must handle connectivity loss gracefully and never lose submitted data.

| Design Initiative                               | Backlog Item | Priority |
|-------------------------------------------------|--------------|----------|
| Offline banner with reconnect status            | UX (new)     | P1       |
| Pending action queue in sessionStorage          | UX (new)     | P1       |
| Field App push notification works offline       | UX-024       | P1       |
| SLA timer continues from last known server time | UX (new)     | P2       |

**Success signal:** Zero data loss incidents from connectivity drop in UAT.

---

### Pillar 3 — SLA Transparency at Every Touchpoint

**Stance:** No user — Agent, Manager, or Admin — should ever have to navigate more than one click to understand the current SLA status of any task they are responsible for.

| Design Initiative                              | Backlog Item | Priority |
|------------------------------------------------|--------------|----------|
| SLA pill on every task card row                | UX-001       | P1       |
| SLA business hours notice in task detail       | UX-021       | P2       |
| SLA reset warning at reprioritise selection    | UX-008       | P1       |
| SLA duration preview on reprioritise           | UX-025       | P1       |
| SLA configuration impact warning (Admin)       | UX-014       | P1       |
| Auto-refresh dashboard (60s)                   | UX-009       | P1       |

**Success signal:** SLA breach rate reduction ≥ 25% at 90 days.

---

### Pillar 4 — Smarter, Quieter Notifications

**Stance:** Notifications must be meaningful or they become noise. Every alert must be actionable, correctly prioritised, and dismissible without frustration.

| Design Initiative                              | Backlog Item | Priority |
|------------------------------------------------|--------------|----------|
| SLA 25% alert fires once per task only         | BRD rule     | P1       |
| Critical task popup requires acknowledgement   | UX-004, UX-024 | P1    |
| Non-critical toasts: 8s auto-dismiss, pausable | UX-015       | P1       |
| Error toasts: never auto-dismiss               | UX-015       | P1       |
| Field App critical acknowledgement loop        | UX-024       | P1       |

**Success signal:** Notification-related frustration score < 2/5 in post-launch user survey.

---

### Pillar 5 — Guided Decision-Making

**Stance:** Users should never have to guess the consequence of an action. Every decision point is described in plain language, with relevant context surfaced inline.

| Design Initiative                              | Backlog Item | Priority |
|------------------------------------------------|--------------|----------|
| Dynamic confirmation modal per action type     | UX-004       | P1       |
| Inline comment allowed characters hint         | UX-003       | P1       |
| Live character counter on comment field        | UX-002       | P1       |
| Escalation vs Reassignment explanation         | UX-022       | P2       |
| Reprioritise SLA reset warning inline          | UX-008       | P1       |

**Success signal:** Accidental-action rate = 0% in UAT; < 0.1% in first 90 days.

---

### Pillar 6 — Role-Based Consistency

**Stance:** Each role must have a consistent, predictable experience that fits their mental model. Patterns must not change between screens within the same role.

| Design Initiative                              | Backlog Item | Priority |
|------------------------------------------------|--------------|----------|
| Role-based navigation enforcement (API + UI)   | IA doc       | P1       |
| Admin SLA config hidden from Agent + Manager   | IA doc       | P1       |
| Consistent heading hierarchy across all views  | A-12         | P1       |
| Icon + text + colour on all status badges      | UX-020       | P1       |
| Help/support link same position on all pages   | H10-04       | P1       |

**Success signal:** Cross-role navigation error rate < 2% in usability testing.

---

## 6. User Experience Roadmap

### Phase 1 — Foundation (Pre-Launch MVP)
**Goal:** Deliver a safe, accessible, baseline-functional task module that meets all critical business requirements and WCAG 2.2 AA Level A/AA obligations.

| # | Initiative                                 | Backlog Ref | Rationale                                      |
|---|--------------------------------------------|-------------|------------------------------------------------|
| 1 | Linear accordion card list                 | UX-011      | Validated user preference from interview       |
| 2 | SLA pill on every task card                | UX-001      | Core SLA visibility requirement                |
| 3 | Live character counter + comment hint      | UX-002, UX-003 | Highest-frequency Agent friction point     |
| 4 | Dynamic confirmation modal                 | UX-004      | Prevents catastrophic accidental actions       |
| 5 | WCAG 2.2 AA P0 fixes (10 critical issues)  | A-01–A-10   | Non-negotiable pre-launch compliance           |
| 6 | Skip-to-main + focus trap on all modals    | UX-017, UX-018 | WCAG 2.4.1, 2.1.2 Level A violations       |
| 7 | Role + colour + icon on all status badges  | UX-020      | WCAG 1.4.1 Level A violation                  |
| 8 | Error toasts with correct ARIA roles       | UX-019      | WCAG 4.1.3, 4.1.2 violations                  |
| 9 | Metric tile drill-through                  | UX-006      | High-value Manager efficiency gain, low effort |
| 10| Reprioritise SLA reset warning             | UX-008      | Critical SLA integrity safeguard               |

**Exit criteria:** All P0 items from heuristic evaluation remediated. Accessibility audit passes with zero AA critical barriers. Usability test SUS score ≥ 68 (Acceptable).

---

### Phase 2 — Core Efficiency (Sprint 1–2 Post-Launch)
**Goal:** Deliver the highest-value UX improvements identified from usability research and post-launch feedback.

| # | Initiative                                 | Backlog Ref | Rationale                                      |
|---|--------------------------------------------|-------------|------------------------------------------------|
| 1 | Business area switcher                     | UX-007      | High-priority Manager and Admin gap            |
| 2 | Agent workload count in user picker        | UX-010      | Prevents over-assignment on reassignment       |
| 3 | Agent workload count in user picker        | UX-010      | Prevents over-assignment on reassignment       |
| 4 | SLA configuration impact warning           | UX-014      | Admin governance risk mitigation               |
| 5 | Reason-for-change gate on SLA config       | UX-012      | Audit compliance requirement                   |
| 6 | Offline banner + pending action queue      | New         | Field reliability improvement                  |
| 7 | SLA business hours notice in task detail   | UX-021      | Eliminates persistent mental model confusion   |
| 8 | Escalation vs Reassignment inline help     | UX-022      | Reduces wrong-action selection                 |
| 9 | Task history accordion pinned in detail    | UX-016      | Important for Manager/Admin investigation      |
| 10| Auto-refresh dashboard (60s)               | UX-009      | Eliminates stale data risk for Manager         |

**Exit criteria:** Usability test SUS score ≥ 75 (Good). Comment error rate < 5%. Manager triage time reduced ≥ 40%.

---

### Phase 3 — Advanced Capability (Quarter 2)
**Goal:** Add power-user features, export capability, and Field App critical task loop to support advanced operational workflows.

| # | Initiative                                 | Backlog Ref | Rationale                                      |
|---|--------------------------------------------|-------------|------------------------------------------------|
| 1 | Export audit trail (CSV/PDF)               | UX-013      | Compliance and stakeholder reporting           |
| 2 | Global search (task ID + keyword)          | UX-023      | Admin and Manager cross-area investigation     |
| 3 | Field App critical task acknowledgement    | UX-024      | Closes critical SLA safety loop                |
| 4 | Structured cancel/reject reason picker     | UX-005      | Improves audit data quality                    |
| 5 | SLA reprioritise duration preview          | UX-025      | Enables informed priority decisions            |
| 6 | Dashboard filter persistence               | UX-007      | Reduces Manager daily re-configuration effort  |
| 7 | Toast pause on hover/focus                 | UX-015      | WCAG 2.2.1 — time limit user control          |
| 8 | 200% zoom reflow fixes                     | A-13, A-19  | WCAG 1.4.10, 1.4.12 compliance                |

**Exit criteria:** SUS score ≥ 80 (Excellent). All WCAG 2.2 AA items from heuristic evaluation fully remediated. Research plan findings incorporated into backlog.

---

## 7. Personas and Alignment

The strategy serves three primary personas identified in the research phase. Each persona has distinct strategic priorities.

| Persona                 | Role     | Primary Strategy Alignment                                      | Critical UX Must-Haves                            |
|-------------------------|----------|-----------------------------------------------------------------|---------------------------------------------------|
| Ravi Krishnan           | Agent    | Pillar 1 (Simplify), Pillar 3 (SLA), Pillar 5 (Guidance)      | SLA pill, comment hint, linear list, clear status |
| Priya Meenakshisundaram | Manager  | Pillar 3 (SLA), Pillar 2 (Offline), Pillar 6 (Consistency)    | Metric drill-through, area switcher, workload count, auto-refresh |
| Anitha Subramaniam      | Admin    | Pillar 6 (Consistency), Pillar 5 (Guidance), Pillar 3 (SLA)   | SLA config with reason gate, impact warning, export, audit trail |

---

## 8. Design System and Technical Constraints

All design decisions operate within the following fixed constraints. These are non-negotiable.

| Constraint                   | Detail                                                                              |
|------------------------------|-------------------------------------------------------------------------------------|
| **Design System**            | MET-DS-V2 only. No custom tokens outside `:root`. No hardcoded hex values.         |
| **Framework**                | React + MUI v5 (`@mui/material`). MUI spacing base = 4px; 8pt grid throughout.    |
| **Accessibility**            | WCAG 2.2 Level AA minimum. Focus ring: `outline: 2px solid #3276CF; outline-offset: 2px`. |
| **Primary colour**           | `var(--color-primary)` = `#3276CF`. Never hardcode.                                |
| **Spacing**                  | 8pt scale only: 2/4/8/12/16/20/24/32/40/48px.                                    |
| **Border-radius**            | 8px cards/buttons/inputs. 100px pills.                                             |
| **Task ID format**           | TASK-00001 sequential. Immutable after creation.                                   |
| **Comment rules**            | 10–100 chars. Pattern: `[a-zA-Z0-9 ,."-/]`. Server + client validated.           |
| **SLA business hours**       | 08:00–16:00 Mon–Fri. SLA does not run outside these hours.                        |
| **Priority SLA durations**   | Critical=30min, High=60min, Medium=4h, Low=8h.                                    |
| **SLA reset rule**           | Reprioritisation only. NOT reset by Reassignment or Escalation.                   |
| **Task fields immutability** | All task fields are read-only after creation. Only status and assignee change.    |
| **Visibility rules**         | Agent=own tasks, Manager=own business area, Admin=all areas.                      |

---

## 9. Content Strategy

Content decisions in the Task Module follow the organisation's UX content style guide principles.

| Principle                  | Application                                                                                |
|----------------------------|--------------------------------------------------------------------------------------------|
| **Plain language**         | All UI labels, tooltips, and error messages written at plain English reading level.        |
| **UK English**             | Consistent UK spelling throughout: "Reprioritised", "Cancelled", "Behaviour".             |
| **Result-oriented labels** | Buttons describe the outcome, not the system action: "Mark as Complete" not "Submit Status". |
| **Error messages**         | Always explain what went wrong + how to fix: "Comment too short (5/10 chars minimum)."   |
| **Status labels**          | 8 defined statuses. All must appear verbatim, consistently capitalised.                   |
| **Tone**                   | Professional, direct, calm. No exclamation marks. No jargon.                              |
| **Numeric formats**        | SLA time: "2h 30m". Dates: DD/MM/YYYY. Times: 24-hour (14:30).                          |

---

## 10. Risk Register

| Risk ID | Risk                                                             | Likelihood | Impact | Mitigation                                                                            |
|---------|------------------------------------------------------------------|------------|--------|---------------------------------------------------------------------------------------|
| R-01    | Agents resist mandatory comment field — perceived as surveillance | High       | High   | Frame comment as audit protection for Agent ("proves you actioned the task"). UX copy updated. |
| R-02    | SLA timer inconsistency between Field App and Web view           | Medium     | High   | Single source of truth: server calculates SLA; both clients derive from `slaDeadline` ISO timestamp. |
| R-03    | Manager relies on stale dashboard data and misses SLA breach    | Medium     | High   | Auto-refresh every 60s. Last-updated timestamp. Manual refresh button always visible. |
| R-04    | Admin incorrectly changes SLA threshold, mass-reclassifying tasks | Low       | High   | Impact warning before Save. Mandatory reason-for-change. Audit trail with rollback notes. |
| R-05    | Screen reader users cannot complete core flows                    | Low        | High   | Accessibility testing built into Phase 1 exit criteria. P0 issues fixed before UAT. |
| R-06    | Poor connectivity in field renders task updates unreliable       | High       | Medium | Offline banner + pending action queue. Sync on reconnect with conflict handling.     |
| R-07    | Critical task popup dismissed without agent reading it           | Medium     | High   | Popup requires explicit Acknowledge button. No Escape key dismiss. Auto-escalates after 10 min if unacknowledged. |
| R-08    | Reassignment to wrong or overloaded agent                        | Medium     | Medium | Workload count in user picker. Business area restriction enforced. Confirmation modal with agent name. |
| R-09    | Design system tokens diverge between design and development      | Low        | Medium | Single `:root` token block in handoff package. No hardcoded values in Figma or code. Token audit in QA checklist. |
| R-10    | UX research findings not incorporated before launch              | Medium     | Medium | Research plan Phase 1 completes before Phase 2 development begins. Backlog updated from findings. |

---

## 11. Success Metrics Summary

| Metric                                       | Target            | Measurement Method             | When Measured        |
|----------------------------------------------|-------------------|--------------------------------|----------------------|
| SLA breach rate reduction                    | ≥ 25%             | Operational SLA report         | 90 days post-launch  |
| Comment field validation error rate          | < 5%              | Application error log          | 60 days post-launch  |
| Manager morning triage task time             | ≥ 40% reduction   | Task time comparison (research)| Usability test + 60d |
| Accidental irreversible action rate          | 0% UAT / < 0.1% prod | UAT log + production error log | UAT + 90 days    |
| WCAG 2.2 AA critical barriers at launch      | 0                 | Third-party accessibility audit | Pre-launch          |
| System Usability Scale (SUS) score           | ≥ 75 (Good)       | Post-session SUS survey        | Research Phase 1     |
| SUS score post Phase 2                       | ≥ 80 (Excellent)  | Post-session SUS survey        | Research Phase 2     |
| Notification frustration score               | < 2/5             | Post-launch user survey        | 30 days post-launch  |
| Cross-role navigation error rate             | < 2%              | Usability test observation     | Research Phase 1     |
| Data loss incidents (connectivity loss)      | 0                 | Production error log           | Continuous           |

---

## 12. Governance and Review

| Activity                          | Frequency       | Owner             | Output                                         |
|-----------------------------------|-----------------|-------------------|------------------------------------------------|
| UX strategy review                | Quarterly       | UX Lead           | Updated strategy document                      |
| Usability test (Research Phase 1) | Pre-development | UX Researcher     | Findings report + updated backlog              |
| Accessibility audit               | Pre-UAT         | UX + Dev          | WCAG 2.2 AA compliance sign-off                |
| Post-launch UX review             | 30, 60, 90 days | UX Lead + Product | Success metric report + Phase 2 prioritisation |
| Design system compliance check    | Per sprint      | UI Developer + UX | Token audit log                                |
| Backlog grooming (UX items)       | Fortnightly     | Product + UX      | Prioritised UX backlog (10_UX_Backlog.csv)    |
