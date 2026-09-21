/* ============================================================
   PCN Summariser Tool — App Interactivity
   Tab switching · Step navigation · AI summary simulation
   Letter generation · Workflow state management
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
const state = {
  currentStep: 2,
  currentTab: 'summarisation',
  summaryGenerated: false,
  letterGenerated: true,
  selectedDocs: ['rep-letter', 'driving-licence', 'pcn-record'],
};

/* ══════════════════════════════════════════
   TAB NAVIGATION
══════════════════════════════════════════ */
function switchTab(tabId) {
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  const tab = document.querySelector(`[data-tab="${tabId}"]`);
  const panel = document.getElementById(`panel-${tabId}`);
  if (tab) tab.classList.add('active');
  if (panel) panel.classList.add('active');
  state.currentTab = tabId;
}

/* ══════════════════════════════════════════
   STEP INDICATOR NAVIGATION
══════════════════════════════════════════ */
function activateStep(stepNum) {
  const tabMap = { 1: null, 2: 'summarisation', 3: 'letter', 4: 'review' };

  document.querySelectorAll('.step-indicator-item').forEach((item, idx) => {
    const num = idx + 1;
    item.classList.remove('active', 'completed');
    if (num < stepNum)  item.classList.add('completed');
    if (num === stepNum) item.classList.add('active');
  });

  if (tabMap[stepNum]) switchTab(tabMap[stepNum]);
  state.currentStep = stepNum;
}

/* ══════════════════════════════════════════
   AI SUMMARY GENERATION (simulated)
══════════════════════════════════════════ */
const processingMessages = [
  'Reading and extracting text from 3 documents...',
  'Identifying key grounds for representation...',
  'Cross-referencing medical certificate dates...',
  'Assessing evidence credibility...',
  'Generating recommendation...',
  'Formatting summary report...',
];

function generateSummary() {
  if (state.summaryGenerated) return;

  const idle    = document.getElementById('summary-idle');
  const loading = document.getElementById('summary-loading');
  const results = document.getElementById('summary-results');
  const actionBar = document.getElementById('summary-action-bar-results');
  const btn     = document.getElementById('btn-generate-summary');
  const status  = document.getElementById('processing-status');

  // Show loading
  idle.classList.add('hidden');
  loading.classList.remove('hidden');
  btn.disabled = true;
  btn.classList.add('loading');
  btn.innerHTML = '<span class="spinner"></span><span>Analysing...</span>';

  // Cycle processing messages
  let msgIdx = 0;
  const msgInterval = setInterval(() => {
    msgIdx = (msgIdx + 1) % processingMessages.length;
    if (status) status.textContent = processingMessages[msgIdx];
  }, 900);

  // After 5.5s show results
  setTimeout(() => {
    clearInterval(msgInterval);
    loading.classList.add('hidden');
    results.classList.remove('hidden');
    actionBar.style.display = 'flex';

    btn.disabled = false;
    btn.classList.remove('loading');
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Regenerate Summary`;

    state.summaryGenerated = true;

    // Animate confidence bar
    setTimeout(() => {
      const bar = document.querySelector('.confidence-fill');
      if (bar) bar.style.width = '82%';
    }, 300);
  }, 5500);
}

/* ══════════════════════════════════════════
   DOCUMENT ITEM SELECTION
══════════════════════════════════════════ */
function initDocSelection() {
  document.querySelectorAll('.doc-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.type === 'checkbox') return; // let checkbox handle itself
      const cb = item.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = !cb.checked;
      item.classList.toggle('selected', cb ? cb.checked : false);
      updateDocCount();
    });

    const cb = item.querySelector('input[type="checkbox"]');
    if (cb) {
      cb.addEventListener('change', () => {
        item.classList.toggle('selected', cb.checked);
        updateDocCount();
      });
    }
  });
}

function updateDocCount() {
  const checked = document.querySelectorAll('.doc-item input[type="checkbox"]:checked').length;
  const total   = document.querySelectorAll('.doc-item input[type="checkbox"]').length;
  const countEl = document.querySelector('.doc-selection-footer div:first-child');
  if (countEl) countEl.textContent = `${checked} of ${total} documents selected`;
}

/* ══════════════════════════════════════════
   LETTER TYPE SELECTION
══════════════════════════════════════════ */
function initLetterTypeSelection() {
  document.querySelectorAll('.letter-type-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.letter-type-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      updateLetterPreviewHeader(option.dataset.decision);
    });
  });
}

function updateLetterPreviewHeader(decision) {
  const header = document.querySelector('.letter-preview-header .letter-preview-title');
  if (!header) return;
  const labels = {
    accept:  'Letter Preview — Acceptance (Medical Grounds)',
    reject:  'Letter Preview — Rejection (Standard)',
    partial: 'Letter Preview — Partial Acceptance',
  };
  const icon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;margin-right:4px;vertical-align:-2px;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  header.innerHTML = icon + (labels[decision] || labels.accept);
}

/* ══════════════════════════════════════════
   LETTER GENERATION (simulated)
══════════════════════════════════════════ */
function generateLetter() {
  const btn = document.getElementById('btn-generate-letter');
  if (!btn) return;

  btn.disabled = true;
  btn.classList.add('loading');
  btn.innerHTML = '<span class="spinner"></span><span>Generating...</span>';

  setTimeout(() => {
    btn.disabled = false;
    btn.classList.remove('loading');
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Regenerate Letter`;
    showToast('Letter generated successfully');
  }, 2000);
}

