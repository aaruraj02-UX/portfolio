# Information Architecture — FinOps · Ad-hoc Payments (Phase 3)

**Scope:** Ad-hoc Payments module (desktop web) and its adjacencies inside the wider FinOps shell.
**Version:** 1.0 · 08 July 2026

The module lives inside the existing FinOps web application. The IA below describes the module’s sitemap, navigation model, primary screen structure, content model, and the role-based visibility matrix. There is no dedicated mobile experience in Phase 3; mobile is a Phase-4 candidate.

---

## 1. Sitemap — Web

```
FinOps (shell)
├── Dashboard
├── Ad-hoc Payments                      ← module root
│   ├── Requests (Payments)              [AdHocPayments.html]
│   │   ├── List (filter, search, tabs by status)
│   │   ├── New request (6-step wizard, right drawer)
│   │   │   ├── 1. Beneficiary
│   │   │   ├── 2. Bank details (Domestic / International)
│   │   │   ├── 3. Amount (Net, VAT, Total)
│   │   │   ├── 4. When (Due date, will-reach date, rails)
│   │   │   ├── 5. What for (Reason, ledger, cost centre, comments, docs)
│   │   │   └── 6. Review & submit
│   │   └── View request (right drawer, read-only + tabs)
│   │       ├── Details
│   │       ├── Activity
│   │       └── Files
│   ├── Approvals                        [AdHocApprovals.html]
│   │   ├── Queue (Awaiting me / All)
│   │   ├── Approve / Reject (with comment)
│   │   └── View request (shared pane)
│   ├── Generated Files                  [AdHocGeneratedFiles.html]
│   │   ├── Lloyds files (list, download)
│   │   ├── Journal files (list, download)
│   │   └── Mark line Complete / Failed (with reason)
│   └── Payment Reason                   [AdHocPaymentTypeLookup.html]
│       ├── List (search, status filter)
│       ├── Add reason (side drawer)
│       └── Edit reason (side drawer)
│           ├── Basics: name, status
│           ├── Default paying-from: bank, sort code, currency, entity
│           └── Default ledger & cost centre: type, number, cost centre
├── Other modules (Vehicle Release Payments, etc.)
├── Notifications
├── Help
└── Account / Settings
```

## 2. Navigation Model

- **Primary navigation:** Left sidebar (collapsible). Ad-hoc Payments is a top-level module with four children: Payments, Approvals, Generated Files, Payment Reason.
- **Secondary navigation:** Tabs inside each screen where the same underlying list has multiple views (e.g. Approvals: *Awaiting me* / *All*).
- **In-context navigation:** Right-hand drawer for creating, editing, or viewing a single record. Drawer preserves list context so users don’t lose their place.
- **Breadcrumb:** Module ▸ Screen ▸ (Optional) Record — for orientation only; no deep hierarchies.
- **Global search:** Header search returns records across Payments, Approvals, Generated Files, and Payment Reason.
- **Help:** In the same relative position on every view (top-right in the header) to satisfy WCAG SC 3.2.6 *Consistent Help*.

## 3. Screen Model

### 3.1 Payments (`AdHocPayments.html`)

- **List** — columns: Reference, Beneficiary, Amount (currency), Due date, Reason, Status badge, Actions. Filters: status, date range, requester, cost centre.
- **New request wizard** — right drawer, 6 steps, single question per step, footer with Back / Next (Submit on step 6). Sticky stepper on the left of the drawer showing current step only (non-clickable per stakeholder decision).
- **View request** — right drawer, tabs: Details / Activity / Files. Read-only for non-owners; edit action available on Draft/Rejected states.
- **Draft & Resume** — Draft rows have a *Resume* action that reopens the wizard at the last completed step with all values re-hydrated.

### 3.2 Approvals (`AdHocApprovals.html`)

- **List** — columns: Reference, Beneficiary, Amount, Reason, Requester, Cost centre, Submitted, Actions (Approve / Reject / View). Tabs: *Awaiting me* / *All*.
- **Approve** — single-click with optional comment. Confirmation toast, row moves out of the awaiting-me tab.
- **Reject** — modal with mandatory reason. Notification back to requester with reason surfaced in the request timeline.

### 3.3 Generated Files (`AdHocGeneratedFiles.html`)

