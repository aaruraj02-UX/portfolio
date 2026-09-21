# User Journeys — Office Account Postings (OAP)

| Field | Detail |
|---|---|
| **Module** | Office Account Postings (OAP) |
| **Platform** | FinOps — Web Application |
| **Date** | 28 April 2026 |
| **Version** | 1.0 |

---

## Journey 1: Finance Team Member — Daily Transaction Coding

**Persona:** Sarah Chen, AP Team Lead  
**Goal:** Review and code all AP team transactions before the 15:00 journal export deadline  
**Trigger:** Automated import completes at 05:30 AM; Sarah starts work at 09:00 AM  
**Frequency:** Daily  

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| **1. Arrive & Orient** | Logs into FinOps → navigates to OAP → lands on Current Open Transactions | "Let me see what came in overnight. How many do I need to code today?" | Neutral → Slightly anxious about volume | May not know import status or whether it succeeded | Show import timestamp + success banner; status summary cards immediately visible |
| **2. Assess Workload** | Scans status summary cards: Total, Auto-Coded, Uncoded, Exported | "Good — 65 out of 90 were auto-coded. I only have 25 to do manually." | Relieved if auto-match rate is high; stressed if low | No quick way to see how many are specifically AP team | Add team-scoped summary cards; filter auto-applies on login |
| **3. Filter for Team** | Selects team filter or uses search to show only AP transactions | "I only need to see my team's items. Don't show me C&B or AR." | Focused; in control | Default view shows all teams; manual filter step each session | Persist team filter in session; default to user's assigned team |
| **4. Review Transactions** | Scans table rows; reads Description, Entry Ref, Transaction Code, Debit/Credit | "Most of these I recognise. EDF Energy is our regular supplier payment." | Confident for known patterns; uncertain for unfamiliar ones | Long descriptions truncated; hard to distinguish similar entries | Expandable rows or tooltip on hover; highlight unmatched rows |
| **5. Code Transaction** | Clicks Edit button → slide panel opens → enters Nominal Code, Cost Centre, Journal Description → Save | "4200 for supplier payments, cost centre SW01, description 'EDF Energy Q1'" | Productive; routine | Must remember codes from memory; no autocomplete or recent suggestions | Suggest Nominal Code from similar past entries; autocomplete dropdown |
| **6. Repeat for Batch** | Codes remaining uncoded transactions one by one (or in small batches) | "12 more to go. This one I'm not sure about — need to check the lookup." | Rhythm builds; occasional frustration on unknown entries | No way to flag uncertain entries for later review; no bulk edit | Add "flag for review" status; bulk edit for identical coding patterns |
| **7. Verify Completion** | Checks status summary cards — all AP transactions now coded or exported | "All done. 25 coded, 65 were auto-coded. Ready for Treasury to export." | Satisfied; sense of completion | No explicit "all done" confirmation for team-level completion | Show team completion percentage; "All AP transactions coded" confirmation |
| **8. Post-Export Check** | After Treasury exports at 15:00, checks that transactions are marked "Exported" | "Let me confirm the export went through for my entries." | Trusting but verifying | Must manually scan for "Exported" status; no push notification | Receive email/notification when journal containing AP entries is exported |

### Journey Map — Emotional Curve

```
Feelings:  😟 → 😐 → 😊 → 😊 → 😊 → 😤 → 😊 → ✅
Stage:      1     2     3     4     5     6     7     8
           Arrive Assess Filter Review Code   Repeat Verify Check
```

### Key Opportunities Identified

| # | Opportunity | Priority |
|---|---|---|
| J1-O1 | Auto-apply team filter based on user's assigned team | High |
| J1-O2 | Nominal Code autocomplete from lookup table + recent entries | High |
| J1-O3 | Bulk edit for transactions with identical coding | Medium |
| J1-O4 | "Flag for review" status for uncertain entries | Medium |
| J1-O5 | Team completion indicator + notification on export | Medium |

---

## Journey 2: Treasury Team — Journal Export

