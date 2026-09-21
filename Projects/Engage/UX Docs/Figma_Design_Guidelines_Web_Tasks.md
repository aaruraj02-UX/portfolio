# Figma Design Guidelines — Web Application: Tasks Page

> **Source Figma Frame**: [node-id=24743-79065](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=24743-79065&m=dev)
> **Platform**: Web Application (Desktop)
> **Design System**: MET-DS-V2
> **Prototype**: `UX_Deliverables/prototype/web/tasks.html`
> **Updated**: 2026-03-26

---

## 1. Layout & Grid

| Region | Dimensions | Notes |
|---|---|---|
| **Overall frame** | 1512 × 982 px | Desktop web viewport |
| **Left sidebar** | 68 px wide, full height | Collapsed icon-only nav; bg `#FFFFFF` |
| **Top app bar** | Full width × 60 px | Hamburger, logo, search, clipboard, notifications, avatar |
| **Content area** | calc(100% − 68px) × remaining | Background `#F2F5FA` (`--color-bg`) |
| **Content padding** | 12 px vertical, 16 px horizontal | `--space-4` / `--space-5` |

### CSS Grid

```css
.app-shell {
  display: grid;
  grid-template-columns: 68px 1fr;
  grid-template-rows: 60px 1fr;
  min-height: 100vh;
}
```

### Page Structure

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Top App Bar (60px) — Hamburger │ Logo │ Search │ Clipboard │ Notif │ AD│
├──────┬───────────────────────────────────────────────────────────────────┤
│ Side │  Content Area                                                    │
│ bar  │  ┌──────────────────────────────────────────────────────────────┐ │
│(68px)│  │ Page Header: [273] "Task(s)" │ Metering ▼ │ + ADD TASK      │ │
│      │  ├──────────────────────────────────────────────────────────────┤ │
│  🔍  │  │ Stats Cards (3): Donut-Status │ Donut-SLA │ 5-Col Metrics  │ │
│  📊  │  ├──────────────────────────────────────────────────────────────┤ │
│  📅  │  │ Search (251px) │ Tabs (right-aligned) │ Filter              │ │
│  👥  │  ├──────────────────────────────────────────────────────────────┤ │
│  ── │  │ Card-based Task List (9 rows)                               │ │
│  💼  │  │   Row 1 — Expanded (121px) with detail row                 │ │
│  ✅  │  │   Rows 2–9 — Compact (65px)                                │ │
│  ⏰  │  │                                                             │ │
│  🔧  │  │ No pagination — scroll list                                │ │
│  📄  │  └──────────────────────────────────────────────────────────────┘ │
│  📍  │                                                                  │
│  ── │                                                                  │
│  ⚙️  │                                                                  │
│  📈  │                                                                  │
│  ── │                                                                  │
│  ❓  │                                                                  │
│  🎧  │                                                                  │
└──────┴───────────────────────────────────────────────────────────────────┘
```

---

## 2. Typography

All text uses **Roboto** via Google Fonts. Icons use **Material Icons Outlined**.

| Style | Size | Weight | Line-Height | Usage |
|---|---|---|---|---|
| **H1 / Page Title** | 24 px | 600 (SemiBold) | 1.2 | Page header "Task(s)" |
| **H2 / Stats Title** | 20 px | 600 (SemiBold) | 1.3 | Donut card titles, metric values |
| **H3 / Subtitle** | 16 px | 500 (Medium) | 1.5 | Body1 text |
| **Body** | 14 px | 400 (Regular) | 1.43 | Default body text, task titles |
| **Caption** | 12 px | 400 (Regular) | 1.43 | Labels, dates, legends, nav tooltips |
| **Chip text** | 11 px | 500 (Medium) | 1.6 | Status/priority/SLA chips |
| **Tab label** | 12 px | 500 (Medium) | — | Tab buttons, uppercase, 0.5 px tracking |
| **Tab count** | 10 px | 500 (Medium) | — | Count pill inside tabs |
| **Metric value** | 20 px | 600 (SemiBold) | 1.2 | Wide card numbers |
| **Metric label** | 12 px | 400 (Regular) | 1.3 | Wide card labels |
| **Donut centre value** | 18 px | 700 (Bold) | 1 | Number inside donut |
| **Donut centre label** | 10 px | 400 (Regular) | — | "Total" / "SLA" below value |
| **Header chip** | 12 px | 500 (Medium) | — | "273" pill in page header |

---

## 3. Colour Palette

### Brand & Primary Scale

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#3276CF` | Primary brand, active states, links, header chip bg |
| `--color-primary-hover` | `#2C66B4` | Button/link hover |
| `--color-primary-25` | `#F2F5FA` | Page background, active nav bg, reassigned chip bg |
| `--color-primary-50` | `#DEE8F7` | Light info tint |
| `--color-primary-100` | `#A2C1EA` | Agent avatar bg |
| `--color-primary-200` | `#84ADE4` | Expanded card border, hover card border |
| `--color-primary-600` | `#2C66B4` | Low priority chip bg |
| `--color-primary-700` | `#275798` | Reassigned chip text, agent avatar text |

