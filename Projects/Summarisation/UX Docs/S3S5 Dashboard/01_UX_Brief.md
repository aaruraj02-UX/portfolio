# UX Brief — DocProcess Stage 3 & Stage 5 Dashboard

**Project**: Agent Performance & Case Review Dashboard (Notice IQ · DocProcess Organisation)
**Document owner**: UX Team
**Version**: 1.0
**Date**: 06 July 2026
**Source inputs**: BRD V1.0 (24-06-2026), UX Interview Design Framework, UX Interview 01 transcript, UX Interview 02 minutes (03-Jul-2026), current HTML prototype (`UX_Deliverables/prototype/stage3-5-dashboard.html`)

---

## 1. Background

Acme's Notice IQ platform now runs two AI-assisted response-generation workflows for parking Penalty Charge Notices (PCNs):

- **Stage 3 · Semi-Auto Response Generation (Notice IQ)** — informal representations. AI proposes a mitigation, agent reviews and issues the letter.
- **Stage 5 · Auto Response Generation (Non-Notice IQ / third party)** — formal challenges. Auto-generated response based on client rules and third-party data; QA does not currently sit on this stage.

Stages 1, 2 and 4 already have dashboards under the DocProcess Organisation in Notice IQ. Stage 3 and Stage 5 are the missing tiles in a single, consistent reporting surface used by business operations, template governance (Nat Harkin / Zain Mahmood), QA leads, product (Shelley Stones) and delivery.

Today, stakeholders answer "how are we doing?" through ad-hoc queries, PBD spreadsheets and manual PCN look-ups. There is no single view that ties bot decision colour, mitigation coverage, letter amendment activity, agent workload, contravention volume and custom mitigation inputs together at PCN-level granularity.

The prototype at `UX_Deliverables/prototype/stage3-5-dashboard.html` and its sibling Stage-scoped views is the first end-to-end proof of the target experience and forms the baseline for this brief.

---

## 2. Objectives

**Primary business objective** — give the DocProcess Organisation a single, drill-through operational view so that:

1. **Template governance** can find and close mitigation gaps quickly (Nat / Zain team).
2. **Operations** can spot agent workload and quality patterns day-by-day.
3. **QA leads** can trace a Stage 3 case from a widget click straight to the amended letter and its reviewer.
4. **Product** can measure the ROI of the Stage 3 / Stage 5 automation over time.

**Measurable objectives** (targets confirmed with Shelley / Srinivas)

| # | Objective | Target |
|---|---|---|
| O1 | Reduce time-to-answer for "why did this go Amber?" | ≤ 3 clicks from any widget to the case record |
| O2 | Increase custom-mitigation review throughput | 100% of pending custom mitigations reviewed weekly |
| O3 | Shrink the "Missing mitigation" pool | –20% quarter-over-quarter in template-covered volume |
| O4 | Deliver a consistent RAG mental model across Stage 3, Stage 5 and Combined | Single legend, single filter chip pattern across all 3 views |
| O5 | Meet WCAG 2.2 AA on all dashboard surfaces | 0 blocker/serious issues in audit |

---

## 3. Target Users

The BRD identifies six stakeholder groups; the dashboard directly serves four of them. Two more consume outputs downstream.

| Group | Role | Primary intent | Frequency |
|---|---|---|---|
| Business Operations | Dashboard user | Daily heat-check, weekly report roll-up | Daily |
| Template Governance (Nat / Zain) | Custom mitigation reviewer | Review agent free-text inputs, promote to template | 2–3× week |
| QA Lead | Stage 3 quality reviewer | Sample amended letters, confirm rationale | Daily (Stage 3 only) |
| Processing Agents | Case handlers | See own workload, own decision mix, own amendment rate | Daily (self-service) |
| Product (Shelley) | Decision maker | Trend analysis, prioritisation of template/policy changes | Weekly |
| Delivery / Notice IQ Admin | Access + build | Configure access, extend to new stages | On-demand |

Detailed persona sheets are in `02_Personas.md`.

---

## 4. User Needs

Consolidated from BRD Business Requirements (BR-01…BR-18), Interview 01 transcript, Interview 02 minutes, and the prototype iterations to date.

