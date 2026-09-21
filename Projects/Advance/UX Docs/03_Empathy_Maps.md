# Empathy Maps — ProServe Master EA Platform

| Field | Detail |
|---|---|
| **Project** | ProServe — Enforcement Agent Master Data Platform |
| **Version** | 1.0 |
| **Date** | 20 April 2026 |
| **Status** | Draft |

---

## Empathy Map 1 — Sarah Mitchell (Contract Service Team Member / Keyer)

### Think & Feel
- "Am I entering this data in the right system? Will it actually sync everywhere?"
- Anxious about data entry errors causing downstream problems in Atlas or Optimise
- Frustrated by repetitive tasks — entering the same information in multiple places
- Feels responsible for data quality but lacks confidence in the tooling
- Concerned about incomplete profiles — worries she'll miss a mandatory field
- Hopeful that the new platform will finally give her a single place to work

### See
- Multiple browser tabs open — Advance, Atlas, Optimise, Asset Register
- Spreadsheet-based checklists to track which fields have been updated where
- Email chains with approvers asking for status updates on pending changes
- Inconsistent UI patterns across legacy systems — different field names for the same data
- Colleagues struggling with the same multi-system workflow

### Say & Do
- "I've already entered this in Atlas — why do I need to put it in Advance too?"
- Creates personal checklists to track cross-system updates
- Frequently copies and pastes data between systems
- Asks team leads for clarification on which system is the "real" source
- Submits changes and then manually follows up with approver via email or Teams
- Double-checks field values across systems before closing a record

### Hear
- Team lead: "Make sure you update all three systems — we can't have mismatches."
- Colleagues: "I just skip the Atlas update and hope nobody notices."
- IT: "We're working on integration but it's not there yet."
- Management: "Data quality is everyone's responsibility."
- Enforcement managers calling to ask why their EA's details are wrong in Optimise

### Pain Points
- **Multi-system data entry** — same data entered 2–3 times across fragmented systems
- **No approval visibility** — submits changes with no feedback on progress or timeline
- **Inconsistent validation** — a value accepted in one system is rejected in another
- **Manual Talos fallback** — when Talos data isn't received, full manual entry takes 30+ minutes
- **No save-as-draft** — loses work if navigating away mid-form in legacy systems
- **Document upload friction** — different file size/format limits per system

### Gains
- Single system for all EA data entry — enter once, sync everywhere
- Guided stepper workflow with "Save & Continue" so progress is never lost
- Real-time approval status visible on the record
- Clear validation messages at the field level before submission
- Auto-population from Talos reduces manual effort
- Draft saving allows returning to incomplete records

---

## Empathy Map 2 — James Whitfield (Contract Service Team Lead — Admin / Verifier)

### Think & Feel
- "How many approvals are in my queue today? Am I blocking anyone?"
- Concerned about approving changes without full context of what was modified
- Feels the weight of being the final quality gate for all EA data
- Worried that approved changes might not sync properly to downstream systems
- Wants to trust the data but can't without seeing the full audit history
- Motivated by operational efficiency — delays in approvals delay EA onboarding

### See
- A growing list of pending approvals with minimal context
- Team members following up via email, Teams, and in-person to ask about approval status
- Rejection comments that are too vague — keyers resubmit without fixing the actual issue
- Reports stitched together from multiple data exports
- Audit requests requiring manual compilation of change history

### Say & Do
- "Show me what changed — I don't want to review every field on an 8-entity record."
- Opens each pending record and manually compares before/after values
- Writes rejection comments in a flat text box, wishes he could comment per section
- Exports data from 3 systems to compile weekly reports
- Escalates sync issues to IT when downstream systems show stale data
- Trains new team members on the multi-system workflow

### Hear
- Sarah: "I submitted that change two days ago — have you approved it yet?"
- Enforcement Director: "The EA's certification data in Atlas doesn't match Advance."
- IT: "We can only guarantee sync within 4 hours, not real-time."
- Audit team: "We need the full change log for EA #34532 by end of day."
- Management: "We need to reduce onboarding time from 5 days to 2."

