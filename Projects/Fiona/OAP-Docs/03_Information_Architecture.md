# Information Architecture — Office Account Postings (OAP)

| Field | Detail |
|---|---|
| **Module** | Office Account Postings (OAP) |
| **Platform** | FinOps — Web Application |
| **Date** | 28 April 2026 |
| **Version** | 1.0 |

---

## 1. Sitemap

```
FinOps (Root)
│
├── Dashboard (Home)
│
├── Office Account Postings (OAP Module)
│   │
│   ├── Current Open Transactions          ← Default landing page for OAP
│   │   ├── Transaction Data Grid
│   │   │   ├── Status Summary Cards (Uncoded / Auto-Coded / Manually Coded / Exported)
│   │   │   ├── Search Bar
│   │   │   ├── Column Visibility Toggle
│   │   │   ├── Export CSV
│   │   │   └── Data Table (sortable, filterable)
│   │   │       ├── Row: Transaction Record
│   │   │       │   ├── Read-Only Fields: Filename, Team, Booking Date, Statement ID,
│   │   │       │   │   Description, Entry Reference, Transaction Code, Credit, Debit,
│   │   │       │   │   Legal Entity, Bank Account, Exported
│   │   │       │   └── Editable Fields: Nominal Code, Cost Centre, Journal Description
│   │   │       └── Pagination Controls
│   │   ├── Edit Transaction (Slide Panel)
│   │   │   ├── Read-Only Summary (Filename, Team, Date, Description, Entry Ref, Code)
│   │   │   ├── Editable Fields (Nominal Code, Cost Centre, Journal Description)
│   │   │   └── Actions: Save / Cancel
│   │   ├── Import File (Modal Dialog)
│   │   │   ├── File Upload Zone
│   │   │   ├── Validation Summary
│   │   │   └── Actions: Import / Cancel
│   │   └── Generate Journal Export (Action)
│   │       ├── Confirmation Dialog
│   │       ├── Export Progress
│   │       └── Success Summary (filename, record count, totals)
│   │
│   ├── Archived Open Transactions
│   │   └── Transaction Data Grid (Read-Only)
│   │       ├── Search Bar
│   │       ├── Column Visibility Toggle
│   │       ├── Export CSV
│   │       ├── Date Range Filter
│   │       └── Data Table (sortable, filterable)
│   │           ├── Row: Archived Transaction Record (all fields read-only)
│   │           │   └── All 15 columns visible
│   │           └── Pagination Controls
│   │
│   └── Lookup Table
│       ├── Tab: Posting Lookup
│       │   ├── Search Bar
│       │   ├── Column Visibility Toggle
│       │   ├── Export CSV
│       │   ├── Add New Rule (Button → Slide Panel)
│       │   └── Data Table
│       │       └── Row: Posting Rule
│       │           ├── Team
│       │           ├── Legal Entity
│       │           ├── Bank Account (Exact match)
│       │           ├── Description (Begins with)
│       │           ├── Entry Reference
│       │           ├── Transaction Code (Exact match)
│       │           ├── Account Type
│       │           ├── Nominal Code (Output)
│       │           ├── Cost Centre (Output)
│       │           └── Actions: Edit / Delete
│       ├── Tab: Team Code Lookup
│       │   ├── Search Bar
│       │   ├── Column Visibility Toggle
│       │   ├── Export CSV
│       │   ├── Add New Mapping (Button → Slide Panel)
│       │   └── Data Table
│       │       └── Row: Team Code Mapping
│       │           ├── Transaction Code
│       │           ├── Team
│       │           ├── Description
│       │           └── Actions: Edit / Delete
│       ├── Edit Posting Rule (Slide Panel)
│       │   ├── All rule fields editable
│       │   └── Actions: Save / Cancel
│       ├── Add Posting Rule (Slide Panel)
│       │   ├── All rule fields empty
│       │   └── Actions: Add / Cancel
│       ├── Edit Team Code (Slide Panel)
│       │   ├── All mapping fields editable
│       │   └── Actions: Save / Cancel
│       └── Add Team Code (Slide Panel)
│           ├── All mapping fields empty
│           └── Actions: Add / Cancel
│
├── [Other FinOps Modules]
│
└── Settings / Admin
```

---

## 2. Navigation Model

### Global Navigation (FinOps Platform)

| Element | Type | Description |
|---|---|---|
| **Top Navigation Bar** | Persistent | FinOps logo, module selector, user avatar/menu, notifications |
| **Left Sidebar** | Persistent (collapsible) | Module-specific menu items |
| **Breadcrumb** | Contextual | Shows: Home > OAP > [Current Page] |

### OAP Module — Left Sidebar Menu Items

