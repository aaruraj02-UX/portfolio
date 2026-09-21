# Figma Design Guidelines — Web View Details Panel

> **Source Figma Frame**: [Task-view (node-id=26724:104174)](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=26724-104174&m=dev)
> **Platform**: Web Application (Desktop) — Right-side slide-in panel
> **Design System**: MET-DS-V2
> **Prototype**: `UX_Deliverables/prototype/web/tasks.html`
> **Adapted From**: Tablet task detail view (1280 × 800 px) → Web side panel (50 rem / 800 px)
> **Generated**: 2026-03-27

---

## 1. Panel Shell & Layout

The View Details panel is a **right-side slide-in drawer** that overlays the main content with a dimmed backdrop. It uses a **two-column bottom layout** — Task History on the left, Status form on the right — beneath a shared info section.

| Property | Value | Notes |
|---|---|---|
| **Panel width** | 50 rem (800 px) | `.vd-panel` — wider to accommodate two-column bottom |
| **Panel height** | 100vh | Full viewport height |
| **Position** | `fixed`, `top: 0`, `right: 0` | Slides in from right |
| **z-index** | 101 | Above overlay (100) |
| **Structure** | White header bar + Scrollable body (single white surface) | No separate cards — flat layout |
| **Transition** | `transform 0.25s ease-out` | Slide animation |
| **Overlay** | `rgba(0,0,0,0.35)` | Semi-transparent backdrop |

### Panel Structure

```
┌─────────────────────────────────────────────────────┐
│  Header Bar (white, border-bottom)                   │
│  "Task - #001"  │  [Critical] 📅 21/12/2024  ✕      │
├─────────────────────────────────────────────────────┤
│  Scrollable Body (flex: 1, overflow-y)               │
│  Background: #FFFFFF (white)                         │
│  Padding: 16px 24px                                  │
│                                                      │
│  Agent ID/Name  │  Module  │  Reason   (3-col grid)  │
│                                                      │
│  Description (red label)                             │
│  "The assigned field agent is currently..."          │
│                                                      │
│  ─── Divider (grey-300) ───                          │
│                                                      │
│  ┌──────────────────┬──────────────────────────────┐ │
│  │ Task History      │ Status                       │ │
│  │                   │ [Select a Status ▾]          │ │
│  │ 13 Oct • TP       │                              │ │
│  │ 09:58  │ Action.. │ Comments (Required)          │ │
│  │        │          │ ┌────────────────────┐       │ │
│  │ 13 Oct • JD       │ │                    │       │ │
│  │ 09:58  │ Escalat. │ └────────────────────┘       │ │
│  │        │          │ Min 10 and max 100 (71/100)  │ │
│  │ 13 Oct • TP       │                              │ │
│  │ 09:58  │ Daily..  │                              │ │
│  └──────────────────┴──────────────────────────────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 2. Typography

**Font Family**: `Roboto` (Google Fonts) / system fallback: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`

| Style Name | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| **Header title** | 16 px | 700 (Bold) | — | — | "Task - #001" |
| **Body-L (values)** | 16 px | 400 (Regular) | 1.5 | 0.15 px | Info field values, section titles |
| **body1 (labels)** | 14 px | 400 (Regular) | 1.5 | 0.15 px | Info field labels |
| **body1-medium** | 14 px | 500 (Medium) | 1.5 | 0.15 px | Description label, section titles |
| **body2** | 14 px | 400 (Regular) | 1.43 | 0.17 px | Timeline action text, description body, form labels |
| **caption** | 12 px | 400 (Regular) | 1.66 | 0.4 px | Timeline timestamps, helper text, avatar initials |
| **chip** | 12 px | 500 (Medium) | 20 px | 0.16 px | Status chip label |
| **input/value** | 14 px | 400 (Regular) | 24 px | 0.15 px | Form field values |
| **input/label** | 12 px | 500 (Medium) | 14 px | 0.15 px | Form field labels |
| **input/helper** | 12 px | 400 (Regular) | 1.66 | 0.4 px | Helper text below textarea |
| **button** | 14 px | 500 (Medium) | 26 px | 0.4 px | Button labels, uppercase |
| **header date** | 14 px | 400 (Regular) | — | — | Date in header |

