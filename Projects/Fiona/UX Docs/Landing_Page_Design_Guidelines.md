# FinOps — Landing Page Design Guidelines

> **Page:** Landing Page (Module Selector)
> **Application:** FinOps — *Enterprise Finance Automation Platform*
> **Design System:** MET-DS-V2
> **Last Updated:** 10 April 2026

---

## 1. Purpose

The Landing Page is the first screen a user sees after authentication. It provides a personalised greeting and a categorised grid of module cards, enabling quick navigation to any functional area of the application.

**Design goals:**
- Progressive disclosure — present only top-level entry points, no data or KPIs
- Minimal cognitive load — group modules by business domain
- Fast wayfinding — every module reachable in a single click

---

## 2. Page Layout

```
┌──────────────────────────────────────────────────────────┐
│  Top Navigation Bar  (shared with all pages)             │
├──────────────────────────────────────────────────────────┤
│                                                          │
│          ┌─ Greeting ────────────────────┐               │
│          │ Good Morning, John Doe (date) │               │
│          │ Select a module to continue   │               │
│          └───────────────────────────────┘               │
│                                                          │
│          ┌─ Treasury ────────────────────┐               │
│          │ [Card] [Card] [Card]          │               │
│          └───────────────────────────────┘               │
│                                                          │
│          ┌─ Client Funds ────────────────┐               │
│          │ [Card] [Card]                 │               │
│          └───────────────────────────────┘               │
│                                                          │
│          ┌─ Payroll ─────────────────────┐               │
│          │ [Card] [Card]                 │               │
│          └───────────────────────────────┘               │
│                                                          │
│          ┌─ Settings ────────────────────┐               │
│          │ [Card] [Card] [Card]          │               │
│          └───────────────────────────────┘               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| No sidebar | Landing page omits the left sidebar nav — it appears only within module contexts |
| Content max-width | `860px`, centred horizontally |
| Content padding | `40px` vertical, `24px` horizontal |
| Section gap | `32px` between module categories |

---

## 3. Greeting Section

| Property | Value |
|---|---|
| Heading | `24px` Semi-bold (`600`), `--text-primary` |
| Date portion | `24px` Regular (`400`), inline with heading |
| Subtitle | `14px` Regular, `--text-secondary` |
| Gap (heading → subtitle) | `4px` |
| Dynamic | Greeting changes based on time: Morning / Afternoon / Evening |

---

## 4. Module Category

| Property | Value |
|---|---|
| Title | `16px` Medium (`500`), `--text-secondary` |
| Letter-spacing | `0.15px` |
| Gap (title → grid) | `16px` |

### Categories & Order

| # | Category | Modules |
|---|---|---|
| 1 | Treasury | Ad-hoc Payments, Bank Statement Transactions, Vehicle Release Payments |
| 2 | Client Funds | All Pay, KEYIVR Payments |
| 3 | Payroll | Variable Pay, Pension Analysis |
| 4 | Settings | Configuration, Users, **Dashboard** |

---

## 5. Module Card

| Property | Value |
|---|---|
| Background | `--color-card` (`#FFFFFF`) |
| Border-radius | `--radius-card` (`16px`) |
| Padding | `16px` |
| Min-height | `80px` |
| Elevation (default) | None (`elevation={0}`) |
| Elevation (hover) | `--shadow-card` (`0 1px 4px rgba(50,118,207,0.10)`) |
| Hover transform | `translateY(-1px)` |
| Transition | `150ms ease-out` |
| Cursor | `pointer` |

### Card Internal Layout

```
┌──────────────────────────────────────┐
│  ╭──────╮                            │
│  │ Icon │  Title (14px Medium)       │
│  │ 48px │  Description (12px Reg)    │
│  ╰──────╯                            │
└──────────────────────────────────────┘
```

| Element | Property | Value |
|---|---|---|
| Icon circle | Size | `48 × 48 px` |
| Icon circle | Background | `--color-primary-50` (`#DEE8F7`) |
| Icon circle | Border-radius | `100px` (full circle) |
| Icon | Size | `24px` Material Symbols Outlined |
| Icon | Colour | `--color-primary` (`#3276CF`) |
| Gap (icon → text) | | `16px` |
| Title | Font | `14px` Medium, `--text-primary` |
| Description | Font | `12px` Regular, `--text-secondary` |
| Description | Overflow | Single-line, `text-overflow: ellipsis` |

