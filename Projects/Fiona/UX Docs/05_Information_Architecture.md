# Information Architecture — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Methodology**: Content model → Role-based visibility → Sitemap → Navigation model

---

## 1. Content Model

### 1.1 Dashboard Regions

The dashboard surface is divided into four primary content regions, each containing grouped KPI data:

| Region | Cards / Components | Data level |
|--------|--------------------|------------|
| **System Overview** | Active Users · Highest Activity Module · Peak Usage Time · Users by Module bar chart | Aggregate — all modules |
| **Workflow Activity** | Requests Raised · Approvals Completed · Rejected · Daily Breakdown stacked bar | Aggregate — filterable by module |
| **Approval Delays** | Donut chart (< 1d, 1–3d, 3–5d, > 5d) · Legend with counts · Drill-down panel | Aggregate — filterable by module |
| **Automation** | All Pay card · KEYIVR card · Bank Statement card · Per-card donut + KPIs | Per-bot module |
| **Actionable Insights** | Rejection rate ranking table · Trend line chart · Longest pending table | Cross-module analysis |

### 1.2 Drill-Down Content

| Trigger | Panel content |
|---------|--------------|
| Approval > 5 Days | Table: Request ID, Module, Created By, Created On, Pending Duration, Status badge |
| All Pay Failure | Table: File ID, Module, Bot, Date, Failure Reason, Status |
| KEYIVR Failure | Table: File ID, Module, Bot, Date, Failure Reason, Status |
| Bank Statement Error | Table: File ID, Upload Date, Processing Status, Error Description |
| Rejection module click | Table: Request ID, Submitted By, Date, Rejection Reason, Approver |

---

## 2. Role-Based Visibility Matrix

| Feature / Section | Admin | Operations Manager | Developer | Finance Lead | Standard User |
|--------------------|-------|-------------------|-----------|-------------|---------------|
| Dashboard (full) | ✅ | ✅ (read-only) | ✅ | ✅ (read-only) | ❌ |
| System Overview | ✅ | ✅ | ✅ | ✅ | ❌ |
| Workflow Activity | ✅ | ✅ | ✅ | ✅ | ❌ |
| Approval Delays | ✅ | ✅ | ✅ | ✅ | ❌ |
| Automation Section | ✅ | ✅ | ✅ | ❌ (hidden) | ❌ |
| Actionable Insights | ✅ | ✅ | ✅ | ✅ | ❌ |
| Drill-down Panels | ✅ | ✅ | ✅ | ✅ | ❌ |
| Export | ✅ | ✅ | ❌ | ✅ | ❌ |
| Filter Controls | ✅ | ✅ | ✅ | ✅ | ❌ |

> **Note**: Standard FinOps users must not see the Dashboard menu item in navigation at all.

---

## 3. Sitemap

```
FinOps Platform
├── Login
├── Home (Standard User)
│   ├── Jobs
│   ├── Scheduler
│   ├── Messages
│   ├── Documents
│   ├── Worksheets
│   └── Settings
└── Admin Area (Admin role required)
    ├── Dashboard ← THIS PRODUCT
    │   ├── (Region) System Overview
    │   │   └── [Bar chart: Users by Module]
    │   ├── (Region) Workflow Activity
    │   │   └── [Stacked bar: Daily Breakdown]
    │   ├── (Region) Approval Delays
    │   │   ├── [Donut chart]
    │   │   └── [Panel] Approval Detail →
    │   ├── (Region) Automation
    │   │   ├── All Pay [Donut] → [Panel] Failed Files →
    │   │   ├── KEYIVR [Donut] → [Panel] Failed Files →
    │   │   └── Bank Statement [Donut] → [Panel] Error Files →
    │   ├── (Region) Actionable Insights
    │   │   ├── [Table: Rejection Ranking]
    │   │   ├── [Line chart: Trend]
    │   │   └── [Table: Longest Pending]
    │   └── (Global) Filters: Period | Module | Export
    ├── User Management
    └── System Configuration
```

---

## 4. Navigation Model

### 4.1 Primary Navigation (Top Bar)

| Element | Position | Behaviour |
|---------|----------|-----------|
| FinOps logo | Top-left | Click → home |
| Page title "Admin Dashboard" | Left of centre | Static label |
| Search | Centre | Global platform search (optional — not in current scope) |
| Notifications bell | Top-right | Badge with count |
| User avatar + name | Top-right | Dropdown: Profile · Settings · Logout |

### 4.2 Side Navigation (Icon Rail)

| Element | Position | Behaviour |
|---------|----------|-----------|
| Icon rail | Left edge, 56px collapsed | Hover → expand to 260px with labels |
| Dashboard icon | First item under Admin area | Active state: primary-50 bg + primary icon |
| Other admin items | Below Dashboard | Standard icon + label items |
| Bottom items | Pinned bottom | Settings · Help |

### 4.3 In-Page Navigation

| Element | Position | Behaviour |
|---------|----------|-----------|
| Filter bar | Top of content area | Period dropdown · Module dropdown · Export button |
| Section sub-nav (proposed UXB-011) | Sticky below filter bar | Tabs: Overview · Automation · Insights — click scrolls to section |
| Drill-down panels | Right edge | `<Drawer anchor="right">` slides in on legend click; closes on Escape / overlay |

### 4.4 Keyboard Navigation Flow

```
Tab order:
1. Skip-to-main link (visually hidden until focus)
2. Top nav items (logo → search → notifications → user menu)
3. Side nav items (collapsed icon rail)
4. Filter bar (Period dropdown → Module dropdown → Export button)
5. System Overview cards (left → right)
6. Workflow Activity cards (left → right)
7. Approval Delays (donut → legend items — each focusable)
8. Automation cards (All Pay → KEYIVR → Bank Statement)
9. Actionable Insights (table → chart)
10. Footer (if any)
```

---

## 5. Filter Architecture

### 5.1 Filter Definitions

| Filter | Type | Options | Default |
|--------|------|---------|---------|
| Period | `<Select>` single | Daily · Weekly · Monthly · Custom | Weekly |
| Module | `<Select>` single | All Modules · Ad Hoc Payments · Variable Pay · Pension Analysis · Vehicle Release · Bank Statements | All Modules |

### 5.2 Filter Behaviour Rules

| Rule | Detail |
|------|--------|
| **Scope** | Period affects ALL sections; Module affects Workflow Activity, Approval Delays, Insights only |
| **Persistence** | Store in `localStorage`; restore on return; "Reset filters" button clears to defaults |
| **URL sync** | (Proposed UXB-018) Sync filter state to URL query params for bookmarking |
| **Loading** | Changing filter triggers shimmer/skeleton state per affected section |
| **Empty result** | If no data for selected combination → show empty state per section (not full-page blank) |

---

## 6. Content Priority (Mobile Responsive)

| Breakpoint | Layout | Priority adjustments |
|-----------|--------|---------------------|
| ≥ 1280px | 3-column KPI grid | Full layout as designed |
| 1024–1279px | 2-column KPI grid | Sidebar collapsed; cards wrap to 2-column |
| < 1024px | 1-column stack | Sidebar hidden (hamburger); cards stack single-column; charts reduce height; section sub-nav becomes horizontal scroll |

---

*Document 5 of 11 — FinOps Admin Dashboard UX Package V1.0*
