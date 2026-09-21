# Figma Design Guidelines — Web Application: Dashboard Page

> **Source Figma Frames**: [node-id=25922-35222](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=25922-35222&t=vWLgMCyaOdh6XNih-4) · [node-id=25861-93437](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=25861-93437&m=dev)
> **Frame Name**: DashBorad-New
> **Platform**: Web Application (Desktop)
> **Design System**: MET-DS-V2 (React + MUI v5)
> **Prototype**: `UX_Deliverables/prototype/web/dashboard.html`
> **Updated**: 2026-04-21

---

## 1. Layout & Grid

| Region | Dimensions | Notes |
|---|---|---|
| **Overall frame** | 1512 × 2581 px | Full scrollable dashboard (desktop) |
| **Left sidebar** | 68 px wide, full height | Collapsed icon-only nav; bg `#FFFFFF` |
| **Top app bar** | Full width × 60 px | Hamburger, logo, search, clipboard, notifications, avatar |
| **Content area** | calc(100% − 68px) × remaining | Background `var(--color-bg)` / `#F2F5FA` |
| **Content padding** | 16px horizontal, 12px top | `--space-5` / `--space-4` |

### CSS Grid

```css
.app-shell {
  display: grid;
  grid-template-columns: 68px 1fr;
  grid-template-rows: 60px 1fr;
  min-height: 100vh;
}
```

### Page Structure (Full Scroll)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Top App Bar (60px) — Hamburger │ Logo │ Search │ Clipboard │ Notif │ AD│
├──────┬───────────────────────────────────────────────────────────────────┤
│ Side │  "Dashboard" heading + [Live Data chip] + [REFRESH btn] + [CONFIGURE btn] │
│ bar  │  ┌───────────────────────────────────────────────────────────────────────┐   │
│(68px)│  │ Filter Bar: Client | Workstream | SLA Deadline | APPLY               │   │
│      │  ├───────────────────────────────────────────────────────────────────────┤   │
│  🏠  │  │ KPI Grid (single container, 4-col):                                  │   │
│  📅  │  │   Staff Working │ SLA Performance │ Jobs Outcome │ Visit Counter      │   │
│  👥  │  │   Avg Completion │ Avg Duration │ Vehicle Check │ Metering SLA       │   │
│  ── │  │   (cards reflow when toggled via Configure Widgets)                  │   │
│  💼  │  ├──────────────────────────────────────┬────────────────────────────────┤   │
│  ✅  │  │ Donut Grid (2×2, 2/3 width):         │ BWV Compliance (stacked)      │   │
│  ⏰  │  │  Staff Dist. │ Jobs at Risk           │ Jeopardy View                │   │
│  🔧  │  │  Total Tasks │ Task SLA Risk          │ (1/3 right column)           │   │
│  📄  │  ├──────────────────────────────────────┴────────────────────────────────┤   │
│  📍  │  │ SLA Deadlines Table (full width, col-span 2, top 5 records)          │   │
│  ── │  ├────────────────────────────┬──────────────────────────────────────────┤   │
│  ⚙️  │  │ Jobs Visited per Client   │ Job Holdings / Agent                     │   │
│  📊  │  │ (1/2 left, equal height)  │ (1/2 right, bar chart, equal height)    │   │
│  ── │  ├────────────────────────────┴──────────────────────────────────────────┤   │
│  ❓  │  │ Current Agent Locations (map + agent/job overlay cards)               │   │
│  🎧  │  └───────────────────────────────────────────────────────────────────────┘   │
└──────┴─────────────────────────────────────────────────────────────────┘
```

---

## 2. Dashboard Header

| Element | Specification |
|---|---|
| **Title** | "Dashboard" — `font-size: 24px`, `font-weight: 600`, `color: #212121` |
| **Live Data chip** | Green badge with pulsing dot: bg `var(--color-success-bg)`, text `var(--color-success-dark)`, `border-radius: 100px` |
| **REFRESH button** | Outlined button with refresh icon: `border: 1.5px solid #E0E0E0`, height 30px |
| **CONFIGURE button** | Outlined button with `widgets` icon: same styling as REFRESH, opens widget config panel |

---

## 3. Filter Bar

White card with `border-radius: 8px`, `box-shadow: var(--shadow-card)`, `padding: 16px`.

| Filter | Type | Default |
|---|---|---|
| Client | `<select>` dropdown | "All client" |
| Workstream | `<select>` dropdown | "All Workstream" |
| SLA Deadline | `<input type="date">` | Empty |
| Apply button | Primary button | "APPLY FILTER", bg `var(--color-primary)`, white text, height 40px |

