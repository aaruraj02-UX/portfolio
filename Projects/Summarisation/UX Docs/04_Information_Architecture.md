# Information Architecture  -  Stage 3 & Stage 5 Response Generation

Sitemap, navigation model, role-based access matrix and high-level data flows for the Acme Notice Processing System (ANPS) covering Stage 3 (Notice IQ) and Stage 5 (third-party / Non-Notice IQ) Response Generation.

References:
- `skills/uiux/information-architecture.instructions.md`
- `templates/InformationArchitecture_Template.md`
- Prototype sidebar in `UX_Deliverables/prototype/*.html` (canonical labels)
- Stage 3 PBD v1.2, Stage 5 PBD v1.2

> The product is desktop-first (agent workstation). Mobile is restricted to oversight roles (Workflow Manager) consuming dashboards  -  agents do not process letters on mobile. Mobile IA therefore covers a *read & monitor* subset only.

---

## 1. Web  -  Sitemap (ANPS desktop)

The canonical labels below are the ones already used in the prototype sidebar and must not be renamed without IA sign-off.

```
ANPS (web)
+--- Home                          -> role-aware landing tiles
+--- Search                        -> cross-system search (PCN, case, customer)
+--- Reports                       -> operational reports & extracts
+--- My Workflow                   -> agent queue (Stage 3 + Stage 5)
|     +--- [case] Send Correspondence
|           +--- PCN meta header
|           +--- Validation Results
|           +--- Mitigation Categorisation
|           |     +--- Mitigation Not Identified (exception)
|           +--- Suggested Letter (Green / Amber / Red)
|           +--- Notes drawer
|           +--- Attachments
|           +--- Save Draft * Send * Send for QA review
+--- Rep Review                    -> agent self-review of returned letters
+--- Workflow Manager              -> team-lead view of queues, throughput, exceptions
+--- Approval Queue                -> QA inbox (sampled Green + all amended Amber/Red)
|     +--- [case] QA Review
|           +--- PCN meta + Validation Results
|           +--- Letter diff (added / deleted / unchanged)
|           +--- Notes
|           +--- Approve * Reject (note required)
+--- Notice Processing             -> Notice IQ-bound case list (Stage 3 entry)
+--- HHD Message                   -> handheld device / on-street messaging
+--- Manual Case                   -> manual case creation (fallback path)
+--- Wokingham PCN                 -> council-specific quick filter (template for per-council shortcuts)
+--- Dashboard (Reports -> Dashboard)
|     +--- AI completion rate (G/A/R) by council, by agent
|     +--- QA pass rate
|     +--- Average handle time
|     +--- Exception backlog
|     +--- Knowledge Source + change-log
|     +--- Audit trail search
+--- Admin
|     +--- Client
|     +--- CR Config (correspondence config)
|     +--- Knowledge Source + (versioned content editor)
|     +--- Users & Roles (sampling % per agent)
|     +--- Audit Log Viewer
+--- Account
      +--- Profile
      +--- Notifications
      +--- Sign out
```

### Notes on canonical labels
- *My Workflow*, *Approval Queue*, *Workflow Manager*, *Notice Processing*, *HHD Message*, *Manual Case*  -  already in sidebar, do not rename.
- *Send Correspondence*  -  title used on the case detail page (`page-title-text` in all three of `stage3-ANPS.html`, `stage5.html`, `mitigation not identified.html`, `qa-review.html`). Keep.
- *QA Review*  -  title for the QA-facing variant of Send Correspondence (`qa-review.html`).
- *Letter Generation*  -  new column on My Workflow / Approval Queue / Workflow Manager (BR-03).
- *Knowledge Source +*  -  admin area for BR-11 content with 24h SLA.

## 2. Web  -  Navigation model

- **Primary navigation:** persistent left sidebar (matches prototype `sidebar-nav` / `m-nav-item`). Items grouped:
  1. *Work*  -  Home, My Workflow, Rep Review, Approval Queue, Workflow Manager
  2. *Cases*  -  Search, Notice Processing, Manual Case, HHD Message, council shortcuts (Wokingham PCN, etc.)
  3. *Insight*  -  Reports, Dashboard
  4. *Admin*  -  Client, CR Config, Knowledge Source +, Users & Roles, Audit Log Viewer
