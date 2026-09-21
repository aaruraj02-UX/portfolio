# UX Backlog — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **CSV export**: `UX_Deliverables/FinOps_Admin_Dashboard_UX_Backlog.csv`

---

## Backlog Items

| # | Title | Problem | Proposal | Impact | Effort | Priority |
|---|-------|---------|----------|--------|--------|----------|
| UXB-001 | Skip-to-main link | No skip link for keyboard/screen-reader users — WCAG 2.4.1 failure | Add `<a class="skip-link">` as first focusable element | High | Small | P1 |
| UXB-002 | Shimmer loading states | No visual feedback during filter-triggered data refresh; user unsure if action worked | Skeleton/shimmer placeholders per card section during data load | High | Medium | P1 |
| UXB-003 | Empty state design | No content displayed when selected period has no data | Illustrated empty state with message + "Try a different date range" guidance | High | Medium | P1 |
| UXB-004 | Error state design | API failures result in blank sections with no feedback | Inline error alert per section: icon + message + "Retry" button | High | Medium | P1 |
| UXB-005 | Chart accessibility (ARIA) | Chart canvases have no screen-reader descriptions | Add `role="img"` + `aria-label` describing chart purpose and key data | High | Small | P1 |
| UXB-006 | KPI definition tooltips | Users may not understand KPI names or threshold logic | `(i)` icon per KPI label with popover tooltip from BRD glossary | Medium | Medium | P2 |
| UXB-007 | Consistent help mechanism | No help feature exists — fails WCAG 3.2.6 | Add `?` icon in top nav linking to help centre / contextual guide | Medium | Small | P2 |
| UXB-008 | Filter persistence | Filters reset on page refresh — user loses context | Store last-used Period/Module in localStorage; add "Reset filters" button | Medium | Small | P2 |
| UXB-009 | Stale bot timestamp warning | Last Bot Execution shows timestamp but no freshness context | Add relative time ("X hrs ago") + warning badge if > 8 hours | Medium | Small | P2 |
| UXB-010 | Donut centre consistency | Some donuts show count, others show percentage — inconsistent | Standardise: primary value in centre + label; secondary in legend | Low | Small | P2 |
| UXB-011 | Section quick-jump navigation | Automation section requires scrolling past overview — no fast route | Sticky sub-nav tabs: Overview · Automation · Insights | Medium | Medium | P3 |
| UXB-012 | Drill-down from rejection table | Clicking module name in rejection table does nothing | Link module names to filtered rejection detail view | Medium | Medium | P3 |
| UXB-013 | Nudge approver action | No in-app escalation for overdue approvals — admins must email | Add "Nudge" button in side panel → sends notification to assigned approver | Medium | Large | P3 |
| UXB-014 | Export preview | Export output unknown until file is downloaded | Show export preview modal with format selection (CSV/PDF) | Low | Medium | P3 |
| UXB-015 | Dashboard summary email | Admins must log in daily to review status | Scheduled 08:00 email with top KPIs, exceptions, and dashboard link | Medium | Large | P4 |
| UXB-016 | Historical comparison toggle | Cannot compare current period with previous period on same card | "Compare" toggle on KPI cards showing period-over-period overlay | Medium | Large | P4 |
| UXB-017 | Bot log deep links | Dashboard shows failed file IDs but no link to execution log | Add hyperlink from file ID in side panel to bot log viewer | Low | Medium | P4 |
| UXB-018 | Filter URL parameters | Cannot bookmark or share a filtered dashboard view | Sync filter state to URL query params; "Copy link" button | Low | Small | P4 |

---

## Priority Summary

| Priority | Count | Focus |
|----------|-------|-------|
| **P1** (Must-have) | 5 | Accessibility compliance + core usability |
| **P2** (Should-have) | 5 | Discoverability + comprehension |
| **P3** (Nice-to-have) | 4 | Efficiency + advanced interactions |
| **P4** (Future) | 4 | Delight + operational automation |

---

## Sprint Planning Guidance

### Sprint 1 — Accessibility & Core States
- UXB-001: Skip-to-main link (Small)
- UXB-005: Chart ARIA labels (Small)
- UXB-002: Shimmer loading states (Medium)
- UXB-003: Empty state design (Medium)
- UXB-004: Error state design (Medium)

### Sprint 2 — Discoverability & Comprehension
- UXB-006: KPI definition tooltips (Medium)
- UXB-007: Help mechanism (Small)
- UXB-008: Filter persistence (Small)
- UXB-009: Stale timestamp warning (Small)
- UXB-010: Donut centre consistency (Small)

### Sprint 3 — Efficiency & Navigation
- UXB-011: Section quick-jump tabs (Medium)
- UXB-012: Rejection table drill-down (Medium)
- UXB-014: Export preview (Medium)

### Sprint 4+ — Advanced Features
- UXB-013: Nudge approver action (Large)
- UXB-015: Dashboard summary email (Large)
- UXB-016: Historical comparison toggle (Large)
- UXB-017: Bot log deep links (Medium)
- UXB-018: Filter URL parameters (Small)

---

## Traceability

| Backlog item | Source | Personas affected |
|-------------|--------|------------------|
| UXB-001 | WCAG 2.4.1 audit | All |
| UXB-002 | Heuristic H1 | Claire, James |
| UXB-003 | Heuristic H9 | All |
| UXB-004 | Heuristic H9 | All |
| UXB-005 | WCAG 1.3.1, 4.1.2 | All (screen-reader users) |
| UXB-006 | Heuristic H10 | James, Claire |
| UXB-007 | WCAG 3.2.6 | All |
| UXB-008 | Heuristic H3, Journey 1 | Claire, James |
| UXB-009 | Heuristic H1, Journey 3 | Priya |
| UXB-010 | Heuristic H4 | All |
| UXB-011 | Heuristic H6, Journey 3 | Priya, Claire |
| UXB-012 | Journey 3 (James) | James |
| UXB-013 | Journey 1 (Claire) | Claire |
| UXB-014 | Journey 2 (James) | James, Claire |
| UXB-015 | Journey 1 (Claire) | Claire, James |
| UXB-016 | Journey 3 (Priya) | Priya, James |
| UXB-017 | Journey 3 (Priya) | Priya |
| UXB-018 | Task Analysis | James, Claire |

---

*Document 10 of 11 — FinOps Admin Dashboard UX Package V1.0*