All inputs: `height: 40px`, `border: 1.5px solid #E0E0E0`, `border-radius: 8px`.

---

## 4. KPI Cards (8 cards, single grid container)

Layout: `grid-template-columns: repeat(4, 1fr)`, gap `24px`. All 8 cards in **one** `.stats-grid` container. Cards reflow automatically when hidden via the Configure Widgets panel. Each card has a `data-widget` attribute for individual show/hide.

### Row 1

| Card | Value | Sub-detail | Icon |
|---|---|---|---|
| Staff Working vs Available | `42 / 58` | Chips: "42 Active" (green), "16 Inactive" (red) | `people` |
| SLA Performance | `92%` | Progress bar (green, 92%), "Target: 95%" | `trending_up` |
| Jobs Outcome | `312 / 47` | Chips: "Successful" (green), "Unsuccessful" (red) | `check_circle_outline` |
| Visit Counter | `1,248` | "Total visits this period" | `place` |

### Row 2

| Card | Value | Sub-detail | Icon |
|---|---|---|---|
| Avg Job Completion / Engineer | `6.4` | "Jobs per day" | `engineering` |
| Avg Job Duration / Engineer | `47 min` | "Average per job" | `schedule` |
| Vehicle Check Adherence | `78%` | Progress bar (orange, 78%), "Target: 100%" | `directions_car` |
| Metering SLA Performance | `68%` | Progress bar (red, 68%), "Target: 90%" | `trending_up` |

### Card Styling

- Background: `var(--color-card)` / `#FFFFFF`
- Border: `1px solid #E0E0E0`
- Border-radius: `8px`
- Box-shadow: `0 1px 4px rgba(50,118,207,0.10)`
- Padding: `16px`
- Min-height: `134px`
- Label: `12px`, `500 weight`, `#757575`, `uppercase`
- Value: `28px`, `700 weight`, `#212121`

### Progress Bar Colours

| Colour | Use case | Token |
|---|---|---|
| Green `#43A047` | >= target or good performance | `var(--color-success)` |
| Orange `#FB8C00` | Below target but not critical | `var(--orange-600)` |
| Red `#E53935` | Critical / well below target | `var(--color-error)` |

---

## 5. Donut Chart Section — Merged Rows 3–4 (2/3 + 1/3 split)

Layout: Single `content-row` with `grid-template-columns: 2fr 1fr` and `grid-template-rows: auto auto`.

### Left Column — 2×2 Donut Grid (`two-col-donuts`, `grid-row: 1/3`)

All 4 donut cards in a `grid-template-columns: 1fr 1fr` sub-grid.

#### Donut Card Structure

```html
<div class="donut-card" data-widget="{id}">
  <div class="donut-desc">{Card Title}</div>        <!-- Acts as card heading -->
  <div class="donut-card-body">                      <!-- Horizontal flex -->
    <div class="donut-wrap">...</div>                <!-- 120×120 SVG donut -->
    <div class="donut-info">                          <!-- Flex row -->
      <div>                                           <!-- Subtitle + value -->
        <div class="donut-title">{Subtitle}</div>     <!-- Caption style -->
        <span>{Value}</span>
      </div>
      <div class="legend">...</div>                  <!-- Legend right -->
    </div>
  </div>
</div>
```

| Donut | Center Value | Segments |
|---|---|---|
| **Staff Distribution by Scheduling Tool** | 204/273 | Auto Optimizer 17% (green), Manual Planning 30% (blue), Warrant Runs 53% (orange) |
| **Jobs at Risk by SLA Status** | 273 Total Jobs | Approaching SLA 53% (orange), Due Today 30% (green), Past SLA 17% (red) |
| **Total Tasks** | 273 | Completed 53% (green), Reassigned 30% (blue), Prioritised 17% (orange) |
| **Task SLA Risk** | 100 | Approaching SLA 53% (orange), Inside SLA 30% (green), Past SLA 17% (red) |

### Right Column — BWV Compliance + Jeopardy View (stacked, `grid-row: 1/3`)

Container: `display: flex; flex-direction: column; gap: var(--space-5)`

#### BWV Compliance (`section-card`, `data-widget="bwv-compliance"`)

