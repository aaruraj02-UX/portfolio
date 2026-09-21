# User Journey Maps — ProServe Master EA Platform

| Field | Detail |
|---|---|
| **Project** | ProServe — Enforcement Agent Master Data Platform |
| **Version** | 1.0 |
| **Date** | 20 April 2026 |
| **Status** | Draft |

---

## Journey 1 — New EA Onboarding (Keyer Flow)

**Persona:** Sarah Mitchell — Contract Service Team Member (Keyer)
**Goal:** Create a complete EA profile from a Talos data feed and submit for approval.
**Trigger:** EA passes Pre-Employment Screening; data received via Talos integration or manual notification.

| Stage | Actions | Thoughts & Feelings | Pain Points | Opportunities |
|-------|---------|---------------------|-------------|---------------|
| **1. Alert / Trigger** | Receives notification that new EA data is ready (email or system alert). Logs into Advance. | "Let's see if the Talos data came through — I hope I don't have to enter everything manually." 😐 Cautious. | No unified notification centre. Must check email separately. | In-app notification with direct link to start onboarding. |
| **2. Initiate Record** | Clicks "+ Add New Record" from Records List page. System creates draft record. | "Good — I can start right away. I hope the stepper hasn't changed since last time." 🙂 Focused. | Button visibility depends on role; if RBAC misconfigured, button is missing with no explanation. | Role-specific empty state: "You don't have permission to create records." |
| **3. Personal Details** | Fills Step 1 — Personal Details. Talos auto-populates identity fields (Talos ID, User ID). Enters name, contact, address, employment details. Uploads profile photo and documents. | "Auto-population saved me 10 minutes. But I still have 30+ fields to fill." 😟 Slightly overwhelmed. | 37 fields in one step. Address lookup (PAF) may fail. Attachment upload errors are cryptic. | Sub-section grouping within Personal Details (Identity, Name, Contact, Employment, Attachments). Progressive validation per sub-section. |
| **4. Compliance** | Fills Step 2 — Compliance. Enters qualification, awarding body, authorisation date. | "Straightforward section. Quick to complete." 🙂 Confident. | No guidance on expected date format. "Notes" field has no character limit indicator. | Date picker with format hint. Character counter on Notes. |
| **5. Certificate Processing** | Fills Step 3 — Certificate Processing. Enters status, court, DBS request details, hearing outcome. | "I need the court details from the solicitor's email — let me switch tabs." 😐 Context-switching. | Data sourced from external communication (email). No way to attach reference documents to this step. | "Attach reference" option per step. Contextual help text for court/DBS fields. |
| **6. Certificate Status** | Fills Step 4 — Certificate Status. Uploads certificate copy. | "Certificate upload — I hope the file size limit is clear this time." 😐 Wary. | File size/format restrictions not communicated until upload fails. | Pre-upload validation: show accepted formats + max size inline. |
| **7. Bond** | Fills Step 5 — Bond. Enters contractor, type, number. | "Simple step." 🙂 Relieved. | "Hold" toggle purpose is unclear — no tooltip. | Tooltip: "Enable to hold bond processing for this EA." |
| **8. Contract** | Fills Step 6 — Contract. Enters banking details, VAT, addresses, uploads insurance docs. | "Banking details are sensitive — I need to double-check before saving." 😟 Careful. | Banking fields have no inline validation (sort code format, account number length). Many sub-sections. | Inline format validation. Mask sensitive fields. Group banking fields in a collapsible sub-section. |
| **9. Asset Management** | Fills Step 7 — Asset Management. Enters BWV camera, ANPR, laptop details. | "I'll need to check with IT for the asset serial numbers." 😐 Dependent on others. | Data not available to keyer — requires coordination with IT. | "Request from IT" button or integration with asset management system. |
| **10. Enforcement** | Fills Step 8 — Enforcement. Enters teams, postcodes, income streams, devices. | "This is the longest section — 28 fields across 5 sub-groups." 😟 Fatigued. | Sub-sections not visually separated. Postcode entry is one-at-a-time, no batch. | Clear sub-section headers. Batch postcode entry. Auto-suggest from existing postcodes. |
| **11. Review & Submit** | Clicks "Save Record" on final step. System validates all mandatory fields. If valid, record is submitted. | "Finally done — I hope there are no validation errors at this stage." 😬 Nervous. | Cross-step validation errors require navigating back to earlier steps. No summary review before submit. | Summary review screen before submission. Navigate to error step on click. |
| **12. Confirmation** | Redirected to Records List with success popup: "New record added successfully." | "Done! Now I wait for the verifier to approve." 🙂 Satisfied. | No visibility into which approver will review or when. | Confirmation message includes: "Submitted to [Approver Name]. Expected review: [SLA timeframe]." |

