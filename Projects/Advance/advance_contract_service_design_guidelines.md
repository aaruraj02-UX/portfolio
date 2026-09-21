# ProServe — Contract Services Design Guidelines

> Extracted from Figma frame `9265-880` (Contract services – Records screen).
> All tokens reference the MET-DS-V2 design system with Advance-specific extensions.

---

## 1. Theme Overview

| Property          | Value                                                                 |
|-------------------|-----------------------------------------------------------------------|
| Theme mode        | **Light** (default)                                                   |
| Page background   | `--color-bg` · `#F2F5FA` (Primary/25)                                |
| Card / surface    | `--color-card` · `#FFFFFF`                                            |
| Primary brand     | `--color-primary` · `#3276CF` (Primary/500)                          |
| Primary hover     | `--color-primary-hover` · `#2C66B4` (Primary/600)                    |
| Header banner     | Gradient `linear-gradient(90deg, #006494 0%, #8EC0E2 100%)` + `box-shadow: 0 4px 3px 0 rgba(0,0,0,0.10)` |
| Disabled          | `--color-disabled` · `#BDBDBD` (Grey/400)                            |

---

## 2. Typography

| Role         | Size    | Weight | Line-height | Token                         |
|------------- |---------|--------|-------------|-------------------------------|
| H1 / Title   | 24 px   | 700    | 1.2         | `--font-size-h1`              |
| H2 / Section | 20 px   | 600    | 1.2         | `--font-size-h2`              |
| H3 / Card    | 16 px   | 600    | 1.2         | `--font-size-h3`              |
| Body         | 14 px   | 400    | 1.5         | `--font-size-body`            |
| Caption      | 12 px   | 400    | 1.5         | `--font-size-caption`         |
| Table header | 11 px   | 700    | 1.4         | uppercase, letter-spacing 0.5 |

**Font stack:** `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`

---

## 3. Colour Palette

### 3.1 Primary Scale

| Token               | Hex       | Usage                               |
|----------------------|-----------|--------------------------------------|
| Primary/25           | `#F2F5FA` | Page background, hover tint          |
| Primary/50           | `#DEE8F7` | Light accent                         |
| Primary/100          | `#A2C1EA` | Info bg                              |
| Primary/500          | `#3276CF` | **Primary brand / active nav**       |
| Primary/600          | `#2C66B4` | Hover state                          |
| Primary/700          | `#275798` | Page header banner, dark accent      |
| Primary/800          | `#22497D` | Deep accent                          |
| Primary/900          | `#1C3A62` | Deepest accent                       |

### 3.2 Grey Scale

| Token     | Hex       | Usage                                |
|-----------|-----------|--------------------------------------|
| Grey/50   | `#FAFAFA` | Table alternating row                |
| Grey/100  | `#F5F5F5` | Table header bg                      |
| Grey/200  | `#EEEEEE` | Divider                              |
| Grey/300  | `#E0E0E0` | Border                               |
| Grey/400  | `#BDBDBD` | Disabled                             |
| Grey/600  | `#757575` | Secondary text, icons                |
| Grey/700  | `#616161` | Icon hover                           |
| Grey/900  | `#212121` | Body text                            |

### 3.3 Semantic States

| State    | Default   | Hover     | Background |
|----------|-----------|-----------|------------|
| Success  | `#43A047` | `#388E3C` | `#E8F5E9`  |
| Error    | `#E53935` | `#D32F2F` | `#FEEBEE`  |
| Warning  | `#FF9800` | `#F57C00` | `#FFF3E0`  |

### 3.4 Text Colours

| Role        | Hex       | Token                |
|-------------|-----------|----------------------|
| Primary     | `#212121` | `--text-primary`     |
| Secondary   | `#757575` | `--text-secondary`   |
| Hyperlink   | `#3276CF` | `--text-hyperlink`   |
| Link hover  | `#2C66B4` | `--text-hyperlink-hover` |
| Disabled    | `#BDBDBD` | `--text-disabled`    |

---

## 4. Spacing (8 pt Grid)

All spacing values follow the 8-point grid. Only these pixel values are permitted:

`2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64`

| Token       | px   |
|-------------|------|
| `--space-1` | 2    |
| `--space-2` | 4    |
| `--space-3` | 8    |
| `--space-4` | 12   |
| `--space-5` | 16   |
| `--space-6` | 20   |
| `--space-7` | 24   |
| `--space-8` | 32   |
| `--space-9` | 40   |
| `--space-10`| 48   |

---

## 5. Borders & Radius

| Token              | Value                   |
|--------------------|-------------------------|
| `--border-default` | `1px solid #E0E0E0`     |
| `--border-divider` | `1px solid #EEEEEE`     |
| `--border-focus`   | `2px solid #3276CF`     |
| `--radius-card`    | `8px`                    |
| `--radius-button`  | `8px`                    |
| `--radius-input`   | `8px`                    |
| `--radius-pill`    | `100px`                  |

