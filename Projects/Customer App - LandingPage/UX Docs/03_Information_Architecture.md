# Information Architecture — Acme Customer App Landing Page

> **Related:** [01_UX_Brief.md](01_UX_Brief.md) · [02_UX_Strategy.md](02_UX_Strategy.md) · BRD §5–§8
> **Scope:** Two surfaces — **Customer-facing Landing Pages (web + mobile web)** and **Customer App — Landing Page Settings module (internal, desktop web)**.

---

## 1. IA Principles

1. **Mirror live structure in the editor** — panel names in the internal editor map 1:1 to headings on the live Landing Pages (BRD §6, §8.2).
2. **One case, one journey** — the customer Landing Pages display a single case at a time; multi-case scenarios use a switcher, not parallel views.
3. **Tabbed parity** — each customer-facing surface (Stages, Make a Payment, Support, Alerts) has a matching tab in the internal editor.
4. **No dead ends** — every node provides at least one forward path and one back path (BRD business rule).
5. **Role-aware visibility** — internal navigation hides actions a user is not eligible to perform (segregation of duties).

---

## 2. Web — Customer-Facing Landing Pages

### 2.1 Sitemap

```
└─ Acme Customer Portal (web + mobile web)
   ├─ /sms-link → /sign-in          ← entry from SMS only
   ├─ /sign-in                      Sign-In / ID&V
   │   ├─ verify                    Postcode + secondary input
   │   ├─ retry                     Controlled retry attempts
   │   └─ locked                    Max attempts → recovery / support
   ├─ /home                         Home / Timeline (primary Landing Page)
   │   ├─ #case-summary             Case ref, balance, fees, stage
   │   ├─ #timeline                 Visual enforcement timeline
   │   ├─ #primary-cta              Pay Now → /pay
   │   └─ #case-switcher            Visible only if multiple cases
   ├─ /pay                          Make a Payment
   │   ├─ /pay/review               Confirm amount & fees
   │   ├─ → external payment gateway
   │   ├─ /pay/success
   │   └─ /pay/failure              Retry / change card / contact support
   ├─ /enforcement                  Enforcement Information
   │   ├─ /enforcement/stage/:id    Stage-specific explanation
   │   └─ /enforcement/consequences What happens next
   ├─ /support                      Support
   │   ├─ /support/faqs
   │   ├─ /support/vulnerability    Vulnerability options
   │   ├─ /support/complaints       External complaints form
   │   └─ /support/contact          Telephone / written channels
   ├─ Global modals
   │   ├─ Alert: Late-fee added
   │   ├─ Alert: Case reference details (council tax)
   │   └─ Alert: Case reference details (parking fine, with photo)
   └─ Global states
       ├─ Session expired
       ├─ Error (5xx)
       └─ Maintenance
```

### 2.2 Navigation Model (Customer)

- **Primary nav:** *implicit* — the journey is linear from Home; secondary tabs (Enforcement Info, Support) are surfaced as inline cards on Home, not a persistent top bar.
- **Persistent header:** Acme brand, case ref (post-auth only), `Sign out`.
- **Persistent footer:** Help · Privacy · Accessibility · Cookie preferences.
- **Modal layer:** Alerts/popups (Late-fee, Council tax, Parking fine) appear contextually based on stage / event triggers; close action always returns to underlying screen.
- **Back behaviour:** Browser back must never bypass authentication; expired sessions redirect to `/sign-in`.

### 2.3 Role-Based Access (Customer surface)
There is exactly **one** role on the customer surface — **Customer (authenticated)**. There is **no anonymous content** beyond `/sign-in` and the global footer pages. All case-specific content requires `session.verified = true`.

---

## 3. Mobile (Customer)

The customer surface is **responsive web** (BRD does not scope a native app). The mobile sitemap is identical to web; the navigation model adapts as follows:

- **Mobile-first layout** — single column, 16 px gutters, sticky primary CTA at the bottom of `/home`, `/pay`, `/pay/review`.
- **Timeline** collapses to a vertical stepper; current stage is sticky on scroll.
- **Modals** become full-screen sheets with a top-anchored close (X) button (44 × 44 px hit area).
- **Case switcher** opens as a bottom sheet.
- **Footer** collapses to a single `Help` link expanding into a sheet of utility links.

---

## 4. Web — Customer App (Internal Editor)

### 4.1 Sitemap

