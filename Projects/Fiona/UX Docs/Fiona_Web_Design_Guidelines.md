# FinOps — Web Application Design Guidelines

> **Application:** FinOps — *Enterprise Finance Automation Platform*
> **Platform:** Web (desktop-first, responsive)
> **Design System:** Based on MET-DS-V2 with FinOps-specific customisations
> **Last Updated:** 7 April 2026

---

## 1. Brand Identity

| Property | Value |
|---|---|
| App Name | FinOps |
| Tagline | Enterprise Finance Automation Platform |
| Logo File | `images/fiona.svg` |
| Logo Brand Blue | `#1F3C88` |
| Logo Accent (info) | `#03A9F4` |
| Logo Accent (secondary) | `#56AAC4` |
| Logo Sub-text | `#757575` |

- The logo must always appear in the **top-left** of the top navigation bar.
- The tagline sits directly below the logo text in the nav bar at 16 px Medium, secondary colour.
- Minimum clear-space around the logo: 24 px.

---

## 2. Colour Palette

### 2.1 Primary Scale

| Token | Hex | Usage |
|---|---|---|
| `--color-primary-25` | `#F2F5FA` | Page background |
| `--color-primary-50` | `#DEE8F7` | Icon circle backgrounds, hover tint |
| `--color-primary-100` | `#A2C1EA` | Info background |
| `--color-primary-500` | `#3276CF` | Primary brand / actions |
| `--color-primary-600` | `#2C66B4` | Primary hover |
| `--color-primary-700` | `#275798` | Info text / dark accent |
| `--color-primary-975` | `#0C1A2D` | Dark theme background |

### 2.2 Semantic Colours

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#3276CF` | Buttons, links, active states |
| `--color-primary-hover` | `#2C66B4` | Hover on primary elements |
| `--color-bg` | `#F2F5FA` | Page / shell background |
| `--color-card` | `#FFFFFF` | Card surfaces, nav bar |
| `--color-disabled` | `#BDBDBD` | Disabled controls |

### 2.3 Text Colours

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#212121` | Headings, body text, card titles |
| `--text-secondary` | `#757575` | Sub-headings, descriptions, labels |
| `--text-hyperlink` | `#3276CF` | Links |
| `--text-hyperlink-hover` | `#2C66B4` | Links on hover |
| `--text-disabled` | `#BDBDBD` | Disabled text |

### 2.4 State Colours

| State | Default | Hover | Background |
|---|---|---|---|
| Success | `#43A047` | `#388E3C` | `#E8F5E9` |
| Error | `#E53935` | `#D32F2F` | `#FEEBEE` |
| Warning | `#EF6C00` | `#F57C00` | `#FFF3E0` |
| Info | `#3276CF` | `#2C66B4` | `#A2C1EA` |

### 2.5 Divider & Border

| Token | Value |
|---|---|
| Divider (Figma) | `rgba(22, 43, 72, 0.12)` |
| Default border | `1px solid #E0E0E0` |
| Subtle divider | `1px solid #EEEEEE` |

### 2.6 Notification Badge

| Property | Value |
|---|---|
| Background | `#EF6C00` (warning/main) |
| Text | `#FFFFFF` |
| Border-radius | `100px` (pill) |
| Font | 12 px Medium |

---

## 3. Typography

### 3.1 Font Family

```
Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif
```

Load via Google Fonts: `Roboto:wght@400;500;600;700`

### 3.2 Type Scale

| Style | Size | Weight | Line-Height | Letter-Spacing | Usage |
|---|---|---|---|---|---|
| H4 / Display | 24 px | 700 (Bold) | 1.334 | 0 | Status card numbers |
| H5 / Page Title | 24 px | 600 (Semi-bold) | 1.334 | 0 | Greeting headline (bold part) |
| H5 / Regular | 24 px | 400 (Regular) | 1.334 | 0 | Greeting date portion |
| Subtitle / Module Title | 20 px | 400 (Regular) | 20 px | 0.14 px | Module card titles |
| Body 1 / Section Label | 16 px | 500 (Medium) | 1.5 | 0.15 px | Category headers, tagline, status labels |
| Body 2 | 14 px | 400 (Regular) | 1.43 | 0.17 px | Module card descriptions |
| Caption / Badge | 12 px | 500 (Medium) | 20 px | 0.14 px | Badge labels, small annotations |

### 3.3 Rules

- **Never** use more than four type sizes on a single page.
- Headings use `font-weight: 600` or `700`; body uses `400` or `500`.
- All text must meet **WCAG 2.2 AA** contrast ratios (4.5:1 for normal text, 3:1 for large text).
- Avoid `font-size` below 12 px anywhere in the application.

---

## 4. Spacing System — 8 pt Grid

All spacing values must be multiples of the 8 pt base (with 2 px and 4 px permitted for fine adjustments).

