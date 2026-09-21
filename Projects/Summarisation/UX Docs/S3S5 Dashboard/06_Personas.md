# Personas — DocProcess Stage 3 & Stage 5 Dashboard

**Version**: 1.0 · **Date**: 06 July 2026
**Companion documents**: [04_User_Journeys.md](04_User_Journeys.md), [05_Empathy_Map.md](05_Empathy_Map.md)

Five personas cover the dashboard's primary stakeholder set (BRD §5 + Interview 02 confirmations). Names below are illustrative and mapped to the real stakeholders where the interview transcript names them.

---

## Persona P1 · Template Governance Lead

**Name / Role**: Nat Harkin — Template Governance Lead (Notice IQ DocProcess Organisation)
**Also represents**: Zain Mahmood (co-lead)
**Reports to**: Shelley Stones (Product)
**Location**: London HQ · Hybrid
**Tech comfort**: High (SQL-lite, spreadsheet power user, familiar with dashboards)

### Goals
- Close template gaps so the bot's mitigation coverage climbs quarter-on-quarter (Objective O3).
- Keep custom-mitigation review backlog under 24 h (Objective O2).
- Publish a monthly template-committee pack with clear evidence.
- Reduce dependency on ad-hoc spreadsheet queries.

### Frustrations
- Custom mitigation was previously in a separate widget — now consolidated into the master table but the column shares space with 12 others.
- Free-text agent inputs are inconsistent, no tagging yet (Phase 2).
- No bulk-select-and-promote workflow yet.
- Exports live outside the dashboard.

### Daily tasks
- 09:15 stand-up with Zain on new custom mitigations from yesterday.
- Filter Bot decision = Red + Custom text is not empty; scan patterns.
- Log candidate template additions.
- Attend Friday template-committee call with evidence.
- Update template library after committee sign-off.

### Motivations
- Reducing "Missing" mitigation counts (a personal KPI she quotes in reviews).
- Being cited by Shelley in the board deck ("Governance closed 12 gaps this month").
- Preventing agent burnout from repeated hand-typing.

### Tech comfort
- Notice IQ power user, comfortable with column filters + kebab menus + side panes.
- Prefers keyboard navigation; will use `Tab` and `Escape` on the column-menu.
- Occasionally shares filtered URLs with Zain (needs deep-link support — Phase 2).

### Quotes
> *"Show me all the Red cases where the agent typed something."*
> *"If the same pattern shows up three weeks running, it belongs in the template."*
> *"I'd love a 'flag for review' button so I don't have to leave the table."*

### Devices
- Primary: Windows laptop, dual monitor, 1920 × 1080 each.
- Occasional: iPad for read-only review on trains.

### Accessibility considerations
- No known impairments; uses default OS zoom (100%).
- Prefers keyboard shortcuts — dashboard must have full keyboard operation for column menus.

---

## Persona P2 · Operations Manager

**Name / Role**: Angela Fleming — Operations Manager, DocProcess
**Reports to**: Head of Operations
**Location**: Manchester office · On-site 3 days/week
**Tech comfort**: Medium-high (dashboard consumer, not builder)

### Goals
- Balanced agent workload — no one over/under-loaded.
- Fast triage of any spike in Red or Amber.
- Weekly report to Head of Ops with headline numbers.
- Feed patterns forward to Governance and QA in-context.

### Frustrations
- No week-over-week delta on KPI cards → mental arithmetic each morning.
- Row click doesn't yet drill into full case detail — she opens Notice IQ Cases app in a second tab.
- Cannot flag a row for another team inside the dashboard yet.
- Line chart lacks weekend shading — trend context is thin.

### Daily tasks
- 08:45 morning heat-check — KPI strip + daily volume + top agents.
- 09:00 standup — leads with today's headline number.
- Escalate anomalies via Slack to Governance / QA / Agent.
- 17:00 wrap-up — confirm workload closed, no rollover surprises.

