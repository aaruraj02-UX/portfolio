# UX Strategy -- FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Design system**: MET-DS-V2 (React + MUI v5)
> **Principles**: Clarity, Reliability, Guidance, Transparency, Consistency, Efficiency

---

## 1. Vision

Provide Acme Holdings administrators with a single, intuitive monitoring surface that replaces fragmented manual processes -- enabling real-time operational awareness, proactive exception handling, and data-driven decision-making across all FinOps modules.

**Experience goal**: Within 60 seconds of opening the dashboard, any admin can answer: "Is anything stuck, failing, or trending in the wrong direction?"

---

## 2. UX Principles

| Principle | Definition | Dashboard application |
|-----------|-----------|----------------------|
| **Clarity** | Information should be immediately understandable without training | KPI cards use plain language labels, trend arrows with percentage values, and semantic colour badges (On Track / At Risk / Breached) |
| **Reliability** | The interface must accurately reflect system state and respond predictably | Shimmer loaders during data refresh; error states with retry; no stale data without warning |
| **Guidance** | The system should lead users toward the right action | SLA-breached approvals highlighted in red; actionable insights section surfaces highest-impact items first |
| **Transparency** | Users should always know what the system is doing and why | Filter changes trigger visible loading states; timestamps show data freshness; tooltips explain KPI definitions |
| **Consistency** | Patterns, terminology, and visual language must be uniform | MET-DS-V2 design system enforced across all components; standardised card layouts; consistent donut centre format |
| **Efficiency** | Reduce time and effort to complete monitoring tasks | Drill-down in 2 clicks max; filters persist across sessions; export in 3 clicks; keyboard navigation throughout |

---

## 3. Strategic Objectives & KPIs

| # | Objective | UX KPI | Target | Measurement method |
|---|-----------|--------|--------|-------------------|
| SO1 | Reduce time to identify operational bottlenecks | Time to find SLA-breached approvals | < 15 seconds | Usability test (Task T1) |
| SO2 | Eliminate manual report compilation | Export task completion rate | 100% success, < 3 clicks | Usability test (Task T4) + analytics |
| SO3 | Improve drill-down discoverability | First-click accuracy on legend items | > 80% correct first click | First-click test (RQ3) |
| SO4 | Achieve high perceived usability | System Usability Scale (SUS) score | > 75 (Good) | Post-test SUS questionnaire |
| SO5 | Ensure inclusive access | WCAG 2.2 AA compliance | 0 critical violations | Automated + manual audit |
| SO6 | Reduce context-switching | Dashboard sessions replacing other tools | > 70% of admin monitoring done in dashboard | Post-launch survey + analytics |

---

## 4. Strategic Pillars

### Pillar 1: Simplify Workflows

| Aspect | Current state | Target state |
|--------|--------------|-------------|
| Monitoring | 4+ screens across modules | Single dashboard surface |
| Escalation | Manual email to approvers | In-app "Nudge" notification (future) |
| Reporting | Copy-paste from screens to Excel | One-click export (CSV/PDF) |
| Trend analysis | No visual trends available | Trend arrows + period-over-period charts |

**Key initiatives**: Consolidated KPI cards, filter-driven data refresh, export capability, actionable insights panel.

### Pillar 2: Scheduling Transparency

| Aspect | Current state | Target state |
|--------|--------------|-------------|
| Bot execution | Check bot logs in separate system | Last execution timestamp on each automation card |
| Stale data | No indication of data age | Relative time ("8 hrs ago") + warning badge if stale |
| Approval age | Manual calculation from timestamps | Donut chart with age brackets (< 1d, 1-3d, 3-5d, > 5d) |

**Key initiatives**: Bot health cards, stale-run warnings, approval delay visualisation with drill-down.

### Pillar 3: Smarter Notifications & Insights

| Aspect | Current state | Target state |
|--------|--------------|-------------|
| Exception awareness | Discovered reactively via complaints | Proactive: SLA breach badges, highest rejection ranking |
| Trend direction | Unknown until manual analysis | Inline trend indicators (up/down arrows with % change) |
| Cross-module comparison | Not available | Rejection rate ranking table across all modules |
| Historical context | Snapshot only | Period-over-period overlays (future phase) |

**Key initiatives**: Actionable insights section, trend indicators on all KPI cards, exception-first information hierarchy.

### Pillar 4: Evidence Capture & Export