| Token | px |
|---|---|
| `--space-1` | 2 |
| `--space-2` | 4 |
| `--space-3` | 8 |
| `--space-4` | 12 |
| `--space-5` | 16 |
| `--space-6` | 20 |
| `--space-7` | 24 |
| `--space-8` | 32 |
| `--space-9` | 40 |
| `--space-10` | 48 |

### Figma-Specific Spacing Variables

| Figma Variable | Value | Use |
|---|---|---|
| `--2` | 16 px | Card padding, card radius |
| `--3` | 24 px | Status card horizontal padding |
| `--4` | 32 px | Left sidebar top padding, gap |

---

## 5. Border Radius

| Element | Radius |
|---|---|
| Cards (module + status) | `16px` |
| Buttons | `8px` |
| Input fields | `8px` |
| Icon circles | `100px` (full circle) |
| Pill / badge / chip | `100px` |
| Avatar | `100px` (full circle) |

---

## 6. Shadows & Elevation

| Level | CSS | Usage |
|---|---|---|
| Card | `0 1px 4px rgba(50, 118, 207, 0.10)` | Module cards, status cards |
| Nav bar | `0 1px 3px rgba(0, 0, 0, 0.08)` | Top navigation (optional) |
| Modal | `0 8px 32px rgba(0, 0, 0, 0.18)` | Dialogs, overlays |
| Focus ring | `0 0 0 2px #FFF, 0 0 0 4px #3276CF` | Keyboard focus indicator |

**Rule:** Cards and buttons use **zero elevation** (`elevation={0}` in MUI / `box-shadow: none`). Use only the subtle card shadow token.

---

## 7. Layout Structure

### 7.1 Overall Page Shell

```
┌──────────────────────────────────────────────────────────┐
│  Top Navigation Bar  (72 px height, white bg, bottom border)           │
├──────────────┬───┬───────────────────────────────────────┤
│  Left Sidebar│ │ │  Main Content Area                                  │
│  (320 px)    │ D │  (flex-grow, padding 24 px)                         │
│              │ i │                                                      │
│  Module      │ v │  ┌─ Greeting ──────────────────────┐                │
│  Categories  │ i │  │ Good Morning, John Doe (date)    │                │
│  & Cards     │ d │  │ Select a module to continue      │                │
│              │ e │  └─────────────────────────────────┘                │
│              │ r │                                                      │
│              │   │  ┌─ Status Cards Row ──────────────┐                │
│              │   │  │ Pending│Approved│Rejected│...    │                │
│              │   │  └─────────────────────────────────┘                │
├──────────────┴───┴───────────────────────────────────────┤
```

### 7.2 Top Navigation

| Property | Value |
|---|---|
| Height | 72 px (approx, logo height + padding) |
| Background | `#FFFFFF` |
| Border-bottom | `1px solid rgba(22, 43, 72, 0.12)` |
| Left content | Logo + tagline (padding-left 24 px) |
| Right content | Notification bell (24 px icon) + Avatar (32 px) |
| Right padding | 16 px |
| Icons colour | `#757575` (default), `#3276CF` (active) |

### 7.3 Left Sidebar

| Property | Value |
|---|---|
| Width | 320 px |
| Top padding | 32 px |
| Internal gap | 32 px between categories, 16 px between cards |
| Categories | Treasury, Client Funds, Payroll, Settings |
| Category header | 16 px Medium, `#757575`, with chevron toggle |

### 7.4 Module Cards

| Property | Value |
|---|---|
| Background | `#FFFFFF` |
| Padding | 16 px |
| Border-radius | 16 px |
| Gap between icon and text | 16 px |
| Icon container | 60 × 60 px circle, bg `#DEE8F7` |
| Icon size | 24 × 24 px inside 36 × 36 px area, primary colour mask |
| Title | 20 px Regular, `#212121` |
| Description | 14 px Regular, `#757575`, single line ellipsis |

### 7.5 Status Summary Cards

| Property | Value |
|---|---|
| Layout | 6 equal-width cards in a row, gap 12 px |
| Background | `#FFFFFF` |
| Padding | 20 px vertical, 24 px horizontal |
| Border-radius | 16 px |
| Icon | 35 × 35 px Material icon, coloured per status |
| Number | 24 px Bold, `#212121` |
| Label | 16 px Regular, `#757575` |
| Gap (icon ↔ text) | 16 px |

---

## 8. Iconography

| Property | Value |
|---|---|
| Library | Material Symbols (Outlined or Rounded) |
| Default size | 24 × 24 px |
| Default colour | `#757575` |
| Active colour | `#3276CF` |
| Module card icon size | 36 × 36 px area inside 60 × 60 px circle |
| Status card icon size | 35 × 35 px |

### Status Icon Colours

| Status | Colour Token | Example Icon |
|---|---|---|
| Pending | `#757575` / neutral | `search_activity` |
| Approved | `#43A047` (success) | `check_circle` |
| Rejected | `#E53935` (error) | `cancel` |
| Cancelled | `#757575` (neutral) | `block` |
| Completed | `#3276CF` (primary) | `assignment_turned_in` |
| Failed | `#E53935` (error) | `assignment_late` |