**Persona:** David Morris, Treasury Analyst  
**Goal:** Generate journal files for all coded transactions and distribute to D365 team  
**Trigger:** 15:00 daily deadline (may run earlier or multiple times)  
**Frequency:** Daily (1–3 times)  

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| **1. Check Readiness** | Opens Current Open Transactions → reviews status summary cards | "How many are coded and ready? Are there still uncoded items?" | Alert; time-pressure | Must mentally calculate: total - exported - uncoded = ready to export | Dedicated "Ready to Export" count in summary cards |
| **2. Assess Completeness** | Scans for remaining uncoded transactions; notes which teams haven't finished | "AP team still has 8 uncoded. I should chase Sarah." | Frustrated if teams are behind | No way to notify teams directly from the interface; must email/call separately | "Send reminder" action per team; automated reminder at 14:00 |
| **3. Generate Export** | Clicks "Generate Journal" button | "Let me export what's ready. I'll do another run later for stragglers." | Decisive; wants quick action | Must confirm action; unclear what exactly will be included | Confirmation dialog showing: X transactions, total debits, total credits |
| **4. Review Confirmation** | Reads export confirmation: filename, record count, totals | "45 transactions exported. JOURNAL_2026-04-28_001.csv created." | Confident; satisfied | Previous exports had no summary — had to open file to verify | Inline export summary with option to preview |
| **5. Distribute Journals** | Receives email with journal attachment → forwards to D365 import team | "Email received. Let me forward to the import queue." | Routine; administrative | Manual email forwarding step; could be automated | Auto-send to D365 import queue; future: direct D365 API posting |
| **6. Handle Stragglers** | Returns after 15:30; runs export again for newly coded transactions | "AP finally finished their coding. Let me do a second run." | Mildly annoyed at delay; resigned | Second export creates separate journal file; reconciliation effort | Combine multiple exports into single daily journal option |
| **7. Month-End: Manual Import** | At month-end, manually uploads file via Import dialog | "Got the month-end adjustments file. Need to import and process." | Careful; high-stakes | Import flow must be identical to automated; any difference causes errors | Same processing pipeline; duplicate detection; validation preview |

### Journey Map — Emotional Curve

```
Feelings:  😐 → 😤 → 😊 → ✅ → 😐 → 😤 → 😟
Stage:      1     2     3     4     5     6     7
           Check Assess Export Confirm Distrib Straggle Import
```

### Key Opportunities Identified

| # | Opportunity | Priority |
|---|---|---|
| J2-O1 | "Ready to Export" count in status summary | High |
| J2-O2 | Pre-export confirmation dialog with transaction summary | High |
| J2-O3 | Automated email to D365 import queue (eliminate manual forwarding) | Medium |
| J2-O4 | Team reminder notification from interface at configurable time | Medium |
| J2-O5 | Duplicate detection on manual month-end import | High |

---

## Journey 3: System Administrator — Lookup Table Management

**Persona:** James Wilson, IT Systems Admin  
**Goal:** Add a new posting lookup rule after a new supplier pattern is identified  
**Trigger:** Finance Manager requests new auto-match rule after repeated manual coding  
**Frequency:** Weekly / as-needed  

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| **1. Receive Request** | Gets request from Finance Manager: "Add rule for SECURITY PLUS supplier payments" | "Need to set up a new auto-match rule for this supplier." | Neutral; routine task | Request comes via email — no structured intake form | Lookup rule suggestion from repeated manual coding patterns |
| **2. Navigate to Lookup** | Opens FinOps → OAP → Lookup Table → Posting Lookup tab | "Let me check if there's already a partial rule for this." | Focused | Must search existing rules to avoid duplicates | Duplicate detection on add; search highlights similar existing rules |
| **3. Search Existing** | Uses search bar to check for "SECURITY PLUS" or related transaction code | "Nothing found — this is genuinely new." | Confident to proceed | Search only checks current tab; no cross-reference with archived transactions | Show sample matched transactions from recent imports |
| **4. Add New Rule** | Clicks "Add New" → slide panel opens → fills in: Team (mnsl), Entity (NSL Ltd), Description (SECURITY PLUS), Code (466), Nominal Code (5100), Cost Centre (NSL01) | "Team is NSL, code 466 for direct debits, nominal 5100 for supplier payments." | Methodical; careful | Many fields to fill; easy to make a mistake with no validation preview | Field-level validation; preview of matching transactions before save |
| **5. Save & Verify** | Clicks "Add" → toast confirmation → sees new rule in table | "Rule added. Let me verify it looks right." | Satisfied; wants to confirm | No immediate way to test if the rule would match existing transactions | "Test rule" feature: show which current transactions would match |
| **6. Bulk Migration** | During initial setup, imports existing Excel lookup table as bulk upload | "200 rules to migrate. Cannot do this one by one." | Anxious about accuracy | Bulk import must map Excel columns to FinOps fields correctly | Column mapping preview; validation report before commit |

