# UX Research Plan — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Prototype**: `UX_Deliverables/prototype/var-pay.html`

---

## 1. Research Goals

1. Validate that the dashboard information hierarchy matches admin mental models
2. Evaluate whether users can identify SLA-breached approvals within 10 seconds
3. Test drill-down discoverability (legend click → side panel)
4. Assess filter usability and chart comprehension
5. Identify unmet monitoring needs not covered by current KPIs
6. Measure overall satisfaction and usability via SUS scoring

---

## 2. Research Questions

| # | Question | Method |
|---|----------|--------|
| RQ1 | Can admins find the most critical operational issues within 30 seconds? | Task-based usability test |
| RQ2 | Do users understand the status badge system (On Track / At Risk / Breached)? | Think-aloud + comprehension check |
| RQ3 | Is the side panel drill-down discoverable without prompting? | First-click test |
| RQ4 | Do filters feel responsive and intuitive? | Usability test + SUS score |
| RQ5 | What additional KPIs or views do users need? | Semi-structured interview |
| RQ6 | Are chart types (donut, bar, line) correctly interpreted? | Comprehension quiz |

---

## 3. Methods

| Method | Description | When |
|--------|-------------|------|
| **Moderated usability testing** | 5–7 participants complete 5 tasks on prototype; think-aloud protocol | Week 1–2 |
| **First-click testing** | Unmoderated; 10+ participants click where they'd go to find SLA-breached items | Week 1 |
| **Semi-structured interviews** | 30 min per participant; explore unmet needs, current workarounds | Week 2 |
| **System Usability Scale (SUS)** | Post-test questionnaire after usability sessions | Week 2 |
| **A/B test** (future) | Compare 2-column vs 3-column layout for KPI density | Post-launch |

---

## 4. Participants

| Persona | Count | Recruitment |
|---------|-------|-------------|
| Operations Admin (Claire archetype) | 3 | Internal — current FinOps admin users |
| Finance Team Lead (James archetype) | 2 | Internal — finance managers who review KPIs |
| Automation Engineer (Priya archetype) | 2 | Internal — RPA team members |

**Total**: 7 participants (minimum 5 for qualitative usability testing per Nielsen Norman Group guidance).

### Inclusion criteria
- Active FinOps user for ≥ 3 months
- Has responsibility for monitoring operations, finance, or automation processes
- Mix of high and medium tech comfort levels

### Exclusion criteria
- Participants involved in dashboard design or development
- Users with less than 1 month of FinOps experience

---

## 5. Test Tasks

| Task # | Scenario | Success criteria | Research question |
|--------|----------|-----------------|-------------------|
| T1 | "You've just logged in. Identify how many approvals are SLA breached (> 5 days)." | User finds the answer (3) within 15 seconds | RQ1 |
| T2 | "Find out which module has the highest rejection rate this period." | User locates Vehicle Release (18.2%) in Insights section | RQ1, RQ6 |
| T3 | "Check if the All Pay bot ran successfully today. What's the failure rate?" | User finds card + reports 5.8% failure rate | RQ2, RQ6 |
| T4 | "Change the period to Monthly and filter to Variable Pay module only." | User completes both filter changes without error | RQ4 |
| T5 | "View the details of the SLA-breached pending approvals." | User clicks >5 Days legend → side panel opens | RQ3 |

### Metrics per task
- **Task success rate** (binary: completed / not completed)
- **Time on task** (seconds from task start to completion)
- **Error count** (wrong clicks, navigation detours)
- **Confidence rating** (1–5 self-reported after each task)

---

## 6. Session Protocol

### Pre-session
1. Welcome participant; confirm consent for recording
2. Brief 2-minute context: "This is a monitoring dashboard for FinOps admin operations. We're testing the design, not your ability."
3. Ask participant to share screen

### During session
1. Read each task scenario aloud
2. Encourage think-aloud: "Please share what you're looking at and thinking"
3. Do not lead or assist — observe silently
4. Note first clicks, hesitations, and verbal cues
5. After each task, ask for confidence rating (1–5)

### Post-session
1. Administer SUS questionnaire (10 items)
2. Semi-structured interview (15 min):
   - "What was the most useful section?"
   - "What was confusing or missing?"
   - "What data do you currently check that wasn't on this dashboard?"
   - "How does this compare to your current workflow?"
3. Thank participant; provide any compensation/recognition

---

## 7. Timeline

| Week | Activity | Deliverable |
|------|---------|-------------|
| Week 1 | Recruit participants; set up prototype; run first-click tests | First-click heatmap |
| Week 2 | Conduct moderated usability sessions (5–7) + interviews | Session recordings + notes |
| Week 3 | Analyse findings; compile report; score SUS | Research report + recommendations |
| Week 4 | Present findings; update backlog with research-driven items | Updated UX backlog |

---

## 8. Deliverables

- Usability test report with task success rates, time-on-task, and error rates
- First-click heatmap analysis
- SUS score with benchmark comparison (industry average: 68)
- Interview synthesis with affinity diagram
- Prioritised recommendations integrated into UX Backlog
- Presentation deck for stakeholder review

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Low participant availability | Delays research by 1–2 weeks | Schedule sessions 2 weeks in advance; offer flexible time slots; have backup participants |
| Prototype fidelity too low | Participants confused by non-interactive elements | Use var-pay.html prototype with sample data already populated; pre-wire drill-down interactions |
| Participants unfamiliar with dashboard concept | Skewed results — confusion unrelated to design | Brief them with 2-min context before tasks; exclude brand-new FinOps users |
| Observer bias | Leading questions or body language influence results | Use standardised task scripts; two observers per session; review recordings independently |
| Small sample size masks issues | Edge-case usability problems missed | Supplement with unmoderated first-click testing (larger sample) and follow-up A/B test post-launch |

---

## 10. Tools & Setup

| Tool | Purpose |
|------|---------|
| Prototype (var-pay.html) | Test stimulus — hosted locally or on internal staging |
| Screen recording (Teams/Zoom) | Capture participant interactions + think-aloud audio |
| Spreadsheet (task tracker) | Record task times, success, errors, confidence ratings |
| SUS template | Standard 10-item questionnaire scored 0–100 |
| Affinity diagramming (Miro/FigJam) | Synthesise interview themes |

---

*Document 9 of 11 — FinOps Admin Dashboard UX Package V1.0*