/* ══════════════════════════════════════════
   ISSUE DECISION (simulated)
══════════════════════════════════════════ */
function handleIssue() {
  const btn = document.getElementById('btn-issue');
  if (!btn) return;

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="border-color:rgba(255,255,255,0.35);border-top-color:white;"></span><span>Issuing...</span>';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Decision Issued`;
    btn.style.background = 'var(--color-success)';
    showToast('Decision issued. Letter queued for dispatch.', 'success');
  }, 2200);
}

function handleReject() {
  showToast('Case returned. Please update the decision before resubmitting.', 'warning');
}

/* ══════════════════════════════════════════
   SAVE DRAFT
══════════════════════════════════════════ */
function saveDraft() {
  const btn = document.getElementById('btn-save-draft');
  if (!btn) return;
  const original = btn.innerHTML;
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    Saved!`;
  btn.style.background = 'var(--color-success-light)';
  btn.style.color = 'var(--color-success-text)';
  btn.style.borderColor = 'var(--color-success)';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.removeAttribute('style');
  }, 2000);
  showToast('Draft saved');
}

/* ══════════════════════════════════════════
   UPLOAD ZONE
══════════════════════════════════════════ */
function initUploadZone() {
  const zone = document.getElementById('upload-zone');
  if (!zone) return;

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.style.borderColor = 'var(--color-primary)';
    zone.style.background = 'var(--color-primary-25)';
  });

  zone.addEventListener('dragleave', () => {
    zone.style.borderColor = '';
    zone.style.background = '';
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.style.borderColor = '';
    zone.style.background = '';
    const files = e.dataTransfer.files;
    if (files.length) showToast(`${files.length} file(s) uploaded`);
  });

  zone.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.jpg,.jpeg,.png';
    input.multiple = true;
    input.onchange = () => {
      if (input.files.length) showToast(`${input.files.length} file(s) uploaded`);
    };
    input.click();
  });
}

/* ══════════════════════════════════════════
   SIDEBAR NAVIGATION
══════════════════════════════════════════ */
function initSidebarNav() {
  document.querySelectorAll('.nav-item[data-nav]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ══════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════ */
let toastContainer;

function getToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.style.cssText = `
      position: fixed; bottom: 24px; right: 24px;
      display: flex; flex-direction: column; gap: 8px;
      z-index: 9999; pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function showToast(message, type = 'info') {
  const container = getToastContainer();

  const colorMap = {
    success: { bg: 'var(--color-success)',  text: '#fff' },
    warning: { bg: 'var(--color-warning)',  text: '#fff' },
    error:   { bg: 'var(--color-error)',    text: '#fff' },
    info:    { bg: 'var(--color-primary)',  text: '#fff' },
  };

  const { bg, text } = colorMap[type] || colorMap.info;

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: ${bg}; color: ${text};
    padding: 10px 16px; border-radius: 8px;
    font-size: 13px; font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0; transform: translateY(8px);
    transition: opacity 200ms ease, transform 200ms ease;
    pointer-events: auto;
    max-width: 320px;
    font-family: var(--font-family, sans-serif);
  `;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(4px)';
    setTimeout(() => container.removeChild(toast), 200);
  }, 3200);
}

/* ══════════════════════════════════════════
   INITIALISE
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* Tab switching via tab bar */
  document.querySelectorAll('.tab-item[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  /* Step indicator navigation */
  document.querySelectorAll('.step-indicator-item[data-step]').forEach(item => {
    item.addEventListener('click', () => activateStep(Number(item.dataset.step)));
  });

  /* Generate Summary button */
  const btnSummary = document.getElementById('btn-generate-summary');
  if (btnSummary) btnSummary.addEventListener('click', generateSummary);

  /* Proceed to Letter from Summary */
  const btnGoLetter = document.getElementById('btn-go-letter');
  if (btnGoLetter) btnGoLetter.addEventListener('click', () => {
    activateStep(3);
    showToast('Summary saved. Configure your letter.');
  });

  /* Generate Letter button */
  const btnLetter = document.getElementById('btn-generate-letter');
  if (btnLetter) btnLetter.addEventListener('click', generateLetter);

  /* Proceed to Review from Letter */
  const btnGoReview = document.getElementById('btn-go-review');
  if (btnGoReview) btnGoReview.addEventListener('click', () => {
    activateStep(4);
    showToast('Letter saved. Review before issuing.', 'info');
  });

  /* Issue Decision */
  const btnIssue = document.getElementById('btn-issue');
  if (btnIssue) btnIssue.addEventListener('click', handleIssue);

  /* Save Draft */
  const btnDraft = document.getElementById('btn-save-draft');
  if (btnDraft) btnDraft.addEventListener('click', saveDraft);

  /* Init sub-components */
  initDocSelection();
  initLetterTypeSelection();
  initUploadZone();
  initSidebarNav();

  /* Confidence bar initial state (no animation until summary shown) */
  const bar = document.querySelector('.confidence-fill');
  if (bar) bar.style.width = '0%';
});
