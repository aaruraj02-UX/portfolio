# Information Architecture — ProServe Master EA Platform

| Field | Detail |
|---|---|
| **Project** | ProServe — Enforcement Agent Master Data Platform |
| **Version** | 1.0 |
| **Date** | 20 April 2026 |
| **Status** | Draft |

---

## 1. Sitemap — Web Application

```
ProServe Master EA Platform
│
├── Landing / Role Selection (landing.html)
│   └── 10 role cards → sets session role → redirects to Records
│
├── Records List (advance_contact_service.html)
│   ├── Search bar (name, ID, brand, status)
│   ├── Filter controls (status, brand, area, approval state)
│   ├── Sort controls (name, date, status)
│   ├── Records table
│   │   ├── Row → View Record
│   │   └── Row → Edit Record (if permitted)
│   ├── + Add New Record button (if creator role)
│   └── Audit Log panel (slide-out right panel)
│
├── Add Record (add_contract_service.html)
│   ├── Step 1 — Personal Details
│   │   ├── Identity (Talos ID, User ID, Engage ID, Nexum ID)
│   │   ├── Name (Title, First, Middle, Last, Known As)
│   │   ├── Contact (Phone, Email)
│   │   ├── Home Address (Line 1–3, Town/City, Postcode, PAF Lookup)
│   │   ├── Employment (Started On, Brand, Area, Role, Access Level,
│   │   │   Operational User, Cost Centre, Contact Lines 1–3,
│   │   │   Status Change Date, Non-Starter, Training Required,
│   │   │   Employment Status, Left On)
│   │   └── Attachments (Profile Photo, Documents)
│   ├── Step 2 — Compliance
│   │   └── Name, Qualification, Awarding Body, Date of Authorisation, Notes
│   ├── Step 3 — Certificate Processing
│   │   └── Status, Process Start Date, Transaction Auth Code, Court,
│   │       DBS Requested, Hearing Time, Outcome, Deferred Hearing Date,
│   │       Deferred Outcome, Notes
│   ├── Step 4 — Certificate Status
│   │   └── Name, Status, Date of Certification, Certificate Expiry,
│   │       Copy of Certificate (upload), Court
│   ├── Step 5 — Bond
│   │   └── Contractor Name, Bond Type ID, Bond Number, Hold (toggle), Notes
│   ├── Step 6 — Contract
│   │   └── Name, Status, Start Date, Banking Details (Name, Account,
│   │       Branch, Sort Code, Building Society Roll, Effective Date),
│   │       VAT Registration, A/R Status, A/R Name, Address,
│   │       Status Determination Statement, Company Reg Cert,
│   │       Insurance Documents
│   ├── Step 7 — Asset Management
│   │   └── Asset Type, BWV Date, BWV Encrypted, Mobile ANPR,
│   │       Van ANPR, Laptop, Kit Returned
│   └── Step 8 — Enforcement
│       ├── Configuration (Officer ID, First/Middle/Last Name, Phone,
│       │   Email, Brand, Officer Type, Role, Case Type, Debt Type,
│       │   Started On, Left On, Contact Lines 1–3)
│       ├── Postcodes (Primary, Secondary, Outcodes)
│       ├── Certification (Cert Expiry)
│       ├── Income (Permitted Income, Income Streams, Min Fee,
│       │   Flat Rate, Excluded Client, Performance Bonus)
│       └── Devices (Lone Working, Mobile Phone)
│
├── Edit Record (edit_contract_service.html)
│   ├── Page Header (Record ID, Approve/Reject buttons)
│   ├── Approval Status Banner (Pending / Approved / Rejected)
│   ├── Steps 1–8 (same structure as Add, with pre-populated data)
│   └── Rejection Modal (section-by-section comments)
│
├── View Record (view_contract_service.html)
│   ├── Profile Hero Card (avatar, name, status badges, key stats)
│   ├── Tab Navigation
│   │   ├── Personal Details tab
│   │   └── Audit Log tab
│   ├── Approval Status Banner
│   ├── Record Cards (per entity)
│   │   ├── Compliance
│   │   ├── Certificate Processing
│   │   ├── Certificate Status
│   │   ├── Bond
│   │   ├── Contract
│   │   ├── Asset Management
│   │   └── Enforcement
│   └── Rejection Modal (section-by-section comments)
│
└── Global Elements
    ├── Left Navigation
    │   ├── Dashboard (future)
    │   ├── Records (active)
    │   ├── Reports (future)
    │   └── Settings (future)
    ├── Top Navigation
    │   ├── Search
    │   ├── Notifications (future)
    │   └── User Profile / Logout
    ├── RBAC Banner (role name, access level, switch link)
    └── Toast / Success Popup (action confirmation)
```

