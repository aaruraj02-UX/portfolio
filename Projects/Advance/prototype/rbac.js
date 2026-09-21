/* ═══════════════════════════════════════════════════════════
   RBAC — Role-Based Access Control for Prototype Demo
   Source: Master EA - RBAC (Enforcement) v0.1 (1).xlsx
   Updated: aligns entity-level + field-level access to the
   detailed sheets (Personal Details, Compliance, Certificate,
   Contract, Bond, Asset Management, Enforcement).
   ═══════════════════════════════════════════════════════════ */

var RBAC_ROLES = {
  'cs-lead-admin': {
    label: 'Contractor Services Team Lead',
    app: 'Web',
    /* CS Lead has full edit on records owned by Contractor Services
       (Personal, Compliance, Certificate, Contract, Bond) and view
       on Asset Management; no access to Enforcement entity.
       Asset Management is EDIT-restricted to IT / Service Desk on
       the add/edit pages via rbacApplyToStepper. */
    personal: 'edit', compliance: 'edit', certProcessing: 'edit', certStatus: 'edit',
    contract: 'edit', bond: 'edit', asset: 'view', enforcement: 'none',
    auditLog: 'edit', report: 'edit', creator: true, approver: true
  },
  'cs-member': {
    label: 'Contractor Services Team Member',
    app: 'Web',
    personal: 'edit', compliance: 'edit', certProcessing: 'edit', certStatus: 'edit',
    contract: 'edit', bond: 'edit', asset: 'view', enforcement: 'none',
    auditLog: 'view', report: 'edit', creator: true, approver: false
  },
  'it-service-desk': {
    label: 'IT / Service Desk',
    app: 'Web',
    /* Not in the v0.1 (1) RBAC matrix – preserved for backwards
       compatibility with the existing prototype landing page.
       IT / Service Desk is NOT part of the approval workflow –
       Approve/Reject actions are hidden for this role. */
    personal: 'view', compliance: 'none', certProcessing: 'none', certStatus: 'none',
    contract: 'none', bond: 'none', asset: 'edit', enforcement: 'none',
    auditLog: 'edit', report: 'edit', creator: false, approver: false
  },
  'enforcement-director': {
    label: 'Enforcement Directors',
    app: 'Web',
    /* Per detail sheets: Certificate (Processing & Status) and Bond
       are View only for Enforcement roles – certification process
       sits with Contractor Services. Asset Management is view here;
       the add/edit pages restrict Asset entirely to IT / Service Desk
       via rbacApplyToStepper. */
    personal: 'edit', compliance: 'none', certProcessing: 'view', certStatus: 'view',
    contract: 'none', bond: 'view', asset: 'view', enforcement: 'edit',
    auditLog: 'edit', report: 'edit', creator: false, approver: true
  },
  'senior-em': {
    label: 'Senior Enforcement Managers',
    app: 'Web / Mobile',
    personal: 'edit', compliance: 'none', certProcessing: 'view', certStatus: 'view',
    contract: 'none', bond: 'view', asset: 'view', enforcement: 'edit',
    auditLog: 'view', report: 'none', creator: false, approver: true
  },
  'enforcement-manager': {
    label: 'Enforcement Manager',
    app: 'Web / Mobile',
    personal: 'edit', compliance: 'none', certProcessing: 'view', certStatus: 'view',
    contract: 'none', bond: 'view', asset: 'view', enforcement: 'edit',
    auditLog: 'view', report: 'none', creator: false, approver: false
  },
  'ea': {
    label: 'EA (Enforcement Agent)',
    app: 'Web / Mobile',
    /* EA can edit a small set of personal contact fields only
       (phones, email, address). Enforcement entity is 'edit' so
       Contact Phone + Email remain editable, but most other
       Enforcement fields are view-only or hidden per matrix.
       Asset Management is view here; the add/edit pages restrict
       Asset entirely to IT / Service Desk via rbacApplyToStepper.
       Contract entity is now 'edit' per the Field Change
       Notifications matrix — EA can Edit the banking + address
       block on Contract Services, and View the remaining fields. */
    personal: 'edit', compliance: 'none', certProcessing: 'view', certStatus: 'view',
    contract: 'edit', bond: 'view', asset: 'view', enforcement: 'edit',
    auditLog: 'view', report: 'none', creator: false, approver: false
  },
  'slt': {
    label: 'SLT (Senior Leadership Team)',
    app: 'Web',
    /* Read-only oversight role added in v0.1 (1). */
    personal: 'view', compliance: 'none', certProcessing: 'view', certStatus: 'view',
    contract: 'view', bond: 'view', asset: 'view', enforcement: 'view',
    auditLog: 'view', report: 'view', creator: false, approver: false
  },
  'finance': {
    label: 'Finance',
    app: 'Web',
    personal: 'view', compliance: 'none', certProcessing: 'none', certStatus: 'none',
    contract: 'view', bond: 'none', asset: 'none', enforcement: 'none',
    auditLog: 'view', report: 'none', creator: false, approver: false
  },
  'facilities': {
    label: 'Facilities',
    app: 'Web',
    personal: 'view', compliance: 'none', certProcessing: 'none', certStatus: 'none',
    contract: 'none', bond: 'none', asset: 'none', enforcement: 'none',
    auditLog: 'view', report: 'none', creator: false, approver: false
  },
  'fleet': {
    label: 'Fleet',
    app: 'Web',
    personal: 'view', compliance: 'none', certProcessing: 'none', certStatus: 'none',
    contract: 'none', bond: 'none', asset: 'none', enforcement: 'none',
    auditLog: 'view', report: 'none', creator: false, approver: false
  },
  'audit': {
    label: 'Audit',
    app: 'Web',
    personal: 'view', compliance: 'view', certProcessing: 'view', certStatus: 'view',
    contract: 'none', bond: 'view', asset: 'none', enforcement: 'none',
    auditLog: 'view', report: 'none', creator: false, approver: false
  }
};

/* ═══════════════════════════════════════════════════════════
   APPROVAL CHAIN — Who approves records modified by whom
   Rule: enforcement-manager → senior-em → cs-lead-admin
   ═══════════════════════════════════════════════════════════ */
