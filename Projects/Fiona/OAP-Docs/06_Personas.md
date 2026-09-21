# Personas — Office Account Postings (OAP)

| Field | Detail |
|---|---|
| **Module** | Office Account Postings (OAP) |
| **Platform** | FinOps — Web Application |
| **Date** | 28 April 2026 |
| **Version** | 1.0 |

---

## Persona 1: Sarah Chen — Finance Team Member (Transaction Coder)

| Attribute | Detail |
|---|---|
| **Name** | Sarah Chen |
| **Role** | AP (Accounts Payable) Team Lead |
| **Team** | AP — Accounts Payable |
| **Age** | 34 |
| **Experience** | 8 years in finance operations; 3 years at current organisation |
| **Location** | Office-based, UK |
| **Tech Comfort** | Moderate — expert Excel user; comfortable with web apps but not a power user; prefers keyboard shortcuts |
| **Devices** | Desktop workstation (Windows), dual monitors, wired keyboard and mouse |

### Photo Placeholder
> [Professional woman, mid-30s, office setting]

### Bio
Sarah leads the Accounts Payable coding team. She is responsible for reviewing and coding all AP-related bank transactions daily. She has deep knowledge of supplier payment patterns and nominal codes for her team's entries. She values speed and accuracy — her team is typically the first to complete coding each day. She mentors new team members and has built personal reference sheets for common coding patterns.

### Goals

| # | Goal | Priority |
|---|---|---|
| G1 | Complete all AP transaction coding before 14:30 (30 min buffer before 15:00 export) | High |
| G2 | Maintain zero journal rejection rate — every nominal code must be correct | High |
| G3 | Onboard new team members quickly — they should be coding independently within 2 days | Medium |
| G4 | Reduce time spent on routine coding — focus on exceptions and complex entries | Medium |
| G5 | Have confidence that auto-matched transactions are correctly coded | Medium |

### Frustrations

| # | Frustration | Current Impact |
|---|---|---|
| F1 | "I have to filter for my team every single time I open the page. Why can't it remember?" | Wastes 30 seconds per session; minor but daily annoyance |
| F2 | "I know the nominal codes by heart, but new team members don't. There's no autocomplete or suggestion." | New staff take 3+ days to become independent; error rate is higher in first week |
| F3 | "I can't see the full transaction description without clicking into the row. Truncation hides important detail." | Must click into 20–30% of rows to verify identity; adds time |
| F4 | "When I'm not sure about a transaction, I can't flag it for Rachel to review later. I just leave it uncoded." | Uncoded items sit in limbo; blocks export; creates chase conversations |
| F5 | "I used to Tab between cells in Excel. Here I have to click Edit, type, Save, click next Edit…" | Slower than Excel for sequential coding; breaks flow |
| F6 | "If 10 transactions are the same supplier with the same coding, I have to edit them one by one." | Repetitive; error-prone; frustrating for batch patterns |

### Daily Tasks

| Time | Task | Duration |
|---|---|---|
| 09:00 | Log into FinOps → Open OAP → Current Open Transactions | 1 min |
| 09:01 | Filter for AP team → check status summary cards | 1 min |
| 09:02 | Sort by Debit amount descending (largest first) | 30 sec |
| 09:03–10:30 | Code uncoded transactions: Edit → enter Nominal Code, Cost Centre, Journal Description → Save | 60–90 min |
| 10:30 | Check summary — verify all AP entries coded | 2 min |
| 10:35 | Handle exceptions — research unknown transactions, consult with Rachel | 15–30 min |
| 14:00 | Final check before 15:00 export deadline | 5 min |
| 14:30 | Confirm all AP coding complete; notify David if ready | 2 min |

### Motivations

- **Accuracy** — takes pride in zero-rejection record; wants to maintain it
- **Efficiency** — values speed; looks for shortcuts and patterns to reduce repetitive work
- **Team success** — wants her team to be the first to finish coding each day
- **Mentoring** — enjoys helping new team members learn the process

### Quotes

> "The best system is one where I barely have to think about the routine stuff — it just handles it. I want to focus on the tricky entries."

> "My team finishes first every day. The new system should make us even faster, not slow us down."

> "If I code something wrong, D365 rejects the entire journal. That's why I triple-check the big entries."

### Scenario: Typical Day

