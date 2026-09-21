# Information Architecture — DocProcess Stage 3 & Stage 5 Dashboard

**Version**: 1.0 · **Date**: 06 July 2026
**Scope**: Notice IQ · DocProcess Organisation — dashboards, master table drill-through, side panes, related pages already present in the prototype (`UX_Deliverables/prototype/`).
**Companion documents**: [01_UX_Brief.md](01_UX_Brief.md), [02_UX_Strategy.md](02_UX_Strategy.md), [04_User_Journeys.md](04_User_Journeys.md)

---

## 1. Sitemap (Web)

Reflects the current sidebar in `stage3-dashboard.html`, `stage5-dashboard.html`, `stage3-5-dashboard.html` and companion pages.

```
Notice IQ · DocProcess Organisation
├── Home                                            [index.html]
├── My Workflow                                     [my-workflow.html]
├── Approval Queue                                  [approval-queue.html]
├── Reports
│   └── Stage 3 & 5 Dashboard                       [stage3-5-dashboard.html]  ← primary
│       ├── Scope tab · Both stages                 (default landing)
│       ├── Scope tab · Stage 3 only                → stage3-dashboard.html
│       └── Scope tab · Stage 5 only                → stage5-dashboard.html
├── QA Review                                       [qa-review.html]
└── Notice Processing                               [stage5_challenge_docprocessor.html]
```

Deep-linkable regions inside each dashboard route:

```
[stage3-5-dashboard.html]
├── #top                (title row + scope tabs + filters)
├── #kpis               (KPI strip — Total / Green / Amber / Red)
├── #daily-volume       (Daily case volume — stage stack line chart)
├── #stage-compare      (Stage comparison at a glance strip)
├── #rag-trio           (Bot decision RAG — Combined + Stage 3 + Stage 5)
├── #letter-amendment   (Letter amendment donut)
├── #top-agents         (Top agents — cases by RAG)
├── #heatmap            (Activity heatmap)
├── #top-codes          (Top contravention codes — ranked list)
│   └── #pane-contra    (Side pane: All contravention codes)
├── #amber-reasons      (Amber reasons — combined, ranked)
├── #volume-share       (Volume share by stage donut)
└── #case-table         (Case-level records master table)
    ├── #db-active-filters   (active filter chip strip)
    ├── #global-search       (300 px search + filter icon + columns icon)
    ├── #column-menu-*       (per-column MUI-style kebab menu)
    └── #db-pagination
```

Side pane is a modal-adjacent surface, positioned right, with backdrop dim. It **does not** change the URL — it's stateful in the current view only.

---

## 2. Navigation Model

### 2.1 Primary navigation (persistent left sidebar)

| Item | Icon | Route | Notes |
|---|---|---|---|
| Home | Home | `index.html` | Landing page with links to all dashboards + tools |
| My Workflow | Kanban | `my-workflow.html` | Agent-scoped queue |
| Approval Queue | Check-square | `approval-queue.html` | Cross-team approvals |
| Reports | Bar-chart | (group) | Expandable — shows sub-nav |
|   └ Stage 3 & 5 Dashboard | — | `stage3-5-dashboard.html` | Only sub-item under Reports (per user request) |
| QA Review | Message | `qa-review.html` | QA team workspace |
| Notice Processing | File-text | `stage5_challenge_docprocessor.html` | Challenge docprocessor workspace |

Reports is a group heading (non-navigable); the sub-nav promotes the combined dashboard as the canonical entry, while single-stage views are reached via the top scope tabs on the dashboard itself.

### 2.2 Secondary navigation (in-page scope tabs)

On each dashboard route, a horizontal segment control at the top of the page swaps between the three views without leaving the Reports section:

```
[ Both stages ] [ Stage 3 only ] [ Stage 5 only ]
```

Chosen tab is styled `.active` with `aria-selected="true"`; other tabs navigate on click via `onclick="location.href='…'"`.

### 2.3 Tertiary navigation (in-widget drill-throughs)

Every RAG chip, ranked-list row, donut arc, stack-bar segment, side-pane row, KPI drill link and gauge legend clickable region carries `data-filter-col` (or `data-filter-cols` for multi-column) attributes. Clicking:

1. Sets the target `data-col-filter` inputs in the master table.
2. Dispatches `input` and `change` events so `initTableFilters()` re-evaluates row visibility.
3. Renders a chip in `.db-active-filters`.
4. Closes any open side pane.
5. Smooth-scrolls `#case-table` into view.

### 2.4 Utility navigation (header)

The `.m-header` contains:
- Acme brand logo (left)
- Global PCN search (`Search with PCN number or VRM`)
- Notifications bell with badge
- User menu (avatar + name + chevron)

Reserved for cross-app functionality — unrelated to dashboard-specific filters.

---

## 3. Role-based access matrix