---

## 6. Layout — Contract Services Screen

### 6.1 App Shell (2-Column CSS Grid)

```
┌────────────┬────────────────────────────────────────────────────┐
│            │  Top Bar (56 px)  · search left · bell+avatar     │
│  Left      ├────────────────────────────────────────────────────┤
│  Sidebar   │  Page Header Banner (48 px · gradient bg)         │
│  200 px    ├────────────────────────────────────────────────────┤
│  (Col 1)   │  ┌─ Table Card ──────────────────────────────┐    │
│            │  │ Table Controls (show·export·search)        │    │
│  Logo:     │  │ Data Table (full width, per-column search) │    │
│  Advance-  │  │ Table Info ("Showing 1 to 10 of 1000…")   │    │
│  Logo-     │  └───────────────────────────────────────────┘    │
│  TextV4-   ├────────────────────────────────────────────────────┤
│  06e.png   │  Footer · Atlas | ProServe Learn · Acme logo │
├────────────┴────────────────────────────────────────────────────┤
```

**Grid:** `display: grid; grid-template-columns: 200px 1fr`
- **Column 1:** `<nav class="leftnav">` — full viewport height, scrollable
- **Column 2:** `<div class="main-column">` — topnav + main stacked via `flex-direction: column`

### 6.2 Left Sidebar (Expanded)

