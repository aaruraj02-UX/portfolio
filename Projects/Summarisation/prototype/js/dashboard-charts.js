/* Dashboard chart interactivity
   - Line-chart hover: renders per-point dots and a shared tooltip with exact value
   - Heatmap hover: shows count breakdown (Green / Amber / Red) for the cell
   Runs automatically on DOMContentLoaded. Safe to re-include on every dashboard. */
(function () {
  'use strict';

  // ---------- shared tooltip ----------
  let tip;
  function ensureTip() {
    if (tip) return tip;
    tip = document.createElement('div');
    tip.className = 'db-tooltip';
    tip.setAttribute('role', 'tooltip');
    tip.style.opacity = '0';
    document.body.appendChild(tip);
    return tip;
  }
  function showTip(html, ev) {
    const t = ensureTip();
    t.innerHTML = html;
    t.style.opacity = '1';
    positionTip(ev);
  }
  function hideTip() {
    if (tip) tip.style.opacity = '0';
  }
  function positionTip(ev) {
    if (!tip) return;
    const pad = 14;
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    let x = ev.clientX + pad;
    let y = ev.clientY - h - pad;
    if (x + w + 8 > window.innerWidth) x = ev.clientX - w - pad;
    if (y < 8) y = ev.clientY + pad;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  }

  // ---------- line charts ----------
  function initLineCharts() {
    const svgs = document.querySelectorAll('svg.chart');
    svgs.forEach(function (svg) {
      const polylines = svg.querySelectorAll('polyline[data-values]');
      if (!polylines.length) return;

      // one hover-layer group per chart
      const svgns = 'http://www.w3.org/2000/svg';
      const layer = document.createElementNS(svgns, 'g');
      layer.setAttribute('class', 'hover-layer');
      svg.appendChild(layer);

      polylines.forEach(function (poly) {
        const pts = (poly.getAttribute('points') || '').trim().split(/\s+/).map(function (p) {
          const parts = p.split(',');
          return { x: parseFloat(parts[0]), y: parseFloat(parts[1]) };
        });
        const values = (poly.getAttribute('data-values') || '').split(',').map(function (v) { return v.trim(); });
        const labels = (poly.getAttribute('data-labels') || '').split(',').map(function (v) { return v.trim(); });
        const series = poly.getAttribute('data-series') || '';
        const unit   = poly.getAttribute('data-unit') || 'cases';
        const color  = poly.getAttribute('stroke') || getComputedStyle(poly).stroke || '#3276CF';

        pts.forEach(function (pt, i) {
          // visible marker
          const dot = document.createElementNS(svgns, 'circle');
          dot.setAttribute('cx', pt.x);
          dot.setAttribute('cy', pt.y);
          dot.setAttribute('r', 3);
          dot.setAttribute('fill', color);
          dot.setAttribute('class', 'lc-point-dot');
          layer.appendChild(dot);

          // large invisible hit target
          const hit = document.createElementNS(svgns, 'circle');
          hit.setAttribute('cx', pt.x);
          hit.setAttribute('cy', pt.y);
          hit.setAttribute('r', 12);
          hit.setAttribute('fill', 'transparent');
          hit.setAttribute('class', 'lc-point-hit');
          hit.style.cursor = 'pointer';
          layer.appendChild(hit);

          const label = labels[i] || '';
          const value = values[i] != null ? values[i] : '';

          function enter(ev) {
            dot.setAttribute('r', 5);
            dot.setAttribute('stroke', '#FFFFFF');
            dot.setAttribute('stroke-width', '2');
            const html =
              '<div class="tt-head"><span class="tt-swatch" style="background:' + color + '"></span>' +
              '<span class="tt-series">' + escapeHtml(series) + '</span></div>' +
              '<div class="tt-label">' + escapeHtml(label) + '</div>' +
              '<div class="tt-value">' + escapeHtml(value) + ' <span class="tt-unit">' + escapeHtml(unit) + '</span></div>';
            showTip(html, ev);
          }
          function move(ev) { positionTip(ev); }
          function leave() {
            dot.setAttribute('r', 3);
            dot.removeAttribute('stroke');
            dot.removeAttribute('stroke-width');
            hideTip();
          }
          hit.addEventListener('mouseenter', enter);
          hit.addEventListener('mousemove', move);
          hit.addEventListener('mouseleave', leave);
          hit.addEventListener('focus', function (ev) {
            const rect = hit.getBoundingClientRect();
            enter({ clientX: rect.left + rect.width / 2, clientY: rect.top });
          });
          hit.addEventListener('blur', leave);
          hit.setAttribute('tabindex', '0');
          hit.setAttribute('role', 'img');
          hit.setAttribute('aria-label', series + ' ' + label + ' ' + value + ' ' + unit);
        });
      });
    });
  }

  // ---------- heatmap ----------
  // Realistic per-level activity counts — rotated by hour so the grid reads with variety
  const HM_LEVEL_COUNT = {
    l1: [12, 24, 48, 87],
    l2: [120, 260, 380, 512],
    l3: [720, 850, 999, 940],
    l4: [1200, 1500, 2400, 3800],
    l5: [12000, 45000, 78000, 100000]
  };
  // Breakdown ratios (Green / Amber / Red) — plausible split for a review heatmap
  const HM_LEVEL_RATIOS = {
    l1: { g: 0.75, a: 0.17, r: 0.08 },
    l2: { g: 0.70, a: 0.20, r: 0.10 },
    l3: { g: 0.66, a: 0.22, r: 0.12 },
    l4: { g: 0.60, a: 0.26, r: 0.14 },
    l5: { g: 0.54, a: 0.30, r: 0.16 }
  };
  const HOUR_LABELS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];

  function splitCount(total, ratios) {
    const g = Math.round(total * ratios.g);
    const a = Math.round(total * ratios.a);
    const r = Math.max(0, total - g - a);
    return { g: g, a: a, r: r };
  }

  // 999 → "999", 1500 → "1.5k", 100000 → "100k", 1_250_000 → "1.3M"
  function formatShort(n) {
    if (n < 1000) return String(n);
    if (n < 10000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    if (n < 1000000) return Math.round(n / 1000) + 'k';
    if (n < 10000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    return Math.round(n / 1000000) + 'M';
  }

  function initHeatmaps() {
    const maps = document.querySelectorAll('.heatmap');
    maps.forEach(function (map) {
      // Determine each row's day label and enumerate cells for hour index
      let currentDay = '';
      let hourIdx = 0;
      const children = Array.from(map.children);
      children.forEach(function (el) {
        if (el.classList.contains('hm-label')) {
          currentDay = el.textContent.trim();
          hourIdx = 0;
          return;
        }
        if (!el.classList.contains('hm-cell')) return;

        // detect level class
        let lvl = 'l3';
        ['l1','l2','l3','l4','l5'].forEach(function (l) { if (el.classList.contains(l)) lvl = l; });

        // count (allow override via data-count; otherwise rotate the per-level bucket by hour for variety)
        const explicit = el.getAttribute('data-count');
        let count;
        if (explicit) {
          count = parseInt(explicit, 10);
        } else {
          const bucket = HM_LEVEL_COUNT[lvl];
          count = bucket[hourIdx % bucket.length];
        }

        // breakdown (allow override via data attrs)
        const explicitG = el.getAttribute('data-green');
        const explicitA = el.getAttribute('data-amber');
        const explicitR = el.getAttribute('data-red');
        let bd;
        if (explicitG != null && explicitA != null && explicitR != null) {
          bd = { g: +explicitG, a: +explicitA, r: +explicitR };
        } else {
          bd = splitCount(count, HM_LEVEL_RATIOS[lvl]);
        }

        // day/hour labels
        const day = el.getAttribute('data-day') || currentDay;
        const hour = el.getAttribute('data-hour') || HOUR_LABELS[hourIdx] || '';
        hourIdx++;

        const shortCount = formatShort(count);
        const fullCount = count.toLocaleString();

        // Inject count text if not already present
        if (!el.querySelector('.hm-count')) {
          const span = document.createElement('span');
          span.className = 'hm-count';
          span.textContent = shortCount;
          el.appendChild(span);
        }

        // Accessibility
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'img');
        el.setAttribute('aria-label',
          day + ' ' + hour + ' — ' + fullCount + ' cases. Green ' + bd.g + ', Amber ' + bd.a + ', Red ' + bd.r);

        function enter(ev) {
          const html =
            '<div class="tt-head"><span class="tt-series">' + escapeHtml(day) + ' · ' + escapeHtml(hour) + '</span></div>' +
            '<div class="tt-value">' + fullCount + ' <span class="tt-unit">cases</span></div>' +
            '<div class="tt-bd">' +
              '<span class="tt-chip g"><i></i>Green ' + bd.g.toLocaleString() + '</span>' +
              '<span class="tt-chip a"><i></i>Amber ' + bd.a.toLocaleString() + '</span>' +
              '<span class="tt-chip r"><i></i>Red ' + bd.r.toLocaleString() + '</span>' +
            '</div>';
          showTip(html, ev);
        }
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mousemove', positionTip);
        el.addEventListener('mouseleave', hideTip);
        el.addEventListener('focus', function () {
          const rect = el.getBoundingClientRect();
          enter({ clientX: rect.left + rect.width / 2, clientY: rect.top });
        });
        el.addEventListener('blur', hideTip);
      });
    });
  }

  // ---------- stacked horizontal bars (Top agents by RAG) ----------
  const SEG_COLOR = { green: '#16a34a', amber: '#f59e0b', red: '#dc2626', blue: '#3276CF', purple: '#5B21B6', 'green-light': '#86efac' };
  const SEG_LABEL = { green: 'Green', amber: 'Amber', red: 'Red', blue: 'Blue', purple: 'Purple', 'green-light': 'Green (light)' };
  const SEG_CHIP  = { green: 'g', amber: 'a', red: 'r' };

  function initStackBars() {
    const rows = document.querySelectorAll('.stack-bars .stack-row');
    rows.forEach(function (row) {
      const nameEl  = row.querySelector('.name');
      const totalEl = row.querySelector('.total');
      const bar     = row.querySelector('.stack-bar');
      if (!nameEl || !totalEl || !bar) return;

      const name  = nameEl.textContent.trim();
      const total = parseInt((totalEl.textContent || '').replace(/[^\d]/g, ''), 10) || 0;

      const segs = bar.querySelectorAll('.seg');
      const parsed = [];
      let sumRounded = 0;
      segs.forEach(function (seg) {
        const pct = parseFloat((seg.style.width || '0').replace('%','')) || 0;
        if (pct <= 0) return;
        let color = 'green';
        ['green','amber','red','blue','purple','green-light'].forEach(function (c) {
          if (seg.classList.contains(c)) color = c;
        });
        const raw = total * pct / 100;
        parsed.push({ seg: seg, pct: pct, raw: raw, count: Math.round(raw), color: color });
        sumRounded += Math.round(raw);
      });
      // reconcile rounding so per-segment counts sum to total
      let diff = total - sumRounded;
      if (diff !== 0 && parsed.length) {
        const order = parsed.slice().sort(function (a, b) {
          return Math.abs(b.raw - Math.round(b.raw)) - Math.abs(a.raw - Math.round(a.raw));
        });
        let i = 0;
        while (diff !== 0 && i < order.length) {
          order[i].count += (diff > 0 ? 1 : -1);
          diff += (diff > 0 ? -1 : 1);
          i++;
        }
      }

      function buildHtml(highlight) {
        let bd = '<div class="tt-bd">';
        parsed.forEach(function (q) {
          const chip = SEG_CHIP[q.color] || 'g';
          const emph = (q === highlight) ? ' style="font-weight:800;text-decoration:underline"' : '';
          bd += '<span class="tt-chip ' + chip + '"' + emph + '><i></i>' +
                (SEG_LABEL[q.color] || q.color) + ' ' + q.count + ' (' + Math.round(q.pct) + '%)</span>';
        });
        bd += '</div>';
        return (
          '<div class="tt-head"><span class="tt-swatch" style="background:' + (SEG_COLOR[highlight.color] || '#3276CF') + '"></span>' +
          '<span class="tt-series">' + escapeHtml(name) + '</span></div>' +
          '<div class="tt-value">' + total + ' <span class="tt-unit">cases</span></div>' + bd
        );
      }

      parsed.forEach(function (p) {
        p.seg.style.cursor = 'pointer';
        p.seg.setAttribute('tabindex', '0');
        p.seg.setAttribute('role', 'img');
        p.seg.setAttribute('aria-label',
          name + ' — ' + (SEG_LABEL[p.color] || p.color) + ' ' + p.count + ' of ' + total + ' (' + Math.round(p.pct) + '%)');

        function enter(ev) { showTip(buildHtml(p), ev); }
        p.seg.addEventListener('mouseenter', enter);
        p.seg.addEventListener('mousemove', positionTip);
        p.seg.addEventListener('mouseleave', hideTip);
        p.seg.addEventListener('focus', function () {
          const rect = p.seg.getBoundingClientRect();
          enter({ clientX: rect.left + rect.width / 2, clientY: rect.top });
        });
        p.seg.addEventListener('blur', hideTip);
      });
    });
  }

  // ---------- utils ----------
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ---------- multi-select with search (Contract filter) ----------
  function initMultiselects() {
    const wraps = document.querySelectorAll('.ms-wrap[data-multiselect]');
    wraps.forEach(function (wrap) {
      const trigger     = wrap.querySelector('.ms-trigger');
      const panel       = wrap.querySelector('.ms-panel');
      const search      = wrap.querySelector('.ms-search-input');
      const list        = wrap.querySelector('.ms-list');
      const emptyEl     = wrap.querySelector('.ms-empty');
      const applyBtn    = wrap.querySelector('.ms-apply');
      const clearBtn    = wrap.querySelector('.ms-clear');
      const triggerText = wrap.querySelector('.ms-trigger-text');
      if (!trigger || !panel || !list || !applyBtn || !clearBtn) return;

      const items = Array.from(list.querySelectorAll('.ms-item'));
      const placeholder = wrap.getAttribute('data-placeholder') || 'All';
      let applied = new Set();

      function syncToApplied() {
        items.forEach(function (it) {
          const cb = it.querySelector('input[type="checkbox"]');
          if (cb) cb.checked = applied.has(cb.value);
        });
      }
      function setCount(n) {
        let badge = trigger.querySelector('.ms-trigger-count');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'ms-trigger-count';
          const chev = trigger.querySelector('svg');
          if (chev) trigger.insertBefore(badge, chev); else trigger.appendChild(badge);
        }
        badge.textContent = n;
      }
      function removeCount() {
        const badge = trigger.querySelector('.ms-trigger-count');
        if (badge) badge.remove();
      }
      function updateTrigger() {
        if (applied.size === 0) {
          triggerText.textContent = placeholder;
          removeCount();
          return;
        }
        const labels = [];
        items.forEach(function (it) {
          const cb = it.querySelector('input[type="checkbox"]');
          const txt = it.querySelector('span');
          if (cb && txt && applied.has(cb.value)) labels.push(txt.textContent.trim());
        });
        if (applied.size === 1) {
          triggerText.textContent = labels[0];
          removeCount();
        } else {
          triggerText.textContent = labels[0] + ' +' + (applied.size - 1) + ' more';
          setCount(applied.size);
        }
      }
      function filter(term) {
        const q = (term || '').trim().toLowerCase();
        let visible = 0;
        items.forEach(function (it) {
          const show = !q || (it.textContent || '').toLowerCase().indexOf(q) !== -1;
          it.hidden = !show;
          if (show) visible++;
        });
        if (emptyEl) emptyEl.hidden = visible !== 0;
      }
      function open() {
        document.querySelectorAll('.ms-wrap[data-multiselect] .ms-panel').forEach(function (p) {
          if (p !== panel && !p.hidden && p.__close) p.__close();
        });
        syncToApplied();
        filter('');
        if (search) search.value = '';
        panel.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        if (search) setTimeout(function () { search.focus(); }, 10);
      }
      function close() {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        syncToApplied();
      }
      panel.__close = close;

      trigger.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (panel.hidden) open(); else close();
      });
      panel.addEventListener('click', function (ev) { ev.stopPropagation(); });
      if (search) {
        search.addEventListener('input', function () { filter(search.value); });
        search.addEventListener('keydown', function (ev) {
          if (ev.key === 'Escape') { close(); trigger.focus(); }
        });
      }
      clearBtn.addEventListener('click', function () {
        items.forEach(function (it) {
          const cb = it.querySelector('input[type="checkbox"]');
          if (cb) cb.checked = false;
        });
        if (search) { search.value = ''; filter(''); search.focus(); }
      });
      applyBtn.addEventListener('click', function () {
        applied = new Set();
        items.forEach(function (it) {
          const cb = it.querySelector('input[type="checkbox"]');
          if (cb && cb.checked) applied.add(cb.value);
        });
        updateTrigger();
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      });
      updateTrigger();
    });

    if (!document.__msOutsideBound) {
      document.__msOutsideBound = true;
      document.addEventListener('click', function () {
        document.querySelectorAll('.ms-wrap[data-multiselect] .ms-panel').forEach(function (p) {
          if (!p.hidden && p.__close) p.__close();
        });
      });
      document.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Escape') return;
        document.querySelectorAll('.ms-wrap[data-multiselect] .ms-panel').forEach(function (p) {
          if (!p.hidden && p.__close) {
            const t = p.closest('.ms-wrap').querySelector('.ms-trigger');
            p.__close();
            if (t) t.focus();
          }
        });
      });
    }
  }

  // ---------- Truncated cells (Custom / Selected mitigation, Amber reasons) ----------
  const TRUNC_CELL_CONFIG = [
    { selector: '.cm-cell[data-full]',  title: 'Custom mitigation',   color: '#5B21B6' },
    { selector: '.mit-cell[data-full]', title: 'Selected mitigation', color: '#16a34a' },
    { selector: '.ar-cell[data-full]',  title: 'Amber reasons',       color: '#f59e0b', list: true }
  ];
  function initCmCells() {
    TRUNC_CELL_CONFIG.forEach(function (cfg) {
      document.querySelectorAll(cfg.selector).forEach(function (el) {
        const full  = el.getAttribute('data-full') || '';
        const count = el.getAttribute('data-count') || '';
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', cfg.title + ': ' + full.replace(/\s*\|\s*/g, '; '));

        function enter(ev) {
          const body = cfg.list
            ? '<ul class="tt-list">' +
                full.split('|').map(function (r) {
                  return '<li>' + escapeHtml(r.trim()) + '</li>';
                }).join('') +
              '</ul>'
            : escapeHtml(full);
          const html =
            '<div class="tt-head"><span class="tt-swatch" style="background:' + cfg.color + '"></span>' +
            '<span class="tt-series">' + escapeHtml(cfg.title) + (count ? ' \u00b7 ' + escapeHtml(count) : '') + '</span></div>' +
            '<div class="tt-cm-body">' + body + '</div>';
          showTip(html, ev);
        }
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mousemove', positionTip);
        el.addEventListener('mouseleave', hideTip);
        el.addEventListener('focus', function () {
          const rect = el.getBoundingClientRect();
          enter({ clientX: rect.left + rect.width / 2, clientY: rect.top });
        });
        el.addEventListener('blur', hideTip);
      });
    });
  }

  function init() {
    initLineCharts();
    initHeatmaps();
    initStackBars();
    initMultiselects();
    initCmCells();
    initTreemapTips();
    initTableFilters();
    initSidePanes();
    initWidgetFilters();
    initActiveFilters();
    initMoreFilters();
    initTableToolbar();
    initTableSort();
    initColumnMenu();
    initGlobalTableSearch();
  }

  // ---------- global table search (bar above the case-table) ----------
  function initGlobalTableSearch() {
    document.querySelectorAll('.db-table-wrap').forEach(function (wrap) {
      var input = wrap.querySelector('[data-table-global-search]');
      var clearBtn = wrap.querySelector('[data-clear-global-search]');
      var table = wrap.querySelector('table.db-table');
      if (!input || !table) return;
      var tbody = table.querySelector('tbody');
      if (!tbody) return;

      // Cache row haystacks (all cell text + data-full attributes) for fast search
      var rowIndex = Array.from(tbody.rows).map(function (row) {
        var text = row.textContent.toLowerCase();
        row.querySelectorAll('[data-full]').forEach(function (n) {
          text += ' ' + (n.getAttribute('data-full') || '').toLowerCase();
        });
        return { row: row, hay: text.replace(/\s+/g, ' ').trim() };
      });

      function apply() {
        var q = (input.value || '').trim().toLowerCase();
        if (clearBtn) clearBtn.hidden = q.length === 0;
        rowIndex.forEach(function (r) {
          if (!q || r.hay.indexOf(q) !== -1) {
            r.row.classList.remove('row-hide-global');
          } else {
            r.row.classList.add('row-hide-global');
          }
        });
      }

      input.addEventListener('input', apply);
      input.addEventListener('search', apply);
      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          input.value = '';
          apply();
          input.focus();
        });
      }
    });
  }

  // ---------- case-table toolbar (search + filter toggle + column visibility) ----------
  function initTableToolbar() {
    document.querySelectorAll('.db-table-wrap').forEach(function (wrap) {
      // A) Search input -> PCN column (col 3)
      var search = wrap.querySelector('[data-table-search]');
      var pcnFilter = wrap.querySelector('[data-col-filter="3"]');
      if (search && pcnFilter) {
        search.addEventListener('input', function () {
          pcnFilter.value = search.value;
          pcnFilter.dispatchEvent(new Event('input', { bubbles: true }));
          pcnFilter.dispatchEvent(new Event('change', { bubbles: true }));
        });
        pcnFilter.addEventListener('change', function () {
          if (pcnFilter.value !== search.value) search.value = pcnFilter.value;
        });
      }

      // B) Filter icon -> show/hide the per-column filter row
      var filterBtn = wrap.querySelector('[data-toggle-filters]');
      var filterRow = wrap.querySelector('tr.db-filter-row');
      if (filterBtn && filterRow) {
        filterBtn.addEventListener('click', function () {
          var isOpen = !filterRow.hidden;
          filterRow.hidden = isOpen;
          filterBtn.setAttribute('aria-expanded', String(!isOpen));
          filterBtn.classList.toggle('active', !isOpen);
        });
      }

      // C) Columns icon -> dropdown checklist to toggle column visibility
      var colBtn = wrap.querySelector('[data-toggle-columns]');
      var table = wrap.querySelector('table.db-table');
      if (colBtn && table) {
        var headerCells = Array.from(table.querySelectorAll('thead tr:first-child th[scope="col"]'));
        var menu = document.createElement('div');
        menu.className = 'db-columns-menu';
        menu.setAttribute('role', 'menu');
        menu.hidden = true;
        headerCells.forEach(function (th, i) {
          var label = ((th.querySelector('.th-label') || th).textContent || '').trim();
          var row = document.createElement('label');
          row.className = 'db-columns-menu-item';
          row.innerHTML = '<input type="checkbox" checked data-col-toggle="' + i + '"> <span>' + escapeHtml(label) + '</span>';
          row.querySelector('input').addEventListener('change', function (e) {
            toggleColumn(table, i, e.target.checked);
          });
          menu.appendChild(row);
        });
        colBtn.insertAdjacentElement('afterend', menu);
        colBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          menu.hidden = !menu.hidden;
          colBtn.setAttribute('aria-expanded', String(!menu.hidden));
          colBtn.classList.toggle('active', !menu.hidden);
        });
        document.addEventListener('click', function (e) {
          if (menu.hidden) return;
          if (menu.contains(e.target) || e.target === colBtn) return;
          menu.hidden = true;
          colBtn.setAttribute('aria-expanded', 'false');
          colBtn.classList.remove('active');
        });
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && !menu.hidden) {
            menu.hidden = true;
            colBtn.setAttribute('aria-expanded', 'false');
            colBtn.classList.remove('active');
          }
        });
      }
    });
  }
  function toggleColumn(table, index, show) {
    Array.from(table.rows).forEach(function (row) {
      var cell = row.cells[index];
      if (cell) cell.style.display = show ? '' : 'none';
    });
  }

  // ---------- column sort (asc / desc / none, single-column) ----------
  function initTableSort() {
    document.querySelectorAll('table.db-table').forEach(function (table) {
      var headerRow = table.querySelector('thead tr:first-child');
      var tbody = table.querySelector('tbody');
      if (!headerRow || !tbody) return;
      var ths = Array.from(headerRow.querySelectorAll('th[scope="col"]'));

      // Wrap header text in a button-like span so keyboard/click work + arrow indicator
      ths.forEach(function (th, i) {
        var originalHtml = th.innerHTML.trim();
        th.innerHTML =
          '<button type="button" class="th-sort" data-col-sort="' + i + '" aria-sort="none">' +
            '<span class="th-label">' + originalHtml + '</span>' +
            '<span class="th-sort-icon" aria-hidden="true">' +
              '<svg width="10" height="12" viewBox="0 0 10 12" fill="none">' +
                '<path d="M5 1L1 5h8L5 1z" class="up"/>' +
                '<path d="M5 11l4-4H1l4 4z" class="down"/>' +
              '</svg>' +
            '</span>' +
          '</button>';
      });

      // Detect column type on demand
      function detectType(colIndex) {
        var rows = Array.from(tbody.rows).slice(0, 5);
        var allNumeric = rows.length > 0;
        var allDate = rows.length > 0;
        rows.forEach(function (r) {
          var t = ((r.cells[colIndex] || {}).textContent || '').trim().replace(/[,%]/g, '');
          if (t === '' || t === '\u2014') return;
          if (isNaN(parseFloat(t))) allNumeric = false;
          if (isNaN(Date.parse(t))) allDate = false;
        });
        if (allNumeric) return 'num';
        if (allDate) return 'date';
        return 'text';
      }

      function sortBy(colIndex, dir) {
        var type = detectType(colIndex);
        var rows = Array.from(tbody.rows);
        rows.sort(function (a, b) {
          var av = ((a.cells[colIndex] || {}).textContent || '').trim();
          var bv = ((b.cells[colIndex] || {}).textContent || '').trim();
          // Push em-dash to end regardless of dir
          if (av === '\u2014' && bv !== '\u2014') return 1;
          if (bv === '\u2014' && av !== '\u2014') return -1;
          var res;
          if (type === 'num') {
            res = parseFloat(av.replace(/[,%]/g, '')) - parseFloat(bv.replace(/[,%]/g, ''));
          } else if (type === 'date') {
            res = Date.parse(av) - Date.parse(bv);
          } else {
            res = av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' });
          }
          return dir === 'desc' ? -res : res;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      }

      var activeCol = -1;
      var activeDir = 'none'; // 'none' | 'asc' | 'desc'

      ths.forEach(function (th, i) {
        var btn = th.querySelector('button.th-sort');
        if (!btn) return;
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          // Cycle: same column -> asc -> desc -> none; different column -> asc
          if (activeCol !== i) {
            activeCol = i;
            activeDir = 'asc';
          } else if (activeDir === 'asc') {
            activeDir = 'desc';
          } else if (activeDir === 'desc') {
            activeDir = 'none';
            activeCol = -1;
          } else {
            activeDir = 'asc';
            activeCol = i;
          }
          // Reset all indicators
          ths.forEach(function (th2) {
            var b = th2.querySelector('button.th-sort');
            if (!b) return;
            b.setAttribute('aria-sort', 'none');
            b.classList.remove('is-asc', 'is-desc');
          });
          if (activeDir === 'none') {
            // Restore original order: sort by original position using data-orig-index if set
            var orig = Array.from(tbody.rows).sort(function (a, b) {
              return (+a.dataset.origIndex || 0) - (+b.dataset.origIndex || 0);
            });
            orig.forEach(function (r) { tbody.appendChild(r); });
          } else {
            btn.setAttribute('aria-sort', activeDir === 'asc' ? 'ascending' : 'descending');
            btn.classList.add(activeDir === 'asc' ? 'is-asc' : 'is-desc');
            sortBy(i, activeDir);
          }
        });
      });

      // Cache original order so "none" can restore it
      Array.from(tbody.rows).forEach(function (r, i) { r.dataset.origIndex = i; });
    });
  }

  // ---------- MUI-style per-column menu (Sort · Filter · Hide) ----------
  function initColumnMenu() {
    document.querySelectorAll('table.db-table').forEach(function (table) {
      var wrap = table.closest('.db-table-wrap');
      if (!wrap) return;
      var ths = Array.from(table.querySelectorAll('thead tr:first-child th[scope="col"]'));

      ths.forEach(function (th, colIndex) {
        var sortBtn = th.querySelector('button.th-sort');
        if (!sortBtn) return;
        var label = ((th.querySelector('.th-label') || {}).textContent || '').trim();
        var filterInput = wrap.querySelector('[data-col-filter="' + colIndex + '"]');
        var isSelect = filterInput && filterInput.tagName === 'SELECT';

        // Kebab (⋮) menu trigger
        var menuBtn = document.createElement('button');
        menuBtn.type = 'button';
        menuBtn.className = 'th-menu';
        menuBtn.setAttribute('aria-label', 'Column menu for ' + label);
        menuBtn.setAttribute('aria-haspopup', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML =
          '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
            '<circle cx="10" cy="4" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="10" cy="16" r="1.6"/>' +
          '</svg>';
        sortBtn.insertAdjacentElement('afterend', menuBtn);

        // Menu container
        var menu = document.createElement('div');
        menu.className = 'th-col-menu';
        menu.hidden = true;
        menu.setAttribute('role', 'menu');

        var filterMarkup;
        if (isSelect) {
          var opts = Array.from(filterInput.querySelectorAll('option')).map(function (o) {
            var val = o.value != null ? o.value : o.textContent;
            var lbl = o.textContent || val;
            var sel = filterInput.value === val ? ' selected' : '';
            return '<option value="' + escapeHtml(val) + '"' + sel + '>' + escapeHtml(lbl) + '</option>';
          }).join('');
          filterMarkup =
            '<label class="tc-lbl">Value</label>' +
            '<select class="tc-filter-val">' + opts + '</select>';
        } else {
          filterMarkup =
            '<label class="tc-lbl">Operator</label>' +
            '<select class="tc-filter-op">' +
              '<option value="contains">Contains</option>' +
              '<option value="equals">Equals</option>' +
              '<option value="starts">Starts with</option>' +
              '<option value="ends">Ends with</option>' +
              '<option value="empty">Is empty</option>' +
              '<option value="notempty">Is not empty</option>' +
            '</select>' +
            '<label class="tc-lbl">Value</label>' +
            '<input type="text" class="tc-filter-val" placeholder="Filter value" value="' + escapeHtml(filterInput ? (filterInput.value || '') : '') + '" />';
        }

        menu.innerHTML =
          '<div class="tc-section" role="group" aria-label="Sort">' +
            '<button type="button" class="tc-item" data-sort="asc"><span class="tc-item-icon" aria-hidden="true">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7-7 7 7"/></svg>' +
            '</span>Sort by ASC</button>' +
            '<button type="button" class="tc-item" data-sort="desc"><span class="tc-item-icon" aria-hidden="true">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7 7 7-7"/></svg>' +
            '</span>Sort by DESC</button>' +
            '<button type="button" class="tc-item" data-sort="none"><span class="tc-item-icon" aria-hidden="true">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 10l5-5 5 5M7 14l5 5 5-5"/></svg>' +
            '</span>Unsort</button>' +
          '</div>' +
          '<div class="tc-divider" role="separator"></div>' +
          (filterInput
            ? '<div class="tc-section" role="group" aria-label="Filter"><div class="tc-heading">Filter by ' + escapeHtml(label) + '</div>' + filterMarkup + '<button type="button" class="tc-clear">Clear</button></div><div class="tc-divider" role="separator"></div>'
            : '') +
          '<div class="tc-section">' +
            '<button type="button" class="tc-item" data-hide><span class="tc-item-icon" aria-hidden="true">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10 10 0 0112 20c-7 0-11-8-11-8a19 19 0 015.06-5.94M9.9 4.24A10 10 0 0112 4c7 0 11 8 11 8a19 19 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>' +
            '</span>Hide column</button>' +
          '</div>';
        menuBtn.insertAdjacentElement('afterend', menu);

        // --- Wire sort actions to the existing sort button (drives the same state)
        menu.querySelectorAll('[data-sort]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var dir = btn.getAttribute('data-sort');
            applySortDirection(sortBtn, dir);
            closeMenu();
          });
        });

        // --- Wire filter (operator + value) to the underlying col filter input
        if (filterInput) {
          var opSel = menu.querySelector('.tc-filter-op');
          var valEl = menu.querySelector('.tc-filter-val');
          var clearBtn = menu.querySelector('.tc-clear');

          function syncOperator() {
            if (!opSel) return;
            var op = opSel.value;
            filterInput.setAttribute('data-filter-op', op);
            if (op === 'empty' || op === 'notempty') {
              valEl.disabled = true;
              filterInput.value = '__' + op + '__';
            } else {
              valEl.disabled = false;
              filterInput.value = valEl.value || '';
            }
            filterInput.dispatchEvent(new Event('input', { bubbles: true }));
            filterInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          function syncValue() {
            if (isSelect) {
              filterInput.value = valEl.value;
            } else {
              var op = opSel ? opSel.value : 'contains';
              filterInput.setAttribute('data-filter-op', op);
              if (op !== 'empty' && op !== 'notempty') {
                filterInput.value = valEl.value;
              }
            }
            filterInput.dispatchEvent(new Event('input', { bubbles: true }));
            filterInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
          if (opSel) opSel.addEventListener('change', syncOperator);
          valEl.addEventListener('input', syncValue);
          valEl.addEventListener('change', syncValue);
          if (clearBtn) clearBtn.addEventListener('click', function () {
            if (opSel) { opSel.value = 'contains'; filterInput.removeAttribute('data-filter-op'); }
            valEl.value = '';
            valEl.disabled = false;
            filterInput.value = '';
            filterInput.dispatchEvent(new Event('input', { bubbles: true }));
            filterInput.dispatchEvent(new Event('change', { bubbles: true }));
          });
          // Keep menu in sync when filter is cleared externally (e.g. chip X)
          filterInput.addEventListener('change', function () {
            if (!filterInput.value && valEl.value) {
              valEl.value = '';
              if (opSel) opSel.value = 'contains';
              valEl.disabled = false;
            } else if (isSelect && valEl.value !== filterInput.value) {
              valEl.value = filterInput.value;
            }
          });
        }

        // --- Hide column
        var hideItem = menu.querySelector('[data-hide]');
        if (hideItem) hideItem.addEventListener('click', function () {
          Array.from(table.rows).forEach(function (row) {
            var cell = row.cells[colIndex];
            if (cell) cell.style.display = 'none';
          });
          // Reflect in toolbar's Columns dropdown checkbox if present
          var cbox = wrap.querySelector('[data-col-toggle="' + colIndex + '"]');
          if (cbox) cbox.checked = false;
          closeMenu();
        });

        // --- Open / close plumbing
        function openMenu() {
          document.querySelectorAll('.th-col-menu').forEach(function (m) { if (m !== menu) m.hidden = true; });
          menu.hidden = false;
          menuBtn.setAttribute('aria-expanded', 'true');
        }
        function closeMenu() {
          menu.hidden = true;
          menuBtn.setAttribute('aria-expanded', 'false');
        }
        menuBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          menu.hidden ? openMenu() : closeMenu();
        });
        document.addEventListener('click', function (e) {
          if (menu.hidden) return;
          if (menu.contains(e.target) || e.target === menuBtn || menuBtn.contains(e.target)) return;
          closeMenu();
        });
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && !menu.hidden) closeMenu();
        });
      });
    });
  }
  // Drives the existing sort button to a specific direction from outside (column menu)
  function applySortDirection(sortBtn, dir) {
    // sortBtn's own click cycles through none→asc→desc; we need to force a specific direction.
    // The simplest approach: read current state via aria-sort and click until we hit dir.
    // Safer: dispatch to sortBtn while faking the desired state via class inspection.
    var current = sortBtn.getAttribute('aria-sort'); // 'none' | 'ascending' | 'descending'
    var currentDir = current === 'ascending' ? 'asc' : current === 'descending' ? 'desc' : 'none';
    if (currentDir === dir) return;
    // Determine number of clicks: cycle is none→asc→desc→none
    var order = ['none', 'asc', 'desc'];
    var from = order.indexOf(currentDir);
    var to = order.indexOf(dir);
    var clicks = (to - from + 3) % 3;
    for (var i = 0; i < clicks; i++) sortBtn.click();
  }

  // ---------- more filters toggle (advanced filter fields) ----------
  function initMoreFilters() {
    document.querySelectorAll('.db-more-toggle').forEach(function (btn) {
      var fieldset = btn.closest('.db-filters');
      if (!fieldset) return;
      var more = fieldset.querySelectorAll('.db-field-more');
      if (!more.length) return;

      function setOpen(open) {
        more.forEach(function (el) { el.hidden = !open; });
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = open ? '\u2212 Less' : '+ More';
      }
      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        setOpen(!isOpen);
      });
    });
  }

  // ---------- side pane (right drawer) ----------
  function openPane(pane) {
    pane.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var focusable = pane.querySelector('.sp-close');
    if (focusable) setTimeout(function () { try { focusable.focus(); } catch (e) {} }, 220);
  }
  function closePane(pane) {
    pane.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function initSidePanes() {
    document.querySelectorAll('[data-open-pane]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var paneId = trigger.getAttribute('data-open-pane');
        var pane = document.getElementById(paneId);
        if (pane) openPane(pane);
      });
    });
    document.querySelectorAll('.side-pane').forEach(function (pane) {
      pane.querySelectorAll('[data-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { closePane(pane); });
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.side-pane[aria-hidden="false"]').forEach(closePane);
    });
  }

  // ---------- widget click -> apply master-table filter + scroll ----------
  function initWidgetFilters() {
    document.querySelectorAll('[data-filter-col], [data-filter-cols]').forEach(function (el) {
      // Ignore the filter inputs themselves (they use data-col-filter, not data-filter-col)
      if (el.matches('[data-col-filter]')) return;

      var isNativeInteractive = el.tagName === 'A' || el.tagName === 'BUTTON';
      if (!isNativeInteractive) {
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
        if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
      }

      function activate(ev) {
        if (ev.type === 'keydown' && ev.key !== 'Enter' && ev.key !== ' ') return;
        // If clicking on a nested link/button that has its own action, respect it
        if (ev.target !== el && (ev.target.closest('[data-open-pane]') || ev.target.closest('button, a[href]:not([data-filter-col])'))) {
          return;
        }
        // If a nested [data-filter-col] descendant was clicked, let it handle the click and stop bubbling here
        var nested = ev.target.closest('[data-filter-col]');
        if (nested && nested !== el && el.contains(nested)) {
          return;
        }
        ev.preventDefault();
        ev.stopPropagation();

        // Collect all col/val pairs on this element (supports multi-filter via data-filter-cols/data-filter-vals)
        var pairs = [];
        var cols = (el.getAttribute('data-filter-cols') || el.getAttribute('data-filter-col') || '').split('|');
        var vals = (el.getAttribute('data-filter-vals') || el.getAttribute('data-filter-val') || '').split('|');
        cols.forEach(function (c, i) {
          if (!c) return;
          pairs.push({ col: c.trim(), val: (vals[i] || '').trim() });
        });

        // Close any open side pane so the master table is visible
        document.querySelectorAll('.side-pane[aria-hidden="false"]').forEach(closePane);

        // Locate the master case table (assumed id="case-table")
        var scope = document.getElementById('case-table');
        var filters = scope ? scope.querySelectorAll('[data-col-filter]') : document.querySelectorAll('[data-col-filter]');

        pairs.forEach(function (p) {
          var target = null;
          filters.forEach(function (f) {
            if (target) return;
            if (f.getAttribute('data-col-filter') === p.col) target = f;
          });
          if (!target) return;
          target.value = p.val;
          target.dispatchEvent(new Event('change', { bubbles: true }));
          target.dispatchEvent(new Event('input', { bubbles: true }));
        });

        if (scope) scope.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      el.addEventListener('click', activate);
      el.addEventListener('keydown', activate);
    });
  }

  // ---------- active filter chips (rendered above the master table) ----------
  // Reflects the current state of all [data-col-filter] controls as removable chips.
  function initActiveFilters() {
    document.querySelectorAll('.db-table-wrap').forEach(function (wrap) {
      var host = wrap.querySelector('.db-active-filters');
      if (!host) return;
      var chipsEl = host.querySelector('.af-chips');
      var clearBtn = host.querySelector('.af-clear');
      var filters = Array.from(wrap.querySelectorAll('[data-col-filter]'));
      if (!filters.length) return;

      // Cache column header labels (from the first non-filter header row)
      var headerLabels = {};
      var headerRow = wrap.querySelector('thead tr:first-child');
      if (headerRow) {
        Array.from(headerRow.children).forEach(function (th, i) {
          headerLabels[i] = (th.textContent || '').trim();
        });
      }

      function render() {
        chipsEl.innerHTML = '';
        var active = 0;
        filters.forEach(function (f) {
          var v = (f.value || '').trim();
          if (!v) return;
          active++;
          var col = f.getAttribute('data-col-filter');
          var label = headerLabels[col] || ('Col ' + col);
          var chip = document.createElement('span');
          chip.className = 'af-chip';
          chip.innerHTML =
            '<span class="af-col">' + escapeHtml(label) + ':</span> ' +
            '<span class="af-val">' + escapeHtml(v) + '</span> ' +
            '<button type="button" aria-label="Remove ' + escapeHtml(label) + ' filter">\u00d7</button>';
          chip.querySelector('button').addEventListener('click', function (e) {
            e.stopPropagation();
            f.value = '';
            f.dispatchEvent(new Event('change', { bubbles: true }));
            f.dispatchEvent(new Event('input', { bubbles: true }));
          });
          chipsEl.appendChild(chip);
        });
        host.hidden = active === 0;
      }

      filters.forEach(function (f) {
        f.addEventListener('change', render);
        f.addEventListener('input', render);
      });
      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          filters.forEach(function (f) {
            if (!f.value) return;
            f.value = '';
            f.dispatchEvent(new Event('change', { bubbles: true }));
          });
        });
      }
      render();
    });
  }

  // ---------- per-column table filters ----------
  // Wires up any table that has a <tr class="db-filter-row"> with [data-col-filter="N"] controls.
  // Filters are AND-combined; each control matches cell.textContent + any data-full attribute.
  function initTableFilters() {
    document.querySelectorAll('.db-table').forEach(function (table) {
      const filters = Array.from(table.querySelectorAll('.db-filter-row [data-col-filter]'));
      if (!filters.length) return;
      const tbody = table.querySelector('tbody');
      if (!tbody) return;

      function apply() {
        const active = filters.map(function (f) {
          return {
            col: +f.getAttribute('data-col-filter'),
            val: (f.value || '').trim().toLowerCase(),
            op: (f.getAttribute('data-filter-op') || 'contains').toLowerCase()
          };
        }).filter(function (a) { return a.val || a.op === 'empty' || a.op === 'notempty'; });

        Array.from(tbody.rows).forEach(function (row) {
          const match = active.every(function (a) {
            const cell = row.cells[a.col];
            if (!cell) return true;
            let haystack = cell.textContent.toLowerCase().trim();
            cell.querySelectorAll('[data-full]').forEach(function (n) {
              haystack += ' ' + (n.getAttribute('data-full') || '').toLowerCase();
            });
            switch (a.op) {
              case 'equals':   return haystack === a.val;
              case 'starts':   return haystack.indexOf(a.val) === 0;
              case 'ends':     return haystack.length >= a.val.length && haystack.lastIndexOf(a.val) === haystack.length - a.val.length;
              case 'empty':    return haystack === '' || haystack === '\u2014' || haystack === '-';
              case 'notempty': return !(haystack === '' || haystack === '\u2014' || haystack === '-');
              case 'contains':
              default:         return haystack.indexOf(a.val) !== -1;
            }
          });
          row.style.display = match ? '' : 'none';
        });
      }

      filters.forEach(function (f) {
        f.addEventListener('input', apply);
        f.addEventListener('change', apply);
        // stop clicks in the filter row from bubbling to any row-level handler on the table
        f.addEventListener('click', function (e) { e.stopPropagation(); });
      });
    });
  }

  // ---------- treemap hover tooltips ----------
  // Small tiles (rank-4/5) clip their name / percentage / stage-split via overflow:hidden.
  // A tooltip surfaces the full context on hover / focus without disturbing the layout.
  function initTreemapTips() {
    const cells = document.querySelectorAll('.tm-cell');
    cells.forEach(function (el) {
      const code = ((el.querySelector('.tm-code') || {}).textContent || '').trim();
      const name = ((el.querySelector('.tm-name') || {}).textContent || '').trim();
      const count = ((el.querySelector('.tm-count') || {}).textContent || '').trim();
      const rankTxt = ((el.querySelector('.tm-rank') || {}).textContent || '').trim();
      const pctTxt = ((el.querySelector('.tm-pct') || {}).textContent || '').trim();
      const splitMeta = el.querySelector('.tm-split-meta');
      const splitParts = splitMeta
        ? Array.from(splitMeta.children).map(function (n) { return n.textContent.trim(); })
        : [];

      const swatch = getComputedStyle(el).backgroundColor || '#3276CF';

      function enter(ev) {
        const metaBits = [];
        if (rankTxt) metaBits.push(escapeHtml(rankTxt));
        if (pctTxt && rankTxt.indexOf('%') === -1) metaBits.push(escapeHtml(pctTxt));
        const meta = metaBits.length
          ? '<div class="tt-label">' + metaBits.join(' \u00b7 ') + '</div>'
          : '';
        const split = splitParts.length
          ? '<div class="tt-label">' + splitParts.map(escapeHtml).join(' \u00b7 ') + '</div>'
          : '';
        const html =
          '<div class="tt-head"><span class="tt-swatch" style="background:' + swatch + '"></span>' +
          '<span class="tt-series">' + escapeHtml(code || 'Code') +
          (name ? ' \u00b7 ' + escapeHtml(name) : '') + '</span></div>' +
          '<div class="tt-value">' + escapeHtml(count) + ' <span class="tt-unit">cases</span></div>' +
          meta + split;
        showTip(html, ev);
      }
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mousemove', positionTip);
      el.addEventListener('mouseleave', hideTip);
      el.addEventListener('focus', function () {
        const rect = el.getBoundingClientRect();
        enter({ clientX: rect.left + rect.width / 2, clientY: rect.top });
      });
      el.addEventListener('blur', hideTip);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
