# Design Guideline — Landing Page Settings (Acme Recovery)

**Screen:** Landing page settings (template manager)
**Source frame:** Figma `CustomerApp` → node `29238-6462`
**Prototype files:** [LandingPage.html](LandingPage.html) · [styles.css](styles.css)
**Design system:** MET-DS-V2 (tokens-only, no hardcoded hex)

---

## 1. Layout — App Shell

| Region   | Width / Height        | Background           | Notes |
|----------|-----------------------|----------------------|-------|
| Top bar  | 100% × 56px           | `--color-card`       | Sticky, bottom divider `--border-divider` |
| Sidebar  | 220px × (100vh-56px)  | `--color-card`       | Right divider, vertical scroll |
| Main     | fluid × (100vh-56px)  | `--color-bg`         | Padding `--space-7 --space-8` |

**Grid (CSS):**
```
grid-template-columns: 220px 1fr;
grid-template-rows:    56px  1fr;
grid-template-areas:   "topbar topbar" / "sidebar main";
```

**Responsive breakpoints (card grid):**
- ≥ 1200px → 3 columns
- 760–1199px → 2 columns
- < 760px → 1 column

---

## 2. Design Tokens Used

All values are referenced via CSS custom properties — **no naked hex in CSS rules.**

### Colour
| Role            | Token                  | Value     |
|-----------------|------------------------|-----------|
| Page background | `--color-bg`           | #F2F5FA   |
| Card surface    | `--color-card`         | #FFFFFF   |
| Brand primary   | `--color-primary`      | #3276CF   |
| Primary hover   | `--color-primary-hover`| #2C66B4   |
| Body text       | `--text-primary`       | #212121   |
| Secondary text  | `--text-secondary`     | #757575   |
| Divider         | `--grey-200`           | #EEEEEE   |
| Border          | `--grey-300`           | #E0E0E0   |
| Error (delete)  | `--color-error`        | #E53935   |
| Toggle ON track | `--grey-900`           | #212121   |

### Spacing (8pt scale)
`--space-3` 8 · `--space-4` 12 · `--space-5` 16 · `--space-6` 20 · `--space-7` 24 · `--space-8` 32

### Radius
- Cards / buttons / inputs → `--radius-card` 8px
- Pills (Generate click to pay, toggle track) → `--radius-pill` 100px

### Typography
- Family: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- Page title `Landing page settings` — 20/600
- Card title — 16/600
- Body / meta — 14/400
- Caption (`Private Campaign`) — 12/400 · `--text-secondary`

### Elevation
- Template card → `--shadow-card` (`0 1px 4px rgba(50,118,207,.10)`)
- Live chat widget → `--shadow-popover`

---

## 3. Component Specs

### 3.1 Top bar
- Left cluster: hamburger icon button (36×36) + Acme Recovery logo lockup.
- Right cluster: **Generate click to pay** outlined pill button (32h, primary border/text), vertical divider 1×24, bell icon button, avatar circle (32×32, initials).

### 3.2 Sidebar nav item
- Padding `--space-4 --space-6`, icon column 18px, label 14/400.
- Default text `--text-primary`, icon `--text-secondary`.
- Hover: background `--color-primary-25`.
- **Active** (current page): background `--grey-100`, text + icon `--color-primary`, 3px left border in `--color-primary`, weight 600, `aria-current="page"`.

### 3.3 Template card
Layout (top → bottom):
1. **Header row** — `Title` (16/600) ←→ `Private Campaign` caption + ⭐ favourite icon-button
2. **Meta row** — 👤 Owner ←→ 📅 Date (both 14/400 `--text-secondary`)
3. Divider — `--border-divider`
4. **Footer row** — Active toggle ←→ icon action row (history, link, view, edit, delete)

Padding: `--space-5 --space-6`. Gap between rows: `--space-4`.

### 3.4 Toggle (Active)
- Track 36×20 pill. OFF: `--grey-400`. ON: `--grey-900` (matches reference).
- Thumb 16×16 `--color-card`, transform 16px on check.
- Focus ring on hidden checkbox visible on `:focus-visible`.

### 3.5 Icon actions
- 28×28 buttons, 16px icons.
- 4 informational icons (history, link, view, edit) → `--color-primary`, hover bg `--color-primary-25`.
- Delete icon → `--color-error`, hover bg red-50 tint + `--color-error-dark`.

### 3.6 Buttons
- `Add New Template`, `Add Media Files` — `.btn--primary` (filled, 36h, radius 8, weight 600).
- `Generate click to pay` — `.btn--outline.btn--pill` (32h, radius 100, primary border).

### 3.7 Live chat widget
- Fixed bottom-right, offset `--space-7`.
- Pill-shaped card on `--color-primary-700` with circular avatar in `--color-primary`, label `Live Chat`, red status dot (`--color-error`), refresh glyph.

