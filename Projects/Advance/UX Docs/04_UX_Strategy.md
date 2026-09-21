# UX Strategy — ProServe Master EA Platform

| Field | Detail |
|---|---|
| **Project** | ProServe — Enforcement Agent Master Data Platform |
| **Version** | 1.0 |
| **Date** | 20 April 2026 |
| **Status** | Draft |

---

## 1. Vision

**One platform, one record, one truth.** The ProServe Master EA Platform delivers a role-appropriate, accessible, and governed experience for managing Enforcement Agent data — replacing fragmented multi-system workflows with a single, authoritative, and auditable interface.

---

## 2. UX Principles

| # | Principle | Description |
|---|-----------|-------------|
| P-1 | **Clarity** | Every interface element communicates its purpose. Editable vs. view-only fields are visually distinct. Role context is always visible. |
| P-2 | **Reliability** | Users trust that data entered once propagates correctly. Save states are explicit. Sync status is transparent. |
| P-3 | **Guidance** | Progressive disclosure leads users through complex workflows. Steppers, validation, and contextual help prevent errors before they occur. |
| P-4 | **Transparency** | Approval status, audit history, and sync health are always accessible. Nothing is a black box. |
| P-5 | **Consistency** | All interfaces follow MET-DS-V2 patterns. Same components, same interactions, same language across all roles and views. |
| P-6 | **Efficiency** | Minimise clicks, eliminate redundant entry, support keyboard navigation, provide smart defaults and auto-population. |

---

## 3. Strategic Objectives & KPIs

| # | Objective | KPI | Target |
|---|-----------|-----|--------|
| SO-1 | **Reduce onboarding time** — guided stepper replacing multi-system workflow | Time from EA data receipt to complete profile | ≤ 15 minutes (from 45+ minutes) |
| SO-2 | **Eliminate multi-system entry** — single data entry point | Number of systems a user must touch to complete a task | 1 (from 3–4) |
| SO-3 | **Accelerate approval cycle** — contextual approval with change highlighting | Average approval turnaround time | < 4 hours (from 2+ days) |
| SO-4 | **Reduce rejection rework** — section-level rejection comments | Rejection resubmission success rate | ≥ 90 % first-time fix |
| SO-5 | **Increase role clarity** — RBAC with visual field indicators | User-reported permission confusion incidents | ≤ 2 % of sessions |
| SO-6 | **Achieve data completeness** — mandatory field validation | Active EA profile completeness | 100 % |
| SO-7 | **WCAG 2.2 AA compliance** — accessible to all users | Automated + manual audit pass rate | 100 % AA conformance |

---

## 4. UX Pillars

### Pillar 1 — Simplified Workflows
**Problem:** Users currently navigate 3–4 systems to complete a single task.
**Strategy:**
- 8-step guided stepper for Add/Edit workflows with "Save & Continue" per step
- Steps dynamically filtered by RBAC — users only see entities relevant to their role
- Save-as-Draft capability to prevent data loss
- Auto-population from Talos integration for new EA onboarding
- Last visible step automatically converts "Save & Continue" to "Save Record"

### Pillar 2 — Role-Appropriate Views
**Problem:** All users see the same interface regardless of their permissions, causing confusion and errors.
**Strategy:**
- Entity-level RBAC: hide entities the role cannot access, show view-only badge for read-only entities
- Field-level RBAC: disable individual fields within editable entities, add "View" tag indicator
- Role banner always visible showing current role, access level, and "Switch Role" option (demo)
- Reject modal filtered by role — only shows sections the approver can comment on
- View page shows only accessible record cards per role

### Pillar 3 — Transparent Governance
**Problem:** Users lack visibility into approval status, change history, and sync health.
**Strategy:**
- Approval status banner on every record page (Pending / Approved / Rejected)
- Section-by-section rejection comments in reject modal
- Dual-control (Keyer/Verifier) workflow enforced at the UI level
- Full audit trail accessible from the record (who, when, what, from which system)
- Integration sync status visible per EA — success/failure per downstream system

### Pillar 4 — Progressive Disclosure
**Problem:** 8 entities with 100+ fields overwhelm users, especially those with limited access.
**Strategy:**
- Stepper workflow reveals one entity at a time
- 360° Profile View (read-only) organises entities into collapsible cards
- Personal Details tab in view page provides summary; other entities in record cards
- Complex fields (postcodes, attachments, banking) use contextual expansion panels
- Tooltip guidance for fields with specific validation rules

### Pillar 5 — Accessible & Inclusive Design
**Problem:** Enforcement agents in the field need mobile access; all users need WCAG 2.2 AA compliance.
**Strategy:**
- WCAG 2.2 AA conformance across all pages (contrast, keyboard navigation, focus management, screen reader support)
- Responsive design: forms adapt to mobile viewports
- Skip links, ARIA landmarks, and semantic HTML throughout
- Reduced-motion support via `@media (prefers-reduced-motion: reduce)`
- Error messages: colour + icon + text label — never colour alone
- Touch targets: minimum 24×24px (recommended ≥ 44×44px for primary actions)

