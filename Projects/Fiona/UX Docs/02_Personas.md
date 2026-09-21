# Personas — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Design system**: MET-DS-V2

---

## Persona 1 — Claire Ndaba, Operations Admin

| Attribute | Detail |
|-----------|--------|
| **Name / Role** | Claire Ndaba — Senior Operations Administrator |
| **Age / Experience** | 38 · 6 years at Acme, 3 years using FinOps |
| **Goals** | Quickly identify bottlenecks in approval queues; ensure SLA compliance; report weekly KPIs to management |
| **Frustrations** | Toggling between 4+ screens to compile status reports; delayed awareness of SLA breaches; manually pulling data into spreadsheets for trend analysis |
| **Daily Tasks** | Opens FinOps first thing → checks pending approvals → reviews bot run statuses → compiles activity summary → escalates overdue items to approvers |
| **Motivations** | Operational efficiency; proactive issue resolution; being the "go-to" person for accurate data |
| **Tech Comfort** | Medium–High — comfortable with web dashboards, spreadsheets, and basic data filtering; not a developer |
| **Quotes** | *"I shouldn't have to check five different screens to know if something is stuck."* |

### Claire's key needs from the dashboard
- Single-screen view of all pending approvals with age brackets
- SLA breach alerts that surface without manual checking
- One-click export of KPI data for management reports
- Filter controls that instantly refresh all sections

---

## Persona 2 — James Oyeleke, Finance Team Lead

| Attribute | Detail |
|-----------|--------|
| **Name / Role** | James Oyeleke — Finance Team Lead / Occasional Dashboard Viewer |
| **Age / Experience** | 45 · 10 years at Acme, handles escalations and budget reviews |
| **Goals** | High-level trend overview for finance processes (Ad-hoc Payments, Pension, Variable Pay); spot anomalies |
| **Frustrations** | Receives escalated issues with no context; unclear which module is causing the most rejections; no visual trend data for management discussions |
| **Daily Tasks** | Reviews escalation emails → seeks context in FinOps → runs ad-hoc queries → prepares management summaries |
| **Motivations** | Data-driven decision making; protecting the team from avoidable errors |
| **Tech Comfort** | Medium — uses web tools daily but relies on clear labels and visual cues rather than raw data |
| **Quotes** | *"Show me the trend, not just a number — I need to know if we're getting better or worse."* |

### James's key needs from the dashboard
- Trend line charts showing rejection rates over time
- Module-level ranking by rejection percentage
- Custom date-range filtering for monthly review cycles
- PDF/CSV export for leadership meeting slides

---

## Persona 3 — Priya Sharma, Automation Engineer

| Attribute | Detail |
|-----------|--------|
| **Name / Role** | Priya Sharma — RPA / Automation Engineer monitoring All Pay and KEYIVR bots |
| **Age / Experience** | 29 · 2 years at Acme |
| **Goals** | Monitor bot success/failure rates; quickly triage bot failures; track manual intervention rates |
| **Frustrations** | Bot logs spread across multiple systems; no consolidated view of failure patterns; has to manually correlate timestamps to identify root causes |
| **Daily Tasks** | Checks latest bot execution timestamps → reviews failure counts → investigates specific failed files → reports trends to lead |
| **Motivations** | Continuous improvement of automation; minimising manual work for operations |
| **Tech Comfort** | High — developer-level comfort with data, logs, APIs |
| **Quotes** | *"If the bot failed at 3 AM, I need to know by 9 AM — not when someone calls me."* |

### Priya's key needs from the dashboard
- Bot health cards with success/failure donut charts
- Drill-down to individual failed files with failure reason
- Last execution timestamp with freshness indicator
- Trend data for failure rate direction (improving / worsening)

---

## Persona Comparison Matrix

| Dimension | Claire (Ops Admin) | James (Finance Lead) | Priya (Automation Eng.) |
|-----------|--------------------|---------------------|------------------------|
| **Primary goal** | Monitor & escalate | Analyse trends | Triage bot failures |
| **Frequency** | Daily (multiple) | Weekly / Monthly | Daily |
| **Data depth** | Summary → drill-down | Trends & rankings | Detail / logs |
| **Key section** | Approval Delays | Actionable Insights | Automation cards |
| **Filter use** | Period (daily/weekly) | Period (monthly/custom) | Period (daily) |
| **Export need** | Weekly CSV | Monthly PDF | Rarely |
| **Tech comfort** | Medium–High | Medium | High |

---

*Document 2 of 11 — FinOps Admin Dashboard UX Package V1.0*
