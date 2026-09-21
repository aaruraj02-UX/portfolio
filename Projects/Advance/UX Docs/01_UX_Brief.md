# UX Brief — ProServe Master EA Platform

| Field | Detail |
|---|---|
| **Project** | ProServe — Enforcement Agent Master Data Platform |
| **Client** | Acme Holdings |
| **Version** | 1.0 |
| **Date** | 20 April 2026 |
| **Author** | UX Team |
| **Status** | Draft |

---

## 1. Background

Acme Holdings manages a large workforce of Enforcement Agents (EAs) across the United Kingdom. EA information is currently fragmented across multiple disconnected legacy systems — **Optimise**, **Atlas**, **ProServe**, and the **MHL Portal (Asset Register)**. This fragmentation creates:

- Duplicate and inconsistent EA records across systems
- Manual reconciliation overhead for Contract Service teams
- Data-governance blind spots (no single audit trail)
- Delay-prone onboarding and profile-update processes
- Limited visibility into compliance, certification, and bond statuses

The **ProServe Master EA Platform** is being developed to consolidate all EA data into a **Single Source of Truth (SSOT)**, enforce data-governance controls, and automatically sync changes to downstream systems in near real-time.

---

## 2. Business Objectives

| # | Objective | Measure |
|---|-----------|---------|
| O-1 | **Establish SSOT** — 100 % of downstream systems consume EA data exclusively from the Master Record | 0 conflicting / duplicate records |
| O-2 | **Real-time integration & sync transparency** — uni-directional sync with health dashboard visible per EA record | Sync within defined SLAs |
| O-3 | **Robust data governance** — RBAC, dual-approval (Keyer / Verifier) workflow, full audit trail | 100 % of sensitive changes follow four-eyes principle |
| O-4 | **Complete 360° EA profile** — every active EA has a validated, up-to-date profile | 100 % field completeness for active EAs |
| O-5 | **Aligned processes & reporting** — all reports and dashboards migrate to Master EA data feed | 100 % reporting adoption; legacy entry points retired |

---

## 3. Target Users

### 3.1 Primary Users

| Role | App | Description |
|------|-----|-------------|
| **Contract Service Team Lead — Admin** | Web | Full edit access across all entities. Creator & Approver rights. Manages team workflows, approves changes. |
| **Contract Service Team Member** | Web | Edit access to Personal, Compliance, Certification, Contract & Bond. Creator only — submits changes for approval. |
| **Enforcement Directors** | Web | Edit Personal (partial), Cert Processing, Enforcement. View Bond & Asset. Approver rights. Strategic oversight. |
| **Senior Enforcement Managers** | Web / Mobile | Edit Personal (partial), Cert Processing, Enforcement. View Bond & Asset. Manage assigned EMs & EAs. |
| **Enforcement Manager** | Web / Mobile | Edit Personal (partial) & Enforcement. View Cert, Bond & Asset. Manage assigned EAs. |
| **EA (Enforcement Agent)** | Web / Mobile | Edit limited Personal fields (phone, email, address) & limited Enforcement. View Cert, Bond & Asset. Own profile only. |

### 3.2 Secondary / Support Users

| Role | App | Description |
|------|-----|-------------|
| **IT / Service Desk** | Web | View Personal. Edit Asset Management. Access Audit Log & Reports. Approver for IT items. |
| **Finance** | Web | View-only Personal & Contract. No edit or approval. |
| **Facilities** | Web | View-only Personal details. No other entity access. |
| **Audit** | Web | View-only Personal, Compliance, Certification & Bond. Read-only inspection. |

---

## 4. User Needs

### 4.1 Contract Service Team (Admin & Member)
- Quickly onboard new EAs — create full profile in a guided, step-by-step workflow
- Edit any entity efficiently with clear validation feedback
- Submit changes for approval and track approval status in real time
- Access audit trail for every change made to a record
- Generate reports (daily / weekly / monthly)

### 4.2 Enforcement Chain (Directors → Senior EMs → EMs)
- View a complete 360° profile for any EA in their jurisdiction
- Edit permitted fields (personal contact info, enforcement configuration, postcodes)
- Approve or reject changes submitted by lower roles with section-by-section rejection comments
- View sync status to downstream systems (Atlas, Optimise, Asset Register)

### 4.3 Enforcement Agents
- View own complete profile
- Edit phone, email, and home address
- Edit limited enforcement fields (contact info)
- View certification, bond, and asset details

### 4.4 Support Roles (IT, Finance, Facilities, Audit)
- IT: Manage asset assignments with governance controls
- Finance: View contract and personal data for financial processes
- Facilities: View personal details for logistical purposes
- Audit: Inspect compliance, certification, and bond data without modification