var RBAC_APPROVAL_CHAIN = {
  'enforcement-manager': { approver: 'senior-em',       approverLabel: 'Senior Enforcement Managers' },
  'senior-em':           { approver: 'cs-lead-admin',   approverLabel: 'Contract Service Team Lead - Admin' },
  'cs-member':           { approver: 'cs-lead-admin',   approverLabel: 'Contract Service Team Lead - Admin' }
};

/**
 * Check if the current role can approve a record given its approvalTarget.
 * Returns true if the current role matches the record's approvalTarget,
 * OR if no approvalTarget is set but the role has generic approver permission.
 */
function rbacCanApproveRecord(roleKey, record) {
  if (!record) return RBAC_ROLES[roleKey] && RBAC_ROLES[roleKey].approver;
  if (record.approvalTarget) return record.approvalTarget === roleKey;
  return RBAC_ROLES[roleKey] && RBAC_ROLES[roleKey].approver;
}

/* ═══════════════════════════════════════════════════════════
   FIELD-LEVEL PERMISSIONS — Per role, per entity
   Source: Master EA - RBAC (Enforcement) v0.1 (1).xlsx
            Sheets: Personal Details, Certificate, Enforcement
   Convention applied from the spreadsheet:
     - Black-filled empty cell  → field HIDDEN for that role
     - "View" cell              → field rendered disabled
     - "Edit" cell              → field fully editable
     - Empty/no-fill cell       → field not applicable to role
   Hidden fields are removed from the form even when the entity
   itself is view-only (so they never appear in the UI).
   ═══════════════════════════════════════════════════════════ */

/* Asset Management — fields hidden for ALL enforcement roles.
   Per matrix only the Asset Type, BWV Camera Encrypted,
   Mobile ANPR Kit, Van ANPR, Laptop and (ED/SEM/EM only)
   Kit Returned toggles remain visible. Everything else is
   removed. List covers BOTH the add-page IDs and the edit-page
   `edit*` prefixed IDs. */
var RBAC_ASSET_HIDDEN_COMMON = [
  /* Asset Identity */
  'assetId','editAssetId',
  'assetTypeId','editAssetTypeId',
  'serialNumber','editSerialNumber',
  'assetTag','editAssetTag',
  /* Device Details */
  'deviceName','editDeviceName',
  'macAddress','editMacAddress',
  'manuId','editManuId',
  'assetModel','editAssetModel',
  'modelCode','editModelCode',
  /* Purchase Information */
  'purchaseOrder','editPurchaseOrder',
  'purchaseReference','editPurchaseReference',
  'purchasedDate','editPurchasedDate',
  'purchasedFrom','editPurchasedFrom',
  /* Description & Notes */
  'assetDescription','editAssetDescription',
  'assetNote','editAssetNote',
  /* Location & Ownership */
  'assetCompanyId','editAssetCompanyId',
  'assetSite','editAssetSite',
  'locationId','editLocationId',
  'ownershipType','editOwnershipType',
  /* Audit Trail */
  'assetAddedBy','editAssetAddedBy',
  'assetAddedDate','editAssetAddedDate',
  'assetModifiedBy','editAssetModifiedBy',
  'assetModifiedDate','editAssetModifiedDate',
  /* BWV & ANPR — only the date is hidden; assetType + bwvEncrypted remain */
  'bwvDate','editBwvDate',
  /* Mobile & Equipment — Lone Working Device hidden for all enforcement roles */
  'loneWorkingDevice','editLoneWorkingDevice'
];

/* Enforcement entity — fields hidden for ALL enforcement roles per
   matrix (Personal sub-section: First Name, Middle Name, Last Name,
   Contact Phone, Email + Payroll ID — all BLACK across roles).
   Covers BOTH the add-page (`enf*`) and edit-page (`editEnf*`) IDs. */
var RBAC_ENF_HIDDEN_COMMON = [
  'enfFirstName','editEnfFirstName',
  'enfMiddleName','editEnfMiddleName',
  'enfLastName','editEnfLastName',
  'enfKnownAs','editEnfKnownAs',
  'enfPhone','editEnfPhone',
  'enfEmail','editEnfEmail',
  /* Payroll ID — BLACK for all four enforcement roles */
  'enfPayrollId','editEnfPayrollId'
];

/* ═══════════════════════════════════════════════════════════
   FIELD-LEVEL PERMISSIONS
   Source: business\Advance Field Change Notifications
           (In App and Email).xlsx  →  rbac_field_matrix.md
   Convention:
     - `viewOnly` : field is rendered but disabled (matches "View"
                    in the matrix). Applied only when the entity
                    itself is edit-accessible; on view-only entity
                    flows the global disable pass already covers
                    every input.
     - `hidden`   : field is removed from the DOM (matches "Hide"
                    / "-" in the matrix). Applied for BOTH edit and
                    view entity flows so black-cell fields never
                    appear in the UI.
   Fields NOT listed default to Edit (when the entity is edit).
   ═══════════════════════════════════════════════════════════ */

/* Personal Details — hidden for ALL enforcement roles
   (ED / SEM / EM / EA). Matches every row that is "-" across all
   four enforcement columns in the Personal Details table
   (Nexum ID, Non-Starter, Status Change Date, Operational User,
   Left On, Engage ID, Engagement Status, Reason for Leaving,
   Personal Phone, Business Phone, Engage Motor Finance,
   Engage High Court). `accessLevel` is a legacy field not present
   in the notifications matrix — kept hidden for enforcement roles
   as a defensive default. `reasonForLeavingOther` is the
   conditional "Other" text input revealed by toggleReasonOther()
   when reasonForLeaving = "Other"; hidden here so it stays
   suppressed if the underlying reason changes at runtime. */
var RBAC_PERSONAL_HIDDEN_ENF = [
  'nexumId',
  'nonStarter','statusChangeDate','operationalUser',
  'leftOn','engageId','employmentStatus','reasonForLeaving',
  'reasonForLeavingOther','reasonForLeavingOtherWrap',
  'phonePersonal','phoneBusiness',
  'engageMotorFinance','engageHighCourt',
  'accessLevel'
];

