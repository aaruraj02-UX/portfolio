# Empathy Maps — Acme Customer App Landing Page

> **Related:** [06_Personas.md](06_Personas.md) · [04_User_Journeys.md](04_User_Journeys.md) · BRD §4 (Users and Roles)
> **Scope:** One empathy map per primary persona — five total.

---

## 1. Emma — Citizen / Debtor (mobile-first, mid-confidence)

**Context:** Working mother, 38, mid-range Android, 4G in suburban West Midlands. Received an SMS link about a council-tax case.

### Think & Feel
- *"Is this scam or real?"*
- *"How much do I actually owe?"*
- *"Will my partner / employer find out?"*
- *"Can I just pay this and move on?"*
- Quiet shame; protective of family time.

### See
- A bare SMS with a generic URL.
- A small phone screen at 7pm with the kids around.
- Other bills, a Acme letter from weeks ago she half-read.
- Lots of online warnings about phishing.

### Say & Do
- Reads SMS carefully, looking for Acme brand.
- Says: *"OK let me just get this done."*
- Opens link, scrutinises the sign-in screen.
- Won't enter card details until the page looks legitimate.

### Hear
- Friends warning about scams.
- Adverts saying "always check the URL".
- Local-authority spokespeople saying "pay early to avoid extra fees".

### Pain Points
- Generic SMS link gives no proof of legitimacy.
- Tiny postcode input box; she fat-fingers it.
- Doesn't understand "Compliance fee" terminology.
- No visible reassurance of how many retries remain at sign-in.
- Doesn't know if her data is stored locally.

### Gains
- One large, clear "Pay Now" CTA.
- Single review screen before the gateway.
- Calm, non-judgmental tone.
- Mobile-sticky CTA she can press one-handed.
- Email + SMS confirmation she can show her partner.

---

## 2. Derek — Older citizen, low digital confidence

**Context:** 71, retired, rural Devon, basic Android phone, occasional Wi-Fi. Received an SMS about an unpaid parking charge.

### Think & Feel
- *"This wasn't even me driving."*
- *"Computers are not for me."*
- *"What if I make it worse by tapping the wrong thing?"*
- Embarrassed at lack of confidence; reluctant to ask family.

### See
- Small fonts; menus he doesn't recognise.
- Authoritative red icons that worry him.
- The Acme letter on the kitchen table.

### Say & Do
- Types slowly; makes typos.
- Reads each line out loud.
- Calls the support line when stuck rather than retrying.
- Trusts voice more than chat.

### Hear
- Adverts warning of bailiff visits.
- News stories about debt and fees.
- His daughter saying "Dad, just call them."

### Pain Points
- Three attempts is not enough margin for typos.
- No clear "call us" link at the moment he gets stuck.
- Locked screen reads like punishment.
- No callback option after lock-out.

### Gains
- Generous tap targets (≥ 44 px).
- Clear, big "Call us" CTA on the locked page.
- A polite locked-screen message with two channels.
- Post-call SMS receipt confirming the payment.

---

## 3. Olivia — Author (Content / Business Analyst)

**Context:** 31, comms team at Acme, hybrid worker, MacBook + 24" display. Edits Landing Page copy across enforcement, payments, support and alerts. Reports into Compliance.

### Think & Feel
- *"Did I keep the legal phrasing intact?"*
- *"Will the Reviewer push this back?"*
- *"Why do I have to wait two days for a small typo fix?"*
- Pride in her copy; mild frustration at slow approvals.

### See
- Four template tabs in the editor.
- The same panels customers see — what-you-see-is-what-you-edit.
- Status pill: she watches it move Draft → In Review.
- Audit drawer with her name everywhere.

### Say & Do
- Clicks into a panel, edits inline.
- Uses the variable picker to insert `{{case_reference}}`.
- Opens Live Preview before submitting.
- Adds a clear ticket title.
- Submits and Slacks the Reviewer.

### Hear
- Reviewers saying "this needs to be tighter."
- Customers' anecdotes from the support team.
- Compliance saying "we cannot say X anymore."

### Pain Points
- No diff view in MVP — she has to remember what she changed.
- Cannot Approve her own work (SoD rule), but the button still shows enabled briefly.
- Re-edit cycle after rejection loses inline context.
- Tokens occasionally get spell-checked and red-underlined.

### Gains
- Click-to-edit panels keep her in flow.
- Status pill makes "where is this?" answer one glance.
- Audit drawer surfaces who rejected and why.
- Mandatory comment on Reject means she always has feedback to act on.

---

## 4. Rachel — Reviewer (Compliance Validator)

**Context:** 44, compliance lead's deputy. Pulled in many directions. Reviews 5–15 requests/day.

### Think & Feel
- *"Does this pass policy?"*
- *"Is there a regulatory risk?"*
- *"Am I being asked to act as Author too?"*
- Cautious, slightly weary, accountable.

### See
- Lots of submissions in her queue (ticketing system + editor).
- Status pill on each: In Review.
- Editor preview that mirrors live page.
- Her own past rejections in the audit log.

### Say & Do
- Reads each panel deliberately.
- Opens Preview; flips desktop ↔ mobile.
- Clicks Reject for anything not crystal-compliant.
- Writes detailed comments to Author.
- Avoids approving anything she Authored herself.

### Hear
- Compliance team mandates on phrasing.
- Authors asking "any updates on my submission?"
- Publishers asking "is this ready?"

### Pain Points
- No side-by-side diff in MVP.
- Cannot tell at a glance which Author submitted (until opening details).
- Modal Reject comment is plain text only.

### Gains
- Mandatory comment field means she never accidentally rejects with no reason.
- Audit drawer in-context — she can verify history without leaving the screen.
- Tab visibility CSS hides Refuse on Reject flow → less cognitive noise.

---

## 5. Patrick — Publisher (Senior Business Owner)

**Context:** 52, accountable executive. Publishes selectively. Often on the move.

### Think & Feel
- *"Is this truly ready for customers?"*
- *"Have we tested mobile?"*
- *"If this goes wrong, what's the rollback path?"*
- Confident, signature-conscious.

### See
- The In Publish queue (small but high-stakes).
- Live Preview rendering both desktop & mobile.
- Status pill state machine.
- Final audit log entry waiting to read his name.

### Say & Do
- Opens Live Preview every time.
- Refuses publish if anything looks off (mandatory comment).
- Slacks Author when refusing, even though the audit comment is enough.
- Publishes; sees Published toast; closes laptop.

### Hear
- Operations team asking "when does the change go live?"
- Compliance saying "we're audited next week."
- His own voice: *"belt and braces."*

### Pain Points
- No rollback button in MVP (would have to re-author the previous version).
- Refuse modal copy not differentiated enough from Reject — initially confused.
- No mobile-side-by-side in Phase 1 preview.

### Gains
- Status pill + audit entries make accountability transparent.
- Live Preview toggle protects him from publishing broken layouts.
- Refuse action is reversible by re-submission, never destroys content.

---

## Cross-cutting observations

| Observation | Affects | Action |
|-------------|---------|--------|
| Trust is fragile at sign-in | All citizens | Make brand & retries-remaining unmistakable |
| Tone of voice carries legal weight | Authors / Reviewers | Compliance-approved template library |
| Status visibility removes anxiety | All internal users | Keep status pill always-on |
| Audit trail must be inspectable in seconds, not minutes | Compliance Lead | Phase 4: faceted filters |
| Mobile parity matters for Publishers too | Patrick | Live Preview desktop ↔ mobile toggle |
