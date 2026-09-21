# UX Strategy  -  Stage 3 & Stage 5 Response Generation

Strategy for the ANPS DocProcessor Response Generation tools (Stage 3 Notice IQ, Stage 5 third-party). Follows `templates/UX_Strategy_Template.md` and the principles & pillars in `skills/uiux/ux-strategy.instructions.md`. All KPIs and risks tie back to the Stage 3 / Stage 5 PBD v1.2 and the personas / journeys in `02_Personas.md` and `05_User_Journeys.md`.

---

## 1. Vision & Principles

### Vision
> *Make every PCN response a one-click decision for the agent, a one-glance review for QA, and a one-rollback fix for the business  -  without ever hiding what the AI did or what the human changed.*

A processing agent should be able to clear a Green PCN in under 30 seconds, a QA reviewer should be able to read a diff in seconds, and the business should be able to push a policy wording correction live within 24 hours and roll it back instantly if it misfires.

### Principles (org canon, applied to this product)

1. **Clarity**  -  Every Suggested Letter paragraph says *why* it was chosen, *which Knowledge Source + version* it came from, and what the confidence is. Status colour is *always* paired with icon + label (WCAG 1.4.1).
2. **Reliability**  -  No edit is ever missed by the diff engine. No send is ever silently lost. Auto-save on every keystroke, queue-and-retry on portal degradation, immutable audit trail on every action.
3. **Guidance**  -  Modals state the rule that triggered them (e.g. *"This case will go to QA because you edited an Amber letter  -  your sampling: 30%"*). Reject notes use a structured reason taxonomy so the agent can fix in one pass.
4. **Transparency**  -  Diff highlighting is unambiguous (additions / deletions / unchanged, with icon + label). Paragraph versions are visible inline. The Knowledge Source + change-log is a first-class dashboard widget.
5. **Consistency**  -  Sidebar labels never drift from the prototype canon. Same component does the same job on My Workflow, Approval Queue and Workflow Manager. MET-DS-V2 enforced everywhere.
6. **Efficiency**  -  Keyboard-first agent flow; Green case = 1 click + 1 confirm. QA Approve / Reject = 1 click + 1 confirm. No tab-switching out of ANPS during the core flow.

### Product principles specific to Stage 3 / Stage 5

- **The AI proposes, the human disposes.** AI never sends without an explicit human action; the audit trail names the human every time.
- **Green must mean Green.** If an agent has to re-read a Green letter, the classifier or the rationale has failed. Promote that finding into the dashboard.
- **Edits are evidence.** Every edit, every override, every reject is a structured event, not a free-text afterthought.
- **The portal is the boundary, not the bottleneck.** When Notice IQ or a third-party CRM is down, ANPS keeps working and replays cleanly when the portal returns.

## 2. Objectives & KPIs

KPIs are baselined at go-live (Day 0) using the pre-existing manual process for 2 weeks; targets are stated as deltas where appropriate.

| # | Objective | KPI | Target (12 weeks post go-live) | Source |
|---|-----------|-----|--------------------------------|--------|
| O1 | Reduce time to send a correspondence letter. | Median time from case open to *Send* (per stage and council). | -60% vs. baseline for Green; -40% for Amber; -20% for Red. | Stage 3/5 PBD Sec.2 (Reduce time taken). |
| O2 | Maximise the share of letters AI can complete fully. | *AI completion rate* = Green / (Green + Amber + Red). | >= 65% for Stage 3 Notice IQ councils; >= 50% for Stage 5 third-party councils. | BR-02, BR-03. |
| O3 | Keep agents trusting the AI on Green. | *Green over-edit rate* = % of Green cases the agent edited before send. | <= 5% (sustained week-on-week). | BR-04, P1 trust signal. |
| O4 | Catch every agent amendment for QA. | *Edit detection precision/recall on synthetic test set*. | 100% recall on substantive edits; >= 99% precision. | BR-07, BR-08, R4. |
| O5 | QA throughput keeps pace with sends. | *Mean time in Approval Queue* (Pending QA -> Approved/Rejected). | <= 15 min p50, <= 60 min p95. | BR-07. |
| O6 | One-pass fix on QA rejects. | *Reject re-reject rate* = % of rejected cases that get rejected again on resubmission. | <= 10%. | BR-09, P2 reject quality. |
| O7 | Honour the Knowledge Source + 24h SLA. | *Time from edit submitted to live in production*. | <= 24h p95; <= 4h p50. | BR-11. |
| O8 | Audit completeness. | *% of agent / QA / send / publish events with a complete audit row*. | 100%. | Sec.11. |
| O9 | Dashboard delivered with the tool. | *Dashboard tiles live on Day 0 covering G/A/R, QA pass rate, AHT, exception backlog, Knowledge Source + change-log, audit trail search*. | Yes. | BR-10. |
| O10 | Accessibility. | *Zero WCAG 2.2 AA criteria failing on the core flows* (My Workflow, Send Correspondence, QA Review, Mitigation Not Identified, Approval Queue, Dashboard). | Pass. | `.github/copilot-instructions.md`, `skills/uiux/accessibility-checklist.instructions.md`. |
| O11 | Customer QR-code experience. | *% of letters with valid scannable QR resolving to tokenised, non-PII URL*. | 100%. | BR-13. |

