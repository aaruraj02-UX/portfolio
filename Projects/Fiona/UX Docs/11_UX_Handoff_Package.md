# UX → Engineering Handoff Package — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Design system**: MET-DS-V2 (React + MUI v5)

---

## 1. Links & Artefacts

| Artefact | Location |
|----------|----------|
| HTML Prototype | `UX_Deliverables/prototype/var-pay.html` |
| BRD | `business/FINOPS_Dashboard+KPI+Metrics_BRD_V1.0.doc` |
| Design System Tokens | `skills/uiux/design-system-tokens.instructions.md` |
| MUI Implementation Guide | `skills/uiux/design-system-mui.instructions.md` |
| Component Patterns | `skills/uiux/design-system-components.instructions.md` |
| UX Brief | `UX_Deliverables/01_UX_Brief.md` |
| Personas | `UX_Deliverables/02_Personas.md` |
| Empathy Maps | `UX_Deliverables/03_Empathy_Maps.md` |
| Task Analysis | `UX_Deliverables/04_Task_Analysis.md` |
| Information Architecture | `UX_Deliverables/05_Information_Architecture.md` |
| User Journeys | `UX_Deliverables/06_User_Journeys.md` |
| Wireframe Specifications | `UX_Deliverables/07_Wireframe_Specifications.md` |
| Heuristic Evaluation | `UX_Deliverables/08_Heuristic_Evaluation.md` |
| UX Research Plan | `UX_Deliverables/09_UX_Research_Plan.md` |
| UX Backlog | `UX_Deliverables/10_UX_Backlog.md` |
| UX Backlog (CSV) | `UX_Deliverables/FinOps_Admin_Dashboard_UX_Backlog.csv` |

---

## 2. Component Map

| UI Component | MUI Equivalent | Key Props | DS Token references |
|-------------|----------------|-----------|-------------------|
| Top nav bar | Custom `<AppBar>` | `position="sticky"` `elevation={0}` `sx={{ bg: 'background.paper' }}` | `--color-card`, `--divider-color` |
| Sidebar | Custom `<Drawer>` | `variant="permanent"` with width toggle on hover | `--color-card`, `--color-primary-50` (active) |
| Filter select | `<Select>` | `variant="outlined"` `size="small"` | `--grey-300` border, `--radius-input` |
| KPI card | `<Card>` | `elevation={0}` `sx={{ borderLeft: '4px solid …', borderRadius: 2 }}` | `--color-card`, `--radius-card`, `--shadow-card` |
| Status badge | `<Chip>` | `size="small"` with `sx` colour overrides | `--color-success-bg`, `--color-warning-bg`, `--color-error-bg` |
| Trend indicator | `<Typography>` + `<SvgIcon>` | Inline flex, 12px caption | `--color-success-darker`, `--color-error` |
| Donut chart | Chart.js `<Doughnut>` | `cutout: '65%'`; wrapped in custom component | See chart colour tokens below |
| Bar chart | Chart.js `<Bar>` | Stacked/single; wrapped in custom component | `--color-primary`, `--color-warning`, `--grey-400` |
| Line chart | Chart.js `<Line>` | Tension 0.3, point radius 3 | `--color-error`, `--color-warning`, `--color-success` |
| Side panel | `<Drawer>` | `anchor="right"` `variant="temporary"` `PaperProps={{ sx: { width: 800 } }}` | `--shadow-modal`, `--color-card` |
| Data table | `<Table>` | `size="small"` | `--grey-100` row border, `--grey-200` header border |
| Skip link | `<a>` | Visually hidden until focus | `--color-primary`, `--color-card` |

---

## 3. MET-DS-V2 Token Mapping

Full `:root` token block is defined in `skills/uiux/design-system-tokens.instructions.md`. Below maps prototype CSS variables to MUI theme keys:

| CSS Variable | Resolved value | MUI theme path |
|-------------|---------------|----------------|
| `--color-primary` | `#3276CF` | `palette.primary.main` |
| `--color-primary-hover` | `#2C66B4` | `palette.primary.dark` |
| `--color-bg` | `#F2F5FA` | `palette.background.default` |
| `--color-card` | `#FFFFFF` | `palette.background.paper` |
| `--text-primary` | `#212121` | `palette.text.primary` |
| `--text-secondary` | `#757575` | `palette.text.secondary` |
| `--color-success` | `#43A047` | `palette.success.main` |
| `--color-success-dark` | `#388E3C` | `palette.success.dark` |
| `--color-error` | `#E53935` | `palette.error.main` |
| `--color-error-dark` | `#D32F2F` | `palette.error.dark` |
| `--color-warning` | `#FF9800` | `palette.warning.main` |
| `--color-disabled` | `#BDBDBD` | `palette.text.disabled` |
| `--grey-200` | `#EEEEEE` | `palette.divider` (close — actual divider `#E0E0E0`) |
| `--grey-300` | `#E0E0E0` | `palette.divider` |
| `--radius-card` | `16px` | Note: prototype uses 16px; MUI theme `shape.borderRadius = 8`. Override per-component. |
| `--radius-button` | `8px` | `shape.borderRadius` |
| `--radius-input` | `8px` | `shape.borderRadius` |
| `--radius-pill` | `100px` | Override: `borderRadius: '100px'` in `sx` |
| `--shadow-card` | `0 1px 4px rgba(50,118,207,0.10)` | Custom `theme.shadows[1]` override |
| `--shadow-modal` | `0 8px 32px rgba(0,0,0,0.18)` | Custom `theme.shadows[8]` override |

