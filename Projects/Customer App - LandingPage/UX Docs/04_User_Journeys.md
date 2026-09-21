# User Journeys — Acme Customer App Landing Page

> **Related:** [01_UX_Brief.md](01_UX_Brief.md) · [03_Information_Architecture.md](03_Information_Architecture.md) · BRD §5, §11
> **Personas:** see [06_Personas.md](06_Personas.md). This document maps **5 journeys** end-to-end.

---

## Journey 1 — Customer: SMS → Pay Now (happy path)

**Persona:** Emma — Citizen / Debtor
**Trigger:** Receives an SMS containing a generic link from Acme
**Goal:** Understand the case, pay outstanding amount, and get back to her evening
**Channels:** Mobile web (mid-range Android, 4G)

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Receive SMS** | Reads SMS; taps generic link | "Is this a scam?" | Suspicious, anxious | Generic link offers no proof of legitimacy | Branded short link; SMS sender ID "Acme" |
| **2. Sign-In / ID&V** | Lands on `/sign-in`; enters postcode + secondary input | "Will my data be safe?" | Cautious | Unsure what counts as "secondary input"; no reassurance about retries left | Inline helper text; show retries remaining; visible padlock + Acme brand |
| **3. Authentication success** | Session created | "OK, this looks real" | Relieved | None — provided success is fast | Sub-1 s transition; subtle micro-success animation |
| **4. Home / Timeline loads** | Sees case summary, timeline, "Pay Now" CTA | "How much do I owe? What stage am I at?" | Focused, slight stress | Timeline jargon ("Compliance fee") not always understood | Plain-English hover/help on each stage |
| **5. Reviews case summary** | Reads balance + fees | "Are these fees right?" | Wary | Fee breakdown is collapsed; click cost | Default fee breakdown to expanded on first view |
| **6. Taps Pay Now** | Goes to `/pay` | "Quickest way through" | Determined | None on happy path | Sticky CTA on mobile keeps action one-thumb |
| **7. Confirms amount** | `/pay/review` confirms total | "Let me double-check" | Cautious | Two confirm screens feel redundant | Single review screen — already implemented |
| **8. Pays via gateway** | External secure gateway | "Hope this goes through" | Tense | Loss of brand context on gateway | Branded handoff banner pre-redirect |
| **9. Success** | `/pay/success` confirms | "Done. Done. Done." | Relieved, satisfied | None | Show receipt download + "What happens next" |
| **10. Exit** | Closes tab | "Good." | Calm | Could miss confirmation email | Send confirmation email + SMS; surface "Email sent to..." |

### Acceptance criteria
- **AC-J1-1** Median time SMS → payment confirmation ≤ 4 minutes on mid-range Android over 4G.
- **AC-J1-2** Pay Now CTA is reachable with one thumb on devices ≥ 360 px wide.
- **AC-J1-3** All copy in stages 4–9 references variables that resolve at runtime, never client-side.
- **AC-J1-4** Sign-in retries-remaining indicator meets WCAG 2.2 AA contrast & is announced to screen readers.

---

## Journey 2 — Customer: Stuck at sign-in, then route to support

**Persona:** Derek — older citizen, low digital confidence
**Trigger:** Receives SMS; struggles to verify identity
**Goal:** Find a way to pay without going through the website
**Channels:** Mobile web, then voice

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Open link** | Taps SMS link | "What do I have to do?" | Hesitant | Tiny text on phone | Larger base font (≥ 16 px) |
| **2. Enter postcode** | Types postcode | "Was it 7BD or B7D?" | Anxious | Typo on second attempt | Auto-format / case-insensitive postcode |
| **3. Retry** | Sees "2 attempts remaining" | "I'll never get this right" | Frustrated | No "help" link at this point | Inline "Need help?" link to support telephone |
| **4. Locked out** | Account locked after 3 fails | "Now what?" | Resigned | No clear next step | Locked screen offers: try later, call us, written contact |
| **5. Calls support** | Phones the number shown | "Please pick up" | Stressed | Wait time unknown | Pre-call wait estimate; callback option |
| **6. Agent assists** | Agent verifies & takes payment over phone | "Finally" | Relieved | Felt abandoned by digital | Post-call SMS confirming payment + emailed receipt |

### Acceptance criteria
- **AC-J2-1** Lock-out screen presents at least 2 contact channels with WCAG-compliant link styling.
- **AC-J2-2** Inline help link appears from the 2nd failed attempt onward.
- **AC-J2-3** Locked state does not expose any case data.

---

## Journey 3 — Customer: Sees Late-Fee alert popup

**Persona:** Emma (returning)
**Trigger:** Late-fee added to her case since previous session
**Goal:** Understand the new fee and decide

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| **1. Re-authenticate** | Lands on `/home` | "Hope nothing's changed" | Wary | None | – |
| **2. Late-fee modal opens** | Centred dialog: red warning icon, "£200 added" | "Why now? Why so much?" | Shock, anger | Modal can feel aggressive | Calm, factual tone; concrete reason |
| **3. Reads body & total** | Total amount due today: £1,400 | "OK so this is what I owe in full" | Resigned | None | – |
| **4. Taps Make payment now** | Goes to `/pay` | "Get it over with" | Determined | – | – |
| **5. Pays or exits** | Same as Journey 1 from step 7 onward | – | – | – | – |

