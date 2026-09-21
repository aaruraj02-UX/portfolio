# ProServe — Add Contract Service Page Design Guidelines

> Design guideline for the **Add New Record** form page within Contract Services.
> Follows the same MET-DS-V2 design system and Advance conventions as the records list page.

---

## 1. Page Overview

| Property          | Value                                                                 |
|-------------------|-----------------------------------------------------------------------|
| Page type         | **Create / Add form** — full-page form layout (not modal)            |
| Theme mode        | **Light** (default)                                                   |
| Page background   | `--color-bg` · `#F2F5FA`                                             |
| Shell layout      | 2-column CSS grid — shared with records list page                    |
| File              | `add_contract_service.html`                                           |
| Parent page       | `advance_contact_service.html` (Contract Services – Records)         |

---

## 2. Layout Structure

```
┌────────────┬────────────────────────────────────────────────────┐
│            │  Top Bar (56 px)                                   │
│  Left      ├────────────────────────────────────────────────────┤
│  Sidebar   │  Page Header Banner — "Contract services - Add New"│
│  200 px    ├────────────────────────────────────────────────────┤
│            │  Breadcrumb: Contract Services › Add New Record    │
│  (same as  ├────────────────────────────────────────────────────┤
│   records  │  ┌─ Form Card: Personal Information ────────────┐ │
│   page)    │  │  Title · First Name · Last Name · DOB        │ │
│            │  └──────────────────────────────────────────────┘ │
│            │  ┌─ Form Card: Contact Details ──────────────────┐ │
│            │  │  Phone · Alt Phone · Email · Alt Email        │ │
│            │  │  Address Line 1 · Address Line 2              │ │
│            │  │  City · Postcode                              │ │
│            │  └──────────────────────────────────────────────┘ │
│            │  ┌─ Form Card: Service Assignment ───────────────┐ │
│            │  │  Brand · Role · Clients (checkboxes)          │ │
│            │  │  Status · Start Date                          │ │
│            │  └──────────────────────────────────────────────┘ │
│            │  ┌─ Form Card: Additional Notes ─────────────────┐ │
│            │  │  Notes (textarea)                             │ │
│            │  └──────────────────────────────────────────────┘ │
│            │  ┌─ Action Bar ──────────────────────────────────┐ │
│            │  │          Cancel · Save as Draft · Save Record │ │
│            │  └──────────────────────────────────────────────┘ │
│            ├────────────────────────────────────────────────────┤
│            │  Footer                                            │
└────────────┴────────────────────────────────────────────────────┘
```

---

## 3. Shared Components (inherited from records page)

These components are **identical** to the records list page:

| Component            | Reference                                              |
|----------------------|--------------------------------------------------------|
| App Shell Grid       | `grid-template-columns: 200px 1fr`                    |
| Left Sidebar         | 200 px, logo image, same nav structure                 |
| Top Navigation Bar   | 56 px height, search, bell, avatar                     |
| Page Header Banner   | Gradient `linear-gradient(90deg, #006494, #8EC0E2)`   |
| Page Footer          | Atlas · ProServe Learn · Acme logo                |
| Toast Notification   | Dark pill, bottom-center, 3s auto-dismiss              |

---

## 4. Page Header Banner

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Background     | `linear-gradient(90deg, #006494 0%, #8EC0E2 100%)`  |
| Box-shadow     | `0 4px 3px 0 rgba(0, 0, 0, 0.10)`                   |
| Text           | White · "Contract services" bold + "- Add New" regular |
| Height         | `48px`                                               |
| No button      | No "Add New" button on this page (user is already adding) |

---

## 5. Breadcrumb Navigation

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Padding        | `16px 24px`                                          |
| Font-size      | `12px` (caption)                                      |
| Separator      | `›` character, `--grey-400`                           |
| Link colour    | `--text-hyperlink` (`#3276CF`)                        |
| Current page   | `--text-primary` (`#212121`), `font-weight: 600`     |
| Link hover     | `--text-hyperlink-hover` (`#2C66B4`), underline      |
| Path           | Contract Services → Add New Record                    |

---

## 6. Form Card Pattern

Each logical section of the form is wrapped in a **Form Card**.

### 6.1 Card Container

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Background     | `#FFFFFF` (--color-card)                             |
| Border         | `1px solid #E0E0E0`                                  |
| Border-radius  | `8px`                                                 |
| Box-shadow     | `--shadow-card`                                      |
| Margin         | `0 24px 24px` (left/right/bottom)                    |
| Overflow       | `hidden`                                              |

### 6.2 Card Header

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Padding        | `16px 24px`                                          |
| Border-bottom  | `1px solid #EEEEEE`                                  |
| Title          | `16px / 600` (H3), `--text-primary`                  |
| Subtitle       | `12px / 400` (caption), `--text-secondary`           |

### 6.3 Card Body

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Padding        | `24px`                                               |

### 6.4 Card Footer (Action Bar only)

| Property       | Value                                                |
|----------------|------------------------------------------------------|
| Padding        | `16px 24px`                                          |
| Border-top     | `1px solid #EEEEEE`                                  |
| Background     | `--grey-50` (`#FAFAFA`) — subtle differentiation     |
| Alignment      | `justify-content: flex-end`                          |
| Gap            | `8px` between buttons                                 |

---

## 7. Form Sections

The add form contains **4 card sections**:

### 7.1 Personal Information

| Field         | Type       | Required | Placeholder           | Grid position |
|---------------|------------|----------|-----------------------|---------------|
| Title         | `select`   | Yes      | "Select title"        | Col 1         |
| First Name    | `text`     | Yes      | "e.g. Benjamin"       | Col 2         |
| Last Name     | `text`     | Yes      | "e.g. Adams"          | Col 1         |
| Date of Birth | `date`     | No       | —                     | Col 2         |