/* Personal Details — viewOnly for ED / SEM / EM. Identical View
   pattern for all three manager rows in the matrix. `personalEmail`
   is View for managers but Edit for EA (handled below).
   `businessEmail` is Hide for managers but View for EA. Address
   block is View for managers but Edit for EA.

   Note on address IDs — the visible address control on both the
   add and edit pages is the `addressSearch` combobox that drives
   PAF look-up; `addressLine1`, `addressLine2`, `addressLine3` and
   `townCity` are hidden `<input>` backing stores populated by the
   combobox. Only the visible controls (`addressSearch` +
   `postcode`) need the View treatment — disabling the hidden
   inputs would strip their values from form submission.  */
var RBAC_PERSONAL_VIEW_ENF_MGR = [
  'talosId','userId',
  'title','firstName','middleName','lastName','knownAs',
  'personalEmail',
  'dob','startedOn',
  'firstLineContact','secondLineContact','thirdLineContact',
  'brandsMultiSelect','costCentre','areasMultiSelect','role',
  'trainingRequired','attachment',
  'addressSearch','postcode',
  /* Driving Licence + Emergency Contact fields sit on the Personal
     Details tab in the prototype (moved from Enforcement). Per the
     notifications matrix they are View for ED / SEM / EM. */
  'drivingLicence','licenceNumber','licenceExpiry',
  'emergencyForeName','emergencyMiddleName','emergencySurname',
  'emergencyRelation','emergencyPhone','emergencyEmail'
];

/* Enforcement — hidden for EA on top of RBAC_ENF_HIDDEN_COMMON.
   Matches every row in the Enforcement table where the EA column
   is "-" (Hide) per the notifications matrix. */
var RBAC_ENF_HIDDEN_EA_EXTRA = [
  'enfOfficerId','editEnfOfficerId',
  'enfPersonalPhone','editEnfPersonalPhone',
  'enfBusinessPhone','editEnfBusinessPhone',
  'enfOfficerType','editEnfOfficerType',
  'enfRole','editEnfRole',
  'enfTeam','editEnfTeam',
  'enfPrimaryPostcode','editEnfPrimaryPostcode',
  'enfSecondaryPostcode','editEnfSecondaryPostcode',
  'enfPotentialPostcode','editEnfPotentialPostcode',
  'enfMaxAddresses','editEnfMaxAddresses',
  'enfVanAnpr','editEnfVanAnpr',
  'enfPermittedIncomeMulti','editEnfPermittedIncomeMulti',
  'enfIncomeStreamsMulti','editEnfIncomeStreamsMulti',
  'enfDebtTypeMulti','editEnfDebtTypeMulti',
  'enfDebtSubTypeMulti','editEnfDebtSubTypeMulti',
  'enfExcludedClient','editEnfExcludedClient',
  'enfFlatRate__SUFFIX__','editEnfFlatRate__SUFFIX__',
  'enfPerfBonus__SUFFIX__','editEnfPerfBonus__SUFFIX__',
  'enfOfficerFeeTable__SUFFIX__','editEnfOfficerFeeTable__SUFFIX__',
  'enfOfficerActionPayTable__SUFFIX__','editEnfOfficerActionPayTable__SUFFIX__'
];

/* Enforcement — viewOnly for managers (ED / SEM / EM). These are
   the rows shown as View in the notifications matrix for all three
   manager columns (Officer Number, Personal & Business Phone,
   Officer Type, Role, Team, Certification Expiry, Brand).
   Officer Flat Rate and Performance Bonus differ per manager and
   are added per role below. */
var RBAC_ENF_VIEW_MGR_COMMON = [
  'enfOfficerId','editEnfOfficerId',
  'enfPersonalPhone','editEnfPersonalPhone',
  'enfBusinessPhone','editEnfBusinessPhone',
  'enfOfficerType','editEnfOfficerType',
  'enfRole','editEnfRole',
  'enfTeam','editEnfTeam',
  'enfCertExpiry','editEnfCertExpiry',
  'enfBrandsMultiSelect'
];