### Semantic Colours

| Token | Value | Usage |
|---|---|---|
| `--color-success` | `#43A047` | Completed status, inside SLA, donut segment |
| `--color-success-dark` | `#388E3C` | Completed chip text |
| `--color-success-bg` | `#E8F5E9` | Completed chip bg, inside SLA chip bg |
| `--color-error` | `#E53935` | Overdue SLA, escalated chip border, critical chip bg, donut segment |
| `--color-error-dark` | `#D32F2F` | Escalated chip text |
| `--color-error-bg` | `#FEEBEE` | Escalated chip bg, overdue SLA chip bg |
| `--color-warning` | `#FF9800` | Medium priority chip bg |
| `--color-warning-dark` | `#F57C00` | Approaching SLA chip text |
| `--color-warning-bg` | `#FFF3E0` | Approaching SLA chip bg |
| `--orange-600` | `#FB8C00` | Approaching SLA donut segment, donut legend |
| `--orange-800` | `#E56800` | High priority chip bg |

### Neutrals

| Token | Value | Usage |
|---|---|---|
| `--color-card` | `#FFFFFF` | Cards, sidebar, top bar bg |
| `--text-primary` | `#212121` | Primary body text |
| `--text-secondary` | `#757575` | Labels, captions, secondary text, inactive tabs |
| `--text-hyperlink` | `#3276CF` | Task ID links |
| `--grey-50` | `#FAFAFA` | Search input bg (top bar) |
| `--grey-100` | `#F5F5F5` | Assigned chip bg |
| `--grey-200` | `#EEEEEE` | Dividers, nav dividers, donut bg stroke |
| `--grey-300` | `#E0E0E0` | Default borders, input borders |
| `--grey-500` | `#9E9E9E` | Inline search icon, assigned chip dot |
| `--grey-700` | `#616161` | Assigned chip text |

---

## 4. Spacing & Grid System

Based on **8pt grid** (MUI spacing base = 4px).

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 2 px | Micro gaps, chip internal gaps, legend dot spacing |
| `--space-2` | 4 px | Button icon gaps, metric label top margin |
| `--space-3` | 8 px | Task list gap, nav item gap, legend row gap, task row cell gap |
| `--space-4` | 12 px | Sidebar padding, content vertical padding, page header gap |
| `--space-5` | 16 px | Content horizontal padding, card padding, search-tab row gap, task row horizontal padding |
| `--space-7` | 24 px | Stats row gap, detail content inter-item gap |

---

## 5. Borders & Radius

| Element | Border | Radius |
|---|---|---|
| **Cards (stats + task)** | 1 px solid `#E0E0E0` | 8 px |
| **Expanded task card** | 1 px solid `#84ADE4` (`--color-primary-200`) | 8 px |
| **Buttons (primary)** | None (filled) | 8 px |
| **Buttons (filter/outline)** | 1.5 px solid `#E0E0E0` | 8 px |
| **Inputs** | 1.5 px solid `#E0E0E0` | 8 px |
| **Chips / Badges** | Varies (status: 1px, priority: none) | 100 px (pill) |
| **Header chip** | None (filled primary) | 100 px (pill) |
| **Tab count pill** | None | 100 px (pill) |
| **Sidebar** | Right 1 px solid `#E0E0E0` | 0 |
| **Top bar** | Bottom 1 px solid `#E0E0E0` | 0 |
| **Nav divider** | — | 0 |
| **Nav items** | — | 8 px |
| **Icon buttons** | — | 50% (circle) |
| **User avatar** | — | 50% (circle) |

---

