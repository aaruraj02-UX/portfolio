# Personas — Acme Customer App Landing Page

> **Related:** [01_UX_Brief.md](01_UX_Brief.md) · [05_Empathy_Maps.md](05_Empathy_Maps.md) · BRD §4 (Users and Roles)
> **Total:** 5 personas — 2 customer-facing, 4 internal (Customer App users).

> Personas are research-informed proxies. Names, photos, and quotes are illustrative. All attributes derived from the BRD and the prototype.

---

## P1 — Emma Carter · Citizen / Debtor (primary customer)

> *"Just tell me what I owe and let me pay."*

| Attribute | Detail |
|-----------|--------|
| **Age / location** | 38, West Midlands, UK |
| **Role** | Working mother, retail manager |
| **Channels** | Mobile web (Android, 4G) — primary; email — secondary |
| **Tech comfort** | Medium — uses banking apps confidently; cautious about unfamiliar links |

### Goals
- Resolve the council-tax case quickly and privately.
- Confirm the case is genuinely from Acme before entering details.
- Understand fees so she isn't surprised again.
- Receive a clear receipt.

### Frustrations
- Generic SMS links feel like phishing.
- Jargon like "Compliance fee" without explanation.
- Fee breakdown defaults to collapsed → an extra tap she didn't want.
- Mobile pages with primary CTAs above the fold she has to scroll past.

### Daily Tasks (relevant)
- Manages family finances on her phone in 5–10 min windows.
- Quickly assesses legitimacy of unknown messages.
- Pays bills via mobile banking after work.

### Motivations
- Closing loops; not leaving things hanging.
- Protecting her family from financial stress.
- Keeping her record clean.

### Tech Comfort: 3 / 5

### Quotes
- *"If I can pay it now, it's gone."*
- *"I don't want to phone anyone if I don't have to."*
- *"I just want to know the total — once."*

### Design Implications
- Pay Now CTA must be reachable one-handed on devices ≥ 360 px.
- Fee breakdown defaults to **expanded** on first view.
- Strong brand reassurance + retries-remaining at sign-in.
- Plain-English explanation accompanying every fee/stage label.

---

## P2 — Derek Williams · Older citizen, low digital confidence

> *"Computers and I, we don't get along."*

| Attribute | Detail |
|-----------|--------|
| **Age / location** | 71, rural Devon |
| **Role** | Retired; lives alone; daughter helps with admin |
| **Channels** | Basic Android phone (smaller screen); telephone preferred |
| **Tech comfort** | Low — texts and calls; rarely uses apps |

### Goals
- Sort out the parking-charge notice without "doing the wrong thing".
- Talk to a human if anything feels confusing.
- Avoid further fees or bailiff escalation.

### Frustrations
- Small text on his phone.
- Sign-in retries used up by typos.
- Locked-account screens that read like an accusation.
- No clear "call us" link when stuck.

### Daily Tasks (relevant)
- Reads SMS; phones his daughter or the sender for clarification.
- Visits the post office for written correspondence.

### Motivations
- Doing the right thing.
- Avoiding embarrassment in front of family.
- Maintaining independence.

### Tech Comfort: 1 / 5

### Quotes
- *"I'd rather talk to someone."*
- *"It said 'Account locked'. What does that mean?"*
- *"If I'd known I had two tries left, I'd have been more careful."*

### Design Implications
- ≥ 16 px base font; ≥ 44 × 44 px hit areas.
- Inline "Need help?" link from the 2nd failed sign-in attempt.
- Locked screen offers at least two contact channels with WCAG-compliant link styling.
- Tone of voice: factual, supportive, never punitive.

---

## P3 — Olivia Bennett · Author (Content / Business Analyst)

> *"Give me a clean editor and a fast Reviewer, and I'll get it live by lunch."*