---

## 5. Core Challenges

| # | Challenge | Impact |
|---|-----------|--------|
| C-1 | **Multi-system fragmentation** — data across 4+ legacy systems | Inconsistent EA records, duplicate effort |
| C-2 | **Complex RBAC model** — 10 roles with entity-level and field-level permissions | UI must dynamically show/hide/disable fields per role |
| C-3 | **Dual-approval workflow** — Keyer/Verifier for sensitive changes | UX must clearly convey approval states and pending actions |
| C-4 | **8-entity data model** — Personal, Compliance, Cert Processing, Cert Status, Bond, Contract, Asset, Enforcement | Stepper workflow must handle entity visibility per role |
| C-5 | **Field-level granularity** — within editable entities, some fields are view-only for certain roles | Fine-grained field disabling with clear visual indicators |
| C-6 | **Integration transparency** — users need to see sync health per EA | Requires system-status indicators without overwhelming the UI |
| C-7 | **Compliance & audit** — full audit trail, data retention, leaver handling | Every action must be traceable with timestamp, actor, source |

---

## 6. Brand & Visual Direction

| Attribute | Value |
|-----------|-------|
| **Design System** | MET-DS-V2 (React + MUI v5) |
| **Primary Brand Colour** | #3276CF |
| **Page Background** | #F2F5FA |
| **Card Background** | #FFFFFF |
| **Body Text** | #212121 |
| **Font Stack** | system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif |
| **Spacing System** | 8pt grid (2/4/8/12/16/20/24/32/40/48px) |
| **Border Radius** | 8px cards/buttons/inputs · 100px pills |
| **Accessibility** | WCAG 2.2 AA — 4.5:1 text contrast, 3:1 UI components |
| **Tone** | Professional, clear, action-oriented. Sentence-case labels, verb-first CTAs. |

---

## 7. Scope & Deliverables

### 7.1 In Scope
- Master EA record management (CRUD) across 8 entities
- Role-based access control (entity-level + field-level)
- Dual-approval (Keyer/Verifier) workflow with section-level rejection
- 360° read-only EA profile view
- Integration status dashboard per EA
- Full audit trail
- Report generation
- EA postcode management with PAF validation
- IT asset management with governance
- Data retention, archival, and leaver handling

### 7.2 Out of Scope
- Downstream system UI (Atlas, Optimise, Asset Register)
- Mobile app development (Web / Mobile responsive only)
- Payroll processing
- Legacy system decommissioning

### 7.3 UX Deliverables
1. UX Brief (this document)
2. Personas
3. Empathy Maps
4. UX Strategy
5. Information Architecture
6. User Journeys
7. Wireframes (separate phase)
8. Heuristic & Accessibility Audit (separate phase)
9. UX Backlog (separate phase)
10. Handoff Package (separate phase)

---

## 8. Constraints

| # | Constraint |
|---|------------|
| CN-1 | RBAC roles and mappings must be agreed with IT Security and Business Owners before build |
| CN-2 | PAF service must be accessible for postcode validation |
| CN-3 | Platform must not negatively impact downstream system performance during sync |
| CN-4 | All data processing must comply with UK GDPR and DPA 2018 |
| CN-5 | Downstream APIs (Optimise, Atlas, Advance) must be available and ready |
| CN-6 | Legacy EA record data discovery and mapping must complete before migration |

---

## 9. Risks

| # | Risk | Mitigation | Severity |
|---|------|------------|----------|
| R-1 | Integration failures causing downstream systems to operate on stale data | Automated alerts, retry and rollback mechanisms | High |
| R-2 | Unauthorised or incorrect changes without proper approval | Dual-control workflow, RBAC, full audit trail | High |
| R-3 | Performance degradation during bulk sync operations | Schedule during low-usage windows, throttle sync API calls | Medium |
| R-4 | Technical feasibility unknown for some integrations | To be assessed during Design & Architecture phase | Medium |
| R-5 | User adoption resistance due to workflow changes | Progressive rollout, training materials, clear onboarding UX | Medium |

---

## 10. Success Criteria

| # | Criterion | Measure |
|---|-----------|---------|
| SC-1 | SSOT established | 0 conflicting/duplicate records across all systems |
| SC-2 | Near real-time sync | ≥ 99.5 % successful sync within SLA |
| SC-3 | Dual-control compliance | 100 % of sensitive changes follow Keyer/Verifier workflow |
| SC-4 | Complete EA profiles | 100 % field completeness for all active EAs |
| SC-5 | Report migration | 100 % reporting adoption; legacy entry points retired |
| SC-6 | Operational exceptions reduced | ≥ 90 % reduction in EA data exceptions |
