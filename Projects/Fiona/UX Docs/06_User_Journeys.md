# User Journeys — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Methodology**: Stages → Actions → Thoughts → Feelings → Pain points → Opportunities

---

## Journey 1 — Claire: Morning SLA Breach Escalation

**Scenario**: Claire logs in at 08:30 and needs to check if any approvals have breached the 5-day SLA and escalate them before the 09:00 stand-up.

| Stage | Actions | Thoughts | Feelings | Pain points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Arrive** | Opens FinOps → navigates to Admin Dashboard | "Let me quickly check if anything is stuck" | Neutral, habitual | Need to remember URL / location | Browser bookmark + prominent nav icon |
| **2. Scan Overview** | Reads System Overview cards — Active Users, Peak Usage | "System seems active — good" | Calm, informed | Cards load sequentially, not simultaneously | Skeleton loaders → perceived faster load |
| **3. Check Delays** | Scrolls to Approval Delays donut | "Three items over 5 days — that's a breach" | Concerned, alert | Count alone insufficient — need details | Badge with `--color-error` on > 5 Days |
| **4. Drill Down** | Clicks > 5 Days legend → side panel opens | "Who is the approver? How long has it been?" | Focused, in investigation mode | Panel may not be discoverable | Hover tooltip "Click to view details" + cursor pointer |
| **5. Review Details** | Reads table: Request ID, Module, Created On, Duration, Approver | "Variable Pay request #VP-1042 has been waiting 8 days" | Frustrated at approver delay | No in-app escalation mechanism | Add "Nudge" button (proposed UXB-013) |
| **6. Escalate** | Copies details → switches to email → sends escalation | "Wish I could do this from the dashboard" | Mild annoyance at context-switch | Manual email workflow breaks flow | Future: in-app notification / nudge |
| **7. Close** | Closes side panel → resumes overview scan | "I've handled the urgent ones — what else?" | Relief, back in control | Panel close animation too slow | Snappy 200ms transition |

### Journey summary
- **Total steps**: 7
- **Total clicks**: 3 (nav → scroll → legend click)
- **Emotional arc**: Neutral → Concerned → Focused → Frustrated → Relief
- **Key opportunity**: In-app escalation would eliminate steps 6–7 and reduce context-switching

---

## Journey 2 — James: Monthly Trend Report Preparation

**Scenario**: James needs to prepare a monthly KPI summary for the Thursday leadership meeting. He wants rejection trends, module comparisons, and exportable data.

| Stage | Actions | Thoughts | Feelings | Pain points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Navigate** | Opens FinOps → Admin → Dashboard | "Need to get this report done before Thursday" | Slightly stressed, time-pressured | Has to remember where dashboard is | Recent pages in nav / favourites |
| **2. Set Filters** | Changes Period to "Monthly" | "Good — data is updating" | Expectant | No loading indicator during filter change | Shimmer loaders per section during refresh |
| **3. Scan Rejections** | Scrolls to Actionable Insights → reads rejection ranking | "Vehicle Release has the highest rejection rate again" | Concerned about recurring pattern | Table only shows rate, not reason | Drill-down to rejection detail |
| **4. Check Trends** | Examines trend line chart | "Rejection rate is climbing — need to flag this" | Worried, motivated to act | Chart legend overlaps on smaller screens | Responsive legend placement |
| **5. Compare Modules** | Cycles Module filter: Variable Pay → Ad Hoc Payments | "How does Variable Pay compare?" | Analytical, curious | Switching module resets scroll position | Preserve scroll position on filter change |
| **6. Export Data** | Clicks Export → selects CSV | "Hope this has the fields I need" | Hopeful, uncertain | Export output unknown until downloaded | Preview modal with format selection (UXB-014) |
| **7. Build Slides** | Opens CSV in Excel → creates charts for presentation | "Would be easier if I could just screenshot the dashboard" | Resigned to manual work | Dashboard charts not print-optimised | PDF export / print stylesheet |

### Journey summary
- **Total steps**: 7
- **Total clicks**: 5+ (nav → filter → scroll → filter cycle × N → export)
- **Emotional arc**: Stressed → Expectant → Concerned → Analytical → Resigned
- **Key opportunity**: Export preview + PDF-optimised output would eliminate step 7

---

## Journey 3 — Priya: Investigating All Pay Bot Failures

**Scenario**: Priya receives a Slack message at 09:15 that All Pay bot had failures overnight. She needs to identify the failure pattern and determine root cause.

| Stage | Actions | Thoughts | Feelings | Pain points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Navigate** | Opens FinOps → Admin → Dashboard | "Let me see what happened with All Pay" | Concerned, curious | Automation section is below the fold | Section sub-nav tab "Automation" (UXB-011) |
| **2. Find Bot Card** | Scrolls to Automation section → locates All Pay card | "There it is — 5.8% failure rate" | Focused | Scrolling past overview sections takes time | Direct anchor link from Slack notification |
| **3. Assess Health** | Reads donut: Success 94.2%, Failure 5.8% · Last run: 03:15 | "Failure rate is higher than usual" | Alert, analytical | No comparison with previous period | Historical comparison toggle (UXB-016) |
| **4. Drill Down** | Clicks "Failure" in donut legend → side panel opens | "What's the pattern in these failures?" | Investigative | Failure reason column may be truncated | Expandable rows / sufficient column width |
| **5. Analyse Failures** | Reads table: File ID, Date, Failure Reason | "All failures are 'Timeout' — the upstream service is slow" | Relieved (pattern identified) | No link to bot execution log for root cause | Deep-link File ID to log viewer (UXB-017) |
| **6. Verify Fix** | Checks upstream service → confirms resolution | "Should be fine for next run" | Confident | Must wait for next run cycle to verify | Real-time status updates or manual re-trigger |
| **7. Monitor** | Returns to dashboard next morning to check new run | "Failure rate dropped to 1.2% — fixed" | Satisfied, accomplished | Ongoing manual checking required | Dashboard summary email (UXB-015) |

### Journey summary
- **Total steps**: 7
- **Total clicks**: 3 (nav → scroll → legend click)
- **Emotional arc**: Concerned → Alert → Investigative → Relieved → Satisfied
- **Key opportunity**: Deep links to bot logs + automated summary emails would streamline triage significantly

---

## Journey Comparison Matrix

| Dimension | Claire (Journey 1) | James (Journey 2) | Priya (Journey 3) |
|-----------|--------------------|--------------------|---------------------|
| **Trigger** | Habitual daily check | Meeting preparation | Incident notification |
| **Primary action** | Monitor + escalate | Analyse + export | Investigate + fix |
| **Key section** | Approval Delays | Actionable Insights | Automation |
| **Clicks to goal** | 3 | 5+ | 3 |
| **Biggest pain** | No in-app escalation | No export preview | No deep link to logs |
| **Emotional peak** | Frustration at manual email | Resignation at manual slides | Relief at pattern identification |
| **Top opportunity** | In-app nudge/notify | PDF export + preview | Deep links + summary alerts |

---

*Document 6 of 11 — FinOps Admin Dashboard UX Package V1.0*