Access decisions inherit Notice IQ permissioning (BRD A-02, D-07). The matrix below is UX-facing (what should be visible / actionable per role) and needs to be validated against the platform's actual permission catalogue.

| Element | Ops Manager | Template Governance (Nat/Zain) | QA Lead | Processing Agent | Product (Shelley) | Notice IQ Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Reports → Stage 3 & 5 Dashboard | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Scope tab: Both stages | ✔ | ✔ | ✔ | ✔ (own) | ✔ | ✔ |
| Scope tab: Stage 3 only | ✔ | ✔ | ✔ | ✔ (own) | ✔ | ✔ |
| Scope tab: Stage 5 only | ✔ | ✔ | ○ (view only) | ✔ (own) | ✔ | ✔ |
| KPI strip (Total / G / A / R) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Custom Mitigation column (in master table) | ✔ view | ✔ **primary** | ✔ view | ✔ (own) | ✔ view | ✔ |
| QA Status / QA Name columns (Stage 3) | ✔ view | ○ | ✔ **primary** | ✔ (own) | ✔ view | ✔ |
| QA Status / QA Name columns (Stage 5) | — | — | — | — | — | — |
| Widget click → filter master table | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Column visibility menu | ✔ | ✔ | ✔ | ○ (defaults) | ✔ | ✔ |
| Column kebab menu (Sort / Filter / Hide) | ✔ | ✔ | ✔ | ○ (defaults) | ✔ | ✔ |
| More filters (Amber reason, Mitigation status, …) | ✔ | ✔ | ✔ | ○ | ✔ | ✔ |
| Side pane · All contravention codes | ✔ | ✔ | ✔ | ○ | ✔ | ✔ |
| Export CSV (Phase 2) | ✔ | ✔ | ✔ | ○ (own) | ✔ | ✔ |
| Save filter presets (Phase 2) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Change access / roles | — | — | — | — | ○ (request) | ✔ |
| See other agents' PCN data | ✔ | ✔ | ✔ | ○ (own agent only) | ✔ | ✔ |

Legend: ✔ full access · ○ partial / read-only · — hidden

**Column-visibility defaults per role** (Phase 1 recommendation):

| Role | Default hidden columns |
|---|---|
| Ops Manager | (none — full view) |
| Template Governance | QA Status, QA Name |
| QA Lead | Custom / Selected Mitigation (still available via kebab → show) |
| Processing Agent | QA Status, QA Name; Client (unless multi-client agent) |
| Product | (none) |

Users can restore any hidden column via the toolbar's Columns menu.

---

## 4. Content model

### 4.1 Case record (row in the master table — 13 fields)

