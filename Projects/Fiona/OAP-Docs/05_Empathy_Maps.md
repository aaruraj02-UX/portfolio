# Empathy Maps — Office Account Postings (OAP)

| Field | Detail |
|---|---|
| **Module** | Office Account Postings (OAP) |
| **Platform** | FinOps — Web Application |
| **Date** | 28 April 2026 |
| **Version** | 1.0 |

---

## Empathy Map 1: Finance Team Member (Transaction Coder)

**Representative User:** Sarah Chen, AP Team Lead  
**Context:** Daily transaction coding workflow — reviewing imported bank statement transactions, assigning posting codes, and ensuring all AP entries are coded before the 15:00 export deadline.

---

### Think & Feel

- "I need to get through these before 3pm — how many are there today?"
- "The auto-match got most of them — thank goodness. I only need to handle the exceptions."
- "I recognise this supplier — it's EDF Energy, same nominal code as last month."
- "This one I've never seen before. I'm not sure which nominal code to use. I'll have to ask Rachel."
- "I worry about making a coding mistake that causes a journal rejection in D365."
- "Why do I have to manually filter for my team every single time I open this page?"
- "I miss being able to quickly jump between cells like in Excel — Tab, Enter, next row."
- "Month-end is stressful. There's always a rush of last-minute entries and adjustments."
- "I hope the system remembers my work if my browser crashes — I've lost data before in the Excel workbook."

### See

- A data table with rows of bank transactions — some auto-coded (green badge), some blank (uncoded, no badge)
- Status summary cards at the top: Total 90, Auto-Coded 65, Manually Coded 0, Uncoded 25, Exported 0
- Team filter showing "AP" selected; other teams hidden
- Long transaction descriptions truncated in narrow columns — hard to read full text
- An edit slide panel with fields: Nominal Code, Cost Centre, Journal Description
- A pagination bar at the bottom showing "Page 1 of 3"
- Colleagues from C&B and AR teams working on the same screen but filtered to their own data

### Say & Do

- "I've filtered for AP — now let me start with the largest debits first."
- Clicks column header to sort by Debit amount descending
- "This one is straightforward — 4200 for supplier payment, cost centre SW01."
- Opens edit panel → types Nominal Code → tabs to Cost Centre → tabs to Journal Description → clicks Save
- "I'm going to flag this one — I need Rachel to confirm the account code."
- "Done with my batch. Let me check the summary — all 25 coded. Ready for David to export."
- Checks summary cards one final time before switching to another task
- "Can I see what lookup rule matched the auto-coded ones? Just to double-check."

### Hear

- Treasury team reminding: "Please finish coding by 2:30 so I can run the export on time."
- Finance Manager: "Make sure the nominal codes are correct — we had two rejections last month."
- Colleagues: "The new system is faster than Excel, but I miss the keyboard shortcuts."
- IT: "If you see a pattern repeating, let James know and he'll add a lookup rule."
- D365 team: "The journal format needs to be exact — one wrong field and the whole batch fails."

### Pain Points

| # | Pain Point | Severity |
|---|---|---|
| PP1 | Must manually filter for team every session — not remembered | High |
| PP2 | No autocomplete or suggestions for Nominal Code — must memorise or look up externally | High |
| PP3 | Truncated descriptions make it hard to identify transactions without clicking into detail | Medium |
| PP4 | No way to flag uncertain transactions for manager review | Medium |
| PP5 | Cannot bulk-edit multiple transactions with the same coding | Medium |
| PP6 | No keyboard shortcuts for power-user workflows (Tab through fields, Enter to save) | Medium |
| PP7 | Fear of data loss if browser crashes mid-edit | Low |
| PP8 | No visibility into which lookup rule auto-matched a transaction | Low |

### Gains

| # | Gain | Value |
|---|---|---|
| G1 | Auto-matching handles 65–70% of transactions automatically | High — saves 2+ hours daily |
| G2 | Clear status summary shows exactly how much work remains | High — reduces anxiety, enables planning |
| G3 | Slide panel editing is focused and distraction-free | Medium — better than Excel cell editing |
| G4 | Toast notifications confirm each save immediately | Medium — builds confidence in system reliability |
| G5 | Archived transactions available for reference without affecting current work | Medium — supports reconciliation |
| G6 | Export happens independently — no waiting or blocking | Low — eliminates coordination overhead |

---

## Empathy Map 2: Treasury Team (Journal Exporter)

**Representative User:** David Morris, Treasury Analyst  
**Context:** Responsible for generating journal export files from coded transactions at 15:00 daily (and sometimes multiple times). Distributes journals for D365 import.