---

## 3. Colour Palette

### Panel Shell

| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| **Header bg** | `#FFFFFF` | `--color-card` | White header bar |
| **Header text** | `#212121` | `--text-primary` | Title text |
| **Header border** | `#E0E0E0` | `--border-default` | 1px solid bottom border |
| **Content bg** | `#FFFFFF` | `--color-card` | Scrollable body background |
| **Overlay** | `rgba(0,0,0,0.35)` | — | Backdrop behind panel |

### Borders & Dividers

| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| **Divider** | `#E0E0E0` | `--grey-300` | Horizontal divider between info & bottom section |
| **Input border** | `#BDBDBD` | `--grey-400` | Form field borders |

### Text

| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| **Text primary** | `#212121` | `--text-primary` | Body text, field values, title |
| **Text secondary** | `#757575` | `--text-secondary` | Close icon, header date, timeline text |
| **Info labels** | `#424242` | `--grey-800` | "Agent ID / Name", "Module", "Reason" |
| **Description label** | `#E53935` | `--color-error` | Red "Description" label |
| **Timeline action** | `#757575` | `--text-secondary` | Action description text |
| **Timeline comment label** | `#8E9092` | — | "Commented:" prefix |

### Status Chip

| Chip | Background | Text |
|---|---|---|
| **Critical** | `#E53935` (`--color-error`) | `#FFFFFF` |

### Button Colours

| Button | Background | Text | Border | Hover Bg |
|---|---|---|---|---|
| **Cancel (outlined)** | transparent | `#3276CF` | 1px solid `#BDBDBD` | `#F2F5FA` |
| **Primary action** | `#3276CF` | `#FFFFFF` | none | `#2C66B4` |
| **Success (Complete)** | `#43A047` | `#FFFFFF` | none | `#388E3C` |
| **Danger (Escalate)** | `#E53935` | `#FFFFFF` | none | `#D32F2F` |
| **Warning (Reassign)** | `#E56800` | `#FFFFFF` | none | `#BF5700` |

---

## 4. Spacing

Based on **8pt grid** (MUI spacing base = 4px).

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 2 px | Micro gaps |
| `--space-2` | 4 px | Button icon gaps, label-value gap |
| `--space-3` | 8 px | Chip gaps, header chip area gap |
| `--space-4` | 12 px | Header gap, timeline content padding, bottom-left gap |
| `--space-5` | 16 px | Body vertical padding, info grid gap, divider margin, bottom-right gap |
| `--space-7` | 24 px | Body horizontal padding, bottom column gap |

### Specific Measurements

| Element | Value |
|---|---|
| Header bar min-height | 56 px |
| Header horizontal padding | 24 px |
| Header vertical padding | 16 px |
| Close button (✕) | 32 × 32 px |
| Gap: title to chips | 12 px |
| Body padding | 16px 24px |
| Info grid gap | 16 px |
| Info grid columns | 3 (equal) |
| Description label margin-bottom | 4 px |
| Divider margin | 16px 0 (top & bottom) |
| Bottom columns gap | 24 px |
| Timeline opposing column | 45 px |
| Timeline dot size | 10 × 10 px |
| Timeline connector width | 2 px |
| Timeline content left padding | 12 px |
| Timeline avatar | 24 × 24 px circle |
| Button min-height | 40 px |
| Button min-width | 110 px |
| Button gap | 12 px |

---

## 5. Border Radius

| Element | Radius |
|---|---|
| **Input fields** | 8 px |
| **Buttons** | 8 px |
| **Cancel button** | 8 px |
| **Status chip** | 100 px (pill) |
| **Timeline avatars** | 50% (circle) |
| **Close button** | 50% (circle) |
| **Confirmation dialog** | 12 px |