### Deviation flags

- **Prototype card radius**: Prototype uses `--radius-card: 16px` which differs from MET-DS-V2 governance default of `8px`. Confirm with design lead. Current implementation uses `border-radius: var(--radius-card)` = 16px.
- **Warning colour inconsistency**: Prototype `--color-warning` uses `#EF6C00` in some inline styles (Orange/800) while token block defines `#FF9800` (Orange/500). Standardise to token value.

---

## 4. Acceptance Criteria

### AC-001: Dashboard loads with default filters
- **Given** an authenticated admin user
- **When** they navigate to `/admin/dashboard`
- **Then** the dashboard renders with Period = "Weekly" and Module = "All Modules" pre-selected
- **And** all 3 overview cards, 3 automation cards, and insights section are visible
- **And** a shimmer loading state is shown per card while data fetches

### AC-002: Period filter updates all sections
- **Given** the dashboard is loaded
- **When** the user changes Period to "Monthly"
- **Then** all KPI values, charts, and trend indicators refresh with monthly data
- **And** the update completes within 2 seconds

### AC-003: Module filter scopes workflow data
- **Given** the dashboard is loaded
- **When** the user selects Module = "Variable Pay"
- **Then** Workflow Activity cards show only Variable Pay data
- **And** Approval Delays reflect only Variable Pay pending items
- **And** System Overview "Highest Activity" updates accordingly

### AC-004: Approval delay drill-down
- **Given** the Approval Delays donut is visible
- **When** the user clicks the "> 5 Days" legend item (or presses Enter)
- **Then** a right-side panel slides in showing a table of pending approvals > 5 days
- **And** the table includes: Request ID, Module, Created By, Created On, Pending Duration, Status badge
- **And** pressing Escape or clicking overlay closes the panel

### AC-005: All Pay failure drill-down
- **Given** the All Pay Automation card is visible
- **When** the user clicks the "Failure" legend item
- **Then** a right-side panel shows failed files with: File ID, Module, Bot, Date, Failure Reason, Status

### AC-006: Empty state
- **Given** the user selects a period/module combination with no data
- **When** the dashboard attempts to load
- **Then** each section shows an illustrated empty state with message "No data available for the selected period"
- **And** a suggestion "Try selecting a different date range or module" is displayed

### AC-007: Error state
- **Given** an API call fails
- **When** a section cannot load data
- **Then** that section displays an inline error: icon + "Unable to load [Section Name]" + "Retry" button
- **And** clicking Retry re-fetches that section's data

### AC-008: Accessibility compliance
- **Given** any dashboard view
- **Then** skip-to-main link is the first focusable element
- **And** all interactive elements are keyboard accessible
- **And** chart canvases have `role="img"` + descriptive `aria-label`
- **And** contrast ratios meet WCAG 2.2 AA (4.5:1 normal text, 3:1 large text / UI)

---

## 5. States Matrix

| Section | Default | Loading | Empty | Error | Filtered |
|---------|---------|---------|-------|-------|----------|
| System Overview | ✅ KPI cards + bar chart | Shimmer | "No user activity" | Retry block | Scoped by period |
| Workflow Activity | ✅ KPI cards + stacked bar | Shimmer | "No workflow data" | Retry block | Scoped by period + module |
| Approval Delays | ✅ Donut + legends | Shimmer | "No pending approvals" | Retry block | Scoped by period + module |
| All Pay | ✅ KPI cards + donut | Shimmer | "No bot activity" | Retry block | Scoped by period |
| KEYIVR | ✅ KPI cards + donut | Shimmer | "No bot activity" | Retry block | Scoped by period |
| Bank Statement | ✅ KPI cards + donut | Shimmer | "No files uploaded" | Retry block | Scoped by period |
| Insights | ✅ Table + trend chart | Shimmer | "Insufficient data for trends" | Retry block | Scoped by period |
| Side Panel | — (hidden) | Table loading | "No records" | Retry block | Populated per drill-down |

---

## 6. Data Contracts & API Assumptions