Sarah arrives at 09:00 and opens FinOps. She navigates to OAP Current Open Transactions. The summary cards show 85 total transactions: 60 auto-coded, 25 uncoded. She filters for AP — 22 of those are hers. She sorts by debit amount (highest first) to tackle the biggest entries. She recognises most suppliers: EDF Energy (4200), SECURITY PLUS (5100), MAN TRUCKS (5200). She codes 18 in about 40 minutes. The remaining 4 are unfamiliar — she flags two for Rachel's review and researches the other two using the archived transactions for reference. By 10:30, all 22 AP transactions are coded. She checks the summary: "AP complete." She moves on to other work and does a final check at 14:00.

### Accessibility Needs

- **Keyboard navigation** — prefers keyboard over mouse for sequential data entry
- **Clear focus indicators** — needs to see which field is active when tabbing through the edit panel
- **Readable text** — full descriptions visible without hover/click interaction
- **Colour + text status** — colour-blind team member on her team needs text labels alongside status badges

---

## Persona 2: David Morris — Treasury Analyst (Journal Exporter)

| Attribute | Detail |
|---|---|
| **Name** | David Morris |
| **Role** | Treasury Analyst |
| **Team** | Treasury |
| **Age** | 42 |
| **Experience** | 15 years in treasury and cash management; 6 years at current organisation |
| **Location** | Office-based, UK |
| **Tech Comfort** | Moderate — comfortable with ERP systems (D365, SAP); prefers clear, no-nonsense interfaces |
| **Devices** | Desktop workstation (Windows), single monitor, standard peripherals |

### Photo Placeholder
> [Professional man, early 40s, office setting with financial screens]

### Bio
David is the sole Treasury Analyst responsible for generating daily journal exports from the OAP module. He runs the export at 15:00 each day — sometimes earlier if all teams finish coding ahead of schedule. During month-end, he may run 3–4 exports in a single day and handles manual file imports. He is meticulous about accuracy because a rejected D365 journal means a full day's delay. He has been doing this role for 6 years using the Excel workbook and is cautiously optimistic about the new system.

### Goals

| # | Goal | Priority |
|---|---|---|
| G1 | Generate journal exports on time at 15:00 with zero errors | High |
| G2 | Know at a glance which teams have finished coding and which haven't | High |
| G3 | Handle month-end manual imports without creating duplicates | High |
| G4 | Minimise the number of export passes needed per day | Medium |
| G5 | Eliminate the manual email-forwarding step for D365 journal distribution | Medium |

### Frustrations

| # | Frustration | Current Impact |
|---|---|---|
| F1 | "I can't see which teams are done and which are still coding. I have to count rows manually or ask." | Wastes 10–15 min daily chasing teams; creates friction |
| F2 | "There's no automated reminder. I end up sending Slack messages at 14:30 every day." | Manual coordination overhead; feels like babysitting |
| F3 | "I have to forward the journal email to the D365 import queue manually. It's a pointless step." | 5 min per export; risk of forgetting or mis-routing |
| F4 | "At month-end, I import files manually. If there's a duplicate, I won't know until D365 rejects it." | High-risk manual step; no validation; causes reconciliation headaches |
| F5 | "Multiple exports per day create multiple journal files. Reconciling them is tedious." | 15–20 min at month-end reconciling multiple files per day |

### Daily Tasks

| Time | Task | Duration |
|---|---|---|
| 09:00 | Check import status — verify overnight automation completed | 2 min |
| 09:05 | Review status summary — note total transactions and initial auto-match rate | 3 min |
| 14:00 | First readiness check — how many teams are complete? | 5 min |
| 14:30 | Chase incomplete teams (Slack / email / walk over) | 10 min |
| 15:00 | Generate journal export → review confirmation → verify email | 5 min |
| 15:10 | Forward journal email to D365 import queue | 2 min |
| 15:30 | (If needed) Second export run for late-coded transactions | 5 min |
| Month-end | Manual file import + multiple export runs + reconciliation | 60–90 min |

### Motivations

- **Reliability** — wants the system to work perfectly every time; low tolerance for errors
- **Predictability** — values consistent processes; dislikes surprises at 15:00
- **Automation** — eager for the manual email step to be eliminated
- **Compliance** — journal audit trail is important for financial controls

### Quotes