### Universal (all users)
- One place to answer "how many cases today, how are they trending, and which need attention?"
- Single, unambiguous RAG legend used everywhere (Green ✓ · Amber ⚠ · Red ✕).
- Any widget number must be traceable to the underlying case list in ≤ 3 clicks with the relevant filters pre-applied and visible as removable chips.
- Global date filter that scopes the whole view; per-column filters stay within that date range.
- Accessible from Notice IQ SSO — no separate login.
- WCAG 2.2 AA compliance — legible colour contrast, keyboard navigation, screen-reader labels on every icon-only control.

### Template Governance (Nat / Zain team)
- Distinguish **mitigation identified** vs **mitigation missing** at a glance and drill into either bucket.
- Filter Custom Mitigation entries by agent, contravention code, client, date.
- Understand *why* Amber was raised via a ranked reason list, not a treemap.
- Export or copy PCN + agent + custom text for template proposal.

### Operations Team
- See daily case volume split by RAG so peaks can be triaged.
- Compare Stage 3 and Stage 5 side-by-side on the Combined view.
- Ranked view of Top Contravention Codes with "View more" side pane for the long tail.
- Activity heat map to plan agent rostering (working hours 08–19, subject to validation).

### QA Lead (Stage 3 only)
- Filter Letter Amendment = Amended and see the QA Status per row.
- QA Name column when the underlying ANPS integration provides it.
- QA Status filter (Approved · Rejected · Pending Review) built into the master table.
- Stage 5 rows show `—` for QA columns to make the scope difference obvious.

### Processing Agent
- Filter by own name and see own RAG mix, own amendment rate, own custom-mitigation submissions.
- Understand which cases required their intervention and why.

### Product (Shelley)
- Trend line for daily volume (background shading removed — coloured lines only per Interview 02 §4).
- Volume Share by Stage donut on Combined view for at-a-glance workload split.
- Consolidated RAG donut widget on Combined view (Combined + Stage 3 + Stage 5 in one card).

---

## 5. Constraints

**Environment**
- Must be hosted inside the existing **Notice IQ** environment under the DocProcess Organisation (BR-01, A-01).
- Must respect Notice IQ access controls and permissioning (A-02, D-07).
- Must comply with GDPR and internal data-handling rules.