var RBAC_FIELD_PERMS = {
  /* ───── Enforcement Directors ─────
     Personal entity = edit, but every editable Personal Details
     field is View per the matrix (only address block remains View
     because ED cannot edit addresses either — R30-R34 show View).
     Certificate + Bond entities are view-only (entity-level).
     Enforcement entity = edit, with matrix-driven View + Hide
     lists. Officer Flat Rate is View for ED; Performance Bonus
     is Edit for ED. */
  'enforcement-director': {
    personal: {
      viewOnly: RBAC_PERSONAL_VIEW_ENF_MGR.slice(),
      hidden: RBAC_PERSONAL_HIDDEN_ENF.concat(['businessEmail'])
    },
    certProcessing: {
      /* Hide per matrix R67 / R75-R78 for all four enforcement roles. */
      hidden: [
        'transactionAuthCode','deferredHearingTime','appSubmissionDate',
        'hearingDate','courtHearingLetter'
      ]
    },
    certStatus: {
      /* csNotes is a legacy field not in the new matrix; keep hidden
         for enforcement roles for continuity. */
      hidden: ['csNotes']
    },
    bond: {
      /* R118-R120 (Copy of Bond, Bond Cancelled, Bond Expiry Date)
         are Hide for all enforcement roles. */
      hidden: ['copyOfBond','bondCancelled','bondExpiryDate']
    },
    enforcement: {
      viewOnly: RBAC_ENF_VIEW_MGR_COMMON.concat([
        /* Officer Flat Rate = View for ED per R177 */
        'enfFlatRate__SUFFIX__','editEnfFlatRate__SUFFIX__'
      ]),
      hidden: RBAC_ENF_HIDDEN_COMMON.slice()
    },
    /* Asset step is force-hidden on the add/edit pages for every
       non-IT role (see rbacApplyToStepper). The hidden list below
       is retained so any accidental render still respects the
       matrix — only the six visible toggles would show. */
    asset: {
      hidden: RBAC_ASSET_HIDDEN_COMMON
    }
  },

  /* ───── Senior Enforcement Managers ─────
     Same Personal + Cert + Bond pattern as ED.
     Enforcement: Officer Flat Rate = Edit, Performance Bonus = Edit
     and Officer Rate Fee % = Edit per R177-R179. */
  'senior-em': {
    personal: {
      viewOnly: RBAC_PERSONAL_VIEW_ENF_MGR.slice(),
      hidden: RBAC_PERSONAL_HIDDEN_ENF.concat(['businessEmail'])
    },
    certProcessing: {
      hidden: [
        'transactionAuthCode','deferredHearingTime','appSubmissionDate',
        'hearingDate','courtHearingLetter'
      ]
    },
    certStatus: { hidden: ['csNotes'] },
    bond: { hidden: ['copyOfBond','bondCancelled','bondExpiryDate'] },
    enforcement: {
      viewOnly: RBAC_ENF_VIEW_MGR_COMMON.slice(),
      hidden: RBAC_ENF_HIDDEN_COMMON.slice()
    },
    asset: { hidden: RBAC_ASSET_HIDDEN_COMMON }
  },

  /* ───── Enforcement Manager ─────
     Enforcement: Officer Flat Rate = View, Performance Bonus = View,
     Officer Rate Fee % = Hide per R177-R179. Officer Rate Fee %
     is a table without a discrete field id, so it is added to the
     hidden list to remove the table wrapper. */
  'enforcement-manager': {
    personal: {
      viewOnly: RBAC_PERSONAL_VIEW_ENF_MGR.slice(),
      hidden: RBAC_PERSONAL_HIDDEN_ENF.concat(['businessEmail'])
    },
    certProcessing: {
      hidden: [
        'transactionAuthCode','deferredHearingTime','appSubmissionDate',
        'hearingDate','courtHearingLetter'
      ]
    },
    certStatus: { hidden: ['csNotes'] },
    bond: { hidden: ['copyOfBond','bondCancelled','bondExpiryDate'] },
    enforcement: {
      viewOnly: RBAC_ENF_VIEW_MGR_COMMON.concat([
        'enfFlatRate__SUFFIX__','editEnfFlatRate__SUFFIX__',
        'enfPerfBonus__SUFFIX__','editEnfPerfBonus__SUFFIX__'
      ]),
      hidden: RBAC_ENF_HIDDEN_COMMON.concat([
        'enfOfficerFeeTable__SUFFIX__','editEnfOfficerFeeTable__SUFFIX__'
      ])
    },
    asset: { hidden: RBAC_ASSET_HIDDEN_COMMON }
  },

  /* ───── Enforcement Agent (EA) ─────
     Per matrix:
       Personal Details — Edit: Personal Email, Address Line 1/2/3,
         Town/City, Postcode, Emergency Forename / Surname /
         Relation / Phone / Email. View: everything else visible.
         Hide: same set as managers plus Business Email is View
         (not Hide) for EA, so it is REMOVED from the hidden list
         and added to viewOnly.
       Certificate Processing — View entity; Notes additionally
         Hide for EA (R74 = -).
       Certificate Status — View entity; csNotes hidden (legacy).
       Bond — View entity; Bond Notes additionally Hide for EA
         (R117 = -).
       Contract — Edit entity (bumped from 'none' in RBAC_ROLES).
         EA can Edit banking + address + upload fields; View the
         Contract identity, A/R, Status Determination and handbook
         fields per R88-R109.
       Enforcement — Edit entity but every editable manager field
         is Hide; only Certification Expiry and Brand remain View.
         Emergency Contact fields live on Personal Details and are
         handled there. */
  'ea': {
    personal: {
      viewOnly: [
        'talosId','userId',
        'title','firstName','middleName','lastName','knownAs',
        /* Business Email is View for EA per R15 */
        'businessEmail',
        'dob','startedOn',
        'firstLineContact','secondLineContact','thirdLineContact',
        'brandsMultiSelect','costCentre','areasMultiSelect','role',
        'trainingRequired','attachment',
        /* Driving Licence stays View for EA per R163-R165 */
        'drivingLicence','licenceNumber','licenceExpiry'
        /* Editable for EA (NOT listed here):
             personalEmail, addressLine1/2/3, townCity, postcode,
             emergencyForeName, emergencyMiddleName, emergencySurname,
             emergencyRelation, emergencyPhone, emergencyEmail        */
      ],
      hidden: RBAC_PERSONAL_HIDDEN_ENF.slice()
    },
    certProcessing: {
      /* Notes = Hide for EA per R74 */
      hidden: [
        'transactionAuthCode','deferredHearingTime','appSubmissionDate',
        'hearingDate','courtHearingLetter','cpNotes'
      ]
    },
    certStatus: { hidden: ['csNotes'] },
    bond: {
      /* Bond Notes = Hide for EA per R117 */
      hidden: ['copyOfBond','bondCancelled','bondExpiryDate','bondNotes']
    },
    contract: {
      /* Per matrix R88-R109. Edit for EA: Bank Name / Account /
         Branch / Sort Code, Building Society Roll, VAT Reg Status
         + Number, Banking Effective Date, Address Line 2 / 3,
         Postcode, Company Registration Certificate,
         Insurance Documents. Everything else is View. */
      viewOnly: [
        'contractName','contractStatus','contractStartDate',
        'arStatus','arDate',
        'statusDetermination',
        'contractUpload',
        'ovoHandbook','engageWelfareHandbook'
      ]
    },
    enforcement: {
      viewOnly: [
        'enfCertExpiry','editEnfCertExpiry',
        'enfBrandsMultiSelect'
      ],
      hidden: RBAC_ENF_HIDDEN_COMMON.concat(RBAC_ENF_HIDDEN_EA_EXTRA)
    },
    /* EA additionally hides Kit Returned per R128 (EA = -). */
    asset: {
      hidden: RBAC_ASSET_HIDDEN_COMMON.concat([
        'kitReturnedSel','editMobileAnprKitReturned','editMobileAnprKitReturnedInput'
      ])
    }
  },

  /* ───── Contractor Services Team Lead / Member ─────
     Per matrix: Officer Number (userId) and Talos ID are View for
     both CS roles across every section (R7-R8). Every other field
     in Personal Details, Compliance, Certificate Processing,
     Certificate Status, Contract and Bond is Edit for CS — the
     entity-level `edit` in RBAC_ROLES covers all remaining fields
     without any per-field override. */
  'cs-lead-admin': {
    personal: {
      viewOnly: ['talosId','userId']
    }
  },
  'cs-member': {
    personal: {
      viewOnly: ['talosId','userId']
    }
  }
};

