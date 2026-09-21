# ProServe — Quick List Page Design Guidelines

> Companion guideline for the **Quick List** worklist page —
> the primary operational landing screen for Advance, replacing the previous
> "Dashboard" entry in the sidebar.
> Follows the same MET-DS-V2 design system and Advance conventions as
> [`advance_contact_service.html`](../UX_Deliverables/prototype/advance_contact_service.html)
> and [`add_contract_service.html`](../UX_Deliverables/prototype/add_contract_service.html).

---

## 1. Page Overview

| Property         | Value                                                                |
|------------------|----------------------------------------------------------------------|
| Page type        | **Operational worklist** — tabbed multi-list landing page            |
| Theme mode       | **Light** (default)                                                  |
| Page background  | `--color-bg` · `#F2F5FA`                                             |
| Shell layout     | 2-column CSS grid — shared with all Advance pages                    |
| File             | [`quick_list.html`](../UX_Deliverables/prototype/quick_list.html)    |
| Source           | `business/Advance Quick List Page Revamp.doc`                        |
| Sidebar entry    | **Quick List** (replaces "Dashboard")                                |
| Primary purpose  | Surface the agent's daily action queue across 7 operational pipelines |

---

## 2. Page Goals

1. Give Certificate Officers, Compliance, and Operations a **single landing page**
   that lists "what needs my attention today" without navigating to a dashboard first.
2. Group workload into **7 named worklists** that mirror the certification lifecycle:
   Certificate · Court Hearing · Renewal · Renewal Court Hearing · Risk Register · DBS Request · Contractors.
3. Show, per worklist, **2–4 KPI counters** at the top that double as **one-click filters** for the table below.
4. Always present the same **records data-table pattern** (search · entries · export · pagination · row actions) so users build muscle memory across tabs.

---

## 3. Layout Structure

```
┌────────────┬────────────────────────────────────────────────────────────┐
│            │  Top Bar (56 px)                                           │
│            ├────────────────────────────────────────────────────────────┤
│  Left      │  Page Header Banner — "Quick List - Operational worklists" │
│  Sidebar   │                                       Last updated …       │
│  200 px    ├────────────────────────────────────────────────────────────┤
│            │  Breadcrumb · Home › Quick List                            │
│  (Quick    ├────────────────────────────────────────────────────────────┤
│   List is  │  ▣ Quick List Tab Bar (7 tabs · gradient)                  │
│  active)   ├────────────────────────────────────────────────────────────┤
│            │  ┌─ KPI Grid (2–4 stat cards) ───────────────────────────┐ │
│            │  └──────────────────────────────────────────────────────┘ │
│            │  ┌─ Table Card ──────────────────────────────────────────┐ │
│            │  │  Controls · Data table · Pagination footer            │ │
│            │  └──────────────────────────────────────────────────────┘ │
│            ├────────────────────────────────────────────────────────────┤
│            │  Page Footer                                               │
└────────────┴────────────────────────────────────────────────────────────┘
```

---

## 4. Shared Components (inherited)

These are **identical** to the records list page and add-record page:

| Component            | Reference                                              |
|----------------------|--------------------------------------------------------|
| App Shell Grid       | `grid-template-columns: 200px 1fr`                     |
| Left Sidebar         | 200 px, Advance logo, 4 nav items                      |
| Top Navigation Bar   | 56 px, search, bell, avatar + greeting                 |
| Page Header Banner   | `linear-gradient(90deg, #006494, #8EC0E2)`             |
| Page Footer          | Atlas · ProServe Learn · Powered-by Acme          |
| Data Table           | `.data-table` with sort icons, row hover, row actions  |
| Table Controls       | "show N entries" · search · export button              |
| Pagination           | `.pagination-btn` with prev/next + numbered + ellipsis |
| Badges               | `.badge--success / --warning / --error / --info / --neutral` |
| Toast Notification   | Dark pill, bottom-center, 2.5 s auto-dismiss           |

---

## 5. Sidebar Navigation — Updated Order

The Quick List page replaces "Dashboard" as the **first item** in the sidebar.

| Order | Label        | Icon (Feather)   | Active page          | Notes                                     |
|------:|--------------|------------------|----------------------|-------------------------------------------|
| 1     | **Quick List** | list (with dot) | `quick_list.html`    | **New** — was "Dashboard"                 |
| 2     | Records      | file-text        | `advance_contact_service.html` | unchanged                       |
| 3     | Reports      | bar-chart-2      | —                    | unchanged                                 |
| 4     | Settings     | settings         | —                    | unchanged                                 |

Active-state styling unchanged: 3 px left border in `--color-primary`,
`--color-primary-25` background, `--color-primary` text, `aria-current="page"`.

---

## 6. Page Header Banner

