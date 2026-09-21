# Wireframe Specifications — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Reference prototype**: `UX_Deliverables/prototype/var-pay.html`
> **Design system**: MET-DS-V2 (React + MUI v5)

---

The existing prototype ([var-pay.html](../prototype/var-pay.html)) serves as the reference wireframe. This document specifies per-section layout, content priority, interaction states, and MUI component mapping aligned with MET-DS-V2.

## 1. Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                          │
│ [Logo + Tagline]                        [Notifications] [Avatar] │
├──────┬──────────────────────────────────────────────────────┤
│ SIDE │  CONTENT AREA (scrollable)                           │
│ BAR  │  ┌─── Header: Welcome + Filters ──────────────────┐ │
│      │  │ "Admin Dashboard"  Period ▾  Module ▾          │ │
│ icon │  ├────────────┬────────────┬────────────┐         │ │
│ rail │  │ System     │ Workflow   │ Approval   │  Row 1  │ │
│      │  │ Overview   │ Activity   │ Delays     │         │ │
│ 56px │  ├────────────┼────────────┼────────────┤         │ │
│      │  │ Automation │ Automation │ Automation │  Row 2  │ │
│      │  │ All Pay    │ KEYIVR     │ Bank Stmt  │         │ │
│      │  ├────────────┴────────────┴────────────┤         │ │
│      │  │ Actionable Insights (full width)     │  Row 3  │ │
│      │  └──────────────────────────────────────┘         │ │
└──────┴──────────────────────────────────────────────────────┘
```

## 2. Information Hierarchy

```
Admin Dashboard
├── (Global) Filter Bar: Period | Module | Export
├── Row 1: Overview (3-column)
│   ├── System Overview Card
│   │   ├── Total Active Users (count + trend + target)
│   │   ├── Highest Activity Module
│   │   ├── Peak Usage Time
│   │   └── Active Users by Module (horizontal bar chart)
│   ├── Workflow Activity Card
│   │   ├── Requests Raised (count + trend)
│   │   ├── Approvals Completed (count + trend)
│   │   ├── Rejected Requests (count + trend)
│   │   └── Stacked Bar Chart (7-day Approved/Rejected/Pending)
│   └── Approval Delays Card
│       ├── Donut Chart (< 1d / 1–3d / 3–5d / > 5d)
│       ├── Interactive Legend Items
│       └── → Side Panel (drill-down table per bracket)
│
├── Row 2: Automation Modules (3-column)
│   ├── Automation — All Pay Card
│   │   ├── Avg Bot Completion Time
│   │   ├── Files Received
│   │   ├── Last Bot Run
│   │   ├── Success/Failure Donut
│   │   └── → Side Panel (success/failure file lists)
│   ├── Automation — KEYIVR Card
│   │   ├── Avg Bot Completion Time
│   │   ├── Files Received
│   │   ├── Last Bot Run
│   │   └── Success/Failure/Manual Donut
│   └── Automation — Bank Statement Card
│       ├── Files Uploaded
│       ├── Processing Rate
│       ├── Error Rate
│       └── Processing/Error Donut
│
└── Row 3: Actionable Insights
    └── Highest Rejection Rate (full width)
        ├── Ranked Table (Module | Rate)
        └── Trend Line Chart (multi-module overlay)
```

## 3. Component Specifications

### 3.1 Top Navigation Bar

| Element | Token / Style | Notes |
|---------|--------------|-------|
| Container | `background: var(--color-card); border-bottom: 1px solid var(--divider-color)` | Height auto, padding `8px 16px` |
| Logo | `height: 28px` | SVG, `alt="FinOps — Enterprise Finance Automation Platform"` |
| Tagline | `font-size: var(--font-size-caption); color: var(--text-secondary)` | Hidden at ≤ 1279px |
| Notification bell | `40×40px` icon button, relative positioning for badge | `aria-label="Notifications — N unread"` |
| Badge | `background: var(--color-warning); color: #FFFFFF; border-radius: 100px` | Min-width 20px |
| Avatar | `32×32px; border-radius: 100px` | `aria-label="User profile menu"` |

### 3.2 Left Sidebar (Icon Rail)

| Element | Token / Style | Notes |
|---------|--------------|-------|
| Collapsed width | `56px` | Expands to `260px` on hover/focus |
| Active link | `background: var(--color-primary-50); color: var(--color-primary)` | `aria-current="page"` |
| Hover link | `background: var(--color-primary-25); color: var(--color-primary)` | |
| Section heading | `font-size: 11px; text-transform: uppercase; color: var(--text-secondary)` | Opacity 0 when collapsed, 1 when expanded |
| Icons | Material Symbols Outlined, 22px | `aria-hidden="true"` |
| Focus | `outline: 2px solid var(--color-primary); outline-offset: -2px` | WCAG 2.4.11 |

### 3.3 Filter Bar

| Element | Token / Style | Notes |
|---------|--------------|-------|
| Period dropdown | `<Select variant="outlined" size="small">` | Options: Daily · Weekly · Monthly · Custom |
| Module dropdown | `<Select variant="outlined" size="small">` | Options: All Modules · Ad Hoc · Variable Pay · Pension · Vehicle Release · Bank Statements |
| Export button | `<Button variant="outlined" size="small" disableElevation>` | Icon: `file_download` |
| Default values | Period = "Weekly", Module = "All Modules" | |

### 3.4 KPI Overview Cards (Row 1)