### Pillar 6 — Data Integrity & Confidence
**Problem:** Users distrust data because different systems show different values.
**Strategy:**
- Single Source of Truth — all downstream systems sync from the Master EA Database
- Mandatory field validation before record creation/submission
- PAF postcode validation for address fields
- Real-time sync health indicators per EA record
- Conflict prevention: no two users can edit the same record simultaneously (optimistic locking)

---

## 5. Design System Alignment

| Aspect | Specification |
|--------|--------------|
| **System** | MET-DS-V2 |
| **Implementation** | React + MUI v5 (`@mui/material`) |
| **Primary** | #3276CF — all primary CTAs, active navigation, links |
| **Success** | #43A047 — approval, save confirmation, active badges |
| **Error** | #E53935 — rejection, validation errors, destructive actions |
| **Warning** | #FF9800 — view-only badges, expiring certifications |
| **Page bg** | #F2F5FA |
| **Cards** | #FFFFFF, 8px radius, elevation 0 |
| **Buttons** | 8px radius, `disableElevation`, sentence-case labels |
| **Inputs** | `variant="outlined"`, 8px radius |
| **Spacing** | 8pt grid — only 2/4/8/12/16/20/24/32/40/48px |
| **Typography** | system-ui stack, H1 24px/700, H2 20px/600, Body 14px/400 |

---

## 6. Phased Roadmap

### Phase 1 — Foundation (Current)
- Core CRUD workflows: Add, Edit, View EA records
- 8-entity stepper with RBAC entity-level filtering
- Role-based landing page with 10 roles
- Approval workflow (Pending → Approved / Rejected)
- Section-level rejection with comments
- Audit trail (view-only in prototype)
- Record list with search, filter, sort

### Phase 2 — Field-Level Control & Governance
- Field-level RBAC within editable entities (view-only fields, hidden fields)
- Dual-control (Keyer/Verifier) workflow with assignment rules
- Approval queues with prioritisation and age indicators
- Change diff highlighting in approval view
- Save-as-Draft persistence

### Phase 3 — Integration & Sync Transparency
- Per-EA sync health dashboard (Atlas, Optimise, Asset Register status)
- Automated sync alerts and failure notifications
- Talos auto-population integration
- PAF postcode validation service
- Retry and rollback mechanisms for failed syncs

### Phase 4 — Reporting & Analytics
- Operational dashboards (data completeness, approval throughput, sync health)
- Compliance dashboard (certification gaps, expiring bonds)
- Scheduled report generation (daily/weekly/monthly)
- Export capabilities (CSV, PDF)
- Team-scoped views for managers

### Phase 5 — Advanced Features
- Bulk operations (postcode assignments, status changes)
- Mobile-optimised workflows for field-based users
- Proactive notifications (certification expiry, pending approvals)
- Data retention, archival, and leaver handling automation
- Legacy system phase-out support

---

## 7. Risks & Mitigation

| # | Risk | Mitigation | Severity |
|---|------|------------|----------|
| R-1 | Complex RBAC creates UI confusion — users can't tell what they can/can't do | Visual field indicators (View tags, disabled styling, hidden entities), role banner | High |
| R-2 | Approval bottlenecks delay EA onboarding | Priority queues, approval SLA dashboards, email/slack notifications | High |
| R-3 | Sync failures create data inconsistency | Per-EA sync status, automated alerts, retry mechanisms | High |
| R-4 | Form complexity causes abandonment | Progressive stepper, Save & Continue, Save-as-Draft | Medium |
| R-5 | Mobile experience insufficient for field users | Responsive design testing, mobile-specific UX optimisations | Medium |
| R-6 | Accessibility gaps in complex form interactions | WCAG 2.2 AA audit at every phase, automated + manual testing | Medium |
| R-7 | User resistance to workflow changes | Phased rollout, training materials, in-app guidance | Low |

---

## 8. Measurement Framework

| Metric | Method | Frequency |
|--------|--------|-----------|
| Task completion rate (Add/Edit/Approve) | Analytics | Weekly |
| Time to complete EA onboarding | Timer tracking | Per record |
| Approval turnaround time | Workflow logs | Daily |
| Rejection rework rate | Workflow logs | Weekly |
| Permission confusion incidents | Support tickets + session heatmaps | Monthly |
| WCAG compliance score | Automated + manual audit | Per release |
| System Usability Scale (SUS) | User survey | Quarterly |
| Field completeness rate | Data audit | Daily |
| Sync success rate | Integration logs | Real-time |
