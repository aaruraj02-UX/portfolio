# User Journeys — DocProcess Stage 3 & Stage 5 Dashboard

**Version**: 1.0 · **Date**: 06 July 2026
**Companion documents**: [01_UX_Brief.md](01_UX_Brief.md), [02_UX_Strategy.md](02_UX_Strategy.md), [03_Information_Architecture.md](03_Information_Architecture.md), [06_Personas.md](06_Personas.md)

---

## About these journeys

Five journeys map the primary interactions across the three dashboard views. Each journey follows the org template (Stage → Actions → Thoughts → Feelings → Pain Points → Opportunities) and connects back to the prototype (`UX_Deliverables/prototype/*.html`) and to the persona sheets in `06_Personas.md`.

The journeys focus on **first-time-of-day open** to **decision or hand-off**, because that is when most dashboard value is created (per Interview 02 discussion §7 & §14).

---

## Journey 1 · Template Governance daily review

**Persona**: Nat Harkin (Template Governance Lead) — see persona P1
**Trigger**: 09:15 daily stand-up with Zain covered custom mitigations from yesterday
**Goal**: Identify any custom mitigation patterns worth promoting to the configured template; keep review backlog < 24 h
**Entry point**: Notice IQ → Reports → **Stage 3 & 5 Dashboard** (Combined view, default landing)

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| Arrive | Open dashboard, glance at KPI strip (Total 2,126 · G 1,592 · A 274 · R 260) | "260 Red today — same as yesterday. Any new pattern?" | Alert, focused | KPI strip is dense; no delta vs previous period surfaced yet (Phase 3) | Add W/W delta chip on each KPI (Phase 3) |
| Locate | Click **Red KPI drill link** ("View cases →") | "Give me only Red rows" | Confident | — | Chip strip immediately confirms `Bot decision: Red ×` |
| Scan | Master table shows Red rows only. Look at **Custom / Selected Mitigation** column | "Which ones have custom text?" | Curious | Column can be truncated; need to hover for full text | `data-full` tooltip on `.cm-cell` shows entire text on hover |
| Filter deeper | Column kebab (⋮) on Custom / Selected → Filter → Operator = **Is not empty** | "Only the ones where the agent typed something." | In control | Kebab is small — appears on hover only | Add clearer discoverability (persistent icon in the meantime) |
| Read | For each remaining row, hover the custom text cell, note PCN + agent + reason | "The Hospital / A&E pattern comes up 4 times this week." | Encouraged | Manual pattern-matching still required (until Phase 2 tagging) | Phase 2 — inline tag chips for governance decisions |
| Promote | Copy PCN + custom text into template proposal spreadsheet | "I'll bring these 4 to Friday's template committee." | Productive | Manual copy; no export flow yet | Phase 2 — Export selected rows to CSV / template pipeline |
| Close loop | Click **Clear all** on the active-filter strip → return to overview | "Backlog for today: done." | Satisfied | — | Save preset "Weekly Red review" (Phase 2) |

**Outcome**: 4 new template proposals raised; time-on-task ≈ 8 min (target ≤ 10 min).

---

## Journey 2 · Ops Manager morning heat-check