## 6. Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-card` | `0 1px 4px rgba(50,118,207,0.10)` | Stats cards, task cards |
| `--shadow-modal` | `0 8px 32px rgba(0,0,0,0.18)` | Modals, popovers (not in current page) |
| `--shadow-focus` | `0 0 0 2px #FFF, 0 0 0 4px #3276CF` | Focus ring |
| **Task card hover** | `0 2px 8px rgba(50,118,207,0.12)` | Elevation on hover |
| **Focus input** | `0 0 0 3px rgba(50,118,207,0.12)` | Search input focus glow |

---

## 7. Component Specifications

### 7.1 Top App Bar

| Property | Value |
|---|---|
| **Height** | 60 px |
| **Grid span** | Full width (`grid-column: 1 / -1`) |
| **Background** | `#FFFFFF` (`--color-card`) |
| **Border bottom** | 1 px solid `#E0E0E0` |
| **Padding** | 0 16 px |
| **Layout** | Flex row, center-aligned, gap 16 px |
| **z-index** | 10 |

**Contents (left → right):**
1. **Hamburger** (24 × 24 px): `menu` Material Icon, transparent bg
2. **Logo**: `img/Engage-logo.png`, height 35 px, linked
3. **Spacer** (flex: 1)
4. **Global search**: max-width 585 px, height 40 px, bg `#FAFAFA`, border 1.5 px `#E0E0E0`, radius 8 px, search icon right-positioned (22 px), placeholder: "Search Keywords : Agent ID, Agent Name, Job ID, User, Client Name..."
5. **Clipboard icon button**: 40 × 40 px circle, `content_paste` icon, red notification dot (10 px, top-right)
6. **Notifications icon button**: 40 × 40 px circle, `notifications_none` icon
7. **User avatar**: 32 × 32 px circle, bg `#3276CF`, white initials "AD" (13 px medium)

### 7.2 Left Sidebar Navigation (Collapsed)

| Property | Value |
|---|---|
| **Width** | 68 px |
| **Background** | `#FFFFFF` (`--color-card`) |
| **Border right** | 1 px solid `#E0E0E0` |
| **Padding** | 12 px 0 |
| **Layout** | Flex column, centered items |

**Search button (top):** 44 × 44 px, icon 22 px, radius 8 px, margin-bottom 8 px.

**Nav Items** (icon-only, no labels):

| # | Icon | Label (aria) | Divider After |
|---|---|---|---|
| 1 | `dashboard` | Dashboard | — |
| 2 | `calendar_today` | Calendar | — |
| 3 | `people_outline` | People | Yes |
| 4 | `work_outline` | Jobs | — |
| 5 | `task_alt` | **Tasks (active)** | — |
| 6 | `schedule` | Timesheets | — |
| 7 | `build_circle` | Tools | — |
| 8 | `receipt_long` | Invoices | — |
| 9 | `location_on` | Locations | Yes |
| 10 | `settings` | Configuration | — |
| 11 | `bar_chart` | Reports | Yes |
| 12 | `help_outline` | Help | — |
| 13 | `support_agent` | Support | — |

**Nav Item States:**

| State | Icon Colour | Background | Left Indicator |
|---|---|---|---|
| Default | `#757575` | transparent | none |
| Hover | `#3276CF` | `#F2F5FA` | none |
| Active | `#3276CF` | `#F2F5FA` | 3 px solid `#3276CF` (left -12 px, inset 8 px top/bottom) |

**Nav item dimensions:** 44 × 44 px, radius 8 px, gap 2 px between items.

**Nav divider:** 44 px wide × 1 px, `#EEEEEE`, margin 8 px vertical.

### 7.3 Page Header

| Property | Value |
|---|---|
| **Height** | min 50 px |
| **Layout** | Flex row, center-aligned, gap 12 px |
| **Margin bottom** | 12 px |

**Contents (left → right):**
1. **Count chip**: "273", pill shape (100 px radius), bg `#3276CF`, white text 12 px medium, min-width 45 px, height 27 px
2. **Page title**: "Task(s)", 24 px SemiBold, `#212121`
3. **Dropdown**: "Metering" + `expand_more` icon, height 42 px, min-width 117 px, outlined border 1.5 px `#E0E0E0`, radius 8 px
4. **Spacer** (flex: 1)
5. **Add task button**: "+ ADD TASK", filled primary `#3276CF`, height 30 px, radius 8 px, 14 px Medium white text, `add` icon (18 px)