### Pain Points
- **No change highlighting** — has to compare entire records field by field to spot edits
- **Flat rejection comments** — can't assign comments to specific entities/sections
- **Report compilation** — manually stitching data from multiple exports
- **Sync uncertainty** — approves a change but can't confirm it reached Atlas/Optimise
- **Queue visibility** — no prioritisation of pending approvals (urgent vs. routine)
- **Audit overhead** — compiling audit logs manually is time-consuming

### Gains
- Approval interface that highlights modified fields and shows change context
- Section-by-section rejection comments so keyers know exactly what to fix
- Consolidated reporting from a single data source
- Sync status visibility per EA record — confirmed propagation to all systems
- Prioritised approval queue with urgency indicators
- Complete audit trail accessible from the record itself

---

## Empathy Map 3 — David Okonkwo (Enforcement Director / Strategic Approver)

### Think & Feel
- "I don't need to see every field — just show me what matters for my decision."
- Frustrated by interfaces that treat him like a data-entry user when he's a strategic decision-maker
- Concerned about compliance gaps — are all EAs certified and bonded?
- Feels accountable for the performance of the enforcement chain below him
- Wants confidence that the data he's looking at is current and authoritative
- Worried about mobile access — needs to approve when away from desk

### See
- Detailed forms designed for keyers, not for review/approval
- Fields he can't edit mixed in with fields he can — no visual distinction
- Certification and compliance data scattered across different screens
- Senior EMs and EMs requesting approvals without clear justification
- Dashboard-less interfaces that require drilling into individual records

### Say & Do
- "I shouldn't have to open every section just to approve a contact info change."
- Delegates detailed data checks to Senior EMs, focuses on strategic decisions
- Reviews enforcement team configurations — postcodes, income streams, case types
- Approves changes affecting Brand, Cost Centre, and Training Requirements
- Pulls up individual EA profiles to check compliance status

### Hear
- Senior EM: "I've submitted the postcode changes for review — can you approve today?"
- Contract Service Lead: "The Director needs to sign off before I can process this."
- Audit: "We need confirmation that all EAs in your region are compliant."
- IT: "The sync dashboard is coming in the next release."

### Pain Points
- **Information overload** — sees all 8 entities when he only needs 3–4
- **No role-appropriate view** — can't distinguish editable from view-only fields
- **Approval without context** — doesn't see what changed or who requested it
- **Limited mobile access** — can't approve on the go
- **No compliance dashboard** — has to check individual EA profiles

### Gains
- Role-filtered view showing only relevant entities and fields
- Clear visual distinction: editable fields vs. view-only vs. hidden
- Approval interface with change summary and requester context
- Mobile-responsive layout for on-the-go approvals
- Compliance dashboard showing certification and bond status across his region

---

## Empathy Map 4 — Rachel Obi (Enforcement Manager)

### Think & Feel
- "I know my team better than anyone — let me manage their profiles efficiently."
- Frustrated by unclear permissions — "Can I edit this field or not?"
- Feels constrained by a system designed for Contract Service, not for enforcement managers
- Wants to quickly spot issues — expiring certifications, missing postcodes
- Anxious about submitting edits that will be rejected without clear reasons
- Motivated to keep her team operational and compliant

### See
- EA profiles with a mix of editable and non-editable fields, but no clear distinction
- Enforcement fields spread across a long form rather than grouped logically
- Rejection comments that don't specify which section needs fixing
- Mobile interface that doesn't work well for field editing
- Team list that doesn't filter to her assigned EAs

### Say & Do
- "I'll update the enforcement postcodes for my team — but it takes forever one by one."
- Edits EA contact info, enforcement teams, postcodes, and income streams
- Checks certification expiry dates and Bond status for her assigned EAs
- Submits edits and waits for approval from her Senior EM and Director
- Uses mobile when in the field, switches to desktop for complex edits

### Hear
- Senior EM: "Make sure all your EAs have primary postcodes assigned before Monday."
- EA: "My phone number changed — can you update it?"
- Contract Service: "The enforcement fields were rejected — please resubmit."
- IT: "The Asset Management section is managed by IT, not enforcement."