---

## 6. Elevation & Shadows

| Element | Elevation | Border |
|---|---|---|
| **Panel** | `0 8px 32px rgba(0,0,0,0.18)` | None |
| **Header bar** | None | 1px solid `#E0E0E0` bottom |
| **Input fields** | None | 1px solid `#BDBDBD` |
| **Overlay** | — | — |

---

## 7. Component Specifications

### 7.1 Header Bar

| Property | Value |
|---|---|
| **Min height** | 56 px |
| **Background** | `#FFFFFF` (`--color-card`) |
| **Border** | 1px solid `#E0E0E0` bottom |
| **Layout** | Flexbox row, center-aligned, gap 12px |
| **Padding** | 16px 24px |
| **Text colour** | `#212121` |

**Contents (left → right):**
1. **Title block** (flex: 1): "Task - #001" — Roboto Bold 16px, `#212121`. Overflow: ellipsis.
2. **Chips area**: Critical status chip (filled red) + calendar icon with date (`#757575`, 14px)
3. **Close button (✕)**: 32×32px, circular, transparent bg, `#757575` icon, hover `#F5F5F5` bg

### 7.2 Status Chip (Header)

| Property | Value |
|---|---|
| **Background** | `#E53935` (`--color-error`) |
| **Text** | `#FFFFFF` |
| **Font** | 12px Medium |
| **Padding** | 2px 10px |
| **Radius** | 100px (pill) |
| **Line height** | 20px |
| **Visibility** | Shown when `slaStatus === 'critical'`; hidden otherwise |

### 7.3 Header Date

| Property | Value |
|---|---|
| **Icon** | `calendar_today` (Material Icons Outlined), 18px |
| **Text** | Date string (e.g. "21/12/2024 10:10"), 14px Regular |
| **Colour** | `#757575` (`--text-secondary`) |
| **Layout** | Flex row, gap 4px, vertically centered |

### 7.4 Info Fields Section

No card wrapper — fields sit directly on the white body surface.

#### Info Fields Grid

**Layout**: CSS Grid — **3 columns** (equal), 16px gap

| Col 1 | Col 2 | Col 3 |
|---|---|---|
| Agent ID / Name | Module | Reason |

- **Label**: 14px Regular, `#424242` (`--grey-800`)
- **Value**: 16px Regular, `#212121` (`--text-primary`)
- **Label-to-value gap**: 4px

### 7.5 Description Section

Immediately below the info fields grid (within the same container, 16px gap).

| Element | Spec |
|---|---|
| **Label** | "Description" — 14px Medium, `#E53935` (red accent) |
| **Label margin-bottom** | 4px |
| **Body text** | 14px Regular, `#212121`, line-height 1.57 |

### 7.6 Divider

- Full body width (flush to 24px padding edges)
- 1px solid `#E0E0E0` (`--grey-300`)
- Margin: 16px 0 (top & bottom)
- Between info/description section and bottom two-column layout

### 7.7 Two-Column Bottom Layout

| Property | Value |
|---|---|
| **Layout** | CSS Grid, `1fr 1fr` |
| **Gap** | 24px (`--space-7`) |
| **Left column** | Task History |
| **Right column** | Status form + Comments + CTA buttons |

### 7.8 Task History (Timeline) — Left Column

- **Section title**: "Task History" — 16px Medium, `#212121`
- **Container**: vertical flex, gap 12px between title and timeline

#### Timeline Item Structure

```
┌──────────┬───────────┬─────────────────────────────┐
│ Opposing │ Connector │ [Avatar] Main Content        │
│ (45px)   │ (12px)    │                              │
│          │           │                              │
│ "13 Oct" │    ●      │ [TP] Name | Action desc      │
│ "09:58"  │    │      │      Commented: "message..." │
└──────────┴───────────┴─────────────────────────────┘
```