### Emotional Journey
```
😐 ─── 🙂 ─── 😟 ─── 🙂 ─── 😐 ─── 😐 ─── 🙂 ─── 😟 ─── 😐 ─── 😟 ─── 😬 ─── 🙂
Alert  Init  Personal Comp  CertProc CertSt  Bond   Contract Asset  Enforce Review  Done
```

---

## Journey 2 — Record Approval (Verifier Flow)

**Persona:** James Whitfield — Contract Service Team Lead (Verifier/Approver)
**Goal:** Review a submitted EA record, evaluate changes, and approve or reject with section-specific feedback.
**Trigger:** Keyer submits a new or edited EA record for approval.

| Stage | Actions | Thoughts & Feelings | Pain Points | Opportunities |
|-------|---------|---------------------|-------------|---------------|
| **1. Notification** | Receives notification (email/in-app) that a record is pending approval. Navigates to Records List. | "Another approval — let me check the queue." 😐 Routine. | No prioritisation — urgent vs. routine approvals look identical. | Priority badge (New EA = high, minor edit = low). Approval queue with age indicators. |
| **2. Open Record** | Clicks pending record from list. Opens Edit view with approval banner showing "Pending — Submitted by Sarah Mitchell." | "Good — I can see who submitted it. But what exactly changed?" 😐 Needs context. | No change diff — must review all 8 entities manually. | Change summary panel: "3 entities modified — Personal Details, Contract, Enforcement." |
| **3. Review Entities** | Navigates through stepper steps 1–8. Reviews each field for accuracy and completeness. | "I'm checking every field because I don't know which ones changed. This takes too long." 😟 Frustrated. | Full review required even for single-field changes. No way to compare old vs. new values. | Highlight modified fields. Show before/after comparison. Skip unchanged steps. |
| **4a. Approve** | If all data is correct, clicks "Approve" in the page header. Confirmation dialog appears. Confirms approval. | "Everything looks good — approved." 🙂 Satisfied. | Approval action buried in page header — easy to miss. | Fixed action bar at bottom or floating FAB for Approve/Reject. |
| **4b. Reject** | If issues found, clicks "Reject". Rejection modal opens with section-by-section comment fields. Enters specific feedback per entity. | "At least I can comment per section now — the keyer will know exactly what to fix." 🙂 Appreciates specificity. | Previously: single comment box for all issues. Now: section comments but only for accessible entities. | Pre-populated rejection templates for common issues. |
| **5. Submit Decision** | Clicks "Submit Rejection" or confirms approval. Status updates. Keyer notified. | "Done — moving to the next one. I wish I could see how many are left." 😐 Wants queue progress. | No queue progress indicator (2 of 12 reviewed). | Queue counter: "Reviewed 2 of 12. Next: [EA Name]." |
| **6. Confirm & Next** | Redirected to Records List or proceeds to next pending record. Success popup confirms action. | "Okay, that's done. Next." 🙂 Efficient. | Must return to list and re-filter to find next pending record. | "Next Pending" button in confirmation modal. |

### Emotional Journey
```
😐 ─── 😐 ─── 😟 ─── 🙂/😐 ─── 😐 ─── 🙂
Notify  Open  Review  Decision  Submit  Next
```

---

## Journey 3 — Enforcement Manager Editing Team Configuration

**Persona:** Rachel Obi — Enforcement Manager
**Goal:** Update enforcement postcodes and income streams for assigned EAs before a redistribution deadline.
**Trigger:** Area restructure requires postcode reassignment for 5 EAs in her team.

