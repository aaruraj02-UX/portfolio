# Figma Design Guidelines — Task Module (Tablet)

> **Source Frame**: [FieldSync — Field App / Task](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=26720-60531&m=dev)
> **Resolution**: 1280 × 800 px (iPad landscape)
> **Generated**: 2026-03-26
> **Last Updated**: 2026-03-26

---

## 1. Layout & Grid

| Region | Dimensions | Notes |
|---|---|---|
| **Overall frame** | 1280 × 800 px | Landscape tablet (iPad) |
| **Status bar** | 1280 × 36 px | iPadOS status bar top strip |
| **Left sidebar** | 100 px wide, full height minus status bar | Icon-and-label nav; background `#FFFFFF` with right 1 px `#E0E0E0` border |
| **Sidebar nav rail** | 70 px usable column centred inside 100 px | Each nav item: 70 × 61 px (icon 36 × 36, label 70 × 20) |
| **Nav item spacing** | 36 px gap between items | Vertical stack with `gap: 36px` |
| **Content area** | Starts at x=108, width 1172 px | Padding: 16 px all sides |
| **Content inner** | 1140 px usable width | 1172 − 16 − 16 = 1140 |
| **Header bar** | 1140 × 32 px | Page title + shift status chip + notification icon |
| **Divider line** | 1140 px wide, 1 px height | After header, colour `#162b481f` |

### Content Panel Vertical Stack (top → bottom)

| Section | Y-offset (within content) | Height | Notes |
|---|---|---|---|
| Header (title + chip) | y=16 | 32 px | |
| Divider | y=64 | 1 px | |
| Stats row | y=80 | 88 px | 4 stat cards in a row |
| Refresh text | y=184 | 24 px | Clock icon + timestamp text |
| Tab bar | y=224 | 42 px | 6 visible tabs |
| Task list area | y=282 | remaining | Search bar + task rows |

---

## 2. Typography

**Font Family**: `Roboto` (Google Fonts / system fallback)

| Style Name | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| **h6** | 20 px | 500 (Medium) | 1.6 (32 px) | 0.15 px | Page title "Tasks" |
| **body1** | 16 px | 400 (Regular) | 1.5 (24 px) | 0.15 px | Input values, task descriptions |
| **body2** | 14 px | 400 (Regular) | 1.43 (20 px) | 0.17 px | Task IDs, timestamps, general body text |
| **caption** | 12 px | 400 (Regular) | 1.66 (20 px) | 0.4 px | Stat labels, refresh text, secondary info |
| **chip/label** | 13 px | 400 (Regular) | 18 px | 0.16 px | Chip text (status, category chips) |
| **badge/label** | 12 px | 500 (Medium) | 20 px | 0.14 px | Badge labels (priority indicators) |
| **button/medium** | 14 px | 500 (Medium) | 24 px | 0.4 px | Button labels |
| **input/value** | 16 px | 400 (Regular) | 24 px | 0.15 px | Input field values |
| **input/label** | 14 px | 400 (Regular) | 14 px | 0.15 px | Input field labels |

### Key Difference from Current MET-DS-V2
- Figma uses **Roboto** as the primary font family
- Font weights are 400 (Regular) and 500 (Medium) — no 600 (Semi-bold) or 700 (Bold) used in Figma
- The page title "Tasks" uses h6 (20 px / Medium 500), not h1 (24 px)

---

## 3. Colour Palette

### Primary & Brand

| Token | Hex | Usage |
|---|---|---|
| `Primary/Main` | `#3276CF` | Primary action, active nav, links |
| `Primary/25` | `#F2F5FA` | Page background |
| `Primary/75` | `#C2D7F2` | Light primary tint |
| `Primary/Cards` | `#FFFFFF` | Card background |
| `Primary/Black` | `#000000` | Deepest text |

### Text

| Token | Hex | Usage |
|---|---|---|
| `Text/Primary` | `#212121` | Body text, headings |
| `Text/Secondary` | `#757575` | Helper text, captions |
| `text/primary` | `#252627` | Alternate primary text (MUI context) |
| `text/secondary` | `#8E9092` | Alternate secondary text |

### Grey Scale

| Token | Hex |
|---|---|
| `Grey/50` | `#FAFAFA` |
| `Grey/100` | `#F5F5F5` |
| `Grey/200` | `#EEEEEE` |
| `Grey/300` | `#E0E0E0` |
| `Grey/400` | `#BDBDBD` |
| `Grey/700` | `#616161` |
| `Grey/900` | `#212121` |

