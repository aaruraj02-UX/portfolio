# FinOps Admin Dashboard — Full UX Deliverable Package V1.0

> **Product**: FinOps Admin Dashboard KPI Metrics
> **BRD**: FINOPS_Dashboard+KPI+Metrics_BRD_V1.0
> **Prototype reference**: `UX_Deliverables/prototype/var-pay.html`
> **Date**: 10 April 2026
> **Design system**: MET-DS-V2 (React + MUI v5)

---

# Table of Contents

1. [UX Brief](#1-ux-brief)
2. [Personas](#2-personas)
3. [Empathy Maps](#3-empathy-maps)
4. [Task Analysis](#4-task-analysis)
5. [Information Architecture](#5-information-architecture)
6. [User Journeys](#6-user-journeys)
7. [Wireframe Specifications](#7-wireframe-specifications)
8. [Heuristic & Accessibility Evaluation](#8-heuristic--accessibility-evaluation)
9. [UX Research Plan](#9-ux-research-plan)
10. [UX Backlog](#10-ux-backlog)
11. [UX → Engineering Handoff Package](#11-ux--engineering-handoff-package)

---

# 1. UX Brief

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

**Deliverables**: This UX package (brief → personas → empathy maps → task analysis → IA → journeys → wireframes → heuristic evaluation → research plan → backlog → handoff).

## Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Module APIs unavailable at build time | Missing data → empty states | Design empty/loading states; use stubs |
| Slow aggregation queries (large datasets) | Degraded UX — users perceive lag | Add shimmer loaders, paginate grids, consider pre-aggregated views |
| Admin role not correctly enforced | Unauthorized data exposure | Validate role on every API endpoint; hide route in nav for non-admins |
| KPI definitions misunderstood | Wrong metrics displayed | Include glossary (BRD §10) in tooltip / help hover |

---

# 2. Personas

## Persona 1 — Claire Ndaba, Operations Admin

| Attribute | Detail |
|-----------|--------|
| **Role** | Senior Operations Administrator |
| **Age / Experience** | 38 · 6 years at Acme, 3 years using FinOps |
| **Goals** | Quickly identify bottlenecks in approval queues; ensure SLA compliance; report weekly KPIs to management |
| **Frustrations** | Toggling between 4+ screens to compile status reports; delayed awareness of SLA breaches; manually pulling data into spreadsheets for trend analysis |
| **Daily tasks** | Opens FinOps first thing → checks pending approvals → reviews bot run statuses → compiles activity summary → escalates overdue items to approvers |
| **Motivations** | Operational efficiency; proactive issue resolution; being the "go-to" person for accurate data |
| **Tech comfort** | Medium–High — comfortable with web dashboards, spreadsheets, and basic data filtering; not a developer |
| **Quote** | *"I shouldn't have to check five different screens to know if something is stuck."* |

## Persona 2 — James Oyeleke, Finance Team Lead

| Attribute | Detail |
|-----------|--------|
| **Role** | Finance Team Lead / Occasional Dashboard Viewer |
| **Age / Experience** | 45 · 10 years at Acme, handles escalations and budget reviews |
| **Goals** | High-level trend overview for finance processes (Ad-hoc Payments, Pension, Variable Pay); spot anomalies |
| **Frustrations** | Receives escalated issues with no context; unclear which module is causing the most rejections; no visual trend data for management discussions |
| **Daily tasks** | Reviews escalation emails → seeks context in FinOps → runs ad-hoc queries → prepares management summaries |
| **Motivations** | Data-driven decision making; protecting the team from avoidable errors |
| **Tech comfort** | Medium — uses web tools daily but relies on clear labels and visual cues rather than raw data |
| **Quote** | *"Show me the trend, not just a number — I need to know if we're getting better or worse."* |

## Persona 3 — Priya Sharma, Automation Engineer

| Attribute | Detail |
|-----------|--------|
| **Role** | RPA / Automation Engineer monitoring All Pay and KEYIVR bots |
| **Age / Experience** | 29 · 2 years at Acme |
| **Goals** | Monitor bot success/failure rates; quickly triage bot failures; track manual intervention rates |
| **Frustrations** | Bot logs spread across multiple systems; no consolidated view of failure patterns; has to manually correlate timestamps to identify root causes |
| **Daily tasks** | Checks latest bot execution timestamps → reviews failure counts → investigates specific failed files → reports trends to lead |
| **Motivations** | Continuous improvement of automation; minimising manual work for operations |
| **Tech comfort** | High — developer-level comfort with data, logs, APIs |
| **Quote** | *"If the bot failed at 3 AM, I need to know by 9 AM — not when someone calls me."* |

---

# 3. Empathy Maps

## Empathy Map — Claire Ndaba (Operations Admin)

| Quadrant | Content |
|----------|---------|
| **Think & Feel** | "Am I missing an overdue approval?" · Anxiety about SLA breaches going unnoticed · Pressure to produce accurate daily/weekly reports · Wants to feel confident everything is under control |
| **See** | Multiple browser tabs for different modules · Spreadsheet exports · Email chains asking "what's the status?" · Colleagues refreshing pages waiting for data |
| **Say & Do** | Logs into FinOps first thing each morning · Asks colleagues for bot run statuses · Manually tallies approval counts · Escalates overdue items by email · Says "I just need one place to see everything" |
| **Hear** | Management asking for weekly KPI reports · Approvers saying "I didn't know it was waiting" · Peers complaining data is scattered · Automation team reporting bot failures after the fact |
| **Pain Points** | No single consolidated view · SLA breaches discovered too late · Filtering requires page reloads and navigation · No trend data — only snapshots · Manual effort to compile reports |
| **Gains** | One dashboard with all KPIs → saves 30+ min/day · Proactive SLA breach alerts → faster escalation · Trend visualisations → confident management reporting · Filter controls refresh all charts instantly |

## Empathy Map — James Oyeleke (Finance Team Lead)

| Quadrant | Content |
|----------|---------|
| **Think & Feel** | "Which module is causing the most rejections this month?" · Concern about recurring errors · Wants data to justify process improvements · Feels frustrated when asked questions he can't quickly answer |
| **See** | Escalation emails with little context · Spreadsheets from operations · Meeting slides with outdated KPIs · Rejection statistics arriving late |
| **Say & Do** | Asks operations for data summaries · Tries to cross-reference module performance · Requests custom date-range reports · Says "I need this data before Thursday's meeting" |
| **Hear** | Senior management asking "is it getting better?" · Operations reporting anomalies · Finance peers benchmarking module performance · Stakeholders wanting proof of improvement |
| **Pain Points** | No visual trend comparison · Data arrives manually and late · Cannot drill from summary to detail · Module rejection context is missing |
| **Gains** | Trend charts show period-over-period changes → instant answers · Module-level rejection ranking with drill-down → contextual understanding · Custom date filters → flexible reporting · Export capability → offline analysis for meetings |

## Empathy Map — Priya Sharma (Automation Engineer)

| Quadrant | Content |
|----------|---------|
| **Think & Feel** | "Did the All Pay bot run successfully overnight?" · Worried about undetected failures · Wants to prove automation ROI through success rates · Feels proud when failure rates decrease |
| **See** | Bot execution logs in separate systems · Success/failure percentages scattered across tools · Manual intervention reports from operations · Timestamp logs |
| **Say & Do** | Cross-references bot logs with operational complaints · Tracks failure patterns manually · Reports "last run" timestamps to team · Says "I wish I had a single pane of glass for bot health" |
| **Hear** | Operations complaining about manual workarounds · Management asking for automation ROI metrics · Team discussing failure spikes · Requests to reduce manual intervention rates |
| **Pain Points** | Logs across multiple systems · No consolidated success vs. failure view · Cannot quickly identify failure type (timeout, format error, duplicate) · Trend data requires manual correlation |
| **Gains** | Bot health cards with success/failure donut → instant triage · Drill-down to specific failed files → faster root‐cause analysis · Trend charts showing failure direction → proactive intervention · Last execution timestamp visible → no need to check logs |

---

# 4. Task Analysis

## Task 1 — Monitor System Health (Claire)

| Step | Action | Input | Output | Failure point | Opportunity |
|------|--------|-------|--------|--------------|-------------|
| 1 | Log into FinOps | Credentials | Authenticated session | Login failure / MFA delay | SSO integration |
| 2 | Navigate to Admin Dashboard | Sidebar click | Dashboard loads | Route not available for role | Role check + redirect |
| 3 | Review System Overview KPIs | — | Active users, highest-activity module, peak usage | Slow query → stale data | Shimmer loading + cached aggregation |
| 4 | Scan Workflow Activity | — | Requests raised / approved / rejected counts | Numbers without context | Status badges (On Track / At Risk / Breached) |
| 5 | Check Approval Delays | — | Donut chart with age brackets | Cannot tell which approvals are SLA breached | Colour-coded brackets + side panel drill-down |
| 6 | Drill into > 5 Days bracket | Click legend item | Side panel with detailed request list | Panel slow to render | Pre-fetch data on hover; virtualise table rows |
| 7 | Escalate overdue items | View request → contact approver | Email / message sent | No in-app action available | "Nudge" button triggering notification to approver |
| 8 | Apply filters (period / module) | Select dropdown | All charts refresh | Page reload needed | Client-side filtering with instant chart update |
| 9 | Export report | Export button | CSV / PDF generated | Export fails silently | Progress indicator + success/error toast |

## Task 2 — Review Bot Health (Priya)

| Step | Action | Input | Output | Failure point | Opportunity |
|------|--------|-------|--------|--------------|-------------|
| 1 | Navigate to Dashboard | Sidebar click | Dashboard loads | — | — |
| 2 | Scroll to Automation sections | — | All Pay / KEYIVR / Bank Statement cards | Section not visible without scrolling | Sticky section nav or quick-jump links |
| 3 | Review All Pay metrics | — | Avg completion, files received, success/failure donut | Failure rate not immediately obvious | Status badge + threshold alerts |
| 4 | Drill into failed files | Click "Failure" legend | Side panel with failed file list | Missing failure reason | Show failure type: Timeout / Format Error / Duplicate / Validation |
| 5 | Review KEYIVR metrics | — | Success/failure/manual rates | Manual resolution rate unclear | Separate "Manual Resolved" metric |
| 6 | Review Bank Statement metrics | — | Files uploaded, processing rate, error rate | Error rate breached but no alert | Red pulse indicator + Breached badge |
| 7 | Check last bot execution time | — | Timestamp | Stale timestamp not flagged | Warning if > X hours since last run |

## Task 3 — Identify Rejection Trends (James)

| Step | Action | Input | Output | Failure point | Opportunity |
|------|--------|-------|--------|--------------|-------------|
| 1 | Open Dashboard | — | Dashboard loads | — | — |
| 2 | Set period filter to "Monthly" | Dropdown | Charts refresh | Filter does not persist across sessions | LocalStorage or URL param persistence |
| 3 | Scroll to Actionable Insights | — | Rejection rate table + trend chart | Insights below fold | Anchor link or separate Insights tab |
| 4 | Identify highest-rejection module | — | Ranked table (Vehicle Release 18.2%, Ad-hoc 12.4%, etc.) | Cannot drill into reasons | Click module name → filtered rejection details |
| 5 | Analyse trend direction | — | Line chart showing weekly trajectory | Trend unclear if scale is wrong | Auto-scale Y axis, annotate threshold line |
| 6 | Export for meeting | Export button | CSV / screenshot | — | One-click export as formatted PDF |

---

# 5. Information Architecture

## Sitemap (Web)

```
FinOps Admin Dashboard (Web)
├── Top Navigation
│   ├── FinOps logo / tagline
│   ├── Notifications (bell icon + badge)
│   └── User Profile (avatar dropdown)
│
├── Left Sidebar (icon rail — expands on hover)
│   ├── Dashboard ← active (Admin Dashboard KPI)
│   ├── Treasury
│   │   ├── Ad-hoc Payments
│   │   ├── Bank Statement
│   │   └── Vehicle Release
│   ├── Client Funds
│   │   ├── All Pay
│   │   └── KEYIVR Payments
│   ├── Payroll
│   │   ├── Variable Pay
│   │   └── Pension Analysis
│   └── Settings
│       ├── Users
│       └── Configuration
│
└── Dashboard Content Area
    ├── Header Row
    │   ├── Greeting (Welcome message + date)
    │   └── Filters (Period selector · Module selector)
    │
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

## Navigation Model

| Pattern | Implementation |
|---------|---------------|
| **Primary nav** | Left sidebar (icon rail, width: 56px collapsed → 260px on hover) |
| **Section grouping** | Treasury · Client Funds · Payroll · Settings — with heading labels |
| **Active indicator** | `background: var(--color-primary-50); color: var(--color-primary);` |
| **Top nav** | Brand logo left, notifications + profile right |
| **Drill-down** | Right slide-in panel (800px, overlay) triggered by interactive chart legends |
| **Filters** | Persistent header-level dropdowns — Period (Daily/Weekly/Monthly/Custom) + Module (All/individual) |
| **Keyboard** | Tab through sidebar links → to filter dropdowns → to KPI cards → to chart legends → side panel |

## Role-Based Access Matrix

| Feature | Admin User | Operations Manager | Developer | Automation Team |
|---------|-----------|-------------------|-----------|----------------|
| View Dashboard | ✅ | ✅ | ✅ (dev env) | ✅ |
| Apply Filters | ✅ | ✅ | ✅ | ✅ |
| Drill-down Panels | ✅ | ✅ | ✅ | ✅ |
| Export Data | ✅ | ✅ | ❌ | ❌ |
| Edit Records | ❌ | ❌ | ❌ | ❌ |
| User Management | ❌ | ❌ | ❌ | ❌ |
| Configuration | ❌ | ❌ | ✅ | ❌ |

---

# 6. User Journeys

## Journey 1 — Claire: Morning Dashboard Review

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **Arrival** | Opens FinOps, navigates to Dashboard; sidebar collapses to icon rail | "Let me see what happened overnight" | Focused, slightly anxious | Must remember to navigate to correct page | Default landing page for admin role |
| **Orientation** | Scans System Overview row — active users count, highest-activity module, peak usage time | "Are usage numbers normal?" | Gaining confidence | Numbers without comparative context | Trend arrows + period-over-period % change |
| **Workflow check** | Reviews Workflow Activity — requests raised, approvals, rejections | "Rejection count seems higher — is that a trend?" | Concerned | Snapshot numbers lack trend context | Inline sparklines or stacked bar over time |
| **Delay triage** | Reviews Approval Delays donut — clicks "> 5 Days" legend | "Three requests are SLA breached — I need details" | Alarmed | Must drill to see which requests | Side panel with full request details + "View" links |
| **Escalation** | Notes breached request IDs, contacts approvers by email | "Why hasn't VRP-2026-0847 been processed?" | Frustrated — no in-app action | Email leaves the workflow; no tracking | "Nudge Approver" in-app action button |
| **Automation review** | Scrolls to All Pay / KEYIVR / Bank Statement cards | "All Pay failure rate is 5.8% — below target" | Concerned about trend | Must scroll to find automation section | Quick-jump links or tab navigation |
| **Reporting** | Uses filters to set period → exports data for management | "I need this as a PDF for Thursday's meeting" | Relieved when export works | Export format/layout unknown until downloaded | Preview before export; scheduled email reports |
| **Departure** | Closes dashboard, returns to module-specific work | "At least I know the situation now" | Satisfied, but tired of the effort | Process repeats daily | Configurable dashboard summary email at 08:00 |

## Journey 2 — Priya: Bot Failure Investigation

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **Trigger** | Receives morning alert (email/Slack) about All Pay bot failure spike | "How many failed? What type?" | Alert, focused | Alert has no detail — must go to dashboard | Rich alert with top failure reasons + direct link |
| **Dashboard access** | Navigates to Dashboard, scrolls to Automation — All Pay | "5.8% failure rate… that's 49 files" | Concerned | Scrolling required past irrelevant sections | Bookmark direct anchor `#automation-allpay` |
| **Drill-down** | Clicks "Failure" legend → side panel shows 49 failed files | "Timeout and Format Error — two different root causes" | Analytical | Limited failure detail in panel | Category grouping in panel (Timeout: 20, Format: 15, etc.) |
| **Investigation** | Clicks individual file ID to view details | "AP-F-2026-0839 timed out — need to check log" | Patient | No log link from dashboard | Deep link to bot execution log |
| **Resolution** | Identifies pattern (timeout spikes at 03:00), adjusts bot schedule | "Need to shift the run window" | Confident | Fix is outside dashboard scope | Note/annotation feature on dashboard for tracking actions |
| **Verification** | Returns next day, checks updated failure rate | "Dropped to 3.2% — fix worked" | Satisfied | No historical comparison view | "Compare with previous period" toggle on cards |

## Journey 3 — James: Monthly Trend Review

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **Preparation** | Receives calendar reminder for monthly review; opens Dashboard | "Need data for tomorrow's leadership meeting" | Purposeful | Dashboard defaults to weekly — must change | Remember last-used filter |
| **Filter setup** | Sets Period to "Monthly" and Module to "All" | "Good — now I see the full picture" | Relieved | Filter change requires two interactions | Combined "Monthly — All Modules" preset |
| **Trend analysis** | Scrolls to Actionable Insights → Rejection Rate table + trend chart | "Vehicle Release rejection is climbing — 18.2% this month" | Alarmed | Chart doesn't show threshold line | Configurable target threshold annotation |
| **Drill-down** | Clicks Vehicle Release row (desired, but not yet available in prototype) | "I need to see why — are the same reasons recurring?" | Frustrated | No drill-down from rejection table | Click module name → filtered rejection detail view |
| **Export** | Exports full dashboard as PDF | "This will work for the meeting slides" | Satisfied | PDF layout may not match screen layout | Print-optimised CSS + formatted PDF template |
| **Action** | Emails team with findings and follow-up items | "We need to investigate Vehicle Release rejections" | Decisive | No in-app annotation or sharing | "Share Dashboard View" link with applied filters |

---

# 7. Wireframe Specifications

## Screen: Admin Dashboard (Main View)

The existing prototype ([var-pay.html](UX_Deliverables/prototype/var-pay.html)) serves as the reference wireframe. Below documents the per-section specification, content priority, and interaction states aligned with MET-DS-V2.

### 7.1 Layout Structure

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

### 7.2 Component Specifications

#### Top Navigation Bar

| Element | Token / Style | Notes |
|---------|--------------|-------|
| Container | `background: var(--color-card); border-bottom: 1px solid var(--divider-color)` | Height auto, padding `8px 16px` |
| Logo | `height: 28px` | SVG, `alt="FinOps — Enterprise Finance Automation Platform"` |
| Tagline | `font-size: var(--font-size-caption); color: var(--text-secondary)` | Hidden at ≤ 1279px |
| Notification bell | `40×40px` icon button, relative positioning for badge | `aria-label="Notifications — N unread"` |
| Badge | `background: var(--color-warning); color: #FFFFFF; border-radius: 100px` | Min-width 20px |
| Avatar | `32×32px; border-radius: 100px` | `aria-label="User profile menu"` |

#### Left Sidebar (Icon Rail)

| Element | Token / Style | Notes |
|---------|--------------|-------|
| Collapsed width | `56px` | Expands to `260px` on hover/focus |
| Active link | `background: var(--color-primary-50); color: var(--color-primary)` | `aria-current="page"` |
| Hover link | `background: var(--color-primary-25); color: var(--color-primary)` | |
| Section heading | `font-size: 11px; text-transform: uppercase; color: var(--text-secondary)` | Opacity 0 when collapsed, 1 when expanded |
| Icons | Material Symbols Outlined, 22px | `aria-hidden="true"` |
| Focus | `outline: 2px solid var(--color-primary); outline-offset: -2px` | WCAG 2.4.11 |

#### KPI Overview Cards (Row 1)

| Card | Metrics | Chart | Status logic |
|------|---------|-------|-------------|
| **System Overview** | Total Active Users (342, +12%, target 400) · Highest Activity (Ad-hoc Pay) · Peak Usage (09–11:00) | Horizontal bar — users by module | At Risk if < 85% of target |
| **Workflow Activity** | Requests Raised (1,463, +12%) · Approvals (1,244, +8%) · Rejected (167, +5%) | Stacked bar — 7-day Approved/Rejected/Pending | Warning if rejection rate > 10% |
| **Approval Delays** | Donut: <1d (23), 1–3d (12), 3–5d (5), >5d (3) | Donut with interactive legends | Breached if >5d has any count |

#### Automation Cards (Row 2)

| Card | Metrics | Visual | Status logic |
|------|---------|--------|-------------|
| **All Pay** | Avg Bot Completion (2.4 min, −15%) · Files Received (847, +15%) · Last Bot Run (07 Apr, 08:32) | Donut: Success 798 / Failure 49 | At Risk if success < 95% |
| **KEYIVR** | Avg Bot Completion (3.1 min, −10%) · Files Received (623, +10%) · Last Bot Run (07 Apr, 07:45) | Donut: Success 97.5% / Failure 0.7% / Manual 1.8% | On Track if success ≥ 95% |
| **Bank Statement** | Files Uploaded (156, +8%) · Processing Rate (91.7%, +3%) · Error Rate (8.3%, −2%) | Donut: Processed 91.7% / Error 8.3% | Breached if error rate > 5% |

#### Actionable Insights (Row 3)

| Element | Content | Interaction |
|---------|---------|-------------|
| Rejection Rate Table | Module ranked by rejection % | Future: click module → drill-down |
| Trend Line Chart | Multi-module rejection trend over selected period | Tooltip on hover with exact values |
| Legend | Colour-coded module labels below chart | |

### 7.3 Interaction States

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

### 7.4 Figma / MUI Annotation Notes

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

---

# 8. Heuristic & Accessibility Evaluation

## 8.1 Nielsen's 10 Heuristics Evaluation

| # | Heuristic | Issue found (prototype reference) | Severity (0–4) | Recommendation |
|---|-----------|-----------------------------------|----------------|----------------|
| H1 | Visibility of system status | No loading indicator when filters change — user unsure if action registered | 3 | Add shimmer loaders per card during data refresh; brief "Updating…" toast |
| H1 | Visibility of system status | Last Bot Execution timestamp has no freshness indicator | 2 | Add "X hours ago" relative time + warning icon if stale (> 8 hours) |
| H2 | Match between system and real world | "At Risk" badge lacks definition — users may not know threshold | 2 | Add tooltip: "At Risk = below 95% target" on hover/focus |
| H3 | User control & freedom | Side panel cannot be closed by swiping on mobile | 1 | Add swipe-to-dismiss gesture on touch devices |
| H3 | User control & freedom | Filter selections do not persist across sessions | 2 | Store last-used filters in localStorage; expose "Reset filters" button |
| H4 | Consistency & standards | Some donut centres show percentage (97.5%), others show count (847) — inconsistent | 2 | Standardise: show primary metric value in centre + label; show complementary value in legend |
| H5 | Error prevention | No confirmation before export action | 1 | Low risk — acceptable for export; add progress indicator |
| H6 | Recognition over recall | Automation section requires scrolling to find; no quick jump | 2 | Add anchored section tabs or sticky sub-navigation within dashboard |
| H7 | Flexibility & efficiency | No keyboard shortcut to open/close side panel | 1 | Bind `Escape` to close (✅ done), consider `Ctrl+K` for command palette |
| H8 | Aesthetic & minimalist design | All Pay card has verbose status badge + donut + legend + 3 metrics — dense | 2 | Consider collapsible detail area; show donut on expand or tab |
| H9 | Help users recognise & recover from errors | Empty state for "no data in period" not implemented | 3 | Design empty state with illustration + actionable guidance ("Try a different date range") |
| H10 | Help & documentation | No glossary or KPI definitions accessible from dashboard | 2 | Add `(i)` info icon per KPI label with tooltip from BRD glossary |

## 8.2 WCAG 2.2 AA Accessibility Audit

| SC | Criterion | Status | Finding | Remediation |
|----|-----------|--------|---------|-------------|
| 1.1.1 | Text alternatives | ✅ Pass | Images have `alt` text; icon buttons have `aria-label` | — |
| 1.3.1 | Info & relationships | ⚠️ Partial | Tables in side panel use `<th scope="col">` ✅; chart data lacks text alternative | Add `aria-label` or hidden `<table>` summary for each chart |
| 1.3.2 | Meaningful sequence | ✅ Pass | DOM order matches visual order | — |
| 1.4.1 | Use of colour | ⚠️ Partial | Status badges use colour + icon ✅; trend indicators (green ↑, red ↑) rely on colour + direction | Ensure colour-blind-safe palette; add text label ("Up 12%") ✅ already present |
| 1.4.3 | Contrast (minimum) | ✅ Pass | Primary #3276CF on #FFFFFF = 4.56:1; Body #212121 on #FFFFFF = 16.1:1; Caption #757575 on #FFFFFF = 4.48:1 | — |
| 1.4.11 | Non-text contrast | ⚠️ Check | Donut segments adjacent to white bg — verify 3:1 for each colour | Green #43A047 on #FFF = 3.5:1 ✅; Orange #EF6C00 on #FFF = 3.4:1 ✅; Red #E53935 on #FFF = 4.0:1 ✅ |
| 2.1.1 | Keyboard accessible | ⚠️ Partial | Sidebar links + filter dropdowns keyboard accessible ✅; donut chart legends have `tabindex="0"` + keydown ✅; chart.js canvases not keyboard navigable | Provide text-based alternative for chart data (screen-reader table) |
| 2.4.1 | Skip to content | ❌ Missing | No skip-to-main link | Add `<a href="#main-content" class="skip-link">Skip to dashboard content</a>` as first focusable element |
| 2.4.3 | Focus order | ✅ Pass | Tab order follows visual layout: sidebar → filters → cards → legends → side panel | — |
| 2.4.7 | Focus visible | ✅ Pass | `:focus-visible` styled with `outline: 2px solid var(--color-primary)` | — |
| 2.4.11 | Focus appearance [2.2] | ✅ Pass | Focus ring area ≥ perimeter × 2px; colour contrast ≥ 3:1 | — |
| 2.5.7 | Dragging movements [2.2] | ✅ N/A | No drag interactions in prototype | — |
| 2.5.8 | Target size [2.2] | ⚠️ Partial | Icon buttons 40×40px ✅; legend items have sufficient padding ✅; filter select min-height 40px ✅; some links < 24px | Ensure all clickable elements ≥ 24×24px |
| 3.1.1 | Language of page | ✅ Pass | `<html lang="en">` present | — |
| 3.2.6 | Consistent help [2.2] | ❌ Missing | No help mechanism on dashboard | Add help icon in top nav linking to /help or contextual tooltips |
| 3.3.1 | Error identification | ⚠️ Partial | Error state for data load not yet designed | Design inline error block: icon + message + retry button |
| 3.3.7 | Redundant entry [2.2] | ✅ N/A | No form input requiring re-entry | — |
| 3.3.8 | Accessible auth [2.2] | ✅ N/A | Dashboard is post-auth; login handled separately | Verify login supports paste + password managers |
| 4.1.2 | Name, Role, Value | ⚠️ Partial | Side panel has `role="dialog"` + `aria-modal="true"` ✅; chart canvases lack structured ARIA | Add `role="img"` + `aria-label="[chart description]"` to each `<canvas>` |

## 8.3 Remediation Priority

| Priority | Item | Effort |
|----------|------|--------|
| 🔴 P1 | Add skip-to-main link | Small |
| 🔴 P1 | Add shimmer loading states for filter changes | Medium |
| 🔴 P1 | Design empty/error states for all data sections | Medium |
| 🟡 P2 | Add `role="img"` + `aria-label` to chart canvases | Small |
| 🟡 P2 | Add KPI definition tooltips (info icon per metric) | Medium |
| 🟡 P2 | Add help mechanism (top nav) for consistent help SC 3.2.6 | Small |
| 🟡 P2 | Store filter selections in localStorage | Small |
| 🟢 P3 | Add anchored section tabs for quick-jump navigation | Medium |
| 🟢 P3 | Standardise donut centre display (count vs percentage) | Small |
| 🟢 P3 | Add stale-timestamp warning on Last Bot Execution | Small |

---

# 9. UX Research Plan

## 9.1 Research Goals

1. Validate that the dashboard information hierarchy matches admin mental models
2. Evaluate whether users can identify SLA-breached approvals within 10 seconds
3. Test drill-down discoverability (legend click → side panel)
4. Assess filter usability and chart comprehension
5. Identify unmet monitoring needs not covered by current KPIs

## 9.2 Research Questions

| # | Question | Method |
|---|----------|--------|
| RQ1 | Can admins find the most critical operational issues within 30 seconds? | Task-based usability test |
| RQ2 | Do users understand the status badge system (On Track / At Risk / Breached)? | Think-aloud + comprehension check |
| RQ3 | Is the side panel drill-down discoverable without prompting? | First-click test |
| RQ4 | Do filters feel responsive and intuitive? | Usability test + SUS score |
| RQ5 | What additional KPIs or views do users need? | Semi-structured interview |
| RQ6 | Are chart types (donut, bar, line) correctly interpreted? | Comprehension quiz |

## 9.3 Methods

| Method | Description | When |
|--------|-------------|------|
| **Moderated usability testing** | 5–7 participants complete 4 tasks on prototype; think-aloud | Week 1–2 |
| **First-click testing** | Unmoderated; 10+ participants click where they'd go to find SLA-breached items | Week 1 |
| **Semi-structured interviews** | 30 min per participant; explore unmet needs, current workarounds | Week 2 |
| **System Usability Scale (SUS)** | Post-test questionnaire after usability sessions | Week 2 |
| **A/B test** (future) | Compare 2-column vs 3-column layout for KPI density | Post-launch |

## 9.4 Participants

| Persona | Count | Recruitment |
|---------|-------|-------------|
| Operations Admin (Claire archetype) | 3 | Internal — current FinOps admin users |
| Finance Team Lead (James archetype) | 2 | Internal — finance managers who review KPIs |
| Automation Engineer (Priya archetype) | 2 | Internal — RPA team members |

**Total**: 7 participants (minimum 5 for qualitative usability testing per Nielsen Norman Group guidance).

## 9.5 Test Tasks

| Task # | Scenario | Success criteria |
|--------|----------|-----------------|
| T1 | "You've just logged in. Identify how many approvals are SLA breached (> 5 days)." | User finds the answer (3) within 15 seconds |
| T2 | "Find out which module has the highest rejection rate this period." | User locates Vehicle Release (18.2%) in Insights section |
| T3 | "Check if the All Pay bot ran successfully today. What's the failure rate?" | User finds card + reports 5.8% failure rate |
| T4 | "Change the period to Monthly and filter to Variable Pay module only." | User completes both filter changes without error |
| T5 | "View the details of the SLA-breached pending approvals." | User clicks >5 Days legend → side panel opens |

## 9.6 Timeline

| Week | Activity | Deliverable |
|------|---------|-------------|
| Week 1 | Recruit participants; set up prototype; run first-click tests | First-click heatmap |
| Week 2 | Conduct moderated usability sessions (5–7) + interviews | Session recordings + notes |
| Week 3 | Analyse findings; compile report; score SUS | Research report + recommendations |
| Week 4 | Present findings; update backlog with research-driven items | Updated UX backlog |

## 9.7 Deliverables

- Usability test report with task success rates, time-on-task, and error rates
- First-click heatmap analysis
- SUS score with benchmark comparison
- Interview synthesis with affinity diagram
- Prioritised recommendations integrated into UX Backlog

## 9.8 Risks

| Risk | Mitigation |
|------|-----------|
| Low participant availability | Schedule sessions 2 weeks in advance; offer flexible time slots |
| Prototype fidelity too low | Use var-pay.html prototype with sample data already populated |
| Participants unfamiliar with dashboard concept | Brief them with 2-min context before tasks |
| Observer bias | Use standardised task scripts; two observers per session |

---

# 10. UX Backlog

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

# 11. UX → Engineering Handoff Package

## 11.1 Links & Artefacts

| Artefact | Location |
|----------|----------|
| HTML Prototype | `UX_Deliverables/prototype/var-pay.html` |
| BRD | `business/FINOPS_Dashboard+KPI+Metrics_BRD_V1.0.doc` |
| Design System Tokens | `skills/uiux/design-system-tokens.instructions.md` |
| MUI Implementation Guide | `skills/uiux/design-system-mui.instructions.md` |
| Component Patterns | `skills/uiux/design-system-components.instructions.md` |
| This UX Package | `UX_Deliverables/FinOps_Admin_Dashboard_UX_Package_V1.md` |

## 11.2 Component Map

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

## 11.3 MET-DS-V2 Token Mapping

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

**Deviation flags**:
- Prototype uses `--radius-card: 16px` which differs from MET-DS-V2 governance default of `8px`. Confirm with design lead. Current implementation uses `border-radius: var(--radius-card)` = 16px.
- Prototype `--color-warning` uses `#EF6C00` in some inline styles (Orange/800) while token block defines `#FF9800` (Orange/500). Standardise to token value.

## 11.4 Acceptance Criteria

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

## 11.5 States Matrix

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

## 11.6 Data Contracts & API Assumptions

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

## 11.7 i18n & A11y Notes

- **Language**: English (en-GB) for all labels; `<html lang="en">`
- **Date format**: DD MMM YYYY (e.g., "09 Apr 2026") — use `Intl.DateTimeFormat('en-GB', ...)`
- **Number format**: Comma separator for thousands (1,463) — use `Intl.NumberFormat('en-GB')`
- **Screen reader**: Chart data must be available as hidden tables or `aria-label` summaries
- **Reduced motion**: Wrap all Chart.js animations + CSS transitions in `@media (prefers-reduced-motion: reduce)`
- **Colour-blind safety**: All status indicators use colour + icon + text — never colour alone
- **Touch targets**: Minimum 24×24px for all interactive elements; recommended 44×44px for primary actions

## 11.8 Analytics Events

| Event name | Trigger | Properties |
|-----------|---------|-----------|
| `dashboard_viewed` | Dashboard page load | `userId`, `role`, `timestamp` |
| `filter_changed` | Period or Module dropdown changed | `filterType`, `filterValue`, `previousValue` |
| `drill_down_opened` | Side panel opens | `panelType` (approval-delay / allpay-files), `category` (e.g., "gt5") |
| `drill_down_closed` | Side panel closes | `panelType`, `closeMethod` (escape / overlay / button) |
| `export_initiated` | Export button clicked | `format` (CSV/PDF), `period`, `module` |
| `kpi_tooltip_viewed` | Info tooltip displayed on hover for ≥ 1s | `kpiName` |
| `chart_interaction` | Chart tooltip or legend clicked | `chartId`, `interactionType` |

## 11.9 QA Test Cases

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

*End of FinOps Admin Dashboard UX Package V1.0*