/* Step number → entity key mapping
   Note: Step 3 is a composite tab "Certificate & Bond" that merges
   the Certificate Processing, Certificate Status and Bond entities. */
var STEP_ENTITY_MAP = {
  1: 'personal',
  2: 'compliance',
  3: ['certProcessing','certStatus','bond'],
  4: 'contract',
  5: 'asset',
  6: 'enforcement'
};
var STEP_TOTAL = 6;

/* ─── Helper: get current role from URL param or sessionStorage ─── */
function rbacGetCurrentRole() {
  var params = new URLSearchParams(window.location.search);
  var roleKey = params.get('role') || sessionStorage.getItem('demoRoleKey');
  if (roleKey && RBAC_ROLES[roleKey]) {
    sessionStorage.setItem('demoRoleKey', roleKey);
    return roleKey;
  }
  return null;
}

/* ─── Helper: get role permissions object ─── */
function rbacGetPerms(roleKey) {
  return RBAC_ROLES[roleKey] || null;
}

/* ─── Helper: check if role can edit ANY entity ─── */
function rbacCanEditAny(perms) {
  var entities = ['personal','compliance','certProcessing','certStatus','contract','bond','asset','enforcement'];
  for (var i = 0; i < entities.length; i++) {
    if (perms[entities[i]] === 'edit') return true;
  }
  return false;
}

/* ─── Helper: check if role can view/edit ANY entity ─── */
function rbacCanAccessAny(perms) {
  var entities = ['personal','compliance','certProcessing','certStatus','contract','bond','asset','enforcement'];
  for (var i = 0; i < entities.length; i++) {
    if (perms[entities[i]] !== 'none') return true;
  }
  return false;
}

/* ─── Apply field-level permissions (view-only / hidden) within entities ───
   Applies to BOTH editable and view-only entities so that fields
   marked "hidden" in the spreadsheet are removed from the UI
   regardless of entity-level access.

   Field-id conventions supported:
     - Exact id            : "firstName", "editEnfPrimaryPostcode"
     - Template with suffix: "enfFlatRate__SUFFIX__"
         Any id whose literal contains "__SUFFIX__" is resolved via
         a prefix attribute selector at query time, matching every
         cloned instance rendered by the enforcement panel template
         (e.g. enfFlatRate-1, enfFlatRatePanel1, …). */
function rbacApplyFieldPerms(roleKey, entity, stepPanel, entityAccess) {
  if (!roleKey || !stepPanel || !RBAC_FIELD_PERMS[roleKey]) return;
  var entityPerms = RBAC_FIELD_PERMS[roleKey][entity];
  if (!entityPerms) return;

  /* Resolve a field id (which may contain the "__SUFFIX__" template
     marker) into a live NodeList of matching elements. */
  function rbacResolveFields(root, fieldId) {
    var idx = fieldId.indexOf('__SUFFIX__');
    if (idx === -1) {
      var el = root.querySelector('#' + CSS.escape(fieldId));
      return el ? [el] : [];
    }
    var prefix = fieldId.substring(0, idx);
    return Array.prototype.slice.call(
      root.querySelectorAll('[id^="' + prefix + '"]')
    );
  }

  /* Hidden fields: always remove (works for both view and edit entities) */
  if (entityPerms.hidden) {
    entityPerms.hidden.forEach(function(fieldId) {
      var els = rbacResolveFields(stepPanel, fieldId);
      els.forEach(function(el) {
        /* Walk up to the nearest field wrapper. Order matters:
           '.switch-field' wraps toggles, '.upload-field' wraps file
           uploads (label + upload-box), '.form-field' / '.form-group'
           wrap regular inputs, '.field-group' wraps grouped layouts. */
        var formGroup =
          el.closest('.switch-field') ||
          el.closest('.upload-field') ||
          el.closest('.form-field') ||
          el.closest('.form-group') ||
          el.closest('.field-group') ||
          el.parentElement;
        if (formGroup) {
          formGroup.classList.add('rbac-hidden');
        } else {
          el.classList.add('rbac-hidden');
        }
      });
    });
  }

  /* View-only field tagging only relevant when the entity is editable
     and the user is on an edit-style flow ('edit' or 'add'). On the
     view-only entity flow, the global disable pass already covers
     all fields, but we still want orphan section headings cleaned up
     (handled at the end of this function). */
  if (entityAccess !== 'view' && entityPerms.viewOnly) {
    entityPerms.viewOnly.forEach(function(fieldId) {
      var els = rbacResolveFields(stepPanel, fieldId);
      els.forEach(function(el) {
        el.setAttribute('disabled', 'disabled');
        el.setAttribute('aria-readonly', 'true');
        el.setAttribute('aria-disabled', 'true');
        el.style.opacity = '0.65';
        el.style.cursor = 'not-allowed';

        /* ── Composite-widget hardening ──
           A bare `disabled` attribute is ignored by non-form
           elements (`<div>`, `<label>`, `<table>`). Walk the tree
           to find every interactive wrapper for this field and
           neutralise it so click / keyboard / focus all fail:
             .multi-select    Brands / Areas / Debt Type dropdowns
             .switch-field    Driving Licence + Van ANPR toggles
             .toggle          Toggle label wrapping the checkbox
             .upload-field    Attachment / Compliance uploads
             .upload-box      Inner clickable label for file picker
             table            Rates & Extras / fee tables */
        if (el.tagName === 'TABLE') {
          el.style.pointerEvents = 'none';
        }
        var wrapperSelectors = [
          '.multi-select', '.switch-field', '.toggle',
          '.upload-field', '.upload-box'
        ];
        wrapperSelectors.forEach(function(sel) {
          /* `closest` includes the element itself, so the same call
             handles both cases (el is the wrapper / el is inside). */
          var wrap = el.closest(sel);
          if (!wrap) return;
          wrap.style.pointerEvents = 'none';
          wrap.style.opacity = '0.65';
          wrap.setAttribute('aria-disabled', 'true');
          /* Multi-select trigger button needs its own disabled
             attribute + tabindex so keyboard focus is blocked. */
          var trigger = wrap.querySelector('.multi-select-trigger');
          if (trigger) {
            trigger.setAttribute('disabled', 'disabled');
            trigger.setAttribute('aria-disabled', 'true');
            trigger.setAttribute('tabindex', '-1');
          }
        });

        var formGroup =
          el.closest('.switch-field') ||
          el.closest('.upload-field') ||
          el.closest('.form-field') ||
          el.closest('.form-group') ||
          el.closest('.field-group') ||
          el.parentElement;
        if (formGroup && !formGroup.querySelector('.rbac-field-view-tag')) {
          var tag = document.createElement('span');
          tag.className = 'rbac-field-view-tag';
          tag.textContent = 'View';
          tag.setAttribute('aria-label', 'This field is read-only for your role');
          /* Tag is currently hidden via CSS (display:none) so we
             intentionally do NOT mutate formGroup positioning here —
             setting position:relative on every view-only field creates
             sibling stacking contexts that can paint over neighbouring
             absolutely-positioned dropdowns (e.g. multi-select). */
          formGroup.appendChild(tag);
        }
      });
    });
  }

  /* ── Hide orphan section headings ──
     If every field within a `form-grid-*` that immediately follows a
     `.section-heading` has been marked `.rbac-hidden`, hide the
     heading too so the user never sees a label without content. */
  var headings = stepPanel.querySelectorAll('.section-heading');
  headings.forEach(function(h) {
    var grid = h.nextElementSibling;
    while (grid && !/form-grid|field-group/.test(grid.className || '')) {
      grid = grid.nextElementSibling;
    }
    if (!grid) return;
    var fieldNodes = grid.querySelectorAll(
      '.form-field, .switch-field, .upload-field, .form-group, .field-group'
    );
    if (!fieldNodes.length) return;
    var anyVisible = false;
    fieldNodes.forEach(function(n) {
      if (!n.classList.contains('rbac-hidden')) anyVisible = true;
    });
    if (!anyVisible) {
      h.classList.add('rbac-hidden');
      grid.classList.add('rbac-hidden');
    }
  });
}