```
└─ Customer App (internal, desktop web)
   ├─ /login                          SSO
   ├─ /dashboard                      Landing Page Settings entry
   │   └─ Content cards (one per template family)
   │      ├─ Card: Enforcement Stages
   │      ├─ Card: Make a Payment
   │      ├─ Card: Support
   │      └─ Card: Alerts / Popups
   ├─ /editor/landing-page            Editor shell (the prototype)
   │   ├─ Header
   │   │   ├─ Template selector (tablist)
   │   │   │   ├─ Tab: Enforcement Stages   (#tab-stages)
   │   │   │   ├─ Tab: Make a Payment       (#tab-payment)
   │   │   │   ├─ Tab: Support              (#tab-support)
   │   │   │   └─ Tab: Alerts / Popups      (#tab-alerts)
   │   │   ├─ Meta-grid (per template)
   │   │   │   ├─ Template name
   │   │   │   ├─ Owner
   │   │   │   ├─ Last edited
   │   │   │   ├─ Version
   │   │   │   └─ Status pill   (Draft / In Review / In Publish / Published)
   │   │   └─ Action group
   │   │      ├─ Live Preview     (icon)
   │   │      ├─ Preview          (icon)
   │   │      ├─ Audit log        (icon)
   │   │      ├─ Reject           (visible when Approve enabled)
   │   │      ├─ Refuse           (visible when Publish enabled)
   │   │      └─ Save / Approve / Publish   (shared primary; label per state)
   │   ├─ Panel: Enforcement Stages
   │   │   └─ Stage cards (Compliance, Enforcement, Sale, Court)
   │   ├─ Panel: Make a Payment
   │   │   ├─ Hero
   │   │   ├─ Case summary
   │   │   ├─ Balance & fees breakdown
   │   │   └─ FAQ accordion
   │   ├─ Panel: Support
   │   │   ├─ Intro
   │   │   ├─ Vulnerability block
   │   │   ├─ Complaints block
   │   │   └─ Contact block
   │   └─ Panel: Alerts / Popups
   │      ├─ Vertical tab rail
   │      │   ├─ Late Fee Alert
   │      │   ├─ Case Reference (Council tax)
   │      │   └─ Case Reference - 1 (Parking fine)
   │      └─ Card preview (selected)
   ├─ Modals
   │   ├─ Preview (desktop & mobile responsive toggle)
   │   ├─ Reject (mandatory comment)
   │   ├─ Refuse (mandatory comment)
   │   ├─ Variable picker
   │   ├─ Hyperlink editor
   │   └─ Confirm publish
   ├─ Drawers
   │   └─ Audit log (shared, contextual to active template)
   └─ Settings / profile / sign out
```

### 4.2 Navigation Model (Internal Editor)

- **Primary nav:** template `tablist` (4 tabs) — `role="tab"`, arrow-key support, `aria-selected` synchronised with status pill.
- **Secondary nav inside Alerts tab:** `aria-orientation="vertical"` tablist for popup variants (`atab-late-fee`, `atab-council-tax`, `atab-parking-fine`).
- **Action group** is co-located in the header to keep state changes visible alongside content state changes.
- **Modals** never block status changes silently — every confirmed action writes an audit entry and surfaces a toast.
- **Drawer** opens from the right (44 px close icon hit area, ESC to dismiss, focus-trapped).

### 4.3 Role-Based Access (Internal)

| Surface element | Author | Reviewer | Publisher | Compliance Lead |
|-----------------|:------:|:--------:|:---------:|:---------------:|
| View Landing Page Settings cards | ✅ | ✅ | ✅ | ✅ |
| Open editor for any template | ✅ | ✅ | ✅ | ✅ (read-only) |
| Edit content / formatting / variables / hyperlinks | ✅ | ❌ | ❌ | ❌ |
| Save draft | ✅ | ❌ | ❌ | ❌ |
| Submit for review | ✅ | ❌ | ❌ | ❌ |
| Reject (with comment) | ❌ | ✅ | ❌ | ❌ |
| Approve | ❌ | ✅ | ❌ | ❌ |
| Refuse at Publish (with comment) | ❌ | ❌ | ✅ | ❌ |
| Publish | ❌ | ❌ | ✅ | ❌ |
| View audit log | ✅ | ✅ | ✅ | ✅ |
| Export audit log | ❌ | ❌ | ❌ | ✅ |
| Act on a request they previously acted on (SoD) | ❌ | ❌ | ❌ | n/a |

**Status pill state machine:**
```
Draft  ──Submit──▶  In Review  ──Approve──▶  In Publish  ──Publish──▶  Published
   ▲                    │                      │
   └────Reject──────────┘                      │
   └──────────────Refuse───────────────────────┘
```

---

## 5. Mobile (Internal Editor)

The internal editor is **desktop-first**. On tablets (≥ 768 px) the layout is preserved with the meta-grid wrapping into 2-row format. Below 720 px:

- The horizontal template tablist becomes a horizontally-scrolling chip group.
- The vertical alerts tab rail flips to a horizontal chip group above the card preview.
- The action group collapses into an overflow menu (`MoreVert`), preserving Approve / Publish as the visible primary.

**Recommendation:** discourage editing on mobile (warn at < 720 px). All approval / publish actions remain available so a Publisher on the move can still release content reviewed earlier on desktop.

---

## 6. Content Inventory (mapping editor panels ↔ live page sections)

| Editor tab | Editor panel | Live Landing Page section | Variables |
|------------|--------------|---------------------------|-----------|
| Enforcement Stages | Stage cards (Compliance / Enforcement / Sale / Court) | `/home #timeline`, `/enforcement/stage/:id` | `case_reference`, `stage`, `balance`, `fees` |
| Make a Payment | Hero, Case summary, Fee breakdown, FAQ | `/pay`, `/pay/review` | `case_reference`, `balance`, `fees`, `due_date` |
| Support | Intro, Vulnerability, Complaints, Contact | `/support/*` | `phone_number`, `complaints_url` |
| Alerts / Popups | Late fee, Council tax, Parking fine | Global modals triggered on `/home` and `/pay` | `case_reference`, `amount_due`, `offence`, `date_issued` |

---

## 7. Acceptance Criteria

- **AC-IA1** Every customer-facing route is reachable from `/home` in ≤ 2 clicks.
- **AC-IA2** Every editor panel has a one-to-one heading match with its live counterpart (BRD §6).
- **AC-IA3** Tab order in the editor follows the customer journey order (Stages → Payment → Support → Alerts).
- **AC-IA4** All editor actions disabled for a user's role show an accessible tooltip explaining why (e.g., "Only a Reviewer can approve").
- **AC-IA5** No customer-facing content area resolves without `session.verified = true`.
- **AC-IA6** Audit drawer is reachable from every editor state without losing unsaved work.
