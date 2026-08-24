/* ============================================================
   SALES COACH — PROSPECTING ROUTE PLANNER
   Leaflet + OpenStreetMap (no API key, $0). Visual prospecting
   route for the rep: drop prospect pins, auto-optimize the
   driving order, then hand off to Google/Apple Maps for real
   turn-by-turn nav.
   Includes local state persistence & visited stop tracking.
   ============================================================ */

/* ---------- PROSPECT DATABASE (Addison County, VT) ----------
   Real business *types* and plausible local clusters around
   Middlebury / Vergennes / Bristol. Coordinates are real-area
   lat/lng so the map + routing demo cold. Tagged to the same
   customer segments the rest of the app already uses.        */
const PROSPECTS = [
  { id: "p1",  name: "Foster Motors (Service Bay)",   type: "Auto / Dealership",   seg: "auto",       lat: 44.0153, lng: -73.1672, addr: "Rte 7 S, Middlebury, VT",      hot: "Brake cleaner + shop towels burn fast here" },
  { id: "p2",  name: "Champlain Valley Equipment",     type: "Ag / Heavy Equip",    seg: "forklift",   lat: 44.1670, lng: -73.2540, addr: "Rte 7, Vergennes, VT",         hot: "Hydraulics, grease, cutting fluids" },
  { id: "p3",  name: "G. Stone Motors",                type: "Auto / Dealership",   seg: "auto",       lat: 44.1610, lng: -73.2490, addr: "Rte 7, Vergennes, VT",         hot: "Multi-bay — bulk chemicals + fasteners" },
  { id: "p4",  name: "Vermont Hard Cider (Facilities)",type: "Food / Beverage",     seg: "food",       lat: 44.1735, lng: -73.2120, addr: "Middlebury, VT",               hot: "Food-grade lube (H1), SS fasteners, PPE" },
  { id: "p5",  name: "ACSU Bus Garage",                type: "Fleet / School Bus",  seg: "schoolbus",  lat: 44.0205, lng: -73.1740, addr: "Charles Ave, Middlebury, VT",  hot: "Fleet PM — DEF-safe degreaser, wipes" },
  { id: "p6",  name: "Vermont Soap",                   type: "Mfg / Facilities",    seg: "facilities", lat: 44.0120, lng: -73.1620, addr: "Exchange St, Middlebury, VT",  hot: "Janitorial, washroom, maintenance chem" },
  { id: "p7",  name: "Maple Landmark (Wood Mfg)",      type: "Mfg / Precision",     seg: "precision",  lat: 44.0185, lng: -73.1585, addr: "Exchange St, Middlebury, VT",  hot: "Dust, fasteners, adhesives, blades" },
  { id: "p8",  name: "Bristol Collision",              type: "Auto / Body Shop",    seg: "auto",       lat: 44.1340, lng: -73.0790, addr: "Bristol, VT",                  hot: "Body filler, abrasives, masking, PPE" },
  { id: "p9",  name: "Addison County Carwash",         type: "Carwash",             seg: "carwash",    lat: 44.0090, lng: -73.1690, addr: "Court St, Middlebury, VT",     hot: "Foaming presoak, brushes, wheel cleaner" },
  { id: "p10", name: "Porter Medical (Plant Ops)",     type: "Healthcare / Facil.", seg: "facilities", lat: 44.0070, lng: -73.1755, addr: "South St, Middlebury, VT",     hot: "Maintenance, electrical, lockout, wipes" },
  { id: "p11", name: "Otter Creek Brewing",            type: "Food / Beverage",     seg: "food",       lat: 44.0140, lng: -73.1710, addr: "Exchange St, Middlebury, VT",  hot: "Food-grade, SS fasteners, hose clamps" },
  { id: "p12", name: "Vergennes Auto",                 type: "Auto / Service",      seg: "auto",       lat: 44.1665, lng: -73.2560, addr: "Main St, Vergennes, VT",       hot: "Penetrant, brake clean, zip ties" },
  { id: "p13", name: "Middlebury College (Facilities)",type: "Institution / Facil.", seg: "facilities", lat: 44.0080, lng: -73.1770, addr: "College St, Middlebury, VT",   hot: "Big campus PM — janitorial, electrical, HVAC" },
  { id: "p14", name: "Casella Waste (Yard)",            type: "Fleet / Waste",        seg: "schoolbus",  lat: 44.0240, lng: -73.1490, addr: "Middlebury, VT",               hot: "Heavy fleet — hydraulics, DEF, heavy degreaser" },
  { id: "p15", name: "Bristol Electronics",             type: "Mfg / Precision",      seg: "precision",  lat: 44.1330, lng: -73.0810, addr: "Bristol, VT",                  hot: "Solar installs — fasteners, sealants, PPE" },
  { id: "p16", name: "Champlain Orchards (Equip)",      type: "Ag / Equip",           seg: "forklift",   lat: 44.0790, lng: -73.2710, addr: "Shoreham, VT",                hot: "Tractors, sprayers — grease, hydraulics, filters" },
  { id: "p17", name: "Vergennes Car Wash",              type: "Carwash",              seg: "carwash",    lat: 44.1690, lng: -73.2530, addr: "Vergennes, VT",               hot: "Presoak, foaming detergent, spot-free" },
  { id: "p18", name: "Otter Valley Auto Body",          type: "Auto / Body Shop",     seg: "auto",       lat: 43.8990, lng: -73.1640, addr: "Brandon, VT",                 hot: "Filler, primer, abrasives, masking" },
  { id: "p19", name: "Mack Molding (Plant)",            type: "Mfg / Precision",      seg: "precision",  lat: 43.8870, lng: -73.1490, addr: "Brandon, VT",                 hot: "Injection molding — cutting fluid, fasteners, lockout" },
  { id: "p20", name: "Rosie's Restaurant (Kitchen)",    type: "Food / Beverage",      seg: "food",       lat: 44.0030, lng: -73.1660, addr: "Rte 7, Middlebury, VT",       hot: "Food-grade lube, SS hardware, drain maint." },
  { id: "p21", name: "Addison Central School (Maint.)", type: "Institution / Facil.", seg: "facilities", lat: 44.0420, lng: -73.1830, addr: "Middlebury, VT",               hot: "Custodial, HVAC filters, electrical, PPE" },
  { id: "p22", name: "Vermont Field Sports (Fleet)",    type: "Fleet / Service",      seg: "schoolbus",  lat: 44.0190, lng: -73.1620, addr: "Rte 7, Middlebury, VT",       hot: "Service fleet — brake clean, penetrant, wipes" },
];