> "My job is simple: export the journals, make sure they're correct, and get them to D365. The less I have to chase people, the better."

> "One wrong nominal code in a journal and D365 rejects the entire batch. That's a full day lost."

> "Month-end is when everything breaks. Duplicates, late imports, rushed coding — I need the system to protect me from these."

### Accessibility Needs

- **Clear action buttons** — Generate Journal must be prominent and unambiguous
- **Confirmation dialogs** — must review what will be exported before committing
- **Status visibility** — colour-coded status must also have text labels
- **Keyboard accessible** — all primary actions reachable via keyboard

---

## Persona 3: James Wilson — IT Systems Administrator (Lookup Manager)

| Attribute | Detail |
|---|---|
| **Name** | James Wilson |
| **Role** | IT Systems Administrator |
| **Team** | IT Operations |
| **Age** | 29 |
| **Experience** | 5 years in IT support and systems admin; 2 years at current organisation |
| **Location** | Office-based / occasional remote, UK |
| **Tech Comfort** | High — comfortable with databases, APIs, Excel, scripting; quick learner |
| **Devices** | Laptop (Windows) with docking station, dual monitors |

### Photo Placeholder
> [Young professional man, late 20s, IT environment]

### Bio
James is responsible for maintaining the lookup tables that power the OAP auto-matching engine. He handles the initial bulk migration of 200+ existing rules from the Excel workbook and ongoing additions/modifications as finance teams identify new transaction patterns. He is technically capable but not a domain expert — he relies on finance team members to specify the correct nominal codes and matching criteria. He is the single point of contact for rule changes, which sometimes creates a bottleneck.

### Goals

| # | Goal | Priority |
|---|---|---|
| G1 | Successfully migrate all existing lookup rules before go-live | High |
| G2 | Add new rules quickly when finance teams identify new patterns | High |
| G3 | Avoid creating duplicate or conflicting rules | High |
| G4 | Enable finance managers to self-serve simple rule changes (reduce bottleneck) | Medium |
| G5 | Maintain an audit trail of all rule changes | Medium |

### Frustrations

| # | Frustration | Current Impact |
|---|---|---|
| F1 | "No duplicate detection. I have to manually search before adding every new rule." | 5 min per rule addition; risk of duplicates if search misses |
| F2 | "I can't test a rule before activating it. If it's wrong, transactions get miscoded." | Creates anxiety; requires manual verification after activation |
| F3 | "The bulk import has no preview. I imported 200 rules blind and had to manually verify." | 2+ hours for initial migration verification |
| F4 | "I'm the bottleneck. Every rule change goes through me, even simple ones." | Delays of 1–2 days for routine rule additions |
| F5 | "Match type logic (Exact vs Begins-with) isn't clearly explained in the UI." | Confusion when setting up complex rules; occasional errors |

### Daily Tasks

| Frequency | Task | Duration |
|---|---|---|
| Daily | Check for rule change requests in email/ticketing system | 5 min |
| Weekly | Add 2–5 new posting rules from finance team requests | 30 min |
| Monthly | Review and clean up unused or outdated rules | 30 min |
| One-off | Bulk migration of existing lookup table | 4+ hours |
| As-needed | Troubleshoot auto-match failures | 15–30 min per issue |

### Motivations

- **Correctness** — wants rules to be accurate; fears silent miscoding
- **Efficiency** — wants to handle requests quickly and move on
- **Self-service** — wants to enable others to do simple changes themselves
- **Learning** — curious about the matching logic; wants to understand the domain better

### Quotes

> "Give me a bulk import with validation and I'll have this done in an hour instead of a day."

> "The finance team knows the codes better than I do. They should be able to add simple rules themselves."

> "If I could test a rule against last week's data before activating it, I'd sleep a lot better."

---

## Persona 4: Rachel Thompson — Finance Manager (Oversight & Quality)

| Attribute | Detail |
|---|---|
| **Name** | Rachel Thompson |
| **Role** | Finance Manager |
| **Team** | Finance — cross-team oversight |
| **Age** | 48 |
| **Experience** | 22 years in finance; 10 years in management; 7 years at current organisation |
| **Location** | Office-based, UK |
| **Tech Comfort** | Low-Moderate — uses D365 and Excel daily but prefers simple, clear interfaces; dislikes technical jargon |
| **Devices** | Desktop workstation (Windows), single large monitor |