- Centred donut: 100×100px with **80%** text overlay
- SVG: `transform: rotate(-90deg)` for top-start arc
- Legend (horizontal, right of donut): Used **71%** (green), Not Used **29%** (red)
- 2 legend items only

#### Jeopardy View (`section-card`, `data-widget="jeopardy-view"`)

- Small donut (80×80px): **273** Total Jobs
- Segments: No Risk 70% (green), Approaching Risk 10% (orange), At Risk 20% (red)
- Table below: Job ID (link), Risk Reason, coloured dot indicator
- "VIEW MORE" link action (top right)
- 7 table rows (J1001–J1007)

---

## 7. SLA Deadlines Table

Full-width section card with `grid-column: span 2` inside the donut content-row. Header: "SLA Deadlines" + "(Top 5 records)" subtitle + "VIEW MORE" link.
`data-widget="sla-deadlines"`

| Column | Width | Content |
|---|---|---|
| Job ID | 150px | Blue link text |
| SLA Deadline | 180px | DateTime string |
| Assigned Agent | 220px | `#123456 - Name` format |
| Time Remaining / Overdue Duration | flex | e.g. "07:00 Hours Left" |
| Status | 125px | Pill chip |

### Status Chip Variants

| Status | Background | Text | Border |
|---|---|---|---|
| At Risk | `#FEEBEE` | `#D32F2F` | `#E53935` |
| Overdue | `#FFF8E1` | `#E65100` | `#FB8C00` |
| In Progress | `#F2F5FA` | `#275798` | `#3276CF` |
| Not Started | `#F5F5F5` | `#616161` | `#E0E0E0` |

### Table Styling

- Header: bg `#F5F5F5`, text `12px 500 #757575`, border-bottom `2px solid #EEEEEE`
- Cells: padding `12px`, font `14px`, border-bottom `1px solid #EEEEEE`
- Row hover: bg `#F5F5F5`

---

## 8. Jobs Visited per Client

50/50 split with Job Holdings (`content-row-equal`, `align-items: stretch`). Both cards use `display: flex; flex-direction: column` for equal height. Section card with "EXPORT" outlined button.
`data-widget="jobs-visited"`

| Column | Content |
|---|---|
| Client | Blue link text |
| Workstream | Plain text (Motor, Metering, Field) |
| Visited | Numeric |
| Pending | Numeric |
| Total | Numeric |

---

## 9. Job Holdings / Agent

Horizontal bar chart with two dropdown filters: "By Priority" / "By Status" and agent selector.
`data-widget="job-holdings"`

- Agent info line: `#123456 - Name · Total Jobs: N`
- Bars: Labels (LS, PS, L, BD, HG), coloured fills
- Bar colours: Red (LS), Orange (PS), Green (L), Blue (BD, HG)
- Bar height: `16px`, `border-radius: 4px`

---

## 10. Current Agent Locations (Map)

Full-width section card. Embedded OpenStreetMap iframe (500px height).
`data-widget="agent-locations"`

### Overlay Elements

| Element | Position | Content |
|---|---|---|
| **Live Tracking badge** | Top-right | Green pill: `bg: #43A047`, white text, "Live Tracking" |
| **Agent Info Card** | Bottom-left | 520px wide, modal shadow, avatar + name + email + phone + metadata grid |
| **Job Info Card** | Bottom-right | 280px wide, Job ID + "Hi Priority" chip + title + customer + address + "VIEW JOB" |

### Agent Card Metadata Grid

```
Group: Metering          Region: Region 1
Working Hours: 08:00-18:00 (Monday to Friday)
Skill Set: Meter Engineer · Locksmith · Warrant Officer
```

---

## 11. Configure Widgets Panel

Dropdown panel triggered by the CONFIGURE button in the dashboard header. Allows users to show/hide individual dashboard widgets.

### Panel Structure

- **Position**: Absolute, top-right aligned below the button
- **Width**: 300px
- **Background**: `var(--color-card)`, border `var(--border-default)`, radius `var(--radius-card)`
- **Shadow**: `0 8px 24px rgba(0,0,0,.14)`
- **Max body height**: 360px with `overflow-y: auto`

### Widget Checkboxes (18 items)

