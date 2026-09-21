# Empathy Maps — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Methodology**: Think & Feel · See · Say & Do · Hear · Pain Points · Gains

---

## Empathy Map — Claire Ndaba (Operations Admin)

| Quadrant | Content |
|----------|---------|
| **Think & Feel** | "Am I missing an overdue approval?" · Anxiety about SLA breaches going unnoticed · Pressure to produce accurate daily/weekly reports · Wants to feel confident everything is under control · Worries that manual compilation introduces errors |
| **See** | Multiple browser tabs for different modules · Spreadsheet exports with stale data · Email chains asking "what's the status?" · Colleagues refreshing pages waiting for data · Bot failure alerts arriving late by email |
| **Say & Do** | Logs into FinOps first thing each morning · Asks colleagues for bot run statuses · Manually tallies approval counts · Escalates overdue items by email · Says "I just need one place to see everything" · Copies numbers from screens into spreadsheets |
| **Hear** | Management asking for weekly KPI reports · Approvers saying "I didn't know it was waiting" · Peers complaining data is scattered · Automation team reporting bot failures after the fact · Senior leaders asking "are we improving?" |
| **Pain Points** | No single consolidated view · SLA breaches discovered too late · Filtering requires page reloads and navigation · No trend data — only snapshots · Manual effort to compile reports · Context-switching between 4+ screens daily |
| **Gains** | One dashboard with all KPIs → saves 30+ min/day · Proactive SLA breach alerts → faster escalation · Trend visualisations → confident management reporting · Filter controls refresh all charts instantly · Export button → no more manual spreadsheet compilation |

### Design implications for Claire
- **Progressive disclosure**: Show summary first, drill-down on demand
- **Status badges**: On Track / At Risk / Breached — visible without interaction
- **Colour + icon + text**: Never rely on colour alone (WCAG 1.4.1)
- **Filter persistence**: Remember last-used period/module across sessions

---

## Empathy Map — James Oyeleke (Finance Team Lead)

| Quadrant | Content |
|----------|---------|
| **Think & Feel** | "Which module is causing the most rejections this month?" · Concern about recurring errors · Wants data to justify process improvements · Feels frustrated when asked questions he can't quickly answer · Pressure to demonstrate operational progress |
| **See** | Escalation emails with little context · Spreadsheets from operations · Meeting slides with outdated KPIs · Rejection statistics arriving late · Colleagues struggling to compile the same data |
| **Say & Do** | Asks operations for data summaries · Tries to cross-reference module performance · Requests custom date-range reports · Says "I need this data before Thursday's meeting" · Prepares management summaries with incomplete information |
| **Hear** | Senior management asking "is it getting better?" · Operations reporting anomalies · Finance peers benchmarking module performance · Stakeholders wanting proof of improvement · Team members saying "we don't have accurate numbers" |
| **Pain Points** | No visual trend comparison · Data arrives manually and late · Cannot drill from summary to detail · Module rejection context is missing · Export format doesn't match meeting needs · Threshold lines absent from charts |
| **Gains** | Trend charts show period-over-period changes → instant answers to leadership · Module-level rejection ranking with drill-down → contextual understanding · Custom date filters → flexible reporting · Export capability → offline analysis for meetings · Dashboard becomes the "single source of truth" |

### Design implications for James
- **Trend line charts**: Multi-module overlay with clear legend
- **Configurable date ranges**: Monthly and custom must be first-class
- **Drill-down from rankings**: Click module → filtered detail view
- **Print-optimised CSS**: Dashboard must render cleanly in PDF export

---

## Empathy Map — Priya Sharma (Automation Engineer)

| Quadrant | Content |
|----------|---------|
| **Think & Feel** | "Did the All Pay bot run successfully overnight?" · Worried about undetected failures · Wants to prove automation ROI through success rates · Feels proud when failure rates decrease · Anxious about timeout spikes during off-hours |
| **See** | Bot execution logs in separate systems · Success/failure percentages scattered across tools · Manual intervention reports from operations · Timestamp logs from multiple sources · Operations team manually processing what bots should handle |
| **Say & Do** | Cross-references bot logs with operational complaints · Tracks failure patterns manually · Reports "last run" timestamps to team · Says "I wish I had a single pane of glass for bot health" · Builds ad-hoc scripts to aggregate log data |
| **Hear** | Operations complaining about manual workarounds · Management asking for automation ROI metrics · Team discussing failure spikes · Requests to reduce manual intervention rates · Schedules being questioned after bot failures |
| **Pain Points** | Logs across multiple systems · No consolidated success vs. failure view · Cannot quickly identify failure type (timeout, format error, duplicate) · Trend data requires manual correlation · No alert when bot hasn't run in expected time window · No deep link to execution logs from dashboard |
| **Gains** | Bot health cards with success/failure donut → instant triage · Drill-down to specific failed files → faster root‐cause analysis · Trend charts showing failure direction → proactive intervention · Last execution timestamp visible → no need to check logs · Failure categorisation in panel → targeted fixes |

### Design implications for Priya
- **Automation cards**: Dedicated section with donut charts per bot module
- **Failure categorisation**: Group by type (Timeout / Format Error / Duplicate / Validation)
- **Stale-run warning**: Flag if last execution > 8 hours ago
- **Deep links**: File IDs in drill-down panel should link to bot execution log

---

*Document 3 of 11 — FinOps Admin Dashboard UX Package V1.0*
