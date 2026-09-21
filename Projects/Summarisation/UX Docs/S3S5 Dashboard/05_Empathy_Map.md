# Empathy Maps — DocProcess Stage 3 & Stage 5 Dashboard

**Version**: 1.0 · **Date**: 06 July 2026
**Companion documents**: [04_User_Journeys.md](04_User_Journeys.md), [06_Personas.md](06_Personas.md)

Each empathy map follows the org template (Think & Feel · See · Say & Do · Hear · Pain Points · Gains) and emphasises the specific frustrations captured in Interview 01 & 02 and observed during prototype iteration.

---

## Empathy Map E1 · Template Governance Lead (Nat Harkin)

**Context**: Reviews custom mitigations twice weekly. Runs the template-governance stand-up with Zain. Reports to Shelley.

### Think & Feel
- "The bot is only as good as the template — every missing pattern is my problem to close."
- "If I miss a recurring custom mitigation, the same agents will keep hand-typing it."
- Worried about **template drift** — versions, ownership, sign-off.
- Cautiously optimistic when patterns are obvious; frustrated when free text is inconsistent.

### See
- KPI strip Red count that never gets to zero.
- Long lists of `.cm-cell` rows with wildly varied phrasing for the same underlying reason.
- The "Missing" chip in Mitigation column — feels like a personal task list.
- Weekly template-committee slide deck that still leans on manual pattern-spotting.

### Say & Do
- Says: *"Show me all the Red cases where the agent typed something."*
- Filters by **Bot decision = Red** and **Custom / Selected Mitigation = Is not empty**.
- Copies PCN + agent + text into a spreadsheet for the committee.
- Slacks Zain when a new pattern emerges.

### Hear
- From agents: *"I keep typing the same thing — can't you add it to the list?"*
- From Ops: *"Camden's residents-bay Red is spiking again."*
- From Shelley: *"How many template gaps did we close this quarter?"*

### Pain Points
- Free text is unstructured — no grouping / tagging until Phase 2.
- No bulk-select from the master table to promote candidates.
- Column kebab menu is discoverable only on hover.
- Export lives outside the dashboard; PCN + text copy-paste is fiddly.
- Custom mitigation used to be in a separate widget — the merge into the master table is helpful but the column is now competing with 12 others.

### Gains
- One filter combo isolates review pool in seconds.
- Truncated cells expose full text on hover via `data-full`.
- Ranked lists (Top contravention codes, Amber reasons) surface hot patterns quickly.
- Widget-to-table drill lets her jump from "31% of cases are Code 12" directly to those PCNs.

---

## Empathy Map E2 · Operations Manager (Angela Fleming)

**Context**: Runs the daily standup, watches team workload, escalates anomalies. On many calls; needs fast answers.

### Think & Feel
- "I need to know in 30 seconds whether today is normal."
- Anxious about **agent burnout** if workload skews to one person.
- Reassured by consistent visual patterns — dislikes surprises in colour usage.
- Slightly impatient — will not click 4 times to get an answer.

### See
- KPI strip and daily volume line first.
- Stage compare strip second — is Stage 5 catching up?
- Top agents stack — bar lengths as a workload gauge.
- Chip strip at the top of the table — the "receipt" of what she filtered.

### Say & Do
- Says: *"Something's off — show me why."*
- Clicks Red KPI drill → scans PCNs.
- Clicks a specific agent's Red segment in Top agents → pinpoints anomaly.
- Slacks findings to Governance / QA / Agent.

### Hear
- From agents: *"Am I ahead / behind today?"*
- From Governance: *"Any Camden Council patterns?"*
- From Product: *"Weekly volume trend, please."*

### Pain Points
- No week-over-week delta on KPI cards yet — needs mental arithmetic.
- Line chart lacks weekend / holiday shading — trend context is thin.
- Row click doesn't open case detail — she has to open PCN in Notice IQ Cases app.
- On narrow screens the KPI strip wraps ugly (below 1100 px breakpoint).

### Gains
- Every widget click filters the table exactly as expected → confidence.
- Chip strip makes her filter state auditable ("did I remember Stage 5?").
- Stack-bar seg click applies Agent + Bot decision at once → 1-click drill.
- Sort with visible ▲/▼ + `aria-sort` semantics — no ambiguity about state.

---

## Empathy Map E3 · QA Lead — Stage 3 (Priya Menon)

**Context**: Reviews amended letters weekly; also handles escalations. Only cares about Stage 3.

### Think & Feel
- "I need to see amendments in context — the letter itself, the mitigation, the reason."
- Values **defensibility**: every QA decision must be linkable to source data.
- Nervous about missing patterns of unnecessary amendments (over-editing).

