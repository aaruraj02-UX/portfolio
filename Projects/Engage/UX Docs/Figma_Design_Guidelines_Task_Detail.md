# Figma Design Guidelines — Task Detail Page (Tablet)

> **Source Frame**: [FieldSync — Field App / Task-view](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=26724-104174&m=dev)
> **Frame Node ID**: `26724:104174`
> **Resolution**: 1280 × 800 px (iPad landscape)
> **Generated**: 2026-03-26
> **Last Updated**: 2026-03-26

---

## 1. Layout & Grid

| Region | Dimensions | Notes |
|---|---|---|
| **Overall frame** | 1280 × 800 px | Landscape tablet (iPad) |
| **Status bar** | 1280 × 36 px | iPadOS status bar top strip |
| **Sidebar** | N/A | No sidebar in task detail view (full-width layout) |
| **Header bar** | Full width × 72 px | Dark bg (`#182A48`), includes back nav + title + chips |
| **Content area** | Full width × remaining | Background `#F2F5FA` (`Primary/25`) |
| **Left panel** | 772 px wide | Task info card + task history |
| **Right panel** | flex: 1 (~465 px) | "Update Task Status" form card |

### Content Layout (Two-Column, No Sidebar)

```
┌─────────────────────────────────────────────────────────┐
│  Header Bar (72px) — Back + Title + Chips + Timestamp   │
├──────────────────────────┬──────────────────────────────┤
│  Left Panel (772px)      │  Right Panel (flex: 1)       │
│  ┌────────────────────┐  │  ┌────────────────────────┐  │
│  │ Info Fields (2×3)  │  │  │ "Update Task Status"   │  │
│  │ ─ Divider ───────  │  │  │ Status dropdown        │  │
│  │ Task History       │  │  │ Agent/Manager (cond.)  │  │
│  │ (Timeline)         │  │  │ Comments textarea       │  │
│  └────────────────────┘  │  │ [Cancel] [Action Btn]  │  │
│                          │  └────────────────────────┘  │
└──────────────────────────┴──────────────────────────────┘
```

---

## 2. Typography

**Font Family**: `Roboto` (Google Fonts / system fallback)

| Style Name | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| **h6** | 20 px | 500 (Medium) | 1.6 (32 px) | 0.15 px | Header title "Task ID: 002", "Task History" heading |
| **Body-L** | 20 px | 400 (Regular) | 1.5 (30 px) | 0.15 px | Info field values (Agent name, Module, dates, Description text) |
| **body1** | 16 px | 400 (Regular) | 1.5 (24 px) | 0.15 px | Info field labels, input values, timeline primary text |
| **alert/title** | 16 px | 500 (Medium) | 1.5 (24 px) | 0.15 px | "Update Task Status" section title |
| **body2** | 14 px | 400 (Regular) | 1.43 (20 px) | 0.17 px | Timeline timestamps, secondary text, "5 mins ago" |
| **chip/label** | 13 px | 400 (Regular) | 18 px | 0.16 px | "Critical" chip text |
| **chip/label (filled)** | 14 px | 500 (Medium) | 18 px | 0.16 px | "High Priority" filled chip text |
| **input/value** | 16 px | 400 (Regular) | 24 px | 0.15 px | Dropdown & textarea values |
| **input/label** | 14 px | 400 (Regular) | 14 px | 0.15 px | "Status", "Comments (Required)" labels |
| **input/helper** | 12 px | 400 (Regular) | 1.66 (20 px) | 0.4 px | "Min 10 and max 100 characters (0/100)." helper text |
| **caption** | 12 px | 400 (Regular) | 1.66 (20 px) | 0.4 px | Avatar initials |

### Title Mixed Formatting

The header title uses mixed styles within a single text element:

```
"Task ID: 002" — Roboto Medium 20px, white
"|"             — Roboto Medium 20px, #275798 (dark blue separator)
"Daily vehicle check failures" — Roboto Regular 20px, white
```

---

