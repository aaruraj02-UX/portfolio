# UX Research Plan
## FieldSync Field App — Task Management & SLA Workflow Module

| Field               | Detail                                              |
|---------------------|-----------------------------------------------------|
| **Project**         | FieldSync Field App — Task Management & SLA Workflow   |
| **Prepared by**     | UX Team                                             |
| **Date**            | March 2026                                          |
| **Research Phase**  | Pre-Development Validation                          |
| **Version**         | 1.0                                                 |

---

## 1. Background

The UX Research Plan supports the design and development of the Task Management & SLA Workflow Module for the FieldSync Field App. Initial design artefacts (UX Brief, Personas, Empathy Maps, Task Analysis, Information Architecture, User Journeys, Wireframes) have been produced using business requirements documentation and structured stakeholder interviews. This research plan defines the activities required to validate those artefacts with real users before development commences and to identify usability issues in the prototype.

---

## 2. Research Objectives

| # | Objective                                                                                      | Priority |
|---|------------------------------------------------------------------------------------------------|----------|
| R1 | Validate the task lifecycle flow (Assigned → In Progress → Completed / Cancelled) is clear and intuitive for Agent users. | High |
| R2 | Evaluate whether the comment validation rules (10–100 chars, restricted character set) create friction or confusion. | High |
| R3 | Assess whether SLA visibility in the task list is sufficient for Agents to self-manage priorities. | High |
| R4 | Validate the linear list card layout (vs grid) preference expressed in user interviews. | High |
| R5 | Evaluate the Reassignment user picker — can Managers find the correct agent quickly? | High |
| R6 | Confirm whether structured rejection/cancellation reason picker reduces cognitive load vs free-text. | Medium |
| R7 | Test whether the Business Area Switcher meets the need for cross-area visibility (Manager and Admin). | Medium |
| R8 | Evaluate the Critical Task Popup — does it effectively interrupt without frustrating the user? | Medium |
| R9 | Validate that the SLA Configuration panel is usable and safe for Admin users to modify thresholds. | Medium |
| R10| Identify any WCAG 2.2 AA barriers experienced by users with accessibility needs or assistive technology. | High |

---

## 3. Research Questions

### Agent (Field Worker)
- How do agents currently realise a task is overdue? What triggers them to act?
- Do agents understand the difference between Reassign, Escalate, and Reprioritise?
- Is the mandatory comment requirement clear before the action is taken — or discovered only on error?
- What happens if an agent receives a Critical task popup mid-completing another task?
- Does the SLA pill in the task list change how agents prioritise their day?
- How do agents feel about the character-restricted comment box — empowering or frustrating?

### Manager (Business Area Manager)
- How does the Manager currently assess SLA health at the start of the day?
- When re-assigning a task, how do managers currently assess agent workload? Is the workload indicator sufficient?
- What context does a Manager need to see on a task card that is currently missing?
- Does the Business Area Switcher support the need to view cross-area tasks — or is this a workaround?
- Are the dashboard metric tiles (Total / Inside SLA / Approaching / Overdue) the right KPIs, or are others more useful?

### Admin (System Administrator)
- What process does the Admin currently follow to verify that SLA threshold changes have been applied?
- What information do Admins need in the audit trail that is currently missing?
- Is the reason-for-change gate on SLA configuration sufficient as a control mechanism?
- How do Admins currently manage trust and access for new agent accounts?

### Shared / Cross-Role
- Does the notification / SLA alert popup create necessary urgency or unwanted noise?
- Is the task history panel in the detail view sufficient for understanding the lifecycle of a task?
- Are the status labels (Assigned, In Progress, Overdue, Completed, etc.) clear and mutually exclusive in meaning?

---

## 4. Research Methodology

The research plan uses a mixed-methods approach combining moderated usability testing with contextual inquiry and survey to balance depth of insight with breadth of validation.

### 4.1 Method 1 — Moderated Usability Testing (Remote)

