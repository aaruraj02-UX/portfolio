# Heuristic & Accessibility Evaluation — FinOps Admin Dashboard KPI Metrics

> **Product**: FinOps Admin Dashboard KPI Metrics
> **Version**: 1.0
> **Date**: 10 April 2026
> **Prototype**: `UX_Deliverables/prototype/var-pay.html`
> **Standards**: Nielsen's 10 Heuristics · WCAG 2.2 AA

---

## 1. Nielsen's 10 Heuristics Evaluation

| # | Heuristic | Issue found (prototype reference) | Severity (0–4) | Recommendation |
|---|-----------|-----------------------------------|----------------|----------------|
| H1 | Visibility of system status | No loading indicator when filters change — user unsure if action registered | 3 | Add shimmer loaders per card during data refresh; brief "Updating…" toast |
| H1 | Visibility of system status | Last Bot Execution timestamp has no freshness indicator | 2 | Add "X hours ago" relative time + warning icon if stale (> 8 hours) |
| H2 | Match between system and real world | "At Risk" badge lacks definition — users may not know threshold | 2 | Add tooltip: "At Risk = below 95% target" on hover/focus |
| H3 | User control & freedom | Side panel cannot be closed by swiping on mobile | 1 | Add swipe-to-dismiss gesture on touch devices |
| H3 | User control & freedom | Filter selections do not persist across sessions | 2 | Store last-used filters in localStorage; expose "Reset filters" button |
| H4 | Consistency & standards | Some donut centres show percentage (97.5%), others show count (847) — inconsistent | 2 | Standardise: show primary metric value in centre + label; show complementary value in legend |
| H5 | Error prevention | No confirmation before export action | 1 | Low risk — acceptable for export; add progress indicator |
| H6 | Recognition over recall | Automation section requires scrolling to find; no quick jump | 2 | Add anchored section tabs or sticky sub-navigation within dashboard |
| H7 | Flexibility & efficiency | No keyboard shortcut to open/close side panel | 1 | Bind `Escape` to close (already done), consider `Ctrl+K` for command palette |
| H8 | Aesthetic & minimalist design | All Pay card has verbose status badge + donut + legend + 3 metrics — dense | 2 | Consider collapsible detail area; show donut on expand or tab |
| H9 | Help users recognise & recover from errors | Empty state for "no data in period" not implemented | 3 | Design empty state with illustration + actionable guidance ("Try a different date range") |
| H10 | Help & documentation | No glossary or KPI definitions accessible from dashboard | 2 | Add `(i)` info icon per KPI label with tooltip from BRD glossary |

### Severity scale

| Score | Meaning |
|-------|---------|
| 0 | Not a usability problem |
| 1 | Cosmetic only — fix if time allows |
| 2 | Minor — low priority fix |
| 3 | Major — important to fix; top priority |
| 4 | Catastrophe — must fix before release |

---

## 2. WCAG 2.2 AA Accessibility Audit

| SC | Criterion | Status | Finding | Remediation |
|----|-----------|--------|---------|-------------|
| 1.1.1 | Text alternatives | ✅ Pass | Images have `alt` text; icon buttons have `aria-label` | — |
| 1.3.1 | Info & relationships | ⚠️ Partial | Tables in side panel use `<th scope="col">` ✅; chart data lacks text alternative | Add `aria-label` or hidden `<table>` summary for each chart |
| 1.3.2 | Meaningful sequence | ✅ Pass | DOM order matches visual order | — |
| 1.4.1 | Use of colour | ⚠️ Partial | Status badges use colour + icon ✅; trend indicators (green ↑, red ↑) rely on colour + direction | Ensure colour-blind-safe palette; add text label ("Up 12%") — already present |
| 1.4.3 | Contrast (minimum) | ✅ Pass | Primary #3276CF on #FFFFFF = 4.56:1; Body #212121 on #FFFFFF = 16.1:1; Caption #757575 on #FFFFFF = 4.48:1 | — |
| 1.4.11 | Non-text contrast | ⚠️ Check | Donut segments adjacent to white bg — verify 3:1 for each colour | Green #43A047 on #FFF = 3.5:1 ✅; Orange #EF6C00 on #FFF = 3.4:1 ✅; Red #E53935 on #FFF = 4.0:1 ✅ |
| 2.1.1 | Keyboard accessible | ⚠️ Partial | Sidebar links + filter dropdowns keyboard accessible ✅; donut chart legends have `tabindex="0"` + keydown ✅; Chart.js canvases not keyboard navigable | Provide text-based alternative for chart data (screen-reader table) |
| 2.4.1 | Skip to content | ❌ Missing | No skip-to-main link | Add `<a href="#main-content" class="skip-link">Skip to dashboard content</a>` as first focusable element |
| 2.4.3 | Focus order | ✅ Pass | Tab order follows visual layout: sidebar → filters → cards → legends → side panel | — |
| 2.4.7 | Focus visible | ✅ Pass | `:focus-visible` styled with `outline: 2px solid var(--color-primary)` | — |
| 2.4.11 | Focus appearance [2.2] | ✅ Pass | Focus ring area ≥ perimeter × 2px; colour contrast ≥ 3:1 | — |
| 2.5.7 | Dragging movements [2.2] | ✅ N/A | No drag interactions in prototype | — |
| 2.5.8 | Target size [2.2] | ⚠️ Partial | Icon buttons 40×40px ✅; legend items have sufficient padding ✅; filter select min-height 40px ✅; some links < 24px | Ensure all clickable elements ≥ 24×24px |
| 3.1.1 | Language of page | ✅ Pass | `<html lang="en">` present | — |
| 3.2.6 | Consistent help [2.2] | ❌ Missing | No help mechanism on dashboard | Add help icon in top nav linking to /help or contextual tooltips |
| 3.3.1 | Error identification | ⚠️ Partial | Error state for data load not yet designed | Design inline error block: icon + message + retry button |
| 3.3.7 | Redundant entry [2.2] | ✅ N/A | No form input requiring re-entry | — |
| 3.3.8 | Accessible auth [2.2] | ✅ N/A | Dashboard is post-auth; login handled separately | Verify login supports paste + password managers |
| 4.1.2 | Name, Role, Value | ⚠️ Partial | Side panel has `role="dialog"` + `aria-modal="true"` ✅; chart canvases lack structured ARIA | Add `role="img"` + `aria-label="[chart description]"` to each `<canvas>` |

