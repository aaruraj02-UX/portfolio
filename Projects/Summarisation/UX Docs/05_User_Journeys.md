# User Journeys  -  Stage 3 & Stage 5 Response Generation

Journeys follow `templates/JourneyMap_Template.md` and `skills/uiux/user-journey.instructions.md` (stages -> actions -> thoughts -> feelings -> pains -> opportunities). Each journey ends with explicit **acceptance criteria** covering flow, error states and sync / portal-conflict handling, per `.github/copilot-instructions.md`.

System-state notation used throughout:
- **G** = AI-completed (Green) * **A** = AI partial / agent edits (Amber) * **R** = AI cannot complete (Red)
- *Online* = ANPS + Notice IQ / third-party CRM both reachable
- *Degraded* = one of ANPS / external portal unreachable -> cases queue locally, send retries

---

## J1  -  Aisha (P1) processes a **Green** Stage 3 case end-to-end

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| 1. Open queue | Sign in to ANPS -> click *My Workflow* -> filter *Letter Generation = Green* | "Burn through the easy ones first." | Focused | Slow login on Mondays | SSO + remember filter |
| 2. Pick case | Click PCN reference in the list | "Wokingham 14-day letter  -  standard." | Calm |  -  | Keyboard `Enter` to open |
| 3. Scan PCN meta | Read header: *Council: Wokingham * Stage: 14 days letter * Status: Active* | "Matches the queue row." | Reassured |  -  | Header sticky on scroll |
| 4. Review Validation Results | Expand panel; read "PCN 00345678  -  date, location and stage confirmed" | "All verdicts are 'Manually verified' equivalents." | Confident |  -  | Pre-collapse Greens, expand only Reds |
| 5. Review Mitigation Categorisation | Read AI rationale + paragraph reference | "Yes, that's the right policy paragraph." | Confident | No version of paragraph visible today | Show Knowledge Source + version + author |
| 6. Review Suggested Letter | Skim body; QR code preview at footer | "Reads clean." | Trusting | "Why did it pick this para?" not always obvious | Inline tooltip: *Why this paragraph* + confidence |
| 7. Send | Click *Send* | "One click, done." | Relieved | Accidental Send on wrong case | `Send` button shows case ref; confirmation only if dirty |
| 8. Confirmation | Toast: *"Sent to Notice IQ"* | "Next." | Satisfied | Toast disappears too fast | Toast 6s, with *Undo* link for 30s |
| 9. Audit | Audit entry auto-written: case, agent, paragraph version, timestamp |  -  |  -  | Agent can't see own audit | Link to *My recent activity* on Home |

**Acceptance criteria  -  J1**
- [ ] End-to-end Green case completable in <= 30 seconds.
- [ ] Send is fully keyboard-operable (`Tab` to *Send*, `Enter` to fire) (WCAG 2.1.1).
- [ ] *Undo* available for 30s after Send; cancels the Notice IQ dispatch if still queued.
- [ ] If Notice IQ is *Degraded*, Send queues locally and shows a *Pending dispatch* chip  -  see J5.
- [ ] Audit row created with case ID, agent ID, paragraph version IDs, classification = G, timestamp.

---

## J2  -  Aisha (P1) processes an **Amber** Stage 3 case (agent amends, QA sample-checks)

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| 1. Open queue | Filter *Letter Generation = Amber* | "These need me." | Focused |  -  |  -  |
| 2. Pick case | Open PCN | "Surrey, residents-permit reason." | Calm |  -  |  -  |
| 3. Scan flags | Suggested Letter highlights two paragraphs marked *Needs review* | "AI flagged the permit clause." | Alert | Hard to spot the flag mid-letter | Sticky *Next flag* control |
| 4. Read AI rationale | Tooltip: "Permit valid 09:00-18:00; contravention at 18:14  -  borderline." | "Edge case." | Engaged |  -  | Show evidence link inline |
| 5. Open evidence | Click *Challenge* to view citizen evidence | "Photo timestamp matches." | Decided | Tab-switch breaks focus | Slide-in panel, not new tab |
| 6. Edit paragraph | Replace one sentence in the permit paragraph | "Tightening the wording." | Confident | Auto-save unclear | Auto-save indicator: *Saved 09:12* |
| 7. Add note | Open *Notes* drawer -> *Add notes* -> "Borderline permit window, edited paragraph 4.2." | "Future me / QA will thank me." | Calm | Notes drawer hidden | Notes count badge on tab |
| 8. Save draft | Click *Save draft* | "Coming back to this." | Calm | Returning later means re-finding the case | Saved drafts pinned to top of My Workflow |
| 9. Submit for QA | Click *Send* -> modal *Send for QA review?* -> *Yes* | "Going to QA per my sampling %." | Decisive | Modal doesn't say *why* it's going to QA | Modal subtitle: *"This case will go to QA because you edited an Amber letter (your sampling: 30%)."* |
| 10. Wait | Case appears in *Rep Review* with status *Pending QA* | "Move on." | Settled | No ETA visible | Show current QA queue length |
| 11. QA returns (Approve) | Notification: *"Approved  -  sent to Notice IQ"* | "Clean." | Satisfied |  -  | Daily approval summary tile |
| 11'. QA returns (Reject) | Notification: *"Rejected  -  see note"* -> re-opens case with QA reject note pinned | "Fix it." | Determined | Reject notes vague | QA Reject modal enforces structured reason + paragraph ref (see J3) |
| 12. Resubmit | Edit, *Send for QA review?* again | "One-pass fix." | Confident |  -  | Show edit count to QA |