**Opposing Column** (45px, right-aligned):
- Date: 12px Regular, `#757575`
- Time: 12px Regular, `#757575`

**Connector**:
- Dot: 10×10px circle, filled `#3276CF`
- Line: 2px wide, `#E0E0E0`, vertical between dots
- Last item: no line

**Avatar** (inline with content):
- Size: 24×24px circle
- Background: `#3276CF` (`--color-primary`)
- Text: 12px Regular, `#FFFFFF`, initials (e.g. "TP", "JD")
- Gap: 8px between avatar and text

**Main Content** (flex: 1):
- Padding-left: 12px
- **Name**: 16px Medium, `#212121`
- **Action**: 14px Regular, `#757575`, prefixed with `|`
- **Comment label**: 14px Regular, `#8E9092` ("Commented:")
- **Comment body**: 14px Regular, `#212121`

### 7.9 Status Form — Right Column

No card wrapper — form fields sit directly in the right column.

#### Status Dropdown

| Property | Value |
|---|---|
| **Variant** | Outlined |
| **Height** | 40px |
| **Label** | "Status" (above field) |
| **Placeholder** | "Select a Status" |
| **Border** | 1.5px solid `#BDBDBD` |
| **Border radius** | 8px |
| **Font** | 14px Regular, `#212121` |

**Status options:**

| Value | Display Label |
|---|---|
| _(empty)_ | Select a Status |
| `completed` | Action Completed |
| `escalation` | Escalation |
| `reassigned` | Reassigned |
| `reprioritise` | Reprioritise |
| `cancelled` | Cancelled (Action no longer required) |

#### Conditional Fields

| Status | Field Visible | Field Label |
|---|---|---|
| Action Completed | — | — |
| Escalation | Agent dropdown | "Select Agent/User" |
| Reassigned | Manager dropdown | "Select Manager" |
| Reprioritise | Priority dropdown | "Change Priority" |
| Cancelled | — | — |

#### Comments Textarea

| Property | Value |
|---|---|
| **Label** | "Comments (Required)" |
| **Variant** | Outlined |
| **Min height** | 90px |
| **Border** | 1.5px solid `#BDBDBD` |
| **Border radius** | 8px |
| **Placeholder** | "Enter your comments..." |
| **Placeholder colour** | `#757575` |
| **Helper text** | "Min 10 and max 100 characters (X/100)." |
| **Helper** | 12px Regular, right-aligned |
| **Validation** | Min 10, max 100 characters |

#### Action Buttons

- **Layout**: Flex row, `justify-content: flex-end`, gap 12px
- **Visibility**: Hidden when no status selected; visible otherwise

| Button | Style | Background | Text | Border | Min-Width |
|---|---|---|---|---|---|
| Cancel | Outlined | transparent | `#3276CF` | 1px solid `#BDBDBD` | 110px |
| Action | Filled | varies by status | `#FFFFFF` | none | 110px |

**Action button label & colour by status:**

| Status | Button Label | Button Background | Hover Background |
|---|---|---|---|
| Action Completed | COMPLETE | `#43A047` | `#388E3C` |
| Escalation | ESCALATE | `#E53935` | `#D32F2F` |
| Reassigned | REASSIGN | `#E56800` | `#BF5700` |
| Reprioritise | SAVE | `#3276CF` | `#2C66B4` |
| Cancelled | SAVE | `#3276CF` | `#2C66B4` |

Both buttons: min-height 40px, border-radius 8px, 14px Medium text, uppercase, 0.4px letter-spacing.

---

## 8. Confirmation Dialogs

Triggered by clicking the action button. Modal overlay with semi-transparent backdrop.

### Common Dialog Properties