| Property        | Value                                                          |
|-----------------|----------------------------------------------------------------|
| Background      | `linear-gradient(90deg, #006494 0%, #8EC0E2 100%)`             |
| Box-shadow      | `0 4px 3px 0 rgba(0, 0, 0, 0.10)`                              |
| Height          | `48px` min                                                      |
| Title           | White · "Quick List" bold + "- Operational worklists" regular  |
| Right meta slot | "Last updated **{timestamp}**" — caption size, white            |
| No action btn   | Quick List has no "Add new" CTA — actions live in each table    |

---

## 7. Breadcrumb

`Home › Quick List` — uses the standard `.breadcrumb` pattern.
Padding `16px 24px`, caption size, link colour `--text-hyperlink`,
current page `--text-primary` `600` weight.

---

## 8. Quick List Tab Bar (`.ql-tabbar`)

The 7 worklist tabs sit immediately below the breadcrumb. They use a
**dark-to-light blue gradient** that visually echoes the page header banner,
giving the Quick List its own recognisable "shelf".

### 8.1 Container

| Property       | Value                                                             |
|----------------|-------------------------------------------------------------------|
| Margin         | `0 24px` (aligned with page content gutter)                        |
| Background     | `linear-gradient(90deg, #006494 0%, #3276CF 60%, #8EC0E2 100%)`   |
| Border-radius  | `8px 8px 0 0` (top corners only — flush with table card below)     |
| Overflow       | `auto-x` so the bar scrolls on narrow viewports                   |
| Box-shadow     | `0 2px 4px rgba(0,0,0,0.08)`                                       |
| Role           | `role="tablist"` with `aria-label="Quick list categories"`         |

### 8.2 Tab (`.ql-tab`)

| Property                     | Value                                                 |
|------------------------------|-------------------------------------------------------|
| Padding                      | `12px 16px`                                            |
| Min-width                    | `140px` per tab; equal flex distribution               |
| Font                         | `14px / 600`                                            |
| Default colour               | `rgba(255,255,255,0.85)`                               |
| Hover colour                 | `#FFFFFF` · bg `rgba(255,255,255,0.08)`                |
| Active (`aria-selected=true`)| `#FFFFFF` · bg `rgba(255,255,255,0.12)` · `3px` white bottom border |
| Focus-visible                | Inset `2px` white ring (preserves gradient context)    |
| Count pill (`.ql-tab-count`) | Min 22 × 22 px, pill radius, `11px / 700`              |
|                              | Inactive: bg `rgba(255,255,255,0.22)` · `#FFFFFF`      |
|                              | Active:   bg `#FFFFFF` · text `--color-primary-700`    |
| Keyboard nav                 | `←/→` move focus and switch tab, `Home`/`End` jump     |

### 8.3 The 7 Tabs

| # | Tab label              | URL hash       | KPI cards | Table primary key |
|--:|------------------------|----------------|-----------|-------------------|
| 1 | Certificate            | `#certificate` | 4         | Certificate No.   |
| 2 | Court Hearing          | `#court-hearing`| 2        | Hearing Date      |
| 3 | Renewal                | `#renewal`     | 3         | Renewal Due       |
| 4 | Renewal Court Hearing  | `#renewal-hearing`| 2     | Hearing Date      |
| 5 | Risk Register          | `#risk`        | 3         | Days to Expiry    |
| 6 | DBS Request            | `#dbs`         | 1         | Awaiting Since    |
| 7 | Contractors            | `#contractors` | 2         | Contract End      |

Deep-linking is supported via the URL hash (e.g. `quick_list.html#risk`).

---

## 9. KPI Card Grid (`.kpi-grid`, `.kpi-card`)

KPI cards live at the top of each panel and **act as one-click filters**
for the data table immediately below.

### 9.1 Grid

| Breakpoint        | Columns                       |
|-------------------|-------------------------------|
| ≥ 1100 px         | `repeat(4, 1fr)`              |
| 600 – 1100 px     | `repeat(2, 1fr)`              |
| < 600 px          | `1fr` (stacked)               |
| Gap               | `16px`                        |
| Padding           | `24px 24px 16px`              |

### 9.2 Card

| Property        | Value                                                          |
|-----------------|----------------------------------------------------------------|
| Element         | `<button>` — `aria-pressed="true|false"`                       |
| Background      | `#FFFFFF` · radius `8px` · `--border-default`                  |
| Box-shadow      | `--shadow-card` (default); `0 4px 12px rgba(50,118,207,.18)` on hover |
| Hover           | `transform: translateY(-1px)`                                  |
| Left accent bar | `4px` solid — colour by status variant (see 9.4)                |
| Pressed state   | `aria-pressed=true` → bg `--color-primary-25` + primary border  |
| Padding         | `16px 20px`                                                    |
| Layout          | Icon (40 px) · Body (label / value / sub)                       |

### 9.3 Internal typography