/* ─── Filter Reject Modal sections by role permissions ─── */
function rbacFilterRejectModal(perms) {
  if (!perms) return;
  var rows = document.querySelectorAll('.reject-section-row[data-entity]');
  rows.forEach(function(row) {
    var entity = row.getAttribute('data-entity');
    var access = perms[entity];
    if (access === 'none') {
      row.classList.add('rbac-hidden');
    } else if (access === 'view') {
      /* View-only entities: disable textarea, show "View Only" note */
      var ta = row.querySelector('.reject-section-textarea');
      if (ta) {
        ta.setAttribute('disabled', 'disabled');
        ta.style.opacity = '0.5';
        ta.style.cursor = 'not-allowed';
        ta.placeholder = 'You have view-only access to this section';
      }
    }
    /* 'edit' entities remain fully editable */
  });
}

/* ─── Inject Role Banner ─── */
function rbacInjectBanner(roleKey, perms) {
  if (!roleKey || !perms) return;

  /* Build access summary */
  var accessParts = [];
  if (perms.creator && perms.approver) accessParts.push('Creator & Approver');
  else if (perms.creator) accessParts.push('Creator');
  else if (perms.approver) accessParts.push('Approver');

  if (rbacCanEditAny(perms)) accessParts.push('Edit');
  else accessParts.push('View Only');

  var banner = document.createElement('div');
  banner.id = 'rbacBanner';
  banner.className = 'rbac-banner';
  banner.setAttribute('role', 'status');
  banner.innerHTML =
    '<div class="rbac-banner-inner">' +
      '<svg class="rbac-banner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
      '<span class="rbac-banner-label">Demo Role:</span>' +
      '<strong class="rbac-banner-role">' + perms.label + '</strong>' +
      '<span class="rbac-banner-access">' + accessParts.join(' · ') + '</span>' +
      '<a class="rbac-banner-switch" href="landing.html">Switch Role</a>' +
      '<button class="rbac-banner-clear" id="clearDemoBtn" style="display:none;" onclick="if(typeof clearDemoData===\'function\')clearDemoData();else{localStorage.removeItem(\'advanceNewRecords\');localStorage.removeItem(\'contractRecords\');location.reload();}">Clear Demo Data</button>' +
    '</div>';
  document.body.insertBefore(banner, document.body.firstChild);
}

/* ─── Inject Banner CSS (call once per page) ─── */
function rbacInjectStyles() {
  var style = document.createElement('style');
  style.textContent =
    '.rbac-banner { background: #152B48; color: #fff; padding: 6px 24px; font-size: 12px; line-height: 1.5; z-index: 99; position: relative; }' +
    '.rbac-banner-inner { display: flex; align-items: center; gap: 8px; max-width: 1400px; margin: 0 auto; }' +
    '.rbac-banner-icon { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.7; }' +
    '.rbac-banner-label { color: rgba(255,255,255,0.6); }' +
    '.rbac-banner-role { color: #84ADE4; font-weight: 600; }' +
    '.rbac-banner-access { margin-left: 4px; padding: 1px 8px; background: rgba(255,255,255,0.1); border-radius: 100px; font-size: 11px; color: rgba(255,255,255,0.7); }' +
    '.rbac-banner-switch { margin-left: auto; color: #A2C1EA; text-decoration: none; font-weight: 600; font-size: 12px; }' +
    '.rbac-banner-switch:hover { color: #fff; text-decoration: underline; }' +
    '.rbac-banner-clear { margin-left: 8px; background: transparent; border: 1px solid rgba(255,255,255,0.35); color: rgba(255,255,255,0.85); padding: 2px 10px; border-radius: 100px; font-size: 11px; cursor: pointer; font-family: inherit; }' +
    '.rbac-banner-clear:hover { background: rgba(255,255,255,0.12); color: #fff; }' +
    '.rbac-no-access-overlay { position: fixed; inset: 0; z-index: 8000; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }' +
    '.rbac-no-access-box { background: #fff; border-radius: 8px; padding: 40px 48px; text-align: center; max-width: 440px; box-shadow: 0 8px 32px rgba(0,0,0,0.18); }' +
    '.rbac-no-access-box h2 { font-size: 20px; margin-bottom: 8px; color: #212121; }' +
    '.rbac-no-access-box p { font-size: 14px; color: #757575; margin-bottom: 24px; }' +
    '.rbac-no-access-box a { display: inline-flex; padding: 8px 20px; background: #3276CF; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }' +
    '.rbac-no-access-box a:hover { background: #2C66B4; }' +
    '.rbac-view-only-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 10px; background: #FFF3E0; color: #E56800; border-radius: 100px; font-size: 11px; font-weight: 600; margin-left: 8px; }' +
    '.rbac-field-view-tag { display: none !important; }' +
    '.rbac-hidden { display: none !important; }';
  document.head.appendChild(style);
}

