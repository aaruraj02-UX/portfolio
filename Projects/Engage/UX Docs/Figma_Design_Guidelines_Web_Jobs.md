# Figma Design Guidelines — Web Jobs List Page

> **Source frame**: FieldSync — Field App · Figma node `8351-90558`
> **Prototype**: `UX_Deliverables/prototype/web/jobs.html`
> **Design system**: MET-DS-V2 (tokens in `skills/uiux/design-system-tokens.instructions.md`)
> **Viewport**: 1440 px desktop · 68 px collapsed sidebar · 60 px top bar

---

## 1. Page-Level Layout

| Zone | CSS Grid Placement | Dimensions |
|---|---|---|
| **App Shell** | `grid-template-columns: 68px 1fr; grid-template-rows: 60px 1fr;` | Fills viewport |
| **Top App Bar** | `grid-column: 1 / -1; grid-row: 1;` | 60 px height, sticky top |
| **Left Sidebar** | `grid-column: 1; grid-row: 2;` | 68 px wide, icon-only, sticky |
| **Main Content** | `grid-column: 2; grid-row: 2;` | Flex column, `padding: 12px 16px` |

### Content Stack (top → bottom)

1. **Page Header** — count chip + title + dropdown + export button
2. **Stats Cards Row** — 3 cards (status donut, SLA donut, wide metrics)
3. **Search + Tabs Bar** — inline search (inside table toolbar) + FILTERS button
4. **Job Data Table** — checkbox, columns, pagination

---

## 2. Top App Bar (60 px)

Identical to the Tasks page — see `Figma_Design_Guidelines_Web_Tasks.md` §2.

| Element | Spec |
|---|---|
| Height | 60 px |
| Background | `var(--color-card)` `#FFFFFF` |
| Border bottom | `1px solid #E0E0E0` |
| Logo | `img/Engage-logo.png`, height 35 px |
| Global search | max-width 585 px, height 40 px, bg `#FAFAFA`, border 1.5 px `#E0E0E0`, radius 8 px |
| Search placeholder | `"Search Keywords : Agent ID, Agent Name, Job ID, User, Client Name..."` |
| Icon buttons | 40×40 px, `border-radius: 50%`, icons: `content_paste`, `notifications_none` |
| User avatar | 32×32 px circle, bg `var(--color-primary)`, initials `AD` |

---

## 3. Left Sidebar (68 px collapsed)

Same navigation structure as Tasks page with **Jobs as active item**.

| # | Icon | Label | Link |
|---|---|---|---|
| 1 | `dashboard` | Dashboard | — |
| 2 | `calendar_today` | Calendar | — |
| 3 | `people_outline` | People | — |
| — | **divider** | | |
| 4 | `work_outline` | **Jobs (active)** | `jobs.html` |
| 5 | `task_alt` | Tasks | `tasks.html` |
| 6 | `schedule` | Timesheets | — |
| 7 | `build_circle` | Tools | — |
| 8 | `receipt_long` | Invoices | — |
| 9 | `location_on` | Locations | — |
| — | **divider** | | |
| 10 | `settings` | Configuration | — |
| 11 | `bar_chart` | Reports | — |
| — | **divider** | | |
| 12 | `help_outline` | Help | — |
| 13 | `support_agent` | Support | — |

### Active Nav Item
- Icon colour: `var(--color-primary)` `#3276CF`
- Background: `var(--color-primary-25)` `#F2F5FA`
- Left indicator: 3 px solid `var(--color-primary)`, `border-radius: 0 2px 2px 0`

### Nav Item Dimensions
- Size: 44×44 px
- Border radius: 8 px
- Icon size: 24 px (Material Icons Outlined)
- Hover: icon `#3276CF`, bg `#F2F5FA`

---

## 4. Page Header

| Element | Spec |
|---|---|
| Count chip | `min-width: 45px`, height 27 px, `border-radius: 100px`, bg `var(--color-primary)`, colour `#FFFFFF`, font 12 px medium |
| Page title | `"Job(s)"`, 24 px semibold, colour `var(--text-primary)` |
| Business area dropdown | height 42 px, min-width 117 px, border 1.5 px `#E0E0E0`, radius 8 px, default `"Metering"` |
| Export button | height 30 px, bg `var(--color-primary)`, icon `download` 18 px + label `"EXPORT"`, radius 8 px |

---

## 5. Stats Cards Row

Three cards in a horizontal flex row, gap 24 px, `margin-bottom: 16px`.

### Card 1 — Status Donut (368 px wide)
- **Donut chart**: 84×84 px SVG, 4 segments
  - Completed: `var(--color-success)` `#43A047` — 40%
  - In Progress: `var(--orange-600)` `#FB8C00` — 30%
  - Not Started: `var(--grey-400)` `#BDBDBD` — 20%
  - Cancelled: `var(--color-error)` `#E53935` — 10%
- **Center**: total count (18 px bold) + label "Total" (10 px)
- **Legend**: colour dot (10×5 px rounded) + name + percentage

