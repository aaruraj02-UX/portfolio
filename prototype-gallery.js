const PROTOTYPE_GALLERIES = {
  advance: {
    title: 'ProServe Master EA Platform',
    subtitle: 'Governed prototype flow across contract setup, asset detail, notifications, reporting, and user administration.',
    slides: [
      { title: 'Select role', caption: 'Entry screen for the RBAC-driven walkthrough and role-based journey selection.', image: 'Projects/Advance/screenshots/01-landing.png', page: 'Projects/Advance/prototype/landing.html' },
      { title: 'Contract service overview', caption: 'Main working view for contractor service records and governed entity access.', image: 'Projects/Advance/screenshots/02-contract-service.png', page: 'Projects/Advance/prototype/advance_contact_service.html' },
      { title: 'Add contract service', caption: 'Creation flow for a new contractor service record with structured fields.', image: 'Projects/Advance/screenshots/03-add-contract.png', page: 'Projects/Advance/prototype/add_contract_service.html' },
      { title: 'Edit contract service', caption: 'Amendment flow for updating contract service details with governance guardrails.', image: 'Projects/Advance/screenshots/04-edit-contract.png', page: 'Projects/Advance/prototype/edit_contract_service.html' },
      { title: 'View contract service', caption: 'Read-only review of the consolidated contract service details.', image: 'Projects/Advance/screenshots/05-view-contract.png', page: 'Projects/Advance/prototype/view_contract_service.html' },
      { title: 'Reports', caption: 'Reporting view for audit, operational insights, and monitoring outcomes.', image: 'Projects/Advance/screenshots/15-reports.png', page: 'Projects/Advance/prototype/reports.html' },
      { title: 'User details', caption: 'Detailed user profile surface with linked governance context.', image: 'Projects/Advance/screenshots/18-user-details.png', page: 'Projects/Advance/prototype/user_details.html' },
      { title: 'User management', caption: 'Administrative user management view closing the prototype flow.', image: 'Projects/Advance/screenshots/19-user-management.png', page: 'Projects/Advance/prototype/user_management.html' }
    ]
  },
  customer: {
    title: 'Customer App Landing Page',
    subtitle: 'Customer journey and internal settings flow covering landing, stages, payment, support, and administration.',
    slides: [
      { title: 'Landing page', caption: 'Primary customer entry point with stage clarity and action-first guidance.', image: 'Projects/Customer%20App%20-%20LandingPage/screenshots/01-landing-page.png', page: 'Projects/Customer%20App%20-%20LandingPage/prototype/LandingPage.html' },
      { title: 'Enforcement stages', caption: 'Journey explanation page helping customers understand their current stage and next steps.', image: 'Projects/Customer%20App%20-%20LandingPage/screenshots/02-enforcement-stages.png', page: 'Projects/Customer%20App%20-%20LandingPage/prototype/enforcement-stages.html' },
      { title: 'Make a payment', caption: 'Payment action flow focused on clarity, confidence, and conversion.', image: 'Projects/Customer%20App%20-%20LandingPage/screenshots/03-make-a-payment.png', page: 'Projects/Customer%20App%20-%20LandingPage/prototype/make-a-payment.html' },
      { title: 'Support', caption: 'Support pathway for customers needing more help or alternate contact routes.', image: 'Projects/Customer%20App%20-%20LandingPage/screenshots/04-support.png', page: 'Projects/Customer%20App%20-%20LandingPage/prototype/support.html' },
      { title: 'Penalty login', caption: 'Authentication entry for protected customer services and personalised access.', image: 'Projects/Customer%20App%20-%20LandingPage/screenshots/05-penalty-login.png', page: 'Projects/Customer%20App%20-%20LandingPage/prototype/penalty-login.html' },
      { title: 'User management', caption: 'Internal settings-side administration flow for governed content operations.', image: 'Projects/Customer%20App%20-%20LandingPage/screenshots/06-user-management.png', page: 'Projects/Customer%20App%20-%20LandingPage/prototype/user-management.html' }
    ]
  },
  engage: {
    title: 'FieldSync Task & SLA Workflow',
    subtitle: 'Operational workflow spanning tablet and web journeys from dashboard through task, job card, detail, and schedule actions.',
    slides: [
      { title: 'Dashboard', caption: 'High-level operations landing surface showing work visibility and SLA posture.', image: 'Projects/Engage/screenshots/01-dashboard.png', page: 'Projects/Engage/prototype/index.html' },
      { title: 'Web add card template', caption: 'Template setup entry for creating and standardising field job cards.', image: 'Projects/Engage/screenshots/01-web-addcardtemplate.png', page: 'Projects/Engage/prototype/web/job_card_add.html' },
      { title: 'Task module tablet', caption: 'Tablet-optimised task list for field operations and action sequencing.', image: 'Projects/Engage/screenshots/02-task-module-tablet.png', page: 'Projects/Engage/prototype/Task_Module_Tablet.html' },
      { title: 'Web dashboard', caption: 'Browser-based operational dashboard for SLA monitoring and team-level visibility.', image: 'Projects/Engage/screenshots/02-web-dashboard.png', page: 'Projects/Engage/prototype/web/index.html' },
      { title: 'Job details', caption: 'Detailed task view with action context, status handling, and resolution workflow.', image: 'Projects/Engage/screenshots/03-job-details.png', page: 'Projects/Engage/prototype/Job_Details_Revamped.html' },
      { title: 'Web job card', caption: 'Web job card view used for structured work execution and checklist progression.', image: 'Projects/Engage/screenshots/03-web-job-card.png', page: 'Projects/Engage/prototype/web/job_card.html' },
      { title: 'Web task module', caption: 'Task management workspace for assignment, prioritisation, and SLA-driven actioning.', image: 'Projects/Engage/screenshots/04-web-task-module.png', page: 'Projects/Engage/prototype/web/tasks.html' },
      { title: 'Web job details', caption: 'Case-level task detail screen for execution updates and completion decisions.', image: 'Projects/Engage/screenshots/05-web-job-details.png', page: 'Projects/Engage/prototype/web/job-details.html' },
      { title: 'Web schedule', caption: 'Scheduling view for planning, balancing, and adjusting field workload windows.', image: 'Projects/Engage/screenshots/06-web-schedule.png', page: 'Projects/Engage/prototype/web/manual-schedule.html' }
    ]
  },
  fiona: {
    title: 'FinOps Admin KPI Dashboard',
    subtitle: 'Dashboard and supporting finance operations flow across KPI visibility, failures, payments, approvals, and transaction lookup.',
    slides: [
      { title: 'Dashboard', caption: 'Executive KPI overview for monitoring operational performance and exceptions.', image: 'Projects/Fiona/screenshots/01-dashboard.png', page: 'Projects/Fiona/prototype/Dashboard.html' },
      { title: 'IFM overview', caption: 'Integration failure management overview for investigation and triage.', image: 'Projects/Fiona/screenshots/02-ifm-overview.png', page: 'Projects/Fiona/prototype/IFM.html' },
      { title: 'IFM failure types', caption: 'Failure category reference used to support accurate diagnosis and action.', image: 'Projects/Fiona/screenshots/03-ifm-failure-types.png', page: 'Projects/Fiona/prototype/IFM_FailureTypes.html' },
      { title: 'IFM lookup', caption: 'Lookup workflow for tracing failure events and associated data points.', image: 'Projects/Fiona/screenshots/04-ifm-lookup.png', page: 'Projects/Fiona/prototype/IFM_lookup.html' },
      { title: 'Ad hoc payments', caption: 'Finance operations view for managing one-off payment activity.', image: 'Projects/Fiona/screenshots/05-ad-hoc-payments.png', page: 'Projects/Fiona/prototype/AdHocPayments.html' },
      { title: 'Ad hoc approvals', caption: 'Approval queue for governed payment decision-making and review.', image: 'Projects/Fiona/screenshots/06-ad-hoc-approvals.png', page: 'Projects/Fiona/prototype/AdHocApprovals.html' },
      { title: 'Generated files', caption: 'Generated output files available from the finance process pipeline.', image: 'Projects/Fiona/screenshots/07-ad-hoc-generated-files.png', page: 'Projects/Fiona/prototype/AdHocGeneratedFiles.html' },
      { title: 'Exported files', caption: 'Export management view for completed operational file outputs.', image: 'Projects/Fiona/screenshots/08-ad-hoc-exported-files.png', page: 'Projects/Fiona/prototype/AdHocExportedFiles.html' },
      { title: 'Payment type lookup', caption: 'Reference lookup for maintaining and validating ad hoc payment types.', image: 'Projects/Fiona/screenshots/09-ad-hoc-payment-type-lookup.png', page: 'Projects/Fiona/prototype/AdHocPaymentTypeLookup.html' },
      { title: 'Current transactions', caption: 'Active transaction view for live operational finance activity.', image: 'Projects/Fiona/screenshots/10-oap-current-transactions.png', page: 'Projects/Fiona/prototype/OAP_CurrentTransactions.html' }
    ]
  },
  summarisation: {
    title: 'DocProcess Stage 3 & 5',
    subtitle: 'AI-assisted processing flow from dashboard routing through validation, approval, review, and stage-specific case handling.',
    slides: [
      { title: 'Prototype index', caption: 'Entry point into the document processing prototype and flow selection.', image: 'Projects/Summarisation/screenshots/01-prototype-index.png', page: 'Projects/Summarisation/prototype/index.html' },
      { title: 'Stage 3 dashboard', caption: 'Dashboard view for Stage 3 case monitoring and queue visibility.', image: 'Projects/Summarisation/screenshots/02-stage3-dashboard.png', page: 'Projects/Summarisation/prototype/stage3-dashboard.html' },
      { title: 'Stage 3 MNPS', caption: 'Core Stage 3 case handling experience for case-specific document processing.', image: 'Projects/Summarisation/screenshots/03-stage3-mnps.png', page: 'Projects/Summarisation/prototype/stage3-MNPS.html' },
      { title: 'My workflow', caption: 'Personalised work queue and task ownership view for operators.', image: 'Projects/Summarisation/screenshots/04-my-workflow.png', page: 'Projects/Summarisation/prototype/my-workflow.html' },
      { title: 'All validation fine', caption: 'Positive validation state where AI and business checks are satisfied.', image: 'Projects/Summarisation/screenshots/05-all-validation-fine.png', page: 'Projects/Summarisation/prototype/all-validation-fine.html' },
      { title: 'Stage 3 and 5 dashboard', caption: 'Combined dashboard spanning the end-to-end processing stages.', image: 'Projects/Summarisation/screenshots/09-stage3-5-dashboard.png', page: 'Projects/Summarisation/prototype/stage3-5-dashboard.html' }
    ]
  }
};