/* ─── Show "No Access" overlay (for add page when not creator) ─── */
function rbacShowNoAccess(message) {
  var overlay = document.createElement('div');
  overlay.className = 'rbac-no-access-overlay';
  overlay.innerHTML =
    '<div class="rbac-no-access-box">' +
      '<h2>Access Restricted</h2>' +
      '<p>' + (message || 'Your role does not have permission to access this page.') + '</p>' +
      '<a href="landing.html">Back to Role Selection</a>' +
    '</div>';
  document.body.appendChild(overlay);
}

/* ─── Apply read-only treatment to a panel/section ─── */
function rbacMakeSectionViewOnly(roleKey, entity, sectionEl) {
  if (!sectionEl) return;
  rbacDisableAllControls(sectionEl);
  var heading = sectionEl.querySelector('.section-heading');
  if (heading && !heading.querySelector('.rbac-view-only-badge')) {
    heading.insertAdjacentHTML('beforeend', '<span class="rbac-view-only-badge">View Only</span>');
  }
  rbacApplyFieldPerms(roleKey, entity, sectionEl, 'view');
}

/* ─── Disable every user-editable control inside a container ─────
   Covers native inputs plus the two composite widgets used across
   the Add / Edit Contract Services pages:
     - `.multi-select`  Brand / Area / Debt Type dropdowns (div-based)
     - `.toggle`        Driving Licence + Van ANPR switch labels
     - `.switch-field`  Wrapper around toggle rows
   Custom widgets have `pointer-events: none` applied so the trigger
   button, keyboard focus and the reveal-dropdown behaviour are all
   blocked — a bare `disabled` attribute on `<div>` elements has no
   effect. Applied consistently by every view-only code path so any
   role with entity='view' gets a fully non-interactive section. */
function rbacDisableAllControls(container) {
  if (!container) return;
  /* Native inputs */
  container.querySelectorAll('input, select, textarea').forEach(function(el) {
    el.setAttribute('disabled', 'disabled');
    el.setAttribute('aria-readonly', 'true');
    el.style.opacity = '0.65';
    el.style.cursor = 'not-allowed';
  });
  /* Buttons (multi-select triggers, upload buttons, etc.) — leave
     structural buttons like tab switchers alone by restricting to
     inputs/selects/textareas and multi-select triggers. */
  container.querySelectorAll('.multi-select').forEach(function(el) {
    el.style.pointerEvents = 'none';
    el.style.opacity = '0.65';
    el.setAttribute('aria-disabled', 'true');
    var trigger = el.querySelector('.multi-select-trigger');
    if (trigger) {
      trigger.setAttribute('disabled', 'disabled');
      trigger.setAttribute('aria-disabled', 'true');
      trigger.setAttribute('tabindex', '-1');
    }
  });
  container.querySelectorAll('.switch-field, .toggle').forEach(function(el) {
    el.style.pointerEvents = 'none';
    el.style.opacity = '0.65';
    el.setAttribute('aria-disabled', 'true');
  });
  /* File-upload widgets (Attachment, Compliance uploads, Insurance
     Documents, etc.) — block the whole `.upload-box`/`.upload-field`
     click surface, not just the underlying input. */
  container.querySelectorAll('.upload-box').forEach(function(el) {
    el.style.pointerEvents = 'none';
    el.style.opacity = '0.65';
    el.setAttribute('aria-disabled', 'true');
  });
}

/* ─── Compute composite access from a list of entities (highest wins) ─── */
function rbacCompositeAccess(perms, entities) {
  var rank = { 'edit': 3, 'view': 2, 'none': 1 };
  var best = 'none';
  for (var i = 0; i < entities.length; i++) {
    var a = perms[entities[i]] || 'none';
    if ((rank[a] || 0) > (rank[best] || 0)) best = a;
  }
  return best;
}