### Semantic Status

| Token | Hex | Usage |
|---|---|---|
| `Success/Default` | `#43A047` | Success state |
| `State/Success/Primary` | `#3FAE5A` | Active success indicator |
| `Green/500` | `#4CAF50` | Green accent |
| `Red/50` | `#FEEBEE` | Error background tint |
| `Red/100` | `#FECDD2` | Lighter error tint |
| `Red/300` | `#E57373` | Error light |
| `Red/500` | `#F44336` | Error medium |
| `Red/700` | `#D32F2F` | Error hover / danger text |
| `error/dark` | `#C62828` | Deep error state |
| `Orange/500` | `#FF9800` | Warning medium |
| `orange/Warning` | `#ED6C02` | Warning primary |
| `MH-Brand/Text/Danger` | `#D32F2F` | Danger text colour |

### Utility

| Token | Hex | Usage |
|---|---|---|
| `Default/White` | `#FFFFFF` | Card bg, button text |
| `Default/Black` | `#000000` | |
| `Gray2` | `#4F4F4F` | Mid-tone grey |
| `CoolGray/20` | `#DDE1E6` | Cool-toned border |
| `action/active` | `#162B488F` | Active action (56% opacity) |
| `divider` | `#162B481F` | Divider lines (12% opacity) |
| `background/paper-elevation-1` | `#FFFFFF` | Paper elevated bg |

---

## 4. Border Radius

| Element | Radius | Notes |
|---|---|---|
| **Cards / Containers** | **4 px** | Figma `borderRadius` variable = 4 |
| **Buttons** | 4 px | Consistent with cards |
| **Inputs** | 4 px | TextField outlined variant |
| **Chips** | 16 px | Rounded pill for status/category chips |
| **Stat cards** | 4 px | Rounded corners on summary cards |

### Key Difference from Current MET-DS-V2
- Figma uses **4 px** border radius (not 8 px)
- Chips remain pill-shaped at ~16 px

---

## 5. Elevation & Shadows

The Figma design uses a Material Design 3-layer elevation system:

```
elevation/1:
  - 0px 1px 3px rgba(0, 0, 0, 0.12)    /* 0x0000001F */
  - 0px 1px 1px rgba(0, 0, 0, 0.14)    /* 0x00000024 */
  - 0px 2px 1px -1px rgba(0, 0, 0, 0.20) /* 0x00000033 */
```

This is MUI's standard `elevation={1}` shadow. Apply to `<Paper>` components.

---

## 6. Spacing System

Base unit: **8 px** (Figma variable `1` = `8`)

| Multiplier | Value | Common usage |
|---|---|---|
| 0.5 | 4 px | Inline gaps |
| 1 | 8 px | Icon-to-text gap, small padding |
| 1.5 | 12 px | Component padding |
| 2 | 16 px | Content area padding, card padding |
| 3 | 24 px | Section spacing |
| 4 | 32 px | Large section gaps |

### Specific Measurements from Figma

| Element | Spacing |
|---|---|
| Content area left/right padding | 16 px |
| Content area top padding | 16 px |
| Stats card row gap | 16 px between cards |
| Stats card internal padding | 8 px top/bottom |
| Tab bar to task list | 16 px |
| Task row height | 65 px (64 px card + 1 px divider) |
| Task row internal content padding | 16 px horizontal |
| Task row inner content | 32 px vertical centering area |
| Header to divider gap | 32 px |

---

## 7. Component Specifications

### 7.1 Left Sidebar Navigation

- **Width**: 100 px
- **Background**: `#FFFFFF`
- **Right border**: 1 px solid `#E0E0E0`
- **Logo**: Engage "E" brand SVG (`Engage-Tab-logo.svg`), 50 × 51 px, fill `#3276CF`
- **Nav items**: 70 × 61 px each (icon 24 × 24, label below)
- **Active indicator**: Left-edge border 3 px primary colour + primary background tint
- **Nav item labels**: caption size (12 px), centred beneath icons
- **Nav items visible**: My Jobs, Documents, Profile, Vehicle Check, Stocks, Tasks, Force Sync, Chat, End Shift
- **Icons**: Image-based from `UX_Deliverables/image/` folder:
  - My Jobs → `my jobs.png`
  - Documents → `Documents.png`
  - Profile → `Profile.png`
  - Vehicle Check → `vechile.png`
  - Stocks → `Stock.png`
  - Tasks → `Tasks.png`
  - Force Sync → `ForceSync.png`
  - Chat, Home, End Shift, Schedule, Admin → Emoji fallback