### Supporting metrics (instrument from Day 0)
- Time per case stage (Open -> Validation read -> Letter scrolled -> Send).
- Edits per case (count + diff-magnitude).
- Reject reason taxonomy distribution.
- Portal availability % (Notice IQ, each third-party CRM).
- Knowledge Source + rollback count + reason.

## 3. Pillars

Five strategic pillars, each pulling on the org pillar set (*simplify workflows, offline-first, scheduling transparency, smarter notifications, evidence capture, role-based consistency*) and adapted to the PCN response domain.

### Pillar 1  -  Simplify the agent workflow
- *Letter Generation* column (G/A/R) is the spine of every queue.
- Send Correspondence collapses everything an agent needs into one screen (PCN meta, Validation, Mitigation, Suggested Letter, Notes, Send / Save Draft / Send for QA review).
- Green case = 1 click + 1 confirm; keyboard-only.
- All amendments highlighted server-side so the agent never has to remember whether they edited.
- *Source:* BR-01-BR-06, BR-12; J1, J2.

### Pillar 2  -  Portal resilience (Stage 3 + Stage 5)
- The Notice IQ portal and each third-party CRM are external, mutable boundaries; ANPS treats them as queueable destinations, not synchronous dependencies.
- Always-on portal status banner, Pending-dispatch chip, retry-with-backoff, conflict detection (*"case closed in Notice IQ by user X"*), single-click recovery CTAs.
- Stage 5 auto-transfer is async with retry and a clear *Transfer failed* path with reason and manual-send fallback.
- *Source:* J5, J6, R3, R7.

### Pillar 3  -  Transparent AI rationale
- Every Suggested Letter paragraph carries *Why this paragraph*, *Knowledge Source + version*, *Author*, and a confidence indicator.
- Diff for QA shows additions / deletions / unchanged with icon + colour + label, jump-to-next-change, and a paragraph minimap.
- Mitigation Not Identified is a designed exception screen, not a stack-trace.
- *Source:* BR-02, BR-04, BR-08; J3, J4, P1 / P2 quotes.

### Pillar 4  -  Smarter notifications & QA routing
- *Send for QA review?* modal states the rule that triggered it (sampling % for Notice IQ, always for Stage 5, 100% for Red->Amber promotions in the first 30 days).
- QA Reject uses a required reason taxonomy + paragraph reference + free text  -  never free text alone.
- Workflow Manager alerts on spikes (Red rate, reject rate, portal down, CRM ack missing).
- Knowledge Source + publishes notify subscribed roles automatically.
- *Source:* BR-07, BR-08, BR-09, BR-11; J3, J7.

### Pillar 5  -  Role-based consistency & accessibility (MET-DS-V2 + WCAG 2.2 AA)
- One component library (MET-DS-V2 / MUI v5) used across every page.
- Sidebar order, modal patterns, status chips, table layouts are identical across My Workflow, Approval Queue, Workflow Manager.
- WCAG 2.2 AA enforced on all six core flows; new 2.2 criteria explicitly designed for (Focus Appearance 2.4.11, Dragging Movements 2.5.7, Target Size 2.5.8, Consistent Help 3.2.6, Accessible Authentication 3.3.8).
- Role-based access enforced server-side; mobile is read-only for oversight roles.
- *Source:* `.github/copilot-instructions.md`, `skills/uiux/accessibility-checklist.instructions.md`, IA Sec.3, IA Sec.6.