/* ─── Apply RBAC to stepper pages (edit & add) ─── */
function rbacApplyToStepper(perms, isEdit) {
  var visibleSteps = [];
  var firstVisible = null;
  var roleKey = rbacGetCurrentRole();

  for (var step = 1; step <= STEP_TOTAL; step++) {
    var entity = STEP_ENTITY_MAP[step];
    var isComposite = Array.isArray(entity);
    var access = isComposite ? rbacCompositeAccess(perms, entity) : perms[entity];

    /* Asset Management step is restricted to IT / Service Desk on the
       add/edit pages. Other roles retain their view-only access on the
       view page (handled separately in view_contract_service.html). */
    if (entity === 'asset' && roleKey !== 'it-service-desk') {
      access = 'none';
    }
    var stepNav = document.querySelector('.step[data-step="' + step + '"]');
    var stepPanel = document.getElementById('step-' + step);
    var connector = stepNav ? stepNav.nextElementSibling : null;

    if (access === 'none') {
      /* Hide step nav + panel */
      if (stepNav) stepNav.classList.add('rbac-hidden');
      if (stepPanel) stepPanel.classList.add('rbac-hidden');
      if (connector && connector.classList.contains('step-connector')) {
        connector.classList.add('rbac-hidden');
      }
    } else {
      visibleSteps.push(step);
      if (!firstVisible) firstVisible = step;

      if (isComposite && stepPanel) {
        /* Process each child entity section independently so the
           merged "Certificate & Bond" tab respects the existing
           per-entity role-based rules unchanged. */
        for (var k = 0; k < entity.length; k++) {
          var subEntity = entity[k];
          var subAccess = perms[subEntity] || 'none';
          var section = stepPanel.querySelector('[data-rbac-entity="' + subEntity + '"]');
          if (!section) continue;
          if (subAccess === 'none') {
            section.classList.add('rbac-hidden');
          } else if (isEdit && subAccess === 'view') {
            rbacMakeSectionViewOnly(roleKey, subEntity, section);
          } else if (subAccess === 'edit') {
            rbacApplyFieldPerms(roleKey, subEntity, section, isEdit ? 'edit' : 'add');
          } else if (subAccess === 'view') {
            /* add page in view mode: still apply hidden field rules */
            rbacApplyFieldPerms(roleKey, subEntity, section, 'view');
          }
        }
      } else if (isEdit && access === 'view') {
        /* Make ALL fields read-only for view-only sections */
        if (stepPanel) {
          rbacDisableAllControls(stepPanel);
          /* Add view-only badge to section heading */
          var heading = stepPanel.querySelector('.section-heading');
          if (heading && !heading.querySelector('.rbac-view-only-badge')) {
            heading.insertAdjacentHTML('beforeend', '<span class="rbac-view-only-badge">View Only</span>');
          }
          /* Apply field-level HIDE rules even on view-only entities,
             so fields marked black in the spreadsheet are removed. */
          rbacApplyFieldPerms(roleKey, entity, stepPanel, 'view');
        }
      } else if (access === 'edit') {
        /* Apply field-level permissions within editable entities.
           Runs for BOTH edit and add pages so that role-specific
           hidden fields never appear in either flow. */
        rbacApplyFieldPerms(roleKey, entity, stepPanel, isEdit ? 'edit' : 'add');
      } else if (!isEdit && access === 'view' && stepPanel) {
        /* Add page, view-only entity (e.g. Asset Management for
           enforcement roles, or Personal Details for IT / Service
           Desk): still apply hidden-field rules so fields marked
           black in the matrix are removed, and every control —
           including multi-selects and toggles — is disabled. */
        rbacDisableAllControls(stepPanel);
        var addHeading = stepPanel.querySelector('.section-heading');
        if (addHeading && !addHeading.querySelector('.rbac-view-only-badge')) {
          addHeading.insertAdjacentHTML('beforeend', '<span class="rbac-view-only-badge">View Only</span>');
        }
        rbacApplyFieldPerms(roleKey, entity, stepPanel, 'view');
      }
    }
  }

  /* ── 1. Renumber visible step circles sequentially ── */
  for (var i = 0; i < visibleSteps.length; i++) {
    var sNav = document.querySelector('.step[data-step="' + visibleSteps[i] + '"]');
    if (sNav) {
      var numEl = sNav.querySelector('.step-number');
      if (numEl) numEl.textContent = (i + 1);
    }
  }

  /* ── 2. Last visible step: replace Continue → Save ── */
  if (visibleSteps.length > 0) {
    var lastStep = visibleSteps[visibleSteps.length - 1];
    var lastPanel = document.getElementById('step-' + lastStep);
    if (lastPanel) {
      var btnRow = lastPanel.querySelector('.button-row');
      if (btnRow) {
        var continueBtn = btnRow.querySelector('.btn-primary[onclick="nextStep()"]');
        if (continueBtn) {
          /* Replace Continue with Save Record / Update Record */
          var saveLabel = isEdit ? 'Update Record' : 'Save Record';
          continueBtn.setAttribute('onclick', 'rbacSaveRecord(' + (isEdit ? 'true' : 'false') + ')');
          continueBtn.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> ' +
            saveLabel;
        }
      }
    }
  }

  /* Activate first visible step */
  if (firstVisible) {
    document.querySelectorAll('.step').forEach(function(el) { el.classList.remove('active'); });
    document.querySelectorAll('.step-panel').forEach(function(el) { el.classList.remove('active'); });
    var firstStepNav = document.querySelector('.step[data-step="' + firstVisible + '"]');
    var firstStepPanel = document.getElementById('step-' + firstVisible);
    if (firstStepNav) firstStepNav.classList.add('active');
    if (firstStepPanel) firstStepPanel.classList.add('active');
  }

  /* Store visible steps for navigation override */
  window._rbacVisibleSteps = visibleSteps;
}

/* ─── Override goToStep / nextStep / prevStep to respect visible steps ─── */
function rbacPatchGoToStep() {
  if (typeof window.goToStep !== 'function' || !window._rbacVisibleSteps) return;
  var vs = window._rbacVisibleSteps;
  var originalGoToStep = window.goToStep;

  window.goToStep = function(n) {
    if (vs.indexOf(n) === -1) return;
    originalGoToStep(n);
  };

  window.nextStep = function() {
    var cur = window.currentStep || 1;
    var idx = vs.indexOf(cur);
    if (idx >= 0 && idx < vs.length - 1) {
      originalGoToStep(vs[idx + 1]);
      var newIdx = vs.indexOf(vs[idx + 1]);
      if (typeof showToast === 'function') showToast('Step ' + (newIdx) + ' of ' + vs.length + ' saved');
    }
  };

  window.prevStep = function() {
    var cur = window.currentStep || 1;
    var idx = vs.indexOf(cur);
    if (idx > 0) {
      originalGoToStep(vs[idx - 1]);
    }
  };
}

/* ─── Save handler for RBAC-injected Save button on last visible step ─── */
function rbacSaveRecord(isEdit) {
  var msg = isEdit ? 'Record updated successfully' : 'New record added successfully';
  sessionStorage.setItem('toastMessage', msg);
  var roleKey = rbacGetCurrentRole();
  var dest = 'advance_contact_service.html' + (roleKey ? '?role=' + roleKey : '');
  window.location.href = dest;
}

/* ─── Init helper — call from each page ─── */
function rbacInit() {
  rbacInjectStyles();
  var roleKey = rbacGetCurrentRole();
  var perms = rbacGetPerms(roleKey);
  rbacInjectBanner(roleKey, perms);
  return { roleKey: roleKey, perms: perms };
}