- **Tabs:** Lloyds files / Journal files.
- **Lloyds file row** — filename, generation timestamp, contained line count, status (Generated / Sent to bank / Bank accepted / Bank rejected), download.
- **Journal file row** — filename, timestamp, contained-line count, status. Only generated on confirmed payment completion.
- **Per-line action** — Mark Complete / Mark Failed (with reason). Marking a line Complete triggers journal generation for that line; Failed sends a notification to the requester with the reason.

### 3.4 Payment Reason (`AdHocPaymentTypeLookup.html`)

- **List** — columns: Reason, Default paying-from (bank + entity + sort), Ledger / Cost centre (type · number + cost centre caption), Currency, Status, Actions. Filters: search + status.
- **Add / Edit drawer** — three sections: Basics, Default paying-from, Default ledger & cost centre.
- **Impact:** any change here changes the auto-populated defaults on new Payments requests. Existing in-flight requests are not retroactively updated.

## 4. Content Model

### 4.1 Payment Request

| Field | Type | Required | Notes |
|---|---|---|---|
| `reference` | string | system | Auto-generated e.g. `AH-2026-000123` |
| `status` | enum | system | `Draft` · `Awaiting approval` · `Approved` · `Rejected` · `File generated` · `Complete` · `Failed` |
| `beneficiary` | string(15) | yes | 15-char business cap from stakeholder brief |
| `intl` | enum | yes | `domestic` · `international` |
| `sortCode` | string(8) | yes if `domestic` | `NN-NN-NN`; 6 digits validated |
| `accountNo` | string(8) | yes if `domestic` | 8 digits |
| `iban` / `bic` | string | optional if `international` | |
| `currency` | enum | yes | Populated from Currency lookup (Configuration module) |
| `net` | decimal | yes | > 0 |
| `vatApplicable` | boolean | yes | |
| `vat` | decimal | yes if `vatApplicable` | Same rules as Vehicle Release Payments |
| `total` | decimal | derived | `net + vat` |
| `method` | enum | system | `FP` · `CHAPS` · `BACS` — backend-controlled |
| `dueDate` | date | yes | UK working day; weekends + bank holidays blocked |
| `reachDate` | date | derived | Rule-based from method + dueDate + system clock |
| `reason` | enum | yes | Value from Payment Reason lookup |
| `ledgerType` | enum | yes | Auto-populated from reason; user can override |
| `ledgerNumber` | string | yes | Auto-populated; user can override |
| `costCentre` | string | yes | Auto-populated; user can override |
| `caseRef` | string | optional | Description / case reference |
| `comments` | text | optional | Notes for approver & Treasury |
| `attachments[]` | file[] | optional | Max 10; PDF, PNG, JPG, MSG, EML; ≤ 10 MB each |
| `requester` | user | system | Session user |
| `raisedAt` | timestamp | system | |
| `timeline[]` | event[] | system | Full audit trail: created, submitted, approved, rejected, file generated, complete, failed |

### 4.2 Payment Reason (lookup)

| Field | Type | Required | Notes |
|---|---|---|---|
| `code` | string | system | Internal id, not surfaced |
| `name` | string | yes | Human-readable |
| `bank` | string | yes | Default paying-from account |
| `sort` | string | yes | 6-digit UK sort code |
| `currency` | enum | yes | GBP / EUR / USD / International |
| `entity` | enum | yes | Legal entity |
| `ledgerType` | enum | optional | Customer / Ledger / Supplier |
| `ledgerNumber` | string | optional | |
| `costCentre` | string | optional | e.g. `CC-1010 · Treasury` |
| `status` | enum | yes | `Active` · `Inactive` |

### 4.3 Generated File

| Field | Type | Notes |
|---|---|---|
| `id` | string | System |
| `type` | enum | `Lloyds` · `Journal` |
| `filename` | string | Bank-defined format for Lloyds; internal format for Journal |
| `generatedAt` | timestamp | |
| `lines[]` | request-ref[] | Payment references contained |
| `status` | enum | `Generated` · `Sent` · `Accepted` · `Rejected` · `Partially complete` · `Complete` |

## 5. Role-based Visibility Matrix

Roles: **Requester (R)**, **Approver (A)**, **Treasury (T)**, **Admin (Ad)**.