| Property | Value |
|---|---|
| **Width** | 460px |
| **Background** | `#FFFFFF` |
| **Border radius** | 12px |
| **Padding** | 20px |
| **Gap** | 24px between content and buttons |
| **Overlay** | Fixed, full-screen, `rgba(0,0,0,0.45)` |
| **z-index** | 1100 (above panel) |

### Variant A — Action Completed

| Element | Spec |
|---|---|
| **Icon** | Green checkmark, 36×36px, `#43A047` |
| **Title** | "Confirm: Mark as Complete" — 20px Medium, `#43A047` |
| **Body** | "You are about to mark **Task - #XXX \| Title** as **Complete**." — 18px |
| **Alert banner** | Background `#FFF3E0`, radius 8px, padding 6px 16px |
| **Alert icon** | Warning amber, 48×48px, `#ED6C02` |
| **Alert title** | "Note" — 16px Medium, `#CC630C` |
| **Alert body** | "Task will be moved to the Completed tab..." — 14px, `#CC630C` |

### Variant B — Reassigned

| Element | Spec |
|---|---|
| **Icon** | Warning triangle, 36×36px, `#ED6C02` |
| **Title** | "Critical : Reassigned" — 20px Medium, `#ED6C02` |
| **Body** | "You are about to mark **Task - #XXX \| Title**. Assigned to: **{Manager}**" — 18px |

### Variant C — Escalated

| Element | Spec |
|---|---|
| **Icon** | Warning triangle, 36×36px, `#ED6C02` |
| **Title** | "Critical : Escalated" — 20px Medium, `#ED6C02` |
| **Body** | "You are about to mark **Task - #XXX \| Title**. Escalation to: **{Agent}**" — 18px |

### Dialog Buttons (Shared)

| Button | Style | Background | Text | Border | Radius |
|---|---|---|---|---|---|
| Cancel | Outlined | transparent | `#3276CF` | 1px `#A2C1EA` | 10px |
| Confirm | Filled | `#3276CF` | `#FFFFFF` | none | 8px |

- Both: `flex: 1`, min-height 48px, min-width 120px
- Font: 15px Medium, 0.46px letter-spacing, uppercase, `font-family: Roboto`
- Gap between buttons: 24px

### Confirm Button Labels

| Dialog | Confirm Label |
|---|---|
| Action Completed | CONFIRM |
| Reassigned | CONFIRM REASSIGN |
| Escalated | CONFIRM ESCALATION |

---

## 9. Interaction States & Behaviour

### Panel Open/Close
- **Open trigger**: Click "VIEW DETAILS" button on task card
- **Close triggers**: Close ✕ button, overlay click, Escape key
- **Animation**: `translateX(100%)` → `translateX(0)` (0.25s ease-out)
- **Body scroll**: Disabled when panel open (`overflow: hidden`)

### Status Update Flow
1. User selects status from dropdown (right column)
2. Conditional field appears (Escalation → Agent, Reassigned → Manager, Reprioritise → Priority)
3. Comments field appears with character counter
4. Cancel + Action buttons appear
5. Action button click → validation (min 10 chars) → confirmation dialog
6. Cancel on dialog → returns to form
7. Confirm on dialog → closes panel, returns to task list

### Status-Dependent Form Behaviour

| Status | Extra Field | Field Label | Action Button |
|---|---|---|---|
| _(empty)_ | Hidden | — | Hidden |
| Action Completed | None | — | COMPLETE |
| Escalation | Agent dropdown | "Select Agent/User" | ESCALATE |
| Reassigned | Manager dropdown | "Select Manager" | REASSIGN |
| Reprioritise | Priority dropdown | "Change Priority" | SAVE |
| Cancelled | None | — | SAVE |

### Cancel Button Behaviour
- Resets status dropdown to "Select a Status"
- Hides conditional fields
- Clears comments textarea and counter
- Hides action buttons
- Does NOT close the panel

### Input Focus States
- Border colour: `#3276CF`
- Box shadow: `0 0 0 3px rgba(50,118,207,0.12)`
- Transition: 150ms