---

## 2. Navigation Model

### 2.1 Left Navigation (Persistent Sidebar)
The left navigation is a persistent vertical sidebar visible on all pages except the landing/role selection page.

| Item | Icon | State | Notes |
|------|------|-------|-------|
| Dashboard | Grid/Home | Future | Placeholder, not linked |
| Records | List/Table | **Active** | Primary working area |
| Reports | Chart/Bar | Future | Visible to roles with report access |
| Settings | Gear | Future | Visible to admin roles |

- Active state: text and icon colour `#3276CF`
- Default state: text and icon colour `#212121`
- Collapsed at ≤ 1024px: icons only, 72px width

### 2.2 Top Navigation Bar
Fixed horizontal bar above main content area.

| Element | Position | Behaviour |
|---------|----------|-----------|
| Page title / Breadcrumb | Left | Contextual to current page |
| Search | Centre-right | Quick search by EA name, ID, or reference |
| Notifications (future) | Right | Bell icon with badge count |
| User avatar / menu | Far right | Profile, role info, logout |

### 2.3 Breadcrumb Trail
Appears on Add, Edit, and View pages.

| Page | Breadcrumb |
|------|------------|
| Records List | Records |
| Add Record | Records › Add Record |
| Edit Record | Records › Edit Record — {ID} |
| View Record | Records › {EA Name} — #{ID} |

### 2.4 Stepper Navigation (Add & Edit)
Horizontal stepper indicating progress through 8 entities.

| Behaviour | Description |
|-----------|-------------|
| Active step | Blue circle with step number, bold label |
| Completed step | Green circle with checkmark, regular label |
| Future step | Grey circle with number, muted label |
| Hidden step | RBAC removes step from DOM; remaining steps renumber sequentially |
| Connectors | Horizontal lines between steps, hidden when adjacent step hidden |

---

## 3. Data Entity Model (8 Entities)

| Step | Entity | Key Fields | Field Count |
|------|--------|------------|-------------|
| 1 | Personal Details | Talos ID, Name, DOB, Contact, Address, Employment, Attachments | 37 |
| 2 | Compliance | Name, Qualification, Awarding Body, Auth Date, Notes | 5 |
| 3 | Certificate Processing | Status, Start Date, Court, DBS, Hearing, Outcome, Notes | 10 |
| 4 | Certificate Status | Name, Status, Date, Expiry, Certificate Copy, Court | 6 |
| 5 | Bond | Contractor, Type, Number, Hold, Notes | 5 |
| 6 | Contract | Name, Status, Start Date, Banking (6 fields), VAT, A/R, Address, Docs (3) | 18 |
| 7 | Asset Management | Type, BWV Date, BWV Encrypted, ANPR (2), Laptop, Kit Returned | 7 |
| 8 | Enforcement | Config (16), Postcodes (3), Certification (1), Income (6), Devices (2) | 28 |

---

## 4. Role-Based Access Matrix (Entity Level)