### Photo Placeholder
> [Professional woman, late 40s, senior office setting]

### Bio
Rachel oversees all three finance coding teams (C&B, AR, AP) and is responsible for coding quality, month-end close, and compliance with posting standards. She does not code transactions herself but reviews the work of her teams — especially manually coded entries. During month-end, she manages the close process and must ensure all transactions are accounted for before the deadline. She values clarity, accuracy, and accountability.

### Goals

| # | Goal | Priority |
|---|---|---|
| G1 | Ensure all teams complete coding before 15:00 deadline daily | High |
| G2 | Maintain coding accuracy — zero D365 journal rejections | High |
| G3 | Complete month-end close on time with full reconciliation | High |
| G4 | Identify and resolve coding exceptions quickly | Medium |
| G5 | Reduce dependency on James for lookup rule changes | Medium |

### Frustrations

| # | Frustration | Current Impact |
|---|---|---|
| F1 | "I can't see team-by-team progress. I have to ask each team lead separately." | 15 min daily chasing status updates; reactive rather than proactive |
| F2 | "No filter for 'Manually Coded' — I can't easily isolate entries for quality review." | Quality checks are time-consuming; may miss errors |
| F3 | "Month-end reconciliation is manual — I compare totals in Excel." | 1–2 hours of manual reconciliation at month-end |
| F4 | "I can't flag transactions as 'exception' with a reason. They just sit as 'uncoded'." | No visibility into why something is uncoded; blocks conversations |
| F5 | "I have read-only access to lookup rules. Even for simple fixes, I have to wait for James." | 1–2 day delays for straightforward rule corrections |

### Daily Tasks

| Time | Task | Duration |
|---|---|---|
| 09:30 | Review OAP status summary — assess import success and auto-match rate | 5 min |
| 11:00 | Mid-morning check — how much progress have teams made? | 5 min |
| 13:00 | Afternoon check — identify teams that are behind; intervene as needed | 10 min |
| 14:30 | Final pre-export review — spot-check high-value manual entries | 15 min |
| 15:15 | Post-export check — confirm journals generated and distributed | 5 min |
| Month-end | Full-day oversight: reconciliation, exception management, close verification | 4+ hours |

### Motivations

- **Accountability** — needs to report accurate numbers to senior management
- **Quality** — coding errors reflect on her team; she takes them personally
- **Efficiency** — wants the system to surface problems proactively, not require detective work
- **Empowerment** — wants to self-serve where possible, not depend on IT for simple tasks

### Quotes

> "I don't need to code transactions myself. I need to see at a glance whether my teams are on track and whether the coding is correct."

> "Month-end close is my most stressful week. If the system can give me a reconciliation summary, that alone would save me hours."

> "I trust the auto-match for routine items. But for manual coding — especially large amounts — I need to spot-check."

### Accessibility Needs

- **Large, clear typography** — prefers larger text; uses browser zoom at 125%
- **High contrast** — needs clear visual distinction between status states
- **Simple navigation** — does not want to learn complex filters; prefers one-click views
- **Print-friendly** — occasionally prints reports for review meetings

---

## Persona Comparison Matrix

| Attribute | Sarah Chen | David Morris | James Wilson | Rachel Thompson |
|---|---|---|---|---|
| **Primary Task** | Code transactions | Export journals | Manage lookup rules | Oversee quality |
| **Frequency** | Daily, 09:00–14:30 | Daily, 14:30–15:30 | Weekly + as-needed | Daily oversight |
| **Tech Comfort** | Moderate (Excel expert) | Moderate (ERP user) | High (IT admin) | Low-Moderate |
| **Key Metric** | Coding speed + accuracy | Export timeliness | Rule accuracy | Team completeness |
| **Top Frustration** | No team auto-filter | No per-team visibility | No duplicate detection | No team breakdown |
| **Top Need** | Autocomplete + keyboard nav | Readiness dashboard | Bulk import + validation | Team progress view |
| **Accessibility** | Keyboard focus, readable text | Clear actions, confirmations | Standard | Large text, high contrast |
| **Emotional State** | Productive → anxious at deadline | Alert → frustrated chasing teams | Methodical → bottlenecked | Vigilant → stressed at month-end |
