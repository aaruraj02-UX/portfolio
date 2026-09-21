# UX Strategy — DocProcess Stage 3 & Stage 5 Dashboard

**Project**: Agent Performance & Case Review Dashboard
**Version**: 1.0 · **Date**: 06 July 2026
**Companion documents**: [01_UX_Brief.md](01_UX_Brief.md), [03_Information_Architecture.md](03_Information_Architecture.md), [04_User_Journeys.md](04_User_Journeys.md)

---

## 1. Vision

> A single, trusted view of every AI-assisted parking-response case in the DocProcess Organisation — where any number tells its own story, any anomaly is one click from an accountable PCN, and any missing template is an obvious next task.

The dashboard becomes the operational homepage of the DocProcess team: opened first thing in the morning, refreshed at lunch, and cited in weekly QA and governance calls.

---

## 2. UX Principles

Inherited from `skills/uiux/ux-strategy.instructions.md` and tuned for this dashboard domain.

| # | Principle | What it means here |
|---|---|---|
| P1 | **Clarity** | Every widget states its purpose in one sentence. No jargon. RAG is text + colour + icon, never colour alone. |
| P2 | **Reliability** | Data is timestamped. Filters persist visibly as chips. Sort state cycles predictably (asc → desc → none). |
| P3 | **Guidance** | Widget clicks lead somewhere useful — always to the master table, always with pre-applied filters. No dead ends. |
| P4 | **Transparency** | Active filters are visible above the table; a chip's × removes exactly that filter; a "Clear all" resets all filters. |
| P5 | **Consistency** | The same interaction pattern (click widget → filter chip → scroll to table) works on RAG donuts, KPI drills, ranked lists, side pane, stack-bar segments, stage comparison strip and volume-share donut. |
| P6 | **Efficiency** | Global search is fixed at 300 px in the design and searches all columns (with `data-full` haystacks for truncated cells). Column-level filters are one click from view but hidden by default. |
| P7 | **Accessibility** | WCAG 2.2 AA. Every icon-only control has `aria-label`. Every sort header carries `aria-sort`. Focus rings on keyboard use only. |
| P8 | **Progressive disclosure** | Advanced filters (Amber reason, Mitigation status, Amendment status, Contravention code, Custom mitigation) hide behind **+ More** on the top filter bar. Top contravention codes shows Top 5, side pane opens the full list. |

---

## 3. Objectives & KPIs

Aligned with the BRD success criteria and Interview 02 action items.

### Business KPIs

| KPI | Definition | Baseline (assumed) | Target (Q4 2026) |
|---|---|---|---|
| Time-to-answer for Amber diagnosis | Median seconds from user open → viewing case detail | 30 s (spreadsheet) | ≤ 10 s (3 clicks) |
| Template-covered mitigation rate | Cases with mitigation identified ÷ total | 81% combined | ≥ 88% combined |
| Custom mitigation review latency | Hours from agent submission → governance decision | 72 h | ≤ 24 h |
| Amended-letter share | Letters amended ÷ total | 26% combined | ≤ 20% combined |
| Weekly active dashboard users | Distinct Notice IQ users hitting the dashboard | 5 (BA / PM) | ≥ 25 (Ops + QA + Governance + Product) |

### UX KPIs

| KPI | Measured how | Target |
|---|---|---|
| Task success rate (5 core tasks — see §5) | Moderated usability test, n = 8 | ≥ 90% |
| Time-on-task median for "why did this go Red?" | Test task 3 | ≤ 30 s |
| SUS (System Usability Scale) score | Post-test survey | ≥ 78 (industry good) |
| WCAG 2.2 AA violations | Axe / manual audit | 0 blocker/serious |
| Widget-to-table success (chips render correctly) | Manual QA across all 3 dashboards | 100% |

---

## 4. Strategic Pillars

Six pillars translate the vision into design/build work.

### Pillar 1 · Unified information model
- Same 13-column master table across Stage 3, Stage 5, Combined.
- Stage-specific values render as `—` (e.g., QA columns on Stage 5) rather than being conditionally removed — preserves column stability across the three views.
- Shared filter chip vocabulary drawn from the header labels.

### Pillar 2 · Drill-through everywhere
- Every widget number is a hyperlink to the pre-filtered master table.
- Multi-column filters (Stage + Bot decision, Agent + Bot decision) are supported via `data-filter-cols` / `data-filter-vals`.
- Filter chips make the drill lineage visible; × on any chip reverses it.

### Pillar 3 · Ranked lists over decorative charts
- Amber Reasons and Top Contravention Codes both use the ranked-list pattern (rank badge, name, meta, bar, count, pct).
- Treemaps replaced with lists after Interview 02 §9 feedback: "the current contravention codes widget was considered confusing".
- Side pane for the long tail — never overload the primary widget.

### Pillar 4 · Table as the workspace
- MUI-DataGrid-style column menu (kebab → Sort · Filter (Contains/Equals/Starts/Ends/Empty/Not empty) · Hide column).
- Toolbar-level global search fixed at 300 px, plus icon buttons for column-visibility and column-filter reveal.
- Active filter chip strip sits above the table; auto-hides when clean.
- Column sort cycles asc → desc → none with visible ▲/▼ indicator and `aria-sort` semantics.

### Pillar 5 · Governance-first workflows
- Custom mitigation surfaced directly in the master table (removed from a separate widget per Interview 02 §11).
- Custom / Selected Mitigation column shows selected template + custom text stacked (`.cs-mit-stack`) with truncated preview + `data-full` tooltip.
- Nat / Zain team's mental model — "find the pattern, promote it to template" — is one filter (Bot decision = Red or Custom mitigation present) + one sort (Reviewed date desc) away.

