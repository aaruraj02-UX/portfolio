# UX Brief  -  Stage 3 (Notice IQ) & Stage 5 (Third-Party) Response Generation

**Product:** Acme Notice Processing System (ANPS)  -  DocProcessor / Response Generation Tool
**Scope of this brief:** Stage 3 *Semi-Auto Response Generation (Notice IQ)* and Stage 5 *Auto Response Generation (third-party, Non-Notice IQ)*
**Source of truth:** Stage 3 PBD v1.2, Stage 5 PBD v1.2 (both approved 10 Jun 2026), interactive HTML prototype in `UX_Deliverables/prototype/`.
**Author / UX lead:** UX Copilot Org Pack
**Standards applied:** `.github/copilot-instructions.md`, `skills/uiux/*.instructions.md`, MET-DS-V2 design system, WCAG 2.2 AA.

---

## 1. Background

Acme processes Penalty Charge Notice (PCN) challenges on behalf of local authorities. Today the journey from "challenge received" to "letter sent" is highly manual:

- For **Notice IQ councils** (Bracknell Forest, Hertfordshire, Surrey, Wokingham) the agent opens Notice IQ, manually picks the reason, sub-reason and answers per-reason questions, downloads the council letter template from the CRM, copies the relevant paragraphs from AIRA, pastes them into the letter and re-uploads it.
- For **third-party (Non-Notice IQ) councils** (e.g. Hampshire, Stockport) the agent jumps across the council's own CRM, AIRA, evidence images and policy PDFs, then manually assembles the letter inside the third-party system.

Both routes are slow, error-prone and inconsistent across councils. Stage 2 (Notice IQ) and Stages 1 + 4 (Non-Notice IQ) of the DocProcessor already produce structured case validation output. Stage 3 and Stage 5 will take that output and **pre-fill the correspondence letter** end-to-end, leaving the agent to *review and send* rather than *assemble*. Where the AI cannot complete a letter, the case is flagged so an agent can intervene and QA can sample-check.

## 2. Objectives

| # | Objective | Source |
|---|-----------|--------|
| O1 | Reduce average time taken to write and send a PCN response letter. | Stage 3 PBD Sec.2, Stage 5 PBD Sec.2 |
| O2 | Capture the key information from the Stage 2 / Stage 4 summary and bind it to the correct council template paragraphs. | Stage 3/5 PBD Sec.2 |
| O3 | Produce two letter outcomes per case: **Automated Complete** (Green) and **Action Required** (Amber / Red). | Stage 3/5 PBD Sec.2 |
| O4 | Surface a *Letter Generation* column in the agent workflow so cases AI completed vs. cases AI could not complete are visible at a glance. | Stage 3/5 PBD Sec.2 |
| O5 | Route every agent-amended letter into the QA queue based on the existing Notice IQ QA sampling % per agent; for Non-Notice IQ route every amendment into the QA work queue. | Stage 3 PBD BR-07, Stage 5 PBD BR-07 |
| O6 | Highlight every added or deleted passage so QA can review the diff. | Stage 3/5 PBD BR-08 |
| O7 | Maintain a 100% audit trail of every validation outcome, agent edit, QA decision and send event. | Stage 3/5 PBD Sec.11 |
| O8 | Allow business to update the Knowledge Source + document and have LV publish to production within 24 hours. | Stage 3/5 PBD BR-11 |
| O9 | Print a customer-scannable QR code on every outgoing letter. | Stage 3/5 PBD BR-13 |
| O10 | Provide an analytics dashboard delivered at the same time as the tool. | Stage 3/5 PBD BR-10 |

## 3. Target Users

Primary (in scope of this brief):

- **Processing Agent**  -  works inside ANPS / Notice IQ all day, reviews AI-generated letters and either accepts or amends them before sending.
- **QA Reviewer**  -  samples letters per the agent-level QA % rules, approves or rejects with notes.
- **Workflow Manager / Team Lead**  -  monitors throughput, backlog, exception cases and QA outcomes.
- **Business Knowledge Owner**  -  owns the Knowledge Source + content and the council policy paragraphs; needs changes live within 24h.

Secondary / system actors:

- **Council policy administrator** (external  -  provides up-to-date policy documents).
- **Customer / motorist** (recipient of the letter; interacts via the printed QR code).
- **LV Engineering** (publishes Knowledge Source + updates).