## 3. Colour Palette

### Primary & Brand

| Token | Hex | Usage |
|---|---|---|
| `engage/primary` | `#182A48` | Header bar background |
| `Primary/25` | `#F2F5FA` | Content area background |
| `Primary/White` | `#FFFFFF` | Header text, card backgrounds |
| `default/white` | `#FFFFFF` | Frame background, cards |

### Text

| Token | Hex | Usage |
|---|---|---|
| `text/primary` | `#212121` | Body text, field values, form labels |
| `text/secondary` | `#757575` | Timeline secondary text, field labels (grey/800 variant) |
| `grey/800` | `#424242` | Info field label colour |
| `text/secondary (timeline)` | `#8E9092` | Timeline "Commented:" prefix |
| `grey/50` | `#FAFAFA` | "5 mins ago" timestamp in header |

### Status & Priority Chips

| Token | Hex | Usage |
|---|---|---|
| `red/100` | `#FECDD2` | "Critical" chip background (outlined style) |
| `MH-Brand/Text/Danger` | `#D32F2F` | "Critical" chip text + dot icon fill |
| `error/dark` | `#C62828` | "High Priority" chip background (filled) |
| `--` | `#FFE0E0` | "High Priority" chip text colour |
| `#275798` | `#275798` | Pipe separator in header title |

### Grey Scale

| Token | Hex | Usage |
|---|---|---|
| `Grey/400` | `#BDBDBD` | Card borders, input field borders |
| `Grey/800` | `#424242` | Info field labels |

### Timeline

| Token | Hex | Usage |
|---|---|---|
| `text/primary` | `#212121` | Primary timeline name, comment body text |
| `text/secondary` | `#757575` | Timeline action description text |
| `text/secondary` | `#8E9092` | "Commented:" label |
| `background/paper-elevation-0` | `#FFFFFF` | Avatar fallback text (initials) |

---

## 4. Border Radius

| Element | Radius | Notes |
|---|---|---|
| **Info card** | 8 px | `rounded-[8px]` — Figma variable `--1` = 8 |
| **Right panel card** | 8 px | Same as info card |
| **Input fields** | 8 px | `rounded-[var(--1, 8px)]` |
| **Chips** | 100 px | Pill shape (`rounded-[100px]`) |
| **Timeline avatars** | 100 px | Circular (`rounded-[100px]`) |
| **Timeline container** | 8 px | Timeline items wrapper |

---

## 5. Elevation & Shadows

The Task Detail view uses **flat / outlined** cards rather than elevated ones:

| Element | Elevation | Border |
|---|---|---|
| Left info card | `elevation={0}` | 1 px solid `#BDBDBD` (`grey/400`) |
| Right form card | `elevation={0}` | 1 px solid `#BDBDBD` (`grey/400`) |
| Input fields | `elevation={0}` | 1 px solid `#BDBDBD` (`grey/400`) |

No MUI `elevation` shadow is used on this page. All containers use outlined borders instead.

---

## 6. Spacing System

Base unit: **8 px**

### Global Spacing

| Element | Spacing |
|---|---|
| Header horizontal padding | 24 px |
| Header vertical padding | 16 px |
| Content area horizontal padding | 16 px |
| Left panel top/bottom padding | 16 px |
| Right panel horizontal padding | 8 px |
| Right panel top/bottom padding | 16 px |
| Card internal padding | 16 px |
| Grid column gap | 16 px |
| Grid row gap | 16 px |

### Specific Measurements

| Element | Value |
|---|---|
| Back arrow icon | 36 × 36 px |
| Gap: back arrow to title | 16 px |
| Info fields grid | 2 columns × 3 rows, 16 px gaps |
| Info field label width | 125 px |
| Info field label-to-value gap | 4 px |
| Divider to Task History | 16 px (within card gap) |
| Timeline item heights | 100 / 98 / 84 px |
| Timeline dot size | 12 × 12 px |
| Timeline connector width | 2 px |
| Timeline opposing column width | 45 px |
| Timeline main content left padding | 12 px |
| Avatar size (timeline) | 24 × 24 px |
| CTA bar height | 80 px |
| CTA bar top padding | 16 px |