### 7.4 Stats Cards (3-Card Row)

| Property | Value |
|---|---|
| **Layout** | Flex row, gap 24 px |
| **Margin bottom** | 16 px |
| **Card bg** | `#FFFFFF` |
| **Card border** | 1 px solid `#E0E0E0` |
| **Card radius** | 8 px |
| **Card shadow** | `var(--shadow-card)` |
| **Card padding** | 16 px (cards 1 & 2); 0 (card 3) |
| **Card min-height** | 116 px |

#### Card 1 — Status Donut (368 px fixed)

| Element | Spec |
|---|---|
| **Donut SVG** | 84 × 84 px, stroke-width 4, viewBox 36×36, r=14, rotate -90° |
| **Centre text** | "145" (18 px bold) + "Total" (10 px secondary) |
| **Right side** | "Tasks by status" (12 px caption) + "Status" (20 px semibold) |
| **Legend** | 3 rows: Completed 53% (green), Reassigned 30% (primary blue), Prioritised 17% (orange) |
| **Legend dot** | 10 × 5 px, radius 2 px |
| **Donut segments** | Green `#43A047` → 53%, Blue `#3276CF` → 30%, Orange `#FB8C00` → 17% |

#### Card 2 — SLA Donut (384 px fixed)

| Element | Spec |
|---|---|
| **Donut SVG** | Same spec as Card 1 |
| **Centre text** | "128" + "SLA" |
| **Right side** | "SLA performance" + "SLA Overview" |
| **Legend** | 3 rows: Approaching SLA 53% (orange), Inside SLA 30% (green), Past SLA 17% (red) |
| **Donut segments** | Orange `#FB8C00` → 53%, Green `#43A047` → 30%, Red `#E53935` → 17% |

#### Card 3 — Wide 5-Column Metrics (flex: 1)

| Column | Value | Label |
|---|---|---|
| Total Tasks | 273 | Total Tasks |
| Assigned | 45 | Assigned |
| In-progress | 38 | In-progress |
| Escalated | 12 | Escalated |
| Overdue | 8 | Overdue |

**Column spec:** Equal flex, vertical padding 16 px, horizontal padding 12 px. Columns separated by 1 px `#EEEEEE` left border. Values 20 px semibold `#212121`, labels 12 px regular `#757575`.

### 7.5 Search + Tabs Row

| Property | Value |
|---|---|
| **Layout** | Flex row, center-aligned, gap 16 px |
| **Margin bottom** | 16 px |

**Inline search (left):**
- Width: 251 px fixed
- Height: 40 px
- Border: 1.5 px solid `#E0E0E0`, radius 8 px
- Search icon: 20 px, `#9E9E9E`, left 10 px positioned
- Padding: 0 12 px 0 40 px
- Placeholder: "Search tasks…"

**Tab bar (right, flex: 1, justify-content: flex-end):**

| Tab | Count | Data Filter |
|---|---|---|
| ALL | 273 | `all` |
| ASSIGNED | 45 | `assigned` |
| IN-PROGRESS | 38 | `inprogress` |
| ESCALATED | 12 | `escalated` |
| REASSIGNED | 24 | `reassigned` |
| COMPLETED | 154 | `completed` |

**Tab states:**

| State | Text Colour | Bottom Border | Count Pill Bg | Count Text |
|---|---|---|---|---|
| Default | `#757575` | 2 px transparent | `#EEEEEE` | `#757575` |
| Hover | `#3276CF` | 2 px transparent | — | — |
| Active | `#3276CF` | 2 px solid `#3276CF` | `#3276CF` | `#FFFFFF` |

**Tab dimensions:** Height 42 px, padding 8 px 16 px, 12 px uppercase medium text with 0.5 px letter-spacing. Count pill: 18 px height, padding 0 5 px, 100 px radius, 10 px text.

**Filter button (right of tabs):**
- Height: 40 px, outlined 1.5 px `#E0E0E0`, radius 8 px
- Label: "Filter" + `filter_list` icon (18 px)
- Hover: border `#3276CF`, text `#3276CF`, bg `#F2F5FA`
- Margin-left: 8 px

### 7.6 Task Card List

