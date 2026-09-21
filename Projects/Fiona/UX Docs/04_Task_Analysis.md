# Task Analysis — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Methodology**: Hierarchical Task Analysis (HTA) — Goals → Sub-goals → Steps

---

## Task 1 — Daily Operations Health Check (Claire — Ops Admin)

### Goal
Assess overall system health and identify items requiring immediate action within 5 minutes of login.

### HTA Decomposition

```
1.0 Daily Operations Health Check
├── 1.1 Open Dashboard
│   ├── 1.1.1 Navigate to FinOps → Admin → Dashboard
│   └── 1.1.2 Verify default filters (Weekly, All Modules)
├── 1.2 Review System Overview Cards
│   ├── 1.2.1 Check Active Users count + trend indicator
│   ├── 1.2.2 Note Highest Activity Module name
│   ├── 1.2.3 Note Peak Usage Time
│   └── 1.2.4 Glance at Users by Module bar chart
├── 1.3 Review Workflow Activity Cards
│   ├── 1.3.1 Check Requests Raised count + trend
│   ├── 1.3.2 Check Approvals Completed count + trend
│   ├── 1.3.3 Check Rejected count + trend
│   └── 1.3.4 Scan stacked bar chart for anomalies
├── 1.4 Review Approval Delays
│   ├── 1.4.1 Read donut chart brackets (< 1d, 1–3d, 3–5d, > 5d)
│   ├── 1.4.2 Identify if > 5 Days count is non-zero (SLA breach)
│   └── 1.4.3 If breached → click > 5 Days legend → review details panel
│       ├── 1.4.3.1 Scan Request ID, Module, Created On, Duration
│       └── 1.4.3.2 Note approver names for escalation
├── 1.5 Check Automation Section
│   ├── 1.5.1 All Pay — confirm last run time, failure count
│   ├── 1.5.2 KEYIVR — confirm success rate
│   └── 1.5.3 Bank Statement — confirm files uploaded, error rate
├── 1.6 Review Actionable Insights
│   ├── 1.6.1 Scan rejection rate table for highest-rejection module
│   └── 1.6.2 Note any upward trend arrows
└── 1.7 Compile & Act
    ├── 1.7.1 Export dashboard data (if report day)
    └── 1.7.2 Send escalation emails for SLA-breached items
```

### Task metrics

| Metric | Target |
|--------|--------|
| Time to identify SLA breaches | < 15 seconds from dashboard load |
| Steps to reach drill-down | ≤ 2 clicks (dashboard → legend click → panel) |
| Total health check time | < 5 minutes |
| Error paths | Filter reset confusion; empty state if no data; drill-down not discovered |

### Potential failure points & UX mitigations

| Failure | Mitigation |
|---------|-----------|
| User misses > 5 Days count | Highlight > 5 Days bracket with `--color-error` badge |
| Drill-down not discoverable | Cursor pointer + hover underline on legend items; tooltip "Click to view details" |
| Filter resets on refresh | Persist filters in localStorage |
| Bot section below fold | Sticky sub-nav tabs: Overview · Automation · Insights |

---

## Task 2 — Monthly Trend Review (James — Finance Team Lead)

### Goal
Analyse module performance trends over the past month and prepare data for leadership meeting.

### HTA Decomposition

```
2.0 Monthly Trend Review
├── 2.1 Navigate to Dashboard
│   └── 2.1.1 Open FinOps → Admin → Dashboard
├── 2.2 Set Filters for Monthly View
│   ├── 2.2.1 Change Period to "Monthly"
│   └── 2.2.2 Optionally select specific Module (or keep "All Modules")
├── 2.3 Analyse Rejection Trends
│   ├── 2.3.1 Locate Actionable Insights section
│   ├── 2.3.2 Read rejection rate ranking table
│   ├── 2.3.3 Compare trend arrows (↑ worse, ↓ better)
│   └── 2.3.4 Click highest-rejection module for detail
├── 2.4 Review Workflow Volume Trends
│   ├── 2.4.1 Examine Requests Raised trend indicator
│   ├── 2.4.2 Compare with Approvals Completed count → identify backlog
│   └── 2.4.3 Check stacked bar chart for volume spikes
├── 2.5 Cross-compare Modules
│   ├── 2.5.1 Cycle through modules via filter dropdown
│   └── 2.5.2 Note key differences in rejection and delay patterns
├── 2.6 Prepare Export
│   ├── 2.6.1 Click Export button
│   ├── 2.6.2 Select format (CSV for data / PDF for slides)
│   └── 2.6.3 Download file
└── 2.7 Build Meeting Summary
    └── 2.7.1 Reference exported data in presentation
```