(function initPrototypeGallery() {
  const triggers = Array.from(document.querySelectorAll('[data-prototype-gallery]'));
  if (triggers.length === 0) {
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'prototype-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <div class="prototype-modal__backdrop" data-gallery-close="true"></div>
    <section class="prototype-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="prototype-gallery-title">
      <button class="prototype-modal__close" type="button" aria-label="Close prototype gallery" data-gallery-close="true">×</button>
      <header class="prototype-modal__header">
        <div>
          <p class="prototype-modal__eyebrow">Prototype Flow</p>
          <h2 class="prototype-modal__title" id="prototype-gallery-title"></h2>
          <p class="prototype-modal__subtitle" id="prototype-gallery-subtitle"></p>
        </div>
        <div class="prototype-modal__meta">
          <span id="prototype-gallery-counter"></span>
          <a id="prototype-gallery-link" href="#" target="_blank" rel="noreferrer">Open current page</a>
        </div>
      </header>
      <div class="prototype-modal__body">
        <div class="prototype-modal__stage">
          <div class="prototype-modal__viewport">
            <img class="prototype-modal__image" id="prototype-gallery-image" alt="" />
            <div class="prototype-modal__zoom-controls" aria-label="Image zoom controls">
              <button class="prototype-modal__zoom-btn" type="button" id="prototype-gallery-zoom-out" aria-label="Zoom out">-</button>
              <button class="prototype-modal__zoom-level" type="button" id="prototype-gallery-zoom-reset" aria-label="Reset zoom">
                <span id="prototype-gallery-zoom-level">100%</span>
              </button>
              <button class="prototype-modal__zoom-btn" type="button" id="prototype-gallery-zoom-in" aria-label="Zoom in">+</button>
            </div>
          </div>
          <div class="prototype-modal__caption">
            <h3 id="prototype-gallery-slide-title"></h3>
            <p id="prototype-gallery-slide-caption"></p>
          </div>
          <div class="prototype-modal__controls">
            <button class="prototype-modal__nav" type="button" id="prototype-gallery-prev">Previous</button>
            <button class="prototype-modal__nav" type="button" id="prototype-gallery-next">Next</button>
          </div>
        </div>
        <aside class="prototype-modal__rail">
          <p class="prototype-modal__rail-title">Flow Screens</p>
          <div class="prototype-modal__thumbs" id="prototype-gallery-thumbs"></div>
        </aside>
      </div>
    </section>
  `;
  document.body.appendChild(modal);

  const titleNode = modal.querySelector('#prototype-gallery-title');
  const subtitleNode = modal.querySelector('#prototype-gallery-subtitle');
  const counterNode = modal.querySelector('#prototype-gallery-counter');
  const imageNode = modal.querySelector('#prototype-gallery-image');
  const slideTitleNode = modal.querySelector('#prototype-gallery-slide-title');
  const slideCaptionNode = modal.querySelector('#prototype-gallery-slide-caption');
  const currentLinkNode = modal.querySelector('#prototype-gallery-link');
  const thumbsNode = modal.querySelector('#prototype-gallery-thumbs');
  const prevButton = modal.querySelector('#prototype-gallery-prev');
  const nextButton = modal.querySelector('#prototype-gallery-next');
  const zoomOutButton = modal.querySelector('#prototype-gallery-zoom-out');
  const zoomInButton = modal.querySelector('#prototype-gallery-zoom-in');
  const zoomResetButton = modal.querySelector('#prototype-gallery-zoom-reset');
  const zoomLevelNode = modal.querySelector('#prototype-gallery-zoom-level');
  const dialog = modal.querySelector('.prototype-modal__dialog');

  let activeGalleryKey = '';
  let activeIndex = 0;
  let currentZoom = 1;
  let lastTrigger = null;
  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.25;

  function setZoom(nextZoom) {
    currentZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nextZoom));
    imageNode.style.transform = `scale(${currentZoom})`;
    zoomLevelNode.textContent = `${Math.round(currentZoom * 100)}%`;
    zoomOutButton.disabled = currentZoom <= MIN_ZOOM;
    zoomInButton.disabled = currentZoom >= MAX_ZOOM;
  }

  function getGallery() {
    return PROTOTYPE_GALLERIES[activeGalleryKey];
  }

  function renderThumbs(gallery) {
    thumbsNode.innerHTML = gallery.slides.map((slide, index) => `
      <button class="prototype-modal__thumb${index === activeIndex ? ' is-active' : ''}" type="button" data-gallery-index="${index}" aria-current="${index === activeIndex ? 'true' : 'false'}">
        <img src="${slide.image}" alt="${slide.title}" loading="lazy" />
        <span>
          <span class="prototype-modal__thumb-step">Step ${index + 1}</span>
          <span class="prototype-modal__thumb-title">${slide.title}</span>
          <span class="prototype-modal__thumb-caption">${slide.caption}</span>
        </span>
      </button>
    `).join('');
  }

  function renderSlide() {
    const gallery = getGallery();
    const slide = gallery.slides[activeIndex];
    titleNode.textContent = gallery.title;
    subtitleNode.textContent = gallery.subtitle;
    counterNode.textContent = `Screen ${activeIndex + 1} of ${gallery.slides.length}`;
    imageNode.src = slide.image;
    imageNode.alt = slide.title;
    slideTitleNode.textContent = slide.title;
    slideCaptionNode.textContent = slide.caption;
    currentLinkNode.href = slide.page;
    setZoom(1);
    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === gallery.slides.length - 1;
    renderThumbs(gallery);
  }

  function openGallery(galleryKey, trigger) {
    const gallery = PROTOTYPE_GALLERIES[galleryKey];
    if (!gallery) {
      return;
    }

    activeGalleryKey = galleryKey;
    activeIndex = 0;
    lastTrigger = trigger;
    renderSlide();
    modal.hidden = false;
    document.body.classList.add('prototype-gallery-open');
    dialog.focus();
  }

  function closeGallery() {
    modal.hidden = true;
    document.body.classList.remove('prototype-gallery-open');
    imageNode.src = '';
    if (lastTrigger) {
      lastTrigger.focus();
    }
  }

  function setSlide(index) {
    const gallery = getGallery();
    if (!gallery || index < 0 || index >= gallery.slides.length) {
      return;
    }
    activeIndex = index;
    renderSlide();
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const galleryKey = trigger.getAttribute('data-prototype-gallery');
      if (!PROTOTYPE_GALLERIES[galleryKey]) {
        return;
      }
      event.preventDefault();
      openGallery(galleryKey, trigger);
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.galleryClose === 'true') {
      closeGallery();
      return;
    }

    const thumb = event.target instanceof HTMLElement ? event.target.closest('[data-gallery-index]') : null;
    if (thumb instanceof HTMLElement) {
      setSlide(Number(thumb.dataset.galleryIndex));
    }
  });

  prevButton.addEventListener('click', () => setSlide(activeIndex - 1));
  nextButton.addEventListener('click', () => setSlide(activeIndex + 1));
  zoomOutButton.addEventListener('click', () => setZoom(currentZoom - ZOOM_STEP));
  zoomInButton.addEventListener('click', () => setZoom(currentZoom + ZOOM_STEP));
  zoomResetButton.addEventListener('click', () => setZoom(1));

  // Discourage image extraction actions while prototype flow is open.
  imageNode.addEventListener('dragstart', (event) => event.preventDefault());
  modal.addEventListener('contextmenu', (event) => {
    if (!modal.hidden) {
      event.preventDefault();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) {
      return;
    }

    const key = event.key.toUpperCase();
    const isInspectShortcut = key === 'F12'
      || ((event.ctrlKey || event.metaKey) && event.shiftKey && (key === 'I' || key === 'J' || key === 'C' || key === 'K'))
      || ((event.ctrlKey || event.metaKey) && key === 'U');

    if (isInspectShortcut) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === 'Escape') {
      closeGallery();
    } else if (event.key === 'ArrowRight') {
      setSlide(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      setSlide(activeIndex - 1);
    }
  });
})();