| Property | Value |
|---|---|
| **Layout** | Flex column, gap 8 px |
| **Card bg** | `#FFFFFF` |
| **Card border** | 1 px solid `#E0E0E0` |
| **Card radius** | 8 px |
| **Card shadow** | `var(--shadow-card)` |
| **Hover** | Border `#84ADE4`, shadow `0 2px 8px rgba(50,118,207,0.12)` |
| **Cursor** | pointer |

**Compact row grid (65 px min-height):**

```css
grid-template-columns: 96px 1fr 120px 90px 160px 100px 120px 40px;
padding: 0 16px;
gap: 8px;
```

| Column | Width | Content |
|---|---|---|
| Task ID | 96 px | Link (`#3276CF`), medium weight, hover underline |
| Title | 1fr | Medium weight, single-line ellipsis |
| Status | 120 px | Outlined chip with dot |
| Priority | 90 px | Filled chip |
| Agent | 160 px | 28 px circle avatar + name (12 px, ellipsis) |
| Date | 100 px | 12 px caption, `#757575` |
| SLA | 120 px | SLA chip with icon |
| Action | 40 px | Chevron-right icon button (32 × 32 px) |

**Expanded card (first row):**
- Overall min-height: 121 px (65 px row + 56 px detail)
- Border: `#84ADE4` (primary-200)
- Row has bottom divider: 1 px `#EEEEEE`
- Detail row: grid `96px 1fr`, padding 8 px 16 px, 56 px height

**Detail row contents:** Flex with 24 px gap, 12 px caption text:
- 📍 **Site**: "Melbourne CBD — Building A"
- 💼 **Job**: "JOB-2048"
- 🏢 **Client**: "Acme Corp"
- 📅 **Due**: "10 Mar 2026, 12:00"

Each item has a 16 px Material Icon + Label (medium `#757575`) + Value (`#212121`).

**Status Chips (outlined with dot):**

| Status | Border | Text | Bg | Dot |
|---|---|---|---|---|
| Assigned | `#E0E0E0` | `#616161` | `#F5F5F5` | `#9E9E9E` |
| In Progress | `#FB8C00` | `#E65100` | `#FFF8E1` | `#FB8C00` |
| Escalated | `#E53935` | `#D32F2F` | `#FEEBEE` | `#E53935` |
| Reassigned | `#3276CF` | `#275798` | `#F2F5FA` | `#3276CF` |
| Completed | `#43A047` | `#388E3C` | `#E8F5E9` | `#43A047` |

**Priority Chips (filled, no border):**

| Priority | Background | Text |
|---|---|---|
| Critical | `#E53935` | `#FFFFFF` |
| High | `#E56800` | `#FFFFFF` |
| Medium | `#FF9800` | `#FFFFFF` |
| Low | `#2C66B4` | `#FFFFFF` |

**SLA Chips (icon + text, pill):**

| State | Icon | Text Colour | Background |
|---|---|---|---|
| Inside SLA | `check_circle_outline` (14 px) | `#43A047` | `#E8F5E9` |
| Approaching | `schedule` (14 px) | `#F57C00` | `#FFF3E0` |
| Overdue | `warning_amber` (14 px) | `#E53935` | `#FEEBEE` |

**Sample task data (9 rows):**

| # | ID | Status | Priority | Agent | Expanded |
|---|---|---|---|---|---|
| 1 | TSK-1042 | In Progress | High | Templeton Peck | **Yes** |
| 2 | TSK-1041 | Assigned | Critical | John Doe | No |
| 3 | TSK-1040 | Escalated | High | Sarah Kim | No |
| 4 | TSK-1039 | Reassigned | Medium | Amy Lee | No |
| 5 | TSK-1038 | In Progress | Medium | Mike Rogers | No |
| 6 | TSK-1037 | Completed | Low | John Doe | No |
| 7 | TSK-1036 | Assigned | High | Mike Rogers | No |
| 8 | TSK-1035 | In Progress | Medium | Sarah Kim | No |
| 9 | TSK-1034 | Assigned | Low | Amy Lee | No |

---

## 8. Interaction States & Behaviour

### Navigation
- **Hamburger click**: Toggle sidebar (future — currently collapsed only)
- **Logo click**: Navigate to dashboard
- **Sidebar nav**: Click to navigate, active item highlighted with left-border accent
- **Task ID click**: Navigate to Task Detail page (link style)