/* Segment chips for filtering — derived, labeled, with icons */
const ROUTE_SEGMENTS = [
  { id: "auto",       label: "Auto / Body",    icon: "🔧" },
  { id: "food",       label: "Food / Bev",     icon: "🥫" },
  { id: "facilities", label: "Facilities",     icon: "🏭" },
  { id: "schoolbus",  label: "School Bus",     icon: "🚌" },
  { id: "forklift",   label: "Ag / Equip",     icon: "🚜" },
  { id: "carwash",    label: "Carwash",        icon: "🚿" },
  { id: "precision",  label: "Precision Mfg",  icon: "⚙️" },
];

/* ---------- STATE & PERSISTENCE ---------- */
const STORAGE_KEY_ROUTE = "sc_route_state_v1";

const routeState = {
  map: null,
  layer: null,          // marker + line layer group
  selected: [],         // prospect ids in the route
  segFilter: new Set(), // active segment filters (empty = all)
  start: { lat: 44.0153, lng: -73.1672, name: "Start (Middlebury, Rte 7)" },
  ordered: [],          // route prospect objects (optimized OR manual)
  manualOrder: false,   // true once the rep drags to reorder
  visited: [],          // prospect ids marked as completed/visited
  inited: false,
};

function saveRouteState() {
  try {
    const data = {
      selected: routeState.selected,
      orderedIds: routeState.ordered.map(p => p.id),
      manualOrder: routeState.manualOrder,
      visited: routeState.visited,
      segFilter: Array.from(routeState.segFilter),
      start: routeState.start,
    };
    localStorage.setItem(STORAGE_KEY_ROUTE, JSON.stringify(data));
  } catch (e) {
    console.warn("Could not save route state:", e);
  }
}

function loadRouteState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ROUTE);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data && Array.isArray(data.selected)) {
      routeState.selected = data.selected;
      routeState.visited = Array.isArray(data.visited) ? data.visited : [];
      routeState.manualOrder = !!data.manualOrder;
      if (Array.isArray(data.segFilter)) {
        routeState.segFilter = new Set(data.segFilter);
      }
      if (data.start && typeof data.start.lat === "number") {
        routeState.start = data.start;
      }
      if (data.manualOrder && Array.isArray(data.orderedIds)) {
        routeState.ordered = data.orderedIds
          .map(id => PROSPECTS.find(p => p.id === id))
          .filter(Boolean);
      }
      return true;
    }
  } catch (e) {
    console.warn("Could not load route state:", e);
  }
  return false;
}