| # | Menu Item | Icon | Route | Description |
|---|---|---|---|---|
| 1 | **Current Open Transactions** | `receipt_long` | `/oap/current` | Default view — active transactions requiring coding |
| 2 | **Archived Open Transactions** | `archive` | `/oap/archived` | Historical read-only transaction archive |
| 3 | **Lookup Table** | `manage_search` | `/oap/lookup` | Posting rules and team code management |

### Navigation Flows

```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  Left Nav:       │────▶│  Current Open         │────▶│  Edit Panel     │
│  Current Open    │     │  Transactions Grid    │     │  (Slide Right)  │
│  Transactions    │     │                      │     │                 │
└─────────────────┘     │  [Import] [Export]    │     └─────────────────┘
                        │  [Search] [Columns]   │
                        └──────────────────────┘
                                │
                                ▼
                        ┌──────────────────────┐
                        │  Import Modal         │
                        │  (Manual file upload) │
                        └──────────────────────┘

┌─────────────────┐     ┌──────────────────────┐
│  Left Nav:       │────▶│  Archived Transactions│
│  Archived Open   │     │  Grid (Read-Only)    │
│  Transactions    │     │  [Search] [Columns]  │
└─────────────────┘     │  [Export] [Date Range]│
                        └──────────────────────┘

┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  Left Nav:       │────▶│  Lookup Table         │────▶│  Edit/Add Panel │
│  Lookup Table    │     │  ┌─Tab: Posting──────┐│     │  (Slide Right)  │
└─────────────────┘     │  │  Rules Grid       ││     └─────────────────┘
                        │  └───────────────────┘│
                        │  ┌─Tab: Team Code─────┐│
                        │  │  Mappings Grid     ││
                        │  └───────────────────┘│
                        └──────────────────────┘
```

---

## 3. Role-Based Access

### Access Matrix

| Feature | Finance Team (C&B, AR, AP) | Treasury Team | Finance Manager | System Admin |
|---|---|---|---|---|
| **View Current Open Transactions** | ✅ (own team filter) | ✅ (all teams) | ✅ (all teams) | ✅ (all teams) |
| **Edit Transaction Coding** | ✅ (own team) | ✅ (all teams) | ✅ (all teams) | ❌ |
| **Generate Journal Export** | ❌ | ✅ | ✅ | ❌ |
| **Manual File Import** | ❌ | ✅ | ✅ | ✅ |
| **View Archived Transactions** | ✅ (own team filter) | ✅ (all teams) | ✅ (all teams) | ✅ (all teams) |
| **View Lookup Table** | ✅ (read-only) | ✅ (read-only) | ✅ (read-only) | ✅ (full access) |
| **Edit Lookup Rules** | ❌ | ❌ | ✅ | ✅ |
| **Add/Delete Lookup Rules** | ❌ | ❌ | ✅ | ✅ |
| **Bulk Import Lookup Data** | ❌ | ❌ | ❌ | ✅ |

### Team-Based Data Filtering

| Team Code | Team Name | Description |
|---|---|---|
| `mmgh` | C&B (Cash & Banking) | General office banking transactions |
| `mvtl` | AR (Accounts Receivable) | Customer payments, receipts |
| `mesl` | AP (Accounts Payable) | Supplier payments, direct debits |
| `mnsl` | NSL Ltd | NSL-specific transactions |
| `mmor` | MOR | Miscellaneous office reconciliation |

---

## 4. Data Architecture — Column Layouts

### Current Open Transactions — 15 Columns

| # | Column Name | Data Source | Editable | Width | Notes |
|---|---|---|---|---|---|
| 1 | Filename | Import file | No | 8% | Source filename |
| 2 | Team | Auto-assigned | No | 5% | From Team Code Lookup |
| 3 | Booking Date | Bank statement | No | 7% | DD/MM/YYYY format |
| 4 | Statement ID | Bank statement | No | — | Unique identifier |
| 5 | Description | Bank statement | No | flex | Transaction narrative |
| 6 | Entry Reference | Bank statement | No | 6% | Payment reference |
| 7 | Transaction Code | Bank statement | No | 4% | Bank code (e.g., 174, 229, 244, 466, 548, 622) |
| 8 | Debit Amount | Bank statement | No | 7% | Right-aligned, 2 decimal places |
| 9 | Credit Amount | Bank statement | No | 7% | Right-aligned, 2 decimal places |
| 10 | Legal Entity | Bank statement | No | 5% | Entity code (e.g., mmgh, mvtl, mesl) |
| 11 | Bank Account | Bank statement | No | 7% | Account identifier |
| 12 | **Nominal Code** | User / Lookup | **Yes** | 8% | D365 posting account |
| 13 | **Cost Centre** | User / Lookup | **Yes** | 5% | Optional cost centre |
| 14 | **Journal Description** | User / Lookup | **Yes** | 8% | Journal narrative |
| 15 | Exported | System | No | 5% | "Yes" after export; blank otherwise |