| Screen / Feature | R | A | T | Ad |
|---|---|---|---|---|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Payments — list of *my* requests | ✅ own | ✅ team | ✅ all | ✅ all |
| Payments — raise new | ✅ | ✅ | ✅ | ✅ |
| Payments — save draft / resume | ✅ own | ✅ own | ✅ own | ✅ own |
| Payments — view any request | ❌ | ✅ team | ✅ all | ✅ all |
| Approvals — Awaiting me | — | ✅ | — | ✅ |
| Approvals — All | — | ✅ | ✅ | ✅ |
| Approvals — Approve / Reject | — | ✅ | — | ✅ |
| Generated Files — Lloyds tab | ❌ | ❌ | ✅ | ✅ |
| Generated Files — Journal tab | ❌ | ❌ | ✅ | ✅ |
| Generated Files — Mark Complete / Failed | ❌ | ❌ | ✅ | ✅ |
| Payment Reason — list | ✅ read-only | ✅ read-only | ✅ | ✅ |
| Payment Reason — Add / Edit | ❌ | ❌ | ✅ | ✅ |
| Notifications preferences | ✅ | ✅ | ✅ | ✅ |
| Global search | ✅ own scope | ✅ team scope | ✅ all | ✅ all |
| Audit / activity trail | ✅ own | ✅ team | ✅ all | ✅ all |

## 6. Cross-screen State Machine

```
Draft ──submit──► Awaiting approval ──approve──► Approved
                                    │
                                    └─reject───► Rejected ──edit&resubmit──► Awaiting approval

Approved ──treasury: generate Lloyds──► File generated
File generated ──bank accepted──► Ready to complete
Ready to complete ──mark Complete──► Complete (journal generated · requester notified)
Ready to complete ──mark Failed──► Failed (reason captured · requester notified)
```

Guardrails:

- Only `Complete` writes a journal line.
- `Failed` requires a mandatory reason and triggers a requester notification with that reason.
- All state transitions are recorded in the request `timeline[]` with actor, timestamp, and note.

## 7. Search & Filtering

- **Global search** matches on: `reference`, `beneficiary`, `reason.name`, `cost centre`, `requester`, and `ledger number`.
- **Payments filters:** status, requester, cost centre, currency, date range.
- **Approvals filters:** *Awaiting me* / *All*, cost centre, currency, value bracket.
- **Generated Files filters:** file type, date range, status.
- **Payment Reason filters:** free-text search across name, entity, bank, currency, ledger type, ledger number, cost centre; status filter (Active / Inactive).

## 8. Accessibility Notes (IA-level)

- Every list has an empty state, a loading state, an error state, and a *no results* state — with a text explanation, an icon, and a next action.
- Every drawer is a `role="dialog"` with an accessible name and Escape-to-close.
- Every tab set uses `role="tablist"`, `role="tab"`, `aria-selected`, and arrow-key navigation between tabs.
- Every status badge combines colour + icon + text.
- Every wizard step announces its progress via `aria-live` (*Step 3 of 6 · Amount*).
- The Help link is in the same top-right position on every screen (SC 3.2.6 Consistent Help).
- Navigation order is stable across all four Ad-hoc screens (SC 3.2.3 Consistent Navigation).
- All actionable icons have `aria-label` matching their visible tooltip.

## 9. URL / Route Structure (indicative for React build)

```
/ad-hoc/payments                          → List
/ad-hoc/payments/new                      → Wizard (drawer open, list behind)
/ad-hoc/payments/:ref                     → View drawer
/ad-hoc/payments/:ref/edit                → Wizard pre-filled (Draft or Rejected)
/ad-hoc/approvals                         → Awaiting me
/ad-hoc/approvals?tab=all                 → All
/ad-hoc/generated-files                   → Lloyds tab
/ad-hoc/generated-files?tab=journal       → Journal tab
/ad-hoc/payment-reason                    → List
/ad-hoc/payment-reason/new                → Drawer, Add
/ad-hoc/payment-reason/:code/edit         → Drawer, Edit
```

## 10. Mobile Considerations (Phase 4 seed)

Not delivered in Phase 3. Design signals to carry forward:

- Approver actions (Approve / Reject with comment) are the most likely first mobile use case.
- Treasury mark-complete / mark-failed is *not* recommended for mobile due to the audit consequences.
- The wizard would need re-composition into a single-column, sticky-footer layout with the calendar as a full-screen sheet.
- All copy and tokens already scale (rem-based typography, 8-pt spacing) so component re-use is high.