- **Icon sizing**: `.nav-icon img` at 24 × 24 px, `object-fit: contain`

### 7.2 Header Bar

- **Height**: 32 px content area
- **Title**: "Tasks" in h6 (20 px / Medium 500)
- **Right side**: Status chip ("Status: Shift Started") + Notification icon
- **Chip**: 158 × 30 px, chip/label typography (13 px)
- **Notification icon**: Inline SVG from `Notification.svg` (24 × 24 px), `fill: currentColor`
- **User menu icon**: `Profile.png` (24 × 24 px)
- **Shift Info Banner**: Removed from dashboard (vehicle check card removed)

### 7.3 Stats Cards Row

- **4 cards in a row**, each **273 × 88 px**
- **Gap between cards**: 16 px
- **Card content**: Centred vertically
  - Top label (`.metric-label`): 12 px, **font-weight bold**, uppercase, letter-spacing 0.06em
  - Middle value: h6-sized (20 px weight 500) — e.g., "18"
  - Bottom sub-label: caption (12 px) — e.g., "All statuses"
- **Border**: 1 px `#E0E0E0`, radius 4 px
- **Background**: `#FFFFFF`

### 7.4 Tab Bar

- **6 visible tabs**: All (18), Critical, High Priority, Medium Priority, Low Priority, Completed
- **Tab height**: 42 px
- **Active tab**: Primary colour bottom border, primary text
- **Inactive tab**: `#757575` text, no border

### 7.5 Search Bar & Toolbar

- **TextField component**: 360 × 40 px
- **Variant**: Outlined
- **Position**: Left-aligned in toolbar row
- **Search icon**: Inline SVG from `SearchFilled.svg`, 20 × 20 px, fill `#757575`
- **Toolbar buttons** (right-aligned, 3 icon-only buttons):
  - **Sort**: Up/down arrow SVG icon, 36 × 36 px, 1 px `#E0E0E0` border, 4 px radius
  - **Row density**: Text "1.5", 13 px / 500 weight, same border style
  - **List view**: Hamburger/menu SVG icon, same border style
- **Button gap**: 8 px between toolbar buttons

### 7.6 Task List Rows

- **Row height**: 65 px (64 px content + 1 px divider)
- **Divider**: Full-width 1 px `divider` colour (`#162B481F`)
- **Left border**: 4 px coloured indicator per row state:
  - Overdue → `var(--color-error)` (red)
  - Critical → `var(--color-error)` (red) + pink background `#FFF5F5`
  - Completed → `var(--color-success-dark)` (green)
  - Default → transparent
- **Row layout** (left to right):
  | Element | Example | Typography | Style |
  |---|---|---|---|
  | Task ID | "Task ID: 001" | caption (12 px) semibold | Grey secondary text |
  | Task name | "Late on site" | body1 (16 px) bold | Primary text |
  | Assigned chip | "Assigned" | 11 px semibold | Grey pill (`#F5F5F5` bg, `#616161` text) |
  | Timer info | "Overdue" / "01:00 hrs" | caption (12 px) semibold | Clock SVG icon + text; red for overdue, secondary for normal |
  | Critical indicator | "● Critical" | caption (12 px) semibold | Red dot (10 px) + red text (only on critical rows) |
  | Priority chip | "Medium Priority" / "High Priority" / "H.Priority" | caption (12 px) semibold | **Filled coloured pill** with white text |
  | Status chip | "Not Started" / "In-Progress" / "Completed" | caption (12 px) semibold | **Outlined pill** (1 px border, transparent bg) |
  | Time ago | "5 mins ago" | caption (12 px) | Secondary text |

#### Priority Chip Colours (Filled)

| Level | Background | Text |
|---|---|---|
| Critical | `#E53935` | `#FFFFFF` |
| High Priority | `#E53935` | `#FFFFFF` |
| H.Priority | `#E65100` | `#FFFFFF` |
| Medium Priority | `#FB8C00` | `#FFFFFF` |
| Low Priority | `var(--color-success-dark)` | `#FFFFFF` |

#### Status Chip Styles (Outlined)

| Status | Border | Text Colour |
|---|---|---|
| Not Started | `#BDBDBD` (grey-400) | `#212121` |
| In-Progress | `#FB8C00` (orange) | `#E65100` |
| Completed | `var(--color-success-dark)` | `var(--color-success-dark)` + checkmark icon |