| Aspect | Current state | Target state |
|--------|--------------|-------------|
| Data for meetings | Manual screenshot + spreadsheet | Dashboard export (CSV/PDF) with current filters |
| Drill-down evidence | Not available outside FinOps modules | Side panel tables with request-level detail |
| Shareable views | Not possible | URL filter state sync for bookmarking (future) |

**Key initiatives**: Export button with format selection, drill-down panels, filter URL parameters.

### Pillar 5: Role-Based Consistency

| Aspect | Current state | Target state |
|--------|--------------|-------------|
| Access control | Module-level access only | Dashboard hidden from non-admin users; route-level protection |
| Section visibility | All-or-nothing | Role-based section visibility (Finance Lead: no Automation section) |
| Visual language | Inconsistent across FinOps modules | MET-DS-V2 enforced: tokens, components, spacing, typography |
| Interaction patterns | Varied by module | Standardised: card layout, drill-down via legend click, side panel pattern |

**Key initiatives**: Role-based visibility matrix, MET-DS-V2 governance enforcement, consistent interaction patterns.

### Pillar 6: Offline-First Design

| Aspect | Current state | Target state |
|--------|--------------|-------------|
| Data availability | Requires live connection | Exported data available offline (CSV/PDF) |
| Dashboard resilience | Blank screen on API failure | Graceful error states per section with retry |
| Filter state | Lost on refresh | Persisted in localStorage |
| Scheduled summary | Not available | Daily email digest with KPI snapshot (future phase) |

**Key initiatives**: Error state design, filter persistence, export functionality, scheduled email summary.

---

## 5. Phased Roadmap

### Phase 1: Foundation (Sprint 1-2) -- Current

| Deliverable | Priority | Status |
|-------------|----------|--------|
| Dashboard layout with 3-column KPI grid | P1 | Prototype complete |
| System Overview, Workflow Activity, Approval Delays cards | P1 | Prototype complete |
| Automation cards (All Pay, KEYIVR, Bank Statement) | P1 | Prototype complete |
| Actionable Insights section | P1 | Prototype complete |
| Period + Module filter controls | P1 | Prototype complete |
| Drill-down side panels (approval delays, bot failures) | P1 | Prototype complete |
| Skip-to-main link (WCAG 2.4.1) | P1 | Backlog |
| Shimmer loading states | P1 | Backlog |
| Empty/error state design | P1 | Backlog |
| Chart ARIA labels | P1 | Backlog |

### Phase 2: Discoverability & Polish (Sprint 3-4)

| Deliverable | Priority | Status |
|-------------|----------|--------|
| KPI definition tooltips | P2 | Backlog |
| Help mechanism (top nav) | P2 | Backlog |
| Filter persistence (localStorage) | P2 | Backlog |
| Stale bot timestamp warning | P2 | Backlog |
| Donut centre standardisation | P2 | Backlog |
| Export functionality (CSV/PDF) | P2 | Backlog |
| Usability testing (5-7 participants) | P2 | Planned |

### Phase 3: Efficiency & Navigation (Sprint 5-6)

| Deliverable | Priority | Status |
|-------------|----------|--------|
| Section quick-jump sub-navigation | P3 | Backlog |
| Rejection table drill-down | P3 | Backlog |
| Export preview modal | P3 | Backlog |
| Nudge approver action | P3 | Backlog |
| Research findings integration | P3 | Planned |

### Phase 4: Advanced Features (Sprint 7+)

| Deliverable | Priority | Status |
|-------------|----------|--------|
| Dashboard summary email (scheduled) | P4 | Future |
| Historical comparison toggle | P4 | Future |
| Bot log deep links | P4 | Future |
| Filter URL parameters + "Copy link" | P4 | Future |
| A/B test: 2-col vs 3-col layout | P4 | Future |

---

## 6. Design System Alignment

| Governance rule | Dashboard compliance |
|----------------|---------------------|
| Primary brand: `#3276CF` | All primary actions, active states, and chart accents use `--color-primary` |
| Page bg: `#F2F5FA` | Content area background uses `--color-bg` |
| Card bg: `#FFFFFF` | All KPI cards use `--color-card` with `elevation={0}` |
| Spacing: 8pt grid | All padding/margins use 4px base increments (8/12/16/20/24/32/40/48px) |
| Border-radius: 8px | Buttons, inputs use `--radius-button: 8px`; pills use `--radius-pill: 100px` |
| Typography: system-ui stack | All text uses `--font-family` token; sizes follow H1-Caption scale |
| Buttons: `disableElevation` | All `<Button>` components render flat |
| Cards: `elevation={0}` | All `<Card>` components use custom `--shadow-card` instead of MUI elevation |
| TextField: `variant="outlined"` | Filter dropdowns use `<Select variant="outlined">` |
| Colour-only indicators: prohibited | All status badges use colour + icon + text; trend arrows include % value |