| Attribute      | Detail                                                                                 |
|----------------|----------------------------------------------------------------------------------------|
| **Purpose**    | Evaluate prototype usability against specific task flows; identify critical usability barriers. |
| **Format**     | Remote moderated session via video call with screen share and recording consent.       |
| **Duration**   | 60 minutes per session (5 min intro, 45 min tasks, 10 min debrief).                   |
| **Approach**   | Think-aloud protocol; participant narrates thoughts while completing structured tasks. |
| **Participants**| 5–6 Agents, 3–4 Managers, 2–3 Admins = 10–13 total participants.                   |
| **Recruitment**| Internal recruitment via Business Area Managers; exclude participants involved in requirements gathering to avoid confirmation bias. |
| **Prototype**  | High-fidelity HTML prototype (07_Wireframes.html) — browser-based, no installation. |
| **Recording**  | Video + audio recording with participant consent; transcript generated for analysis. |
| **Analysis**   | Affinity mapping; severity scoring using Nielsen 0–4 scale; pattern identification across sessions. |

---

### 4.2 Method 2 — Contextual Inquiry (Shadowing)

| Attribute      | Detail                                                                                 |
|----------------|----------------------------------------------------------------------------------------|
| **Purpose**    | Observe field workers in their natural context operating existing task management systems to surface workarounds, mental models, and environmental constraints. |
| **Format**     | On-site observation at one Business Area (Metering) during a standard field shift. |
| **Duration**   | 2 hours observation + 30 minute debrief interview per participant.                    |
| **Participants**| 2–3 Agents, 1 Manager.                                                               |
| **Focus Areas**| How tasks arrive; how SLA is currently monitored; what causes a task rejection/cancellation; workarounds used; device and environment constraints. |
| **Output**     | Field notes; photographed artefacts (printed lists, whiteboard schedules); annotated workflow diagrams. |

---

### 4.3 Method 3 — Accessibility Testing

| Attribute      | Detail                                                                                 |
|----------------|----------------------------------------------------------------------------------------|
| **Purpose**    | Identify WCAG 2.2 AA barriers experienced by users with accessibility needs.          |
| **Format**     | 1:1 remote session; participants use their own assistive technology.                  |
| **Duration**   | 60 minutes per session.                                                                |
| **Participants**| 2 participants: 1 keyboard-only user; 1 screen reader user (NVDA + Chrome or JAWS + Edge). |
| **Tasks**      | Core flows only: view task list, open task detail, complete a task, read error message. |
| **Analysis**   | WCAG 2.2 AA criterion-mapped issue log; severity rating; remediation recommendation. |

---

### 4.4 Method 4 — Post-Task Survey (Quantitative)

| Attribute      | Detail                                                                                 |
|----------------|----------------------------------------------------------------------------------------|
| **Purpose**    | Collect standardised perception scores to benchmark and compare across tasks and roles. |
| **Format**     | Post-session digital survey (Microsoft Forms); 5 minutes.                             |
| **Measures**   | System Usability Scale (SUS, 10 items); 3 custom task-confidence questions (5-point Likert). |
| **Target**     | SUS score ≥ 75 (Good); task confidence ≥ 4/5 on critical flows.                     |

---

## 5. Participant Profiles

### 5.1 Agent / Assignee Participants

| Attribute           | Requirement                                                        |
|---------------------|--------------------------------------------------------------------|
| **Role**            | Field agent / assignee within a Business Area                      |
| **Tech Comfort**    | Low to Medium — use desktop/web tools daily                        |
| **Business Area**   | Ideally mix of business areas (e.g., Metering, Billing, Gas)       |
| **Experience**      | Active in task management for ≥ 3 months                           |
| **Exclude**         | Participants involved in BRD requirements sessions                 |
| **Number**          | 5–6 participants                                                   |

### 5.2 Manager Participants

| Attribute           | Requirement                                                        |
|---------------------|--------------------------------------------------------------------|
| **Role**            | Business Area Manager responsible for a team of agents            |
| **Tech Comfort**    | Medium to High                                                     |
| **Responsibility**  | Currently responsible for SLA monitoring and task reassignment    |
| **Exclude**         | Participants involved in BRD requirements sessions                 |
| **Number**          | 3–4 participants                                                   |

### 5.3 Admin Participants

| Attribute           | Requirement                                                        |
|---------------------|--------------------------------------------------------------------|
| **Role**            | System Administrator with SLA configuration access                |
| **Tech Comfort**    | High to Very High                                                  |
| **Responsibility**  | Manages user accounts, SLA thresholds, system configuration       |
| **Number**          | 2–3 participants                                                   |

### 5.4 Accessibility Participants

| Attribute           | Requirement                                                        |
|---------------------|--------------------------------------------------------------------|
| **AT Required**     | 1× keyboard-only user; 1× screen reader user (NVDA or JAWS)       |
| **Role**            | Any of the 3 user roles above                                      |
| **Number**          | 2 participants                                                     |