### See
- Letter amendment donut (blue arc = Amended) is her first click every session.
- QA Status / QA Name columns visible on Stage 3 only — the em-dash on Stage 5 rows reassures her the scope is correct.
- Reviewed column sort DESC — freshest amended letters at top.

### Say & Do
- Says: *"Filter for Amended, sort by Reviewed desc, sample 10."*
- Copies PCNs into her QA spreadsheet.
- Marks Pass/Fail outside the dashboard for now.
- Requests row-click → case detail for Phase 2.

### Hear
- From agents: *"Why did that letter fail QA?"*
- From Ops: *"How's the QA backlog?"*
- From Nat (Governance): *"Any patterns in what agents are correcting?"*

### Pain Points
- Row click doesn't yet drill into PCN case detail.
- QA Name column is empty because ANPS integration is pending (Interview 02 #14).
- Cannot mark Pass/Fail inline — must switch to spreadsheet.
- Column-visibility defaults show Custom / Selected Mitigation which she rarely needs; she has to hide it manually.

### Gains
- Scope tab "Stage 3 only" pins her to the right dataset instantly.
- Filter chips let her audit her own sampling logic.
- Amber reasons ranked list surfaces the highest-yield sampling targets.
- Global search finds any PCN by number in one field.

---

## Empathy Map E4 · Processing Agent (Sarah Khan)

**Context**: Handles Stage 3 informal reps + occasional Stage 5. Wants self-awareness of her own numbers.

### Think & Feel
- "How am I doing today vs the team?"
- Worries about being singled out for amendments — wants transparency.
- Proud when her Red count is low and Green is high.
- Slightly self-conscious the first time she sees her own segment on Top agents.

### See
- Top agents stack — looks for her own name and bar length.
- Her own row in the master table when she filters by name.
- Custom mitigation cells — memory of what she wrote.

### Say & Do
- Says: *"Filter by me and today."*
- Uses global search to type her own name.
- Rarely uses column kebab (defaults to reading the ranked list surface).

### Hear
- From Ops: *"You're on track today."*
- From Governance: *"Your custom mitigation about A&E is the third time this month."*
- From QA: *"Nice work — Pass on all sampled."*

### Pain Points
- No "Filter by me" shortcut yet — she has to type her name every time.
- No "today" default on the global date filter — she resets it each visit.
- Column kebab discoverability is low; she's never used Sort.
- Cannot see benchmark ("vs team average") inline.

### Gains
- Sees her contribution to Green / Amber / Red split in seconds.
- Learns from her own custom mitigation entries — sees which recurred.
- Stack-bar seg click filters instantly by her name + colour.

---

## Empathy Map E5 · Product Owner (Shelley Stones)

**Context**: Owns the DocProcess Organisation roadmap. Weekly board update; monthly steerco.

### Think & Feel
- "Is the automation delivering value? Can I prove it?"
- Wants **trend clarity** more than case detail.
- Values consistency across dashboards for exec comprehension.
- Slightly frustrated by manual screenshot workflow.

### See
- KPI strip with deltas (still on wish-list for Phase 3).
- Volume Share donut on Combined view (Stage 3 vs Stage 5).
- Consolidated RAG trio widget — one-glance narrative.
- Daily volume trend — line-only after Interview 02 §4 request.

### Say & Do
- Says: *"Give me combined numbers, then Stage 3 detail, then Stage 5."*
- Captures widget screenshots for board deck.
- Asks Nat for Governance highlights; asks Angela for Ops highlights; asks Priya for QA highlights.
- Escalates missing data / features to Srinivas / delivery.

### Hear
- From CFO: *"What's the volume trend?"*
- From CEO: *"Is Stage 5 delivering?"*
- From Nat: *"Governance backlog looks healthy."*

### Pain Points
- Manual screenshots for board deck.
- Delta vs previous period is only text — no visual trend chip.
- Cannot export a widget's underlying data yet.
- Line chart lacks weekend shading — trend narrative harder to explain.

### Gains
- Combined dashboard co-locates Stage 3 + Stage 5 story.
- RAG trio widget replaces 3 slides with 1.
- Widget click → filtered table lets her drop into any tile's evidence in seconds.
- Design consistency across Stage 3 / Stage 5 / Combined avoids re-teaching stakeholders each view.

---

## Cross-persona insights

| Insight | Design implication |
|---|---|
| Every persona wants a fast "why" for outlier numbers | Widget-to-table drill is universal; keep it consistent |
| Two of five want week/month deltas surfaced | Prioritise Phase 3 KPI delta chips |
| Governance & QA both benefit from row-click → detail | Phase 2 dependency |
| Agent role has different defaults (own name, today) | Phase 2 role-scoped defaults |
| Product & Governance want export in different formats | Phase 2 export menu (CSV row-level, PNG widget-level) |
| Everyone respects the chip strip when it's visible | Make the strip more prominent when populated (colour tinting is OK; current pale blue works) |