### Task Card Interactions
- **Row hover**: Border changes to `#84ADE4`, shadow increases
- **Row click**: Expand/collapse detail row (accordion — one at a time)
- **Expand behaviour**: Collapses any other expanded card first, then expands clicked card
- **Exclusions**: Clicks on `.row-action` or `.task-id` do not toggle expand

### Tab Filtering
- Tabs filter tasks by `data-status` attribute
- `ALL` tab shows all cards
- Active tab gets blue underline + blue count pill
- Tab change shows/hides cards via `display` toggle

### Inline Search
- **Debounced**: 300 ms delay before filtering
- Searches across full card `textContent` (case-insensitive)
- No clear button in current prototype

### Stats Cards
- Static display only (no click interaction in current build)

### Filter Button
- Placeholder — no dropdown implemented yet

---

## 9. MUI v5 Component Mapping

| UI Element | MUI Component | Key Props |
|---|---|---|
| Top app bar | `<AppBar>` | `position="sticky"`, `color="default"`, `elevation={0}` |
| Hamburger | `<IconButton>` | `edge="start"`, `<MenuIcon/>` |
| Sidebar nav | `<Drawer>` | `variant="permanent"`, `anchor="left"`, width 68 px |
| Nav items | `<IconButton>` or `<ListItemButton>` | `selected`, icon only (no `<ListItemText>`) |
| Page header chip | `<Chip>` | `color="primary"`, `size="small"`, custom height 27 px |
| Dropdown | `<Select>` | `variant="outlined"`, `size="small"` |
| Add task button | `<Button>` | `variant="contained"`, `disableElevation`, `startIcon={<AddIcon/>}` |
| Stats cards | `<Card>` | `elevation={0}`, `variant="outlined"` |
| Donut chart | SVG or `<PieChart>` (MUI X) | Custom SVG in prototype |
| Inline search | `<TextField>` | `variant="outlined"`, `size="small"`, `InputProps` with search icon |
| Tab bar | `<Tabs>` | `indicatorColor="primary"`, `textColor="primary"`, right-aligned |
| Tab item | `<Tab>` | `label` with count `<Badge>`, `disableRipple` |
| Filter button | `<Button>` | `variant="outlined"`, `startIcon={<FilterListIcon/>}` |
| Task card | `<Card>` | `elevation={0}`, `variant="outlined"`, click handler |
| Status chip | `<Chip>` | `variant="outlined"`, `size="small"`, custom `sx` per status |
| Priority chip | `<Chip>` | `variant="filled"`, `size="small"`, custom `sx` per priority |
| SLA chip | `<Chip>` | `icon={<ScheduleIcon/>}`, `size="small"` |
| Agent avatar | `<Avatar>` | `sx={{ width: 28, height: 28 }}` |
| User avatar | `<Avatar>` | `sx={{ width: 32, height: 32 }}` |
| Notification badge | `<Badge>` | `variant="dot"`, `color="error"` |
| Row action | `<IconButton>` | `size="small"`, `<ChevronRightIcon/>` |

---

## 10. Accessibility (WCAG 2.2 AA)

- **Skip link**: "Skip to main content" → `#main-content`, hidden until focused
- **Focus order**: Skip link → Hamburger → Logo → Search → Clipboard → Notifications → Avatar → Sidebar search → Nav items → Page header → Stats cards → Inline search → Tabs → Filter → Task cards
- **Focus ring**: `outline: 2px solid #3276CF; outline-offset: 2px; border-radius: 4px` on `:focus-visible`
- **Keyboard nav**: Tabs use `role="tablist"` / `role="tab"` / `aria-selected`
- **Sidebar nav**: `<nav aria-label="Main navigation">`
- **Active nav item**: `aria-current="page"` on Tasks
- **Task list**: `role="list"` with `role="listitem"` per card
- **Stats row**: `role="group"` with `aria-label="Task statistics"`
- **Search inputs**: `aria-label` on both global and inline search
- **Buttons**: All have `aria-label` (hamburger, clipboard, notifications, add task, filter, row actions)
- **Icon decorative**: `aria-hidden="true"` on decorative icons
- **Colour contrast**: All text meets 4.5:1 minimum ratio
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables all animations/transitions
- **Touch targets**: All interactive elements ≥ 32 × 32 px minimum area (most ≥ 40 × 40 px)

---

## 11. Required Assets