| Card | Metrics | Chart | Status logic |
|------|---------|-------|-------------|
| **System Overview** | Total Active Users (342, +12%, target 400) · Highest Activity Module (Ad-hoc Pay) · Peak Usage Time (09–11:00) | Horizontal bar — users by module | At Risk if < 85% of target |
| **Workflow Activity** | Requests Raised (1,463, +12%) · Approvals (1,244, +8%) · Rejected (167, +5%) | Stacked bar — 7-day Approved/Rejected/Pending | Warning if rejection rate > 10% |
| **Approval Delays** | Donut: <1d (23), 1–3d (12), 3–5d (5), >5d (3) | Donut with interactive legends | Breached if >5d has any count |

#### Card styling tokens

| Property | Token |
|----------|-------|
| Background | `var(--color-card)` → `#FFFFFF` |
| Border-radius | `var(--radius-card)` → `16px` (prototype) — **Note**: MET-DS-V2 governance default is `8px`; confirm with design lead |
| Border-left | `4px solid var(--color-primary)` (or semantic colour) |
| Shadow | `var(--shadow-card)` → `0 1px 4px rgba(50,118,207,0.10)` |
| Padding | `24px` (6 × 4px spacing base) |

### 3.5 Automation Cards (Row 2)

| Card | Metrics | Visual | Status logic |
|------|---------|--------|-------------|
| **All Pay** | Avg Bot Completion (2.4 min, −15%) · Files Received (847, +15%) · Last Bot Run (07 Apr, 08:32) | Donut: Success 798 / Failure 49 | At Risk if success < 95% |
| **KEYIVR** | Avg Bot Completion (3.1 min, −10%) · Files Received (623, +10%) · Last Bot Run (07 Apr, 07:45) | Donut: Success 97.5% / Failure 0.7% / Manual 1.8% | On Track if success ≥ 95% |
| **Bank Statement** | Files Uploaded (156, +8%) · Processing Rate (91.7%, +3%) · Error Rate (8.3%, −2%) | Donut: Processed 91.7% / Error 8.3% | Breached if error rate > 5% |

### 3.6 Actionable Insights (Row 3)

| Element | Content | Interaction |
|---------|---------|-------------|
| Rejection Rate Table | Module ranked by rejection % | Future: click module → drill-down |
| Trend Line Chart | Multi-module rejection trend over selected period | Tooltip on hover with exact values |
| Legend | Colour-coded module labels below chart | |

## 4. Navigation Model

| Pattern | Implementation |
|---------|---------------|
| **Primary nav** | Left sidebar (icon rail, width: 56px collapsed → 260px on hover) |
| **Section grouping** | Treasury · Client Funds · Payroll · Settings — with heading labels |
| **Active indicator** | `background: var(--color-primary-50); color: var(--color-primary);` |
| **Top nav** | Brand logo left, notifications + profile right |
| **Drill-down** | Right slide-in panel (800px, overlay) triggered by interactive chart legends |
| **Filters** | Persistent header-level dropdowns — Period (Daily/Weekly/Monthly/Custom) + Module (All/individual) |
| **Keyboard** | Tab through sidebar links → to filter dropdowns → to KPI cards → to chart legends → side panel |

## 5. Interaction States

| State | Behaviour |
|-------|----------|
| **Default** | All cards rendered with current period data |
| **Loading** | Shimmer placeholder per card while data fetches |
| **Empty** | "No data available for selected period" message with icon |
| **Error** | Inline error alert: "Unable to load [section]. Retry." with retry button |
| **Filter change** | All charts animate to new data (250ms ease-out); no page reload |
| **Side panel open** | Overlay (rgba(0,0,0,0.3)), panel slides from right (800px); body scroll locks |
| **Side panel close** | Escape key, close button, or overlay click; restores body scroll |
| **Responsive (≤1279px)** | Sidebar collapses; 3-column → 2-column grid |
| **Responsive (≤767px)** | Sidebar hidden; 1-column stack; charts reduce height |

## 6. MUI Component Mapping

| Prototype element | MUI Component | Props |
|-------------------|--------------|-------|
| Filter dropdown | `<Select>` | `variant="outlined"` `size="small"` |
| KPI card container | `<Card>` | `elevation={0}` `sx={{ borderRadius: 2, borderLeft: '4px solid …' }}` |
| Status badge | `<Chip>` | `size="small"` `variant="filled"` with semantic colour |
| Trend arrow | `<SvgIcon>` or Material Icons | `trending_up` / `trending_down` |
| Side panel | `<Drawer>` | `anchor="right"` `variant="temporary"` `PaperProps={{ sx: { width: 800 } }}` |
| Data table in panel | `<Table>` | `size="small"` with `<TableSortLabel>` |
| Donut charts | Chart.js (external) | Wrapped in custom `<KpiDonut>` component |
| Bar charts | Chart.js (external) | Wrapped in custom `<KpiBarChart>` component |

## 7. Responsive Breakpoints

| Breakpoint | Grid | Sidebar | Cards | Charts |
|-----------|------|---------|-------|--------|
| ≥ 1280px | 3-column | Icon rail 56px → 260px hover | Full-width per column | Native height |
| 1024–1279px | 2-column | Collapsed 56px (no expand) | Wrap to 2-column | Native height |
| < 1024px | 1-column | Hidden (hamburger menu) | Full-width stack | Reduced height |

---

*Document 7 of 11 — FinOps Admin Dashboard UX Package V1.0*