### Journey Map — Emotional Curve

```
Feelings:  😐 → 😐 → 😐 → 😟 → ✅ → 😟
Stage:      1     2     3     4     5     6
           Request Navigate Search Add   Verify Bulk
```

### Key Opportunities Identified

| # | Opportunity | Priority |
|---|---|---|
| J3-O1 | System suggests new lookup rules from repeated manual coding | Medium |
| J3-O2 | Duplicate detection when adding rules | High |
| J3-O3 | "Test rule" preview showing matching transactions | Medium |
| J3-O4 | Bulk import with column mapping and validation preview | High |

---

## Journey 4: Finance Manager — Month-End Review

**Persona:** Rachel Thompson, Finance Manager  
**Goal:** Ensure all month-end transactions are coded and exported before close  
**Trigger:** Last business day of the month  
**Frequency:** Monthly  

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| **1. Assess Month Status** | Opens Current Open Transactions → reviews status summary for all teams | "Month-end close is today. What's still outstanding across all teams?" | Urgent; high-pressure | Summary cards show overall totals but not team-by-team breakdown | Team breakdown in summary cards; month-end dashboard view |
| **2. Chase Teams** | Identifies uncoded transactions per team → contacts team leads | "AP has 15 still uncoded. C&B has 3. AR is complete." | Frustrated if behind schedule | Must manually scan and count per team; no automated reminder | Per-team status view; automated "approaching deadline" notifications |
| **3. Review Coding Quality** | Spot-checks a sample of manually coded transactions for accuracy | "Let me verify the Nominal Codes look correct on these larger entries." | Cautious; quality-focused | No way to filter by "manually coded" for review; must scan all | Filter by status: "Manually Coded" to isolate review candidates |
| **4. Verify Completeness** | Checks that all transactions are coded or explicitly flagged as exceptions | "Everything should be either coded or flagged. No orphaned records." | Methodical; thorough | No "flag as exception" mechanism; uncoded items sit with no context | Exception flagging with reason; month-end completion report |
| **5. Approve Export** | Confirms with Treasury to generate final month-end journal export | "Go ahead and run the final export. Then we close." | Decisive; relieved | No formal "approve" step; relies on verbal/email confirmation | Approval workflow: Manager signs off before final export |
| **6. Reconcile Archive** | After export, verifies records moved to archive correctly | "Let me check archived transactions for April. Totals should match." | Trusting but verifying | Must compare current vs archived totals manually | Month-end reconciliation summary: imported vs coded vs exported vs archived |

### Journey Map — Emotional Curve

```
Feelings:  😟 → 😤 → 😐 → 😐 → ✅ → ✅
Stage:      1     2     3     4     5     6
           Assess Chase Review Verify Approve Reconcile
```

### Key Opportunities Identified

| # | Opportunity | Priority |
|---|---|---|
| J4-O1 | Team-by-team status breakdown in summary view | High |
| J4-O2 | Filter by "Manually Coded" status for quality review | Medium |
| J4-O3 | Exception flagging with reason for month-end reporting | Medium |
| J4-O4 | Month-end reconciliation summary report | High |

---

## Cross-Journey Opportunity Summary

| # | Opportunity | Journeys | Priority | Phase |
|---|---|---|---|---|
| 1 | Auto-apply team filter based on user assignment | J1 | High | Phase 1 |
| 2 | Nominal Code autocomplete from lookup + history | J1 | High | Phase 1 |
| 3 | "Ready to Export" count in summary cards | J2 | High | Phase 1 |
| 4 | Pre-export confirmation with transaction summary | J2 | High | Phase 1 |
| 5 | Duplicate detection on lookup rules and imports | J3, J2 | High | Phase 1 |
| 6 | Bulk lookup import with validation preview | J3 | High | Phase 1 |
| 7 | Team-by-team status breakdown | J4 | High | Phase 1 |
| 8 | Bulk edit for identical coding patterns | J1 | Medium | Phase 2 |
| 9 | System-suggested lookup rules from manual patterns | J3 | Medium | Phase 2 |
| 10 | "Test rule" preview for lookup management | J3 | Medium | Phase 2 |
| 11 | Automated team reminders at configurable time | J2 | Medium | Phase 2 |
| 12 | Month-end reconciliation summary report | J4 | High | Phase 2 |
| 13 | Exception flagging with reason | J1, J4 | Medium | Phase 2 |
| 14 | Direct D365 API posting | J2 | High | Phase 3 |