**Persona**: Angela Fleming (Operations Manager) — see persona P2
**Trigger**: Every weekday 08:45 before the standup
**Goal**: Confirm agent workload is balanced, spot any spike in Amber before agents log in
**Entry point**: Home → Reports → **Stage 3 & 5 Dashboard**, then **Both stages** tab

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| Overview | Scan KPI strip and daily volume line chart | "Volume trending up, Amber flat — good." | Reassured | Line has no y-axis on narrow viewport (recent CSS drop of background shading is clean) | Add subtle gridline labels on hover |
| Stage compare | Scroll to **Stage comparison at a glance** strip | "Stage 5 workload is 40% today — normal split." | Neutral | — | Click either card to filter table by stage |
| Agent balance | Scroll to **Top agents — cases by RAG** | "Sarah Khan is at 290, Priya at 194. Fine." | Alert | Stack rows are similar heights; hard to see the outlier at a glance | Consider sorted longer bar-only view (Phase 2) |
| Anomaly spotted | Sees Maria Lopez's Red segment is unusually wide | "Why so much Red on Maria?" | Concerned | Need to see her Red cases with reasons | Click Red segment inside Maria's row |
| Drill | Click **Red segment** in Maria Lopez's stack bar | Chips render: `Agent: Maria Lopez ×` `Bot decision: Red ×`. Table scrolls into view. | Focused | Currently the drill fires two chips at once — good, but user may not notice both | Consider brief highlight animation on chip strip |
| Investigate | Reads mitigation column (all show "Missing") + custom text | "Three of hers hit missing mitigation for Camden's residents bay code" | Curious | — | Same route as Journey 1 escalation to Governance |
| Escalate | Slack Nat: "Camden residents-bay pattern for Maria today, worth a look" | "Governance has it." | Content | Slack is external — no in-app hand-off yet | Phase 2 — Flag row for Governance review inline |
| Reset | Click **Clear all**, close dashboard | "Standup ready." | Prepared | — | — |

**Outcome**: Anomaly escalated to Governance in-context; time-on-task ≈ 5 min.

---

## Journey 3 · QA Lead Stage 3 sampling

**Persona**: Priya Menon (QA Lead) — see persona P3
**Trigger**: Weekly QA sampling — review 10% of amended letters
**Goal**: Confirm agents' amendments are justified, log Pass / Fail
**Entry point**: **Stage 3 only** dashboard (via top scope tab or direct URL)

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| Scope | Land on Stage 3 dashboard | "Stage 5 has no QA data — I want Stage 3 only." | Focused | — | Scope tabs are prominent; good |
| Filter to amended | Click the blue arc of the **Letter amendment** donut ("Agent amended") | Chip: `Letter: Amended ×`. Table filters to 313 amended rows. | Efficient | Amended chip is currently the only visual signal — could show a count next to the chip | Chip badge showing filtered result count |
| Sample selection | Sort **Reviewed** column DESC to get freshest first | "Most recent first." | In control | — | Sort arrow on Reviewed header confirms DESC |
| Open case | Click a row (currently no route wired; opens in same tab) | "Show me the whole thing" | Slightly frustrated | Row click doesn't yet open full case detail | Phase 2 — row click → PCN case detail modal / new tab |
| Log outcome | Manually mark Pass/Fail in her QA tracker (outside dashboard for now) | "Wish I could tick Pass here." | Impatient | Column shows QA Status = `—` for many rows | Phase 2 — inline Pass/Fail action on each amended row |
| Check patterns | Filter Bot decision = Amber to see multi-reason amendment cases | "Multi-reason Ambers cause most amendments." | Insightful | Ambers with 3+ reasons show `+2` badge — need to click to expand | `.ar-cell` `data-full` tooltip already exists — expose on click too |
| Report | Copy 3 highlighted PCNs into weekly QA summary email | "Done for this cycle." | Satisfied | — | Phase 2 — Auto-generated QA summary from filter state |

**Outcome**: 10 cases sampled, 8 passed, 2 flagged; time-on-task ≈ 25 min for 10 samples.

---

## Journey 4 · Processing Agent self-review

**Persona**: Sarah Khan (Processing Agent) — see persona P4
**Trigger**: End of shift, curious about own numbers
**Goal**: Understand own decision mix and any custom mitigations flagged
**Entry point**: Home → Reports → **Stage 3 & 5 Dashboard** → Stage 3 only

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| Open dashboard | Land on Stage 3 view | "How was I today?" | Curious | — | Suggest agent-scoped default view in Phase 3 |
| Self filter | Column kebab on Agent → Filter → type `Sarah Khan` | "Just me." | Confident | Need to remember to type name; no "me" shortcut yet | Add "Filter by me" quick action for agent role |
| Overview | Table shows 22 of Sarah's rows for today | "22 today, 3 amended." | Satisfied | Table shows all cases from period — she wants "today only" | Global date filter should default to today for agent role |
| Deep dive | Column kebab on Bot decision → Filter → Value = `Red` | "What went Red?" | Attentive | Two of them show `Missing` in Mitigation | She now understands why she had to enter custom text |
| Learn | Reads her own custom mitigation cells | "Yesterday I found this pattern too." | Insightful | Text is truncated in the cell | Full text on hover already (data-full) |
| Reset | Clears chips one by one to compare against team average | "Interesting — I'm slightly higher on Amber than the team." | Motivated | No inline benchmark visible | Phase 2 — inline "vs team" comparison chip |