### Pillar 6 · Accessible & performant
- Focus outline suppressed on `:focus` but restored on `:focus-visible` so keyboard users always see the ring while mouse users don't get the black square.
- SVG donut segments use `pointer-events: stroke` so hitting the ring works exactly as expected.
- Table cell haystacks pre-computed at page load for the global search (avoids re-reading DOM on every keystroke).
- Media query at 1100 px collapses widget grid to single column; at 900 px collapses `.rag-trio` to stacked cards.

---

## 5. Core Tasks (design must support these end-to-end)

| Task | Persona | Success criterion |
|---|---|---|
| T1 · "How many cases went Red this week and who handled them?" | Ops Manager | 1 filter click on Red KPI → chip visible → table filtered to Red rows |
| T2 · "Why did agent Sarah Khan's Amber rate spike?" | QA Lead | Click Sarah Khan's row in Top Agents → chips show Agent + optionally +Amber (via seg click) → drill into rows |
| T3 · "Which contravention code causes the most missing-mitigation cases?" | Template Governance | Filter Bot decision = Red → sort Contravention asc → view distribution / expand to side pane |
| T4 · "Am I catching all my own amended letters?" | Processing Agent | Filter Agent = self, Letter = Amended → sort Reviewed desc |
| T5 · "How does Stage 5 workload compare with Stage 3 today?" | Product Owner | Combined dashboard → Volume Share donut + Stage compare strip + RAG trio consolidated |

---

## 6. Roadmap (Phases)

### Phase 0 — Foundations (complete)
- Prototype delivered in `UX_Deliverables/prototype/` for 3 dashboards.
- Design tokens integrated (MET-DS-V2).
- All 6 UX deliverables (this pack).

### Phase 1 — MVP launch inside Notice IQ (T + 4 weeks)
- Wire the prototype to Stage 3 / Stage 5 real-time data via Notice IQ reporting layer.
- Role-based access (Ops / QA / Governance / Product).
- Global date filter server-side.
- 13-column master table with server-side pagination and per-column filter.
- WCAG 2.2 AA audit + fixes.
- Success measure: Objectives O1, O4, O5 met.

### Phase 2 — Governance enhancements (T + 8 weeks)
- Custom mitigation tagging (Nat / Zain team can tag free-text into template candidates).
- Template promotion workflow — bulk-select PCNs from the master table, mark for template review.
- CSV / Excel export from the table (subject to OQ-03 confirmation).
- Save filter presets ("My Amber cases", "Weekly Red review").
- Success measure: O2 met, Custom mitigation review latency ≤ 24 h.

### Phase 3 — Trend & insight layer (T + 12 weeks)
- Week-over-week and month-over-month deltas on KPI cards.
- Automatic anomaly detection (spike in Red for a specific client / contract).
- Insights panel — "Top 3 missing mitigation patterns this week" surfaced above the widget grid.
- Success measure: O3 met, ≥ 25 weekly active users.

### Phase 4 — Adjacent stages & mobile companion (T + 16+ weeks)
- Extend the same pattern to Stage 1, 2, 4 to normalise the reporting surface.
- Mobile companion (read-only) for Ops managers on the go.
- Public API for cross-team reporting.

---

## 7. Risks & Mitigation

| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| RS-01 | Notice IQ reporting layer can't render the widget grammar without heavy JS | Delayed launch or degraded UX | Progressive enhancement: filter-row + master table works without JS; widgets add value on top |
| RS-02 | Real data volumes exceed prototype assumptions (10k+ combined PCNs) | Table performance degrades | Server-side pagination + column filter + indexed date range |
| RS-03 | Stakeholder groups pull the design in incompatible directions | Scope creep | Widget grammar codified (this doc + component library); new widgets follow the same click-to-filter contract |
| RS-04 | QA columns lack data for Stage 5 users | Column feels broken | Explicit `—` rendering + user education in tooltip + persona-scoped column visibility defaults |
| RS-05 | Global search + per-column filter compose incorrectly | Table shows or hides wrong rows | Split hide signals — global via `.row-hide-global` class with `!important`, per-column via inline `display:none` (documented in `dashboard-charts.js`) |
| RS-06 | Colour perception issues on RAG (deuteranopia / protanopia) | Users misread state | Text label + shape + dot on every chip; audit against Colour Contrast Analyser |
| RS-07 | Widget click filters leave orphan filters after navigation between dashboards | User confusion | Filters reset on route change (Notice IQ SPA behaviour) or persist explicitly via URL query string |
| RS-08 | Custom mitigation is duplicated between Selected mitigation and Custom cell | Column reads noisy | `.cs-mit-stack` clearly differentiates selected template vs custom free text with two styles |

---

## 8. Guardrails for design decisions

Any future change to the dashboard must be checked against:

1. **Does every new widget number lead to the master table with pre-applied filters?**
2. **Is the filter visible as a chip that can be individually removed?**
3. **Is the widget accessible via keyboard (Tab, Enter/Space, Esc)?**
4. **Does it respect the 8-point spacing scale and 8 px radius?**
5. **Is there a stroke + text label so the widget doesn't rely on colour alone?**
6. **Does it degrade gracefully at ≤ 1100 px viewport?**
7. **Does it match tone / vocabulary already used elsewhere in the dashboard?**
8. **Is the interaction pattern already documented in the prototype (no invented paradigms)?**