| Element       | Spec                                                        |
|---------------|-------------------------------------------------------------|
| `.kpi-label`  | `12px / 600` uppercase, letter-spacing `.3px`, `--text-secondary` |
| `.kpi-value`  | `28px / 700`, `--text-primary`, line-height `1.1`           |
| `.kpi-sub`    | `12px / 400`, `--text-secondary`                            |
| `.kpi-icon`   | `40 × 40 px`, radius `8px`, tinted bg per variant           |

### 9.4 Status Variants

| Variant                 | Left border / icon colour     | Token                  | Use for                                 |
|-------------------------|-------------------------------|------------------------|-----------------------------------------|
| `.kpi-card--info`       | `--color-primary` (`#3276CF`)  | bg `--color-primary-25`| In-progress, neutral counts             |
| `.kpi-card--success`    | `--color-success` (`#43A047`)  | bg `--color-success-bg`| Healthy / certified / active            |
| `.kpi-card--warning`    | `--color-warning` (`#FF9800`)  | bg `--color-warning-bg`| Awaiting, expiry risk (≤ 30 days)        |
| `.kpi-card--error`      | `--color-error` (`#E53935`)    | bg `--color-error-bg`  | Deferred, expired, breached SLAs        |

### 9.5 Per-tab KPI mapping

| Tab                     | KPI cards (left → right)                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------|
| Certificate             | **success** Currently Certificated · **info** New Apps In-Progress · **warning** New Apps Submitted · **info** New Self-Cert In-Progress |
| Court Hearing           | **warning** Awaiting Court Hearing · **error** Deferred Court Hearings                    |
| Renewal                 | **info** Renewal In-Progress · **warning** Renewal Submitted · **info** Renewal Self-Cert |
| Renewal Court Hearing   | **warning** Awaiting Renewal Hearing · **error** Deferred Renewal Hearings                |
| Risk Register           | **warning** Certification Expiry Risk · **warning** Bond Expiry Risk · **error** Certification Expired |
| DBS Request             | **info** Awaiting DBS                                                                     |
| Contractors             | **info** Acme Contractors · **success** FieldSync Contractors                             |

### 9.6 Interaction

- Clicking a KPI card toggles `aria-pressed`.
- Only one KPI can be "pressed" per panel at a time (radio behaviour).
- Pressing applies a row-level filter to the table below and emits a toast
  *"Filtered by {label}"*. Pressing again clears the filter
  (*"Filter cleared"*).

---

## 10. Table Card

Inherits `.table-card` + `.table-controls` + `.data-table` + `.table-footer`
from the records page. One table card per tab panel.

### 10.1 Controls bar

| Slot          | Component             | Spec                                  |
|---------------|----------------------|---------------------------------------|
| Left          | `.entries-select`    | `show [10|25|50|100] entries`         |
| Right         | `.search-inline`     | `36px`, 220 px width, magnifier icon  |
| Right (last)  | `.export-btn`        | outlined primary, "Export" + arrow icon |

### 10.2 Columns per tab

| Tab                     | Columns                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------|
| Certificate             | ID · Agent Name (avatar) · Certificate No. · Application Type · Brand · Court · Granted · Expiry · Status · ⋮ |
| Court Hearing           | ID · Agent Name · Application Type · Brand · Court · Hearing Date · Status · ⋮            |
| Renewal                 | ID · Agent Name · Current Cert No. · Application Type · Brand · Court · Renewal Due · Status · ⋮ |
| Renewal Court Hearing   | ID · Agent Name · Current Cert No. · Brand · Court · Hearing Date · Status · ⋮            |
| Risk Register           | ID · Agent Name · Brand · Risk Type · Cert/Bond No. · Expiry Date · Days to Expiry · Severity · ⋮ |
| DBS Request             | ID · Agent Name · Brand · Requested On · Awaiting Since (days) · Status · ⋮               |
| Contractors             | ID · Contractor Name · Brand · Role · Contract Start · Contract End · Status · ⋮          |

### 10.3 Status badge mapping

| Domain status         | Badge variant      |
|-----------------------|--------------------|
| Certificated · Active | `--success`        |
| In-Progress           | `--info`           |
| Awaiting Hearing · Awaiting · Ending Soon · Medium risk | `--warning` |
| Deferred · Expired · High risk | `--error`  |
| Draft · Other         | `--neutral`        |

### 10.4 Row actions

`.row-action-btn` (`⋮` kebab) opens a row menu with: **View · Edit · Delete (danger) · Audit Log**.
Same component as records page.

---

## 11. Page Header Meta Slot

The right-hand side of the banner shows a single live data point:

```
Last updated <strong>22 May 2026, 09:23</strong>
```

The timestamp is set on page load via JS (`new Date().toLocaleString`). It tells
users they are looking at fresh data — important because Quick List is the
operational queue.