---

## 7. Component Specifications

### 7.1 Header Bar

- **Height**: 72 px
- **Background**: `#182A48` (`engage/primary`)
- **Layout**: Flexbox, space-between, vertical centre
- **Padding**: 24 px horizontal, 16 px vertical
- **Left group**: Back arrow (36 × 36) + 16 px gap + Title text (489 px wide)
- **Right group**: Flexible spacer + chips + timestamp
- **Notification/Profile icons**: Present in frame but **hidden** (`hidden="true"`)

#### Back Button
- **Size**: 36 × 36 px
- **Icon**: Left arrow (white SVG)
- **Cursor**: Pointer
- **Inset**: 17% top/bottom, 16.67% right, 17.33% left

#### Title Text
```
"Task ID: 002 | Daily vehicle check failures"
 ├─ "Task ID: 002 " — Roboto Medium 20px, white
 ├─ "|" — Roboto Medium 20px, #275798
 └─ "Daily vehicle check failures" — Roboto Regular 20px, white
```

### 7.2 Header Chips

Two chips displayed in header, plus timestamp:

| Chip | Type | Background | Text Colour | Font | Size |
|---|---|---|---|---|---|
| **Critical** | Outlined/tinted | `#FECDD2` (red/100) | `#D32F2F` | Roboto Regular 13px | Auto-width |
| **High Priority** | Filled | `#C62828` (error/dark) | `#FFE0E0` | Roboto Medium 14px | 125 px fixed |

- Both chips: `border-radius: 100px` (pill), padding 4 px
- Critical chip has a red dot icon (record) 24 × 24 px before text
- Chip text padding: 6 px horizontal, 3 px vertical
- **Timestamp**: "5 mins ago" — Roboto Regular 14px, `#FAFAFA` (grey/50)
- Gap between chips: 10 px

### 7.3 Left Panel — Task Info Card

- **Width**: 772 px (fixed)
- **Background**: `#FFFFFF`
- **Border**: 1 px solid `#BDBDBD`
- **Border radius**: 8 px
- **Padding**: 16 px
- **Internal gap**: 16 px between sections

#### Info Fields Grid

**Layout**: CSS Grid — 2 columns × 3 rows, 16 px gap

| Position | Field Label | Sample Value |
|---|---|---|
| Row 1, Col 1 | Agent ID / Name | 123456 - Templeton Peck |
| Row 1, Col 2 | Module | Vehicle Check |
| Row 2, Col 1 | Created | 10 Mar 2026, 08:15 |
| Row 2, Col 2 | SLA Deadline | 10 Mar 2026, 09:15 |
| Row 3, Col 1–2 (span) | Description | (Full-width paragraph) |

**Field label typography**: Roboto Regular 16px, colour `#424242` (grey/800), width 125 px
**Field value typography**: Roboto Regular 20px (Body-L), colour `#212121` (text/primary), line-height 1.5

### 7.4 Divider

- **Component**: `<Divider>` horizontal (MUI)
- **Width**: Full card width (740 px usable = 772 − 16 × 2)
- **Position**: Between info fields and Task History
- **Colour**: Standard MUI divider

### 7.5 Task History (Timeline)

- **Section title**: "Task History" — Roboto Medium 20px, `#212121`
- **Layout**: Vertical timeline with 3 items
- **Container padding**: 16 px horizontal
- **Container border radius**: 8 px

#### Timeline Item Structure

Each `<TimelineItem>` has three columns:

```
┌──────────┬───────────┬─────────────────────────────────┐
│ Opposing │ Connector │ Main Content                    │
│ (45px)   │ (12px)    │ (flex: 1)                       │
│          │           │                                 │
│ "10 Mar" │    ●      │ [Avatar] Name | Action desc     │
│ "09:30"  │    │      │ Commented: "message text..."    │
│          │    │      │                                 │
└──────────┴───────────┴─────────────────────────────────┘
```