/* ---------- GEO HELPERS ---------- */
function haversine(a, b) {
  const R = 3958.8; // miles
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const la1 = a.lat * Math.PI / 180, la2 = b.lat * Math.PI / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* Nearest-neighbor route from the start point — simple, fast */
function optimizeRoute(stops) {
  if (!stops.length) return [];
  const remaining = stops.slice();
  const route = [];
  let cur = routeState.start;
  while (remaining.length) {
    let bi = 0, bd = Infinity;
    remaining.forEach((s, i) => { const d = haversine(cur, s); if (d < bd) { bd = d; bi = i; } });
    const next = remaining.splice(bi, 1)[0];
    route.push(next);
    cur = next;
  }
  return route;
}

function routeDistance(ordered) {
  if (!ordered.length) return 0;
  let total = haversine(routeState.start, ordered[0]);
  for (let i = 0; i < ordered.length - 1; i++) total += haversine(ordered[i], ordered[i + 1]);
  return total;
}

/* ---------- LEAFLET ICONS ---------- */
function brandIcon(n, hot, visited) {
  const classes = ["route-pin"];
  if (hot) classes.push("hot");
  if (visited) classes.push("visited");
  return L.divIcon({
    className: classes.join(" "),
    html: '<div class="route-pin-inner">' + (visited ? '✓' : n) + '</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}
function startIcon() {
  return L.divIcon({
    className: "route-pin start",
    html: '<div class="route-pin-inner">★</div>',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

/* ---------- RENDER: SEGMENT FILTER CHIPS ---------- */
function renderRouteSegments() {
  const wrap = $("#routeSegments");
  if (!wrap) return;
  wrap.innerHTML = "";
  const all = document.createElement("button");
  all.className = "chip" + (routeState.segFilter.size === 0 ? " selected" : "");
  all.innerHTML = "<span>📍</span>All";
  all.onclick = () => {
    routeState.segFilter.clear();
    saveRouteState();
    renderRouteSegments();
    renderProspectList();
  };
  wrap.appendChild(all);
  ROUTE_SEGMENTS.forEach(s => {
    const chip = document.createElement("button");
    chip.className = "chip" + (routeState.segFilter.has(s.id) ? " selected" : "");
    chip.innerHTML = "<span>" + s.icon + "</span>" + s.label;
    chip.onclick = () => {
      if (routeState.segFilter.has(s.id)) routeState.segFilter.delete(s.id);
      else routeState.segFilter.add(s.id);
      saveRouteState();
      renderRouteSegments();
      renderProspectList();
    };
    wrap.appendChild(chip);
  });
}

/* ---------- RENDER: PROSPECT PICK LIST ---------- */
function visibleProspects() {
  if (routeState.segFilter.size === 0) return PROSPECTS;
  return PROSPECTS.filter(p => routeState.segFilter.has(p.seg));
}
function renderProspectList() {
  const out = $("#prospectList");
  if (!out) return;
  const list = visibleProspects();
  out.innerHTML = list.map(p => {
    const on = routeState.selected.includes(p.id);
    const isDone = routeState.visited.includes(p.id);
    const cardClasses = "prospect-card" + (on ? " added" : "") + (isDone ? " visited" : "");
    const checkText = isDone ? "✓" : (on ? "✓" : "+");
    const badgeHtml = isDone ? ' <span class="done-badge">Visited</span>' : '';
    return (
      '<button class="' + cardClasses + '" data-pid="' + p.id + '">' +
        '<span class="prospect-check">' + checkText + '</span>' +
        '<span class="prospect-main">' +
          '<span class="prospect-name">' + p.name + badgeHtml + '</span>' +
          '<span class="prospect-meta">' + p.type + ' · ' + p.addr + '</span>' +
          '<span class="prospect-hot">🔥 ' + p.hot + '</span>' +
        '</span>' +
      '</button>'
    );
  }).join("");
  $$("#prospectList .prospect-card").forEach(b => {
    b.onclick = () => {
      const id = b.dataset.pid;
      const i = routeState.selected.indexOf(id);
      if (i >= 0) {
        routeState.selected.splice(i, 1);
        const vi = routeState.visited.indexOf(id);
        if (vi >= 0) routeState.visited.splice(vi, 1);
      } else {
        routeState.selected.push(id);
      }
      saveRouteState();
      renderProspectList();
      rebuildRoute();
    };
  });
}

/* ---------- RENDER: MAP + ROUTE LINE ---------- */
function tileUrl() {
  const dark = document.body.classList.contains("dark");
  return dark
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
}
function ensureMap() {
  if (routeState.map) return;
  const mapEl = document.getElementById("routeMap");
  if (mapEl) mapEl.classList.add("map-loading");
  routeState.map = L.map("routeMap", { zoomControl: true, attributionControl: true })
    .setView([44.06, -73.18], 11);
  routeState.tiles = L.tileLayer(tileUrl(), {
    maxZoom: 20, subdomains: "abcd",
    attribution: '&copy; OpenStreetMap &copy; CARTO',
  }).addTo(routeState.map);
  routeState.tiles.on("load", () => { if (mapEl) mapEl.classList.remove("map-loading"); });
  setTimeout(() => { if (mapEl) mapEl.classList.remove("map-loading"); }, 2500);
  routeState.layer = L.layerGroup().addTo(routeState.map);
}

/* Swap basemap when theme changes */
function refreshMapTheme() {
  if (!routeState.map || !routeState.tiles) return;
  routeState.tiles.setUrl(tileUrl());
}

function rebuildRoute() {
  ensureMap();
  routeState.layer.clearLayers();

  const chosen = PROSPECTS.filter(p => routeState.selected.includes(p.id));
  if (routeState.manualOrder) {
    const prevIds = routeState.ordered.map(p => p.id).filter(id => routeState.selected.includes(id));
    const newIds = routeState.selected.filter(id => !prevIds.includes(id));
    routeState.ordered = [...prevIds, ...newIds].map(id => PROSPECTS.find(p => p.id === id));
  } else {
    routeState.ordered = optimizeRoute(chosen);
  }

  // start pin
  L.marker([routeState.start.lat, routeState.start.lng], { icon: startIcon() })
    .bindPopup('<b>' + routeState.start.name + '</b>')
    .addTo(routeState.layer);

  // ordered prospect pins
  routeState.ordered.forEach((p, i) => {
    const isVisited = routeState.visited.includes(p.id);
    L.marker([p.lat, p.lng], { icon: brandIcon(i + 1, true, isVisited) })
      .bindPopup('<b>' + (i + 1) + '. ' + p.name + '</b>' + (isVisited ? ' (Visited)' : '') + '<br>' + p.type + '<br><i>' + p.hot + '</i>')
      .addTo(routeState.layer);
  });

  // route polyline
  if (routeState.ordered.length) {
    const pts = [[routeState.start.lat, routeState.start.lng],
                 ...routeState.ordered.map(p => [p.lat, p.lng])];
    L.polyline(pts, { color: "#d50000", weight: 4, opacity: 0.85, dashArray: "1 8", lineCap: "round" }).addTo(routeState.layer);
    routeState.map.fitBounds(L.latLngBounds(pts).pad(0.25));
  }

  saveRouteState();
  renderRouteSummary();
}

/* ---------- TOGGLE VISITED STATUS ---------- */
function toggleStopVisited(id) {
  const idx = routeState.visited.indexOf(id);
  if (idx >= 0) {
    routeState.visited.splice(idx, 1);
  } else {
    routeState.visited.push(id);
  }
  saveRouteState();
  renderProspectList();
  redrawFromOrdered();
}

/* ---------- RENDER: SUMMARY + STOP LIST + HANDOFF ---------- */
function renderRouteSummary() {
  const out = $("#routeSummary");
  if (!out) return;
  const ord = routeState.ordered;
  if (!ord.length) {
    out.innerHTML = '<div class="empty">Pick prospects above to build your route. I\\'ll order them for the shortest drive and drop them on the map.</div>';
    setCoach("Stack your day: tap the shops you're hitting, I'll plan the drive.");
    return;
  }
  const miles = routeDistance(ord).toFixed(1);
  const driveMin = Math.round((routeDistance(ord) / 35) * 60);
  const visitedCount = ord.filter(p => routeState.visited.includes(p.id)).length;

  const stops = ord.map((p, i) => {
    const isDone = routeState.visited.includes(p.id);
    const rowClass = "stop-row" + (isDone ? " is-visited" : "");
    const numClass = "stop-num" + (isDone ? " visited" : "");
    const numContent = isDone ? "✓" : String(i + 1);
    const badgeHtml = isDone ? ' <span class="done-badge">Visited</span>' : '';
    const checkContent = isDone ? "✓" : "";
    return (
      '<li class="' + rowClass + '" draggable="true" data-idx="' + i + '" data-pid="' + p.id + '">' +
        '<button class="stop-check-btn" data-pid="' + p.id + '" title="Toggle completed" aria-label="Mark ' + p.name + ' as visited">' +
          '<span class="check-circle">' + checkContent + '</span>' +
        '</button>' +
        '<span class="stop-grip" aria-hidden="true">☰</span>' +
        '<span class="' + numClass + '">' + numContent + '</span>' +
        '<span class="stop-body">' +
          '<b>' + p.name + badgeHtml + '</b>' +
          '<span class="stop-sub">' + p.type + ' · ' + p.addr + '</span>' +
        '</span>' +
      '</li>'
    );
  }).join("");

  const manual = routeState.manualOrder;
  const orderLabel = manual ? "Custom order" : "Optimized order";
  const orderActionHtml = manual
    ? '<button id="btnReopt" class="chip-mini">⚡ Re-optimize</button>'
    : '<span class="stop-head-hint">drag ☰ to reorder · tap ○ to check off</span>';

  out.innerHTML = (
    '<div class="route-stat-row">' +
      '<div class="route-stat"><span class="rs-num">' + visitedCount + '/' + ord.length + '</span><span class="rs-lab">completed</span></div>' +
      '<div class="route-stat"><span class="rs-num">' + miles + '</span><span class="rs-lab">miles</span></div>' +
      '<div class="route-stat"><span class="rs-num">' + driveMin + '</span><span class="rs-lab">min drive</span></div>' +
    '</div>' +
    '<div class="stop-head">' +
      '<span class="stop-head-label">' + orderLabel + '</span>' +
      orderActionHtml +
    '</div>' +
    '<ol class="stop-list" id="stopList">' + stops + '</ol>' +
    '<div class="route-actions">' +
      '<button id="btnGoogle" class="btn-route gmaps">🗺️ Open in Google Maps</button>' +
      '<button id="btnApple" class="btn-route amaps">🍎 Open in Apple Maps</button>' +
      '<button id="btnClearRoute" class="btn-ghost">Clear route</button>' +
    '</div>' +
    '<p class="route-foot">Plan in-app → hand the optimized route to your phone\\'s nav for live turn-by-turn. Add these stops to wherever you\\'re already driving today.</p>'
  );

  $("#btnGoogle").onclick = openInGoogleMaps;
  $("#btnApple").onclick = openInAppleMaps;
  $("#btnClearRoute").onclick = () => {
    routeState.selected = [];
    routeState.ordered = [];
    routeState.visited = [];
    routeState.manualOrder = false;
    saveRouteState();
    renderProspectList();
    rebuildRoute();
  };
  const reopt = $("#btnReopt");
  if (reopt) {
    reopt.onclick = () => {
      routeState.manualOrder = false;
      rebuildRoute();
      saveRouteState();
      setCoach("Snapped back to the shortest drive. ⚡");
    };
  }

  $$("#stopList .stop-check-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const pid = btn.dataset.pid;
      toggleStopVisited(pid);
    };
  });

  wireStopDrag();

  if (visitedCount === ord.length && ord.length > 0) {
    setCoach('All ' + ord.length + ' stops logged today. Great drive — lock down the follow-ups.');
  } else {
    setCoach(manual
      ? 'Your call — ' + visitedCount + '/' + ord.length + ' stops done (' + miles + ' mi in your order). Hit "Open in Google Maps" and roll.'
      : 'Route locked: ' + visitedCount + '/' + ord.length + ' stops done (' + miles + ' mi). Hit "Open in Google Maps" and roll.');
  }
}

/* ---------- DRAG-TO-REORDER STOPS ---------- */
function wireStopDrag() {
  const list = $("#stopList");
  if (!list) return;
  let dragIdx = null;

  $$(".stop-row", list).forEach(row => {
    row.addEventListener("dragstart", (e) => {
      dragIdx = +row.dataset.idx;
      row.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", String(dragIdx)); } catch (err) {}
    });
    row.addEventListener("dragend", () => {
      row.classList.remove("dragging");
      $$(".stop-row", list).forEach(r => r.classList.remove("drop-above", "drop-below"));
    });
    row.addEventListener("dragover", (e) => {
      e.preventDefault();
      const over = +row.dataset.idx;
      if (over === dragIdx) return;
      const rect = row.getBoundingClientRect();
      const below = (e.clientY - rect.top) > rect.height / 2;
      $$(".stop-row", list).forEach(r => r.classList.remove("drop-above", "drop-below"));
      row.classList.add(below ? "drop-below" : "drop-above");
    });
    row.addEventListener("drop", (e) => {
      e.preventDefault();
      const from = dragIdx;
      let to = +row.dataset.idx;
      if (from === null || from === to) return;
      const rect = row.getBoundingClientRect();
      const below = (e.clientY - rect.top) > rect.height / 2;
      const arr = routeState.ordered.slice();
      const [moved] = arr.splice(from, 1);
      if (from < to) to -= 1;
      if (below) to += 1;
      to = Math.max(0, Math.min(arr.length, to));
      arr.splice(to, 0, moved);
      routeState.ordered = arr;
      routeState.manualOrder = true;
      saveRouteState();
      redrawFromOrdered();
    });
  });
}

/* Redraw map + summary from the current ordered[] */
function redrawFromOrdered() {
  ensureMap();
  routeState.layer.clearLayers();
  L.marker([routeState.start.lat, routeState.start.lng], { icon: startIcon() })
    .bindPopup('<b>' + routeState.start.name + '</b>').addTo(routeState.layer);
  routeState.ordered.forEach((p, i) => {
    const isVisited = routeState.visited.includes(p.id);
    L.marker([p.lat, p.lng], { icon: brandIcon(i + 1, true, isVisited) })
      .bindPopup('<b>' + (i + 1) + '. ' + p.name + '</b>' + (isVisited ? ' (Visited)' : '') + '<br>' + p.type + '<br><i>' + p.hot + '</i>')
      .addTo(routeState.layer);
  });
  if (routeState.ordered.length) {
    const pts = [[routeState.start.lat, routeState.start.lng],
                 ...routeState.ordered.map(p => [p.lat, p.lng])];
    L.polyline(pts, { color: "#d50000", weight: 4, opacity: 0.85, dashArray: "1 8", lineCap: "round" }).addTo(routeState.layer);
    routeState.map.fitBounds(L.latLngBounds(pts).pad(0.25));
  }
  renderRouteSummary();
}

/* ---------- MAPS HAND-OFF ---------- */
function openInGoogleMaps() {
  const ord = routeState.ordered;
  if (!ord.length) return;
  const origin = routeState.start.lat + ',' + routeState.start.lng;
  const dest = ord[ord.length - 1].lat + ',' + ord[ord.length - 1].lng;
  const waypoints = ord.slice(0, -1).map(p => p.lat + ',' + p.lng).join("|");
  let url = 'https://www.google.com/maps/dir/?api=1&origin=' + origin + '&destination=' + dest + '&travelmode=driving';
  if (waypoints) url += '&waypoints=' + encodeURIComponent(waypoints);
  window.open(url, "_blank");
}
function openInAppleMaps() {
  const ord = routeState.ordered;
  if (!ord.length) return;
  const saddr = routeState.start.lat + ',' + routeState.start.lng;
  const daddr = ord.map(p => p.lat + ',' + p.lng).join(" to: ");
  window.open('https://maps.apple.com/?saddr=' + saddr + '&daddr=' + daddr + '&dirflg=d', "_blank");
}

/* ---------- INIT (lazy — only when the view is opened) ---------- */
function initRoute() {
  if (routeState.inited) { setTimeout(() => routeState.map && routeState.map.invalidateSize(), 60); return; }
  routeState.inited = true;

  const hasSaved = loadRouteState();
  if (!hasSaved) {
    // Default seed for first-time user
    routeState.selected = ["p1", "p9", "p5", "p6"];
    routeState.visited = [];
    routeState.manualOrder = false;
  }

  renderRouteSegments();
  renderProspectList();
  ensureMap();
  rebuildRoute();
  setTimeout(() => routeState.map && routeState.map.invalidateSize(), 80);
}