| Asset | Type | Size | Source | Usage |
|---|---|---|---|---|
| `img/Engage-logo.png` | PNG | height 35 px | Local file | Top app bar logo |
| Material Icons Outlined | Web Font | — | Google Fonts CDN | All icons throughout |
| Roboto | Web Font | 400/500/600/700 | Google Fonts CDN | All text |

**Material Icons used:**

| Icon Name | Size | Location |
|---|---|---|
| `menu` | 24 px | Hamburger button |
| `search` | 20–22 px | Top bar search, sidebar search, inline search |
| `content_paste` | 24 px | Clipboard button |
| `notifications_none` | 24 px | Notifications button |
| `dashboard` | 24 px | Sidebar nav |
| `calendar_today` | 24 px | Sidebar nav |
| `people_outline` | 24 px | Sidebar nav |
| `work_outline` | 24 px | Sidebar nav + detail row |
| `task_alt` | 24 px | Sidebar nav (active) |
| `schedule` | 14–24 px | Sidebar nav + SLA chip |
| `build_circle` | 24 px | Sidebar nav |
| `receipt_long` | 24 px | Sidebar nav |
| `location_on` | 16–24 px | Sidebar nav + detail row |
| `settings` | 24 px | Sidebar nav |
| `bar_chart` | 24 px | Sidebar nav |
| `help_outline` | 24 px | Sidebar nav |
| `support_agent` | 24 px | Sidebar nav |
| `expand_more` | 18 px | Header dropdown |
| `add` | 18 px | Add task button |
| `filter_list` | 18 px | Filter button |
| `chevron_right` | 20 px | Task row action |
| `check_circle_outline` | 14 px | Inside SLA chip |
| `warning_amber` | 14 px | Overdue SLA chip |
| `business` | 16 px | Detail row "Client" |
| `event` | 16 px | Detail row "Due" |

---

## 12. Differences from Tablet Version

| Aspect | Tablet (1280 × 800) | Web (1512 × 982) |
|---|---|---|
| **Viewport** | 1280 × 800 fixed | 1512 × 982, fluid |
| **Sidebar** | 100 px compact (icon only) | 68 px collapsed (icon only) |
| **Top bar height** | Integrated with status bar | 60 px standalone with hamburger + logo |
| **Top bar search** | Minimal | Full 585 px max-width with detailed placeholder |
| **Task list style** | Card-based | Card-based (same pattern) |
| **Stats cards** | 4-column simple metrics | 2 donut charts + 1 wide 5-column metrics |
| **Tabs** | Priority-based | Status-based (ALL, ASSIGNED, IN-PROGRESS, ESCALATED, REASSIGNED, COMPLETED) |
| **Pagination** | Scroll-based | No pagination (scroll-based, 9 visible rows) |
| **Task row layout** | 4-column card | 8-column grid row (ID, Title, Status, Priority, Agent, Date, SLA, Action) |
| **Expanded detail** | Always visible | Click-to-expand accordion (one at a time) |
| **Navigation** | Bottom/side icons | Sidebar with hamburger toggle hint |
| **Filter button** | Not present | Dedicated Filter button next to tabs |
| **Count badges** | Not present | Tab count pills + header count chip |
| **Icon library** | Mixed SVG | Material Icons Outlined (web font) |
| **Border-radius** | 4 px cards | 8 px cards |

---

## 13. Responsive Breakpoints

| Breakpoint | Width | Layout Change |
|---|---|---|
| Desktop (default) | ≥ 1280 px | 68 px sidebar + full card list, 3 stats cards in row |
| Medium Desktop | 1024–1279 px | Stats cards wrap: donut cards flex, wide card full width |
| Tablet | < 1024 px | Sidebar hidden, stats stacked vertically, task row 4 columns (hides agent, date, SLA, action) |

---

## 14. JavaScript Behaviour

| Feature | Implementation |
|---|---|
| **Tab filtering** | `filterTab(el, type)` — sets `aria-selected`, toggles `display` on `.task-card` by `data-status` attribute |
| **Inline search** | IIFE, debounced 300 ms, case-insensitive `textContent.indexOf()` match on all `.task-card` elements |
| **Row expand/collapse** | Click on `.task-card` toggles `.expanded` class, accordion pattern (collapses others). Dynamically creates `.task-detail` if not present. Ignores clicks on `.row-action` and `.task-id`. |

---