**Opposing Column** (45 px):
- Date: Roboto Regular 14px, `#757575`, right-aligned
- Time: Roboto Regular 16px, `#757575`, right-aligned

**Connector**:
- Dot: 12 × 12 px ellipse (filled)
- Line: 2 px wide, connects dots vertically

**Main Content** (flex):
- Padding: 12 px left, 12 px top/bottom
- Avatar: 24 × 24 px circular, with initials (e.g., "TP", "JD")
- Gap: 8 px between avatar and text
- **Primary line**: `"{Name} " + " | {Action description}"`
  - Name: Roboto Regular 16px, `#212121`
  - Action: Roboto Regular 14px, `#757575`
- **Secondary line** (optional): `"Commented: {comment text}"`
  - "Commented:": Roboto Regular 14px, `#8E9092`
  - Comment text: Roboto Regular 14px, `#212121`

#### Timeline Items Data

| # | Time | Name | Action | Comment |
|---|---|---|---|---|
| 1 | 10 Mar, 09:30 | Templeton Peck (TP) | The Action in-progressed by 123456 - John Doe | Our agent is on the way and will reach your location within 30 minutes. |
| 2 | 10 Mar, 08:20 | John Doe (JD) | The Escalated to 123456 - John Doe | Our agent is on the way and will reach your location within 30 minutes. |
| 3 | 10 Mar, 08:15 | Templeton Peck (TP) | The Daily vehicle check failures | _(none)_ |

### 7.6 Right Panel — Update Task Status

- **Container width**: flex: 1 within content area
- **Padding**: 8 px horizontal, 16 px vertical
- **Card**: White bg, 1 px solid `#BDBDBD`, border-radius 8 px, padding 16 px
- **Card gap**: 16 px between title and form elements

#### Section Title
- Text: "Update Task Status"
- Typography: Roboto Medium 16px, `#212121` (`alert/title`)
- Width: Full

#### Status Dropdown (`<TextField>` — Select)

| Property | Value |
|---|---|
| **Variant** | Outlined |
| **Size** | Small (42 px height) |
| **Label** | "Status" (floating label above border) |
| **Placeholder** | "Select a status" |
| **Border** | 1 px solid `#BDBDBD` (grey/400) |
| **Border radius** | 8 px |
| **Padding** | 12 px horizontal, 8 px vertical |
| **End adornment** | ExpandMore chevron icon (24 × 24 px) |
| **Text** | Roboto Regular 16px, `#212121` |
| **Label** | Roboto Regular 14px, `#212121` |

**Status options**:

| Value | Display Label |
|---|---|
| _(empty)_ | Select a status |
| `in-progress` | In Progress |
| `escalate` | Escalation |
| `complete` | Action Completed |
| `reassign` | Reassigned |

#### Select Agent/Manager Field (Conditional)

Visible **only** when Status = Escalation or Reassigned.

| Property | Value |
|---|---|
| **Variant** | Outlined (same as Status) |
| **Size** | Small (42 px height) |
| **Label** | "Select Agent/User" (Escalation) or "Select Manager" (Reassigned) |
| **Border** | 1 px solid `#BDBDBD` |
| **Border radius** | 8 px |
| **Placeholder** | "Select an agent" |

#### Comments Textarea (`<TextField>` — Multiline)

| Property | Value |
|---|---|
| **Label** | "Comments (Required)" — displayed above field |
| **Label typography** | Roboto Regular 14px, `#212121` |
| **Variant** | Outlined |
| **Height** | ~109 px container |
| **Border** | 1 px solid `#BDBDBD` (grey/400) |
| **Border radius** | 8 px |
| **Padding** | 12 px horizontal, 16 px vertical |
| **Placeholder** | "Enter your comments..." |
| **Placeholder colour** | `#757575` (text/secondary) |
| **Helper text** | "Min 10 and max 100 characters (X/100)." |
| **Helper typography** | Roboto Regular 12px, `#212121`, right-aligned |
| **Helper tracking** | 0.4 px letter-spacing |
| **Validation** | Min 10, max 100 characters |