### Archived Transactions — 15 Columns (All Read-Only)

Same column layout as Current Open Transactions. All fields read-only. No edit panel.

### Posting Lookup Table — 10 Columns

| # | Column Name | Editable | Match Type | Notes |
|---|---|---|---|---|
| 1 | Team | Yes | — | Team code assignment |
| 2 | Legal Entity | Yes | — | Entity filter |
| 3 | Bank Account | Yes | Exact match | Account number |
| 4 | Description | Yes | Begins with | Partial match on description text |
| 5 | Entry Reference | Yes | — | Reference code |
| 6 | Transaction Code | Yes | Exact match | Bank transaction code |
| 7 | Account Type | Yes | — | C&B / AR / AP indicator |
| 8 | Nominal Code | Yes | — | Output: D365 posting code |
| 9 | Cost Centre | Yes | — | Output: optional cost centre |
| 10 | Actions | — | — | Edit / Delete buttons |

### Team Code Lookup Table — 4 Columns

| # | Column Name | Editable | Notes |
|---|---|---|---|
| 1 | Transaction Code | Yes | Bank statement code |
| 2 | Team | Yes | Mapped team name |
| 3 | Description | Yes | Human-readable label |
| 4 | Actions | — | Edit / Delete buttons |

---

## 5. Content Hierarchy

### Current Open Transactions — Information Priority

```
1. Status Summary Cards     [Top — always visible]
   ├── Total Transactions
   ├── Auto-Coded
   ├── Manually Coded
   ├── Uncoded
   └── Exported

2. Toolbar                  [Below cards]
   ├── Search (left)
   └── Column | Export | Import | Generate Journal (right)

3. Data Table               [Main content]
   ├── Sortable headers
   ├── Transaction rows
   │   ├── Status badge (visual indicator)
   │   ├── Read-only data columns
   │   ├── Editable fields (highlighted)
   │   └── Edit action button
   └── Pagination

4. Edit Slide Panel         [Overlay — on demand]
   ├── Transaction summary (read-only)
   ├── Editable fields with labels
   └── Save / Cancel actions
```

### Lookup Table — Information Priority

```
1. Tab Bar                  [Top — always visible]
   ├── Posting Lookup (count badge)
   └── Team Code Lookup (count badge)

2. Toolbar                  [Below tabs]
   ├── Search (left)
   └── Column | Export | Add New (right)

3. Data Table               [Main content]
   ├── Match type indicators on relevant columns
   ├── Rule/mapping rows
   └── Edit action per row

4. Edit/Add Slide Panel     [Overlay — on demand]
   ├── Field labels with validation
   └── Save/Add / Cancel actions
```

---

## 6. URL Structure

| Page | Route | Query Parameters |
|---|---|---|
| Current Open Transactions | `/oap/current` | `?team=mmgh&status=uncoded&page=1` |
| Archived Transactions | `/oap/archived` | `?team=mmgh&from=2026-01-01&to=2026-04-28&page=1` |
| Lookup Table — Posting | `/oap/lookup?tab=posting` | `?search=term&page=1` |
| Lookup Table — Team Code | `/oap/lookup?tab=teamcode` | `?search=term&page=1` |

---

## 7. Error States & Empty States

| State | Page | Message | Action |
|---|---|---|---|
| **No transactions** | Current Open | "No open transactions found. The next automated import is scheduled for 05:30 AM." | Show last import timestamp |
| **No results** | Current Open (filtered) | "No transactions match your search. Try adjusting your filters." | Clear filters button |
| **No archived data** | Archived | "No archived transactions found for the selected date range." | Adjust date range |
| **No lookup rules** | Lookup — Posting | "No posting rules configured. Add your first rule to enable auto-coding." | Add New Rule button |
| **No team codes** | Lookup — Team Code | "No team code mappings found. Add mappings to assign transactions to teams." | Add New Mapping button |
| **Import failure** | Import Modal | "Import failed: [specific error]. Please check the file format and try again." | Retry / Cancel |
| **Export — nothing to export** | Current Open | "No coded transactions available for export. All coded transactions have already been exported." | Dismiss |
| **Network error** | Any | "Unable to connect to the server. Your changes are saved locally and will sync when connection is restored." | Retry |

---

## 8. Sync & Conflict Handling

| Scenario | Strategy |
|---|---|
| **Two users edit same transaction** | Last-write-wins with notification: "This transaction was updated by [User] at [Time]. Your changes will overwrite." |
| **Export while editing** | Export only includes records marked as coded before export was initiated. In-progress edits are excluded. |
| **Import during active session** | New records appear with toast notification: "42 new transactions imported." Existing view refreshes. |
| **Network disconnect during edit** | Local state preserved. On reconnect: sync with conflict check. |
