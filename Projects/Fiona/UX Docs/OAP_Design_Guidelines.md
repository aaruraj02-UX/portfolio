# FinOps — Office Account Postings (OAP) Design Guidelines

> **Module:** Office Account Postings (OAP)  
> **Application:** FinOps — *Enterprise Finance Automation Platform*  
> **Design System:** MET-DS-V2 (Light Theme)  
> **Category:** Treasury  
> **Last Updated:** 28 April 2026  
> **Prototype references:**  
> - `UX_Deliverables/prototype/OAP_CurrentTransactions.html`  
> - `UX_Deliverables/prototype/OAP_ArchivedTransactions.html`  
> - `UX_Deliverables/prototype/OAP_LookupTable.html`

---

## Table of Contents

1. [Purpose & Scope](#1-purpose--scope)
2. [Module Navigation](#2-module-navigation)
3. [Colour Tokens](#3-colour-tokens)
4. [Typography](#4-typography)
5. [Spacing & Grid](#5-spacing--grid)
6. [Borders, Radius & Shadows](#6-borders-radius--shadows)
7. [Motion & Transitions](#7-motion--transitions)
8. [App Shell & Layout](#8-app-shell--layout)
9. [Top Navigation](#9-top-navigation)
10. [Sidebar Navigation](#10-sidebar-navigation)
11. [Breadcrumb](#11-breadcrumb)
12. [Page Header & Actions](#12-page-header--actions)
13. [Status Summary Cards](#13-status-summary-cards)
14. [Toolbar & Filters](#14-toolbar--filters)
15. [Data Table](#15-data-table)
16. [Inline Editing](#16-inline-editing)
17. [Team Badges](#17-team-badges)
18. [Status Badges](#18-status-badges)
19. [Pagination](#19-pagination)
20. [Import File Dialog](#20-import-file-dialog)
21. [Add Rule Dialog](#21-add-rule-dialog)
22. [Buttons](#22-buttons)
23. [Current Open Transactions Page](#23-current-open-transactions-page)
24. [Archived Transactions Page](#24-archived-transactions-page)
25. [Lookup Table Page](#25-lookup-table-page)
26. [Iconography](#26-iconography)
27. [Responsive Breakpoints](#27-responsive-breakpoints)
28. [Accessibility (WCAG 2.2 AA)](#28-accessibility-wcag-22-aa)
29. [MUI v5 Component Mapping](#29-mui-v5-component-mapping)
30. [Data Model Reference](#30-data-model-reference)

---

## 1. Purpose & Scope

The OAP module manages the identification, coding, and export of unreconciled Office Bank Account postings for journaling into D365.

**Business process (daily):**
1. Automation imports bank statement file (05:30 AM) filtering `Source Type = Bank Statement`
2. Previous day's records move to the **Archived Transactions** window
3. New records populate the **Current Open Transactions** window
4. Automation auto-codes records using the **Lookup Table**; unmatched records receive a team indicator (C&B, AR, or AP)
5. Users from each team filter, review, and manually code their transactions (Nominal Code, Cost Centre, Journal Description)
6. Treasury generates journals at 15:00 (or on demand) for all coded but not-yet-exported records
7. Journal files are output for D365 import; email notifications are sent with posting details

**Design goals:**
- Data-dense, scannable table layout optimised for keyboard-driven bulk coding
- Clear team ownership via colour-coded badges
- Progressive disclosure — filters narrow the working set; modals handle import and rule creation
- Editable cells for Nominal Code, Cost Centre, and Journal Description only on Current and Lookup views
- Archived view is strictly read-only

---

## 2. Module Navigation

### Landing Page Card

| Property | Value |
|---|---|
| Category | Treasury (alongside Ad-hoc Payments, Bank Statement Transactions, Vehicle Release Payments) |
| Icon | `post_add` (Material Symbols Outlined) |
| Title | Office Account Postings |
| Description | Manage office account posting entries |
| Navigation | `href="OAP_CurrentTransactions.html"` |

### OAP Sub-Pages

| # | Page | File | Purpose |
|---|---|---|---|
| 1 | Current Open Transactions | `OAP_CurrentTransactions.html` | Active daily workspace — review, code, export |
| 2 | Archived Transactions | `OAP_ArchivedTransactions.html` | Read-only history of processed postings |
| 3 | Lookup Table | `OAP_LookupTable.html` | Manage auto-coding match rules |

---

## 3. Colour Tokens

All OAP pages inherit the full MET-DS-V2 token set from `FinOps_Web_Design_Guidelines.md`. Below are the **module-specific** colour usages.

### Team Badge Colours

| Team | Background | Text |
|---|---|---|
| AP (Accounts Payable) | `#E3F2FD` | `#1565C0` |
| AR (Accounts Receivable) | `#FFF3E0` | `#E65100` |
| C&B (Cash & Banking) | `#E8F5E9` | `#2E7D32` |

### Transaction Status Colours

| Status | Background Token | Text Token | CSS Class |
|---|---|---|---|
| Coded | `--color-success-bg` (`#E8F5E9`) | `--color-success-dark` (`#388E3C`) | `.badge--coded` |
| Pending | `--color-warning-bg` (`#FFF3E0`) | `--color-warning` (`#EF6C00`) | `.badge--pending` |
| Exported | `--color-primary-50` (`#DEE8F7`) | `--color-primary-700` (`#275798`) | `.badge--exported` |

### Account Type Badges (Lookup Table)

| Type | Background | Text | CSS Class |
|---|---|---|---|
| Supplier | `#E3F2FD` | `#1565C0` | `.badge--supplier` |
| Customer | `#FFF3E0` | `#E65100` | `.badge--customer` |
| Ledger | `#E8F5E9` | `#2E7D32` | `.badge--ledger` |

### Status Summary Card Icon Colours

| Card | Icon Colour | Background |
|---|---|---|
| Total | `--color-primary` (`#3276CF`) | `--color-primary-50` (`#DEE8F7`) |
| Auto-Coded | `--color-success` (`#43A047`) | `--color-success-bg` (`#E8F5E9`) |
| Pending Coding | `--color-warning` (`#EF6C00`) | `--color-warning-bg` (`#FFF3E0`) |
| Exported | `#1565C0` | `#E3F2FD` |

---

## 4. Typography

Inherits the full type scale from the base design guidelines. Module-specific usages:

| Element | Size | Weight | Colour | Token |
|---|---|---|---|---|
| Page title | 24px | 600 (semibold) | `--text-primary` | `--font-size-h1` |
| Page subtitle | 14px | 400 (regular) | `--text-secondary` | `--font-size-body` |
| Table header | 12px | 600 (semibold) | `--text-secondary` | `--font-size-caption` |
| Table cell | 14px | 400 (regular) | `--text-primary` | `--font-size-body` |
| Badge text | 12px | 500 (medium) | Varies per badge | `--font-size-caption` |
| Filter label | 12px | 500 (medium) | `--text-secondary` | `--font-size-caption` |
| Breadcrumb | 12px | 500 (medium) | `--text-secondary` | `--font-size-caption` |
| Status card number | 24px | 700 (bold) | `--text-primary` | `--font-size-h1` |
| Status card label | 12px | 500 (medium) | `--text-secondary` | `--font-size-caption` |
| Modal title | 20px | 600 (semibold) | `--text-primary` | `--font-size-h2` |
| Pagination text | 12px | 400 (regular) | `--text-secondary` | `--font-size-caption` |

### Table Header Rules

- All caps (`text-transform: uppercase`)
- Letter-spacing: `0.5px`
- Sort icon inline at 16px, opacity `0.4` default, `1.0` when sorted (with `--color-primary`)
- Cursor: `pointer` for sortable columns

---

## 5. Spacing & Grid

Inherits the 8pt spacing scale. Module-specific layout values:

| Context | Property | Value |
|---|---|---|
| Content area padding | `padding` | `--space-7` (24px) |
| Content inner max-width | `max-width` | `1440px` |
| Section gap | `gap` | `--space-7` (24px) |
| Status card grid | `grid-template-columns` | `repeat(auto-fill, minmax(180px, 1fr))` |
| Status card gap | `gap` | `--space-4` (12px) |
| Status card padding | `padding` | `16px 20px` |
| Table cell padding | `padding` | `12px 16px` |
| Toolbar gap | `gap` | `--space-5` (16px) |
| Filter group gap | `gap` | `--space-1` (2px) internal; `--space-4` (12px) between groups |
| Modal padding | `padding` | `--space-7` (24px) |
| Modal form row gap | `gap` | `--space-5` (16px) |

---

## 6. Borders, Radius & Shadows

| Element | Property | Value |
|---|---|---|
| Table container | `border-radius` | `--radius-card` (16px) |
| Status cards | `border-radius` | `--radius-card` (16px) |
| Buttons | `border-radius` | `--radius-button` (8px) |
| Filter inputs | `border-radius` | `--radius-input` (8px) |
| Badges | `border-radius` | `--radius-pill` (100px) |
| Inline edit inputs | `border-radius` | `--radius-input` (8px) |
| Table header border | `border-bottom` | `2px solid var(--grey-200)` |
| Table row border | `border-bottom` | `1px solid var(--grey-200)` |
| Table footer border | `border-top` | `1px solid var(--grey-200)` |
| Modal | `border-radius` | `--radius-card` (16px) |
| Modal | `box-shadow` | `--shadow-modal` |

---

## 7. Motion & Transitions

| Interaction | Duration | Easing | Property |
|---|---|---|---|
| Table row hover | `--duration-micro` (150ms) | `ease-out` | `background` |
| Button hover | `--duration-micro` (150ms) | `ease-out` | `background`, `color` |
| Sidebar expand | `--duration-standard` (250ms) | `ease-out` | `width` |
| Input focus ring | Instant | — | `border-color`, `box-shadow` |
| Modal open/close | Instant (display toggle) | — | `display` via `.is-open` |

All transitions gated by `@media (prefers-reduced-motion: reduce)`.

---

## 8. App Shell & Layout

```
┌──────────────────────────────────────────┐
│  Top Navigation (shared, fixed header)   │
├─────┬────────────────────────────────────┤
│ Nav │  Content Area (scrollable)         │
│ 56px│  ┌─ content-inner 1440px ──────┐  │
│     │  │  Breadcrumb                 │  │
│     │  │  Page Header + Actions      │  │
│     │  │  Status Summary Cards       │  │
│     │  │  Toolbar / Filters          │  │
│     │  │  Data Table                 │  │
│     │  │  Pagination                 │  │
│     │  └─────────────────────────────┘  │
└─────┴────────────────────────────────────┘
```

| Class | Properties |
|---|---|
| `.app-shell` | `display: flex; flex-direction: column; height: 100vh; overflow: hidden` |
| `.main-layout` | `display: flex; flex: 1; overflow: hidden` |
| `.content-area` | `flex: 1; overflow-y: auto; padding: var(--space-7)` |
| `.content-inner` | `max-width: 1440px; margin: 0 auto; gap: var(--space-7)` |

---

## 9. Top Navigation

Shared component across all FinOps pages. See `FinOps_Web_Design_Guidelines.md` §7.2.

**OAP-specific note:** The FinOps logo is wrapped in an `<a>` linking back to `LandingPage.html` for quick escape to the module selector.

---

## 10. Sidebar Navigation

### OAP Sidebar Structure

| Section | Items |
|---|---|
| **Office Account Postings** | Current Open Transactions, Archived Transactions, Lookup Table |
| **Navigation** | Home (→ LandingPage.html) |

### Sidebar Icons

| Item | Material Symbol |
|---|---|
| Current Open Transactions | `receipt_long` |
| Archived Transactions | `inventory_2` |
| Lookup Table | `manage_search` |
| Home | `home` |

### Active State

The currently active page uses `.is-active` class with `aria-current="page"`:
- Background: `--color-primary-50` (`#DEE8F7`)
- Text colour: `--color-primary` (`#3276CF`)
- Font weight: `--font-weight-medium` (500)

### Dimensions & Behaviour

| State | Width | Behaviour |
|---|---|---|
| Collapsed (default) | 56px | Icons only; headings and labels at `opacity: 0` |
| Expanded (toggle/hover) | 260px | Full labels appear at `opacity: 1` |
| ≤ 767px | Hidden | `display: none` |

---

## 11. Breadcrumb

```
Home  ›  Office Account Postings  ›  Current Open Transactions
```

| Property | Value |
|---|---|
| Font size | `--font-size-caption` (12px) |
| Link colour | `--text-hyperlink` (`#3276CF`) |
| Link weight | `--font-weight-medium` (500) |
| Separator | `›` character, `--grey-400` colour, 16px size |
| Current page | `--text-primary`, `--font-weight-medium`, `aria-current="page"` |
| Gap between items | `--space-2` (4px) |

### Breadcrumb Paths

| Page | Path |
|---|---|
| Current Open Transactions | Home › Office Account Postings › Current Open Transactions |
| Archived Transactions | Home › Office Account Postings › Archived Transactions |
| Lookup Table | Home › Office Account Postings › Lookup Table |

---

## 12. Page Header & Actions

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Page Title (24px Semi-bold)              [Import] [Generate]│
│  Subtitle (14px Regular, secondary)                          │
└──────────────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Display | `flex`, `justify-content: space-between`, `align-items: center` |
| Wrap | `flex-wrap: wrap` with `gap: 16px` |
| Title | 24px / Semibold / `--text-primary` |
| Subtitle | 14px / Regular / `--text-secondary` |

### Page Titles & Subtitles

| Page | Title | Subtitle |
|---|---|---|
| Current Open Transactions | Current Open Transactions | Review, code, and export unreconciled office bank account postings |
| Archived Transactions | Archived Transactions | Read-only view of previously processed office bank account postings |
| Lookup Table | Lookup Table | Manage auto-coding rules for transaction matching — all fields are editable |

### Action Buttons per Page

| Page | Actions |
|---|---|
| Current Open Transactions | **Import File** (outline) + **Generate Journals** (primary) |
| Archived Transactions | *(no header actions)* |
| Lookup Table | **Upload CSV** (outline) + **Add Rule** (primary) |

---

## 13. Status Summary Cards

Displayed only on the **Current Open Transactions** page.

### Layout

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ 📋 248   │  │ ✅ 142   │  │ ✏️  78   │  │ 📤  28   │
│ Total    │  │ Auto-    │  │ Pending  │  │ Exported │
│          │  │ Coded    │  │ Coding   │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

| Property | Value |
|---|---|
| Grid | `repeat(auto-fill, minmax(180px, 1fr))` |
| Gap | `--space-4` (12px) |
| Card background | `--color-card` (`#FFFFFF`) |
| Card radius | `--radius-card` (16px) |
| Card padding | `16px 20px` |
| Layout | Horizontal flex: icon circle + info |
| Gap (icon → info) | `--space-5` (16px) |
| Container role | `role="list"` with `role="listitem"` per card |

### Icon Circle

| Property | Value |
|---|---|
| Size | `40 × 40px` |
| Border-radius | `--radius-pill` (circle) |
| Icon size | 22px (Material Symbols) |

### Card Info

| Element | Size | Weight | Colour |
|---|---|---|---|
| Number | 24px | 700 (bold) | `--text-primary` |
| Label | 12px | 500 (medium) | `--text-secondary` |

### Cards

| Card | Icon | Icon Colour | Circle BG |
|---|---|---|---|
| Total | `list_alt` | `--color-primary` | `--color-primary-50` |
| Auto-Coded | `check_circle` | `--color-success` | `--color-success-bg` |
| Pending Coding | `edit_note` | `--color-warning` | `--color-warning-bg` |
| Exported | `send` | `#1565C0` | `#E3F2FD` |

---

## 14. Toolbar & Filters

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│ [Team ▼] [Status ▼] [Entity ▼] [🔍 Search…]   [📥 Export] │
└──────────────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Display | `flex`, `justify-content: space-between` |
| Wrap | `flex-wrap: wrap` |
| Gap | `--space-5` (16px) |

### Filter Select

| Property | Value |
|---|---|
| Font | `--font-family`, `--font-size-body` (14px) |
| Padding | `8px 12px` |
| Border | `1px solid var(--grey-300)` |
| Radius | `--radius-input` (8px) |
| Min-height | 36px |
| Min-width | 140px |
| Focus | `border-color: var(--color-primary)`, `box-shadow: 0 0 0 2px rgba(50,118,207,0.15)` |

### Search Box

| Property | Value |
|---|---|
| Layout | Flex row: search icon + text input |
| Icon | 20px, `--grey-500` |
| Input | No border, full flex |
| Outer border | `1px solid var(--grey-300)` |
| Radius | `--radius-input` (8px) |
| Min-width | 200px |
| Placeholder | `--grey-400` |

### Filters per Page

| Page | Filters |
|---|---|
| Current Open Transactions | Team, Status, Legal Entity, Search |
| Archived Transactions | Team, Legal Entity, Date From, Date To, Search |
| Lookup Table | Team, Account Type, Search |

---

## 15. Data Table

### Container

| Property | Value |
|---|---|
| Background | `--color-card` (`#FFFFFF`) |
| Radius | `--radius-card` (16px) |
| Overflow | Hidden (clips to radius) |
| Scroll | `.table-scroll` with `overflow-x: auto` |

### Header Row (`<thead>`)

| Property | Value |
|---|---|
| Background | `--grey-50` (`#FAFAFA`) |
| Position | `sticky`, `top: 0`, `z-index: 2` |
| Font | 12px / Semibold / `--text-secondary` |
| Text transform | `uppercase` |
| Letter spacing | `0.5px` |
| Padding | `12px 16px` |
| Bottom border | `2px solid var(--grey-200)` |
| Sort icon | 16px Material icon inline, opacity `0.4` default |
| Sorted state | Icon opacity `1.0`, colour `--color-primary` |

### Body Row (`<tbody>`)

| Property | Value |
|---|---|
| Cell padding | `12px 16px` |
| Bottom border | `1px solid var(--grey-200)` |
| White-space | `nowrap` |
| Hover | Background `--color-primary-25` (`#F2F5FA`) |
| Transition | `background 150ms ease-out` |

### Column Definitions

#### Current Open Transactions & Archived Transactions

| # | Column | Editable (Current) | Editable (Archived) | Width Hint |
|---|---|---|---|---|
| 1 | Filename | No | No | Auto |
| 2 | Team | No | No | Auto (badge) |
| 3 | Booking Date | No | No | ~100px |
| 4 | Description | No | No | Wide (flexible) |
| 5 | Entry Ref | No | No | Auto |
| 6 | Trans Code | No | No | ~80px |
| 7 | Debit | No | No | Right-aligned, ~100px |
| 8 | Credit | No | No | Right-aligned, ~100px |
| 9 | Legal Entity | No | No | ~90px |
| 10 | Bank Acct | No | No | Auto |
| 11 | Nominal Code | **Yes** | No | Min 100px |
| 12 | Cost Centre | **Yes** | No | Min 100px |
| 13 | Journal Desc | **Yes** | No | Min 100px |
| 14 | Exported | No | No | Badge |

#### Lookup Table

| # | Column | Editable | Width Hint |
|---|---|---|---|
| 1 | Team | Yes | ~60px |
| 2 | Legal Entity | Yes | ~80px |
| 3 | Bank Account | Yes | ~100px |
| 4 | Description | Yes | Wide (flexible) |
| 5 | Entry Ref | Yes | Auto |
| 6 | Trans Code | Yes | ~80px |
| 7 | Account Type | No (badge display) | Badge |
| 8 | Nominal Code | Yes | ~120px |
| 9 | Cost Centre | Yes | ~100px |
| 10 | Notes | Yes | ~160px |
| 11 | Actions | No (Save/Delete buttons) | 80px fixed |

### Currency Formatting

| Property | Value |
|---|---|
| Symbol | `£` prefix |
| Alignment | Right-aligned |
| Thousands separator | Comma (e.g. `£7,658.18`) |
| Null/zero display | `—` (em dash) |

---

## 16. Inline Editing

Editable cells contain an `<input type="text">` inside `.editable` table cells.

| Property | Value |
|---|---|
| Font | `--font-family`, `--font-size-body` (14px) |
| Border | `1px solid var(--grey-300)` |
| Radius | `--radius-input` (8px) |
| Padding | `4px 8px` |
| Background | `--color-card` |
| Min-width | 100px |
| Focus border | `--color-primary` |
| Focus shadow | `0 0 0 2px rgba(50,118,207,0.15)` |
| Placeholder | `—` for empty optional fields, `--grey-400` colour |

### Editability Rules

| Page | Editable Fields | Read-Only Fields |
|---|---|---|
| Current Open Transactions | Nominal Code, Cost Centre, Journal Description | All other columns |
| Archived Transactions | None — **all fields read-only** | All columns |
| Lookup Table | All data fields (Team through Notes) | Account Type badge, Actions column |

---

## 17. Team Badges

Pill-shaped, colour-coded badges for team assignment.

| Property | Value |
|---|---|
| Padding | `2px 8px` |
| Radius | `--radius-pill` (100px) |
| Font | 12px / Medium (500) |
| Line-height | 1.5 |

| Badge | CSS Class | Background | Text |
|---|---|---|---|
| AP | `.badge--team-ap` | `#E3F2FD` | `#1565C0` |
| AR | `.badge--team-ar` | `#FFF3E0` | `#E65100` |
| C&B | `.badge--team-cb` | `#E8F5E9` | `#2E7D32` |

---

## 18. Status Badges

Used in the Exported column of transaction tables.

| Badge | CSS Class | Background | Text |
|---|---|---|---|
| Coded | `.badge--coded` | `--color-success-bg` (`#E8F5E9`) | `--color-success-dark` (`#388E3C`) |
| Pending | `.badge--pending` | `--color-warning-bg` (`#FFF3E0`) | `--color-warning` (`#EF6C00`) |
| Exported | `.badge--exported` | `--color-primary-50` (`#DEE8F7`) | `--color-primary-700` (`#275798`) |

Status logic:
- **Pending** — Nominal Code is empty (not yet coded)
- **Coded** — Nominal Code populated but not yet exported
- **Exported** — Record has been included in a generated journal file

---

## 19. Pagination

Appears in the table footer.

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  Showing 1–8 of 248 transactions      [◀] Page 1 of 31 [▶]│
└──────────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Container | `flex`, `justify-content: space-between` |
| Padding | `12px 16px` |
| Top border | `1px solid var(--grey-200)` |
| Text | 12px / Regular / `--text-secondary` |
| Nav buttons | 32 × 32px, `--radius-button` (8px) |
| Button icon | 20px chevron, `--text-secondary` |
| Button hover | Background `--grey-100` |
| Button disabled | `--grey-300` colour, `cursor: default` |

---

## 20. Import File Dialog

Triggered by the **Import File** button on Current Open Transactions.

### Purpose
Upload the daily bank statement transactions file (.xlsx). Only records where Source Type = "Bank Statement" are imported.

### Anatomy

```
┌─────────────────────────────────────────┐
│  Import Transactions File               │
│                                         │
│  Upload the bank statement transactions │
│  file (.xlsx). Only records where       │
│  Source Type = "Bank Statement" will     │
│  be imported.                           │
│                                         │
│  Select file                            │
│  [file input .xlsx,.xls,.csv]           │
│                                         │
│                    [Cancel] [⬆ Import]  │
└─────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Overlay | `rgba(0,0,0,0.4)`, fixed inset, `z-index: 1000` |
| Modal width | 480px (max 90vw) |
| Modal padding | `--space-7` (24px) |
| Modal radius | `--radius-card` (16px) |
| Modal shadow | `--shadow-modal` |
| Title | 20px / Semibold |
| Body text | 14px / Regular / `--text-secondary` |
| File input | Accepts `.xlsx, .xls, .csv` |
| Close triggers | Cancel button, overlay click, Escape key |

---

## 21. Add Rule Dialog

Triggered by the **Add Rule** button on Lookup Table.

### Form Fields (2-column grid)

| Row | Field 1 | Field 2 |
|---|---|---|
| 1 | Team (select: AP, AR, C&B) | Legal Entity (text) |
| 2 | Bank Account (text) | Transaction Code (text) |
| 3 | Description — match pattern (text, full width) | |
| 4 | Entry Reference (text) | Account Type (select: Supplier, Customer, Ledger) |
| 5 | Nominal Code (text) | Cost Centre (text) |
| 6 | Notes (text, full width) | |

### Form Control Styling

| Property | Value |
|---|---|
| Label | 12px / Medium / `--text-secondary` |
| Input | 14px, `1px solid var(--grey-300)`, `--radius-input` (8px), min-height 40px |
| Input focus | `border-color: var(--color-primary)`, `box-shadow: 0 0 0 2px rgba(50,118,207,0.15)` |
| Grid gap | `--space-5` (16px) |
| Full-width class | `.full-width` spans both columns |

---

## 22. Buttons

### Variants

| Variant | CSS Class | Background | Border | Text | Usage |
|---|---|---|---|---|---|
| Primary | `.btn-primary` | `--color-primary` | None | White | Generate Journals, Add Rule, Import confirm |
| Outline | `.btn-outline` | `--color-card` | `1.5px solid --color-primary` | `--color-primary` | Import File, Upload CSV |
| Ghost | `.btn-ghost` | Transparent | None | `--text-secondary` | Export CSV, Cancel |
| Danger | `.btn-danger` | `--color-error` | None | White | (reserved for destructive actions) |

### Shared Properties

| Property | Value |
|---|---|
| Display | `inline-flex`, `align-items: center` |
| Gap (icon → text) | `--space-3` (8px) |
| Padding | `8px 16px` |
| Min-height | 40px |
| Radius | `--radius-button` (8px) |
| Font | 14px / Semibold (600) |
| Icon size | 20px |
| Transition | `background 150ms ease-out` |
| Elevation | None (`disableElevation` in MUI) |

### Row Action Buttons (Lookup Table)

| Property | Value |
|---|---|
| Size | 32 × 32px |
| Radius | `--radius-button` (8px) |
| Icon size | 18px |
| Default colour | `--text-secondary` |
| Hover | Background `--grey-100`, colour `--color-primary` |
| Actions | Save (`save` icon), Delete (`delete` icon) |

---

## 23. Current Open Transactions Page

**File:** `OAP_CurrentTransactions.html`

### Sections (top to bottom)

1. **Breadcrumb** — Home › Office Account Postings › Current Open Transactions
2. **Page Header** — Title + Import File / Generate Journals buttons
3. **Status Summary Cards** — 4 cards (Total, Auto-Coded, Pending Coding, Exported)
4. **Toolbar** — Team, Status, Entity filters + search + Export CSV
5. **Data Table** — 14 columns, 3 editable (Nominal Code, Cost Centre, Journal Desc)
6. **Pagination** — Row count + page navigation

### Business Logic

- **Sort default:** Team ascending, then Debit highest-to-lowest, then Credit highest-to-lowest
- **Generate Journals** picks up records that are **coded** (have Nominal Code) but **not yet exported**
- **After export:** Exported column auto-fills with "Yes" badge; filename added to audit trail
- **Manual import:** Same process as automated — used at month-end

---

## 24. Archived Transactions Page

**File:** `OAP_ArchivedTransactions.html`

### Sections (top to bottom)

1. **Breadcrumb** — Home › Office Account Postings › Archived Transactions
2. **Page Header** — Title only (no action buttons)
3. **Toolbar** — Team, Entity, Date From, Date To filters + search + Export CSV
4. **Data Table** — 14 columns, **all read-only** (no editable inputs)
5. **Pagination**

### Key Differences from Current Transactions

| Aspect | Current | Archived |
|---|---|---|
| Editable cells | Nominal Code, Cost Centre, Journal Desc | **None** |
| Status Summary Cards | Shown | **Not shown** |
| Import / Generate buttons | Shown | **Not shown** |
| Date range filter | Not shown | **Shown** |
| All records status | Mixed | All **Exported** |
| Default sort | Team ascending | Booking Date descending |

---

## 25. Lookup Table Page

**File:** `OAP_LookupTable.html`

### Sections (top to bottom)

1. **Breadcrumb** — Home › Office Account Postings › Lookup Table
2. **Page Header** — Title + Upload CSV / Add Rule buttons
3. **Toolbar** — Team filter, Account Type filter, search + Export CSV
4. **Data Table** — 11 columns, 9 editable fields + Account Type badge + row action buttons
5. **Pagination**

### Key Behaviours

- **All data fields are inline-editable** (except Account Type which displays as a badge)
- Each row has **Save** and **Delete** action buttons
- **Add Rule** opens a modal form for creating new lookup entries
- **Upload CSV** allows bulk import of lookup rules
- Lookup rules are used by automation to auto-code incoming transactions

### Lookup Match Logic

The automation matches incoming transactions against the Lookup Table using:
1. **Description** (partial match)
2. **Entry Reference** (exact match, if present)
3. **Bank Statement Transaction Code** (exact match)
4. **Legal Entity + Bank Account** combination

When matched → Nominal Code and Cost Centre are auto-populated on the transaction.

---

## 26. Iconography

| Context | Icon Name | Size | Usage |
|---|---|---|---|
| Landing page card | `post_add` | 24px | OAP module entry point |
| Sidebar — Current | `receipt_long` | 22px | Current Open Transactions link |
| Sidebar — Archived | `inventory_2` | 22px | Archived Transactions link |
| Sidebar — Lookup | `manage_search` | 22px | Lookup Table link |
| Sidebar — Home | `home` | 22px | Back to landing page |
| Import button | `upload_file` | 20px | Import file action |
| Generate button | `description` | 20px | Generate journals action |
| Add Rule button | `add` | 20px | Add new lookup rule |
| Upload CSV button | `upload_file` | 20px | Upload lookup data |
| Search | `search` | 20px | Search input prefix |
| Export CSV | `download` | 20px | Export data action |
| Sort (unsorted) | `unfold_more` | 16px | Column sortable indicator |
| Sort (ascending) | `expand_less` | 16px | Sorted ascending |
| Sort (descending) | `expand_more` | 16px | Sorted descending |
| Pagination prev | `chevron_left` | 20px | Previous page |
| Pagination next | `chevron_right` | 20px | Next page |
| Row save | `save` | 18px | Save row changes (Lookup) |
| Row delete | `delete` | 18px | Delete row (Lookup) |
| Upload confirm | `upload` | 20px | Confirm import |
| Status — Total | `list_alt` | 22px | Total count card |
| Status — Coded | `check_circle` | 22px | Auto-coded count card |
| Status — Pending | `edit_note` | 22px | Pending coding card |
| Status — Exported | `send` | 22px | Exported count card |

**Library:** Material Symbols Outlined  
**Icon colour defaults:** `--text-secondary` (`#757575`), active: `--color-primary` (`#3276CF`)

---

## 27. Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| ≥ 1280px (desktop) | Full sidebar + full table; all status cards in a row |
| 768–1279px (tablet) | Sidebar collapses; status cards wrap; table scrolls horizontally |
| < 768px (mobile) | Sidebar hidden; page header stacks vertically; status cards 1–2 per row; table scrolls |

### Mobile-Specific Overrides

| Element | Change |
|---|---|
| `.sidebar` | `display: none` |
| `.status-row` | `grid-template-columns: 1fr 1fr` |
| `.page-header` | `flex-direction: column; align-items: flex-start` |
| `.form-row` (modal) | `grid-template-columns: 1fr` (single column) |

---

## 28. Accessibility (WCAG 2.2 AA)

| Requirement | Implementation |
|---|---|
| **Landmarks** | `<header>` (top nav), `<nav>` (sidebar + breadcrumb), `<main>` (content) |
| **Heading hierarchy** | `<h1>` page title, `<h2>` modal titles |
| **Table semantics** | `<table>` with `<thead>`, `<tbody>`, `<th scope="col">` |
| **Table aria-label** | Descriptive: "Current open transactions", "Archived transactions", "Lookup table rules" |
| **Status cards** | `role="list"` container, `role="listitem"` per card |
| **Focus indicator** | `outline: 2px solid var(--color-primary); outline-offset: 2px` |
| **Input focus** | Blue border + 2px shadow ring |
| **Colour contrast** | All text meets 4.5:1 (body) or 3:1 (large text/UI components) |
| **Colour + text** | Status communicated via badge text + colour, never colour alone |
| **Modal focus trap** | Dialog captures focus; `Escape` dismisses; `aria-modal="true"` |
| **Keyboard nav** | Full tab order through filters, table cells, editable inputs, buttons |
| **ARIA labels** | All icon buttons have descriptive `aria-label`; decorative icons have `aria-hidden="true"` |
| **Reduced motion** | `@media (prefers-reduced-motion: reduce)` disables all animations |
| **Touch targets** | Buttons min 40px height; row action buttons 32×32px (above 24px minimum) |
| **Current page** | `aria-current="page"` on active sidebar link and breadcrumb |

---

## 29. MUI v5 Component Mapping

| OAP Element | MUI Component | Key Props |
|---|---|---|
| Data Table | `<DataGrid>` or `<Table>` | `stickyHeader`, `size="small"` |
| Editable Cell | `<TextField>` | `variant="outlined"`, `size="small"` |
| Filter Select | `<Select>` | `variant="outlined"`, `size="small"` |
| Search Input | `<TextField>` | `variant="outlined"`, `InputProps={{ startAdornment: <SearchIcon /> }}` |
| Status Card | `<Card>` + `<CardContent>` | `elevation={0}`, `sx={{ borderRadius: 4 }}` |
| Badge (Team) | `<Chip>` | `size="small"`, custom `sx` per team colour |
| Badge (Status) | `<Chip>` | `size="small"`, custom `sx` per status |
| Primary Button | `<Button>` | `variant="contained"`, `disableElevation`, `startIcon={<Icon />}` |
| Outline Button | `<Button>` | `variant="outlined"`, `startIcon={<Icon />}` |
| Ghost Button | `<Button>` | `variant="text"`, `color="inherit"` |
| Import Modal | `<Dialog>` | `maxWidth="sm"`, `fullWidth` |
| Add Rule Modal | `<Dialog>` | `maxWidth="sm"`, `fullWidth` |
| Form Input | `<TextField>` | `variant="outlined"`, `fullWidth` |
| Form Select | `<Select>` + `<MenuItem>` | `variant="outlined"` |
| Pagination | `<TablePagination>` | Standard MUI pagination |
| Sidebar | `<Drawer>` | `variant="permanent"`, custom width transition |
| Breadcrumb | `<Breadcrumbs>` | `separator="›"` |
| Icon | `<Icon>` / `<SvgIcon>` | Material Symbols via `@mui/icons-material` |

---

## 30. Data Model Reference

### Current / Archived Transactions

| Field | Type | Source | Editable |
|---|---|---|---|
| Filename | String | Import file name | No |
| Team | Enum (AP, AR, C&B) | Auto-assigned by lookup or rule | No |
| Booking Date | Date | Bank statement | No |
| Statement ID | String | Bank statement | No |
| Description | String | Bank statement | No |
| Entry Reference | String | Bank statement | No |
| Bank Statement Transaction Code | Integer | Bank statement | No |
| Credit Amount | Decimal | Bank statement | No |
| Debit Amount | Decimal | Bank statement | No |
| Legal Entity | String | Bank statement | No |
| Bank Account | String | Bank statement | No |
| Nominal Code | String | User / auto-coded | **Yes** (Current only) |
| Cost Centre | String | User / auto-coded | **Yes** (Current only) |
| Journal Description | String | User input | **Yes** (Current only) |
| Exported | Boolean → Badge | System-set on journal generation | No |

### Lookup Table

| Field | Type | Editable |
|---|---|---|
| Team | Enum (AP, AR, C&B) | Yes |
| Legal Entity | String | Yes |
| Bank Account | String | Yes |
| Description | String (match pattern) | Yes |
| Entry Reference | String | Yes |
| Bank Statement Transaction Code | Integer | Yes |
| Account Type | Enum (Supplier, Customer, Ledger) | Yes |
| Nominal Code | String | Yes |
| Cost Centre | String | Yes |
| Notes | String | Yes |

### Transaction Code to Team Mapping (Default Rules)

When no lookup match is found, the transaction code determines the default team assignment:

| Transaction Code | Default Team |
|---|---|
| 169 | AR |
| 174 | AR |
| 229 | AR / C&B (context-dependent) |
| 233 | AR |
| 241 | C&B |
| 244 | C&B |
| 399 | AR |
| 466 | AP |
| 531 | AP |
| 548 | AP |
| 622 | C&B |
| 699 | C&B |

---

*These guidelines are specific to the Office Account Postings (OAP) module and extend the base [FinOps Web Design Guidelines](FinOps_Web_Design_Guidelines.md). All prototypes and production code for OAP must comply with both this document and the parent guidelines.*
