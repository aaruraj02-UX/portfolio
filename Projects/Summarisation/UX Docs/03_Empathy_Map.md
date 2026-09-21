# Empathy Map  -  Stage 3 & Stage 5 Response Generation

Empathy maps for the four personas defined in `02_Personas.md`. Format follows `templates/EmpathyMap_Template.md` and the guidance in `skills/uiux/empathy-map.instructions.md` (Think/Feel, See, Say/Do, Hear, Pain, Gain). Each Pain is paired with an explicit Opportunity that ties to a Stage 3/5 PBD requirement so it can be carried into the Backlog.

---

## EM-P1  -  Aisha Khan, Notice IQ Processing Agent

### Think & Feel
- "I want to trust the AI but I've been burned by wrong wording before."
- Anxious about her QA pass rate  -  every reject is logged.
- Quietly proud when she clears 100+ cases in a shift.
- Frustrated that every Notice IQ portal hiccup forces her to re-key.
- Genuinely relieved when a Green case is *actually* Green.

### See
- My Workflow grid with the new *Letter Generation* column (Green / Amber / Red chips).
- Send Correspondence screen: PCN meta header (Council: Wokingham, Stage: 14 days letter, Status: Active), Validation Results panel, Mitigation Categorisation, Suggested Letter body, Save Draft + Send buttons.
- "Send for QA review?" confirmation modal on every amended case.
- AIRA in a second tab (today)  -  will disappear once Stage 3 is live.
- QA reject notes appearing back on her queue throughout the day.

### Say & Do
- Says: *"Show me what changed and why you picked that paragraph."*
- Says: *"Don't make me leave ANPS."*
- Does: filters My Workflow by Green first, then Amber, then Red.
- Does: keyboard-only flow  -  Tab -> Enter -> next case.
- Does: copies QA reject notes into her personal scratchpad to spot patterns.

