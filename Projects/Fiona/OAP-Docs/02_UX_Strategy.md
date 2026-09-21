# UX Strategy — Office Account Postings (OAP)

| Field | Detail |
|---|---|
| **Module** | Office Account Postings (OAP) |
| **Platform** | FinOps — Web Application (React + MUI v5) |
| **Design System** | MET-DS-V2 Light Theme |
| **Date** | 28 April 2026 |
| **Version** | 1.0 |

---

## 1. Vision & Principles

### Vision Statement

> Transform the Office Account Postings process from a fragile, macro-dependent Excel workbook into a streamlined, automated web application that reduces manual effort by 70%, eliminates coding errors, and provides real-time visibility into transaction status — enabling finance teams to focus on exceptions rather than routine data entry.

### Design Principles

| # | Principle | Description | Application to OAP |
|---|---|---|---|
| P1 | **Automation First** | Automate everything that can be rules-based; surface only exceptions to humans | Lookup-based auto-coding handles routine transactions; users focus on unmatched items |
| P2 | **Progressive Disclosure** | Show essential information first; reveal detail on demand | Transaction list → expandable row detail → edit panel for coding |
| P3 | **Team-Centric Views** | Each user sees their world; reduce cognitive load from irrelevant data | Default filter by team; status summary scoped to team |
| P4 | **Zero-Ambiguity Status** | Every transaction's state is immediately visible without interaction | Colour-coded status badges: Auto-Coded, Manually Coded, Uncoded, Exported |
| P5 | **Offline-First Resilience** | Gracefully handle connectivity issues; never lose user work | Optimistic UI updates; local state preservation; sync on reconnect |
| P6 | **Accessible by Default** | WCAG 2.2 AA compliance is non-negotiable; inclusive design benefits all users | Keyboard navigation, screen reader support, 4.5:1 contrast, 44px touch targets |
| P7 | **Confidence Through Feedback** | Every action produces immediate, clear confirmation | Toast notifications for saves; confirmation dialogs for exports; email summaries |

---

## 2. Objectives & KPIs

### Strategic Objectives

| # | Objective | Metric | Target | Measurement Method |
|---|---|---|---|---|
| SO1 | Reduce manual transaction coding time | Average time from import to fully coded | < 2 hours (down from ~4 hours) | Application telemetry: timestamp(import) → timestamp(last code entry) |
| SO2 | Increase auto-match rate | % of transactions auto-coded on import | ≥ 70% in Month 1; ≥ 85% by Month 6 | Auto-coded count / total imported count per batch |
| SO3 | Eliminate journal creation errors | Journal rejection rate in D365 | 0% (down from ~3%) | D365 import error log |
| SO4 | Improve export timeliness | % of days where 15:00 export deadline is met | ≥ 95% | Timestamp of first journal export per day |
| SO5 | Reduce onboarding time for new team members | Time to first unassisted transaction coding | < 1 day (down from ~3 days) | Manager assessment / support ticket frequency |

### UX-Specific KPIs

| KPI | Target | Measurement |
|---|---|---|
| Task completion rate — code a transaction | ≥ 98% | Usability testing (5 users per team) |
| Task completion rate — generate journal export | 100% | Usability testing (Treasury team) |
| System Usability Scale (SUS) score | ≥ 75 (Good) | Post-launch survey |
| Error rate — incorrect field entry | < 2% | Analytics: edit → re-edit within 5 min |
| Time on task — filter + code 10 transactions | < 5 min | Usability testing |
| Accessibility audit score | 100% WCAG 2.2 AA pass | Automated + manual audit |

---

## 3. Strategy Pillars

### Pillar 1: Intelligent Automation

| Element | Strategy |
|---|---|
| **Daily Import Pipeline** | Automated file pickup → archive previous → import new → auto-match → classify unmatched (C&B / AR / AP) |
| **Lookup Engine** | Multi-field matching: Team + Entity + Bank Account + Description (begins-with) + Entry Reference + Transaction Code. Expandable as new patterns emerge. |
| **Smart Defaults** | When a user manually codes a transaction, suggest adding a new lookup rule if the pattern appears ≥ 3 times |
| **Future: D365 Direct Posting** | Architecture supports journal-to-folder today; API integration later without UX changes |

### Pillar 2: Task-Optimised Interface

| Element | Strategy |
|---|---|
| **Current Transactions View** | Flat data grid with all 15 columns visible. Team filter persistent in session. Status summary cards above grid. |
| **Inline Editing** | Editable fields (Nominal Code, Cost Centre, Journal Description) accessible via slide panel. Bulk edit for common patterns. |
| **Keyboard-First Workflow** | Tab through editable fields; Enter to save; Escape to cancel. Power users never need mouse. |
| **Search & Filter** | Global search across all visible columns. Column sorting. Team filter dropdown. |

### Pillar 3: Transparency & Audit