**Outcome**: Better self-awareness of decision patterns; time-on-task ≈ 4 min.

---

## Journey 5 · Product Owner weekly board pack

**Persona**: Shelley Stones (Product Owner) — see persona P5
**Trigger**: Every Friday, build slide 3 of the Product Board deck
**Goal**: Extract 3 KPIs and a trend commentary for exec audience
**Entry point**: **Stage 3 & 5 Dashboard** (Combined view)

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|---|---|---|---|---|---|
| Land | Open Combined dashboard | "Big picture — combined view." | Purposeful | — | Combined view lands by default from sidebar |
| Screenshot 1 | KPI strip — capture Total 2,126 · G 1,592 · A 274 · R 260 | "Volume up 7.6% combined" | Confident | Delta only in text form for now | Phase 3 — sparkline + delta chip together |
| Screenshot 2 | Volume Share by Stage donut (60% Stage 3 · 40% Stage 5) | "Stage 5 continuing to grow." | Positive | Donut fits at 160 × 160 (fixed at user request) | — |
| Consolidated RAG | RAG trio widget (Combined / Stage 3 / Stage 5 side-by-side donuts) | "Stage 5 has more Amber — same story as last week." | Analytical | Legend rows sort alphabetically (G/A/R) — good | — |
| Trend | Daily case volume line chart | "Line-only, cleaner than before." | Pleased | No overlay of shift patterns — but not requested for board pack | Phase 3 — weekend shading |
| Contravention story | Top contravention codes ranked | "Code 12 residents bay #1 combined — worth a governance note." | Curious | Ranked list shows Top 5 only; long tail behind "View more" | Side pane already offers full list |
| Export | Manual screenshots into slide deck | "Wish there was one-click export" | Mildly annoyed | No export automation yet | Phase 2 — CSV / PNG export of individual widgets |

**Outcome**: Slide built in ≈ 12 min (baseline 30 min from prior manual queries).

---

## Cross-journey observations

Patterns that emerged across all five journeys:

1. **Widget → chip → table** is the workhorse pattern. Everyone uses it, everyone expects it. Any new widget must support it.
2. **Column kebab menu** is powerful once discovered — Journey 3 & 4 depend on it. Consider making it more discoverable (persistent icon at low opacity) rather than hover-reveal.
3. **Delta / vs-previous-period** is missing in Phase 1. Product (Journey 5) especially wants it. Priority in Phase 3.
4. **Agent-scoped defaults** would help Journey 4. Consider "Filter by me" quick action + today's date auto-select for agent role.
5. **Row click → case detail** does not exist yet. All journeys benefit; QA Lead (Journey 3) most acutely.
6. **In-app hand-offs** (Ops → Governance, QA → Agent) currently done via Slack / email. Phase 2 should offer inline flags.

---

## Offline / sync considerations

The dashboard is server-rendered (via Notice IQ) and requires connectivity. There is no offline mode planned for the desktop dashboard.

For the future mobile companion (Phase 4):

- Case detail cached locally when opened (7-day TTL).
- Search history synced when back online.
- Sync feedback shown in header (per `skills/uiux/user-journey.instructions.md` guidance).

---

## Success metrics per journey

| Journey | Success metric | Target |
|---|---|---|
| J1 · Governance | Time from open to first template proposal | ≤ 10 min |
| J2 · Ops heat-check | Time from open to escalation decision | ≤ 5 min |
| J3 · QA sampling | Cases sampled per hour | ≥ 25 |
| J4 · Agent self-review | Time from open to insight | ≤ 4 min |
| J5 · Product board pack | Slide-ready screenshots gathered | ≤ 15 min |