---

## 4. Interaction & Motion

| Interaction          | Duration            | Easing            |
|----------------------|---------------------|-------------------|
| Hover (bg/colour)    | `--duration-micro` 150ms | `--easing-enter` ease-out |
| Toggle thumb slide   | `--duration-standard` 250ms | ease-out |
| `prefers-reduced-motion: reduce` | all transitions clamp to 0.01ms |

---

## 5. Accessibility (WCAG 2.2 AA)

- **Landmarks:** `<header role="banner">`, `<aside aria-label="Primary">`, `<main>`, plus skip link to `#main`.
- **Page title** is the only `<h1>`; each card title is `<h2>` for outline scanning.
- **Icon-only buttons** carry `aria-label` (Favourite, History, Copy link, View, Edit, Delete, Notifications, Toggle navigation menu, Open live chat).
- **Active nav** uses `aria-current="page"` in addition to colour + border (colour is not the sole indicator).
- **Toggle** uses a real `<input type="checkbox">` so screen readers announce state; visible label "Active" is associated via the wrapping `<label>`.
- **Focus visible:** 2px `--color-primary` outline with 2px offset on all focusable elements (`:focus-visible`).
- **Colour contrast:** body `#212121` on `#FFFFFF` = 16.1:1; secondary `#757575` on `#FFFFFF` = 4.54:1 (≥ 4.5:1 AA body); primary `#3276CF` on `#FFFFFF` = 4.6:1 for ≥18px or 14px bold (AA).
- **Target size (2.5.8):** all interactive controls ≥ 24×24 CSS px; primary buttons 36h; icon buttons 28–36.
- **Reduced motion:** `prefers-reduced-motion` honoured.
- **Keyboard order:** skip-link → hamburger → brand → top-right CTAs → sidebar items → page actions → cards (header → toggle → actions).

---

## 6. Empty / Loading / Error States (acceptance criteria)

| State                         | Behaviour |
|-------------------------------|-----------|
| **No templates**              | Show empty illustration + body copy "No templates yet" + primary CTA "Add New Template". |
| **Search no match**           | Inline message under search: "No templates match 'query'." (live region `aria-live="polite"`). |
| **Loading (initial)**         | Render 6 skeleton cards in same grid. |
| **Toggle activation fail**    | Revert state, show toast: "Couldn't update status. Try again." Toast `role="status"`. |
| **Delete confirmation**       | Modal dialog with `role="dialog"`, focus trap, default focus on Cancel. |
| **Offline (offline-first)**   | Read templates from cache; queue toggle/delete mutations; banner "Working offline — changes will sync". On reconnect, resolve conflicts last-write-wins with audit entry; show "Synced" toast. |

---

## 7. Governance — MET-DS-V2 Compliance Checklist

- [x] Full `:root` token block present in `styles.css`.
- [x] No hardcoded hex in any rule body — all colours via `var(--token)`.
- [x] 8pt spacing only (2/4/8/12/16/20/24/32/40/48).
- [x] Radius: 8px for cards/buttons/inputs, 100px for pills.
- [x] Font family = system-ui stack.
- [x] No box-shadow elevation on primary buttons (flat — matches MUI `disableElevation`).
- [x] Cards rendered flat (`box-shadow: var(--shadow-card)` only, no elevation ladder).
- [x] Reduced-motion guard included.
- [x] WCAG 2.2 AA checks pass for contrast, focus, target size, motion.

---

## 8. React + MUI v5 Handoff Notes

When porting this prototype to React + MUI v5:

| HTML element / class      | MUI component                                  | Props |
|---------------------------|------------------------------------------------|-------|
| `.btn.btn--primary`       | `<Button variant="contained" disableElevation>` | `sx={{ borderRadius: 1 }}` (8px) |
| `.btn--outline.btn--pill` | `<Button variant="outlined">`                  | `sx={{ borderRadius: 999 }}` |
| `.icon-btn`               | `<IconButton>`                                 | `aria-label` required |
| `.search input`           | `<TextField variant="outlined" size="small" type="search">` | placeholder "Search" |
| `.template-card`          | `<Card elevation={0}>` + `<CardContent>`       | apply `--shadow-card` via `sx.boxShadow` |
| `.toggle`                 | `<Switch>` + `<FormControlLabel label="Active">` | track colour override per spec |
| `.avatar`                 | `<Avatar>`                                     | size 32 |
| Sidebar                   | `<Drawer variant="permanent">` + `<List>`      | width 220 |

Theme overrides:
```ts
createTheme({
  shape: { borderRadius: 8 },
  spacing: 4,
  palette: { primary: { main: '#3276CF' } },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCard:   { defaultProps: { elevation: 0 } },
    MuiTextField: { defaultProps: { variant: 'outlined' } },
  },
});
```