## 4. Roadmap (Phases)

A four-phase plan from sign-off to post-implementation review, aligned to PBD Sec.12 milestones.

### Phase 0  -  Discovery & alignment (already complete at v1.2)
- Stage 3 PBD v1.2 and Stage 5 PBD v1.2 signed off (10 Jun 2026).
- Personas, Empathy Maps, IA, Journeys produced (this UX pack).
- Prototype baseline in `UX_Deliverables/prototype/` (index, my-workflow, approval-queue, stage3-ANPS, stage5, qa-review, mitigation not identified).

### Phase 1  -  Foundation (Sprints 1-3)
Goal: ship the Green-only happy path for Stage 3 Notice IQ on a single council pilot.

- IA labels and sidebar finalised; MET-DS-V2 tokens wired in.
- My Workflow with *Letter Generation* column (G/A/R chip).
- Send Correspondence screen (Green only): PCN meta, Validation Results (read-only), Suggested Letter, *Save Draft*, *Send*, *Send for QA review?* modal.
- Auto-save + draft restore.
- Notice IQ send integration with portal status banner.
- Audit log v1 (case, agent, paragraph version, action, timestamp).
- Dashboard v1 tile: *AI completion rate*.
- WCAG 2.2 AA pass on the Green flow.
- **Exit criteria:** Pilot agents process Green cases live; O1 (median Green time) measured; trust signal collected.

### Phase 2  -  Amber + QA + Mitigation Not Identified (Sprints 4-6)
Goal: handle the amendment path end-to-end for Stage 3.

- Server-side diff engine + edit detection (O4: 100% recall).
- QA Review screen with diff (icon + colour + label) + jump-to-next-change + minimap.
- *Send for QA review?* modal with rule explanation.
- QA Reject modal with required reason taxonomy + paragraph reference.
- Approval Queue, Rep Review.
- Mitigation Not Identified exception screen (manual override + required note).
- Notes drawer + count badge.
- Workflow Manager v1 (G/A/R by agent / council, exception backlog).
- Knowledge Source + admin v1 + change-log widget on dashboard.
- WCAG 2.2 AA pass on Amber + QA flows.
- **Exit criteria:** O3 (Green over-edit rate), O5 (QA p50/p95), O6 (reject re-reject rate) measured.

### Phase 3  -  Stage 5 + third-party CRM auto-transfer (Sprints 7-9)
Goal: extend the pattern to third-party councils.

- Stage 5 council onboarding (CRM template mapping per council).
- Auto-transfer payload + retry + *Transfer failed* + manual-send fallback.
- Stage 5 sampling rule (all amendments -> QA) + modal copy.
- Portal status per third-party CRM.
- Conflict detection on Stage 3 (case closed elsewhere) ported to Stage 5.
- Customer QR-code (BR-13): tokenised, expiring, non-PII URL; landing page.
- Dashboard tiles per council (Stage 3 + Stage 5).
- WCAG 2.2 AA pass on Stage 5 + auto-transfer paths.
- **Exit criteria:** O2 (AI completion rate) measured for Stage 5 councils; O11 (QR validity) at 100%.

### Phase 4  -  Hardening, dashboards complete, post-implementation review (Sprints 10-12)
Goal: scale, instrument and learn.

- Full dashboard suite (all tiles in BR-10).
- Knowledge Source + 24h SLA instrumentation (O7) + one-click rollback widget.
- Audit log viewer (filter by case / agent / QA / council / paragraph version / date range).
- Live tile refresh <= 60s; saved views; CSV / API on every tile.
- Heuristic + WCAG audit on all core flows; remediation list.
- UX backlog refresh from production telemetry.
- Post-implementation review: KPIs O1-O11 measured against targets; lessons fed back into the org pack.
- **Exit criteria:** Steady-state KPIs hit; rollback dry-run successful; sign-off.

### Phase mapping to PBD milestones

| PBD milestone | Phase | UX deliverable |
|---------------|-------|----------------|
| Business requirements sign-off | Phase 0 | UX Brief, Personas, Empathy Map, IA, Journeys, Strategy (this pack) |
| Prototype delivery | Phase 1 | Wireframes / interactive prototype (in `prototype/`) updated to MET-DS-V2 |
| UAT completion | End Phase 2 (Stage 3) / End Phase 3 (Stage 5) | Heuristic + WCAG audit reports, UAT scripts |
| Go-live | End Phase 3 | Handoff package (React + MUI v5 spec), audit log live |
| Post-implementation review | End Phase 4 | KPI report against O1-O11, backlog of refinements |

