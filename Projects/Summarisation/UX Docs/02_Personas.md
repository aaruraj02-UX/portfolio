# Personas  -  Stage 3 & Stage 5 Response Generation

Personas below are tailored to the Acme Notice Processing System (ANPS) Stage 3 (Notice IQ) and Stage 5 (third-party) Response Generation tools. They derive from the Stage 3 and Stage 5 PBDs, the prototype roles visible in `UX_Deliverables/prototype/` (sidebar nav: Home, Wokingham PCN, Search, Reports, My Workflow, Rep Review, Workflow Manager, Approval Queue, Notice Processing, HHD Message, Manual Case) and the org persona convention in `skills/uiux/personas.instructions.md`.

Per the convention, persona generation must cover the two canonical archetypes (a *frontline operator* and a *web admin/oversight role*). For this product the operator is the **Processing Agent** and the oversight role is the **QA Reviewer**, with a **Workflow Manager** and **Business Knowledge Owner** as secondary roles needed to honour the PBD coverage.

---

## P1  -  Aisha Khan, Notice IQ Processing Agent (primary)

- **Name / Role:** Aisha Khan  -  Notice IQ Processing Agent (Stage 3)
- **Channel / Device:** Desktop workstation, dual monitor, Edge / Chrome. ANPS portal in one window, Notice IQ + AIRA in the other today; DocProcessor tool replacing the AIRA copy/paste step.
- **Tech comfort:** Medium-high. Confident with keyboard shortcuts, fast at table-driven workflows; uncomfortable with anything that feels "magic" without an explanation.
- **Volumes:** 80-120 PCN correspondences per shift across Bracknell Forest, Hertfordshire, Surrey, Wokingham.
- **Goals**
  - Clear her My Workflow queue before the end of shift without burning the SLA.
  - Trust the AI-pre-filled letter enough to accept it in one click when it's Green.
  - Know immediately when a case is Amber or Red so she can plan her time.
  - Keep her QA pass rate high  -  avoid silly edits that trigger QA rejects.
- **Frustrations**
  - Re-keying information Stage 2 already validated.
  - Copy/pasting paragraphs from AIRA into council templates.
  - Not knowing why the AI picked a specific paragraph; afraid of sending the wrong wording.
  - Losing edits when the council portal times out.
  - Letters that look Green but actually need a tweak she only spots on the third read.
- **Daily tasks (Stage 3 to-be)**
  1. Open ANPS -> My Workflow.
  2. Filter by *Letter Generation = AI Complete* and burn through Green cases first.
  3. Open Send Correspondence -> review Validation Results, Mitigation Categorisation, Suggested Letter.
  4. Click *Send* (Green) or amend the letter then click *Send for QA review?* (Amber/Red).
  5. Pick up returned cases from QA, action the QA notes, resubmit.
  6. Use the Notes drawer to record any case context for the next reviewer.
- **Motivations**
  - Hitting her productivity target without sacrificing accuracy.
  - Being the agent the team lead trusts with escalations.
  - Less repetitive copy/paste  -  more time on the genuinely hard cases.
- **Quotes**
  - "If the AI just tells me *why* it chose that paragraph, I can sign off in five seconds."
  - "Green should mean Green. If I have to re-read it, it isn't Green."
  - "Don't make me leave ANPS. Every tab switch is a chance to lose work."
- **Key UI implications**
  - Letter Generation column on My Workflow with G/A/R chip + icon + label (never colour alone  -  WCAG 1.4.1).
  - Confidence rationale visible next to each Suggested Letter paragraph.
  - Keyboard shortcut for "Send" and "Send for QA review".
  - Auto-save draft every keystroke; resume after timeout.

---

## P2  -  Marcus Boateng, QA Reviewer (primary oversight)

- **Name / Role:** Marcus Boateng  -  QA Reviewer (covers both Notice IQ and third-party queues)
- **Channel / Device:** Desktop workstation, single ultrawide monitor. Uses QA Review screen (`qa-review.html`) and the Approval Queue.
- **Tech comfort:** High. Power user of filtering, sorting, diff tools; expects every click to be reversible.
- **Volumes:** 60-90 sampled correspondences per shift, plus 100% of Amber/Red on Non-Notice IQ.
- **Goals**
  - Approve / reject quickly without missing material errors.
  - See every agent edit clearly: what was added, what was deleted, when, by whom.
  - Give actionable reject reasons so the agent can fix and resubmit in one pass.
  - Defend any decision with a clean audit trail.
- **Frustrations**
  - Tracking diffs by eye across two open tabs.
  - Reject notes that come back vague  -  agents can't action them.
  - Sampling rules changing without notification.
  - Letters arriving in QA without the case context (PCN meta, evidence, validation summary).
