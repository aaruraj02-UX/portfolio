# UX Brief — Office Account Postings (OAP)

| Field | Detail |
|---|---|
| **Module** | Office Account Postings (OAP) |
| **Platform** | FinOps — Web Application (React + MUI v5) |
| **Design System** | MET-DS-V2 Light Theme |
| **Date** | 28 April 2026 |
| **Version** | 1.0 |
| **Accessibility Standard** | WCAG 2.2 AA |

---

## Background

The Office Account Postings (OAP) process manages all unreconciled Office Bank Account postings. These transactions are coded for posting into Microsoft Dynamics 365 (D365) either automatically — via complex lookup macros — or manually — where users investigate individual transactions and assign posting codes. Coded transactions are then exported as journals for posting into D365.

**Current state:** The entire process is managed within a complex Excel workbook relying on complicated macros and formulas. The process runs daily and increases in frequency during month-end periods.

**Strategic intent:** FinOps will **not** replicate the existing Excel process. Instead, the OAP module represents a full **redesign** — simplifying workflows, improving user experience, and delivering better exception reporting through automation and a modern web interface.

---

## Objectives

| # | Objective | Success Measure |
|---|---|---|
| O1 | **Automate daily bank statement import** — eliminate manual file handling | File picked up from email at 05:30 AM daily with zero manual intervention |
| O2 | **Auto-code transactions via lookup matching** — reduce manual coding effort | ≥ 70% of incoming transactions auto-matched on first import cycle |
| O3 | **Provide clear team-based views** — each team sees only their transactions | Users filter by team; no cross-team data leakage |
| O4 | **Enable one-click journal export** — replace manual journal creation | Treasury generates journals at 15:00 (or on-demand) via single action |
| O5 | **Deliver audit trail and exception reporting** — improve transparency | Every journal export creates audit record with filename, date, user |
| O6 | **Support month-end manual import** — accommodate ad-hoc file uploads | Manual import follows identical automated flow; no separate process |
| O7 | **Design for future D365 auto-posting** — journals output to a folder for pickup | Architecture supports automated D365 import without UI changes |

---

## Target Users

### Primary Users

| User | Role | Frequency | Key Tasks |
|---|---|---|---|
| **Finance Team Members** (C&B, AR, AP) | Review and code unmatched transactions for their team | Daily (09:00–15:00) | Filter by team → review transactions → assign Nominal Code, Cost Centre, Journal Description |
| **Treasury Team** | Generate and export journal files | Daily at 15:00 + ad-hoc | Run journal export → verify export summary → distribute journals |

### Secondary Users

| User | Role | Frequency | Key Tasks |
|---|---|---|---|
| **Finance Managers** | Oversee coding accuracy and month-end completeness | Daily / month-end | Review exception reports → check archived transactions → validate journal outputs |
| **System Administrators** | Maintain lookup tables and automation rules | Weekly / as-needed | Add/edit lookup rules → manage team code mappings → troubleshoot import failures |

---

## User Needs

| # | User Need | Priority |
|---|---|---|
| UN1 | See only my team's transactions without manual filtering each time | High |
| UN2 | Quickly identify which transactions still need coding | High |
| UN3 | Edit Nominal Code, Cost Centre, and Journal Description inline or via a panel | High |
| UN4 | Understand why a transaction was auto-coded (which lookup rule matched) | Medium |
| UN5 | Generate journals for coded-but-unexported transactions only | High |
| UN6 | Receive confirmation of journal export with filename and posting details | High |
| UN7 | Access archived transactions for reference without editing | Medium |
| UN8 | Add and modify lookup rules without developer intervention | Medium |
| UN9 | Import files manually during month-end using the same process as automation | Medium |
| UN10 | View summary status (total, coded, uncoded, exported) at a glance | High |

---

## Constraints

| # | Constraint | Impact |
|---|---|---|
| C1 | **Source file format is fixed** — Bank Statement records only (Column A Source Type = "Bank Statement") | Import logic must filter; UI need not expose source type |
| C2 | **D365 journal format is fixed** — export must produce compliant file structure | Export module must match D365 import schema exactly |
| C3 | **Daily 05:30 AM automation window** — import must complete before users start at 09:00 | Backend automation; UI shows import status/timestamp |
| C4 | **15:00 journal export deadline** — but Treasury may run exports multiple times | Export button only picks up coded-but-not-yet-exported records |
| C5 | **Existing lookup data must be migrated** — one-off upload of current lookup table | Lookup management UI must support bulk import |
| C6 | **Multi-team access** — C&B, AR, AP teams share the same interface | Role/team-based filtering; no separate builds |
| C7 | **Month-end manual import** — must follow identical automated flow | Single import mechanism with manual trigger option |

---

## Brand & Visual Direction

