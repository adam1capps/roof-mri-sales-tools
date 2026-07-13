/* =========================================================================
   ReDry national footprint map. Renders a pre-projected (Albers-USA) US map
   from redry-map-data.json, coordinates are baked at build time with d3-geo,
   so no mapping library is needed at runtime. City + state only; no addresses.
   Two marker types: redry (orange) and mri (green = Roof MRI reports).
   Small dots, high volume, the count is the story.
   ========================================================================= */
(function () {
  'use strict';
  const mount = document.getElementById('reDryMap');
  if (!mount) return;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const TYPES = {
    redry: { label: 'ReDry, installed & bid', cls: 'redry' },
    mri: { label: 'Roof MRI report', cls: 'mri' },
  };

  fetch('redry-map-data.json')
    .then((r) => { if (!r.ok) throw new Error('map data ' + r.status); return r.json(); })
    .then(render)
    .catch((err) => {
      mount.innerHTML = '<p class="map-fallback">Map unavailable, ReDry and Roof MRI are active across 30+ states.</p>';
      console.error(err);
    });

  function el(name, attrs) {
    const n = document.createElementNS(SVGNS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function render(data) {
    const svg = el('svg', {
      viewBox: '0 0 ' + data.width + ' ' + data.height, class: 'us-map', role: 'img',
      'aria-label': 'Map of U.S. cities where ReDry and Roof MRI have worked',
    });

    const gStates = el('g', { class: 'states' });
    for (const s of data.states) {
      gStates.appendChild(el('path', { d: s.d, class: 'state' + (s.active ? ' active' : '') }));
    }
    svg.appendChild(gStates);

    // Markers, green painted under orange (data is ordered mri-then-redry).
    const gMarks = el('g', { class: 'marks' });
    for (const c of data.cities) {
      const t = TYPES[c.type] || TYPES.redry;
      const dot = el('circle', {
        class: 'dot mk-' + t.cls, cx: c.x, cy: c.y, r: 3.1,
        'data-label': c.label, 'data-type': t.label, tabindex: '0',
        role: 'img', 'aria-label': c.label + ', ' + t.label,
      });
      gMarks.appendChild(dot);
    }
    svg.appendChild(gMarks);
    mount.appendChild(svg);

    // One delegated tooltip handler for all dots (fast at hundreds of markers).
    const tip = document.getElementById('reDryMapTip');
    function show(e) {
      const d = e.target;
      if (!d.classList || !d.classList.contains('dot') || !tip) return;
      const cls = d.classList.contains('mk-mri') ? 'mri' : 'redry';
      tip.innerHTML = '<b>' + d.getAttribute('data-label') + '</b><span class="tip-' + cls + '">' + d.getAttribute('data-type') + '</span>';
      tip.classList.add('on');
      const box = mount.getBoundingClientRect();
      tip.style.left = ((+d.getAttribute('cx') / data.width) * box.width) + 'px';
      tip.style.top = ((+d.getAttribute('cy') / data.height) * box.height) + 'px';
      d.classList.add('hot');
    }
    function hide(e) { if (e.target.classList) e.target.classList.remove('hot'); tip && tip.classList.remove('on'); }
    gMarks.addEventListener('mouseover', show);
    gMarks.addEventListener('mouseout', hide);
    gMarks.addEventListener('focusin', show);
    gMarks.addEventListener('focusout', hide);

    // Counts, lead with volume (true totals from data.counts when present).
    const cc = data.counts || {};
    const redry = cc.redry != null ? cc.redry : data.cities.filter((c) => c.type === 'redry').length;
    const mriReports = cc.mriReports != null ? cc.mriReports : data.cities.filter((c) => c.type === 'mri').length;
    const states = cc.states != null ? cc.states : new Set(data.cities.map((c) => c.label.split(',').pop().trim())).size;
    const counts = document.getElementById('reDryMapCounts');
    if (counts) {
      const item = (n, label, cls) => '<span class="lg lg-' + cls + '"><b>' + n + '</b>' + label + '</span>';
      counts.innerHTML =
        (mriReports ? item(mriReports, 'Roof MRI reports', 'mri') : '') +
        item(redry, 'ReDry sites', 'redry') +
        item(states, 'states', 'total');
    }

    // Compact breadth line, the states, not a 700-item city list.
    const list = document.getElementById('reDryMapList');
    if (list) {
      const abbr = [...new Set(data.cities.map((c) => c.label.split(',').pop().trim()))].sort();
      list.innerHTML = '<div class="loc-group"><h4>Active in ' + abbr.length + ' states</h4><div class="loc-chips">' +
        abbr.map((s) => '<span class="loc-chip">' + s + '</span>').join('') + '</div></div>';
    }
  }
})();