- **Secondary navigation:** in-page tabs for the Send Correspondence detail (Validation Results / Mitigation / Suggested Letter / Notes / Attachments). Keyboard accessible via `Tab` + arrow keys (WCAG 2.1.1, 2.4.7).
- **Breadcrumb:** above the page title for any 3rd-level page (e.g. *My Workflow > Case 00345678 > Send Correspondence*). Required for WCAG 2.4.8.
- **Skip-to-main:** first focusable element on every page (WCAG 2.4.1).
- **Consistent help:** Help / Support entry pinned to the bottom of the sidebar on every page (WCAG 3.2.6 *Consistent Help*  -  new in 2.2).
- **Global header:** brand mark + page title + global search + user menu + notification bell. Stays present across all pages (WCAG 3.2.3 Consistent Navigation).
- **Status banners:** portal status (Notice IQ / third-party CRM up or down), Knowledge Source + version banner, surfaced at top of `My Workflow`, `Approval Queue` and `Workflow Manager`.
- **Modal patterns** (already in prototype, retained):
  - "Send for QA review?" (agent submit, Yes/No)
  - "Approve and send correspondence?" (QA approve)
  - "Reject this correspondence?" (QA reject, requires note)
  - Add notes drawer
  - Email picker, Address picker, Attachment uploader
  - Letter / Case picker
- **Focus behaviour on modals:** trap focus inside modal; on open, default focus is on the **safer** option (Cancel / No / non-destructive) per WCAG 3.3.4.

## 3. Web  -  Role-based access matrix

| Area / Page                         | Processing Agent (P1) | QA Reviewer (P2) | Workflow Manager (P3) | Knowledge Owner (P4) | Admin |
|-------------------------------------|:---------------------:|:----------------:|:---------------------:|:--------------------:|:-----:|
| Home                                | R                     | R                | R                     | R                    | R     |
| Search                              | R                     | R                | R                     | R                    | R     |
| My Workflow                         | R / W (own queue)     | R (sample only)  | R / W (all agents)    |  -                     | R / W |
| Rep Review                          | R / W (own)           | R                | R                     |  -                     | R / W |
| Approval Queue                      | R (own returned)      | R / W            | R                     |  -                     | R / W |
| Workflow Manager                    |  -                      | R                | R / W                 | R                    | R / W |
| Send Correspondence (case detail)   | R / W                 | R                | R                     |  -                     | R / W |
| QA Review (case detail)             | R (read-only on own)  | R / W            | R                     |  -                     | R / W |
| Mitigation Not Identified (excpt)   | R / W                 | R                | R                     |  -                     | R / W |
| Notice Processing                   | R / W                 | R                | R                     |  -                     | R / W |
| HHD Message                         | R / W                 |  -                 | R                     |  -                     | R / W |
| Manual Case                         | R / W                 |  -                 | R / W                 |  -                     | R / W |
| Reports                             | R (own)               | R                | R / W                 | R                    | R / W |
| Dashboard                           | R (limited)           | R                | R / W                 | R                    | R / W |
| Knowledge Source + admin            |  -                      | R                | R                     | R / W                | R / W |
| Users & Roles (sampling %)          |  -                      |  -                 | R                     |  -                     | R / W |
| Audit Log Viewer                    | R (own actions)       | R (case + agent) | R (team)              | R (paragraph version)| R / W |
| Account                             | R / W (own)           | R / W (own)      | R / W (own)           | R / W (own)          | R / W |

Legend: **R** = read * **W** = write / edit * ** - ** = no access.

Notes:
- "Read on own" means a Processing Agent can re-open a case they previously worked on (Rep Review) but cannot edit it once QA owns it.
- Sampling % per agent (BR-07) is configured by Admin / Workflow Manager  -  agents see their own % read-only in their Profile.

## 4. Mobile  -  Sitemap (oversight subset)

Mobile is **not** for letter processing. It supports Workflow Manager and Knowledge Owner monitoring on the move.

```
ANPS (mobile)
+--- Home (role-aware tiles)
+--- Dashboard
|     +--- AI completion rate (G/A/R)
|     +--- QA pass rate
|     +--- Exception backlog
|     +--- Knowledge Source + change-log
+--- My Team (Workflow Manager)
|     +--- Agent detail -> today's throughput
+--- Cases
|     +--- Search
|     +--- Case detail (read-only)
|           +--- PCN meta
|           +--- Validation Results
|           +--- Suggested Letter (read-only)
|           +--- Audit trail
+--- Notifications
+--- Account
```

## 5. Mobile  -  Navigation model

- **Bottom tab bar (4 items):** Home * Dashboard * Cases * Notifications.
- **Account** behind avatar in top-right.
- Single-pointer alternative to every drag/swipe (WCAG 2.5.7).
- All interactive targets >= 44 x 44 px (WCAG 2.5.8 recommended).
- No horizontal scroll at 320 px viewport (WCAG 1.4.10).
- Consistent help link pinned to the *More* sheet on every screen (WCAG 3.2.6).

## 6. Mobile  -  Role-based access