### Task metrics

| Metric | Target |
|--------|--------|
| Time to switch to monthly view | < 3 seconds (filter change + refresh) |
| Steps to export | ≤ 3 clicks (Export → format → download) |
| Total review time | < 10 minutes |
| Error paths | Custom date-range not intuitive; export format unclear; trend arrows ambiguous |

### Potential failure points & UX mitigations

| Failure | Mitigation |
|---------|-----------|
| Period dropdown label unclear | Use explicit label "Period" with helper text |
| Trend arrows ambiguous | Pair arrow with percentage change value + colour (green = good, red = bad) |
| Export output unknown | Preview modal before download with format options |
| No data for selected range | Empty state with "No data for selected period" + suggestion |

---

## Task 3 — Bot Failure Triage (Priya — Automation Engineer)

### Goal
Identify and investigate bot failures from the latest execution cycle within 3 minutes.

### HTA Decomposition

```
3.0 Bot Failure Triage
├── 3.1 Navigate to Dashboard
│   └── 3.1.1 Open FinOps → Admin → Dashboard
├── 3.2 Locate Automation Section
│   ├── 3.2.1 Scroll to Automation cards (or click "Automation" tab if sub-nav exists)
│   └── 3.2.2 Identify relevant bot card (All Pay / KEYIVR / Bank Statement)
├── 3.3 Assess Bot Health
│   ├── 3.3.1 Read success vs. failure donut chart
│   ├── 3.3.2 Check failure count and failure percentage
│   ├── 3.3.3 Verify last execution timestamp
│   └── 3.3.4 Note if stale-run warning is displayed (> 8 hours)
├── 3.4 Drill Down into Failures
│   ├── 3.4.1 Click "Failure" legend in donut chart
│   ├── 3.4.2 Side panel opens with failed files table
│   ├── 3.4.3 Scan columns: File ID, Module, Bot, Date, Failure Reason, Status
│   └── 3.4.4 Identify failure pattern (e.g., all "Timeout" or "Format Error")
├── 3.5 Investigate Specific File
│   ├── 3.5.1 Click File ID link → opens bot execution log (if deep link available)
│   └── 3.5.2 Review log details for root cause
└── 3.6 Take Action
    ├── 3.6.1 Fix identified issue (bot config, input data, etc.)
    └── 3.6.2 Monitor next run cycle for resolution
```

### Task metrics

| Metric | Target |
|--------|--------|
| Time to identify failure count | < 10 seconds from reaching Automation section |
| Steps to reach failure details | ≤ 2 clicks (legend click → panel) |
| Total triage time | < 3 minutes for identification; investigation time varies |
| Error paths | Drill-down not discoverable; stale timestamp unnoticed; failure reasons truncated |

### Potential failure points & UX mitigations

| Failure | Mitigation |
|---------|-----------|
| Stale timestamp unnoticed | Relative time label ("8 hrs ago") + amber warning badge if > 8 hours |
| Failure category not visible | Add "Failure Type" column in side panel table |
| No deep link to logs | Add hyperlinks from File ID to bot log viewer |
| Donut legend click not discoverable | Cursor pointer, hover underline, tooltip "Click to view failed files" |
| Panel table truncates reason text | Allow row expansion or text wrapping; set min column width |

---

## Cross-Task Summary

| Task | Persona | Frequency | Max clicks to goal | Target completion |
|------|---------|-----------|--------------------|--------------------|
| Daily Health Check | Claire | Daily (1–3×) | 2 clicks to any drill-down | < 5 min |
| Monthly Trend Review | James | Monthly | 3 clicks to export | < 10 min |
| Bot Failure Triage | Priya | Daily | 2 clicks to failure details | < 3 min |

---

*Document 4 of 11 — FinOps Admin Dashboard UX Package V1.0*