| data-widget ID | Label |
|---|---|
| `staff-working` | Staff Working vs Available |
| `sla-performance` | SLA Performance |
| `jobs-outcome` | Jobs Outcome |
| `visit-counter` | Visit Counter |
| `avg-job-completion` | Avg Job Completion / Engineer |
| `avg-job-duration` | Avg Job Duration / Engineer |
| `vehicle-check` | Vehicle Check Adherence |
| `metering-sla` | Metering SLA Performance |
| `staff-distribution` | Staff Distribution by Scheduling Tool |
| `jobs-at-risk` | Jobs at Risk by SLA Status |
| `total-tasks` | Total Tasks |
| `task-sla-risk` | Task SLA risk |
| `sla-deadlines` | SLA Deadlines |
| `jobs-visited` | Jobs Visited per Client |
| `job-holdings` | Job Holdings / Agent |
| `agent-locations` | Current Agent Locations |
| `bwv-compliance` | BWV Compliance |
| `jeopardy-view` | Jeopardy View |

### Behaviour

- **APPLY**: Adds/removes `.widget-hidden` (`display: none`) on `[data-widget]` elements
- **RESET**: Checks all checkboxes and shows all widgets
- **Close**: Click outside or close × button
- **Accessibility**: `aria-expanded` on trigger, `role="dialog"` on panel, `aria-controls`

---

## 12. Typography Scale

| Token | Size | Weight | Use |
|---|---|---|---|
| H1 | 24px | 600 | Page title "Dashboard" |
| H2 | 20px | 600 | Not used on this page |
| Body1 | 16px | 600 | Donut titles, agent name |
| Body | 14px | 400-500 | Table cells, section titles |
| Caption | 12px | 400-500 | Labels, legends, sub-text, KPI labels |

---

## 13. Colour Palette (CSS Variables Only)

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#3276CF` | Buttons, links, active nav, chart segment |
| `--color-bg` | `#F2F5FA` | Page background |
| `--color-card` | `#FFFFFF` | Card backgrounds |
| `--text-primary` | `#212121` | Headings, values |
| `--text-secondary` | `#757575` | Labels, captions |
| `--color-success` | `#43A047` | Green bars, chips, chart segments |
| `--color-error` | `#E53935` | Red bars, chips, at-risk indicators |
| `--orange-600` | `#FB8C00` | Orange bars, approaching-SLA segments |
| `--grey-300` | `#E0E0E0` | Borders, dividers |

---

## 14. Spacing & Sizing Rules

- **8pt grid**: 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48px
- **Card gap (KPI)**: 24px (`--space-7`)
- **Section gap**: 16px (`--space-5`)
- **Card padding**: 16px (`--space-5`)
- **Card border-radius**: 8px (`--radius-card`)
- **Pill border-radius**: 100px (`--radius-pill`)
- **Button border-radius**: 8px (`--radius-button`)
- **Input border-radius**: 8px (`--radius-input`)

---

## 15. Accessibility Requirements (WCAG 2.2 AA)

| Requirement | Implementation |
|---|---|
| Skip link | "Skip to main content" — hidden until focus |
| Focus indicators | `outline: 2px solid #3276CF`, offset 2px |
| Landmark roles | `banner`, `navigation`, `main`, `search` |
| ARIA labels | All icon-only buttons, nav items, tables, filter controls |
| `aria-current="page"` | Active sidebar link |
| Table headers | `<th scope="col">` on all columns |
| Chart alternatives | `aria-hidden="true"` on SVGs; text legends provide data |
| Colour contrast | All text meets 4.5:1 ratio; status chips use border + text (not colour alone) |
| Reduced motion | `@media (prefers-reduced-motion)` disables animations |

---

## 16. MUI v5 Handoff Annotations

| HTML Element | MUI Component | Props |
|---|---|---|
| `.stat-card` | `<Card>` | `elevation={0}`, `sx={{ border: '1px solid', borderColor: 'grey.300' }}` |
| `.btn-primary` | `<Button>` | `variant="contained"`, `disableElevation` |
| `.btn-outline` | `<Button>` | `variant="outlined"` |
| `.filter-select` | `<TextField>` | `variant="outlined"`, `select` |
| `.filter-date` | `<TextField>` | `variant="outlined"`, `type="date"` |
| `.data-table` | `<Table>` | `size="small"` |
| `.chip-status` | `<Chip>` | `size="small"`, `variant="outlined"` |
| `.chip-sm` | `<Chip>` | `size="small"` |
| `.icon-btn` | `<IconButton>` | — |
| `.user-avatar` | `<Avatar>` | `sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}` |

---

## 17. Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| **≤ 1279px** | KPI grid → 2 columns; content rows → single column; donut pairs stack |
| **≤ 1023px** | Sidebar hidden; KPI grid → 1 column; filter card wraps |

