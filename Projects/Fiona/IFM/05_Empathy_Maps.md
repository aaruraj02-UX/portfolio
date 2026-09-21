# Empathy Maps — Integration Failure Management (IFM)

**Module:** FINOPS › Integration Failure Management
**Version:** 1.0 · 2026-06-10
**Aligned to:** [01_UX_Brief.md](01_UX_Brief.md) · [06_Personas.md](06_Personas.md)

---

## Index

1. [Claire — Senior Finance Systems Technician (Finance Systems User)](#1-claire--senior-finance-systems-technician)
2. [Priya — Masterdata Analyst (Masterdata User)](#2-priya--masterdata-analyst)
3. [Anita — Finance Systems Lead (Approver)](#3-anita--finance-systems-lead-approver)

---

## 1. Claire — Senior Finance Systems Technician

> **Context:** Owns the end-to-end fail → fix → close lifecycle. Spends most of her morning triaging the overnight D365 failure list and routing items to Masterdata.

### Think & Feel

- “Another full inbox of failures — I need a single screen, not five.”
- “I trust the team but I don’t trust email threads for audit.”
- “When something is closed, it should *stay* closed unless we say otherwise.”
- “I feel responsible for the SLA — if a record sits idle, it’s on me.”
- Quietly proud of how she has tamed the chaos with the macro workbook — wary that any replacement matches that mastery.

### See

- D365 daily processing report (CSV / portal).
- Halo ticketing system — multiple tabs open all morning.
- Macro-based Excel workbook (the thing IFM replaces).
- Email threads, often with the same record discussed in three places.
- Teams chat from the Operations Lead asking for status on specific records.

### Say & Do

- “Did Masterdata get the file?”
- “Who closed F-0028? I need the audit.”
- “Bulk-select these five and email Masterdata together.”
- Keeps a personal spreadsheet of *her* records as a hedge against the shared workbook.
- Coaches junior FS technicians on the conventions (Halo ticket format, naming).

### Hear

- Operations Lead pushing for faster resolution.
- AR team calling about downstream invoice issues caused by un-redropped failures.
- Audit & Compliance reminding the team about traceability.
- Masterdata pinging back: “Need more info on record F-0040.”

### Pain Points

- **Email is the system.** Threads break, attachments get stripped, ownership is unclear.
- **No live status.** The only way to know where a record is, is to ask.
- **No enforcement.** Anyone can mark anything closed in Excel. There is no audit-grade trail.
- **Duplicate effort.** Manually composing emails when the same recipient gets five records a day.
- **Reopen risk.** A closed record in Excel can be silently re-edited.
- **Tool sprawl.** Excel + Outlook + D365 + Halo, four contexts, no anchor.

### Gains

- One queue per status, filtered to her role.
- Halo ticket gating means an audit-clean handoff every time.
- A side panel that consolidates fields, comments and audit in one place.
- Bulk email per failure type rule — no more 1:1 emails.
- Reopen is explicit and approval-gated — Compliance will love it.
- Clear KPI feedback (Phase 2) that lets her demonstrate the team’s impact.

### Quote

> *“If I can route a failure to Masterdata in three clicks and prove it in audit, you’ve replaced my whole workbook — and my whole Outlook folder.”*

---

## 2. Priya — Masterdata Analyst

> **Context:** Works inside D365 most of the day adding translations, releasing holds, and fixing master data. IFM is the inbox for the work the Finance Systems team has assigned to her.

### Think & Feel

- “Just show me what I need to action — nothing else.”
- “I don’t want to break anyone’s workflow by clicking the wrong thing.”
- “A clear note + status change is enough — I don’t need to write essays.”
- Slight wariness about new tools — has been burned by overly-complex portals before.
- Pride in her D365 mastery; the portal needs to respect her speed.

### See

- D365 master data screens — customer / supplier / translation tables.
- FINOPS IFM list pre-filtered to `With Masterdata`.
- The note that Finance Systems left on the record.
- Reference docs for translation conventions.

### Say & Do

- “Released customer C00099 from hold — back to FS.”
- “Why am I seeing records that aren’t mine?” *(she shouldn’t — IFM enforces this)*.
- Quickly moves records back as soon as the upstream fix is in.
- Logs into FINOPS from her email link rather than memorising URLs.

### Hear

- Finance Systems chasing status of in-flight records.
- Internal Masterdata leads asking for monthly mapping reports.
- Her team’s morning stand-up: “Anything blocked on us?”

### Pain Points

- **Receives records that aren’t hers** (in the email-driven world).
- **No proof of action** when she replies on email — she sometimes has to forward her own message back.
- **Status ambiguity** — after she emails back, she has no way to know if the record was actually redropped.
- **Can edit too much** in the workbook today — a single keypress can corrupt a row.
- **No queue view** of what’s outstanding; relies on email count.

### Gains

- A clean queue: only `With Masterdata` records, only assigned to her team.
- Read-only form — she literally cannot break a field she shouldn’t touch.
- One-click `Move to Finance Systems` with a single note field.
- Audit trail shows her name + timestamp — proof of action without forwarding emails.
- Quick to learn — landing page is the queue; no nav to memorise.

### Quote

> *“Show me only what I can do, and let me do it in one click. The audit will tell me when it’s out of my hands again.”*

---

## 3. Anita — Finance Systems Lead (Approver)

> **Context:** Oversees the Finance Systems team. Most of her IFM time is spent approving (or rejecting) requests to reopen resolved records and watching the overall queue health for backlogs.

### Think & Feel

- “Reopens are the only place I personally intervene — and they have to be defensible.”
- “If I can’t see the audit, I can’t approve.”
- “I shouldn’t have to leave the request to make the call.”
- Confident decision-maker; impatient with tools that ask her to assemble context from three places.

### See

- Notification of a pending reopen request.
- Resolved records list (her default landing as Approver).
- The audit trail tab of the requested record.
- The KPI dashboard (separate FINOPS module).

### Say & Do

- “Show me the audit, then I’ll decide.”
- “If the reason isn’t in the request, I reject — no exceptions.”
- “Approve. Sent back to Masterdata — they’ll know what to do.”
- Sometimes triple-checks audit before approving high-impact reopens.
- Keeps her own KPI: % approved vs rejected per month.

### Hear

- Finance Systems requesters: “Can you approve quickly?”
- Compliance: “Every reopen needs a paper trail.”
- Internal Audit: “Walk me through the lifecycle of record X.”

### Pain Points

- **No structured reason** on a reopen request in v1 — she relies on context.
- **Context-switching** to read the full audit before deciding.
- **No escalation policy** in v1 — if she’s out, the request waits.
- **No SLA visibility** on her response time.
- Approval has historically been by email — informal and not audit-grade.

### Gains

- A two-button decision (`Approve` / `Reject`) inside the same panel as the audit trail.
- Auto-routing back to Masterdata on approval — she doesn’t have to ask anyone.
- Every decision is a typed audit row with her actor + role + timestamp.
- Read-only access to every queue means she can spot backlogs proactively.
- (Phase 1.1) Optional decision-reason note that flows to FS + audit.

### Quote

> *“If I can see the full audit and click one button, I’ll approve in under a minute. Anything more and the request waits.”*

---

## Cross-cutting empathy themes

| Theme | Felt by | Design response |
|-------|---------|-----------------|
| “Show me only what I can act on.” | All three roles | Role-gated sidebar + status cards + table filter; role switcher with persistent banner. |
| “I need proof of what happened.” | All three roles | Audit Trail tab on every record, read-only to all, written automatically on every state change. |
| “I don’t want to break something I shouldn’t touch.” | Priya, Anita | Read-only form variants for non-edit roles; disabled inputs (not hidden), so context is preserved. |
| “Stop making me email about it.” | Claire, Priya | Status changes replace email handoffs; bulk Send Email is grouped and confirmed. |
| “The status badge should mean what it says.” | All | Single canonical taxonomy: Open · With Masterdata · With Finance Systems · Closed. Icon + text, never colour-only. |
| “Reopen has to be impossible without approval.” | Claire, Anita, Compliance | UI button creates a *request*; server-enforced status transition; Approver decision is a typed audit event. |