| # | Field | Type | Source | Filter type | Notes |
|---|---|---|---|---|---|
| 0 | Stage | Chip (Stage 3 / Stage 5) | Stage 3/5 workflow | Select | Colour-coded chip `s3` / `s5` |
| 1 | Client | Text | Contract mapping | Select | May be redundant vs Contract post-launch (Interview 02 §2) |
| 2 | Agent | Text | Case handler | Search text | |
| 3 | PCN number | Text | PCN system | Search text | Format `WO########` |
| 4 | Contravention | Text (code — description) | PCN system | Select (code) | Sort numeric |
| 5 | Mitigation | Chip / text (missing) | Bot / template | Search text | `.mit-cell` for template match; `.chip missing` for gap |
| 6 | Bot decision | Chip (Green / Amber / Red) | Bot | Select | RAG chip with dot |
| 7 | Amber reason | `.ar-cell` with primary + more | Bot | Select | Multi-value; shows primary + `+N` badge |
| 8 | Letter | Chip (No amendment / Amended) | Letter workflow | Select | |
| 9 | Custom / Selected Mitigation | `.cs-mit-stack` (template + custom text) | Agent | Search text | Shows both selected template and custom free text |
| 10 | QA Status | Chip (Passed / Failed / Not reviewed) | QA workflow | Select | Stage 5 rows render `—` |
| 11 | QA Name | Text | QA workflow (ANPS) | Search text | Availability pending (Interview 02 #14); Stage 5 rows `—` |
| 12 | Reviewed | Date-time | Case timeline | Search text (date) | Sort as date |

### 4.2 Ranked list item (Amber reasons / Top contravention codes)

- Rank (1..N, "top" style on #1)
- Name (primary label)
- Meta (optional — e.g., `CODE 12`)
- Stage badge (S3 / S5) on the combined view where applicable
- Bar (percentage of the max)
- Count (integer)
- Percent (of total)

### 4.3 Active filter chip

- Column label (`af-col`) : Value (`af-val`) × (remove)
- Rendered live from every `[data-col-filter]` input's current value.
- Multi-column widget clicks produce one chip per column.

### 4.4 Side pane

- Header: title + meta + Close button
- Body: table with rank badge, code, description, S3 count, S5 count, Total.
- Row click: `data-filter-col="4"` sets the Contravention column filter and scrolls to the master table.

---

## 5. Navigational patterns

### 5.1 Widget → Table (click-to-filter + scroll)

```
[User clicks any widget element with data-filter-col*]
      │
      ▼
initWidgetFilters() activate handler:
  1. Read data-filter-col(s) + data-filter-val(s)
  2. For each pair, find target [data-col-filter="N"] input
  3. Set value + dispatch input & change events
  4. Close any open side pane
  5. Smooth-scroll #case-table into view
      │
      ▼
[Table re-renders with filters + active-filter chips]
```

### 5.2 Side pane → Table (row click)

```
[User opens "View all contravention codes" side pane]
      │
      ▼
[User clicks a row in .sp-table]
      │
      ▼
Same activate handler:
  1. Set contravention filter to that row's code
  2. Close pane (via activate handler closePane)
  3. Scroll to master table
```

### 5.3 Column kebab menu → Sort / Filter / Hide

```
[User hovers a column header]
      │
      ▼
[Kebab (⋮) fades in]
      │
      ▼
[User clicks kebab] → floating .th-col-menu opens
      │
      ├─ Sort by ASC / DESC / Unsort → applies via .th-sort button
      ├─ Filter by [Column]
      │     ├─ Operator select (text cols): Contains, Equals, Starts, Ends, Empty, Not empty
      │     ├─ Value select (enum cols)
      │     ├─ Value input (text cols, disabled when Empty/Not empty selected)
      │     └─ Clear
      └─ Hide column → sets display:none on all cells at that index; toolbar Columns menu checkbox unchecked
```

### 5.4 More filters (top of page)

```
[Default view] Date from · Date to · Contract · Agent · PCN · Bot decision
[+ More] revealed on click: Amber reason · Mitigation status · Amendment status · Contravention code · Custom mitigation
[− Less] hides them again
```

---

## 6. Mobile / responsive strategy

The dashboard is desktop-first (Notice IQ hosting environment). Two documented breakpoints in `dashboard.css`:

- **≥ 1101 px** — 12-column widget grid, sidebar visible, full table row, all filter chips inline.
- **901 – 1100 px** — 12-column grid collapses to single column per widget (`.widget.span-4/6/8/12` all become `span-12`). Sidebar remains, table scrolls horizontally.
- **≤ 900 px** — `.rag-trio` grid collapses to single column. `.side-pane` covers 94vw. Recommended for tablets only.

### Future mobile companion (Phase 4)

A read-only mobile app (or PWA) with:

**Mobile sitemap** (proposed)

```
Home
├── Today at a glance          (KPI strip only)
├── Cases
│   ├── Search PCN             (global search full-screen)
│   ├── Recently reviewed      (server-side sorted list)
│   └── Case detail            (single PCN, all 13 fields as cards)
├── Reports
│   ├── Trend (daily volume)
│   ├── RAG breakdown          (donut)
│   └── Top contravention codes (ranked list)
└── Settings
    ├── Notifications
    └── Sign out
```

**Mobile navigation model**

- Bottom tab bar: Home · Cases · Reports · Settings.
- Header: title + hamburger (Filter chips) + search icon.
- Cases list uses infinite scroll; case-detail is a full-screen sheet with swipe-back.

**Mobile role-based access**

Read-only for all roles at launch. Editing (mark for template review, QA sign-off) reserved for desktop until Phase 4 stabilises.

---

## 7. Interaction accessibility

- Every `.th-sort` button carries `aria-sort="none | ascending | descending"`.
- Every `.th-menu` kebab carries `aria-haspopup="true"` and `aria-expanded="true/false"`.
- Every SVG donut segment (`.pie-svg .seg[data-filter-col*]`) has `pointer-events: stroke` and (implicitly via `initWidgetFilters`) `role="button"` + `tabindex="0"`.
- Every widget-click target has `:focus-visible` outline in brand blue; `:focus` outline suppressed to avoid the black square on mouse click.
- Side pane traps focus while open (via `.sp-close` receiving focus on open; Escape closes).
- The active-filter strip announces changes via `role="status"` `aria-live="polite"`.
- The columns dropdown supports Escape to close; outside click also closes.

---

## 8. URL & state model

Currently the prototype uses hash IDs (`#case-table`) for scroll targets. When integrated into Notice IQ, recommended URL scheme:

```
/summarisation/reports/s3s5?scope={both|stage3|stage5}
                          &date_from=YYYY-MM-DD
                          &date_to=YYYY-MM-DD
                          &contract={id}
                          &agent={name}
                          &pcn={id}
                          &bot={green|amber|red}
                          &f.col{N}={value}
                          &f.op{N}={contains|equals|starts|ends|empty|notempty}
                          &sort={N}.{asc|desc}
                          &cols={hidden:N,N,N}
                          &q={global-search-text}
```

Filters and sort state should serialise into query string on user action so links can be shared ("here's the Red Camden cases from last week").
