/* =========================================================================
   ReDry national footprint map. Renders a pre-projected (Albers-USA) US map
   from redry-map-data.json — coordinates are baked at build time with d3-geo,
   so no mapping library is needed at runtime. City + state only; no addresses.
   ========================================================================= */
(function () {
  'use strict';
  const mount = document.getElementById('reDryMap');
  if (!mount) return;

  const SVGNS = 'http://www.w3.org/2000/svg';
  const STATUS = {
    installed: { label: 'Installed', cls: 'installed' },
    bid: { label: 'Bid / scanned', cls: 'bid' },
  };

  fetch('redry-map-data.json')
    .then((r) => { if (!r.ok) throw new Error('map data ' + r.status); return r.json(); })
    .then((data) => render(data))
    .catch((err) => {
      mount.innerHTML = '<p class="map-fallback">Map unavailable. ReDry has been bid or installed across TX, LA, FL, GA, IA, NE, MN, IL, WI, AR, OK, and HI.</p>';
      console.error(err);
    });

  function el(name, attrs) {
    const n = document.createElementNS(SVGNS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function render(data) {
    const svg = el('svg', {
      viewBox: '0 0 ' + data.width + ' ' + data.height,
      class: 'us-map', role: 'img',
      'aria-label': 'Map of U.S. cities and states where ReDry has been bid or installed',
    });

    // States
    const gStates = el('g', { class: 'states' });
    for (const s of data.states) {
      gStates.appendChild(el('path', {
        d: s.d, class: 'state' + (s.active ? ' active' : ''),
      }));
    }
    svg.appendChild(gStates);

    // Markers
    const gMarks = el('g', { class: 'marks' });
    const tooltip = document.getElementById('reDryMapTip');
    data.cities
      .slice()
      .sort((a, b) => a.y - b.y) // paint north-to-south so southern pins sit on top
      .forEach((c) => {
        const st = STATUS[c.status] || STATUS.bid;
        const g = el('g', { class: 'mk mk-' + st.cls, tabindex: '0',
          'aria-label': c.name + ' — ' + st.label });
        g.appendChild(el('circle', { class: 'halo', cx: c.x, cy: c.y, r: 11 }));
        g.appendChild(el('circle', { class: 'dot', cx: c.x, cy: c.y, r: 5.5 }));
        const title = el('title', {});
        title.textContent = c.name + ' — ' + st.label;
        g.appendChild(title);

        const show = (ev) => {
          if (!tooltip) return;
          tooltip.innerHTML = '<b>' + c.name + '</b><span class="tip-' + st.cls + '">' + st.label + '</span>';
          tooltip.classList.add('on');
          const box = mount.getBoundingClientRect();
          const px = (c.x / data.width) * box.width;
          const py = (c.y / data.height) * box.height;
          tooltip.style.left = px + 'px';
          tooltip.style.top = py + 'px';
        };
        const hide = () => tooltip && tooltip.classList.remove('on');
        g.addEventListener('mouseenter', show);
        g.addEventListener('mousemove', show);
        g.addEventListener('mouseleave', hide);
        g.addEventListener('focus', show);
        g.addEventListener('blur', hide);
        gMarks.appendChild(g);
      });
    svg.appendChild(gMarks);
    mount.appendChild(svg);

    // Counts + location list
    const installed = data.cities.filter((c) => c.status === 'installed');
    const bid = data.cities.filter((c) => c.status === 'bid');
    const countEl = document.getElementById('reDryMapCounts');
    if (countEl) {
      countEl.innerHTML =
        '<span class="lg lg-installed"><b>' + installed.length + '</b> Installed / drying</span>' +
        '<span class="lg lg-bid"><b>' + bid.length + '</b> Bid / scanned</span>' +
        '<span class="lg lg-total"><b>' + new Set(data.cities.map(statePart)).size + '</b> states</span>';
    }
    const listEl = document.getElementById('reDryMapList');
    if (listEl) {
      const chip = (c) => {
        const st = STATUS[c.status] || STATUS.bid;
        return '<span class="loc-chip loc-' + st.cls + '">' + c.name + '</span>';
      };
      listEl.innerHTML =
        '<div class="loc-group"><h4>Installed &amp; drying</h4><div class="loc-chips">' +
        installed.map(chip).join('') + '</div></div>' +
        '<div class="loc-group"><h4>Bid &amp; scanned</h4><div class="loc-chips">' +
        bid.map(chip).join('') + '</div></div>';
    }
  }

  function statePart(c) {
    return c.name.includes(',') ? c.name.split(',')[1].trim() : c.name;
  }
})();
