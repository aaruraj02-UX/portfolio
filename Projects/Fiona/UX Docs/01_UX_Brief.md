# UX Brief — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **BRD**: FINOPS_Dashboard+KPI+Metrics_BRD_V1.0
> **Version**: 1.0
> **Date**: 10 April 2026
> **Author**: UX Team
> **Design system**: MET-DS-V2 (React + MUI v5)

---

## Background

FinOps is an internal automation platform supporting multiple business processes across Treasury, Payroll, and Finance teams at Acme Holdings. Modules include Ad Hoc Payments, Bank Statements, Variable Pay, Pension Analysis, Vehicle Release Payments, and bot-driven processes (All Pay, KEYIVR). As the platform expands, administrators lack a unified monitoring view; current oversight relies on manual effort and fragmented data sources. The Admin Dashboard introduces a consolidated KPI-driven monitoring surface for system usage, workflow performance, and automation activity.

## Objectives

| # | Objective | Success metric |
|---|-----------|---------------|
| O1 | Centralised operational monitoring | Single dashboard replaces ≥ 3 disparate views |
| O2 | Approval delay visibility | Time-to-identify bottlenecks reduced from hours → seconds |
| O3 | Automation health tracking | Bot failure / success rates visible within 1 click |
| O4 | Trend-based decision making | Period-over-period comparisons available (daily/weekly/monthly/custom) |
| O5 | Exception-based alerting | Longest pending approvals and high-rejection modules surfaced proactively |

## Target Users

| User | Description | Access level |
|------|-------------|-------------|
| **Admin User** | Primary dashboard consumer; monitors operations, identifies delays, escalates | View-only analytics + default grid actions |
| **Operations Manager** | Oversees cross-module KPIs; interested in high-level trends | View-only analytics |
| **Developer** | Builds and maintains dashboard features; consumes specs | Full (development) |
| **Automation Team** | Provides bot process details; monitors AllPay / KEYIVR health | View-only automation section |

## User Needs

- At-a-glance system health (active users, peak usage, highest-activity module)
- Drill-down from summary KPIs to individual request records
- Filterable views by date range (daily / weekly / monthly / custom) and module
- Immediate visibility of SLA-breached approvals (> 5 days pending)
- Bot success/failure rates + last execution timestamp
- Trend indicators showing period-over-period change direction
- Export capability for offline analysis

## Core Challenges

1. **Data aggregation**: Multiple module databases plus bot logs must feed a single surface
2. **Real-time expectations**: Filters must refresh all visualisations without page reload
3. **Information overload**: Dense KPI landscape risks cognitive overload for admins
4. **Role-based access**: Only administrators may view the dashboard — no edit capabilities

## Brand & Visual Direction

- **Design system**: MET-DS-V2 (React + MUI v5)
- **Primary brand**: `#3276CF` · Page bg: `#F2F5FA` · Card bg: `#FFFFFF` · Body text: `#212121`
- **Spacing**: 8pt grid (2/4/8/12/16/20/24/32/40/48px)
- **Border-radius**: 8px cards/buttons/inputs · 100px pills
- **Font**: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
- **All buttons**: `disableElevation` · All cards: `elevation={0}` · Text fields: `variant="outlined"`

## Scope & Deliverables

**In-scope**: Data visualisation, KPI reporting, user activity metrics, workflow request monitoring, approval delay tracking, automation efficiency metrics, dashboard filtering, export, actionable insights panel.

**Out-of-scope**: Record editing/modification, user management, workflow rule configuration, bot scheduling management.

**Deliverables**: Full UX package — brief → personas → empathy maps → task analysis → IA → journeys → wireframes → heuristic evaluation → research plan → backlog → handoff.

## Constraints

- Admin-only access — dashboard content must never be visible to standard FinOps users
- All data is read-only; no create / update / delete operations permitted from the dashboard
- Module data availability depends on existing API infrastructure and bot log storage
- Must comply with WCAG 2.2 AA accessibility standards
- Must comply with MET-DS-V2 design system governance for all visual outputs

## Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Module APIs unavailable at build time | Missing data → empty states | Design empty/loading states; use stubs |
| Slow aggregation queries (large datasets) | Degraded UX — users perceive lag | Add shimmer loaders, paginate grids, consider pre-aggregated views |
| Admin role not correctly enforced | Unauthorized data exposure | Validate role on every API endpoint; hide route in nav for non-admins |
| KPI definitions misunderstood | Wrong metrics displayed | Include glossary (BRD §10) in tooltip / help hover |
| Stakeholder disagreement on KPI thresholds | Inconsistent status badges | Confirm thresholds with product owner pre-build; make configurable |

---

*Document 1 of 11 — FinOps Admin Dashboard UX Package V1.0*