### Card 2 — SLA / Jobs at Risk Donut (384 px wide)
- **Donut chart**: 84×84 px SVG, 3 segments
  - Inside SLA: `var(--color-success)` — 50%
  - Approaching SLA: `var(--orange-600)` — 30%
  - Past SLA: `var(--color-error)` — 20%
- **Title**: "Jobs at Risk"

### Card 3 — Wide Metric Columns (flex: 1)
- 5 metric columns, separated by `1px solid #EEEEEE`
- Columns: **Total Jobs** (186) | **Not Started** (37) | **In Progress** (56) | **Completed** (74) | **At Risk** (19)
- Value: 20 px semibold · Label: 12 px caption

---

## 6. Table Toolbar (Search + Filters)

Toolbar sits above the data table with rounded top corners, white background, and border on top/left/right.

| Element | Spec |
|---|---|
| Background | `var(--color-card)` `#FFFFFF` |
| Border | top + left + right `1px solid #E0E0E0`, bottom none |
| Border radius | `8px 8px 0 0` (top only) |
| Padding | `12px 16px` |
| Search input | width 240 px, height 36 px, left `search` icon 18 px, placeholder `"Search"` |
| FILTERS button | text-only button, `var(--color-primary)`, uppercase, icon `filter_list` 18 px, no border |

---

## 7. Job Data Table

All data displayed as a **flat data grid** with checkboxes, 8 columns, and pagination footer.

### Table Wrapper
| Element | Spec |
|---|---|
| Background | `var(--color-card)` `#FFFFFF` |
| Border | left + right `1px solid #E0E0E0` |

### Table Header (`thead`)
| Element | Spec |
|---|---|
| Background | `var(--color-card)` (white, not grey) |
| Font | 12 px medium (not bold), `var(--text-secondary)` grey |
| Padding | `12px 16px` per cell |
| Border bottom | `1px solid #EEEEEE` |

### Table Columns

| # | Column | Class | Width | Content |
|---|---|---|---|---|
| 1 | Checkbox | `.col-check` | 48 px | 16×16 checkbox, accent `var(--color-primary)` |
| 2 | Job ID | `.col-jobid` | 100 px | Hyperlink text `var(--text-hyperlink)` |
| 3 | Job Type | `.col-jobtype` | min 160 px | Plain text (Collection, Repossession, Warrant, etc.) |
| 4 | Client Name | `.col-client` | min 140 px | Plain text (BMW, MoneyBarn, Boost, etc.) |
| 5 | Business Area | `.col-area` | min 130 px | Plain text (Motor, Metering, Field) |
| 6 | Job Age | `.col-age` | 100 px | Plain text (New, 1 day, 2 days, 3 days, 5 days, 10days) |
| 7 | Status | `.col-status` | 130 px | Status chip (pill) — see Status Chip Colours |
| 8 | Actions | `.col-action` | 56 px | `more_vert` icon button 32×32 px |

### Table Body Rows (`tbody tr`)
| Element | Spec |
|---|---|
| Padding | `12px 16px` per cell |
| Row border | `1px solid #EEEEEE` (bottom), last row no border |
| Row hover | Background `var(--grey-50)` `#FAFAFA` |
| Cursor | `pointer` |
| Row click | Opens side panel with job details |

### Table Footer / Pagination
| Element | Spec |
|---|---|
| Background | `var(--color-card)` |
| Border | bottom + left + right `1px solid #E0E0E0`, top none |
| Border radius | `0 0 8px 8px` (bottom only) |
| Padding | `12px 16px` |
| Layout | right-aligned flex, gap 16 px |
| Rows-per-page | Dropdown select: 25, 50, 100 |
| Range label | `"1-25 of 1"` |
| Page buttons | 32 px circle, no border, icon `chevron_left` / `chevron_right` |

### Status Chip Colours

| Status | Class | Background | Border | Text Colour |
|---|---|---|---|---|
| Not Started | `.chip-status-notstarted` | `transparent` | `1px solid #9E9E9E` | `#616161` |
| InProgress | `.chip-status-inprogress` | `transparent` | `1px solid var(--color-primary)` | `var(--color-primary)` |
| Completed | `.chip-status-completed` | `#4CAF50` | none | `#FFFFFF` |
| Escalate | `.chip-status-escalate` | `var(--color-primary)` | none | `#FFFFFF` |
| Aborted | `.chip-status-aborted` | `#FF9800` | none | `#FFFFFF` |
| Declined | `.chip-status-declined` | `transparent` | `1px solid #EF5350` | `#EF5350` |

> SLA, Risk, and Priority chips are no longer used in the table view. They may still appear in the side panel.

---

## 8. View Details Side Panel (560 px)

Slides in from the right with overlay (`rgba(0,0,0,0.35)`).

### Panel Header
| Element | Spec |
|---|---|
| Title | `"Job #JOB-XXXX"`, 20 px medium |
| Chips | priority chip + risk chip + status chip (inline, gap 8 px) |
| Close button | 36×36 px circle, icon `close`, hover bg `var(--color-primary-25)` |

### SLA Banner
Full-width banner below header with SLA status.