---

## 6. Task Scenarios — Usability Testing

The following task scenarios are written as realistic user stories to be given to participants. Participants are not given step-by-step instructions.

---

### Scenario Set A — Agent Tasks

#### A1: View Your Tasks
> "You have just started your shift. Log in and find out what tasks have been assigned to you. Identify which task needs your attention most urgently."

**Success Criteria:** Participant navigates to Task List, identifies Overdue or Critical task without assistance.
**Observations:** Does the SLA pill surface urgency? Is the card layout scan-able? Does the user comprehend status badges?

---

#### A2: Mark a Task as In Progress
> "You have just started work on the electrical fault in Market Street (TASK-00003). Update the system to reflect that."

**Success Criteria:** Participant successfully selects "Mark as In Progress" and submits a valid comment.
**Observations:** Is the action dropdown discoverable? Does the user know a comment is required before selecting the action or only after attempting to submit? Does character validation create confusion?

---

#### A3: Complete a Task with a Comment
> "You have finished attending to the meter fault at 14 Oak Lane (TASK-00006). Mark it as complete and provide a reason."

**Success Criteria:** User selects Complete, enters valid comment (10–100 chars, allowed characters), confirms in modal, sees success toast.
**Observations:** Are allowed characters known? Does the user understand what the confirmation modal is asking? Is the SLA continuation notice noticed?

---

#### A4: Cancel a Task
> "The job at TASK-00009 has been cancelled by the customer. Record this in the system."

**Success Criteria:** User selects Cancel, chooses a reason, adds comment, confirms.
**Observations:** Does the user understand Cancel vs Reject? Is the reason picker helpful or limiting? Does the user understand this is irreversible?

---

#### A5: Respond to a Critical Task Notification
> "You are midway through completing Task A when a red popup appears on screen. Read the popup and decide what to do."

**Success Criteria:** User reads popup, understands it requires their attention, and either acknowledges or acts on it.
**Observations:** Is the popup alarming in a useful way? Does the 30-minute SLA create urgency? Does it interrupt usability poorly?

---

### Scenario Set B — Manager Tasks

#### B1: Morning SLA Review
> "It is 08:30. You want to understand the SLA health for your team for today. Use the dashboard to assess this."

**Success Criteria:** Manager reads KPI tiles, identifies overdue tasks, drills into task list filtered by Overdue.
**Observations:** Are KPI tiles sufficient? Can user drill through from tile to filtered list without instructions? Is the task list filterable quickly?

---

#### B2: Reassign a Task
> "TASK-00004 has been assigned to Ahmed, but he called in sick today. Reassign it to someone else in your team who has capacity."

**Success Criteria:** Manager opens task, selects Reassign, opens user picker, selects appropriate agent (using workload indicator), adds comment, confirms.
**Observations:** Is the user picker clear? Are workload counts useful? Does the business area restriction cause confusion? Is the comment understood as required?

---

#### B3: Reprioritise a Task and Understand SLA Reset
> "TASK-00012 was marked as Low priority but the customer has escalated it. Change the priority to High."

**Success Criteria:** Manager selects Reprioritise, selects new priority, sees SLA reset warning, adds comment, confirms.
**Observations:** Is the SLA reset warning seen and understood? Does the SLA duration change notification appear clearly? Is this action understood as irreversible to current SLA?

---

### Scenario Set C — Admin Tasks

#### C1: Adjust an SLA Threshold
> "The business has decided to extend the SLA for Low priority tasks from 8 hours to 12 hours. Make that change now."

**Success Criteria:** Admin navigates to SLA Configuration, locates Low priority row, initiates edit, enters reason for change, saves.
**Observations:** Is the configuration table clear? Is the reason-for-change field obviously required? Is the impact warning surfaced? Is the save confirmation clear?

---

#### C2: Review the Audit Trail After a Change
> "You changed the Low priority SLA last week. Find the audit record of that change."

**Success Criteria:** Admin navigates to SLA Audit Trail, filters by date or modified-by user, locates the record.
**Observations:** Is the audit trail discoverable? Is the filter functional and helpful? Is the export capability visible?

---

## 7. Interview Discussion Guide — Post-Session Debrief

The following questions are used after the usability task completion to gather contextual insight and preferences.

### Opening
1. Tell me about your typical day working with task management. How often do you need to action tasks?
2. What tools or systems do you use currently? What works well? What frustrates you?

