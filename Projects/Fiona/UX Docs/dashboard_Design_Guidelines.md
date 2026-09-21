# FinOps Admin Dashboard — Design Guidelines

> **Version:** 2.0 · **Last updated:** 7 April 2026  
> **Design System:** MET-DS-V2 (Light Theme)  
> **Prototype reference:** `UX_Deliverables/prototype/var-pay.html`

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Colour Tokens](#2-colour-tokens)
3. [Typography](#3-typography)
4. [Spacing & Grid](#4-spacing--grid)
5. [Borders, Radius & Shadows](#5-borders-radius--shadows)
6. [Motion & Transitions](#6-motion--transitions)
7. [App Shell](#7-app-shell)
8. [Top Navigation](#8-top-navigation)
9. [Sidebar Navigation](#9-sidebar-navigation)
10. [Content Area & Layout](#10-content-area--layout)
11. [KPI Cards](#11-kpi-cards)
12. [Status Badges](#12-status-badges)
13. [Trend Indicators](#13-trend-indicators)
14. [Sparkline Charts](#14-sparkline-charts)
15. [Progress Ring (Donut)](#15-progress-ring-donut)
16. [Chart Panels](#16-chart-panels)
17. [Breakdown Bar Chart](#17-breakdown-bar-chart)
18. [Delay Cards (Mini Donut)](#18-delay-cards-mini-donut)
19. [Heatmap](#19-heatmap)
20. [Insights Tables](#20-insights-tables)
21. [Filter Controls](#21-filter-controls)
22. [Tooltips](#22-tooltips)
23. [Responsive Breakpoints](#23-responsive-breakpoints)
24. [Accessibility (WCAG 2.2 AA)](#24-accessibility-wcag-22-aa)
25. [Chart.js Configuration](#25-chartjs-configuration)
26. [Iconography](#26-iconography)

---

## 1. Design Principles

| Principle | Rule |
|---|---|
| **Data density** | Show the most critical KPIs first; progressive disclosure for drill-downs |
| **Scan-ability** | Left-accent colour borders on KPI cards signal status at a glance |
| **Consistency** | Every surface, colour, and spacing value uses a CSS custom property (token) |
| **Clarity** | Use colour + icon + text for all status communication — never colour alone |
| **Offline-first** | Timestamp every data point with a "last refreshed" label |

---

## 2. Colour Tokens

### Brand & Primary Scale

| Token | Hex | Usage |
|---|---|---|
| `--color-primary-25` | `#F2F5FA` | Page background, hover tint |
| `--color-primary-50` | `#DEE8F7` | Active sidebar link background |
| `--color-primary-100` | `#A2C1EA` | Info background |
| `--color-primary-500` | `#3276CF` | **Primary brand / action** |
| `--color-primary-600` | `#2C66B4` | Primary hover |
| `--color-primary-700` | `#275798` | Dark accent, info text |

### Semantic Aliases

| Token | Value | Purpose |
|---|---|---|
| `--color-primary` | `var(--color-primary-500)` | Primary actions, active states |
| `--color-primary-hover` | `var(--color-primary-600)` | Hover on primary elements |
| `--color-bg` | `var(--color-primary-25)` | Page background `#F2F5FA` |
| `--color-card` | `#FFFFFF` | Card / surface background |
| `--color-disabled` | `#BDBDBD` | Disabled controls |

### Text Colours

| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#212121` | Body text, headings, values |
| `--text-secondary` | `#757575` | Labels, subtitles, helper text |
| `--text-hyperlink` | `#3276CF` | Links |
| `--text-hyperlink-hover` | `#2C66B4` | Link hover |
| `--text-disabled` | `#BDBDBD` | Disabled labels |

### State Colours

| State | Default | Hover/Dark | Background | Usage |
|---|---|---|---|---|
| **Success** | `#43A047` | `#2E7D32` | `#E8F5E9` | On Track, approved, healthy |
| **Error** | `#E53935` | `#C62828` | `#FEEBEE` | Breached, failed, critical |
| **Warning** | `#EF6C00` | `#F57C00` | `#FFF3E0` | At Risk, approaching limit |

### Grey Scale (used throughout)

| Token | Hex | Common usage |
|---|---|---|
| `--grey-100` | `#F5F5F5` | Table header, subtle backgrounds |
| `--grey-200` | `#EEEEEE` | Dividers, section borders, bar tracks |
| `--grey-300` | `#E0E0E0` | Default border-left on KPI cards |
| `--grey-400` | `#BDBDBD` | Refresh timestamps, disabled |
| `--grey-500` | `#9E9E9E` | Ring meta text |
| `--grey-900` | `#212121` | Tooltip background, primary text |

---

## 3. Typography

| Property | Value |
|---|---|
| **Font family** | `'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif` |
| **Base size** | 14px (`--font-size-body`) |
| **Line height** | 1.5 (body), 1.2–1.334 (headings) |
| **Antialiasing** | `-webkit-font-smoothing: antialiased` |

### Type Scale

| Level | Token | Size | Weight | Usage |
|---|---|---|---|---|
| H1 | `--font-size-h1` | 24px | 600–700 | Dashboard title, greeting |
| H2 | `--font-size-h2` | 20px | 500 | Section titles, KPI text values |
| H3 | `--font-size-h3` | 16px | 500 | Chart titles, sidebar headings |
| Body | `--font-size-body` | 14px | 400 | Card names, table cells, labels |
| Caption | `--font-size-caption` | 12px | 400–500 | Target text, badges, timestamps |
| Micro | — | 11px | 500 | Sidebar headings, badge text, heatmap |
| Micro small | — | 10px | 700 | Mini donut percentage overlays |

### Weight Tokens

| Token | Value | Usage |
|---|---|---|
| `--font-weight-bold` | 700 | KPI values, counts |
| `--font-weight-semibold` | 600 | Dashboard title, table headers |
| `--font-weight-medium` | 500 | Labels, card names, section titles |
| `--font-weight-regular` | 400 | Body text, descriptions |

---

## 4. Spacing & Grid

### 8-Point Spacing Scale

| Token | px | Common usage |
|---|---|---|
| `--space-1` | 2px | Sparkline margin-top, tight pairings |
| `--space-2` | 4px | Heatmap cell padding, badge inline gap |
| `--space-3` | 8px | Card footer padding-top, sidebar link padding |
| `--space-4` | 12px | KPI card inner gap, breakdown item gap |
| `--space-5` | 16px | Grid gaps, KPI grid gap, sidebar section padding |
| `--space-6` | 20px | Card internal padding |
| `--space-7` | 24px | Content-area gap, main layout padding-y |
| `--space-8` | 32px | — |
| `--space-9` | 40px | Main layout padding-x (content area) |
| `--space-10` | 48px | — |

### Grid System

| Component | Grid definition |
|---|---|
| **KPI Grid** | `repeat(auto-fill, minmax(280px, 1fr))` — fluid responsive |
| **KPI Grid 2-col** | `repeat(2, 1fr)` — forced 2-column for paired charts |
| **Delay Grid** | `repeat(4, 1fr)` — 4-column for time brackets |
| **Heatmap** | `80px repeat(7, 1fr)` — label column + 7 day columns |
| **Insights Grid** | `repeat(auto-fill, minmax(380px, 1fr))` — wide card grid |
| **Breakdown Item** | `120px 1fr 48px` — label / bar / value |

### Content Max Width

| Rule | Value |
|---|---|
| `.content-inner` | `max-width: 1440px; margin: 0 auto` |

---

## 5. Borders, Radius & Shadows

| Token | Value | Usage |
|---|---|---|
| `--radius-card` | 16px | All cards (KPI, chart, delay, insight, ring) |
| `--radius-button` | 8px | Buttons |
| `--radius-input` | 8px | Select dropdowns, filter inputs |
| `--radius-pill` | 100px | Status badges, notification badge, avatar, bar fill |
| `--divider-color` | `rgba(22, 43, 72, 0.12)` | Sidebar border, top nav bottom border |
| `--border-divider` | `1px solid #EEEEEE` | Section title underline, card footer top |
| `--shadow-card` | `0 1px 4px rgba(50, 118, 207, 0.10)` | Card hover elevation |
| `--shadow-modal` | `0 8px 32px rgba(0, 0, 0, 0.18)` | Sidebar overlay at ≤1279px |
| `--shadow-focus` | `0 0 0 2px #FFF, 0 0 0 4px #3276CF` | Focus ring (double ring) |

### KPI Card Left Border

| Variant | Border colour | Meaning |
|---|---|---|
| Default | `--grey-300` (#E0E0E0) | Neutral / no threshold mapped |
| `.kpi-card--success` | `--color-success` (#43A047) | On Track |
| `.kpi-card--warning` | `--color-warning` (#EF6C00) | At Risk |
| `.kpi-card--critical` | `--color-error` (#E53935) | Breached / SLA violation |

### Delay Card Top Border

Same colour mapping as KPI card left border, applied via `border-top: 4px solid`.

---

## 6. Motion & Transitions

| Token | Duration | Usage |
|---|---|---|
| `--duration-micro` | 150ms | Hover states (cards, links, buttons) |
| `--duration-standard` | 250ms | Sidebar width expansion, bar fill transitions |
| `--duration-complex` | 350ms | — (reserved for complex animations) |
| `--easing-enter` | `ease-out` | All enter / expand transitions |
| `--easing-exit` | `ease-in` | All exit / collapse transitions |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Pulse Animation (SLA-critical)

KPI cards with `.kpi-card--critical` display an animated red dot (8×8px) at top-right:

```css
@keyframes kpi-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.4; transform: scale(1.3); }
}
/* Duration: 2s · Easing: ease-in-out · Iteration: infinite */
```

---

## 7. App Shell

```
┌──────────────────────────────────────────┐
│  Top Navigation (fixed header)           │
├─────┬────────────────────────────────────┤
│ Nav │  Content Area (scrollable)         │
│ 56px│  ┌─ content-inner max 1440px ─┐   │
│     │  │  Greeting                   │   │
│     │  │  KPI Dashboard              │   │
│     │  └─────────────────────────────┘   │
└─────┴────────────────────────────────────┘
```

| Class | Properties |
|---|---|
| `.app-shell` | `display: flex; flex-direction: column; min-height: 100vh` |
| `.main-layout` | `display: flex; flex: 1; overflow: hidden` |

---

## 8. Top Navigation

| Property | Value |
|---|---|
| Background | `--color-card` (#FFFFFF) |
| Height | Auto (content-driven), `flex-shrink: 0` |
| Padding | `--space-4` (12px) vertical · `--space-5` (16px) horizontal |
| Bottom border | `1px solid var(--divider-color)` |
| Logo height | 33px |
| Tagline | 16px / medium / `--text-secondary` |

### Action Icons

| Property | Value |
|---|---|
| Button size | 40×40px, circular |
| Icon size | 24px (Material Symbols Outlined) |
| Default colour | `--topnav-icon` (#757575) |
| Hover | Background `--color-primary-25`, colour `--topnav-icon-hover` (#616161) |

### Notification Badge

| Property | Value |
|---|---|
| Background | `--color-warning` (#EF6C00) |
| Text | White, 12px / medium |
| Shape | `--radius-pill` (100px), min-width 20px, height 20px |
| Position | Absolute top-right of parent button |

### Avatar

| Property | Value |
|---|---|
| Size | 32×32px |
| Shape | `--radius-pill` (circle) |
| Fit | `object-fit: cover` |

---

## 9. Sidebar Navigation

The sidebar uses a **slim icon-rail** pattern that expands on hover.

### Dimensions & Behaviour

| State | Width | Behaviour |
|---|---|---|
| Collapsed | 56px | Icons only visible, headings & labels hidden (opacity: 0) |
| Expanded (hover) | 260px | Full labels + section headings appear (opacity: 1) |
| ≤1279px hover | 260px | Overlays content with `position: absolute` + `--shadow-modal` |
| ≤767px | Hidden | `display: none` |

### Styling

| Property | Value |
|---|---|
| Background | `--color-card` (#FFFFFF) |
| Right border | `1px solid var(--divider-color)` |
| Transition | `width var(--duration-standard) var(--easing-enter)` (250ms ease-out) |
| z-index | 10 |

### Section Headings

| Property | Value |
|---|---|
| Font size | 11px |
| Weight | `--font-weight-semibold` (600) |
| Colour | `--text-secondary` |
| Text transform | Uppercase |
| Letter spacing | 0.8px |
| Separator | `1px solid var(--divider-color)` between sections (margin-top/padding-top: 8px) |

### Navigation Links

| Property | Value |
|---|---|
| Height | min-height: 40px |
| Padding | `--space-3` (8px) vertical · `--space-5` (16px) horizontal |
| Icon size | 22px (flex-shrink: 0) |
| Text size | `--font-size-body` (14px) |
| Gap | `--space-4` (12px) between icon and text |
| Default colour | `--text-secondary` (#757575) |
| Hover | Background `--color-primary-25`, colour `--color-primary` |
| Active | Background `--color-primary-50`, colour `--color-primary`, weight medium |
| Focus | `outline: 2px solid var(--color-primary); outline-offset: -2px` |

### Module Categories

| Section | Items |
|---|---|
| Treasury | Ad-hoc Payments, Bank Statement, Vehicle Release |
| Client Funds | All Pay, KEYIVR Payments |
| Payroll | Variable Pay *(active)*, Pension Analysis |
| Settings | Users, Configuration |

---

## 10. Content Area & Layout

| Property | Value |
|---|---|
| Scroll | `overflow-y: auto` on `.content-area` |
| Padding | `--space-7` (24px) vertical · `--space-9` (40px) horizontal |
| Inner max-width | 1440px, centred with `margin: 0 auto` |
| Section gap | `--space-7` (24px) between greeting / KPI dashboard sections |

### Greeting Section

| Property | Value |
|---|---|
| Title font | 24px, line-height 1.334 |
| Name weight | `--font-weight-semibold` (600) |
| Date weight | `--font-weight-regular` (400) |

---

## 11. KPI Cards

KPI cards are the primary data display unit. Each card has a coloured left border indicating status.

### Anatomy

```
┌──────────────────────────────────────┐
│ 4px left border (status colour)      │
│                                      │
│  [Card Name]          [Status Badge] │
│  ┌─────────┐                         │
│  │ Value    │  ↑ +12% trend          │
│  └─────────┘                         │
│  [Sparkline chart ───────────]       │
│  ─────────────────────────────────   │
│  Target: 400       ⏱ 07 Apr, 08:32  │
└──────────────────────────────────────┘
```

### CSS Specifications

| Property | Value |
|---|---|
| Background | `--color-card` (#FFFFFF) |
| Radius | `--radius-card` (16px) |
| Padding | `--space-6` (20px) |
| Inner gap | `--space-4` (12px) |
| Left border | `4px solid` (colour varies by status) |
| Hover | `box-shadow: var(--shadow-card)` |
| Grid placement | `minmax(280px, 1fr)` — minimum card width 280px |

### KPI Value

| Property | Value |
|---|---|
| Font size | 28px |
| Weight | `--font-weight-bold` (700) |
| Colour | `--text-primary` (#212121) |
| Line height | 1.2 |
| Text variant | `.kpi-value--text`: 20px / semibold (for text values) |

### Card Footer

| Property | Value |
|---|---|
| Top border | `1px solid var(--grey-200)` |
| Padding top | `--space-3` (8px) |
| Target text | 12px / `--text-secondary` |
| Refresh | 11px / `--grey-400`, with schedule icon (12px) |

---

## 12. Status Badges

Pill-shaped badges used in KPI card headers.

| Variant | Background | Text colour | Icon |
|---|---|---|---|
| `.kpi-status-badge--success` | `--color-success-bg` | `--color-success-darker` | `check_circle` |
| `.kpi-status-badge--warning` | `--color-warning-bg` | `--color-warning` | `warning` |
| `.kpi-status-badge--critical` | `--color-error-bg` | `--color-error-deeper` | `error` |

### Styling

| Property | Value |
|---|---|
| Font size | 11px |
| Weight | `--font-weight-medium` (500) |
| Padding | `--space-1` (2px) / `--space-3` (8px) |
| Radius | `--radius-pill` (100px) |
| Icon size | 14px (inline) |

---

## 13. Trend Indicators

Displayed inline with KPI values.

| Direction | Class | Colour | Icon |
|---|---|---|---|
| Positive | `.kpi-trend--positive` | `--color-success-darker` (#2E7D32) | `trending_up` |
| Negative | `.kpi-trend--negative` | `--color-error` (#E53935) | `trending_down` |
| Neutral | `.kpi-trend--neutral` | `--text-secondary` (#757575) | `trending_flat` |

| Property | Value |
|---|---|
| Font size | `--font-size-caption` (12px) |
| Weight | `--font-weight-medium` (500) |
| Icon size | 16px |
| Gap | `--space-1` (2px) |

---

## 14. Sparkline Charts

Miniature line charts embedded inside KPI cards.

| Property | Value |
|---|---|
| Container height | 36px (`.kpi-sparkline-wrap`) |
| Canvas height | 36px (forced via `!important`) |
| Width | 100% of card |
| Margin top | `--space-1` (2px) |
| Line width | 2px |
| Point radius | 0 (no visible points) |
| Line colour | Matches card status colour |
| Fill | Translucent gradient (alpha 0.15) below line |

---

## 15. Progress Ring (Donut)

Used for automation success rates (All Pay, KEYIVR, Bank Statement).

### Ring Card Layout

| Property | Value |
|---|---|
| Layout | Horizontal flex: ring + info |
| Gap | `--space-7` (24px) |
| Padding | `--space-6` (20px) |
| Background | `--color-card` |
| Radius | `--radius-card` (16px) |

### Ring Element

| Property | Value |
|---|---|
| Size | 80×80px |
| Centre label | 16px / bold, absolute-centred |
| Cutout | 70% (Chart.js doughnut) |
| Colour segments | Success / Error / Warning (as applicable) |
| Border width | 12px arc, 0px border |

### Ring Info

| Element | Style |
|---|---|
| Label | 14px / medium / `--text-secondary` |
| Meta | 12px / `--grey-500` |

---

## 16. Chart Panels

Full-width chart containers for trend lines, stacked bars, horizontal bars.

| Property | Value |
|---|---|
| Background | `--color-card` |
| Radius | `--radius-card` (16px) |
| Padding | `--space-6` (20px) |
| Inner gap | `--space-5` (16px) |
| Chart height | 220px (default), 260px (`.kpi-chart-body--tall`) |

### Chart Header

| Element | Style |
|---|---|
| Title | 16px / medium / `--text-primary`, with 20px icon in `--text-secondary` |
| Legend | Flex row, gap `--space-5` |

### Threshold Line Indicators

| Dot class | Colour | Usage |
|---|---|---|
| `.kpi-threshold-dot--error` | `--color-error` | SLA breach line |
| `.kpi-threshold-dot--warning` | `--color-warning` | Warning threshold |
| `.kpi-threshold-dot--target` | `--color-primary` | Target/goal line (dashed border) |

---

## 17. Breakdown Bar Chart

Horizontal bar breakdown used for users-by-module distribution.

| Property | Value |
|---|---|
| Layout | Grid `120px 1fr 48px` per row |
| Bar track | Height 8px, `--grey-200` background, pill radius |
| Bar fill | `--color-primary`, animated width transition |
| Label | 14px / `--text-primary` |
| Value | 14px / semibold / `--text-primary`, right-aligned |

---

## 18. Delay Cards (Mini Donut)

Used for approval delay time brackets.

### Grid

| Property | Value |
|---|---|
| Columns | `repeat(4, 1fr)` — 4 time brackets |
| Gap | `--space-5` (16px) |
| ≤1279px | `repeat(2, 1fr)` — 2-column stack |

### Card Anatomy

```
┌──────────────────────┐
│ 4px top border       │
│    [Time bracket]    │
│    [Mini donut 48px] │
│    [Count]           │
│    [Label]           │
└──────────────────────┘
```

| Property | Value |
|---|---|
| Padding | `--space-6` (20px) |
| Text align | Centre |
| Top border | `4px solid` (status-coloured) |
| Mini donut size | 48×48px |
| Centre percentage | 10px / bold |

---

## 19. Heatmap

Grid-based approval delay heatmap (modules × days of week).

| Property | Value |
|---|---|
| Grid | `80px repeat(7, 1fr)` |
| Cell gap | 2px |
| Font size | 11px |
| Cell min height | 36px |
| Cell radius | 4px |

### Heat Colour Scale

| Class | Background | Text | Meaning |
|---|---|---|---|
| `.kpi-heat-0` | `--color-success-bg` | `--color-success-darker` | Very low delay |
| `.kpi-heat-1` | `#C8E6C9` | `--color-success-darker` | Low delay |
| `.kpi-heat-2` | `--color-warning-bg` | `--color-warning` | Moderate delay |
| `.kpi-heat-3` | `#FFE0B2` | `--color-warning` | High delay |
| `.kpi-heat-4` | `#FFCCBC` | `--color-error` | Very high delay |
| `.kpi-heat-5` | `--color-error-bg` | `--color-error-deeper` | Critical delay |

---

## 20. Insights Tables

Data tables inside insight cards.

| Element | Style |
|---|---|
| Card padding | `--space-6` (20px) |
| Card grid | `repeat(auto-fill, minmax(380px, 1fr))` |
| Title | 16px / medium, with 20px warning icon |
| Table header | 12px / uppercase / `--text-secondary` / bg transparent |
| Table cell | 14px / `--text-primary` |
| Row border | `1px solid var(--grey-100)` (last row: none) |
| Cell padding | `--space-3` (8px) vertical · `--space-4` (12px) horizontal |

### Semantic Text Classes

| Class | Colour | Usage |
|---|---|---|
| `.text-critical` | `--color-error` | Critical status values |
| `.text-warning` | `--color-warning` | Warning status values |
| `.text-success` | `--color-success-darker` | Healthy status values |

---

## 21. Filter Controls

Dashboard header filters for Period and Module selection.

| Property | Value |
|---|---|
| Label | 12px / medium / `--text-secondary` |
| Select height | min-height 40px |
| Padding | `--space-3` (8px) / `--space-5` (16px) |
| Border | `1px solid var(--grey-300)` |
| Radius | `--radius-input` (8px) |
| Background | `--color-card` |
| Focus | border `--color-primary`, shadow `0 0 0 2px rgba(50,118,207,0.15)` |

---

## 22. Tooltips

Contextual information tooltips on KPI cards and delay cards (`data-kpi-tip` attribute).

| Property | Value |
|---|---|
| Background | `--grey-900` (#212121) |
| Text colour | #FFFFFF |
| Font size | `--font-size-caption` (12px) |
| Padding | `--space-3` (8px) / `--space-4` (12px) |
| Radius | `--radius-input` (8px) |
| Max width | 260px |
| Position | Fixed, offset 12px from cursor |
| Visibility | `opacity: 0` → `opacity: 1` on `.is-visible` |
| Transition | `opacity var(--duration-micro) var(--easing-enter)` |

### Tooltip Content Format

```
[Card Name]  (bold title)
Description of the metric.
Threshold: ≥X On Track, ≥Y At Risk, <Y Breached
Period: Weekly
```

Data is pipe-delimited in the `data-kpi-tip` attribute: `"Description|Threshold|Period"`.

---

## 23. Responsive Breakpoints

### ≤1279px (Tablet / Narrow Desktop)

| Change |
|---|
| Sidebar stays 56px collapsed; on hover overlays content with `position: absolute` + modal shadow |
| KPI delay grid → 2 columns |
| KPI 2-col grid → single column |
| Content padding reduces to `--space-5` / `--space-7` (16px / 24px) |
| Topnav tagline hidden |

### ≤767px (Mobile)

| Change |
|---|
| Sidebar hidden (`display: none`) |
| Content padding → `--space-5` (16px) all sides |
| KPI grid → 1 column |
| Insights grid → 1 column |
| Dashboard header → column direction |
| Breakdown item grid → `90px 1fr 40px` |
| Ring card → column layout, centre-aligned |
| Heatmap label column → 60px, font 10px |
| Chart body height → 180px |
| Greeting title → 20px |

---

## 24. Accessibility (WCAG 2.2 AA)

| Requirement | Implementation |
|---|---|
| **Contrast** | 4.5:1 normal text, 3:1 large text & UI components |
| **Focus ring** | `outline: 2px solid var(--color-primary); outline-offset: 2px` (global `:focus-visible`) |
| **Sidebar focus** | `outline-offset: -2px` (inset for contained links) |
| **ARIA labels** | `aria-label` on all interactive elements + landmark regions |
| **Role landmarks** | `role="banner"` (topnav), `role="region"` (KPI dashboard), `aria-label` on nav |
| **Active page** | `aria-current="page"` on active sidebar link |
| **Tooltip ARIA** | `aria-hidden="true/false"` toggled on show/hide |
| **Chart alt** | `aria-label` on parent `role="group"` for each KPI card with screen-reader values |
| **Colour + icon + text** | All status indicators use colour + icon + text label |
| **Reduced motion** | All animations disabled under `prefers-reduced-motion: reduce` |
| **Touch targets** | Min-height 40px on all interactive elements |

---

## 25. Chart.js Configuration

### Library

| Property | Value |
|---|---|
| Version | 4.4.7 |
| CDN | `https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js` |

### Global Defaults

```javascript
Chart.defaults.font.family  = "'Roboto', system-ui, sans-serif";
Chart.defaults.font.size    = 12;
Chart.defaults.color        = '#757575';     // --text-secondary
Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.tooltip.backgroundColor = '#212121';
Chart.defaults.plugins.tooltip.titleFont  = { weight: '600', size: 12 };
Chart.defaults.plugins.tooltip.bodyFont   = { size: 11 };
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.padding    = 10;
Chart.defaults.animation    = { duration: 600, easing: 'easeOutQuart' };
```

### Chart Colour Mapping

| Token Name | Hex | Usage |
|---|---|---|
| `C.primary` | `#3276CF` | Primary lines, bar fills |
| `C.success` | `#43A047` | Success lines, donut segments |
| `C.warning` | `#EF6C00` | Warning lines, manual % |
| `C.error` | `#E53935` | Error lines, threshold lines |
| `C.grey200` | `#EEEEEE` | Grid lines |
| `C.grey300` | `#E0E0E0` | Donut remainder |
| `C.grey400` | `#BDBDBD` | Previous-period dashed lines |

### Chart Types Used

| Type | Usage | Key Config |
|---|---|---|
| **Line** | Trend charts (success rate, error rate, rejection, bot failure) | `tension: 0.3`, `pointRadius: 3` |
| **Doughnut** | Progress rings (All Pay, KEYIVR, Bank Statement) | `cutout: '70%'`, border 0 |
| **Stacked Bar** | Workflow volume by status | Stacked x/y axes |
| **Horizontal Bar** | Users by module breakdown | `indexAxis: 'y'` |

### Threshold Line Plugin

Custom Chart.js plugin for drawing horizontal threshold lines:

```javascript
{
  id: 'thresholdLine',
  afterDraw(chart) {
    var opts = chart.options.plugins.thresholdLine;
    // Draws dashed red line at opts.value on y-axis
  }
}
```

### Sparkline Config Pattern

```javascript
{
  type: 'line',
  data: {
    labels: DAYS,        // ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    datasets: [{
      data: [...],
      borderColor: colour,
      backgroundColor: translucent_fill,
      fill: true,
      borderWidth: 2,
      tension: 0.35,
      pointRadius: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: { display: false }, y: { display: false } },
    plugins: { legend: { display: false }, tooltip: { enabled: false } }
  }
}
```

---

## 26. Iconography

| Library | Google Material Symbols Outlined |
|---|---|
| CDN | `https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined` |
| Default size | 24px (topnav), 22px (sidebar), 20px (chart titles) |
| ARIA | `aria-hidden="true"` on all decorative icons |

### Icons by Component

| Context | Icon | Size |
|---|---|---|
| Notifications | `notifications` | 24px |
| Sidebar — Ad-hoc | `receipt_long` | 22px |
| Sidebar — Bank | `upload_file` | 22px |
| Sidebar — Vehicle | `local_shipping` | 22px |
| Sidebar — All Pay | `receipt` | 22px |
| Sidebar — KEYIVR | `payments` | 22px |
| Sidebar — Variable Pay | `money_bag` | 22px |
| Sidebar — Pension | `savings` | 22px |
| Sidebar — Users | `group` | 22px |
| Sidebar — Config | `settings` | 22px |
| Badge — Success | `check_circle` | 14px |
| Badge — Warning | `warning` | 14px |
| Badge — Critical | `error` | 14px |
| Trend Up | `trending_up` | 16px |
| Trend Down | `trending_down` | 16px |
| Trend Flat | `trending_flat` | 16px |
| Refresh | `schedule` | 12px |
| Drill-down | `chevron_right` | 14px |
| Insight title | `lightbulb` | 20px |

---

*End of Dashboard Design Guidelines*
