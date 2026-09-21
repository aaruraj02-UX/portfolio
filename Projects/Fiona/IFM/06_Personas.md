# Personas — Integration Failure Management (IFM)

**Module:** FINOPS › Integration Failure Management
**Version:** 1.0 · 2026-06-10
**Aligned to:** [01_UX_Brief.md](01_UX_Brief.md) · [03_Information_Architecture.md](03_Information_Architecture.md) · `business/IFM/IFM_RBAC.xls`

---

## Persona index

| # | Persona | Role in IFM | Tier |
|---|---------|-------------|------|
| 1 | **Claire Ndaba** — Senior Finance Systems Technician | Finance Systems User | Primary |
| 2 | **Priya Sharma** — Masterdata Analyst | Masterdata User | Primary |
| 3 | **Anita Oyeleke** — Finance Systems Lead | Approver | Primary |
| 4 | **James Roberts** — Finance Operations Lead | KPI consumer / Stakeholder | Secondary |

> Personas reflect the three RBAC roles defined in `business/IFM/IFM_RBAC.xls` plus one named stakeholder who consumes IFM KPIs from outside the module.

---

## 1. Claire Ndaba — Senior Finance Systems Technician

| | |
|---|---|
| **Name / Role** | Claire Ndaba — Senior Finance Systems Technician |
| **IFM role** | Finance Systems User |
| **Age** | 34 |
| **Location** | London, UK (hybrid) |
| **Reports to** | Anita Oyeleke (Finance Systems Lead) |
| **Tech comfort** | High — power Excel user, comfortable in D365, Halo, FINOPS |
| **Time in role** | 5 years (3 in current role, 2 prior in AR ops) |

### Goals

- Log every integration failure into IFM within minutes of D365 reporting it.
- Route translation-dependent failures to Masterdata cleanly, with a Halo ticket attached every time.
- Drive median resolution time below 2 business days.
- Maintain an audit-clean trail for every record so AR, Compliance and Internal Audit never have to chase her.
- Make sure no record ever “falls off the back of the desk”.

### Daily tasks

- Pull the overnight D365 failure report at start of day.
- Log new failure records into IFM (often in batches).
- Raise / capture Halo tickets for each failure.
- Bulk-select records and trigger the Masterdata email.
- Triage records returned by Masterdata, run redrops, capture redrop tickets, close records.
- Raise reopen requests when downstream issues surface (rare, but high-stakes).
- Mentor junior FS technicians on the conventions.

### Frustrations

- The current Excel workbook is unwieldy at scale; macros break.
- Email is the de-facto status board — and it is unreliable.
- No live view of who is doing what; she has to ask.
- Closed records can be silently re-edited in Excel — Compliance risk.
- Repeated email composition for the same recipient.
- Tool-switching between D365, Halo, Outlook and the workbook.

### Motivations

- Pride in operational excellence — wants the team to look sharp on KPIs.
- Career growth into the Operations Lead path.
- Reducing the volume of late-night fire-fighting.
- Demonstrating measurable improvement against the old workbook era.

### Tech comfort

- Power user. Excel, D365, Halo, FINOPS, Power BI.
- Comfortable with keyboard shortcuts, bulk operations, basic SQL.

### Quotes

> *“If I can route a failure to Masterdata in three clicks and prove it in audit, you’ve replaced my whole workbook — and my whole Outlook folder.”*

> *“The status badge should mean what it says. If it’s ‘With Masterdata’, it had better have left my desk.”*

### Key needs from IFM

- A bulk-friendly records table with role-aware filters.
- Conditional, progressive form (fewer fields when not relevant).
- Hard gating on Halo ticket before Send Email.
- Audit trail visible inline, no second tool.
- Reopen pathway that is explicit and approval-gated.

### Anti-needs

- Don’t turn the form into a 30-field wall.
- Don’t let her accidentally edit a Closed record.
- Don’t make her open another tab to see status.

---

## 2. Priya Sharma — Masterdata Analyst

| | |
|---|---|
| **Name / Role** | Priya Sharma — Masterdata Analyst |
| **IFM role** | Masterdata User |
| **Age** | 29 |
| **Location** | Coimbatore, IN |
| **Reports to** | Masterdata Operations Manager |
| **Tech comfort** | Medium-high — D365 expert, occasional portal user |
| **Time in role** | 2 years |

### Goals

- Action the records Finance Systems sends to Masterdata — quickly and accurately.
- Update mapping / release holds in D365 and hand the record back with a clear note.
- Never touch a record that wasn’t assigned to her team.
- Maintain a clean queue — “zero inbox” for With Masterdata.

### Daily tasks

- Check email / IFM in-app notification for newly assigned records.
- Open IFM (lands directly on the With Masterdata queue).
- For each record: open side panel → read context → fix in D365 → add note → move to Finance Systems.
- Coordinate with FS via in-record comments when context is missing.
- Monthly: produce a Masterdata mapping summary for her manager.

### Frustrations

- In the current model she receives records by email — sometimes the wrong ones.
- No way to prove she actioned a record except by forwarding her own email.
- The macro workbook lets her edit too much; she lives in fear of breaking a row.
- After she replies, she has no idea whether the FS team has redropped.

### Motivations

- Doing a clean job — every fix verified, every note clear.
- Quiet recognition from her manager via clean monthly numbers.
- Reducing the email noise in her day.