| Stage | Actions | Thoughts & Feelings | Pain Points | Opportunities |
|-------|---------|---------------------|-------------|---------------|
| **1. Access Records** | Logs in as Enforcement Manager. Navigates to Records List. | "I need to update postcodes for my team before Friday." 😐 Task-focused. | Records list shows all EAs, not just her assigned team. Must filter manually. | Team-scoped default view. "My Team" toggle filter. |
| **2. Filter Team** | Searches or filters by area/brand to find her EAs. Identifies the 5 records that need updating. | "Filtering works but it would be faster if I could see just my team." 😐 Mildly frustrated. | No "assigned manager" filter. Area filter shows too many results. | Manager-based scoping. Saved filter presets. |
| **3. Open First Record** | Opens EA #1 for editing. System loads Edit view with RBAC applied — showing only entities she can access. | "Good — I can see my permissions. But which fields can I actually edit?" 😐 Uncertain. | Field-level editability not visually distinct until she clicks into a field. | "View" tags on read-only fields visible before interaction. Disabled styling on view-only inputs. |
| **4. Navigate to Enforcement** | Uses stepper to navigate to Step 8 — Enforcement. Skips steps she can't edit (Compliance, Contract hidden by RBAC). | "The stepper hides what I can't access — that's helpful. But I still have 6 steps to click through." 😐 Wants shortcut. | Must click through steps sequentially — no "jump to Enforcement" shortcut. | Direct step navigation by clicking step label. Last-edited step remembered per session. |
| **5. Edit Postcodes** | Updates Primary and Secondary postcodes. Adds new outcodes. | "One postcode at a time? I need to add 12 outcodes — this is going to take forever." 😟 Frustrated. | No batch entry for postcodes. Each outcode requires individual add. | Batch postcode entry: paste comma-separated list. Bulk import from CSV. |
| **6. Edit Income Streams** | Updates permitted income streams and sub-types. Adjusts min fee and flat rate where permitted. | "The income fields I can see are clear. But the ones I can't edit have no explanation why." 😐 Confused. | View-only fields (flat rate, performance bonus for EM role) don't explain why they're restricted. | Tooltip on view-only fields: "This field is managed by Enforcement Directors." |
| **7. Save & Continue** | Clicks "Save & Continue" on Step 8. If last accessible step, button reads "Save Record." | "Saved. Now I need to do this 4 more times for the other EAs." 😟 Repetitive. | No batch editing across multiple EAs. Must repeat entire flow per record. | Bulk edit mode: select multiple EAs, apply postcode changes to all. |
| **8. Repeat for Remaining EAs** | Returns to Records List. Repeats steps 3–7 for EA #2 through EA #5. | "This is taking an hour for 5 EAs. There has to be a better way." 😟 Fatigued. | 5× repetition of the same workflow. No "apply same changes to multiple EAs" option. | Copy-and-apply: "Apply these postcode changes to selected EAs." |
| **9. Submission** | All 5 records submitted. Status → Pending Approval for each. | "Done — but now I wait. I hope the Director approves before Friday." 😐 Hopeful but uncertain. | No visibility into approval timeline or approver workload. | Estimated approval time based on queue depth. Batch approval for related changes. |

### Emotional Journey
```
😐 ─── 😐 ─── 😐 ─── 😐 ─── 😟 ─── 😐 ─── 😟 ─── 😟 ─── 😐
Access Filter Open   Navigate Postcodes Income Save    Repeat  Submit
```

---

## Journey 4 — EA Self-Service Profile Update

**Persona:** Marcus Thompson — Enforcement Agent
**Goal:** Update his home address and phone number after moving to a new residence.
**Trigger:** Marcus moved house over the weekend and needs to update his contact details.