Full personas in `02_Personas.md`.

## 4. User Needs

Derived from PBD requirements + prototype observations:

- *"Tell me at a glance which cases the AI fully handled and which need me."* (Letter Generation column, BR-03)
- *"Don't make me re-type what Stage 2/4 already extracted."* (BR-01, BR-02)
- *"Let me edit anything in the letter, but make my edits obvious to the QA."* (BR-04, BR-05, BR-08)
- *"Keep the Notice IQ flow exactly as it is today after I click Complete  -  don't break what works."* (BR-06, Stage 3 PBD Sec.7)
- *"Send Amber and Red letters to QA automatically using the sampling % already configured per agent."* (BR-07)
- *"When QA returns a letter with notes, let me fix it and re-submit."* (BR-09)
- *"Give me an audit trail I can defend in a council escalation."* (Sec.11)
- *"Let business push a policy wording change to production within 24h."* (BR-11)

## 5. Constraints

- **Systems**: Stage 3 is bound to Notice IQ back-office portal; Stage 5 is bound to third-party (Non-Notice IQ) council CRMs. Tool access is *only* through the relevant portal  -  any portal downtime stops adoption.
- **Data dependency**: Stage 3 depends on Stage 2 output; Stage 5 depends on Stage 1 + Stage 4 output.
- **Council policy quality**: validation accuracy depends on each council maintaining current policy documents.
- **Compliance**: GDPR; full audit trail mandatory.
- **Out of scope**: PCN challenges outside Notice IQ for Stage 3, PCN challenges inside ANPS for Stage 5, third-party CRMs for Stage 3.
- **Brand & UI**: Must comply with MET-DS-V2 (React + MUI v5). Primary `#3276CF`, page bg `#F2F5FA`, card bg `#FFFFFF`, body `#212121`, 8pt spacing, 8px radius, system-ui font.
- **Accessibility**: WCAG 2.2 AA enforced (the org checklist in `skills/uiux/accessibility-checklist.instructions.md` supersedes the 2.1 baseline).
- **Browser / device**: Desktop-first agent workstation; secondary tablet support for Workflow Manager dashboards.

## 6. Brand & Visual Direction

- Design system: **MET-DS-V2** (React + MUI v5, `@mui/material`).
- Tokens: imported from `design_system/` (Boolean, Colors, Element colors, Sizing, Theme). Light theme is default; Dark theme variants exist and must be supported.
- Spacing scale: 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 px. MUI `spacing` base = 4 px.
- Radius: 8 px on cards / buttons / inputs; 100 px on pills (status chips, badges).
- Elevation: `<Button disableElevation />`, `<Card elevation={0} />`, `<TextField variant="outlined" />`.
- Status colours always paired with icon + text label (Green = AI complete, Amber = agent amended, Red = AI could not complete / rejected). Colour is never the sole signal (WCAG 1.4.1).
- Voice & tone: sentence-case, verb-first CTAs ("Send", "Save draft", "Approve", "Reject"), constructive recovery-oriented error copy (per `skills/uiux/ux-content-styleguide.instructions.md`).

## 7. Core Challenges

1. **Trust & oversight**  -  Agents must be confident the AI-pre-filled letter is correct without re-reading every paragraph. The UI must surface *what changed*, *why a paragraph was chosen* and *what confidence level was applied* (Green/Amber/Red).
2. **Edit-then-route consistency**  -  Any agent edit on an Amber/Red letter must trigger automatic routing to QA per the agent's sampling % (Notice IQ) or always (Non-Notice IQ). Easy to break with copy-paste edits  -  needs reliable change detection.
3. **Diff visibility for QA**  -  Added or deleted passages must be highlighted unambiguously inside the QA Review screen, with timestamps and originator.
4. **Cross-system handoff**  -  In Stage 5, after Complete the letter is auto-transferred into the correct third-party CRM template. The boundary must be lossless and reversible if the CRM rejects the payload.
5. **Exception path**  -  "Mitigation not identified" and "AI cannot complete" are first-class flows, not error states. They need their own screen, clear next steps and audit notes.
6. **Knowledge Source + freshness**  -  Business must be able to amend wording and see it live within 24h, without re-deploying the app.
7. **QR-code privacy**  -  BR-13 requires a customer-scannable QR; the destination must not leak case data and must work without authentication.
8. **Accessibility under speed**  -  Agents work fast and keyboard-only. Focus indicators, keyboard shortcuts, target sizes >= 24 px (WCAG 2.5.8) and screen-reader announcements of validation state are non-negotiable.