### Pain Points
- **Permission ambiguity** — no clear visual signal for view-only vs. editable fields
- **No team scoping** — system shows all EAs, not just her assigned team
- **Tedious postcode entry** — no batch assignment for repetitive tasks
- **Poor mobile experience** — forms not optimised for smaller screens
- **Vague rejections** — rejection comments don't indicate which specific section

### Gains
- Clear visual distinction between editable and view-only fields with "View" tags
- Team-scoped default view showing only assigned EAs
- Section-level rejection comments that pinpoint issues
- Mobile-optimised forms for field-based editing
- Inline validation preventing rejectable errors before submission

---

## Empathy Map 5 — Marcus Thompson (Enforcement Agent)

### Think & Feel
- "I just want to update my address and get back to work."
- Confused by complex forms that show entities he can't interact with
- Worried about accidentally changing something he shouldn't
- Feels disconnected from the admin side — doesn't understand the full workflow
- Wants to feel confident that his profile is correct and up to date
- Frustrated when simple tasks (phone number change) take too long

### See
- A long profile with many sections, most of which he can only view
- Fields that look editable but throw errors when he tries to save
- His certification expiry date approaching with no proactive notification
- Asset list showing BWV camera, laptop, and ANPR kit assigned to him
- No clear "you can edit these fields" guidance

### Say & Do
- "I need to change my home address — moved last weekend."
- Opens app on mobile, navigates to personal details
- Tries to edit a field, gets "access denied" — gives up and calls his manager
- Checks certification status manually every few weeks
- Views his bond details but doesn't understand all the fields

### Hear
- Manager: "Update your contact info in the system when it changes."
- Colleagues: "I just call the office and ask them to update it for me."
- IT: "Your new laptop has been assigned — check your profile."
- Contract Service: "We need your address update to process the contract renewal."

### Pain Points
- **Unclear editability** — can't tell which fields he can change without trying
- **Overly complex interface** — sees 8 entities when he only interacts with 2–3
- **Slow mobile experience** — forms designed for desktop, not mobile-first
- **No proactive notifications** — certification expiry not alerted
- **Error messages after the fact** — doesn't know until he tries to save

### Gains
- Simplified "My Profile" view showing only own data with clear edit/view indicators
- Mobile-first design for quick contact info updates (< 60 seconds)
- Only relevant sections visible — hidden entities don't create confusion
- Field-level "View" tags on read-only fields so he never guesses wrong
- Proactive alerts for certification expiry and pending actions

---

## Empathy Map 6 — Claire Adams (Finance Analyst)

### Think & Feel
- "I need to look up contract details quickly — don't make me wade through operational data."
- Nervous about complex interfaces where she might accidentally modify something
- Values accuracy above all — financial decisions depend on correct EA data
- Feels like an outsider in a system designed for enforcement operations
- Appreciates clear read-only interfaces that remove doubt

### See
- EA records with many entities she has no access to
- Contract and personal details buried within long, multi-section profiles
- No visual confirmation that the interface is read-only for her role
- Inconsistent financial data across systems requiring manual reconciliation

### Say & Do
- "I just need the banking details and contract start date."
- Searches for specific EAs by name or ID
- Views personal details and contract information
- Exports data for financial reconciliation reports
- Avoids clicking anything that looks like it might edit a record

### Hear
- Team lead: "Double-check the VAT status before processing the payment."
- Colleagues: "The contract dates in Atlas don't match ProServe — use the BRD."
- Audit: "We need confirmation of banking details for the quarterly review."

### Pain Points
- **Read-only ambiguity** — interface doesn't clearly communicate she can't edit
- **Too many entities visible** — she only needs Personal + Contract
- **Cross-system inconsistency** — financial data differs between systems
- **No quick search** — finding a specific EA takes too many clicks
- **No export capability** — has to manually copy data for reports

### Gains
- Clearly read-only interface with RBAC banner confirming "View Only" access
- Only relevant entities visible (Personal, Contract) — others hidden
- Fast search and filter by EA name, ID, brand, or contract status
- Data consistency from SSOT — no more cross-referencing multiple systems
- Export-ready views for financial reporting