**Acceptance criteria  -  J2**
- [ ] Every agent edit is detected server-side (diff against original Suggested Letter snapshot)  -  no edit is missed (R4 mitigation).
- [ ] *Send for QA review?* modal explicitly states the sampling % rule applied.
- [ ] Auto-save on every keystroke; the *Saved HH:MM* indicator is announced to screen readers via `aria-live="polite"`.
- [ ] Notes drawer count badge visible without entering the drawer.
- [ ] Returned-from-QA cases re-open with the QA Reject note pinned above the letter body.
- [ ] If ANPS loses connection mid-edit, edits remain in the local draft cache and a banner offers *Restore draft* on reconnect (sync-conflict handling).

---

## J3  -  Marcus (P2) reviews an amended letter in **Approval Queue -> QA Review**

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| 1. Open queue | Sign in -> *Approval Queue* -> filter by council = Surrey, status = Pending QA | "Surrey backlog today." | Focused |  -  | Saved view *My QA today* |
| 2. Pick case | Click PCN | "Aisha's edit  -  usually clean." | Calm |  -  | Show agent QA history mini-chart |
| 3. Read PCN meta | Header confirms council, stage, status |  -  | Reassured |  -  |  -  |
| 4. Read Validation Results | Notes timestamped, e.g. *"Notes present and timestamped  -  09:14 to 09:36"* | "Story checks out." | Confident |  -  |  -  |
| 5. Read agent note | Notes drawer pinned open | "Borderline permit  -  explains the edit." | Engaged |  -  |  -  |
| 6. Read Suggested Letter (diff) | Diff highlights: green = added by agent, strikethrough red = removed, grey = unchanged. Icon + label on each diff block. | "Saw it. Two changes only." | Decisive | Long letters tire the eye | *Jump to next change* button + paragraph minimap |
| 7. Decide Approve | Click *Approve* -> modal *"Approve and send correspondence?"* -> focus defaults to *No*; press `Tab` to *Yes*, `Enter` | "Approved." | Satisfied | Accidental approve | Default focus on safer option (3.3.4) |
| 7'. Decide Reject | Click *Reject* -> modal *"Reject this correspondence?"* -> *Reject note* field required (`*`) -> choose reason from taxonomy + free text + paragraph ref -> *Yes* | "Be specific so Aisha fixes it once." | Constructive | Free text only today | Required reason taxonomy (template wording / policy mismatch / formatting / missing evidence) |
| 8. Send / Return | On Approve: letter sent (or auto-transferred to third-party CRM in Stage 5). On Reject: case returns to agent with note. |  -  | Calm |  -  | Confirmation toast with case ref + action |
| 9. Audit | Audit row written: QA, action, reason, paragraph versions, timestamp |  -  |  -  |  -  | Append to case timeline |

**Acceptance criteria  -  J3**
- [ ] Diff is rendered with **icon + colour + text label** for every change (WCAG 1.4.1).
- [ ] *Reject* modal cannot be submitted with an empty note (WCAG 3.3.1, 3.3.3  -  error suggestion and recovery).
- [ ] Default focus on *No* / *Cancel* on every QA confirmation modal (WCAG 3.3.4).
- [ ] Approve and Reject buttons are visually and keyboard-distinct; no `Enter`-to-Approve from the diff view.
- [ ] QA Reject note travels back to the agent verbatim and is pinned above the letter body on re-open.
- [ ] Audit row links QA -> agent -> paragraph version -> case in a single query.