## 5. Risks & Mitigation

Strategic risks (product- and adoption-level). PBD Sec.9 risks (data quality, agent resistance) are covered here in product / UX terms.

| # | Risk | Likelihood | Impact | Mitigation (UX-led) | Owner |
|---|------|------------|--------|---------------------|-------|
| S1 | Agents over-edit Green letters -> inflates QA load, erodes O3. | M | M | *Why this paragraph* tooltip, *Saved* indicator, Green-over-edit-rate tile on dashboard; coaching loop with Workflow Manager. | Workflow Manager + UX |
| S2 | Diff engine misses an agent edit -> letter sent without QA. | L | H | Server-side diff against immutable original snapshot; synthetic test set in CI with 100% recall gate; QA-side spot-check of recall weekly. | Engineering + QA Lead |
| S3 | Notice IQ / third-party CRM outage stops work. | M | H | Portal status banner, queue-and-retry, Pending-dispatch chip, sidebar badge; conflict detection on resume. | Engineering + UX |
| S4 | Knowledge Source + 24h SLA missed -> wrong wording sent. | L | H | Versioned content store + LV publish queue with SLA countdown; one-click rollback; banner on cases using deprecated paragraphs. | Knowledge Owner + LV |
| S5 | Stage 5 auto-transfer payload rejected by third-party CRM. | M | M | Async transfer with retry + visible *Transfer failed* with reason + manual-send fallback; Workflow Manager alert when CRM ack missing > N min. | Engineering + Workflow Manager |
| S6 | QR-code destination leaks case PII. | L | H | Tokenised, expiring, non-PII URL; pen-test before go-live; QR fails closed if token invalid. | Security + Engineering |
| S7 | WCAG 2.2 AA regressions because of fast iteration on diff UI. | M | M | Diff uses icon + colour + label; contrast spot-checks in design review; keyboard-traversal tests in CI; quarterly external audit. | UX + QA |
| S8 | Council policy quality varies -> AI completion rate stalls. | M | H | Per-council *AI completion rate* tile; surface bad paragraphs to Knowledge Owner; structured reject reason taxonomy feeds back into policy refresh. | Workflow Manager + Knowledge Owner |
| S9 | Agents resist automation, especially on Red overrides. | M | M | Mitigation Not Identified screen designed as a first-class flow, not an error; sampling rule visible in modal; training plan in Phase 1. | UX + Team Lead |
| S10 | Audit log volume slows the dashboard. | M | M | Append-only store, materialised views, indexed by case + date + paragraph version. | Engineering |
| S11 | Sampling % rule changes silently -> QA confused. | L | M | Change-log + banner whenever a sampling rule changes; subscription for QA + Workflow Manager. | Workflow Manager |
| S12 | Mobile route used for letter editing despite IA constraints. | L | M | Mobile IA is explicitly read-only for oversight roles; server enforces; mobile UI hides editing controls. | UX + Engineering |

## 6. Governance & success review

- **Decision rights:** UX Brief, Personas, IA, Strategy = UX lead + PBD reviewer/approver group (Amaad Ali, Shelley Stones, Craig Scott, Angela Fleming). Knowledge Source + content = Knowledge Owner. Sampling % rules = Workflow Manager + Admin.
- **Review cadence:** Strategy reviewed at end of each phase; KPIs O1-O11 reviewed weekly during pilot, monthly at steady state.
- **Definition of done for every UX artefact in this pack:**
  - Template-compliant (`templates/*`).
  - Traceable to one or more BRs in Stage 3 / Stage 5 PBD v1.2.
  - References at least one persona from `02_Personas.md` by name.
  - Honours MET-DS-V2 tokens and WCAG 2.2 AA criteria.
  - Cites the canonical screen / sidebar labels from `UX_Deliverables/prototype/`.
- **Definition of done for production go-live:**
  - All Phase 1-3 KPIs measured and trending toward target.
  - Zero P1 / P2 accessibility defects on the six core flows.
  - Audit completeness (O8) at 100% in shadow mode for 2 weeks pre go-live.
  - Rollback dry-run for Knowledge Source + executed and timed.
  - Sign-off by PBD reviewer/approver group.