### 7.2 Contact Details

| Field           | Type     | Required | Placeholder           | Grid position  |
|-----------------|----------|----------|-----------------------|----------------|
| Personal Phone  | `tel`    | Yes      | "+44" prefix + "e.g. 7911 123456"  | Col 1          |
| Business Phone  | `tel`    | No       | "+44" prefix + "e.g. 2079 460123"  | Col 2          |
| Alternative Phone | `tel`  | No       | "+44" prefix + "e.g. 7911 654321"  | Col 3          |
| Email           | `email`  | Yes      | "e.g. sample@mail.com"| Col 1         |
| Alternative Email | `email`| No       | "e.g. alt@mail.com"  | Col 2          |
| Address Line 1  | `text`  | No       | "e.g. 123 High Street"| Full width    |
| Address Line 2  | `text`  | No       | "e.g. Suite 4"       | Full width     |
| City            | `text`  | No       | "e.g. London"        | Col 1          |
| Postcode        | `text`  | No       | "e.g. SW1A 1AA"      | Col 2          |

### 7.3 Service Assignment

| Field    | Type         | Required | Options / Placeholder               | Grid position |
|----------|-------------|----------|--------------------------------------|---------------|
| Brand    | `select`    | Yes      | FieldSync Services, Acme Recovery    | Col 1         |
| Role     | `select`    | Yes      | Enforcement Agent / Director / Mgr   | Col 2         |
| Clients  | `checkbox`  | No       | OVO, WaterPlus, SSE, Thames, EDF     | Full width    |
| Status   | `select`    | Yes      | Active (default), Inactive, Suspended| Col 1         |
| Start Date | `date`   | Yes      | —                                    | Col 2         |

### 7.4 Additional Notes

| Field  | Type       | Required | Placeholder                              | Grid position |
|--------|-----------|----------|------------------------------------------|---------------|
| Notes  | `textarea`| No       | "Enter any additional notes or comments…" | Full width    |

---

## 8. Form Field Specifications

| Property        | Value                                      |
|-----------------|---------------------------------------------|
| Input height    | `44px`                                      |
| Textarea height | `88px` min, resizable vertically            |
| Border          | `1.5px solid #E0E0E0`                      |
| Border-radius   | `8px`                                       |
| Font-size       | `14px` (body)                               |
| Placeholder     | `--grey-400` (`#BDBDBD`)                    |
| Focus           | border `#3276CF` + shadow ring              |
| Disabled        | bg `#F5F5F5` · text `#BDBDBD`              |
| Label           | `12px / 600`, `--text-primary`, margin-bottom `4px` |
| Required marker | Red `*` using `--color-error`               |
| Error state     | Red border + error icon + error message     |
| Form grid       | `grid-template-columns: 1fr 1fr; gap: 16px 24px` |
| Full width      | `grid-column: 1 / -1`                      |

### 8.1 Checkbox Group

| Property       | Value                                        |
|----------------|----------------------------------------------|
| Layout         | `display: flex; flex-wrap: wrap; gap: 16px`  |
| Checkbox size  | `18px × 18px`                                |
| Accent color   | `--color-primary` (`#3276CF`)                |
| Label gap      | `8px` from checkbox to text                  |
| Min height     | `44px` per label (WCAG touch target)         |

---

## 9. Action Buttons

| Button         | Type        | Style                                     |
|----------------|-------------|-------------------------------------------|
| Cancel         | `<a>` link  | Secondary — white bg, primary border+text  |
| Save as Draft  | `<button>`  | Secondary — white bg, primary border+text  |
| Save Record    | `<button>`  | Primary — blue bg, white text + check icon |

**Behaviour:**
- **Cancel** → navigates back to records list page
- **Save as Draft** → shows toast "Draft saved successfully"
- **Save Record** → validates required fields → shows toast "Record created successfully" → redirects to records list after 1.5s

---

## 10. Validation Pattern

| Trigger        | On "Save Record" button click                                |
|----------------|--------------------------------------------------------------|
| Required check | All fields with `required` attribute                         |
| Error visual   | Red border (`--color-error`) on input                        |
| Error message  | Below input: error icon (circle-exclamation) + "This field is required" |
| Toast on fail  | "Please fill in all required fields"                         |
| Colour          | `--color-error` (`#E53935`) — never colour alone (icon + text) |
| Clear error    | When field gains a value, error clears on next submit attempt |

---

## 11. Responsive Behaviour

| Breakpoint      | Change                                      |
|-----------------|---------------------------------------------|
| `≤ 1024px`      | Grid collapses to `72px 1fr`               |
|                 | Sidebar nav text hidden, icon-only          |
|                 | Form grid → single column (`1fr`)           |

---

## 12. Accessibility (WCAG 2.2 AA)

- **Labels:** Every input has an associated `<label>` via `for/id`
- **Required:** Visual `*` + HTML `required` attribute
- **Error messages:** Icon + text (never colour alone)
- **Focus ring:** `--shadow-focus` on all interactive elements
- **Keyboard:** All form fields focusable with Tab
- **Skip link:** "Skip to main content" targets `#main-content`
- **Breadcrumb:** `aria-label="Breadcrumb"`, `aria-current="page"` on current
- **Checkboxes:** Minimum `44px` touch target via label wrapping
- **Toast:** `role="status"` + `aria-live="polite"`

---

*Generated for the Add Contract Service page — companion to `advance_contract_service_design_guidelines.md`*