---

### Think & Feel

- "It's 14:45 — have the teams finished coding? I need to export in 15 minutes."
- "I hate chasing people. Why can't the system just remind them automatically?"
- "The export needs to pick up only coded-but-not-yet-exported records. I must not accidentally re-export."
- "What if the file format is wrong and D365 rejects the journal? That's a full day lost."
- "Month-end is chaos — I might need to run 3 or 4 exports today."
- "I wish I could see at a glance which teams have finished and which haven't."
- "The email notification after export is useful — I can forward it as audit evidence."
- "When will D365 just pick up the journals automatically? This manual step feels unnecessary."

### See

- Status summary cards showing: Ready to Export 45, Uncoded 8, Already Exported 37
- A "Generate Journal" button prominently placed in the toolbar
- A confirmation dialog showing: "Export 45 transactions? Total Debits: £12,450.00. Total Credits: £8,200.00"
- Export success screen with filename: JOURNAL_2026-04-28_001.csv
- Email notification in Outlook with journal summary attachment
- AP team still has uncoded entries — their count is 8

### Say & Do

- "Let me check the numbers before I export." — Reviews status summary cards
- "AP still has 8 uncoded. I'll send Sarah a reminder." — Contacts AP team lead
- "OK, everything else is ready. Running the export now." — Clicks Generate Journal
- Reviews confirmation dialog → clicks Confirm
- "Export complete. 45 records. Let me check the email." — Opens email notification
- "Forwarding to D365 import queue." — Forwards journal email
- "I'll do another run at 16:00 for the AP stragglers." — Plans second export

### Hear

- Finance teams: "Almost done — just 5 more minutes!"
- Finance Manager: "The 15:00 deadline is firm. Export what's ready and do a second pass."
- D365 team: "Make sure the journal filename follows the naming convention."
- IT: "We're planning automated D365 posting for Phase 3 — hang in there."

### Pain Points

| # | Pain Point | Severity |
|---|---|---|
| PP1 | No visibility into per-team coding progress — must count manually or ask | High |
| PP2 | No automated reminder to teams approaching the deadline | High |
| PP3 | Must manually forward journal email to D365 import queue | Medium |
| PP4 | Multiple daily exports create multiple journal files — reconciliation complexity | Medium |
| PP5 | No formal approval step — must trust that coding is correct | Medium |
| PP6 | Month-end manual import is high-risk — no duplicate detection | High |

### Gains

| # | Gain | Value |
|---|---|---|
| G1 | One-click journal export replaces complex Excel macro process | High — saves 30+ minutes per export |
| G2 | Export only picks up coded-but-unexported records automatically | High — eliminates re-export risk |
| G3 | Confirmation dialog shows exactly what will be exported | High — builds confidence |
| G4 | Automatic email notification with journal summary | Medium — audit trail |
| G5 | Records marked "Exported" with filename — clear audit trail | Medium — supports reconciliation |

---

## Empathy Map 3: System Administrator (Lookup Manager)

**Representative User:** James Wilson, IT Systems Admin  
**Context:** Maintains the lookup tables that drive auto-matching. Handles initial bulk migration of existing rules and ongoing additions/modifications as new transaction patterns emerge.

---

### Think & Feel

- "I need to get these 200 lookup rules migrated before go-live. Can I bulk import?"
- "If I set up a rule wrong, it'll auto-code transactions incorrectly. That's a serious issue."
- "I wish I could test a rule before activating it — see what it would match."
- "The finance teams keep requesting new rules. I need a better way to track these requests."
- "How do I know if a new rule duplicates an existing one? There's no warning."
- "The match logic is complex — Exact match for some fields, Begins-with for others. Easy to confuse."
- "I'm the bottleneck for rule changes. Can the Finance Manager do some of this themselves?"

### See

- Two-tab interface: Posting Lookup (200+ rules) and Team Code Lookup (15 mappings)
- Each rule row showing: Team, Entity, Bank Account, Description, Entry Ref, Code, Account Type, Nominal, Cost Centre
- "Match type" labels under some columns: "Exact match", "Begins with"
- Add New and Edit buttons; slide panel with all fields
- A search bar to find existing rules quickly
- Bulk import interface (during migration)

### Say & Do

- "Let me search for 'SECURITY PLUS' to check if a rule already exists." — Uses search bar
- "No match found. I'll add a new posting rule." — Clicks Add New → fills slide panel
- "Team: mnsl, Entity: NSL Ltd, Description: SECURITY PLUS, Code: 466, Nominal: 5100" — Enters values
- "Saved. Let me verify it appears in the table." — Checks confirmation toast + table row
- "For the initial migration, I'll use the bulk import." — Uploads Excel file
- "The import preview shows 3 duplicates. Let me fix those before committing." — Reviews validation