### Hear
- Team lead: "Watch your edit rate on Greens  -  you're triggering QA on cases that didn't need it."
- Peers: "If it's Wokingham, double-check the residents-permit paragraph."
- QA: "Reject  -  wrong template version" (the kind of note she hates because it isn't actionable).

### Pain Points -> Opportunities
| Pain | PBD link | Opportunity |
|------|----------|-------------|
| Doesn't know *why* the AI picked a paragraph. | BR-02, BR-04 | Inline "why this paragraph" tooltip with confidence + source rule. |
| Loses unsaved edits during portal timeouts. | BR-12 | Auto-save draft on every keystroke; banner on resume. |
| Hard to tell at a glance which cases are Green / Amber / Red. | BR-03 | Letter Generation column with chip + icon + label (never colour alone, WCAG 1.4.1). |
| Re-keying Stage 2 data. | BR-01 | All Stage 2 fields pre-filled and locked unless overridden. |
| Repetitive copy/paste from AIRA. | BR-02 | Suggested Letter body fully assembled from Knowledge Source +. |
| QA reject notes too vague to action. | BR-09 | QA Reject modal enforces non-empty note + structured reason taxonomy. |

### Gains
- Faster clear-down of her queue (target: Green case <= 30s end-to-end).
- Higher QA pass rate, fewer reworks.
- Visible audit trail she can point to if a customer escalates.
- More time on the genuinely complex Red cases.

---

## EM-P2  -  Marcus Boateng, QA Reviewer

### Think & Feel
- "I'm the last line of defence before the council sees this."
- Suspicious of any letter without a visible diff.
- Confident with the tool when the diff is unambiguous; uneasy when it isn't.
- Resents being treated as a bottleneck when the real issue is unclear AI rationale.

### See
- Approval Queue list (`approval-queue.html`) with filters by agent, council, status.
- QA Review screen (`qa-review.html`): PCN meta, Validation Results with agent notes timestamped (e.g. "Notes present and timestamped  -  09:14 to 09:36"), Suggested Letter with diff, Approve / Reject buttons.
- "Approve and send correspondence?" confirmation modal.
- "Reject this correspondence?" modal with mandatory *Reject note* field.
- A trickle of returned Green letters where the agent edited unnecessarily.

### Say & Do
- Says: *"If you edit a Green letter, it stops being Green."*
- Says: *"Reject without a reason isn't QA, it's blocking."*
- Does: works top-down through diffs; ignores unchanged passages.
- Does: writes structured reject notes referencing the paragraph ID.
- Does: spot-samples Greens per the sampling % rules already in Notice IQ.

### Hear
- Workflow Manager: "Red rate's up on Surrey  -  give me three sample rejects by lunch."
- Agents: "Can you reject with the paragraph ID? Saves me reading the whole letter."
- Business: "We changed paragraph 4.2 yesterday  -  anything sent before 14:00 is on the old version."

### Pain Points -> Opportunities
| Pain | PBD link | Opportunity |
|------|----------|-------------|
| Diffs hard to scan across long letters. | BR-08 | Line-level diff with sticky paragraph IDs and a "jump to next change" control. |
| Reject notes inconsistent in structure. | BR-09 | Reject modal: required reason taxonomy + free-text + paragraph reference. |
| Hard to see which Knowledge Source + version a letter used. | BR-11 | Show source version + author + timestamp on every paragraph. |
| Sampling % rules change silently. | BR-07 | Banner + change-log when a sampling rule changes. |
| Approve clicked by accident. | WCAG 3.3.4 | Confirmation modal already present  -  ensure focus lands on cancel, not approve. |

### Gains
- Confidence in the audit trail.
- Lower bounce-rate between QA and agent (clean reject -> one-pass fix).
- Faster sampling decisions on Green letters.

---

## EM-P3  -  Priya Nair, Workflow Manager / Team Lead

### Think & Feel
- "Where's the bleed today  -  agent, council or policy?"
- Reassured by a stable Green % trend; anxious when Red spikes.
- Wants to defend her team to the COO with numbers, not anecdotes.

### See
- Workflow Manager dashboard with tiles: G/A/R split per council, QA pass rate, average handle time, exception backlog, Knowledge Source + change-log.
- Drill-downs into a specific council or agent.
- Reports area for trend lines and weekly extracts.
- The new "Letter Generation" column rolling up across every queue.

### Say & Do
- Says: *"If a Red spike hits Surrey at 11am, I need to know by 11:05."*
- Says: *"Tell me which version of the paragraph caused this run of rejects."*
- Does: reassigns cases between agents from the dashboard.
- Does: briefs the team in standup using the previous day's tiles.
- Does: raises a ticket to David when she suspects a policy paragraph is wrong.

### Hear
- COO: "What's the automation ROI this quarter?"
- Agents: "We're getting hammered on Wokingham  -  can you rebalance?"
- David: "I'm pushing a Knowledge Source + change at 14:00  -  flag if you see any Red after."

### Pain Points -> Opportunities
| Pain | PBD link | Opportunity |
|------|----------|-------------|
| Dashboards lag the live queue. | BR-10 | Live tiles, refresh <= 60s, last-updated timestamp visible. |
| Can't see *why* a council's Red rate spiked. | BR-03, BR-10 | Drill from tile to filtered exception list with reason taxonomy. |
| Exports needed for simple questions. | BR-10 | Saved views + CSV / API on every tile. |
| Knowledge Source + change goes live without her being told. | BR-11 | Subscription to change-log; push notification + dashboard widget. |

### Gains
- Live visibility, fewer surprises.
- Defensible automation ROI numbers.
- Faster reallocation of agents during a spike.

---

## EM-P4  -  David Reeves, Business Knowledge Owner

### Think & Feel
- "If it takes a deploy to fix one paragraph, we've failed."
- Stressed by the 24h SLA; calm when the rollback button is one click away.
- Cares deeply about not sending out-of-date wording.

### See
- Knowledge Source + admin: paragraph editor, version history, diff, publish button.
- LV publish queue with SLA countdown.
- "Cases sent in the last 24h using the previous version" report.
- Rollback control.

### Say & Do
- Says: *"Show me every live case that used the old version."*
- Says: *"Roll back now, investigate later."*
- Does: edits in admin -> submits to LV -> tracks SLA.
- Does: spot-checks 3-5 letters after each publish.

### Hear
- Council ops: "Our policy changed last week  -  when's it live?"
- Priya: "Saw a Red spike right after your 14:00 publish  -  please check."
- LV Engineering: "Published at 13:42  -  live in 18 minutes."

### Pain Points -> Opportunities
| Pain | PBD link | Opportunity |
|------|----------|-------------|
| 24h SLA hard to honour without tooling. | BR-11 | Versioned content store, instant publish path, SLA countdown. |
| No view of which letters used which version. | BR-11, Sec.11 | Audit log keyed by paragraph version. |
| Rollback today is a deploy. | BR-11 | One-click rollback with audit entry. |

### Gains
- Hits the 24h SLA consistently.
- Confidence that bad changes can be reversed instantly.
- Audit trail that proves compliance with council policy refreshes.

---

### Cross-persona signals to carry into Strategy and Backlog
1. *Letter Generation* column and chip pattern is shared by P1, P2, P3  -  design once, reuse everywhere.
2. Diff highlighting is QA's #1 need but also helps agents validate their own edits before submitting.
3. Knowledge Source + version visibility matters to P2, P3 and P4  -  surface paragraph version inline, not buried in admin.
4. All status colours must be paired with icon + label (WCAG 1.4.1).
5. Audit log is the connective tissue across all four personas  -  must be searchable by case, agent, QA, council, paragraph version.