### Specific Flow Questions
3. When you were completing the comment box — how did that feel? Were the rules clear to you?
4. What did you think when you saw the SLA pill on the task cards? How useful was it?
5. Is there anything you expected to see in the task detail view that wasn't there?
6. How did the linear list layout feel for scanning tasks compared to any grid or tile layouts you have used before?

### Mental Model Questions
7. In your mind, what is the difference between Escalating a task and Reassigning it?
8. If an agent is sick, what is the fastest way to redistribute their tasks? Walk me through what you'd expect to do.
9. When would you cancel a task vs reject it — are those different things to you?

### Prioritisation Insight
10. If you could only fix two things in what you saw today — what would they be?
11. Is there anything in the current system that you would be sad to lose when this new module goes live?

### Closing
12. Is there anything else you'd like to share that we didn't cover?

---

## 8. Research Timeline

| Phase                        | Activity                                     | Duration     | Owner        |
|------------------------------|----------------------------------------------|--------------|--------------|
| Preparation                  | Recruit participants; brief moderators; finalise prototype | Week 1 | UX Lead |
| Pilot Session                | Internal dry-run; validate tasks + timing     | Day 1, Week 2 | UX Team |
| Contextual Inquiry           | On-site field observation (Metering BA)      | Days 2–3, Week 2 | UX Researcher |
| Usability Testing — Agents   | 5–6 remote moderated sessions                | Days 4–5, Week 2 | UX Researcher |
| Usability Testing — Managers | 3–4 remote moderated sessions                | Days 1–2, Week 3 | UX Researcher |
| Accessibility Testing        | 2 AT sessions                                | Day 3, Week 3 | UX Researcher |
| Admin Sessions               | 2–3 remote moderated sessions                | Day 4, Week 3 | UX Researcher |
| Analysis & Synthesis         | Affinity mapping; severity scoring; patterns | Week 4        | UX Team |
| Report & Recommendations     | Research findings report; updated backlog    | End of Week 4 | UX Lead |

---

## 9. Outputs and Deliverables

| Output                          | Format                    | Audience              |
|---------------------------------|---------------------------|-----------------------|
| Research Findings Report        | Markdown / Slide deck     | Product + Dev + Design |
| Updated Heuristic Evaluation    | Updates to `08_Heuristic_Evaluation.md` | UX Team |
| Updated UX Backlog              | Updates to `10_UX_Backlog.md` | Product + UX     |
| WCAG 2.2 AA Issue Log (updated) | Markdown table            | Dev Team              |
| Affinity Diagrams               | Miro board / FigJam       | UX Team               |
| SUS Score Summary               | Table + bar chart         | Stakeholders          |
| Session Recordings              | Encrypted cloud storage   | UX Team only (GDPR)   |

---

## 10. Ethics, Privacy and GDPR

| Consideration               | Approach                                                              |
|-----------------------------|-----------------------------------------------------------------------|
| Informed Consent            | Written consent form before each session; consent to record obtained separately from consent to participate. |
| Right to Withdraw           | Participants may withdraw at any time without consequence.           |
| Data Minimisation           | Recordings retained only as long as analysis requires; deleted on report sign-off. |
| Anonymisation               | All quotes and findings anonymised in report (no names, no identifiable detail). |
| Storage                     | Session recordings stored on encrypted internal drive; access limited to UX research team. |
| Special Category Data       | No health or biometric data collected.                               |
| Children / Vulnerable Users | Not applicable — all participants are internal employees.            |

---

## 11. Risks and Mitigations

| Risk                                         | Likelihood | Impact | Mitigation                                                    |
|----------------------------------------------|------------|--------|---------------------------------------------------------------|
| Insufficient participant recruitment         | Medium     | High   | Start recruitment Week 1; brief Business Area Managers directly. |
| Participant cancellation on the day          | Medium     | Medium | Schedule replacements; maintain a reserve list of 2 per cohort. |
| Prototype fails during session               | Low        | High   | Test prototype on multiple browsers before pilot; have static screenshots as fallback. |
| Moderator bias affecting task observations   | Low        | Medium | Brief moderators on neutral language; use think-aloud protocol consistently. |
| GDPR concern from participants re: recording | Low        | Medium | Clear consent process; option for notes-only sessions if participant declines recording. |
| Remote tech issues (connectivity, screen share) | Medium  | Low    | 5-minute technical buffer at session start; have phone dial-in fallback. |