### Hear

- Finance Manager: "We keep manually coding SECURITY PLUS entries. Can you add a rule?"
- Finance teams: "The auto-match didn't catch this one. The description is slightly different."
- IT Manager: "Make sure the bulk migration is validated before go-live. No errors."

### Pain Points

| # | Pain Point | Severity |
|---|---|---|
| PP1 | No duplicate detection when adding new rules | High |
| PP2 | Cannot test a rule against existing data before activating | Medium |
| PP3 | Bulk import has no preview or validation step | High |
| PP4 | Match type logic (Exact vs Begins-with) not clearly indicated in the UI | Medium |
| PP5 | No audit trail for rule changes (who changed what, when) | Medium |
| PP6 | Single point of failure — only admin can manage rules | Medium |

### Gains

| # | Gain | Value |
|---|---|---|
| G1 | Centralised rule management replaces embedded Excel macros | High — single source of truth |
| G2 | Clear two-tab structure separates posting rules from team codes | Medium — reduces confusion |
| G3 | Search across all rule fields speeds up lookup | Medium — saves time on verification |
| G4 | Slide panel for editing is focused — shows all fields in context | Medium — reduces errors |
| G5 | Toast confirmation on save provides immediate feedback | Low — builds confidence |

---

## Empathy Map 4: Finance Manager (Oversight & Quality)

**Representative User:** Rachel Thompson, Finance Manager  
**Context:** Oversees all three finance teams' coding accuracy, manages month-end close, and ensures compliance with posting standards.

---

### Think & Feel

- "Are all three teams on track today? Who's behind?"
- "I need to spot-check the manual coding — errors cost us time when D365 rejects the journal."
- "Month-end close is my most stressful time. Everything has to balance."
- "I wish I could see a dashboard instead of counting rows in a table."
- "The auto-match is great, but I need to trust it. How do I verify the rules are correct?"
- "New team members struggle with coding. The system should guide them, not just present blank fields."

### See

- Status summary cards (aggregate, not team-level)
- All teams' transactions in one view (as a manager)
- Coded transactions with nominal codes and descriptions
- Archived transactions for historical comparison
- Lookup table rules (read-only access)

### Say & Do

- "Let me filter for 'Manually Coded' status — those are the ones I need to review."
- Scans high-value transactions for correct nominal codes
- "AP has 8 uncoded — Sarah, can you prioritise those?"
- "David, go ahead with the 15:00 export."
- At month-end: reviews totals, cross-references with D365 balances
- "James, we need a new rule for these ARVAL UK entries — they keep appearing."

### Hear

- Treasury: "All coded transactions exported. Summary email sent."
- Teams: "We're done for today." / "One entry I wasn't sure about — can you check?"
- D365 team: "All journals imported successfully. No rejections."
- Auditors: "We need a report of all manual coding changes for April."

### Pain Points

| # | Pain Point | Severity |
|---|---|---|
| PP1 | No team-by-team progress view — must aggregate mentally | High |
| PP2 | No filter for "Manually Coded" to isolate review candidates | Medium |
| PP3 | No month-end reconciliation summary | High |
| PP4 | No audit trail for who coded what and when | Medium |
| PP5 | Cannot delegate lookup rule management to team leads | Medium |

### Gains

| # | Gain | Value |
|---|---|---|
| G1 | Real-time visibility into coding progress across all teams | High — enables proactive management |
| G2 | Archived transactions available for historical comparison | Medium — supports reconciliation |
| G3 | Auto-match reduces human error on routine transactions | High — improves accuracy |
| G4 | Export audit trail provides compliance evidence | Medium — supports internal audit |

---

## Cross-Empathy Themes

| Theme | Users Affected | Implication |
|---|---|---|
| **Time pressure** | All users | 15:00 deadline drives urgency; status visibility is critical |
| **Trust in automation** | Finance Members, Manager | Auto-match must be verifiable; transparency builds confidence |
| **Fear of errors** | Finance Members, Treasury | Validation, autocomplete, and confirmation reduce mistakes |
| **Manual repetition** | Finance Members, Admin | Bulk edit, autocomplete, and saved preferences reduce tedium |
| **Visibility gaps** | Treasury, Manager | Per-team dashboards and progress indicators needed |
| **Knowledge transfer** | Finance Members (new) | System should guide coding with suggestions and autocomplete |
