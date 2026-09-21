# Figma Design Guidelines -- Web Job Details Page

> **Source Frame**: [FieldSync -- Field App / MacBook Pro 14" - 85](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=8351-90800&m=dev)
> **Figma Node**: `8351:90800`
> **Resolution**: 1512 x 982 px (MacBook Pro 14")
> **Prototype File**: `UX_Deliverables/prototype/web/job-details.html`
> **Generated**: 2026-04-16

---

## 1. Page Overview

The Job Details page shows a single job record within a white Paper card (MUI Dialog pattern) inside the standard web app shell. It includes:
- Dialog title bar with back navigation, job ID + name, status chip, and action buttons
- Job fields section (2 rows x 5 columns of metadata)
- Split content: customer details (left) + tabbed content (right) with vertical divider
- Tabs: Summary, Attachment, Activities, Job Card

---

## 2. Layout and Grid

### App Shell

| Region | Dimensions | Notes |
|---|---|---|
| **Top bar** | Full width x 60 px | Sticky, white bg, bottom border |
| **Sidebar** | 68 px x full height | Sticky icon-only nav, active = blue left border |
| **Main content** | Remaining width, 16 px padding | Background `#F2F5FA` |

### Job Paper Card (1412 x 871 px in Figma)

| Section | Height | Notes |
|---|---|---|
| **Dialog Title** | 52 px | Back + title + chip + action buttons |
| **Job Fields** | ~173 px | 2 rows x 5 columns of field label/value pairs |
| **Content Body** | ~665 px | Two-panel split with vertical divider |

### Content Body Split

| Panel | Width | Notes |
|---|---|---|
| **Left -- Customer Details** | 360 px (fixed) | Name, address, phone, VIEW MAP button |
| **Divider** | 1 px | Vertical `#EEEEEE` line |
| **Right -- Tabbed Content** | flex: 1 (~1020 px) | Tab bar + tab panel content |

---

## 3. Component Specifications

### 3.1 Dialog Title Bar

| Property | Value |
|---|---|
| Height | min 52 px |
| Padding | 10 px 16 px |
| Gap | 16 px |
| Border bottom | `1px solid #EEEEEE` |
| Back button | 24 x 24 px, `arrow_back` icon, `--text-primary` |
| Title | 20 px medium, `--text-primary`, single-line truncated |
| Status chip | Outlined pill, 1 px border `--grey-300`, 13 px `--text-secondary` |

### 3.2 Action Buttons

| Button | Style | Icon | Label |
|---|---|---|---|
| VIEW GENERATED DECLINE PIN | Outlined (border = `--color-primary`) | `qr_code_2` | Uppercase, 14 px medium |
| ASSIGN | Filled (`--color-primary` bg, white text) | `person_add` | Uppercase, 14 px medium |

Both: 8 px radius, 40 px min-height, 20 px horizontal padding, 8 px icon gap.

### 3.3 Job Information Fields (5-Column Grid)

| Row 1 | Row 2 |
|---|---|
| Client Name: BWV | Work Type: Meter Exchange |
| Business Area: Motor | Client Reference: 123456789 |
| Job Priority: High (blue pill chip) | Job Age: New |
| Risk Rating: Yellow dot (19 px) | -- |
| SLA Deadline: 2024-04-10 14:00:00 | -- |

- Field label: 14 px, `--text-secondary`
- Field value: 16 px, `--text-primary`
- Grid: `repeat(5, 1fr)`, 16 px gap
- Section padding: 16 px

### 3.4 Customer Details (Left Panel)

| Property | Value |
|---|---|
| Width | 360 px |
| Padding | 16 px |
| Border right | `1px solid #EEEEEE` |
| Heading | 16 px medium, `--text-primary` |
| Detail items | 20 px icon + text, 8 px gap, person/location/phone icons |
| VIEW MAP button | Outlined, `--color-primary` border + text, `map` icon, uppercase |

### 3.5 Tab Bar

| Property | Value |
|---|---|
| Border bottom | 2 px solid `--grey-200` |
| Tab item | 14 px medium, uppercase, `--text-secondary`, 12 px/16 px padding |
| Active tab | `--color-primary` text + 2 px bottom border |
| Tabs | SUMMARY, ATTACHMENT, ACTIVITIES, JOB CARD |

### 3.6 Tab Content

| Property | Value |
|---|---|
| Padding | 16 px |
| Heading | 16 px medium, `--text-primary` |
| Body text | 14 px regular, `--text-primary`, 1.6 line-height |
| List | Disc bullets, 24 px left padding |

---

## 4. Typography

| Style | Size | Weight | Usage |
|---|---|---|---|
| h6 / Title | 20 px | 500 | Job title in dialog bar |
| body1 | 16 px | 400/500 | Field values, section headings, customer heading |
| body2 | 14 px | 400 | Field labels, tab labels, body text, detail items |
| caption | 13 px | 400 | Status chip, priority chip |
| caption | 12 px | 500 | "High" chip label |

---

## 5. Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| <= 1279 px | Fields: 3-column grid. Content body stacks vertically. |
| <= 1023 px | Sidebar hidden. Fields: 2-column. Dialog title wraps. |

---

## 6. Accessibility

| Requirement | Implementation |
|---|---|
| Skip link | "Skip to main content", hidden until focused |
| ARIA landmarks | `banner`, `navigation`, `main`, `article` |
| Tab panel a11y | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby` |
| Keyboard | Arrow keys navigate tabs, Enter/Space activates |
| Semantic time | `<time datetime>` for SLA deadline |
| Alt text | Risk dot has `aria-label="Medium risk"` |

---

## 7. MUI v5 Component Mapping

| Element | MUI Component | Props |
|---|---|---|
| Page card | `<Paper elevation={0}>` or `<Dialog>` | `sx={{ borderRadius: 2 }}` |
| Title bar | `<DialogTitle>` | With flex layout |
| Back button | `<IconButton>` | `onClick={navigate(-1)}` |
| Status chip | `<Chip variant="outlined" size="small">` | |
| Action buttons | `<Button variant="outlined">`, `<Button variant="contained">` | `disableElevation`, `startIcon` |
| Fields grid | `<Grid container spacing={2} columns={5}>` | `<Grid item xs={1}>` per field |
| Priority chip | `<Chip size="small" color="primary">` | |
| Customer section | `<Box>` with `<List>` / `<ListItem>` | Icons via `<ListItemIcon>` |
| Tab bar | `<Tabs>` | `value`, `onChange` |
| Tab items | `<Tab label="SUMMARY">` | `uppercase` via sx |
| Tab panels | Custom `<TabPanel>` | Conditional render on index |
| View Map | `<Button variant="outlined" startIcon={<MapIcon />}>` | |

---

## 8. File References

| Artefact | Path |
|---|---|
| HTML Prototype | `UX_Deliverables/prototype/web/job-details.html` |
| This Guideline | `UX_Deliverables/Figma_Design_Guidelines_Web_Job_Details.md` |
| Figma MCP Metadata | `figma_mcp_metadata.json` |
| Figma MCP Screenshot | `figma_mcp_screenshot.png` |
| Source Figma | [Node 8351:90800](https://www.figma.com/design/BXCJbmwlwjAyYAkZ5hdX8y/FieldSync---Field-App?node-id=8351-90800&m=dev) |