| Entity | CS Lead Admin | CS Member | IT | Directors | Snr EM | EM | EA | Finance | Facilities | Audit |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Personal | ✏️ | ✏️ | 👁️ | ✏️* | ✏️* | ✏️* | ✏️* | 👁️ | 👁️ | 👁️ |
| Compliance | ✏️ | ✏️ | — | — | — | — | — | — | — | 👁️ |
| Cert Processing | ✏️ | ✏️ | — | ✏️* | ✏️* | 👁️ | 👁️ | — | — | 👁️ |
| Cert Status | ✏️ | ✏️ | — | ✏️* | ✏️* | 👁️ | 👁️ | — | — | 👁️ |
| Bond | ✏️ | ✏️ | — | 👁️ | 👁️ | 👁️ | 👁️ | — | — | 👁️ |
| Contract | ✏️ | ✏️ | — | — | — | — | — | 👁️ | — | — |
| Asset | ✏️ | — | ✏️ | 👁️ | 👁️ | 👁️ | 👁️ | — | — | — |
| Enforcement | ✏️ | — | — | ✏️ | ✏️ | ✏️ | ✏️* | — | — | — |
| Audit Log | ✏️ | 👁️ | ✏️ | ✏️ | 👁️ | 👁️ | 👁️ | 👁️ | 👁️ | 👁️ |
| Reports | ✏️ | ✏️ | ✏️ | ✏️ | — | — | — | — | — | — |
| Creator | ✅ | ✅ | — | — | — | — | — | — | — | — |
| Approver | ✅ | — | ✅ | ✅ | — | — | — | — | — | — |

**Legend:** ✏️ = Edit | 👁️ = View Only | — = No Access | * = Field-level restrictions apply

---

## 5. Role-Based Access Matrix (Field Level — Enforcement Roles)

### 5.1 Personal Details

| Field | Directors | Snr EM | EM | EA |
|-------|:---------:|:------:|:--:|:--:|
| Officer Number / Talos ID / User ID | 👁️ | 👁️ | 👁️ | 👁️ |
| Title, First/Middle/Last Name | 👁️ | ✏️ | ✏️ | 👁️ |
| Known As | ✏️ | ✏️ | ✏️ | 👁️ |
| Phone, Email | ✏️ | ✏️ | ✏️ | ✏️ |
| DOB, Start Date | 👁️ | 👁️ | 👁️ | 👁️ |
| Contact Lines 1–3 | ✏️ | ✏️ | ✏️ | 👁️ |
| Brand | ✏️ | 👁️ | 👁️ | 👁️ |
| Cost Centre | ✏️ | 👁️ | 👁️ | 👁️ |
| Area, Role | ✏️ | ✏️ | ✏️ | 👁️ |
| Training Required | ✏️ | 👁️ | 👁️ | 👁️ |
| Attachments | 👁️ | 👁️ | 👁️ | 👁️ |
| Address (all fields) | ✏️ | ✏️ | ✏️ | ✏️ |
| Non-Starter, Status Change Date, Operational User | — | — | — | — |

### 5.2 Enforcement

| Field | Directors | Snr EM | EM | EA |
|-------|:---------:|:------:|:--:|:--:|
| Teams | ✏️ | ✏️ | ✏️ | 👁️ |
| Primary/Secondary Postcodes, Outcodes | ✏️ | ✏️ | ✏️ | — |
| Potential | ✏️ | ✏️ | ✏️ | 👁️ |
| Permitted Income Streams, Sub-type | ✏️ | ✏️ | ✏️ | — |
| Mobile Phone, Lone Working Device | ✏️ | ✏️ | ✏️ | 👁️ |
| Contact Phone, Email | ✏️ | ✏️ | ✏️ | ✏️ |
| Officer Number, Payroll ID | 👁️ | 👁️ | 👁️ | 👁️ |
| Case Types | ✏️ | ✏️ | ✏️ | 👁️ |
| Brand | ✏️ | 👁️ | 👁️ | 👁️ |
| Started On, Left On | 👁️ | 👁️ | 👁️ | 👁️ |
| Cert Expiry | ✏️ | ✏️ | 👁️ | 👁️ |
| Flat Rate, Performance Bonus | ✏️ | ✏️ | 👁️ | — |
| Office Manager | ✏️ | ✏️ | 👁️ | 👁️ |

---

## 6. Content Inventory by Page

### 6.1 Records List Page