**Data**
- Stage 3 and Stage 5 workflows must expose: mitigation status, bot decision colour, Amber reason (mandatory when Amber), letter amendment flag, custom mitigation text (D-01…D-06).
- QA name may not be available from ANPS — pending confirmation (Interview 02 Action #14, Srinivas/Saranya).
- Client filter may be redundant now that a Contract filter is being added (Interview 02 §2, Action #3, Srinivas).

**Performance**
- Widgets and master table must load within Notice IQ reporting norms.
- Table must page (server-side ideally) — the prototype shows 10 rows / page from an assumed 2,126 combined case pool.

**Accessibility**
- WCAG 2.2 AA — currently enforced project-wide.
- Colour is never the only signal (RAG chips include text + dot).
- All icon-only buttons carry `aria-label` and `title` attributes.
- All sort/filter/menu controls fully keyboard operable.

**Design system**
- MET-DS-V2 tokens loaded via `styles/tokens.css`, `dashboard.css`.
- Brand primary `#3276CF`, page bg `#F2F5FA`, card bg `#FFFFFF`, body text `#212121`.
- 8-point spacing scale, 8 px card/button/input radius, 100 px pill radius.
- System-UI font stack.
- All `<Button>` in future React port → `disableElevation`; `<Card>` → `elevation={0}`; `<TextField>` → `variant="outlined"` (see `skills/uiux/design-system-mui.instructions.md`).

---

## 6. Brand & Visual Direction

Aligned with MET-DS-V2 tokens already implemented across the prototype.

- **Colours**
  - Primary: `#3276CF`
  - RAG: Green `#16a34a`, Amber `#f59e0b` (accent `#d97706`), Red `#dc2626`
  - Stage 3 tint: `#3276CF`, Stage 5 tint: `#5B21B6`
  - Page bg: `#F2F5FA`, Card bg: `#FFFFFF`, Border `var(--color-border-strong)`
  - Chip variants: `.chip.clean` (green), `.chip.amended` (blue), `.chip.missing` (red), `.chip.pending` (amber)
- **Typography** — system-UI / Segoe UI; H1 22 px, H2 14 px, body 14 px, meta 12 px, chip 11 px.
- **Iconography** — 14 – 18 px stroke icons in headers/toolbars; filled 16 × 16 icons for column toolbar (Filter / Columns), matching MUI DataGrid convention.
- **Motion** — 120 ms ease-in-out for hover / focus transitions; smooth-scroll for widget-to-table navigation.
- **Elevation** — cards `elevation 0` with 1 px border; side pane `-12px 0 32px rgba(15,23,42,0.14)`.

---

## 7. Core Challenges

The 8 hardest UX problems this dashboard has to solve.

| # | Challenge | Why it's hard | How the design responds |
|---|---|---|---|
| C1 | Three stakeholder groups (Ops, Governance, QA) with different mental models but a shared surface | Everyone wants to lead the layout | Consistent widget grammar (widget → filter chip → master table); role-scoped filters preserved via chips |
| C2 | Traceability from a single number to the exact PCN | Numbers alone don't tell why | Every RAG chip, ranked-list row, arc slice, KPI drill link and side-pane row is a click-to-filter target |
| C3 | Combined view vs single-stage view | Same charts, different data | Combined dashboard consolidates the 3 RAG donuts into one widget while retaining stage-comparison strip and volume-share donut |
| C4 | Managing 13 master-table columns without overwhelming | Many stakeholder-specific columns compete | Toolbar with global search (300 px), Filter icon (per-column filters), Column visibility menu; MUI-style column kebab menu per header |
| C5 | Custom mitigation review workflow | Legacy design had a separate table below | Consolidated into master table (Custom / Selected Mitigation column) with side-pane reviewer flow |
| C6 | Amber reason discovery | Users want ranking, not tiles | Amber Reasons widget uses ranked list, matching Top Contravention Codes design |
| C7 | Stage 5 has no QA data | Column exists but must be visibly empty | Stage 5 rows render QA Status + QA Name as em-dash `—` |
| C8 | Accessibility on interactive SVGs | Donut arcs and stack-bar segments are click targets | `pointer-events: stroke`, `role="button"`, `tabindex`, `aria-label`, `:focus-visible` outline suppressed on mouse but visible on keyboard |

---

## 8. Scope & Deliverables

### In scope
- Three dashboard views: **Stage 3**, **Stage 5**, **Stage 3 & 5 (Combined)** — navigated via sidebar (Reports → Stage 3 & 5 Dashboard) and top scope tabs.
- KPI strip (Total / Green / Amber / Red with sparklines), Daily case volume trend, RAG donut(s), Letter amendment donut, Amber reasons ranked, Top contravention codes ranked, Top agents stack, Activity heat map, Volume share by stage (Combined), Stage comparison strip (Combined).
- Case-level master table with global search, per-column filters, sort (asc/desc/none), column visibility, column kebab menu (MUI-style), active-filter chips.
- Right-side pane for "All contravention codes" long tail.
- Widget-to-table drill-through with pre-applied filters and visible chip trail.
- Responsive rules for viewport widths above and below 1100 px (widget grid collapses to single column).

### Out of scope (per BRD §4.2 and Interview 02)
- Changes to Stage 3 / Stage 5 decisioning logic.
- Changes to letter generation logic.
- QA workflow configuration.
- Automated template updates.
- External BI platform exports.
- Predictive analytics / AI model performance scoring beyond the listed reporting measures.

### Deliverables (this UX pack)
1. **UX Brief** (this document)
2. **UX Strategy** — vision, principles, KPIs, pillars, roadmap
3. **Information Architecture** — sitemap, navigation model, role-based access, mobile note
4. **User Journeys** — 5 journeys covering the primary personas
5. **Empathy Map** — one per primary persona (4 maps)
6. **Personas** — 5 personas (Governance Lead, Ops Manager, QA Lead, Processing Agent, Product Owner)
7. **HTML prototype** — already produced (`UX_Deliverables/prototype/`)
8. **Accessibility audit** — WCAG 2.2 AA checklist (post-handoff)

---

## 9. Risks

| ID | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R1 | QA Name not available from ANPS | QA Name column always `—` for Stage 3 too | Medium | Confirm with Srinivas/Saranya (Interview 02 #14); if unavailable, hide column via default column-visibility state |
| R2 | Custom mitigation inputs are unstructured free text | Template governance can't group patterns | High | Provide agent + PCN + full text in one row; add tagging in phase 2 |
| R3 | Contract filter obsoletes Client filter | Redundant filter fatigue | Medium | Review post-launch (Action #3); prototype currently keeps Client column but Client top-of-page filter was removed at user request |
| R4 | Widget click storm produces stale filter chips | User confused about which filters are active | Medium | Chips render live from filter state, each chip has an X, plus "Clear all"; global search + column filters both surface in chip strip |
| R5 | Column count (13) creates horizontal scroll on 1366-wide monitors | Users miss right-side columns | Medium | Column visibility menu hides non-essential columns per role; `.db-table-scroll` supports x-overflow with sticky header |
| R6 | Notice IQ hosting constraints limit interactive JS | Sort / column menu / global search may need server rendering | Low | Progressive enhancement — filter row + master table works without JS; enhancements layered on |
| R7 | Working hours 08–19 in heat map may not match agent shifts | Heat map misleads rostering | Low | Confirm with Srinivas (Action #2); parameterise hour range |
| R8 | Missing Contract dimension in mock data | Filter looks aspirational | Low | Backfill Contract column in a follow-up mock update; already surfaced in the top filter list |

---

## 10. Success Criteria (BRD §18 + additions)

The dashboard is successful when:

- Stage 3 and Stage 5 cases are visible in Notice IQ under DocProcess Organisation.
- Business users can see total reviewed cases at a glance.
- Mitigation identified vs missing is visible on all three views.
- Green / Amber / Red counts and trends are visible and drill through to the master table with correct pre-applied filters.
- Amber reasons and Top contravention codes render as ranked lists with matching interaction patterns.
- Custom mitigation inputs are surfaced in the master table (not as a separate table).
- Letter Amended can be filtered via the Letter column (`No amendment` / `Amended`).
- QA Status and QA Name are surfaced for Stage 3 rows (blank `—` for Stage 5).
- Global search + per-column filters + sort all cooperate cleanly with visible chip state.
- Zero blocker / serious accessibility issues under WCAG 2.2 AA audit.

---

## 11. Open Questions carried forward from BRD & Interview 02

| ID | Question | Owner |
|---|---|---|
| OQ-01 | Which date drives reporting: reviewed / letter generated / completed? | Business / Product |
| OQ-02 | Default view — Combined or single stage? | Business / Product |
| OQ-03 | CSV / Excel export needed at launch? | Business / Product |
| OQ-04 | Definitive Amber reason vocabulary? | Business / BA |
| OQ-05 | Custom mitigation grouping — raw text only or business categories? | Nat / Zain |
| OQ-06 | Dashboard user roles & permission scopes? | Business / Notice IQ Admin |
| OQ-07 | Widget drill into full PCN case detail (beyond filtered table)? | Product / Delivery |
| INT-02-#2 | Validate heat map working hours 08–19 vs actual shifts | Srinivas / Team |
| INT-02-#3 | Retire Client filter now that Contract exists? | Srinivas |
| INT-02-#14 | Confirm ANPS provides QA name | Srinivas / Saranya |

---

## Appendix A · Source traceability

- BRD `DocProcess+Stage+03+&+05+Dashboard+BRD+V1.0.doc` v1.0 (24-06-2026, Srinivas M / Amaad Ali)
- Interview 01 transcript (partial — call context and workflow walkthrough)
- Interview 02 minutes (03-Jul-2026) — 17 action items captured, all reflected in prototype
- UX Interview Design Framework (`UX+Interview+Stage3+&+Stage5+Dashboard+Design.doc`)
- Live prototype at `UX_Deliverables/prototype/stage3-5-dashboard.html` (and sibling `stage3-dashboard.html`, `stage5-dashboard.html`)
- Design system tokens: `styles/tokens.css`, `styles/dashboard.css`
- Copilot instructions: `.github/copilot-instructions.md`
- Skill files: `skills/uiux/*.instructions.md`
- Templates: `templates/*.md`