---

## J4  -  Aisha (P1) handles a **Red** case via *Mitigation Not Identified* (exception path)

Based on `mitigation not identified.html`.

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| 1. Open queue | Filter *Letter Generation = Red* | "AI couldn't complete  -  my call." | Alert |  -  |  -  |
| 2. Pick case | Open PCN | "Bracknell Forest, unusual mitigation wording." | Engaged |  -  |  -  |
| 3. Read AI rationale | Banner: *"Mitigation reason is to identify which decision to be taken."* Hint surfaces explicitly. | "AI couldn't classify the mitigation." | Decisive | Today the hint is buried | Banner pinned at top of letter panel |
| 4. Review evidence | Override panel shows *"IMAGE QUALITY ACCEPTABLE"* (or *unacceptable*) | "Image is fine  -  I can decide." | Confident |  -  | Override button beside the asserting evidence |
| 5. Choose mitigation manually | Open *Mitigation Categorisation* -> pick custom reason | "Maps to *medical evidence*." | Decided | Long picker list | Type-ahead + recently-used |
| 6. Add notes | Open *Add notes* dialog (`notes-title` = *Add notes*) -> record reasoning | "Explain why I overrode." | Calm |  -  | Pre-fill timestamp + agent name |
| 7. Edit Suggested Letter | Paragraphs now populated by chosen mitigation; tweak as needed | "Nearly there." | Confident |  -  | Re-classify case to Amber after override |
| 8. Submit for QA | *Send* -> *Send for QA review?* -> *Yes* (Red overrides always go to QA  -  Notice IQ uses sampling, but the Red->Amber promotion always samples 100% for the first 30 days) | "Belt and braces." | Decisive | Rule not visible to agent | Tooltip on modal explains the 100% sampling rule |
| 9. QA decision | As J3 |  -  |  -  |  -  |  -  |
| 10. Audit | Audit row records: original = Red, override = chosen mitigation, notes attached, classification reassigned to Amber |  -  |  -  |  -  | Audit log filter: *Red -> manual override* |

**Acceptance criteria  -  J4**
- [ ] The Mitigation Not Identified screen surfaces *why* the AI flagged Red and points to the missing data.
- [ ] Manual override requires a note (cannot proceed otherwise) and is captured in the audit.
- [ ] Red cases promoted to Amber are sampled at 100% for the first 30 days; rule is visible to the agent in the Send-for-QA modal.
- [ ] *Image quality acceptable / unacceptable* override is a single click with confirmation, and the asserted evidence row is updated in place (WCAG 4.1.3 status messages).

---

## J5  -  Aisha (P1) processes a case while **Notice IQ portal is degraded** (sync / conflict handling)

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| 1. Open queue | Status banner: *"Notice IQ unreachable  -  sends will queue locally and retry every 60s."* | "OK, keep working." | Settled | Today this is invisible | Always-on banner across My Workflow / Approval Queue / Workflow Manager |
| 2. Process Green case | Click *Send* | "Done from my side." | Calm |  -  | Chip on row: *Pending dispatch* (icon + label) |
| 3. Continue work | Pick next case | "I'll let it queue." | Productive | Risk of losing track of pending | Sidebar badge: *N pending dispatch* |
| 4. Portal returns | Toast: *"3 sends dispatched to Notice IQ."* | "Smooth." | Relieved | Past behaviour: silent retries | Toast + list of dispatched case refs |
| 5. Conflict case | One case fails because Notice IQ now shows the PCN as closed by another team | "Conflict." | Alert | Today the agent finds out via reject from council | Conflict surfaced inline: *"Case closed in Notice IQ by user X at HH:MM  -  cannot send. Open in Notice IQ?"* with single CTA |
| 6. Resolve conflict | Click *Open in Notice IQ* in a new tab; mark case as *Closed elsewhere* in ANPS; audit captured | "Cleanly recorded." | Calm |  -  | One-click *Mark as closed elsewhere* with required note |

**Acceptance criteria  -  J5**
- [ ] Portal status banner visible on every queue and case page when degraded.
- [ ] Pending dispatch chip shown with icon + label (WCAG 1.4.1) and counted on the sidebar badge.
- [ ] Retry every 60s with exponential backoff after 5 failures.
- [ ] Conflict (case closed elsewhere) blocks Send and offers a single recovery CTA with audit entry.
- [ ] No silent data loss: every queued send is enumerable from *My recent activity*.

---