---

## 6. Module Card Grid

| Property | Value |
|---|---|
| Display | CSS Grid |
| Columns (desktop) | `repeat(3, 1fr)` — max 3 cards per row |
| Columns (tablet 768–1023px) | `repeat(2, 1fr)` |
| Columns (mobile < 768px) | `1fr` — single column |
| Gap | `16px` |

---

## 7. Module Card Icons

| Module | Material Symbol | Description |
|---|---|---|
| Ad-hoc Payments | `receipt_long` | Create and manage ad-hoc payment requests |
| Bank Statement Transactions | `account_balance` | Upload and view bank statements |
| Vehicle Release Payments | `local_shipping` | Create and manage vehicle release payments |
| All Pay | `receipt` | View and manage allpay files |
| KEYIVR Payments | `payments` | View automated KeyIVR payments |
| Variable Pay | `money_bag` | Create & manage variable pay requests |
| Pension Analysis | `savings` | View & analyse pension records |
| Configuration | `settings` | Manage system configuration settings |
| Users | `group` | Manage user profiles and access |
| Dashboard | `dashboard` | View admin dashboard and KPI metrics |

---

## 8. Dashboard Card (Settings Section)

The **Dashboard** card is placed as the third card in the **Settings** category. It navigates to the Admin Dashboard KPI page (`Dashboard.html`).

| Property | Value |
|---|---|
| Position | Settings category, third card |
| Icon | `dashboard` |
| Title | Dashboard |
| Description | View admin dashboard and KPI metrics |
| Navigation | `href="Dashboard.html"` |

---

## 9. Top Navigation Bar

Shared component with all pages. See [FinOps_Web_Design_Guidelines.md](FinOps_Web_Design_Guidelines.md) §7.2 for full specification.

| Property | Landing Page Notes |
|---|---|
| Logo | `images/fiona.svg` — top-left |
| Tagline | Visible on desktop, hidden below `1280px` |
| Notifications | Bell icon with badge count |
| Avatar | `32px` circle, top-right |

---

## 10. Differences from Dashboard Page

| Aspect | Landing Page | Dashboard Page |
|---|---|---|
| Sidebar | **Not shown** — clean, focused entry point | Shown (slim icon rail, expands on hover) |
| Content | Module card grid only | KPI metrics, charts, tables |
| Max-width | `860px` (centred) | `1440px` (full width) |
| Data | No live data or API calls | Real-time KPI data |
| Purpose | Navigation / wayfinding | Operational monitoring |

---

## 11. Accessibility

| Requirement | Implementation |
|---|---|
| Landmarks | `<header>` for top nav, `<main>` for content, `<section>` per category |
| Heading hierarchy | `<h1>` greeting, `<h2>` per category |
| Card semantics | `<a>` element with `role="listitem"` inside `role="list"` container |
| Card `aria-label` | Full description: "Module Name — description text" |
| Focus indicator | `outline: 2px solid --color-primary; outline-offset: 2px` |
| Keyboard | Full tab navigation through all cards in reading order |
| Colour contrast | All text meets WCAG 2.2 AA (4.5:1 body, 3:1 large text) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all transitions |
| Touch targets | Cards min-height `80px`, well above 44px minimum |

---

## 12. Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| ≥ 1024px (desktop) | 3-column module grid, `860px` centred content |
| 768–1023px (tablet) | 2-column grid, tagline still visible |
| < 768px (mobile) | 1-column grid, greeting font reduced to `18px`, tighter padding |

---

## 13. MUI v5 Component Mapping

| Landing Page Element | MUI Component | Props |
|---|---|---|
| Module Card | `<Card>` + `<CardActionArea>` | `elevation={0}`, `sx={{ borderRadius: 4 }}` |
| Card Icon Circle | `<Avatar>` | `sx={{ bgcolor: 'primary.50', width: 48, height: 48 }}` |
| Card Icon | `<Icon>` (Material) | `sx={{ color: 'primary.main', fontSize: 24 }}` |
| Category Title | `<Typography>` | `variant="subtitle1"`, `color="text.secondary"` |
| Greeting Title | `<Typography>` | `variant="h5"`, `fontWeight={600}` |
| Module Grid | `<Grid container>` | `spacing={2}`, `<Grid item xs={12} sm={6} md={4}>` |
| Page Container | `<Container>` | `maxWidth="md"` (~`860px`) |