### Motivations
- Team stability — sees dashboard as a "check engine" light.
- Being visible to Product / Governance in escalation loops.
- Simple, calm mornings.

### Tech comfort
- Uses mouse primarily; hovers to reveal kebab menus.
- Comfortable with column filters via the top toolbar; less confident with the kebab column menu.
- Reads chip strip like a receipt — sceptical when it disappears.

### Quotes
> *"In 30 seconds, is today normal?"*
> *"Why is Maria's Red bar longer than everyone else's?"*
> *"I need a 'notify Governance' button on the row."*

### Devices
- Windows laptop; occasional external monitor on office days.
- Slack + Outlook alongside for hand-offs.

### Accessibility considerations
- Presbyopia — prefers 110% browser zoom. Dashboard must remain usable at 125% without horizontal scroll bugs.
- Colour vision normal.

---

## Persona P3 · QA Lead (Stage 3)

**Name / Role**: Priya Menon — QA Lead, Stage 3 Informal Reps
**Reports to**: Head of QA
**Location**: Leeds office · Hybrid
**Tech comfort**: High

### Goals
- Weekly sampling of 10% of amended Stage 3 letters.
- Track amendment patterns for training feedback.
- Zero missed Red cases without documented rationale.
- Clean QA sign-off audit trail.

### Frustrations
- ANPS integration for QA Name is pending (Interview 02 #14).
- No inline Pass/Fail action yet — she uses an external QA spreadsheet.
- Row click does not open PCN case detail.
- Stage 5 rows show `—` for QA — she wants Stage 5 to be filtered out entirely by default.

### Daily tasks
- Filter Letter = Amended, sort Reviewed desc, sample 10 cases.
- Read amendment vs original letter, judge Pass/Fail.
- Log in QA spreadsheet, feed insights to Ops / Governance.
- Attend weekly QA review call, share top patterns.

### Motivations
- Defensibility — every QA decision traceable to source data.
- Reducing over-editing rate (agents amending when not needed).
- Recognition from Product for consistent quality metrics.

### Tech comfort
- Uses keyboard shortcuts frequently; adept with column-menu operator filters (`Equals`, `Is not empty`).
- Multiple tabs open — dashboard on tab 1, PCN detail on tab 2 (Notice IQ Cases), QA spreadsheet on tab 3.

### Quotes
> *"Amended donut, blue arc, table sorted by Reviewed."*
> *"Give me a Pass/Fail button on the row and I'll never leave the dashboard."*
> *"Stage 5 has no QA — I always work in Stage 3 only."*

### Devices
- Windows laptop, dual monitor.
- iPad for read-only during travel.

### Accessibility considerations
- No known impairments; heavy keyboard user — depends on `:focus-visible` outline and `aria-sort` on headers.

---

## Persona P4 · Processing Agent

**Name / Role**: Sarah Khan — Processing Agent (Stage 3 primary, occasional Stage 5)
**Also represents**: James Patel, Maria Lopez, David O'Connor, Priya Ramesh, Tom Bennett, Aisha Rahman, Lewis Carter, Hannah Wright, Marco Rossi
**Reports to**: Angela Fleming (Ops Manager)
**Location**: Manchester office · Full-time on-site
**Tech comfort**: Medium

### Goals
- Understand own decision mix at end of shift.
- See which custom mitigations she typed and how many recurred.
- Learn from own Amber and Red cases.
- Confirm she's not below team average on quality.

### Frustrations
- No "Filter by me" shortcut — types her name every session.
- Global date filter doesn't default to today.
- Column kebab menu is subtle — she rarely uses Sort.
- Cannot see inline team benchmark ("vs team average").

### Daily tasks
- 08:30 log in, start pulling PCN cases from the queue.
- Process 20 – 40 cases per day depending on complexity.
- End of shift (17:00), opens dashboard for 3–4 min self-review.
- Weekly team huddle — discusses top patterns.

### Motivations
- Personal quality — pride in low amendment rate.
- Being ranked highly on Top agents widget.
- Learning from own custom mitigation patterns to speed up future cases.

### Tech comfort
- Uses mouse; relies on visible chips to confirm filters.
- Rarely uses column-visibility menu.
- Trusts default column layout and top toolbar.

### Quotes
> *"How was I today?"*
> *"Wish there was a 'me' button — I always forget how to spell my own name in a filter box."*
> *"If I amended more than three, I want to know why."*

### Devices
- Windows desktop workstation.
- Personal phone for after-hours quick check (not a supported use case yet — Phase 4 mobile companion).

### Accessibility considerations
- Colour vision normal.
- Uses default OS zoom (100%).
- No screen-reader dependency; but relies on colour + text on RAG chips.

---

## Persona P5 · Product Owner

**Name / Role**: Shelley Stones — Product Owner, DocProcess Organisation
**Reports to**: Head of Product
**Location**: London HQ · Hybrid
**Tech comfort**: High

### Goals
- Prove Stage 3 / Stage 5 automation value each quarter.
- Prioritise the roadmap based on template gaps + agent patterns.
- Represent DocProcess in cross-team board meetings.
- Reduce time spent on manual data pulls.

### Frustrations
- Widget screenshots for board deck are manual.
- Deltas (W/W, M/M) shown only as text, not as visual chips.
- No CSV export yet.
- Trend line lacks weekend/holiday shading — she has to explain gaps verbally.

### Daily tasks
- Weekly Friday board pack — 3 KPIs + trend narrative.
- Monthly steerco with CFO/CEO — combined dashboard on-screen.
- Ad-hoc drills when Governance / QA / Ops raise anomalies.
- Sponsor Phase 2 / 3 enhancements.

### Motivations
- Clear evidence of automation ROI.
- Stakeholder confidence in the platform.
- Reducing her own manual reporting overhead.

### Tech comfort
- Very high — will happily use the URL query string once it exists (Phase 2) to bookmark filtered views.
- Uses `Cmd+F` to find widgets on the page.
- Comfortable with keyboard-only navigation.

### Quotes
> *"Combined view, this week vs last week, in three widgets."*
> *"Give me one-click export and I'll build the board deck in five minutes."*
> *"If a widget doesn't help someone make a decision, take it off."*

### Devices
- MacBook, external 4K monitor at home.
- Reads on iPhone in transit.

### Accessibility considerations
- Deuteranomaly (mild) — depends on the text + shape + colour combo on RAG chips.
- Uses browser dark mode occasionally (not currently supported — nice-to-have Phase 3+).

---

## Persona interaction matrix

Who works with whom in the dashboard context.

|  | P1 Nat | P2 Angela | P3 Priya | P4 Sarah | P5 Shelley |
|---|:---:|:---:|:---:|:---:|:---:|
| **P1 Nat** (Governance) | — | Escalates from | ← QA insights | Reviews outputs | Reports up |
| **P2 Angela** (Ops) | Escalates up | — | Escalates to | Manages | Reports up |
| **P3 Priya** (QA) | Feeds patterns | Feeds patterns | — | QA'd by | Reports up |
| **P4 Sarah** (Agent) | Creates data | Reports to | QA'd by | — | Represents |
| **P5 Shelley** (PO) | Sponsors | Sponsors | Sponsors | Represents | — |

Every dashboard interaction ultimately serves at least one of these five perspectives. Design decisions should be traceable to a persona's stated goal or frustration.

---

## Non-user personas (implicit)

For completeness, these stakeholders influence but do not directly use the dashboard interactively:

- **CFO / CEO** — read board summary slides that Shelley (P5) exports.
- **Client Councils (Camden, Westminster, TfL, Manchester, Birmingham, Leeds, Bristol)** — indirect consumers via internal reporting to their SLAs.
- **Notice IQ Platform Team** — hosting, permissions, uptime; consume this dashboard as a customer.
- **Delivery / LV Team** — build the Phase-N functionality; consume the design specs.