## J6  -  Aisha (P1) processes a **Stage 5 (third-party) case** with auto-transfer to the council CRM

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| 1. Open queue | My Workflow filtered to Stage 5 council | "Hampshire today." | Focused |  -  | Council quick-filter chips |
| 2. Pick case | Open PCN |  -  | Calm |  -  |  -  |
| 3. Review Validation Results | Driven by Stage 4 output | "Categorisation matches." | Confident |  -  |  -  |
| 4. Review Suggested Letter | Green | "Looks clean." | Trusting |  -  |  -  |
| 5. Send | Click *Send* | "Send to Hampshire CRM." | Decisive | Today: copy/paste into CRM | Auto-transfer kicks in (BR-06 Stage 5) |
| 6. Auto-transfer | Background job pushes letter into the council's CRM template; status chip: *Transferring* -> *Transferred* | "Done from my side." | Satisfied | What if CRM rejects? | If CRM rejects, status chip *Transfer failed* -> action menu *Retry / Manual send* with reason shown |
| 7. QA path (if Amber/Red) | All amendments go to QA queue (BR-07 Stage 5  -  100% sampling for third-party) | "Different from Stage 3 rule." | Aware | Rule not obvious | Tooltip on modal makes Stage 5 = always QA explicit |
| 8. Audit | Audit row captures: classification, paragraph versions, agent, QA, CRM acknowledgement |  -  |  -  |  -  | CRM ack timestamp surfaced on case timeline |

**Acceptance criteria  -  J6**
- [ ] Auto-transfer payload is asynchronous and retryable; failures surface with a clear reason and single recovery CTA.
- [ ] Stage 5 *Send for QA review?* modal makes explicit that **all** amendments go to QA (no sampling).
- [ ] Audit timeline includes the CRM acknowledgement timestamp; absence after N minutes triggers a Workflow Manager alert.

---

## J7  -  Priya (P3) monitors a **Red spike** on Surrey from the Dashboard

| Stage | Actions | Thoughts | Feelings | Pain Points | Opportunities |
|-------|---------|----------|----------|-------------|---------------|
| 1. Glance dashboard | Workflow Manager -> Dashboard. *G/A/R by council* tile shows Surrey R at 18% (was 6%). | "Spike." | Alert | Tile lags today | Live tile refresh <= 60s + last-updated timestamp |
| 2. Drill into Surrey | Click the Surrey R segment -> filtered exception list | "What changed?" | Investigative |  -  | Reason taxonomy on each row |
| 3. Cross-check Knowledge Source + | Notice the *Knowledge Source + change-log* widget shows a publish at 14:00 by David | "Probably the new paragraph." | Suspicious | No direct link from widget to cases | Click change-log entry -> list of cases using that version |
| 4. Sample 3 cases | Open three Red cases in read-only | "Yes  -  new paragraph wording doesn't match contravention category 3." | Decided |  -  | One-click *Send sample to Knowledge Owner* |
| 5. Notify David | Use *Send sample to Knowledge Owner* (or a Teams ping today) | "Roll it back." | Decisive |  -  | Sample includes paragraph version + 3 case refs |
| 6. David rolls back | Knowledge Source + -> one-click rollback to previous version | "Reverted." | Relieved |  -  | Rollback creates audit row + dashboard widget update |
| 7. Verify | Watch R% trend reverse over the next 30 min | "Back to normal." | Calm |  -  |  -  |

**Acceptance criteria  -  J7**
- [ ] Dashboard tiles refresh <= 60s with a visible *Last updated* timestamp.
- [ ] Every tile supports one-click drill into a filtered, searchable list.
- [ ] Knowledge Source + change-log widget links each version to the cases using it.
- [ ] Rollback is one click, is audited, and updates the dashboard widget in real time.
- [ ] Tile data is also exposed as an accessible table with `<caption>` and visible summary text (WCAG 1.3.1, 1.1.1).

---

### Cross-journey opportunities to carry into the Backlog
1. *Why this paragraph* tooltip on every Suggested Letter paragraph (J1, J2, J4).
2. *Send for QA review?* modal explains the sampling rule that triggered it (J2, J4, J6).
3. Diff with **icon + colour + label** + *Jump to next change* + minimap (J3).
4. Portal status banner + Pending-dispatch chip + sidebar badge (J5).
5. CRM auto-transfer retry / manual-send / failure-reason flow (J6).
6. Dashboard live tiles with last-updated stamp and one-click drill (J7).
7. Knowledge Source + change-log widget linking version -> cases (J7) + one-click rollback (J7).