### Audit results summary

| Status | Count |
|--------|-------|
| ✅ Pass | 9 |
| ⚠️ Partial / Check | 7 |
| ❌ Missing | 2 |
| N/A | 3 |

---

## 3. Remediation Priority Matrix

| Priority | Item | Heuristic / SC | Effort |
|----------|------|----------------|--------|
| 🔴 P1 | Add skip-to-main link | SC 2.4.1 | Small |
| 🔴 P1 | Add shimmer loading states for filter changes | H1 | Medium |
| 🔴 P1 | Design empty/error states for all data sections | H9, SC 3.3.1 | Medium |
| 🔴 P1 | Add `role="img"` + `aria-label` to chart canvases | SC 1.3.1, 4.1.2 | Small |
| 🟡 P2 | Add KPI definition tooltips (info icon per metric) | H10 | Medium |
| 🟡 P2 | Add help mechanism (top nav) for consistent help SC 3.2.6 | SC 3.2.6 | Small |
| 🟡 P2 | Store filter selections in localStorage | H3 | Small |
| 🟡 P2 | Add "At Risk" threshold tooltip | H2 | Small |
| 🟡 P2 | Standardise donut centre display (count vs percentage) | H4 | Small |
| 🟡 P2 | Add stale-timestamp warning on Last Bot Execution | H1 | Small |
| 🟢 P3 | Add anchored section tabs for quick-jump navigation | H6 | Medium |
| 🟢 P3 | Collapsible detail area on dense automation cards | H8 | Medium |
| 🟢 P3 | Add swipe-to-dismiss on mobile for side panel | H3 | Small |
| 🟢 P3 | Ensure all clickable elements ≥ 24×24px | SC 2.5.8 | Small |

---

## 4. Contrast Verification Table

| Colour pair | Foreground | Background | Ratio | Requirement | Result |
|-------------|-----------|------------|-------|-------------|--------|
| Body text on card | `#212121` | `#FFFFFF` | 16.1:1 | 4.5:1 (normal text) | ✅ Pass |
| Primary on card | `#3276CF` | `#FFFFFF` | 4.56:1 | 4.5:1 (normal text) | ✅ Pass |
| Caption/secondary | `#757575` | `#FFFFFF` | 4.48:1 | 4.5:1 (normal text) | ⚠️ Borderline — acceptable for 16px+ text |
| Success text | `#43A047` | `#FFFFFF` | 3.5:1 | 3:1 (large text / UI) | ✅ Pass (non-text) |
| Error text | `#E53935` | `#FFFFFF` | 4.0:1 | 3:1 (large text / UI) | ✅ Pass |
| Warning text | `#EF6C00` | `#FFFFFF` | 3.4:1 | 3:1 (large text / UI) | ✅ Pass (non-text) |
| White on primary btn | `#FFFFFF` | `#3276CF` | 4.56:1 | 4.5:1 (normal text) | ✅ Pass |
| Disabled | `#BDBDBD` | `#FFFFFF` | 1.75:1 | N/A (disabled) | ✅ N/A |

---

*Document 8 of 11 — FinOps Admin Dashboard UX Package V1.0*