### Tech comfort

- High in D365 master data work.
- Medium in portals — prefers tools that show her the next action, not the whole system.

### Quotes

> *“Show me only what I can do, and let me do it in one click. The audit will tell me when it’s out of my hands again.”*

> *“I don’t want to see anything I shouldn’t be touching.”*

### Key needs from IFM

- Default landing on the With Masterdata queue, nothing else visible.
- Read-only form — no risk of accidental edits to FS-owned fields.
- Single primary action: `Move to Finance Systems`.
- An optional Notes field, prominent in her view of the side panel.
- Audit trail tab so she can see what happened before her involvement.

### Anti-needs

- No edit affordances on FS-only fields.
- No exposure to Open / With Finance Systems / Closed records.
- No configuration screens.

---

## 3. Anita Oyeleke — Finance Systems Lead (Approver)

| | |
|---|---|
| **Name / Role** | Anita Oyeleke — Finance Systems Lead / Named Approver |
| **IFM role** | Approver |
| **Age** | 41 |
| **Location** | London, UK (hybrid) |
| **Reports to** | Director of Finance Operations |
| **Tech comfort** | Medium-high — strong operational user, light power-user |
| **Time in role** | 4 years as lead, 8 years total in Finance Systems |

### Goals

- Approve or reject every reopen request with a defensible reasoning trail.
- Spot backlogs across statuses early — before they become SLA breaches.
- Ensure RBAC is respected — no role leakage, no informal workarounds.
- Provide audit-grade evidence to Compliance and Internal Audit when asked.

### Daily tasks

- Review the in-app + email queue of pending reopen requests (typically 0–5 per day).
- For each: open the record’s Audit Trail, then the Details tab, then decide.
- Click `Approve` or `Reject`.
- Skim each status queue once or twice a day to spot anomalies.
- Liaise with Anita / Operations weekly to triangulate KPI movement.

### Frustrations

- Reopen requests by email are unstructured — she has to piece together context.
- No SLA visibility on her response time.
- No escalation policy if she’s away.
- Audit history scattered across Excel, email, Teams.

### Motivations

- Defensible governance — every approval is justifiable.
- Team performance — she wants the KPI dashboard to tell a good story.
- Strategic credibility with Compliance and Audit.

### Tech comfort

- Strong operational user.
- Comfortable with reports, dashboards, audit views; not a coder.

### Quotes

> *“If I can see the full audit and click one button, I’ll approve in under a minute. Anything more and the request waits.”*

> *“Reopens are the only place I personally intervene — and they have to be defensible.”*

### Key needs from IFM

- Default landing on Resolved Records with side-panel focus on Audit Trail.
- A clear two-button decision (`Approve` / `Reject`) on Closed records.
- Read-only access to every queue for backlog spotting.
- Audit row written with her actor + role + timestamp on every decision.
- Phase 1.1 — optional reason note on the decision.

### Anti-needs

- No edit affordances on any record field.
- No configuration screens.
- No bulk approve — every decision is per-record by design.

---

## 4. James Roberts — Finance Operations Lead (Secondary)

| | |
|---|---|
| **Name / Role** | James Roberts — Finance Operations Lead |
| **IFM role** | None directly — consumes IFM KPIs from the FINOPS Admin Dashboard |
| **Age** | 47 |
| **Location** | London, UK |
| **Reports to** | CFO |
| **Tech comfort** | Medium — dashboard-first, rarely opens transactional tools |
| **Time in role** | 6 years |

### Goals

- See trend KPIs across IFM, OAP and other FINOPS modules at a glance.
- Identify systemic issues (e.g. recurring failure type spikes).
- Brief the CFO weekly on operational health.

### Daily tasks

- Reviews the FINOPS Admin Dashboard each morning.
- Drills into IFM only if a metric is amber/red.
- Holds weekly operations review with Anita.

### Frustrations

- KPIs that are not real-time.
- Dashboards that don’t let him drill in to a record.

### Motivations

- Demonstrating operational improvement to the board.
- Reducing manual remediation effort across the team.

### Tech comfort

- Dashboard-first; doesn’t open transactional tools unless he must.

### Quote

> *“Tell me the trend, then let me click into the record. If I can’t do both, I’m doing two jobs.”*

### Key needs from IFM (indirect)

- KPI data feed: median resolution time, queue depth per status, reopen rate, % records with Halo at email time.
- Per-record deep link from dashboard chart → IFM record side panel.
- Trust in the underlying RBAC and audit (so the dashboard numbers are defensible).

### Anti-needs

- He should never have to open IFM to *do* a job, only to *understand* one.

---

## Persona-to-flow coverage

| Flow ([04_User_Journeys.md](04_User_Journeys.md)) | Claire (FS) | Priya (MD) | Anita (Approver) | James (Secondary) |
|---------------------------------------------------|:-----------:|:----------:|:----------------:|:-----------------:|
| 1. Log a new failure | ✅ | — | — | — |
| 2. Receive returned record & close | ✅ | — | — | — |
| 3. Action With Masterdata queue | — | ✅ | — | — |
| 4. Request reopen on Closed | ✅ | — | — | — |
| 5. Review & decide on reopen | — | — | ✅ | — |
| (Future) Consume KPIs from dashboard | — | — | — | ✅ |