### Acceptance criteria
- **AC-J3-1** Alert is dismissible with both Close (X) and ESC.
- **AC-J3-2** Alert content references runtime variables; no hardcoded amounts in the published template.
- **AC-J3-3** Red warning icon has `aria-hidden="true"` because meaning is carried by the heading text.
- **AC-J3-4** Modal traps focus; closes return focus to the trigger.

---

## Journey 4 — Internal: Author edits → Reviewer approves → Publisher publishes

**Personas:** Olivia (Author), Rachel (Reviewer), Patrick (Publisher)
**Trigger:** Compliance directive: update Support page complaints wording
**Goal:** Get the new wording live within the working day, fully audited

| Stage | Actor | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|-------|---------|----------|----------|-------------|---------------|
| **1. Open editor** | Olivia | Opens Customer App → Landing Page Settings → Support card | "Where exactly is the wording?" | Focused | Panel names not always matching live headings | Panel name = live heading (already enforced) |
| **2. Click-to-edit panel** | Olivia | Clicks the Complaints panel; inline editor activates | "OK familiar pattern" | Confident | Worry about breaking layout | Structural elements remain locked |
| **3. Edit copy + insert variable** | Olivia | Edits text; inserts `{{complaints_url}}` via picker | "Did I miss anything?" | Careful | Spellcheck overlap with chip tokens | Token chips skip spellcheck |
| **4. Save draft** | Olivia | Hits Save changes; status pill → In Review | "Submitted, fingers crossed" | Relieved | None | Toast confirms with audit entry link |
| **5. Audit entry written** | system | Author/edit/timestamp recorded | – | – | – | Visible in shared audit drawer |
| **6. Reviewer notified** | Rachel | Sees request in ticketing system; opens editor | "What's actually changed?" | Curious | Diff view only in Phase 4 | Side-by-side diff (roadmap) |
| **7. Reviews + Approve** | Rachel | Reads change in Preview; clicks Approve; status → In Publish | "Looks compliant" | Confident | Cannot Approve if she was Author (SoD) | Tooltip explains ineligibility |
| **8. Publisher reviews** | Patrick | Opens editor; clicks Live Preview to see desktop + mobile rendering | "How will customers see this?" | Cautious | Wants to see mobile and desktop together | Live Preview toggle (in prototype) |
| **9. Publish** | Patrick | Clicks Publish; confirms modal; status → Published | "Live now" | Satisfied | None | Toast + audit entry |
| **10. Compliance review** | Compliance Lead | Opens audit log; filters by template = Support, date = today | "Trace it end to end" | Reassured | Volume — Phase 4 adds filters | Faceted filters on roadmap |

### Acceptance criteria
- **AC-J4-1** Same user cannot Author + Approve; the Approve button is disabled with explanation.
- **AC-J4-2** Every state transition writes an audit entry with user + UTC timestamp + payload reference.
- **AC-J4-3** Status pill must reflect server-confirmed state, not optimistic UI.
- **AC-J4-4** Lead-time SLA: median ≤ 8 working hours from Submit → Publish (KPI O-OPS-1).

---

## Journey 5 — Internal: Reviewer rejects with feedback (rework loop)

**Personas:** Olivia (Author), Rachel (Reviewer)
**Trigger:** Author submits Support page edit; Reviewer spots compliance issue

| Stage | Actor | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|-------|---------|----------|----------|-------------|---------------|
| **1. Receive request** | Rachel | Opens editor on the submitted change | "Does this meet policy?" | Critical | None | – |
| **2. Identify issue** | Rachel | Spots non-compliant phrasing | "Needs a tweak" | Decided | – | – |
| **3. Reject modal** | Rachel | Clicks Reject; modal demands a comment | "I need to be specific" | Constructive | Free-text only; no rich formatting | Markdown support (roadmap) |
| **4. Submit rejection** | Rachel | Types reason, clicks Submit; status → Draft (back to Author) | "Sent" | Done | – | Toast + audit entry |
| **5. Author rework** | Olivia | Sees status reverted; reads comment in audit drawer | "Got it — I'll change phrasing" | Motivated, slightly bruised | Comment lives only in audit; hard to refer back while editing | Inline comment thread (roadmap) |
| **6. Re-submit** | Olivia | Updates and re-submits; cycle continues | "Round 2" | Determined | – | – |

### Acceptance criteria
- **AC-J5-1** Reject modal requires a non-empty comment; submit is disabled until valid.
- **AC-J5-2** Rejection comment appears in the audit drawer with full attribution.
- **AC-J5-3** Status returns to Draft (not "Rejected") so the Author owns the next move.
- **AC-J5-4** The Reviewer who rejected may not Approve the resubmission unless re-assigned per policy.

---

## Cross-Journey Sync / Conflict Handling

| Scenario | Handling |
|----------|----------|
| Two Authors edit the same template concurrently | Optimistic lock with version field; the second submit shows a conflict modal with diff & merge or override |
| Case data changes during Live Preview | Preview re-fetches on open; warning if data is staler than 60 s |
| Network drop while editing | Local draft preserved; "Working offline" toast; auto-resync on reconnect |
| Session expires mid-edit | Modal: "Sign in to keep your changes"; never silently discards |
| Audit log unavailable on Publish | Block publish; show retry; never publish without a verified audit entry |
