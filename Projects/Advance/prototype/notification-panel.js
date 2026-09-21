/* ═══════════════════════════════════════════════════════════
   Advance — Shared Notification Panel  (revamped UI)
   Auto-injects styles + markup + handlers on every page.
   Bound to any topnav button with aria-label containing "Notification".
   Tokens: MET-DS-V2 (relies on the page's :root CSS variables).
   ═══════════════════════════════════════════════════════════ */
(function () {
  if (window.__advanceNotifPanelLoaded) return;
  window.__advanceNotifPanelLoaded = true;

  /* ─── Sample notification data
     Schema: { initials, name, id, text, time, unread? } ─── */
  const NOTIFICATIONS = [
    { initials: 'DD',  name: 'David Dk',     id: '90623', text: 'has updated Banking Details Effective StartDate in Contract screen', time: '01/04/2026 02:34 PM', unread: true },
    { initials: 'DD',  name: 'David Dk',     id: '90623', text: 'has updated VAT Registration Number in Contract screen',              time: '01/04/2026 02:34 PM', unread: true },
    { initials: 'DD',  name: 'David Dk',     id: '90623', text: 'has updated Address 1,Address 2,Address 3,City,First Name in Personal Details screen', time: '06/03/2026 06:58 AM', unread: true },
    { initials: 'DD',  name: 'David Dk',     id: '90623', text: 'has updated VAT Registration Status in Contract screen',              time: '03/03/2026 12:28 PM' },
    { initials: 'RP',  name: 'Ram Prakashh', id: '90659', text: 'has updated Company Address,VAT Registration Number in Contract screen', time: '11/02/2026 10:16 AM' },
    { initials: 'DD',  name: 'David Dk',     id: '90623', text: 'has updated Status in Certificate Status screen',                     time: '10/02/2026 01:35 PM' },
    { initials: 'TJJ', name: 'Tim J J',      id: '90663', text: 'has updated Status in Certificate Status screen',                     time: '09/02/2026 12:12 PM' },
    { initials: 'TJJ', name: 'Tim J J',      id: '90663', text: 'has updated Deferred Outcome,Hearing Date\\Time,Outcome in Certificate Processing screen', time: '09/02/2026 09:26 AM' },
  ];

  /* ─── Avatar palette (deterministic per-user colour) ─── */
  const AVATAR_PALETTE = [
    '#275798', '#22497D', '#2C66B4', '#3276CF', '#4B87D6',
    '#2E7D32', '#388E3C', '#5E35B1', '#6A1B9A', '#C2185B',
    '#AD1457', '#E56800', '#F57C00', '#0277BD', '#00838F'
  ];
  function hashColour(key) {
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
    return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
  }

  /* ─── Month grouping ─── */
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  function monthKey(dmy) {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(dmy || '');
    if (!m) return 'Earlier';
    return MONTHS[parseInt(m[2], 10) - 1] + ' ' + m[3];
  }

  /* ─── Message parsing: highlight fields + screen ─── */
  function parseMessage(text) {
    const re = /^has updated\s+(.+?)\s+in\s+(.+?)\s+screen$/i;
    const m = re.exec((text || '').trim());
    if (!m) return { plain: text || '' };
    const fields = m[1].split(',').map(s => s.trim()).filter(Boolean);
    return { fields, screen: m[2].trim() };
  }

  /* ─── Escape helper ─── */
  const esc = (s) => String(s).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  /* ─── CSS ─── */
  const css = `
    .notif-overlay {
      position: fixed; inset: 0;
      background: rgba(15, 23, 42, 0.32);
      opacity: 0; visibility: hidden;
      transition: opacity 250ms ease-out, visibility 250ms ease-out;
      z-index: 1100;
      backdrop-filter: blur(2px);
    }
    .notif-overlay.open { opacity: 1; visibility: visible; }

    .notif-panel {
      position: fixed; top: 0; right: 0; bottom: 0;
      width: min(560px, 95vw);
      background: var(--color-bg, #F2F5FA);
      box-shadow: -12px 0 40px rgba(0, 0, 0, 0.18);
      transform: translateX(100%);
      transition: transform 280ms cubic-bezier(.2,.8,.2,1);
      z-index: 1101;
      display: flex; flex-direction: column;
      overflow: hidden;
      font-family: var(--font-family, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif);
      color: var(--text-primary, #212121);
    }
    .notif-panel.open { transform: translateX(0); }

    /* Header */
    .notif-header {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px;
      padding: 18px 20px 14px;
      background: var(--color-card, #FFFFFF);
      border-bottom: 1px solid var(--grey-200, #EEEEEE);
      flex-shrink: 0;
    }
    .notif-title-wrap { display: inline-flex; align-items: center; gap: 10px; min-width: 0; }
    .notif-title {
      margin: 0;
      font-size: 20px; font-weight: 600;
      color: var(--text-primary, #212121);
      letter-spacing: -0.1px;
    }
    .notif-count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 22px; height: 22px; padding: 0 8px;
      border-radius: 100px;
      background: var(--color-primary, #3276CF);
      color: #FFFFFF;
      font-size: 11px; font-weight: 700; line-height: 1;
    }
    .notif-count.is-zero { background: var(--grey-300, #E0E0E0); color: var(--text-secondary, #757575); }

    .notif-header-actions { display: inline-flex; align-items: center; gap: 4px; }
    .notif-header-actions button {
      background: transparent; border: none; cursor: pointer;
      font-family: inherit;
      font-size: 13px; font-weight: 600;
      color: var(--text-hyperlink, #3276CF);
      padding: 6px 10px;
      border-radius: 6px;
      transition: background 150ms ease-out, color 150ms ease-out;
    }
    .notif-header-actions button:hover { background: var(--color-primary-25, #F2F5FA); }
    .notif-header-actions button:focus-visible {
      outline: 2px solid var(--color-primary, #3276CF);
      outline-offset: 2px;
    }
    .notif-header-actions .sep { color: var(--grey-300, #E0E0E0); user-select: none; }
    .notif-panel-close {
      width: 32px; height: 32px;
      border-radius: 50%; border: none;
      background: transparent; color: var(--text-secondary, #757575);
      cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      transition: background 150ms ease-out, color 150ms ease-out;
    }
    .notif-panel-close:hover { background: var(--grey-100, #F5F5F5); color: var(--text-primary, #212121); }
    .notif-panel-close:focus-visible {
      outline: 2px solid var(--color-primary, #3276CF);
      outline-offset: 2px;
    }
    .notif-panel-close svg { width: 16px; height: 16px; }

    /* Filter tabs */
    .notif-tabs {
      display: inline-flex; gap: 4px;
      padding: 8px 16px 0;
      background: var(--color-card, #FFFFFF);
      border-bottom: 1px solid var(--grey-200, #EEEEEE);
      flex-shrink: 0;
    }
    .notif-tab {
      position: relative;
      background: transparent; border: none; cursor: pointer;
      font-family: inherit;
      font-size: 13px; font-weight: 600;
      color: var(--text-secondary, #757575);
      padding: 8px 12px 10px;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      display: inline-flex; align-items: center; gap: 6px;
      transition: color 150ms ease-out, border-color 150ms ease-out;
    }
    .notif-tab:hover { color: var(--text-primary, #212121); }
    .notif-tab.active {
      color: var(--color-primary-700, #275798);
      border-bottom-color: var(--color-primary-700, #275798);
    }
    .notif-tab .pill {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 18px; height: 18px; padding: 0 6px;
      border-radius: 100px;
      background: var(--grey-200, #EEEEEE);
      color: var(--text-secondary, #757575);
      font-size: 10px; font-weight: 700; line-height: 1;
    }
    .notif-tab.active .pill { background: var(--color-primary, #3276CF); color: #FFFFFF; }

    /* List */
    .notif-list {
      flex: 1; overflow-y: auto;
      padding: 8px 0 16px;
      margin: 0; list-style: none;
      scroll-behavior: smooth;
    }
    .notif-group {
      display: block;
      padding: 14px 20px 6px;
      font-size: 11px; font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--text-secondary, #757575);
    }

    .notif-item {
      position: relative;
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 4px 14px;
      padding: 14px 20px;
      margin: 4px 12px;
      background: var(--color-card, #FFFFFF);
      border: 1px solid var(--grey-200, #EEEEEE);
      border-radius: 12px;
      align-items: start;
      transition: box-shadow 150ms ease-out, border-color 150ms ease-out;
      animation: notifItemIn 220ms ease-out;
    }
    .notif-item:hover {
      box-shadow: 0 4px 14px rgba(50, 118, 207, 0.10);
      border-color: var(--color-primary-50, #DEE8F7);
    }
    .notif-item.is-unread {
      background: linear-gradient(90deg, var(--color-primary-25, #F2F5FA) 0%, #FFFFFF 60%);
      border-color: var(--color-primary-50, #DEE8F7);
    }
    .notif-item.is-unread::before {
      content: "";
      position: absolute;
      left: -1px; top: 12px; bottom: 12px;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: var(--color-primary, #3276CF);
    }

    @keyframes notifItemIn {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .notif-avatar {
      grid-column: 1; grid-row: 1 / span 3;
      width: 40px; height: 40px;
      border-radius: 50%;
      color: #FFFFFF;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 700;
      letter-spacing: 0.4px;
      flex-shrink: 0;
      box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    }

    .notif-row-top {
      grid-column: 2; grid-row: 1;
      display: flex; align-items: baseline; justify-content: space-between;
      gap: 8px;
      min-width: 0;
      padding-right: 28px;
    }
    .notif-name {
      font-size: 14px; font-weight: 700;
      color: var(--text-primary, #212121);
      line-height: 1.3;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .notif-name .uid { color: var(--text-secondary, #757575); font-weight: 600; }
    .notif-time {
      font-size: 11px;
      color: var(--text-secondary, #757575);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .notif-item.is-unread .notif-time { color: var(--color-primary-700, #275798); font-weight: 600; }

    .notif-text {
      grid-column: 2; grid-row: 2;
      font-size: 13px;
      color: var(--text-primary, #212121);
      line-height: 1.55;
      word-break: break-word;
    }
    .notif-text .verb { color: var(--text-secondary, #757575); }
    .notif-text .field {
      display: inline-block;
      padding: 1px 8px;
      margin: 2px 4px 2px 0;
      border-radius: 100px;
      background: var(--color-primary-25, #F2F5FA);
      color: var(--color-primary-700, #275798);
      font-weight: 600;
      font-size: 12px;
      line-height: 1.5;
    }
    .notif-meta {
      grid-column: 2; grid-row: 3;
      margin-top: 4px;
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px;
      color: var(--text-secondary, #757575);
    }
    .notif-screen {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 8px;
      border-radius: 6px;
      background: var(--grey-100, #F5F5F5);
      color: var(--text-secondary, #757575);
      font-weight: 600;
    }
    .notif-screen svg { width: 10px; height: 10px; }

    .notif-dismiss {
      position: absolute;
      top: 8px; right: 8px;
      width: 24px; height: 24px;
      border: none; border-radius: 50%;
      background: transparent;
      color: var(--text-secondary, #757575);
      cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      opacity: 0;
      transition: opacity 150ms ease-out, background 150ms ease-out, color 150ms ease-out;
    }
    .notif-item:hover .notif-dismiss,
    .notif-dismiss:focus-visible { opacity: 1; }
    .notif-dismiss:hover { background: var(--grey-100, #F5F5F5); color: var(--text-primary, #212121); }
    .notif-dismiss:focus-visible {
      outline: 2px solid var(--color-primary, #3276CF);
      outline-offset: 2px;
    }
    .notif-dismiss svg { width: 12px; height: 12px; }

    /* Empty state */
    .notif-empty {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 60px 24px;
      text-align: center;
      color: var(--text-secondary, #757575);
    }
    .notif-empty-icon {
      width: 56px; height: 56px;
      border-radius: 50%;
      background: var(--color-primary-25, #F2F5FA);
      color: var(--color-primary, #3276CF);
      display: inline-flex; align-items: center; justify-content: center;
      margin-bottom: 14px;
    }
    .notif-empty-icon svg { width: 26px; height: 26px; }
    .notif-empty-title {
      font-size: 15px; font-weight: 600;
      color: var(--text-primary, #212121);
      margin: 0 0 4px;
    }
    .notif-empty-sub { font-size: 13px; margin: 0; }

    /* Footer */
    .notif-footer {
      display: flex; align-items: center; justify-content: center;
      padding: 12px 20px;
      background: var(--color-card, #FFFFFF);
      border-top: 1px solid var(--grey-200, #EEEEEE);
      flex-shrink: 0;
    }
    .notif-footer a {
      font-size: 13px; font-weight: 600;
      color: var(--text-hyperlink, #3276CF);
      text-decoration: none;
      padding: 6px 10px; border-radius: 6px;
      display: inline-flex; align-items: center; gap: 4px;
    }
    .notif-footer a:hover { background: var(--color-primary-25, #F2F5FA); }
    .notif-footer a:focus-visible {
      outline: 2px solid var(--color-primary, #3276CF);
      outline-offset: 2px;
    }
    .notif-footer a svg { width: 12px; height: 12px; }

    @media (prefers-reduced-motion: reduce) {
      .notif-overlay, .notif-panel, .notif-item { transition: none !important; animation: none !important; }
    }
  `;

  /* ─── Inject styles ─── */
  const style = document.createElement('style');
  style.setAttribute('data-advance-notif', '');
  style.textContent = css;
  document.head.appendChild(style);

  /* ─── Build panel markup ─── */
  const overlay = document.createElement('div');
  overlay.className = 'notif-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const panel = document.createElement('aside');
  panel.className = 'notif-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'false');
  panel.setAttribute('aria-labelledby', 'notifPanelTitle');
  panel.setAttribute('aria-hidden', 'true');
  panel.tabIndex = -1;
  panel.innerHTML = `
    <header class="notif-header">
      <div class="notif-title-wrap">
        <h2 class="notif-title" id="notifPanelTitle">Notifications</h2>
        <span class="notif-count" id="notifUnreadCount" aria-label="Unread count">0</span>
      </div>
      <div class="notif-header-actions">
        <button type="button" data-action="read-all">Mark all read</button>
        <span class="sep" aria-hidden="true">·</span>
        <button type="button" data-action="clear-all">Clear all</button>
        <button type="button" class="notif-panel-close" data-action="close" aria-label="Close notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="notif-tabs" role="tablist" aria-label="Filter notifications">
      <button type="button" class="notif-tab active" role="tab" aria-selected="true" data-filter="all">
        All <span class="pill" id="pillAll">0</span>
      </button>
      <button type="button" class="notif-tab" role="tab" aria-selected="false" data-filter="unread">
        Unread <span class="pill" id="pillUnread">0</span>
      </button>
    </div>

    <ul class="notif-list" id="notifList" role="list"></ul>

    <footer class="notif-footer">
      <a href="#" data-action="view-all">
        View all activity
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </a>
    </footer>
  `;

  /* ─── State ─── */
  let state = NOTIFICATIONS.slice();
  let activeFilter = 'all';
  let lastTrigger = null;

  /* ─── Render ─── */
  function render() {
    const list = panel.querySelector('#notifList');
    if (!list) return;

    const unreadCount = state.filter(n => n.unread).length;
    const cntEl = panel.querySelector('#notifUnreadCount');
    cntEl.textContent = unreadCount;
    cntEl.classList.toggle('is-zero', unreadCount === 0);
    panel.querySelector('#pillAll').textContent = state.length;
    panel.querySelector('#pillUnread').textContent = unreadCount;

    const visible = activeFilter === 'unread' ? state.filter(n => n.unread) : state.slice();

    if (visible.length === 0) {
      list.innerHTML = `
        <li class="notif-empty">
          <span class="notif-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </span>
          <p class="notif-empty-title">${state.length === 0 ? "You're all caught up" : 'No unread notifications'}</p>
          <p class="notif-empty-sub">${state.length === 0 ? 'New activity will appear here.' : 'Switch to All to see everything.'}</p>
        </li>`;
      return;
    }

    // Group by month-year
    const groups = new Map();
    visible.forEach(n => {
      const k = monthKey(n.time);
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push({ n, i: state.indexOf(n) });
    });

    let html = '';
    groups.forEach((items, key) => {
      html += `<li class="notif-group" role="presentation">${esc(key)}</li>`;
      items.forEach(({ n, i }) => {
        const parsed = parseMessage(n.text);
        const colour = hashColour(n.name + n.id);
        const messageHtml = parsed.fields
          ? `<span class="verb">updated </span>${parsed.fields.map(f => `<span class="field">${esc(f)}</span>`).join('')}`
          : esc(parsed.plain || n.text);
        const screenHtml = parsed.screen
          ? `<span class="notif-screen">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                 <rect x="3" y="4" width="18" height="14" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="18" x2="12" y2="20"/>
               </svg>
               ${esc(parsed.screen)} screen
             </span>`
          : '';
        html += `
          <li class="notif-item ${n.unread ? 'is-unread' : ''}" data-index="${i}">
            <span class="notif-avatar" aria-hidden="true" style="background:${colour}">${esc(n.initials)}</span>
            <div class="notif-row-top">
              <span class="notif-name">${esc(n.name)}<span class="uid"> · #${esc(n.id)}</span></span>
              <span class="notif-time">${esc(n.time)}</span>
            </div>
            <div class="notif-text">${messageHtml}</div>
            <div class="notif-meta">${screenHtml}</div>
            <button type="button" class="notif-dismiss" data-action="dismiss"
                    aria-label="Dismiss notification from ${esc(n.name)}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </li>`;
      });
    });
    list.innerHTML = html;
  }

  /* ─── Open / close ─── */
  function open(trigger) {
    lastTrigger = trigger || null;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    setTimeout(() => panel.focus(), 50);
  }
  function close() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  }

  /* ─── Wire events ─── */
  function wire() {
    bindBells();
    new MutationObserver(bindBells).observe(document.body, { childList: true, subtree: true });

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) close();
    });

    panel.querySelectorAll('.notif-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeFilter = tab.dataset.filter;
        panel.querySelectorAll('.notif-tab').forEach(t => {
          const on = t === tab;
          t.classList.toggle('active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        render();
      });
    });

    panel.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action], a[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'close') {
        close();
      } else if (action === 'dismiss') {
        const li = btn.closest('.notif-item');
        if (!li) return;
        const i = parseInt(li.dataset.index, 10);
        if (!isNaN(i)) { state.splice(i, 1); render(); }
      } else if (action === 'read-all') {
        state = state.map(n => Object.assign({}, n, { unread: false }));
        render();
      } else if (action === 'clear-all') {
        state = []; render();
      } else if (action === 'view-all') {
        e.preventDefault();
      }
    });
  }

  function bindBells() {
    const candidates = document.querySelectorAll(
      '.icon-btn[aria-label*="Notification" i], .icon-btn[aria-label*="notification" i]'
    );
    candidates.forEach(btn => {
      if (btn.__notifBound) return;
      btn.__notifBound = true;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        open(btn);
      });
    });
  }

  /* ─── Mount ─── */
  function mount() {
    if (document.querySelector('.notif-panel')) return;
    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    render();
    wire();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