| Element | Strategy |
|---|---|
| **Status Visibility** | Four-state model: Uncoded → Auto-Coded → Manually Coded → Exported. Badge + colour per row. |
| **Export Audit Trail** | Every journal export records: filename, timestamp, user, transaction count, total debits, total credits |
| **Email Notifications** | Automatic email to Treasury team with journal summary attachment on each export |
| **Exception Reporting** | Dashboard surfacing: uncoded transactions approaching deadline, import failures, lookup match rate trends |

### Pillar 4: Accessible & Inclusive Design

| Element | Strategy |
|---|---|
| **WCAG 2.2 AA** | All interfaces audited against full checklist (perceivable, operable, understandable, robust) |
| **Keyboard Navigation** | Full keyboard operability for all CRUD operations, filters, and exports |
| **Screen Reader Support** | Semantic HTML, ARIA labels, live regions for status updates, table captions |
| **Focus Management** | Visible focus ring (2px solid #3276CF, offset 2px); logical tab order; focus trap in modals/panels |
| **Reduced Motion** | All animations wrapped in `prefers-reduced-motion: reduce` |

---

## 4. Roadmap (Phases)

### Phase 1 — Foundation (Current Scope)

| Sprint | Deliverable | Key Features |
|---|---|---|
| S1–S2 | **Current Open Transactions** | Data grid, team filter, status cards, search, column sort, slide panel editing |
| S2–S3 | **Lookup Table Management** | Two-tab interface (Posting Lookup + Team Code Lookup), CRUD slide panels, bulk import |
| S3–S4 | **Automated Import Pipeline** | Daily 05:30 file pickup, archive, import, auto-match, team classification |
| S4–S5 | **Journal Export** | Export button, coded-only selection, filename stamping, email notification |
| S5–S6 | **Archived Transactions** | Read-only grid, all columns, search/filter, date range |
| S6 | **Manual Import** | Upload dialog following automated flow, duplicate detection |
| S7 | **UAT & Accessibility Audit** | User acceptance testing with all three teams, WCAG 2.2 AA audit, SUS survey |

### Phase 2 — Optimisation (Post-Launch +3 Months)

| Deliverable | Description |
|---|---|
| **Dashboard & Analytics** | Import success rate trends, auto-match rate by team, coding velocity, exception aging |
| **Bulk Edit** | Select multiple transactions, apply same coding in one action |
| **Lookup Suggestions** | System suggests new lookup rules when manual coding patterns repeat |
| **Notification Centre** | In-app alerts for import completion, approaching deadlines, unmatched transactions |

### Phase 3 — Integration (Post-Launch +6 Months)

| Deliverable | Description |
|---|---|
| **D365 Direct Posting** | Automated journal posting via D365 API — eliminate manual file pickup |
| **Real-Time Import** | Move from daily batch to event-driven import on file arrival |
| **Cross-Module Reporting** | OAP data available in FinOps-wide reporting/analytics module |

---

## 5. Risks & Mitigation

| # | Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|---|
| R1 | **User resistance to change** — Finance teams comfortable with Excel workflows | Medium | High | Early user involvement in design; side-by-side comparison showing time savings; phased rollout with parallel running period |
| R2 | **Lookup migration errors** — incorrect rules produce wrong auto-coding | Medium | High | Pre-migration data validation; manual review of first 3 import cycles; easy rule editing to correct errors |
| R3 | **Performance under load** — high transaction volumes slow grid rendering | Low | High | Paginated server-side data; virtual scrolling; column-level indexing; performance budget: < 2s initial load, < 500ms filter |
| R4 | **D365 format changes** — journal export schema becomes incompatible | Low | High | Abstract export format into configurable template; version-controlled schema definition |
| R5 | **Month-end peak load** — manual imports during high-activity periods create bottlenecks | Medium | Medium | Queued import processing; progress indicator; concurrent editing support |
| R6 | **Accessibility regression** — new features break WCAG compliance | Medium | Medium | Automated a11y testing in CI/CD pipeline; manual audit at each sprint boundary; a11y champion per team |

---

## 6. Success Criteria

| # | Criterion | Validation Method |
|---|---|---|
| SC1 | All three finance teams can independently code their transactions within 2 hours of import | Production telemetry analysis (Month 1) |
| SC2 | Auto-match rate reaches 70% within first month | Import analytics dashboard |
| SC3 | Zero journal rejections from D365 in first quarter | D365 import error log review |
| SC4 | SUS score ≥ 75 from user survey | Post-launch survey (Month 1) |
| SC5 | WCAG 2.2 AA full compliance | Third-party accessibility audit |
| SC6 | 15:00 export deadline met on ≥ 95% of business days | Export timestamp analysis |
| SC7 | New team member productive within 1 day | Manager feedback / support ticket analysis |

---

## 7. Governance

| Activity | Frequency | Owner |
|---|---|---|
| UX design review | Per sprint | UX Lead |
| Accessibility checkpoint | Per sprint | UX Lead + QA |
| User feedback session | Bi-weekly (Phase 1) | Product Owner |
| KPI review | Monthly | Product Owner + Finance Lead |
| Design system compliance check | Per release | UX Lead |
| Stakeholder demo | Per sprint | Product Owner |