---

## 12. Empty States (per table)

When a tab has zero records (after filter or naturally):

| Property        | Value                                                          |
|-----------------|----------------------------------------------------------------|
| Layout          | Centred inside table body, `padding: 48px 24px`                |
| Icon            | 40 px outline icon matching the tab (e.g. shield, clock)       |
| Heading         | `16px / 600`, `--text-primary` — "Nothing to action right now"  |
| Body            | `14px / 400`, `--text-secondary` — "You're all caught up."     |
| Optional action | Secondary button — "Clear filter" (only when a KPI is pressed) |

> The current prototype seeds each table with sample rows; empty states are
> defined here for implementation.

---

## 13. Responsive Behaviour

| Breakpoint  | Change                                                          |
|-------------|-----------------------------------------------------------------|
| `≤ 1100 px` | KPI grid → 2 columns                                            |
| `≤ 1024 px` | Sidebar collapses to `72 px` icon-only column                    |
|             | `.search-inline` width drops to `160 px`                         |
| `≤ 600 px`  | KPI grid → single column · tab bar scrolls horizontally          |
|             | Table wrapper scrolls horizontally (no column reflow)            |

---

## 14. Accessibility (WCAG 2.2 AA)

- **Tablist:** `.ql-tabbar` uses `role="tablist"`; each tab has `role="tab"`,
  `aria-selected`, and `aria-controls` pointing to its panel.
- **Panels:** `role="tabpanel"`, `aria-labelledby="tab-…"`. Inactive panels carry the
  `hidden` attribute (not just `display:none`).
- **Keyboard:** Tabs support `←/→`, `Home`, `End`. KPI cards are real `<button>`
  elements, focusable, with `aria-pressed`.
- **Focus rings:** All interactive elements expose `:focus-visible` rings
  (`--shadow-focus` on light bg, inset white on gradient).
- **Colour:** Status is never communicated by colour alone — every KPI and
  status badge carries a text label. The 4 status variants all meet 4.5:1
  contrast against white in their text usage.
- **Live regions:** Toast uses `role="status"` + `aria-live="polite"`.
- **Skip link:** "Skip to main content" → `#main-content`.
- **Tables:** `.table-wrapper` is `role="region"` `tabindex="0"` so keyboard
  users can scroll long tables.
- **Touch targets:** KPI cards ≥ 64 px tall; tabs ≥ 44 px tall.

---

## 15. Interaction Acceptance Criteria

| ID  | Criterion                                                                                  |
|-----|--------------------------------------------------------------------------------------------|
| QL-1 | Loading `quick_list.html` opens the **Certificate** tab by default.                       |
| QL-2 | Loading `quick_list.html#risk` opens the **Risk Register** tab directly.                  |
| QL-3 | Clicking any tab updates the URL hash without a page reload.                              |
| QL-4 | Clicking a KPI card toggles its `aria-pressed` state and applies the matching filter.     |
| QL-5 | Only one KPI per panel can be pressed at a time (clicking a second clears the first).     |
| QL-6 | Searching, paging, and changing entries within one tab does **not** affect other tabs.    |
| QL-7 | The "Last updated" timestamp reflects page load time.                                     |
| QL-8 | All row-action menus expose **View · Edit · Delete · Audit Log** consistently across tabs.|
| QL-9 | Sidebar shows **Quick List** as `aria-current="page"` on this screen.                     |
| QL-10| Tab labels each carry a count pill that matches the total number of records in that worklist. |

---

## 16. Offline / Sync (BRD progressive enhancement)

| Scenario                | Behaviour                                                            |
|-------------------------|----------------------------------------------------------------------|
| Network drop            | Page header meta swaps timestamp for amber chip "Offline – showing cached" |
| KPI counts stale        | KPI value shows a small `🕒` glyph + tooltip "Last synced HH:MM"     |
| Conflict on row update  | Row gets a left "conflict" stripe; row menu adds "Resolve conflict"  |

---

## 17. File Map

| File                                                                                              | Purpose                                |
|---------------------------------------------------------------------------------------------------|----------------------------------------|
| [`UX_Deliverables/prototype/quick_list.html`](../UX_Deliverables/prototype/quick_list.html)       | The prototype implementation           |
| [`UX_Deliverables/add_contract_service_design_guidelines.md`](./add_contract_service_design_guidelines.md) | Add-record form companion guideline     |
| [`UX_Deliverables/advance_contract_service_design_guidelines.md`](./advance_contract_service_design_guidelines.md) | Records list parent guideline           |
| [`business/Advance Quick List Page Revamp.doc`](../business/Advance%20Quick%20List%20Page%20Revamp.doc) | Source business requirements (visual brief) |

---

*Generated for the Quick List page — companion to `advance_contract_service_design_guidelines.md` and `add_contract_service_design_guidelines.md`.*