#### Action Buttons (Inline in Card)

- **Position**: Below comments, right-aligned (`justify-content: flex-end`)
- **Gap**: 12 px between buttons
- **Padding-top**: 8 px above button row
- **Visibility**: Hidden when Status = "Select a status" (empty); visible for all other statuses

| Button | Style | Background | Text | Border | Radius |
|---|---|---|---|---|---|
| **Cancel** | Outlined | `#FFFFFF` | `var(--color-primary)` | 1 px `#E0E0E0` | 8 px |
| **Action** | Filled | `var(--color-primary)` | `#FFFFFF` | None | 8 px |

**Action button label changes dynamically**:

| Status | Button Label |
|---|---|
| Escalation | ESCALATE |
| Reassigned | REASSIGN |
| Action Completed | COMPLETE |
| In Progress | SUBMIT |

Both buttons: min-height 44 px, min-width 110 px, Roboto Medium 14px, 0.4 px letter-spacing.

### 7.7 Confirmation Dialogs

Triggered by clicking the action button. Modal overlay with semi-transparent backdrop (`rgba(0,0,0,0.45)`).

#### Common Dialog Properties

| Property | Value |
|---|---|
| **Width** | 460 px |
| **Background** | `#FFFFFF` |
| **Border radius** | 12 px |
| **Padding** | 20 px |
| **Gap** | 24 px between content and buttons |
| **Overlay** | Fixed, full-screen, `rgba(0,0,0,0.45)` |

#### Variant A — Action Completed

**Source Frame**: [node-id=26724-108674](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=26724-108674&m=dev)

| Element | Spec |
|---|---|
| **Icon** | Green checkmark SVG, 36 × 36 px |
| **Title** | "Confirm: Mark as Complete" — Roboto Medium 20px, `#43A047` (success) |
| **Body** | 18px: "You are about to mark **Task ID: 003 \| Daily vehicle check failures** as **Complete**." |
| **Alert banner** | Background `#FFF3E0` (orange/50), border-radius 8px, padding 6px 16px |
| **Alert icon** | WarningAmber outlined, 48 × 48 px, fill `#ED6C02` |
| **Alert title** | "Note" — Roboto Medium 16px, `#CC630C` |
| **Alert description** | "Task will be moved to the Completed tab, SLA status will be recorded as Inside SLA & This action will be logged in the task history." — Roboto Regular 14px, `#CC630C` |
| **Cancel button** | Outlined, border `#A2C1EA`, radius 10px, text `#3276CF`, uppercase |
| **Submit button** | "Confirm" — Filled `#3276CF`, radius 8px, white text, uppercase |

#### Variant B — Reassigned

**Source Frame**: [node-id=26724-108719](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=26724-108719&m=dev)

| Element | Spec |
|---|---|
| **Icon** | Warning triangle SVG, 36 × 36 px, fill `#ED6C02` |
| **Title** | "Critical : Reassigned" — Roboto Medium 20px, `#ED6C02` (orange/warning) |
| **Body** | 18px: "You are about to mark **Task ID: 003 \| Daily vehicle check failures.** Assigned to: **{Agent Name}**" |
| **Cancel button** | Outlined, border `#A2C1EA`, radius 10px, text `#3276CF`, uppercase |
| **Submit button** | "Confirm Reassign" — Filled `#3276CF`, radius 8px, white text, uppercase |

#### Variant C — Escalated

**Source Frame**: [node-id=26724-108752](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=26724-108752&m=dev)