### 7.7 Iconography Assets

All sidebar and header icons are sourced from `UX_Deliverables/image/`:

| File | Usage | Format |
|---|---|---|
| `Engage-Tab-logo.svg` | Sidebar logo | SVG (50 × 51 px) |
| `Notification.svg` | Header notification bell | SVG (24 × 24 px) |
| `SearchFilled.svg` | Search input icon | SVG (24 × 24 px) |
| `my jobs.png` | Nav: My Jobs | PNG |
| `Documents.png` | Nav: Documents / Docs | PNG |
| `Profile.png` | Nav: Profile + Header: User menu | PNG |
| `vechile.png` | Nav: Vehicle Check | PNG |
| `Stock.png` | Nav: Stocks | PNG |
| `Tasks.png` | Nav: Tasks | PNG |
| `ForceSync.png` | Nav: Force Sync | PNG |

---

## 8. Dividers & Separators

| Type | Style | Colour |
|---|---|---|
| **Section divider** | 1 px solid | `#162B481F` (12% opacity dark blue) |
| **Card internal divider** | 1 px solid full-width | `#162B481F` |
| **Nav separator** | None (spacing-based separation) | — |

---

## 9. Iconography

- **Icon size**: 24 × 24 px (standard), 24 × 24 px (nav icons via img)
- **Icon sources**: PNG images from `UX_Deliverables/image/` folder + inline SVGs
- **SVG icons**: Notification bell, Search, Sort, List view, Clock/timer, Checkmark
- **Icon colours**:
  - Default: `currentColor` (inherits from parent)
  - Active/selected: `#3276CF` (primary)
  - Secondary: `#757575` (text secondary)
  - Search icon fill: `#757575`
  - Timer/clock: `currentColor` (red for overdue, secondary for normal)
- **Timer/clock icons** appear inline with SLA/time text as 16 × 16 SVGs

---

## 10. Key Differences from Current MET-DS-V2 Implementation

| Property | Current MET-DS-V2 | Figma Design | Action |
|---|---|---|---|
| **Font family** | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` | `Roboto` | Update to prioritise Roboto |
| **Border radius** | 8 px (cards, buttons, inputs) | 4 px | Update `--radius-card`, `--radius-button`, `--radius-input` to 4 px |
| **Font weights** | 400 / 600 / 700 | 400 / 500 | Use 500 (Medium) instead of 600/700 for headings |
| **Page title size** | h1 (24 px / 700) | h6 (20 px / 500) | Reduce page title to 20 px / Medium |
| **Sidebar width** | 72 px | 100 px | Widen sidebar to 100 px |
| **Task row style** | Card with border + left colour strip | Flat row with bottom divider only | Change to flat list rows |
| **Stats card height** | Variable | 88 px fixed | Standardise to 88 px |
| **Tab bar** | 2 tabs (Active, Completed) | 6 tabs (All, Critical, High/Med/Low Priority, Completed) | Updated tab labels |
| **Divider colour** | `#EEEEEE` | `#162B481F` | Update to semi-transparent dark blue |
| **Elevation** | Custom `--shadow-card` | MUI elevation/1 triple shadow | Update shadow system |
| **Chip radius** | 100 px (pill) | ~16 px | Keep pill-like but verify |
| **Task row chips** | Generic chip classes | Filled priority + outlined status chips | New `.chip-priority`, `.chip-status`, `.chip-assigned` classes |
| **Task row left border** | None / flat | 4 px coloured left border per state | Red (overdue/critical), green (completed) |
| **Shift info banner** | Present | Removed from dashboard | Vehicle check card removed |
| **Toolbar buttons** | Text buttons ("Sort", "Filter") | 3 icon-only bordered buttons (sort, 1.5, list) | Updated to match Figma |
| **Metric label font** | 11 px semibold | 12 px bold | Increased size and weight |
| **Nav/header icons** | Emojis | PNG/SVG image assets | Replaced with actual design assets |

---

## 11. Responsive Considerations

- **Target device**: iPad (1280 × 800 landscape)
- **Sidebar**: Always visible at 100 px (no collapsible hamburger)
- **Content scroll**: Vertical scroll within content area only
- **Touch targets**: Minimum 44 × 44 px per WCAG 2.5.5
- **Task rows**: Full-width touch targets (1140 px × 65 px)