| Component | Content | Interaction |
|-----------|---------|-------------|
| Page header banner | "Records" title, Approve/Reject buttons (for approvers) | — |
| Search bar | Free-text search by name, ID, reference | Real-time filter |
| Filter controls | Status, Brand, Area, Approval State dropdowns | Multi-select filter |
| Records table | Columns: Photo, Name, EA ID, Brand, Area, Status, Approval, Actions | Sort, paginate |
| Row actions | View (eye icon), Edit (pencil icon) | Navigate to View/Edit |
| Add New button | "+ Add New Record" | Navigate to Add page |
| Audit Log panel | Slide-out right panel with filterable change log | Filter by entity, date |

### 6.2 Add/Edit Record Page

| Component | Content | Interaction |
|-----------|---------|-------------|
| RBAC banner | Role name, access level, switch role link | Informational |
| Page header | "Records — Add/Edit Record" with action buttons | — |
| Breadcrumb | Records › Add/Edit Record | Navigate back |
| Approval banner (Edit only) | Status (Pending/Approved/Rejected), submitter, approver | Informational |
| Stepper nav | 8 steps, dynamically filtered by RBAC | Click to navigate |
| Form sections | Fields grouped by sub-entity within each step | Input, select, upload |
| Button row | Back, Save as Draft, Save & Continue / Save Record | Navigation, save |
| Rejection modal | Section-by-section comment textareas | Submit rejection |

### 6.3 View Record Page

| Component | Content | Interaction |
|-----------|---------|-------------|
| RBAC banner | Role name, access level, switch role link | Informational |
| Profile hero card | Avatar, name, status badges, key stats, action buttons | Edit, Back |
| Approval banner | Status, submitter, pending approver | Informational |
| Tab navigation | Personal Details, Audit Log | Tab switch |
| Record cards | One per entity: Compliance, Cert Processing, Cert Status, Bond, Contract, Asset, Enforcement | Expand, Add New |
| Rejection modal | Section-by-section comments (approver roles only) | Submit rejection |

---

## 7. Approval Workflow (Information Flow)

```
EA Record Change
      │
      ▼
  Keyer submits change
      │
      ▼
  Status → "Pending Approval"
      │
      ▼
  Assigned Approver(s) notified
      │
      ├── Approve → Status → "Approved"
      │                  │
      │                  ▼
      │         Sync to downstream systems
      │         (Atlas, Optimise, Asset Register)
      │                  │
      │                  ▼
      │         Sync status updated per EA
      │
      └── Reject → Status → "Rejected"
                         │
                         ▼
              Section-level rejection comments
              sent back to Keyer
                         │
                         ▼
              Keyer revises & resubmits
```

### Approval Routing Rules

| Submitter | Approver(s) |
|-----------|-------------|
| Contract Service Team Member | Contract Service Team Lead |
| Enforcement Director | Contract Service Team Lead |
| Senior Enforcement Manager | Enforcement Director + Contract Service Team Lead |
| Enforcement Manager | Enforcement Director + Contract Service Team Lead + Senior EM |
| Enforcement Agent | Can edit own details; changes reviewed by Enforcement Manager |

---

## 8. Search & Filter Model

### 8.1 Search
| Type | Scope | Behaviour |
|------|-------|-----------|
| Global search (top nav) | All EA records | Real-time typeahead, matches name, ID, reference |
| Table search | Current filtered view | Filters visible rows |

### 8.2 Filters
| Filter | Values | Type |
|--------|--------|------|
| Status | Active, Inactive, Pending, Leaver | Multi-select |
| Brand | All configured brands | Multi-select |
| Area | All configured areas | Multi-select |
| Approval State | Pending, Approved, Rejected, None | Multi-select |
| Role | All configured roles | Multi-select |

### 8.3 Sort
| Column | Default | Direction |
|--------|---------|-----------|
| Name | A–Z | Ascending / Descending |
| EA ID | Numeric | Ascending / Descending |
| Start Date | Latest first | Ascending / Descending |
| Status | — | Ascending / Descending |
| Approval | — | Ascending / Descending |