| Element | Spec |
|---|---|
| **Icon** | Warning triangle SVG, 36 × 36 px, fill `#ED6C02` |
| **Title** | "Critical : Escalated" — Roboto Medium 20px, `#ED6C02` (orange/warning) |
| **Body** | 18px: "You are about to mark **Task ID: 003 \| Daily vehicle check failures.** Escalation to: **{Agent Name}**" |
| **Cancel button** | Outlined, border `#A2C1EA`, radius 10px, text `#3276CF`, uppercase |
| **Submit button** | "Confirm Escalation" — Filled `#3276CF`, radius 8px, white text, uppercase |

#### Dialog Button Shared Specs

- Both buttons: `flex: 1`, gap 24 px
- Min height: 48 px, min width: 120 px
- Font: Roboto Medium 15px, letter-spacing 0.46 px, uppercase
- Cancel: `color: #3276CF`, border `1px solid #A2C1EA`, border-radius 10px
- Submit: `background: #3276CF`, `color: #FFFFFF`, border-radius 8px

#### CTA Redirections

| Dialog | Cancel | Confirm |
|---|---|---|
| Action Completed | Stay on Screen 2 | Navigate to Screen 1 (Dashboard) |
| Reassigned | Stay on Screen 2 | Navigate to Screen 1 (Dashboard) |
| Escalated | Stay on Screen 2 | Navigate to Screen 1 (Dashboard) |

---

## 8. Interaction States & Behaviour

### Navigation
- **Back button**: Returns to task list (Screen 1)
- **Cursor**: Pointer on back arrow

### Status Update Flow
1. User selects status from dropdown
2. If Escalation or Reassigned → "Select Agent/User" or "Select Manager" field appears
3. User enters comment (required, 10–100 chars)
4. Character counter updates dynamically: "(X/100)"
5. Cancel + Action buttons appear (hidden when no status selected)
6. Clicking action button opens confirmation dialog
7. Cancel on dialog → returns to Screen 2 form
8. Confirm on dialog → navigates to Screen 1 (Dashboard)

### Status-Dependent Form Behaviour

| Status | Agent/Manager Field | Field Label | Action Button |
|---|---|---|---|
| _(empty)_ | Hidden | — | Hidden |
| In Progress | Hidden | — | SUBMIT |
| Escalation | Visible | "Select Agent/User" | ESCALATE |
| Action Completed | Hidden | — | COMPLETE |
| Reassigned | Visible | "Select Manager" | REASSIGN |

### Cancel Button Behaviour
- Resets status dropdown to "Select a status"
- Hides agent/manager field
- Clears comments textarea
- Hides action buttons

### Confirmation Dialog Flow
| Status | Dialog Variant | Confirm Label | Icon |
|---|---|---|---|
| Action Completed | Green check + alert banner | Confirm | ✓ Green |
| Reassigned | Orange warning | Confirm Reassign | ⚠ Orange |
| Escalation | Orange warning | Confirm Escalation | ⚠ Orange |

---

## 9. MUI Component Mapping

| Figma Element | MUI Component | Props |
|---|---|---|
| Header bar | `<AppBar>` | `position="static"`, custom bg |
| Back arrow | `<IconButton>` | `<ArrowBack />` icon |
| Critical chip | `<Chip>` | `color="error"`, `variant="outlined"`, `size="medium"` |
| High Priority chip | `<Chip>` | `color="error"`, `variant="filled"`, custom bg `#C62828` |
| Info card | `<Card>` / `<Paper>` | `elevation={0}`, `variant="outlined"` |
| Info fields grid | `<Grid>` | `container`, `columns={2}`, `spacing={2}` |
| Divider | `<Divider>` | Default horizontal |
| Task History title | `<Typography>` | `variant="h6"` |
| Timeline | `<Timeline>` | MUI Lab timeline |
| Timeline item | `<TimelineItem>` | With `<TimelineOppositeContent>`, `<TimelineSeparator>`, `<TimelineContent>` |
| Timeline dot | `<TimelineDot>` | `variant="filled"` |
| Timeline connector | `<TimelineConnector>` | Default |
| Avatar | `<Avatar>` | `variant="circular"`, `sx={{ width: 24, height: 24 }}` |
| Status dropdown | `<TextField>` | `select`, `variant="outlined"`, `size="small"` |
| Agent/Manager dropdown | `<TextField>` | `select`, `variant="outlined"`, `size="small"`, conditional |
| Comments field | `<TextField>` | `multiline`, `variant="outlined"`, `rows={4}` |
| Form card | `<Card>` | `elevation={0}`, `variant="outlined"` |
| Cancel button | `<Button>` | `variant="outlined"`, `disableElevation` |
| Action button | `<Button>` | `variant="contained"`, `disableElevation` |
| Confirm dialog | `<Dialog>` | `maxWidth="sm"`, `fullWidth` |
| Dialog cancel | `<Button>` | `variant="outlined"` |
| Dialog confirm | `<Button>` | `variant="contained"`, `disableElevation` |
| Alert banner | `<Alert>` | `severity="warning"`, `variant="filled"` (custom bg) |