### Button Hover States
- Outlined buttons: background `#F2F5FA`
- Filled buttons: darker shade (see colour table §3)
- Close button (✕): background `#F5F5F5`

---

## 10. Accessibility Notes

- **Panel role**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title
- **Close button**: `aria-label="Close panel"`
- **Overlay**: `aria-hidden` toggles with open/close
- **Status chip**: Convey priority — semantic context in `aria-label`
- **Info fields**: Use label/value pairs with proper association
- **Status dropdown**: Label must be programmatically associated (`for` / `id`)
- **Comments textarea**: `required` attribute, `aria-describedby` for helper text
- **Character counter**: Live region for dynamic updates
- **Focus order**: Title → Close button → Info fields → Timeline → Status dropdown → Conditional field → Comments → Cancel → Action
- **Confirmation dialog**: Trap focus within; Escape closes
- **Keyboard**: All interactive elements keyboard-accessible

---

## 11. MUI Component Mapping (React Handoff)

| Element | MUI Component | Key Props |
|---|---|---|
| Panel | `<Drawer>` | `anchor="right"`, `variant="temporary"`, width `50rem` |
| Header bar | `<Box>` | `sx={{ bgcolor: '#FFF', borderBottom: '1px solid #E0E0E0' }}` |
| Close button | `<IconButton>` | `<Close />`, `sx={{ color: '#757575' }}` |
| Status chip | `<Chip>` | `size="small"`, `color="error"`, `variant="filled"` |
| Info grid | `<Grid>` | `container`, `columns={3}`, `spacing={2}` |
| Description label | `<Typography>` | `variant="body2"`, `sx={{ color: 'error.main', fontWeight: 500 }}` |
| Divider | `<Divider>` | `sx={{ my: 2 }}` |
| Bottom layout | `<Grid>` | `container`, `columns={2}`, `spacing={3}` |
| Timeline | `<Timeline>` | MUI Lab `@mui/lab` |
| Timeline avatar | `<Avatar>` | `sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: 12 }}` |
| Status dropdown | `<TextField>` | `select`, `variant="outlined"`, `size="small"` |
| Conditional dropdowns | `<TextField>` | `select`, `variant="outlined"`, `size="small"`, conditional render |
| Comments | `<TextField>` | `multiline`, `variant="outlined"`, `rows={4}`, `inputProps={{ maxLength: 100 }}` |
| Cancel button | `<Button>` | `variant="outlined"`, `disableElevation` |
| Action button | `<Button>` | `variant="contained"`, `disableElevation`, dynamic colour |
| Confirm dialog | `<Dialog>` | `maxWidth="sm"`, `fullWidth` |

---

## 12. Key Differences from Tablet Task Detail

| Aspect | Tablet (Figma) | Web Side Panel |
|---|---|---|
| **Layout** | Full-screen, 2-column (772px + flex-1) | 800px side panel, 2-column bottom layout |
| **Header** | Dark navy `#182A48`, back arrow, title + pipe + name | White bg, "Task - #XXX", close ✕, Critical chip + date |
| **Header height** | 72px | 56px (min-height) |
| **Info fields** | 2 columns (Agent, Module, Created, SLA) | 3 columns (Agent, Module, Reason) |
| **Description** | Inside info card, regular label | Separate section, red label accent |
| **Body background** | `#F2F5FA` (grey) | `#FFFFFF` (white, flat) |
| **Cards** | Outlined cards with `#BDBDBD` borders | No card wrappers — flat surface |
| **Task History + Status** | Stacked vertically in separate cards | Side-by-side in two-column grid |
| **CTA buttons** | Inside status card, right-aligned | Inside right column, right-aligned |
| **Navigation** | Full page back button | Panel close (✕ button, overlay click, Escape) |
| **Sidebar** | None (full-width detail) | Main page sidebar remains visible |
| **Confirmation dialog** | Modal overlay | Modal overlay over panel |