| Element | Specification |
|---|---|
| **Design System** | MET-DS-V2 (React + MUI v5) |
| **Theme** | Light |
| **Primary Brand Colour** | `#3276CF` (--color-primary) |
| **Page Background** | `#F2F5FA` (--color-bg) |
| **Card Background** | `#FFFFFF` (--color-card) |
| **Body Text** | `#212121` (--text-primary) |
| **Font Stack** | system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif |
| **Spacing Scale** | 8pt grid (2/4/8/12/16/20/24/32/40/48px) |
| **Border Radius** | 8px cards/buttons/inputs · 100px pills |
| **Buttons** | `disableElevation` · 44px min-height touch target |
| **Cards** | `elevation={0}` · 1px solid Grey/300 border |
| **Text Fields** | `variant="outlined"` |
| **Icons** | Material Symbols Outlined (Google Fonts CDN) |

---

## Core Challenges

| # | Challenge | Mitigation Strategy |
|---|---|---|
| CH1 | **Replacing deeply embedded Excel workflows** — users have muscle memory for macro-driven processes | Progressive disclosure; familiar table-based UI; keyboard shortcuts for power users |
| CH2 | **High-volume data tables** — daily imports can produce hundreds of rows per team | Virtual scrolling, column sorting, search/filter, pagination |
| CH3 | **Lookup rule complexity** — matching logic involves multiple fields (Team, Entity, Bank Account, Description, Entry Ref, Code) | Clear display of match criteria; "match type" indicators (Exact, Begins with); easy editing |
| CH4 | **Timing sensitivity** — 15:00 deadline creates urgency for coding completeness | Status summary cards; visual indicators for uncoded/coded/exported; countdown or reminder capability |
| CH5 | **Archive volume growth** — archived transactions accumulate indefinitely | Read-only archive with efficient filtering; date-range selectors; potential pagination |
| CH6 | **Future D365 integration** — journal export must be forward-compatible | Output to folder as intermediate step; architecture supports direct API integration later |

---

## Scope & Deliverables

### In Scope (Phase 1)

| Deliverable | Description |
|---|---|
| **Current Open Transactions** | Filterable, sortable data grid with inline/panel editing for Nominal Code, Cost Centre, Journal Description. Status summary cards. |
| **Archived Transactions** | Read-only data grid with all columns visible. Search and filter. |
| **Lookup Table** | Two-tab management interface: Posting Lookup (multi-field match rules) + Team Code Lookup (transaction code → team mapping). Add/Edit/Delete via slide panel. |
| **Automated Import** | Daily 05:30 file pickup from email → archive previous records → import new records → auto-match via lookup. |
| **Manual Import** | Month-end manual file upload following identical processing flow. |
| **Journal Export** | Treasury generates journals for coded-but-unexported records. Export marks records as "Exported" with filename. Email notification with journal summary. |
| **Left Navigation** | Three menu items: Current Open Transactions, Archived Open Transactions, Lookup Table. |

### Out of Scope (Phase 1)

| Item | Rationale |
|---|---|
| Direct D365 auto-posting | Planned for future phase; journals output to folder for manual pickup |
| Mobile-responsive layout | Admin tool used on desktop workstations only |
| User role management | Handled by existing FinOps identity system |
| Bank statement source management | Fixed source; no UI needed |

---

## Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Lookup table migration fails or produces incorrect mappings | Medium | High | Validate migrated data before go-live; provide bulk edit capability |
| R2 | Users resist moving from Excel to web application | Medium | Medium | Involve key users in UAT; ensure all Excel capabilities are preserved or improved |
| R3 | High transaction volumes cause performance degradation | Low | High | Paginated data grids; server-side filtering; lazy loading |
| R4 | D365 journal format changes break export | Low | High | Abstract export format into configurable template |
| R5 | Month-end manual import creates duplicates | Medium | Medium | Duplicate detection on import; confirmation dialog before processing |
| R6 | 15:00 export deadline missed due to uncoded transactions | Medium | High | Status dashboard; email/notification reminder for uncoded items approaching deadline |

---

## Acceptance Criteria (High-Level)

| # | Criterion |
|---|---|
| AC1 | Automated daily import processes Bank Statement records and archives previous open transactions |
| AC2 | Auto-matching codes ≥ 70% of imported transactions on first pass |
| AC3 | Users can filter Current Open Transactions by team and edit Nominal Code, Cost Centre, Journal Description |
| AC4 | Treasury can generate journal export for all coded-but-unexported records |
| AC5 | Export marks records as "Exported" with filename and sends summary email |
| AC6 | Archived transactions are read-only and searchable |
| AC7 | Lookup table supports CRUD operations for posting rules and team code mappings |
| AC8 | Manual import follows identical flow to automated import |
| AC9 | All interfaces meet WCAG 2.2 AA accessibility requirements |
| AC10 | All interfaces conform to MET-DS-V2 design system tokens and component patterns |