| Endpoint | Method | Parameters | Returns |
|----------|--------|-----------|---------|
| `/api/dashboard/system-overview` | GET | `period`, `dateFrom`, `dateTo` | `{ activeUsers, highestActivityModule, peakUsageTime, usersByModule[] }` |
| `/api/dashboard/workflow-activity` | GET | `period`, `module`, `dateFrom`, `dateTo` | `{ requestsRaised, approvalsCompleted, rejected, dailyBreakdown[] }` |
| `/api/dashboard/approval-delays` | GET | `period`, `module` | `{ brackets: { lt1Day, oneToThree, threeToFive, gtFive }, details[] }` |
| `/api/dashboard/automation/allpay` | GET | `period` | `{ avgCompletionTime, filesReceived, successCount, failureCount, lastRunTimestamp }` |
| `/api/dashboard/automation/keyivr` | GET | `period` | `{ avgCompletionTime, filesReceived, successRate, failureRate, manualRate, lastRunTimestamp }` |
| `/api/dashboard/automation/bank-statement` | GET | `period` | `{ filesUploaded, processingRate, errorRate }` |
| `/api/dashboard/insights/rejection-trend` | GET | `period` | `{ modules[]: { name, currentRate, trend[] } }` |
| `/api/dashboard/drill-down/approval-details` | GET | `bracket`, `module` | `{ requests[]: { id, module, createdBy, createdOn, pendingDuration, status } }` |
| `/api/dashboard/drill-down/allpay-files` | GET | `status` (success/failure) | `{ files[]: { id, bot, date, processingTime/failureReason, status } }` |

---

## 7. i18n & Accessibility Notes

- **Language**: English (en-GB) for all labels; `<html lang="en">`
- **Date format**: DD MMM YYYY (e.g., "09 Apr 2026") — use `Intl.DateTimeFormat('en-GB', ...)`
- **Number format**: Comma separator for thousands (1,463) — use `Intl.NumberFormat('en-GB')`
- **Screen reader**: Chart data must be available as hidden tables or `aria-label` summaries
- **Reduced motion**: Wrap all Chart.js animations + CSS transitions in `@media (prefers-reduced-motion: reduce)`
- **Colour-blind safety**: All status indicators use colour + icon + text — never colour alone
- **Touch targets**: Minimum 24×24px for all interactive elements; recommended 44×44px for primary actions

---

## 8. Analytics Events

| Event name | Trigger | Properties |
|-----------|---------|-----------|
| `dashboard_viewed` | Dashboard page load | `userId`, `role`, `timestamp` |
| `filter_changed` | Period or Module dropdown changed | `filterType`, `filterValue`, `previousValue` |
| `drill_down_opened` | Side panel opens | `panelType` (approval-delay / allpay-files), `category` (e.g., "gt5") |
| `drill_down_closed` | Side panel closes | `panelType`, `closeMethod` (escape / overlay / button) |
| `export_initiated` | Export button clicked | `format` (CSV/PDF), `period`, `module` |
| `kpi_tooltip_viewed` | Info tooltip displayed on hover for ≥ 1s | `kpiName` |
| `chart_interaction` | Chart tooltip or legend clicked | `chartId`, `interactionType` |

---

## 9. QA Test Cases

| TC # | Scenario | Steps | Expected result |
|------|----------|-------|----------------|
| TC-01 | Dashboard loads for admin role | Login as admin → navigate to Dashboard | All sections render with default filter (Weekly, All Modules) |
| TC-02 | Dashboard blocked for non-admin | Login as regular user → navigate to Dashboard URL | 403 Forbidden or redirect to home |
| TC-03 | Period filter — Monthly | Change Period to "Monthly" | All sections refresh; data reflects monthly aggregation |
| TC-04 | Module filter — Variable Pay | Change Module to "Variable Pay" | Workflow and Delays sections scope to Variable Pay only |
| TC-05 | Combined filters | Period = Daily + Module = Ad-hoc Payments | All sections show daily Ad-hoc Payments data |
| TC-06 | Approval delay drill-down | Click "> 5 Days" legend | Side panel opens with 3 SLA-breached requests |
| TC-07 | Side panel keyboard close | Open side panel → press Escape | Panel closes, focus returns to trigger element |
| TC-08 | All Pay failure drill-down | Click "Failure" in All Pay legend | Panel shows failed files with failure reasons |
| TC-09 | Empty state — no data | Select a period with no activity data | Each section shows empty state illustration + guidance message |
| TC-10 | Error state — API failure | Simulate API 500 error | Affected section shows error message + Retry button |
| TC-11 | Retry after error | Click "Retry" on error block | Section re-fetches and renders correctly |
| TC-12 | Skip link | Tab into page (first focus) | Skip link appears; pressing Enter focuses main content area |
| TC-13 | Screen reader on charts | Use VoiceOver/NVDA on chart canvas | `aria-label` read aloud with chart summary data |
| TC-14 | Responsive — tablet (1024px) | Resize to 1024px | 2-column card layout; sidebar collapsed |
| TC-15 | Responsive — mobile (375px) | Resize to 375px | 1-column stack; sidebar hidden; charts reduced height |
| TC-16 | Keyboard navigation full flow | Tab through entire dashboard | All interactive elements reachable in logical order |
| TC-17 | Reduced motion | Enable `prefers-reduced-motion` | Chart animations disabled; CSS transitions ≤ 0.01ms |
| TC-18 | Export functionality | Click Export | File downloads in correct format with current filter's data |

---

*Document 11 of 11 — FinOps Admin Dashboard UX Package V1.0*