| SLA State | Background | Text | Icon |
|---|---|---|---|
| Inside | `var(--color-success-bg)` | `var(--color-success-darker)` | `schedule` |
| Approaching | `var(--color-warning-bg)` | `var(--orange-800)` | `schedule` |
| Overdue | `var(--color-error-bg)` | `var(--color-error-deeper)` | `schedule` |

Layout: icon + "SLA Remaining" label + spacer + countdown value (bold) + SLA status chip

### Customer Details Section
2-column grid, fields:
- Organisation, Customer Name, Contact Number (tel: link), Address

### Job Details Section
2-column grid, fields:
- Visit Type, Received Date, Visit Count, Assigned To

### Attachments Section
- Header shows file count badge + Geo-Fence Enabled chip
- Rows: icon (PDF red / IMG blue, 32×32 px rounded) + file name + meta (size · date)

### Accordion Sections
Three collapsible sections with `expand_more` icon animation (180° rotate):

1. **Additional Job Details** (collapsed by default)
   - Meter Serial No., Supply Type, Access Notes, Special Instructions

2. **Third-Party Information** (collapsed by default)
   - Contractor, Reference, Contact, Liaison Status

3. **Risk & Safety Information** (expanded by default)
   - Risk Level (with risk chip), Hazard Type, PPE Required, Dog on Premises, Vulnerability Flag

### Accordion Spec
| Element | Spec |
|---|---|
| Header bg | `var(--grey-50)` `#FAFAFA` |
| Header hover bg | `var(--grey-100)` `#F5F5F5` |
| Header font | 14 px medium |
| Icon | `expand_more` 20 px, rotates 180° when expanded |
| Body padding | 16 px |
| Border | `1px solid #E0E0E0`, radius 8 px |

---

## 9. Job Data Fields

| Field | Format | Example |
|---|---|---|
| Job ID | `JOB-XXXX` | JOB-2048 |
| Job Title | Free text + address | "Meter Installation — 22 Southampton Rd, Lymington" |
| Priority | Critical / High / Medium / Low | High |
| Risk Level | High / Medium / Low | Medium Risk |
| Status | Not Started / In Progress / On Hold / Completed / Cancelled | In Progress |
| SLA State | Inside / Approaching / Overdue | Approaching |
| SLA Remaining | Duration string | "2d 5h remaining" |
| Organisation | Client company name | EDF Revenue Protection |
| Customer Name | Full name | James Jacob |
| Contact Number | Phone with tel: link | 12345 12345 |
| Address | Full street address | 22 Southampton Rd, Lymington, Hampshire |
| Visit Type | Cold Call / Emergency / Scheduled Visit / Inspection / Relocation | Cold Call |
| Received Date | DD MMM YYYY, HH:MM AM/PM | 11 Mar 2026, 10:22 AM |
| Visit Count | "X of Y" | 1 of 3 |
| Assigned To | Agent name or team name | Field Team Alpha |
| Meter Serial No. | Alphanumeric | MSN-78432-A |
| Supply Type | Single Phase / Three Phase | Single Phase |
| Hazard Type | Type name | Electrical |
| PPE Required | Comma-separated items | Insulated gloves, safety boots |
| Dog on Premises | Yes / No | No |
| Vulnerability Flag | Text or "None recorded" | None recorded |
| Geo-Fence | Enabled / Disabled | Enabled |

---

## 10. Interactions

| Interaction | Behaviour |
|---|---|
| **Card click** | Toggle expand/collapse — only one card expanded at a time |
| **View Details click** | Opens side panel with job data (prevents card toggle via `stopPropagation`) |
| **Tab click** | Filters job cards by `data-status` attribute |
| **Inline search** | 300 ms debounce, filters by text content match |
| **Panel close** | Click close button, overlay click, or Escape key |
| **Accordion toggle** | Click header to expand/collapse, icon rotates 180° |
| **Export button** | Placeholder — no action in prototype |
| **Filter button** | Placeholder — no action in prototype |

---

## 11. Accessibility

| Requirement | Implementation |
|---|---|
| Skip link | `<a href="#main-content" class="skip-link">Skip to main content</a>` |
| Landmarks | `role="banner"` (top bar), `aria-label="Main navigation"` (sidebar), `role="list"` (job list) |
| Tab navigation | `role="tablist"` with `aria-selected` toggle |
| Side panel | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Focus ring | `2px solid var(--color-primary)`, offset 2 px |
| Focus trap | Panel close on Escape key |
| Reduced motion | `prefers-reduced-motion` media query — durations → 0.01ms |
| WCAG touch targets | Minimum 44×44 px for all interactive elements |

---

## 12. Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| **> 1280 px** | Full 3-card stats row |
| **1024 – 1279 px** | Stats cards wrap; Card 1 & 2 share row, Card 3 full width |
| **< 1024 px** | Sidebar hidden, single column, panel full width |

---

## 13. Assets Referenced

| File | Purpose | Format |
|---|---|---|
| `img/Engage-logo.png` | Top bar logo | PNG |
| Material Icons Outlined | All UI icons | Google Fonts CDN |
| Roboto | Typography | Google Fonts CDN |