---

## 10. Accessibility Notes

- **Back button**: Must have `aria-label="Go back to task list"`
- **Header title**: Includes Task ID for screen reader identification
- **Chips**: Convey priority/criticality — should have `role="status"` or equivalent
- **Info fields**: Use `<dl>` (definition list) or labelled `<div>` pairs for label/value
- **Timeline**: Use ordered list semantics; each item should include date+time in `aria-label`
- **Status dropdown**: Label "Status" must be programmatically associated
- **Comments textarea**: Label "Comments (Required)" must use `required` attribute
- **Helper text**: Associate with field via `aria-describedby`
- **Character counter**: Live region for dynamic update announcements
- **Focus order**: Back button → Chips → Info fields → Timeline → Status → Agent/Manager (if visible) → Comments → Cancel → Action button
- **Confirmation dialog**: When open, trap focus within dialog; Escape key closes dialog
- **Dialog buttons**: Must be keyboard accessible; confirm button should have `aria-label` describing the action

---

## 11. Assets Referenced

| Asset | Type | Size | Usage |
|---|---|---|---|
| Back arrow (left) | SVG | 36 × 36 px | Header back navigation |
| ExpandMore icon | SVG | 24 × 24 px | Status & agent dropdown end adornment |
| Record dot icon | SVG | 24 × 24 px (inner 58%) | Critical chip indicator dot |
| Timeline connector | SVG | 12 × 168 px | Dot + vertical line |
| Avatar placeholder | PNG | 24 × 24 px | Timeline user avatars |
| Divider | SVG | Full-width × 1 px | Horizontal separator |
| Warning triangle | SVG | 36 × 36 px | Confirmation dialog icon (Escalate/Reassign), fill `#ED6C02` |
| Green checkmark | SVG | 36 × 36 px | Confirmation dialog icon (Complete), fill `#43A047` |
| WarningAmber outlined | SVG | 48 × 48 px | Alert banner icon in Complete dialog, fill `#ED6C02` |

---

## 12. Key Differences from Task Dashboard (Screen 1)

| Aspect | Dashboard (Screen 1) | Task Detail (Screen 2) |
|---|---|---|
| **Header bg** | White/light | Dark `#182A48` |
| **Navigation** | Full sidebar with nav items | No sidebar (full-width, back arrow only) |
| **Layout** | Single column (list) | Two-column (info + form) |
| **Cards** | Outlined with coloured left border | Outlined, plain |
| **Border radius** | 4 px (cards) | 8 px (cards & inputs) |
| **Elevation** | elevation/1 on some elements | No elevation (all flat/outlined) |
| **Primary typography** | body2 (14px) for content | Body-L (20px) for field values |
| **Chips in header** | None | Critical + High Priority |
| **Form elements** | Search only | Status dropdown + Agent/Manager dropdown (conditional) + Comments textarea |
| **Timeline** | Not present | Full task history with avatars |
| **Confirmation dialogs** | Not present | 3 variants (Complete, Reassign, Escalate) with modal overlay |