## 8. Scope & Deliverables

### 8.1 In scope (this brief covers Stage 3 + Stage 5)

- Letter Generation column on `My Workflow`, `Approval Queue` and `Workflow Manager` lists.
- "Send Correspondence" screen layout (PCN meta, Validation Results, Mitigation, Suggested Letter, Save Draft / Send actions) shared between Stage 3 and Stage 5 with branch-specific differences.
- QA Review screen with diff highlighting, Approve / Reject (Reject requires note), and return-to-agent flow.
- "Mitigation Not Identified" exception screen with override controls and audit notes.
- Send-for-QA confirmation modal ("Send for QA review?") and QA Approve / Reject confirmation modals.
- Notes drawer for per-correspondence agent notes.
- Dashboard tile set covering: AI completion rate (G/A/R split), QA pass rate, average handle time per council, exception backlog, Knowledge Source + change log, audit trail search.
- Audit log viewer with filter by case, agent, QA, council, date range.

### 8.2 UX deliverables to be produced

1. UX Brief (this document)
2. Personas (`02_Personas.md`)
3. Empathy Map (`03_Empathy_Map.md`)
4. Information Architecture (`04_Information_Architecture.md`)
5. User Journeys (`05_User_Journeys.md`)
6. UX Strategy (`06_UX_Strategy.md`)
7. Wireframes  -  referenced from `UX_Deliverables/prototype/`
8. Heuristic & WCAG 2.2 AA audit  -  future deliverable
9. UX Backlog  -  future deliverable
10. Handoff Package (React + MUI v5 spec)  -  future deliverable

### 8.3 Out of scope

- PCN challenges outside Notice IQ (Stage 3) and PCN challenges inside ANPS (Stage 5).
- Third-party CRM internal UI changes.
- Customer-facing portal (only the QR landing is referenced).
- Stage 1, 2 and 4 UI (assumed delivered; consumed as data input here).

## 9. Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R1 | Poor council policy document quality reduces AI completion rate (more Amber/Red). | M | H | Knowledge Source + governance, council policy refresh SLA, surface confidence to agent. |
| R2 | Agents resist automation and over-edit Green letters, inflating QA load. | M | M | Show *why* AI chose each paragraph, keep Green flow <= 2 clicks, training, dashboard signal for over-edit rate. |
| R3 | Notice IQ / third-party portal downtime blocks adoption. | M | H | Read-only fallback in ANPS, queue & retry pattern, status banner on My Workflow. |
| R4 | Change-detection misses an edit and sends an amended letter without QA. | L | H | Server-side diff on submit, immutable original snapshot, automated tests on diff engine. |
| R5 | Knowledge Source + 24h SLA missed -> wrong wording sent. | L | H | Versioned content store, instant rollback, banner on cases using deprecated paragraphs. |
| R6 | QR code destination leaks case data. | L | H | Tokenised, expiring URLs; no PII in path; pen-test before go-live. |
| R7 | Stage 5 auto-transfer payload rejected by third-party CRM. | M | M | Async transfer with retry, "Pending in CRM" status, manual re-send button, alert to Workflow Manager. |
| R8 | Accessibility regressions due to fast iteration on diff highlighting. | M | M | Diff uses icon + text + colour (never colour alone); contrast spot-checked; keyboard-traversal tests in CI. |
| R9 | Audit log volume affects dashboard performance. | M | M | Append-only store, indexed by case+date, dashboard reads from materialised views. |

---

### Acceptance criteria for this Brief

- [ ] Sign-off by: Amaad Ali, Shelley Stones, Craig Scott, Angela Fleming (PBD reviewer/approver group).
- [ ] All BRs from Stage 3 PBD (BR-01-BR-13) and Stage 5 PBD (BR-01-BR-13) are traceable to at least one objective, user need or in-scope item above.
- [ ] All MET-DS-V2 brand and WCAG 2.2 AA constraints recorded and carried forward into Strategy, IA and Journeys.