| Area               | Processing Agent | QA Reviewer | Workflow Manager | Knowledge Owner | Admin |
|--------------------|:----------------:|:-----------:|:----------------:|:---------------:|:-----:|
| Home               | R                | R           | R                | R               | R     |
| Dashboard          |  -                 | R           | R                | R               | R     |
| My Team            |  -                 |  -            | R                |  -                | R     |
| Cases (read-only)  | R                | R           | R                | R               | R     |
| Notifications      | R                | R           | R                | R               | R     |
| Account            | R / W            | R / W       | R / W            | R / W           | R / W |

Letter editing, QA Approve/Reject, Knowledge Source + edits and sampling-rule changes are **desktop-only** to prevent accidental destructive actions on a small touch target.

## 7. High-level data flows

### 7.1 Stage 3 (Notice IQ) data flow

```
Stage 2 output (Validation) ---> ANPS DocProcessor
                                  |
                                  +--> classify case (G / A / R)
                                  |
                                  +--> assemble Suggested Letter
                                  |     using Knowledge Source +
                                  |     (paragraph version recorded)
                                  |
                                  v
                          My Workflow row
                          (Letter Generation = G / A / R)
                                  |
                                  v
                        Send Correspondence
                          |            |
                Green     |            | Amber / Red
                accept    |            | agent edits
                          v            v
                    Send (Notice IQ)   Send for QA review?
                          |                    |
                          |                    v
                          |            Approval Queue -> QA Review
                          |            +--------+--------+
                          |       Approve            Reject (note)
                          |            |                    |
                          |            v                    v
                          +---> Notice IQ send         Returned to agent
                                                      (Rep Review)
                                  |
                                  v
                         Audit log entry
                         (case, version, actor, timestamp)
```

### 7.2 Stage 5 (third-party / Non-Notice IQ) data flow

```
Stage 1 (Summary) + Stage 4 (Validation) ---> ANPS DocProcessor
                                  |
                                  +--> classify case (G / A / R)
                                  |
                                  +--> assemble Suggested Letter
                                  |     (Knowledge Source +)
                                  |
                                  v
                          My Workflow row
                                  |
                                  v
                        Send Correspondence
                          |            |
                Green     |            | Amber / Red
                accept    |            | agent edits
                          v            v
              auto-transfer       Approval Queue (ALL amendments)
              into 3rd-party       |
              CRM template         v
                          |   QA Review -> Approve / Reject
                          |             |            |
                          |             v            v
                          |   auto-transfer    Returned to agent
                          |   into CRM
                          v
                  Audit log entry
                  (case, version, CRM ack)
```

### 7.3 Knowledge Source + flow (BR-11, 24h SLA)

```
Council policy update
        |
        v
Knowledge Owner edits paragraph (Admin -> Knowledge Source +)
        |
        v
Submit for publish
        |
        v
LV publish job (target <= 24h)
        |
        v
New paragraph version live
        |
        +--> All new Suggested Letters use new version
        |
        +--> Banner on cases mid-flight that used old version
        |
        +--> Audit log: who edited, what changed, when live
```

### 7.4 Letter Generation column (BR-03)  -  derivation

```
case.classification in {Green, Amber, Red}
where
  Green = AI completed all required sections, no manual intervention needed
  Amber = AI partially completed; one or more sections need agent edit
  Red   = AI cannot complete (mitigation not identified / policy gap / data missing)

UI rule: column cell = <chip color={status} icon={statusIcon} label={statusLabel}/>
         icon + colour + text label (WCAG 1.4.1)
```

## 8. URL conventions

- `/work/my-workflow`
- `/work/approval-queue`
- `/work/workflow-manager`
- `/case/{caseId}/correspondence` (Send Correspondence)
- `/case/{caseId}/qa` (QA Review)
- `/case/{caseId}/mitigation-not-identified`
- `/admin/knowledge-source`
- `/admin/users-roles`
- `/audit?case={caseId}` (or `?agent=...`, `?paragraphVersion=...`)

Case IDs are opaque (no PCN number in URL) to avoid PII in browser history and to support the BR-13 QR-code privacy requirement.

## 9. Acceptance criteria

- [ ] Every page reachable in <= 3 clicks from Home for its primary persona (WCAG 2.4.5 *Multiple Ways*).
- [ ] Sidebar order and labels match the prototype exactly; any change goes through IA sign-off.
- [ ] Role-based access matrix enforced server-side, not only in the UI.
- [ ] Letter Generation column rendered with chip + icon + label everywhere it appears.
- [ ] Help / Support pinned in the same relative position on every page and on the mobile *More* sheet (WCAG 3.2.6).
- [ ] All modals trap focus and default to the safer option (WCAG 3.3.4).
- [ ] Audit log queryable by case, agent, QA, council, paragraph version, date range.