---

## 9. Component Patterns

### 9.1 Buttons

- **Primary:** `bg: #3276CF`, text white, 8 px radius, `disableElevation`.
- **Secondary / Outline:** White bg, `1.5px solid #3276CF`, primary text.
- **Danger:** `bg: #E53935`, text white.
- Minimum touch target: **44 × 44 px**.
- All buttons: `font-weight: 600`, 14 px.

### 9.2 Avatars

- Size: **32 × 32 px** (nav bar).
- Shape: `border-radius: 100px` (circle).
- Fallback: initials in `20 px Regular` inside primary-50 bg circle.

### 9.3 Badges (Notification)

- Shape: pill (`border-radius: 100px`).
- Background: `#EF6C00` (warning).
- Text: `#FFFFFF`, 12 px Medium.
- Position: top-right corner of notification icon, offset by container padding.

### 9.4 Dividers

- Horizontal: `1px solid rgba(22, 43, 72, 0.12)`.
- Vertical: same colour, `1px` wide, full height of content area.

### 9.5 Collapsible Sections

- Header row: category label (`16 px Medium, #757575`) + chevron icon (24 × 24 px).
- Chevron points **up** when expanded, **down** when collapsed.
- Animate height: 250 ms ease-out.

---

## 10. Motion & Transitions

| Type | Duration | Easing |
|---|---|---|
| Micro (hover, focus) | 150 ms | `ease-out` |
| Standard (expand/collapse) | 250 ms | `ease-out` |
| Complex (page transition) | 350 ms | `ease-out` |

**Accessibility:** Always wrap animations in `@media (prefers-reduced-motion: reduce)` to disable.

---

## 11. Accessibility — WCAG 2.2 AA

| Requirement | Implementation |
|---|---|
| Text contrast | 4.5:1 normal text; 3:1 large text (≥ 18 px / ≥ 14 px bold) |
| UI component contrast | 3:1 against adjacent colours |
| Focus indicator | `outline: 2px solid #3276CF; outline-offset: 2px` |
| Touch target | Minimum 24 × 24 px; recommended 44 × 44 px for actions |
| Error indication | Colour + icon + text — never colour alone |
| Reduced motion | All transitions gated by `prefers-reduced-motion` |
| Keyboard navigation | Full tab order; `aria-current="page"` on active nav items |
| Landmarks | `<header>`, `<nav>`, `<main>`, `<section>` used semantically |
| Alt text | All decorative icons: `aria-hidden="true"`; all meaningful images: descriptive `alt` |

---

## 12. Responsive Breakpoints

| Breakpoint | Width | Behaviour |
|---|---|---|
| Desktop (default) | ≥ 1280 px | Full layout: sidebar + main content |
| Tablet | 768–1279 px | Sidebar collapses to hamburger drawer |
| Mobile | < 768 px | Single column; status cards stack 2 × 3 or vertically |

---

## 13. MUI v5 Theme Mapping

When implementing in React + MUI v5:

```js
const theme = createTheme({
  palette: {
    primary:   { main: '#3276CF', light: '#DEE8F7', dark: '#2C66B4' },
    secondary: { main: '#56AAC4' },
    error:     { main: '#E53935', dark: '#D32F2F' },
    warning:   { main: '#EF6C00' },
    success:   { main: '#43A047', dark: '#388E3C' },
    info:      { main: '#03A9F4' },
    text:      { primary: '#212121', secondary: '#757575', disabled: '#BDBDBD' },
    background:{ default: '#F2F5FA', paper: '#FFFFFF' },
    divider:   'rgba(22, 43, 72, 0.12)',
  },
  typography: {
    fontFamily: "'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif",
    h4: { fontSize: '24px', fontWeight: 700, lineHeight: 1.334 },
    h5: { fontSize: '24px', fontWeight: 400, lineHeight: 1.334 },
    subtitle1: { fontSize: '20px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0.14px' },
    body1: { fontSize: '16px', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.15px' },
    body2: { fontSize: '14px', fontWeight: 400, lineHeight: 1.43, letterSpacing: '0.17px' },
    caption: { fontSize: '12px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.14px' },
  },
  shape: { borderRadius: 8 },
  spacing: 4,  // base unit → theme.spacing(4) = 16px
  components: {
    MuiButton:    { defaultProps: { disableElevation: true } },
    MuiCard:      { defaultProps: { elevation: 0 } },
    MuiTextField: { defaultProps: { variant: 'outlined' } },
  },
});
```

---

## 14. File & Folder Conventions

```
UX_Deliverables/
  prototype/
    images/
      fiona.svg               ← Brand logo
    tasks.html                 ← Tasks / Dashboard page
  FinOps_Web_Design_Guidelines.md  ← This file
```

---

*These guidelines are derived from the Figma source file "FinOps" (frame `19481:59124`) and aligned with MET-DS-V2 governance. All prototypes and production code must comply with this document.*