| Attribute | Detail |
|-----------|--------|
| **Age / location** | 31, Coventry (hybrid) |
| **Role** | Comms / business analyst in the Customer Operations team |
| **Channels** | Customer App (desktop web, MacBook + 24" display) |
| **Tech comfort** | High — comfortable with CMS tools; not a developer |

### Goals
- Land copy and content changes accurately and quickly.
- Keep variables and hyperlinks correctly resolved.
- Avoid breaking layout or accessibility.
- Submit clean drafts that pass review first time.

### Frustrations
- Waiting on Reviewers / Publishers.
- Rejections without specific feedback.
- No diff view in MVP.
- Spellcheck red-underlining token chips.

### Daily Tasks
- 4–10 content edits a day across all four template tabs.
- Inserts variables (`{{case_reference}}`, `{{balance}}`).
- Coordinates with Compliance on phrasing.
- Monitors the audit drawer for status.

### Motivations
- Pride in clean, compliant copy.
- Productivity; closing tickets.
- Trust from Reviewers ("Olivia's submissions are always tidy").

### Tech Comfort: 4 / 5

### Quotes
- *"Where exactly does this string land on the live page?"*
- *"Don't make me copy-paste a URL — give me a picker."*
- *"If I can see the customer's view, I can ship faster."*

### Design Implications
- WYSIWYE editor (already enforced in prototype).
- Variable picker; hyperlink editor; locked token chips.
- Audit drawer reachable from anywhere without losing draft.
- Tooltip for any disabled action explaining why.
- Status pill always visible and tied to the active template.

---

## P4 — Rachel Lawrence · Reviewer (Compliance Validator)

> *"If it isn't policy-aligned, it isn't going out."*

| Attribute | Detail |
|-----------|--------|
| **Age / location** | 44, Leeds |
| **Role** | Senior compliance analyst; deputy to the Compliance Lead |
| **Channels** | Customer App (desktop web) + ticketing system |
| **Tech comfort** | Medium-high |

### Goals
- Approve only what genuinely meets policy.
- Reject quickly and clearly when something is off.
- Keep an unbroken paper trail.
- Stay within SoD rules.

### Frustrations
- Lack of side-by-side diff in MVP.
- Backlogs piling up on Friday afternoons.
- Authors querying status when the audit drawer already shows it.
- Being asked to approve content she authored (SoD violation).

### Daily Tasks
- 5–15 reviews per day across all template families.
- Cross-checks copy against the compliance handbook.
- Writes precise rejection comments.
- Flags repeated misses for training.

### Motivations
- Protecting the company and the customer from compliance harm.
- Building Author capability.
- Being known for fair, well-reasoned reviews.

### Tech Comfort: 4 / 5

### Quotes
- *"I need to see what changed, not the whole page."*
- *"If I can't comment, I can't reject."*
- *"Show me mobile and desktop on one screen."*

### Design Implications
- Mandatory comment on Reject (already enforced).
- Preview supports desktop ↔ mobile toggle.
- Approve button disabled with explanatory tooltip when Reviewer was the Author.
- Audit drawer pre-filtered to the active template + change request.

---

## P5 — Patrick O'Hara · Publisher (Senior Business Owner)

> *"My signature is the last gate. I am not the first reader."*

| Attribute | Detail |
|-----------|--------|
| **Age / location** | 52, Manchester |
| **Role** | Head of Customer Operations; accountable for go-live |
| **Channels** | Customer App (laptop, often tethered to a phone) |
| **Tech comfort** | Medium-high |

### Goals
- Publish only thoroughly-reviewed content.
- Refuse anything that looks risky — without being destructive.
- Hold a clean audit record with his name on it.
- Stay productive on the move.

### Frustrations
- No quick rollback in MVP.
- Initial confusion between Reject and Refuse copy / icons.
- Wanting parallel mobile + desktop preview but only one viewport at a time in Phase 1.

### Daily Tasks
- Reviews the In Publish queue at start and end of day.
- Opens Live Preview for every release.
- Refuses with clear reasons; calls the Author by phone afterward where helpful.

### Motivations
- Accountability; reputation.
- Operational excellence.
- Avoiding compliance incidents.

### Tech Comfort: 4 / 5

### Quotes
- *"Show me both viewports."*
- *"If I refuse, can the Author rework without re-doing everything?"*
- *"I never want to publish blind."*

### Design Implications
- Refuse modal copy and icon clearly distinct from Reject (already implemented: `block` vs `cancel`).
- Refuse returns the request to Author; never destroys draft.
- Live Preview is one click away at all times.
- Mobile-friendly publish path so Patrick can act from the train.

---

## Persona × Journey × Tab Matrix

| Persona | Primary Journey | Primary Surface | Primary Tab(s) |
|---------|------------------|------------------|----------------|
| Emma (P1) | J1, J3 | Customer Landing Pages | Home, Make a Payment, Alerts |
| Derek (P2) | J2 | Customer Landing Pages | Sign-in, Support |
| Olivia (P3) | J4, J5 | Customer App editor | All four template tabs |
| Rachel (P4) | J4, J5 | Customer App editor | All four template tabs |
| Patrick (P5) | J4 | Customer App editor | All four template tabs |

---

## Inclusion notes

- Personas explicitly include a **low-digital-confidence** customer (Derek) and a **stressed working-parent** customer (Emma). The internal personas cover all three roles defined in the BRD plus Compliance Lead oversight (covered as a supporting role within Patrick's and Rachel's flows; given a dedicated dashboard in Phase 4).
- All personas designed against WCAG 2.2 AA defaults (font ≥ 16 px, contrast ≥ 4.5:1, hit areas ≥ 44 × 44 px, keyboard-only paths).
- No persona depends on assumed knowledge of legal terminology — copy must explain it.