| Stage | Actions | Thoughts & Feelings | Pain Points | Opportunities |
|-------|---------|---------------------|-------------|---------------|
| **1. Log In** | Opens Advance on mobile. Logs in as EA. Navigates to Records List. | "I just need to update my address — should be quick." 🙂 Optimistic. | Mobile login flow may not be optimised (password manager, SSO). | Mobile-friendly SSO with biometric login (future). |
| **2. Find My Record** | Searches for his own name or navigates to his profile. | "I can see all EAs in the list — I just need my own." 😐 Distracted by unnecessary records. | No "My Profile" shortcut. Must search the full list. | "My Profile" shortcut on dashboard or top navigation area. |
| **3. Open for Editing** | Clicks Edit on his record. System loads with RBAC — only accessible entities visible. | "Okay — I can see Personal Details and Enforcement. That makes sense." 🙂 Clear. | If RBAC misconfigured, sees entities he shouldn't or misses ones he should. | RBAC banner confirms: "You can edit: Phone, Email, Address. Other fields are view-only." |
| **4. Edit Personal Details** | Navigates to Step 1 — Personal Details. Updates Address fields (Line 1–3, Town, Postcode). Updates phone number. | "Address lookup works! And the phone field validates as I type. Smooth." 🙂 Satisfied. | If PAF lookup fails, no manual override guidance. | Fallback: "Can't find your address? Enter it manually." link. |
| **5. View-Only Fields** | Sees fields like Name, Talos ID, Employment marked with "View" tags. Cannot interact with them. | "Makes sense — I shouldn't change my own name in the system." 🙂 Understands. | Some view-only fields have no context (e.g., "Cost Centre" — Marcus doesn't know what this means). | Tooltip for unfamiliar fields: "Your cost centre is managed by your team lead." |
| **6. Save** | Clicks "Save & Continue" then "Save Record." Receives success popup. | "That was easy — three minutes. Address updated." 🙂 Relieved. | No confirmation of what specifically was changed in the success message. | Success message: "Address and phone number updated. Pending approval by [Manager Name]." |
| **7. Wait for Approval** | Returns to his normal duties. Change is pending approval by his Enforcement Manager. | "I hope Rachel approves it soon so my new address is in the system." 😐 Passive. | No notification when approval completes. Must log back in to check. | Push notification / email: "Your address change was approved on [date]." |

### Emotional Journey
```
🙂 ─── 😐 ─── 🙂 ─── 🙂 ─── 🙂 ─── 🙂 ─── 😐
Login  Find   Open   Edit   View   Save   Wait
```

---

## Journey 5 — Finance View-Only Record Lookup

**Persona:** Claire Adams — Finance Analyst
**Goal:** Look up banking details and contract status for an EA to process a quarterly payment.
**Trigger:** Finance team needs to verify banking details before batch payment processing.

| Stage | Actions | Thoughts & Feelings | Pain Points | Opportunities |
|-------|---------|---------------------|-------------|---------------|
| **1. Log In** | Opens Advance. Logs in as Finance role. | "I need to check 15 EA records for the payment run." 😐 Task-oriented. | — | — |
| **2. Search** | Searches for EA by name or ID. | "Global search works well — found them immediately." 🙂 Efficient. | If searching by partial name, results may be ambiguous. | Search suggestions with EA ID, Brand, and Status for disambiguation. |
| **3. Open Record** | Opens View page. RBAC shows only Personal Details and Contract entities. All fields are read-only. | "Good — I only see what I need. And it's clearly read-only." 🙂 Trusts the interface. | No visual read-only banner (only RBAC banner which may not be interpreted as "you can't edit"). | Explicit "View Only" badge on page header. No edit buttons visible at all. |
| **4. Check Banking** | Navigates to Contract record card. Reviews banking details: Account Name, Account Number, Sort Code, Building Society Roll. | "The banking details are here — but are they current? When was this last updated?" 😐 Needs confidence. | No "last updated" timestamp per field or entity. | "Last verified: [date]" per entity. Audit trail link. |
| **5. Cross-Reference** | Compares banking details with payment system. Notes any discrepancies. | "The sort code matches. Account number matches. Good to go." 🙂 Confident. | Must manually compare — no export or copy-to-clipboard function. | "Copy banking details" button. Export entity to CSV/clipboard. |
| **6. Repeat** | Returns to list. Repeats for remaining 14 EAs. | "14 more to go. Wish I could export a list of all banking details in one go." 😟 Tedious. | No batch export. Must open each record individually. | Batch export: select multiple EAs → export Contract entity data to CSV. |

### Emotional Journey
```
😐 ─── 🙂 ─── 🙂 ─── 😐 ─── 🙂 ─── 😟
Login  Search Open   Banking Cross-ref Repeat
```

---

## Summary Matrix

| Journey | Persona | Role | Primary Emotion | Key Pain Point | Top Opportunity |
|---------|---------|------|-----------------|----------------|-----------------|
| 1 — New EA Onboarding | Sarah Mitchell | Keyer | Overwhelmed → Satisfied | 100+ fields across 8 steps | Auto-population, sub-section grouping, summary review |
| 2 — Record Approval | James Whitfield | Verifier | Frustrated → Efficient | No change highlighting or diff view | Change summary panel, before/after comparison |
| 3 — Team Configuration | Rachel Obi | Manager | Frustrated → Fatigued | No batch editing, repetitive workflow | Bulk edit mode, copy-and-apply changes |
| 4 — Self-Service Update | Marcus Thompson | EA | Optimistic → Relieved | No "My Profile" shortcut, unclear editability | My Profile link, clear View tags, proactive notifications |
| 5 — Finance Lookup | Claire Adams | Finance | Efficient → Tedious | No batch export, manual comparison | Batch export, copy-to-clipboard, "last verified" timestamps |