- **Daily tasks**
  1. Open Approval Queue -> filter by council / agent / status.
  2. Open a case in QA Review -> scan PCN meta, Validation Results, agent notes.
  3. Read the *Suggested Letter* with diff highlights (additions / deletions / unchanged) and timestamps.
  4. Approve -> confirmation modal "Approve and send correspondence?" -> Yes.
  5. Reject -> modal requires Reject note (`*` mandatory) -> Yes -> case returns to agent with note attached.
  6. Sample-check Green letters per the agent's current sampling %.
- **Motivations**
  - Defending Acme's accuracy reputation with councils.
  - Helping agents improve through clear reject feedback.
  - Lower bounce rate (fewer cases ping-ponging between agent and QA).
- **Quotes**
  - "I shouldn't have to scroll to find what changed. Show me the diff."
  - "Reject without a reason isn't QA, it's just blocking."
  - "If an agent edits a Green letter, it stops being Green."
- **Key UI implications**
  - QA Review must show diff with line-level additions / deletions, icon + colour + label.
  - Reject modal enforces non-empty note (3.3.1, 3.3.3  -  error suggestion and recovery).
  - Approve / Reject buttons separated visually and keyboard-distinct (no accidental Approve).
  - PCN meta, Validation Results and Notes always visible without scrolling away from the letter body.

---

## P3  -  Priya Nair, Workflow Manager / Team Lead (secondary oversight)

- **Name / Role:** Priya Nair  -  Workflow Manager covering a team of ~25 agents across both stages
- **Channel / Device:** Desktop + tablet. Uses Workflow Manager view, Reports, Dashboard tiles.
- **Tech comfort:** High. Comfortable with pivot tables, JIRA-style queues, BI dashboards.
- **Goals**
  - See the team's throughput by hour, by council, by stage.
  - Spot exception spikes (Red cases, QA rejects, portal outages) early enough to reallocate.
  - Track the AI completion rate (Green %) trend to argue for further investment or for council policy refresh.
  - Reassign or re-prioritise cases without leaving the dashboard.
- **Frustrations**
  - Stale dashboards that lag the live queue.
  - Having to export to spreadsheets to answer simple questions.
  - No way to see *why* a council's Red rate suddenly spiked.
  - Knowledge Source + changes that go live without her being notified.
- **Daily tasks**
  1. Open Workflow Manager -> review G/A/R split per council and per agent.
  2. Drill into a spike -> see exceptions, sample three cases.
  3. Reassign backlog from overloaded agents.
  4. Review QA reject themes; brief the team in standup.
  5. Confirm Knowledge Source + change-log entries match what business briefed.
- **Motivations**
  - Hitting team SLAs without burning the agents out.
  - Showing the COO the automation ROI in numbers.
  - Reducing customer complaints driven by wrong wording.
- **Quotes**
  - "Tell me where the bleed is  -  agent, council or policy."
  - "If a Red spike hits Surrey at 11am, I need to know by 11:05, not at end of day."
- **Key UI implications**
  - Live tiles (refresh <= 60s) for G/A/R split, QA pass rate, average handle time.
  - One-click drill from tile -> filtered queue.
  - Knowledge Source + change-log surfaced as a dashboard widget with version + author + diff.
  - All tiles announceable to screen readers (data tables with `<caption>` + summary text  -  WCAG 1.1.1, 1.3.1).

---

## P4  -  David Reeves, Business Knowledge Owner (secondary)

- **Name / Role:** David Reeves  -  Business Knowledge Owner, Operations
- **Channel / Device:** Desktop, browser. Edits the Knowledge Source + content; collaborates with LV Engineering to publish.
- **Tech comfort:** Medium. Lives in Word, SharePoint, structured templates; not a developer.
- **Goals**
  - Make a wording change (council policy update, paragraph fix) and see it live within 24h (BR-11).
  - Roll back instantly if a change causes downstream rejects.
  - Know which live cases are using the version he just amended.
- **Frustrations**
  - Long change-request cycles that block urgent policy fixes.
  - No visibility of which letters used which version of a paragraph.
- **Daily tasks**
  1. Receive policy update from a council.
  2. Edit Knowledge Source + content in the admin area.
  3. Submit for LV publish; track 24h SLA.
  4. Verify dashboard shows new version live; spot-check sample letters.
  5. Roll back via one-click if needed.
- **Motivations**
  - Keeping Acme compliant with each council's current policy.
  - Defending the 24h SLA in BR-11.
- **Quotes**
  - "If it takes a deploy to change one paragraph, we've failed."
  - "Show me every case sent in the last 24h using the old version."
- **Key UI implications**
  - Versioned content editor with diff and rollback.
  - Banner on cases using deprecated paragraphs.
  - Notification when LV publishes the change live.

---

### Persona usage rules (per `skills/uiux/personas.instructions.md`)

- Every prompt response generated for Stage 3 / Stage 5 work must reference one or more of P1-P4 by name and tie content back to their goals / frustrations.
- Do not invent generic "user" needs that are not traceable to a persona above.
- When a new persona is required (e.g. councillor, customer / motorist), append it to this file with the same template; do not create a parallel personas file.