| Property          | Value                                              |
|-------------------|----------------------------------------------------|
| Width             | `200px`                                            |
| Background        | `#FFFFFF` (--color-card)                           |
| Border-right      | `1px solid #E0E0E0`                                |
| Logo              | `images/Advance-Logo-TextV4-06e.png` (32 px height) |
| Nav items         | icon (20 px) + label (14 px/600) · gap 12 px       |
| Active state      | text `--color-primary` (#3276CF) + blue indicator  |
| Submenu indent    | `16px` left padding below parent                   |
| Item min-height   | `44px` (WCAG touch target)                         |

**Menu structure:**
- ☰ Navigation
- Dashboard
- **Records** (active, expanded)
  - Contract services (active child)
  - Contract ▾
  - Compliance
- Reports ▾
- Settings ▾

### 6.3 Top Bar

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Height         | `56px`                                               |
| Background     | `#FFFFFF`                                            |
| Border-bottom  | `1px solid #E0E0E0`                                  |
| Search field   | Icon + placeholder · `40px` height · left-aligned    |
| Right section  | Notification bell (with yellow indicator) · Avatar (`36px` circle, initials "RL") · Greeting text · User name dropdown |

### 6.4 Page Header Banner

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Background     | `linear-gradient(90deg, #006494 0%, #8EC0E2 100%)`  |
| Box-shadow     | `0 4px 3px 0 rgba(0, 0, 0, 0.10)`                   |
| Height         | `48px`                                               |
| Padding        | `0 24px`                                             |
| Text           | White · "Contract services" bold + "- Records" regular |
| Font-size      | `16px` (H3)                                           |
| Button         | "Add New" — white bg, primary color text + primary border, right-aligned |

### 6.5 Table Card Container

All table content (controls, data table, info footer) is wrapped in a card:

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Background     | `#FFFFFF` (--color-card)                             |
| Border         | `1px solid #E0E0E0`                                  |
| Border-radius  | `8px` (--radius-card)                                |
| Box-shadow     | `--shadow-card`                                      |
| Margin         | `24px` from page edges                               |
| Overflow       | `hidden` (clips inner borders to radius)             |

### 6.6 Table Controls Row

| Element          | Style                                                |
|------------------|------------------------------------------------------|
| Show entries     | "show [10 ▾] entries" — dropdown select 14 px body   |
| Export button    | Outlined, primary color border + text, chevron ▾     |
| Search field     | Text input, right-aligned, 14 px body, 40 px height  |
| Padding          | `16px 24px`                                          |

### 6.7 Data Table

| Property             | Value                                             |
|----------------------|---------------------------------------------------|
| Border               | `1px solid #E0E0E0`                               |
| Header bg            | `#F5F5F5` (--table-header / Grey/100)             |
| Header text          | `11px` uppercase, `700` weight, `#757575`         |
| Header sort icon     | Small dropdown arrow per column                    |
| Column search row    | Text inputs below headers, `12px` caption, Grey/300 border |
| Row bg               | `#FFFFFF` default · `#FAFAFA` alternating          |
| Row hover            | `#F5F5F5`                                          |
| Row padding          | `12px 16px` per cell                               |
| Body text            | `14px / 400` · `#212121`                           |
| Status text          | "Active" — plain text in body colour               |
| Row actions          | Vertical 3-dot menu icon · `#3276CF` primary       |
| Border-bottom        | `1px solid #EEEEEE` (divider)                      |

**Columns:** ID · Full Name · Phone Number · Email · Brand · Role · Clients · Status · Actions (⋮)

### 6.8 Table Footer

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Text           | "Showing 1 to 10 of 1000 entries" · `12px` caption   |
| Colour         | `--text-secondary` (#757575)                         |
| Padding        | `12px 16px`                                          |

### 6.9 Page Footer

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Background     | `#FFFFFF`                                            |
| Border-top     | `1px solid #E0E0E0`                                  |
| Height         | `48px`                                               |
| Left links     | "Atlas" · "ProServe Learn" — hyperlink blue #3276CF |
| Right branding | "Powered by" + `images/acme-logo@small-logo.png` (24 px height) |

---

## 7. Component Patterns (Contract Services Page)

### 7.1 Buttons

| Variant      | Background       | Text/Border       | Hover                  | Radius |
|------------- |------------------|--------------------|------------------------|--------|
| Primary      | `#3276CF`        | `#FFFFFF`          | `#2C66B4`              | 8 px   |
| Secondary    | `#FFFFFF`        | `#3276CF` + border | bg `#F2F5FA`           | 8 px   |
| Header (Add) | `#FFFFFF`        | `#3276CF` + border | bg `#F2F5FA`           | 8 px   |
| Danger       | `#E53935`        | `#FFFFFF`          | `#D32F2F`              | 8 px   |

All buttons: `min-height: 44px` · `padding: 8px 24px` · `font-weight: 600` · `disableElevation`

### 7.2 Form Inputs

| Property     | Value                                      |
|--------------|--------------------------------------------|
| Height       | `40px` inline controls · `44px` full forms  |
| Border       | `1.5px solid #E0E0E0`                      |
| Radius       | `8px`                                       |
| Font-size    | `14px`                                      |
| Focus        | border `#3276CF` + focus shadow ring        |
| Disabled     | bg `#F5F5F5` · text `#BDBDBD`              |

### 7.3 Badges / Status

| Status  | Background | Text colour | Radius |
|---------|------------|-------------|--------|
| Active  | `#E8F5E9`  | `#2E7D32`   | 100 px |
| Error   | `#FEEBEE`  | `#C62828`   | 100 px |
| Warning | `#FFF3E0`  | `#E56800`   | 100 px |
| Info    | `#A2C1EA`  | `#275798`   | 100 px |

---

## 8. Accessibility (WCAG 2.2 AA)

- **Contrast ratios:** ≥ 4.5:1 normal text · ≥ 3:1 large text & UI components
- **Focus ring:** `outline: 2px solid #3276CF; outline-offset: 2px;` (3:1 vs adjacent)
- **Touch targets:** min `44×44px` primary actions · min `24×24px` secondary (SC 2.5.8)
- **Skip link:** hidden, visible on `:focus`, jumps to `#main-content`
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` wraps all transitions
- **Table headers:** use `<th scope="col">` with `aria-sort` on sortable columns
- **Error display:** colour + icon + text label — never colour alone
- **Consistent help:** footer links (Atlas, ProServe Learn) appear on every page

---

## 9. Motion

| Duration          | Value    | Usage                      |
|-------------------|----------|----------------------------|
| Micro             | `150ms`  | Hovers, toggles            |
| Standard          | `250ms`  | Panels, modals             |
| Complex           | `350ms`  | Full page transitions      |
| Easing (enter)    | `ease-out`                              |
| Easing (exit)     | `ease-in`                               |

---

## 10. Shadows

| Token            | Value                                          |
|------------------|------------------------------------------------|
| `--shadow-card`  | `0 1px 4px rgba(50, 118, 207, 0.10)`           |
| `--shadow-modal` | `0 8px 32px rgba(0, 0, 0, 0.18)`               |
| `--shadow-focus` | `0 0 0 2px #FFFFFF, 0 0 0 4px #3276CF`         |

---

## 11. MUI v5 Mapping Notes

| DS Token             | MUI `createTheme()` path                          |
|-----------------------|---------------------------------------------------|
| `--color-primary`     | `palette.primary.main`                            |
| `--color-primary-hover` | `palette.primary.dark`                          |
| `--color-bg`          | `palette.background.default`                      |
| `--color-card`        | `palette.background.paper`                        |
| `--text-primary`      | `palette.text.primary`                            |
| `--text-secondary`    | `palette.text.secondary`                          |
| `--color-success`     | `palette.success.main`                            |
| `--color-error`       | `palette.error.main`                              |
| `--radius-card`       | `shape.borderRadius = 8`                          |
| Spacing               | `spacing(1) = 4px` (MUI base = 4px)              |
| Buttons               | `<Button disableElevation>`                       |
| Cards                 | `<Card elevation={0}>`                            |
| Text fields           | `<TextField variant="outlined">`                  |

---

*Generated from Figma node `9265-880` — Advanced / Contract services – Records*