**Deviation flagged**: Prototype uses `--radius-card: 16px` vs governance default `8px`. Pending design lead confirmation.

---

## 7. Accessibility Strategy

| WCAG 2.2 AA requirement | Strategy |
|-------------------------|----------|
| 1.1.1 Text alternatives | `aria-label` on all icon buttons and chart canvases; `alt` on images |
| 1.3.1 Info & relationships | Semantic HTML; `<th scope="col">` in tables; hidden data tables for charts |
| 1.4.1 Use of colour | Colour + icon + text for all status indicators |
| 1.4.3 Contrast | All text meets 4.5:1 minimum; `#757575` caption verified at 4.48:1 |
| 2.1.1 Keyboard | Full tab navigation: skip link -> nav -> filters -> cards -> legends -> panels |
| 2.4.1 Skip to content | `<a class="skip-link">` as first focusable element |
| 2.4.7 Focus visible | `outline: 2px solid var(--color-primary)` on `:focus-visible` |
| 2.5.8 Target size | Minimum 24x24px for all interactive elements; 44x44px recommended for primary actions |
| 3.2.6 Consistent help | Help icon in top nav; KPI tooltips via `(i)` icons |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables Chart.js animations + CSS transitions |

---

## 8. Success Metrics & Measurement Plan

| Metric | Measurement | Frequency | Owner |
|--------|-------------|-----------|-------|
| Task success rate (T1-T5) | Usability testing | Pre-launch + quarterly | UX Team |
| SUS score | Post-test questionnaire | Pre-launch + quarterly | UX Team |
| Time-on-task (SLA breach identification) | Usability testing | Pre-launch | UX Team |
| First-click accuracy | Unmoderated first-click test | Pre-launch | UX Team |
| Dashboard adoption rate | Analytics: `dashboard_viewed` events | Monthly post-launch | Product |
| Filter usage patterns | Analytics: `filter_changed` events | Monthly post-launch | Product |
| Drill-down engagement | Analytics: `drill_down_opened` events | Monthly post-launch | Product |
| Export frequency | Analytics: `export_initiated` events | Monthly post-launch | Product |
| WCAG compliance | Automated audit (axe-core) + manual | Each sprint | Dev + QA |
| User satisfaction | In-app feedback widget or survey | Quarterly post-launch | UX Team |

---

## 9. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| API latency degrades dashboard responsiveness | Users perceive dashboard as slow; abandon use | Medium | Shimmer loaders; pre-aggregated data views; set 2-second refresh target |
| KPI definitions misunderstood by users | Wrong decisions based on misinterpreted data | High | Tooltip definitions from BRD glossary; user onboarding walkthrough |
| Information overload from dense KPI grid | Cognitive fatigue; users ignore important signals | Medium | Progressive disclosure; exception-first hierarchy; collapsible sections |
| Role-based access not enforced correctly | Unauthorised data exposure | Low | Server-side role validation on every API endpoint; client-side route guard |
| Design system deviations in implementation | Inconsistent visual language; maintenance burden | Medium | MET-DS-V2 token enforcement; automated style linting; design review gates |
| Low usability test participation | Insufficient data for evidence-based improvements | Medium | Schedule 2 weeks ahead; flexible time slots; backup participants; incentives |
| Bot API unavailability at build time | Automation section shows empty states permanently | Medium | Use stubs/mock data during development; design robust empty states |
| Scope creep from stakeholder feature requests | Delayed delivery; bloated interface | High | Strict backlog prioritisation (P1-P4); defer P3/P4 to later phases; change request process |

---

## 10. Governance & Review Cadence

| Activity | Frequency | Participants |
|----------|-----------|-------------|
| Design review (prototype + specs) | Each sprint | UX, Dev Lead, Product Owner |
| Accessibility audit | Each sprint | QA, UX |
| Stakeholder demo | End of each phase | UX, Product, Operations leads, Finance lead |
| Usability testing | Pre-launch + quarterly | UX Team, 5-7 participants per round |
| Analytics review | Monthly post-launch | Product, UX, Operations |
| Strategy retrospective | Quarterly | UX Team, Product Owner |
| Design system compliance check | Each sprint | UX, Dev Lead |

---

*UX Strategy -- FinOps Admin Dashboard KPI Metrics V1.0*
