/* ============================================================
   SALES COACH — PROSPECTING ROUTE PLANNER (Phase 3)
   Leaflet + OpenStreetMap (no API key, $0).
   Features:
   - Live GPS Device Location & Preset Territory Hubs
   - Dynamic Prospect Database (Full Local CRUD)
   - CSV / JSON Territory Import & Export
   - Full-text Prospect Search & Segment Filtering
   - Touch-Safe Drag Reordering & Tactile ▲ / ▼ Controls
   - Per-Stop One-Tap Navigation ("Drive Here")
   - Hardened Multi-Stop Navigation (Google & Apple Maps)
   - Resilient LocalStorage State Persistence
   ============================================================ */

/* ---------- DEFAULT PROSPECT DATABASE (Addison County, VT) ---------- */
const DEFAULT_PROSPECTS = [
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

/* Territory hub presets for fast one-tap switching */
const PRESET_HUBS = [
  { name: "Middlebury, VT (Rte 7)", lat: 44.0153, lng: -73.1672 },
  { name: "Vergennes, VT (Main St)", lat: 44.1670, lng: -73.2540 },
  { name: "Rutland, VT (Rte 7 N)", lat: 43.6106, lng: -72.9726 },
  { name: "Burlington, VT (Shelburne Rd)", lat: 44.4759, lng: -73.2121 },
  { name: "Montpelier, VT (State St)", lat: 44.2601, lng: -72.5754 },
];

/* Segment filter definitions */
const ROUTE_SEGMENTS = [
  { id: "auto",       label: "Auto / Body",    icon: "🔧" },
  { id: "food",       label: "Food / Bev",     icon: "🥫" },
  { id: "facilities", label: "Facilities",     icon: "🏭" },
  { id: "schoolbus",  label: "School Bus",     icon: "🚌" },
  { id: "forklift",   label: "Ag / Equip",     icon: "🚜" },
  { id: "carwash",    label: "Carwash",        icon: "🚿" },
  { id: "precision",  label: "Precision Mfg",  icon: "⚙️" },
];

/* ---------- PERSISTENCE STORAGE KEYS ---------- */
const STORAGE_KEY_ROUTE = "sc_route_state_v1";
const STORAGE_KEY_PROSPECTS = "sc_prospects_v2";

/* Global in-memory route state */
const routeState = {
  map: null,
  layer: null,
  prospects: [],        // loaded dynamic prospects array
  selected: [],         // selected prospect ids
  segFilter: new Set(), // active segment filters (empty = all)
  searchQuery: "",      // active text search filter
  start: { lat: 44.0153, lng: -73.1672, name: "Middlebury, Rte 7", isGps: false },
  ordered: [],          // ordered prospect objects
  manualOrder: false,   // true if user reordered manually
  visited: [],          // prospect ids marked completed
  inited: false,
};

/* ---------- PROSPECT REPOSITORY (CRUD) ---------- */
function getProspects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROSPECTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Could not load stored prospects, falling back to defaults:", e);
  }
  saveProspects(DEFAULT_PROSPECTS);
  return DEFAULT_PROSPECTS.slice();
}

function saveProspects(list) {
  try {
    routeState.prospects = list;
    localStorage.setItem(STORAGE_KEY_PROSPECTS, JSON.stringify(list));
    updateProspectCountBadge();
  } catch (e) {
    console.warn("Could not save prospects:", e);
  }
}

function addProspect(item) {
  const list = getProspects();
  const id = "p_" + Date.now();
  let lat = Number(item.lat);
  let lng = Number(item.lng);
  
  if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
    lat = Number((routeState.start.lat + (Math.random() - 0.5) * 0.04).toFixed(4));
    lng = Number((routeState.start.lng + (Math.random() - 0.5) * 0.04).toFixed(4));
  }

  const newProspect = {
    id: id,
    name: (item.name || "Untitled Prospect").trim(),
    type: (item.type || "Commercial / Industrial").trim(),
    seg: item.seg || "auto",
    lat: lat,
    lng: lng,
    addr: (item.addr || "Local Territory").trim(),
    hot: (item.hot || "Opportunity identified").trim(),
  };

  list.unshift(newProspect);
  saveProspects(list);
  
  if (!routeState.selected.includes(id)) {
    routeState.selected.push(id);
    saveRouteState();
  }
  
  renderProspectList();
  rebuildRoute();
  setCoach('Added "' + newProspect.name + '" to your prospect directory and today\\'s route.');
  return newProspect;
}

function updateProspect(id, item) {
  const list = getProspects();
  const idx = list.findIndex(p => p.id === id);
  if (idx < 0) return null;

  let lat = Number(item.lat);
  let lng = Number(item.lng);
  if (isNaN(lat) || isNaN(lng)) {
    lat = list[idx].lat;
    lng = list[idx].lng;
  }

  list[idx] = {
    ...list[idx],
    name: (item.name || list[idx].name).trim(),
    type: (item.type || list[idx].type).trim(),
    seg: item.seg || list[idx].seg,
    lat: lat,
    lng: lng,
    addr: (item.addr || list[idx].addr).trim(),
    hot: (item.hot || list[idx].hot).trim(),
  };

  saveProspects(list);
  renderProspectList();
  rebuildRoute();
  setCoach('Updated "' + list[idx].name + '".');
  return list[idx];
}

function deleteProspect(id) {
  let list = getProspects();
  const target = list.find(p => p.id === id);
  const name = target ? target.name : "Prospect";
  list = list.filter(p => p.id !== id);
  saveProspects(list);

  routeState.selected = routeState.selected.filter(x => x !== id);
  routeState.visited = routeState.visited.filter(x => x !== id);
  saveRouteState();

  renderProspectList();
  rebuildRoute();
  setCoach('Removed "' + name + '" from territory.');
}

function resetProspectsToDefault() {
  saveProspects(DEFAULT_PROSPECTS);
  routeState.selected = ["p1", "p9", "p5", "p6"];
  routeState.visited = [];
  routeState.manualOrder = false;
  saveRouteState();
  renderProspectList();
  rebuildRoute();
  setCoach("Reset territory to default 22 Addison County prospects.");
}

function updateProspectCountBadge() {
  const badge = document.getElementById("prospectCount");
  if (badge) badge.textContent = routeState.prospects.length;
}

/* ---------- ROUTE STATE PERSISTENCE ---------- */
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
          .map(id => routeState.prospects.find(p => p.id === id))
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

/* ---------- LIVE GPS & START LOCATION MANAGEMENT ---------- */
function setStartLocation(loc, isGps = false) {
  routeState.start = {
    lat: Number(loc.lat),
    lng: Number(loc.lng),
    name: loc.name || "Custom Starting Point",
    isGps: isGps,
  };
  saveRouteState();
  renderStartLocationUI();
  rebuildRoute();
  setCoach(isGps ? "Acquired live GPS fix. Route recalculated from your truck." : 'Route start set to "' + routeState.start.name + '".');
}

function requestGpsLocation() {
  const btn = document.getElementById("btnUseGps");
  if (btn) {
    btn.classList.add("loading");
    btn.innerHTML = "<span>📡</span> Acquiring GPS satellites...";
  }

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser or device.");
    if (btn) {
      btn.classList.remove("loading");
      btn.innerHTML = "<span>📡</span> Use Current Device GPS";
    }
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = Number(pos.coords.latitude.toFixed(4));
      const lng = Number(pos.coords.longitude.toFixed(4));
      setStartLocation({ lat, lng, name: "Live GPS Location" }, true);
      if (btn) {
        btn.classList.remove("loading");
        btn.innerHTML = "<span>✓</span> GPS Acquired (" + lat + ", " + lng + ")";
      }
      setTimeout(() => closeModal("modalStartLoc"), 400);
    },
    (err) => {
      console.warn("GPS error:", err);
      alert("Unable to retrieve device location (" + err.message + "). Please select a preset hub or enter coordinates manually.");
      if (btn) {
        btn.classList.remove("loading");
        btn.innerHTML = "<span>📡</span> Use Current Device GPS";
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

function renderStartLocationUI() {
  const display = document.getElementById("routeStartDisplay");
  if (display) {
    display.textContent = routeState.start.name || (routeState.start.lat + ", " + routeState.start.lng);
  }
}

function renderPresetHubs() {
  const grid = document.getElementById("presetHubsGrid");
  if (!grid) return;
  grid.innerHTML = PRESET_HUBS.map(hub => `
    <button class="preset-hub-card" data-hub-name="${hub.name}" data-lat="${hub.lat}" data-lng="${hub.lng}">
      <span class="hub-icon">🏢</span>
      <span class="hub-name">${hub.name}</span>
    </button>
  `).join("");

  grid.querySelectorAll(".preset-hub-card").forEach(card => {
    card.onclick = () => {
      setStartLocation({
        name: card.dataset.hubName,
        lat: Number(card.dataset.lat),
        lng: Number(card.dataset.lng),
      }, false);
      closeModal("modalStartLoc");
    };
  });
}

/* ---------- CSV & JSON IMPORT / EXPORT ---------- */
function exportProspectsCSV() {
  const list = routeState.prospects;
  const headers = ["id", "name", "type", "seg", "lat", "lng", "addr", "hot"];
  const rows = list.map(p => [
    p.id,
    '"' + (p.name || "").replace(/"/g, '""') + '"',
    '"' + (p.type || "").replace(/"/g, '""') + '"',
    p.seg,
    p.lat,
    p.lng,
    '"' + (p.addr || "").replace(/"/g, '""') + '"',
    '"' + (p.hot || "").replace(/"/g, '""') + '"',
  ].join(","));
  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "sales_coach_prospects.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setCoach("Exported " + list.length + " prospects to CSV.");
}

function exportProspectsJSON() {
  const list = routeState.prospects;
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", "sales_coach_prospects.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setCoach("Exported " + list.length + " prospects to JSON.");
}

function handleFileImport(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    let imported = [];
    try {
      if (file.name.endsWith(".json")) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) imported = parsed;
      } else {
        const lines = text.split(/\\r\\n|\\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].match(/(".*?"|[^",\\s]+)(?=\\s*,|\\s*$)/g) || lines[i].split(",");
            if (parts && parts.length >= 7) {
              const clean = (s) => s ? s.replace(/^"|"$/g, "").trim() : "";
              imported.push({
                id: clean(parts[0]) || ("p_" + (Date.now() + i)),
                name: clean(parts[1]),
                type: clean(parts[2]),
                seg: clean(parts[3]) || "auto",
                lat: Number(clean(parts[4])) || (routeState.start.lat + (Math.random() - 0.5) * 0.04),
                lng: Number(clean(parts[5])) || (routeState.start.lng + (Math.random() - 0.5) * 0.04),
                addr: clean(parts[6]),
                hot: parts[7] ? clean(parts[7]) : "Prospect lead",
              });
            }
          }
        }
      }

      if (imported.length > 0) {
        saveProspects(imported);
        renderProspectList();
        rebuildRoute();
        closeModal("modalImportExport");
        setCoach("Successfully imported " + imported.length + " prospects into your territory.");
      } else {
        alert("Could not parse valid prospects from the file. Please check formatting.");
      }
    } catch (err) {
      console.error("Import error:", err);
      alert("Error parsing file: " + err.message);
    }
  };
  reader.readAsText(file);
}

/* ---------- LEAFLET ICONS ---------- */
function brandIcon(n, hot, visited) {
  const classes = ["route-pin"];
  if (hot) classes.push("hot");
  if (visited) classes.push("visited");
  return L.divIcon({
    className: classes.join(" "),
    html: '<div class="route-pin-inner">' + (visited ? "✓" : n) + "</div>",
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
  let list = routeState.prospects;
  if (routeState.segFilter.size > 0) {
    list = list.filter(p => routeState.segFilter.has(p.seg));
  }
  const q = (routeState.searchQuery || "").trim().toLowerCase();
  if (q) {
    list = list.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.addr && p.addr.toLowerCase().includes(q)) ||
      (p.type && p.type.toLowerCase().includes(q)) ||
      (p.hot && p.hot.toLowerCase().includes(q))
    );
  }
  return list;
}

function renderProspectList() {
  const out = $("#prospectList");
  if (!out) return;
  const list = visibleProspects();
  
  if (!list.length) {
    out.innerHTML = '<div class="empty">No prospects matching filter. Tap "➕ Add Prospect" to add one.</div>';
    return;
  }

  out.innerHTML = list.map(p => {
    const on = routeState.selected.includes(p.id);
    const isDone = routeState.visited.includes(p.id);
    const cardClasses = "prospect-card" + (on ? " added" : "") + (isDone ? " visited" : "");
    const checkText = isDone ? "✓" : (on ? "✓" : "+");
    const badgeHtml = isDone ? ' <span class="done-badge">Visited</span>' : '';
    return (
      '<div class="' + cardClasses + '" data-pid="' + p.id + '">' +
        '<button class="prospect-check" data-action="toggle-route" data-pid="' + p.id + '">' + checkText + '</button>' +
        '<div class="prospect-main" data-action="toggle-route" data-pid="' + p.id + '">' +
          '<span class="prospect-name">' + p.name + badgeHtml + '</span>' +
          '<span class="prospect-meta">' + p.type + ' · ' + p.addr + '</span>' +
          '<span class="prospect-hot">🔥 ' + p.hot + '</span>' +
        '</div>' +
        '<button class="prospect-edit-btn" data-action="edit-prospect" data-pid="' + p.id + '" title="Edit details">✎</button>' +
      '</div>'
    );
  }).join("");

  $$("#prospectList [data-action='toggle-route']").forEach(el => {
    el.onclick = (e) => {
      e.stopPropagation();
      const id = el.dataset.pid || el.closest(".prospect-card").dataset.pid;
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

  $$("#prospectList [data-action='edit-prospect']").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.pid;
      openAddProspectModal(id);
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
    .setView([routeState.start.lat, routeState.start.lng], 11);
  routeState.tiles = L.tileLayer(tileUrl(), {
    maxZoom: 20, subdomains: "abcd",
    attribution: '&copy; OpenStreetMap &copy; CARTO',
  }).addTo(routeState.map);
  routeState.tiles.on("load", () => { if (mapEl) mapEl.classList.remove("map-loading"); });
  setTimeout(() => { if (mapEl) mapEl.classList.remove("map-loading"); }, 2500);
  routeState.layer = L.layerGroup().addTo(routeState.map);
}

function refreshMapTheme() {
  if (!routeState.map || !routeState.tiles) return;
  routeState.tiles.setUrl(tileUrl());
}

function rebuildRoute() {
  ensureMap();
  routeState.layer.clearLayers();

  const chosen = routeState.prospects.filter(p => routeState.selected.includes(p.id));
  if (routeState.manualOrder) {
    const prevIds = routeState.ordered.map(p => p.id).filter(id => routeState.selected.includes(id));
    const newIds = routeState.selected.filter(id => !prevIds.includes(id));
    routeState.ordered = [...prevIds, ...newIds].map(id => routeState.prospects.find(p => p.id === id)).filter(Boolean);
  } else {
    routeState.ordered = optimizeRoute(chosen);
  }

  // start pin
  L.marker([routeState.start.lat, routeState.start.lng], { icon: startIcon() })
    .bindPopup('<b>' + routeState.start.name + '</b><br><i>Route Starting Hub</i>')
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

/* Move stop up or down in manual order */
function moveStop(index, delta) {
  const target = index + delta;
  if (target < 0 || target >= routeState.ordered.length) return;
  const arr = routeState.ordered.slice();
  const temp = arr[index];
  arr[index] = arr[target];
  arr[target] = temp;
  routeState.ordered = arr;
  routeState.manualOrder = true;
  saveRouteState();
  redrawFromOrdered();
}

/* Direct point-to-point navigation to a single stop */
function openSingleStopNav(id) {
  const p = routeState.prospects.find(x => x.id === id);
  if (!p) return;
  const isApple = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
  if (isApple) {
    const url = "https://maps.apple.com/?daddr=" + p.lat + "," + p.lng + "&q=" + encodeURIComponent(p.name) + "&dirflg=d";
    window.open(url, "_blank");
  } else {
    const url = "https://www.google.com/maps/dir/?api=1&destination=" + p.lat + "," + p.lng + "&travelmode=driving";
    window.open(url, "_blank");
  }
}

/* ---------- RENDER: SUMMARY + STOP LIST + HANDOFF ---------- */
function renderRouteSummary() {
  const out = $("#routeSummary");
  if (!out) return;
  const ord = routeState.ordered;
  if (!ord.length) {
    out.innerHTML = '<div class="empty">Pick prospects from the directory below to build your route. I\\'ll order them for the shortest drive and drop them on the map.</div>';
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
    const isFirst = i === 0;
    const isLast = i === ord.length - 1;

    return (
      '<li class="' + rowClass + '" draggable="true" data-idx="' + i + '" data-pid="' + p.id + '">' +
        '<button class="stop-check-btn" data-pid="' + p.id + '" title="Toggle completed" aria-label="Mark ' + p.name + ' as visited">' +
          '<span class="check-circle">' + checkContent + '</span>' +
        '</button>' +
        '<span class="stop-grip" aria-hidden="true" title="Drag to reorder">☰</span>' +
        '<span class="' + numClass + '">' + numContent + '</span>' +
        '<span class="stop-body">' +
          '<b>' + p.name + badgeHtml + '</b>' +
          '<span class="stop-sub">' + p.type + ' · ' + p.addr + '</span>' +
        '</span>' +
        '<div class="stop-actions-cell">' +
          '<button class="btn-stop-nav" data-pid="' + p.id + '" title="Drive directly to this stop">🚗 Nav</button>' +
          '<div class="stop-reorder-btns">' +
            '<button class="stop-reorder-btn btn-up" data-idx="' + i + '"' + (isFirst ? ' disabled style="opacity:0.25;"' : '') + ' title="Move Up">▲</button>' +
            '<button class="stop-reorder-btn btn-down" data-idx="' + i + '"' + (isLast ? ' disabled style="opacity:0.25;"' : '') + ' title="Move Down">▼</button>' +
          '</div>' +
        '</div>' +
      '</li>'
    );
  }).join("");

  const manual = routeState.manualOrder;
  const orderLabel = manual ? "Custom order" : "Optimized order";
  const orderActionHtml = manual
    ? '<button id="btnReopt" class="chip-mini">⚡ Re-optimize</button>'
    : '<span class="stop-head-hint">drag ☰ or tap ▲▼ · tap ○ to check off</span>';

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
      '<button id="btnGoogle" class="btn-route gmaps">🗺️ Route in Google Maps</button>' +
      '<button id="btnApple" class="btn-route amaps">🍎 Route in Apple Maps</button>' +
      '<button id="btnClearRoute" class="btn-ghost">Clear route</button>' +
    '</div>' +
    '<p class="route-foot">Tap <b>🚗 Nav</b> on any stop for immediate directions, or launch the full optimized route to your phone\\'s nav.</p>'
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

  // Check buttons
  $$("#stopList .stop-check-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const pid = btn.dataset.pid;
      toggleStopVisited(pid);
    };
  });

  // Direct Stop Nav buttons
  $$("#stopList .btn-stop-nav").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const pid = btn.dataset.pid;
      openSingleStopNav(pid);
    };
  });

  // Tactile Reorder buttons
  $$("#stopList .btn-up").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.idx);
      moveStop(idx, -1);
    };
  });
  $$("#stopList .btn-down").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.idx);
      moveStop(idx, 1);
    };
  });

  wireStopDragAndTouch();

  if (visitedCount === ord.length && ord.length > 0) {
    setCoach('All ' + ord.length + ' stops logged today. Great drive — lock down the follow-ups.');
  } else {
    setCoach(manual
      ? 'Your call — ' + visitedCount + '/' + ord.length + ' stops done (' + miles + ' mi in your order). Hit "Route in Google Maps" or "🚗 Nav" on a stop.'
      : 'Route locked: ' + visitedCount + '/' + ord.length + ' stops done (' + miles + ' mi). Ready to drive.');
  }
}

/* ---------- DRAG & TOUCH REORDERING ---------- */
function wireStopDragAndTouch() {
  const list = $("#stopList");
  if (!list) return;
  let dragIdx = null;

  // HTML5 Drag
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

  // Mobile Touch Reordering on the grip handle
  let touchStartIdx = null;
  let touchRow = null;

  $$(".stop-grip", list).forEach(grip => {
    grip.addEventListener("touchstart", (e) => {
      touchRow = grip.closest(".stop-row");
      if (!touchRow) return;
      touchStartIdx = +touchRow.dataset.idx;
      touchRow.classList.add("touch-dragging");
    }, { passive: true });

    grip.addEventListener("touchmove", (e) => {
      if (touchStartIdx === null) return;
      const touch = e.touches[0];
      const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
      const overRow = targetEl ? targetEl.closest(".stop-row") : null;
      $$(".stop-row", list).forEach(r => r.classList.remove("drop-above", "drop-below"));
      if (overRow && overRow !== touchRow) {
        const rect = overRow.getBoundingClientRect();
        const below = (touch.clientY - rect.top) > rect.height / 2;
        overRow.classList.add(below ? "drop-below" : "drop-above");
      }
    }, { passive: true });

    grip.addEventListener("touchend", (e) => {
      if (touchStartIdx === null || !touchRow) return;
      touchRow.classList.remove("touch-dragging");
      const changedTouch = e.changedTouches[0];
      const targetEl = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
      const overRow = targetEl ? targetEl.closest(".stop-row") : null;
      $$(".stop-row", list).forEach(r => r.classList.remove("drop-above", "drop-below"));
      
      if (overRow && overRow !== touchRow) {
        const from = touchStartIdx;
        let to = +overRow.dataset.idx;
        const rect = overRow.getBoundingClientRect();
        const below = (changedTouch.clientY - rect.top) > rect.height / 2;
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
      }
      touchStartIdx = null;
      touchRow = null;
    });
  });
}

function redrawFromOrdered() {
  ensureMap();
  routeState.layer.clearLayers();
  L.marker([routeState.start.lat, routeState.start.lng], { icon: startIcon() })
    .bindPopup('<b>' + routeState.start.name + '</b><br><i>Route Starting Hub</i>').addTo(routeState.layer);
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

/* ---------- MULTI-STOP MAPS HAND-OFF ---------- */
function openInGoogleMaps() {
  const ord = routeState.ordered;
  if (!ord.length) return;
  const origin = routeState.start.lat + "," + routeState.start.lng;
  const dest = ord[ord.length - 1].lat + "," + ord[ord.length - 1].lng;
  
  // Google Maps supports up to 9 intermediate waypoints in URL
  let waypointsList = ord.slice(0, -1);
  if (waypointsList.length > 9) {
    alert("Notice: Google Maps allows up to 9 intermediate waypoints via link. The first 9 stops will be routed.");
    waypointsList = waypointsList.slice(0, 9);
  }
  const waypoints = waypointsList.map(p => p.lat + "," + p.lng).join("|");
  let url = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + dest + "&travelmode=driving";
  if (waypoints) url += "&waypoints=" + encodeURIComponent(waypoints);
  window.open(url, "_blank");
}

function openInAppleMaps() {
  const ord = routeState.ordered;
  if (!ord.length) return;
  const saddr = routeState.start.lat + "," + routeState.start.lng;
  const daddr = ord.map(p => p.lat + "," + p.lng).join(" to: ");
  window.open("https://maps.apple.com/?saddr=" + saddr + "&daddr=" + daddr + "&dirflg=d", "_blank");
}

/* ---------- MODAL CONTROLLERS ---------- */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "flex";
    document.body.classList.add("modal-open");
  }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}

function openAddProspectModal(editId = null) {
  const title = document.getElementById("modalProspectTitle");
  const form = document.getElementById("formAddProspect");
  const btnDel = document.getElementById("btnDeleteProspect");
  const inputId = document.getElementById("inputProspectId");
  const inputName = document.getElementById("inputProspectName");
  const inputType = document.getElementById("inputProspectType");
  const selectSeg = document.getElementById("selectProspectSeg");
  const inputAddr = document.getElementById("inputProspectAddr");
  const inputLat = document.getElementById("inputProspectLat");
  const inputLng = document.getElementById("inputProspectLng");
  const inputHot = document.getElementById("inputProspectHot");

  if (!form) return;
  form.reset();

  if (editId) {
    const existing = routeState.prospects.find(p => p.id === editId);
    if (existing) {
      if (title) title.textContent = "✎ Edit Prospect";
      inputId.value = existing.id;
      inputName.value = existing.name;
      inputType.value = existing.type;
      selectSeg.value = existing.seg;
      inputAddr.value = existing.addr;
      inputLat.value = existing.lat;
      inputLng.value = existing.lng;
      inputHot.value = existing.hot;
      if (btnDel) {
        btnDel.style.display = "inline-block";
        btnDel.onclick = () => {
          if (confirm('Delete "' + existing.name + '" from your territory directory?')) {
            deleteProspect(existing.id);
            closeModal("modalAddProspect");
          }
        };
      }
    }
  } else {
    if (title) title.textContent = "➕ Add New Prospect";
    inputId.value = "";
    if (btnDel) btnDel.style.display = "none";
  }

  openModal("modalAddProspect");
}

function initRouteModals() {
  $$("[data-close-modal]").forEach(btn => {
    btn.onclick = () => closeModal(btn.dataset.closeModal);
  });
  $$(".modal-backdrop").forEach(backdrop => {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) closeModal(backdrop.id);
    };
  });

  const btnOpenStart = document.getElementById("btnOpenStartModal");
  if (btnOpenStart) btnOpenStart.onclick = () => {
    renderPresetHubs();
    openModal("modalStartLoc");
  };

  const btnGps = document.getElementById("btnUseGps");
  if (btnGps) btnGps.onclick = requestGpsLocation;

  const btnSaveCustomStart = document.getElementById("btnSaveCustomStart");
  if (btnSaveCustomStart) {
    btnSaveCustomStart.onclick = () => {
      const name = ($("#inputCustomStartName").value || "Custom Hub").trim();
      const lat = Number($("#inputCustomStartLat").value);
      const lng = Number($("#inputCustomStartLng").value);
      if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
        alert("Please enter valid numeric latitude and longitude coordinates.");
        return;
      }
      setStartLocation({ name, lat, lng }, false);
      closeModal("modalStartLoc");
    };
  }

  const btnOpenAdd = document.getElementById("btnOpenAddProspect");
  if (btnOpenAdd) btnOpenAdd.onclick = () => openAddProspectModal(null);

  const formAdd = document.getElementById("formAddProspect");
  if (formAdd) {
    formAdd.onsubmit = (e) => {
      e.preventDefault();
      const editId = $("#inputProspectId").value;
      const data = {
        name: $("#inputProspectName").value,
        type: $("#inputProspectType").value,
        seg: $("#selectProspectSeg").value,
        addr: $("#inputProspectAddr").value,
        lat: $("#inputProspectLat").value,
        lng: $("#inputProspectLng").value,
        hot: $("#inputProspectHot").value,
      };

      if (editId) {
        updateProspect(editId, data);
      } else {
        addProspect(data);
      }
      closeModal("modalAddProspect");
    };
  }

  const btnOpenIE = document.getElementById("btnOpenImportExport");
  if (btnOpenIE) btnOpenIE.onclick = () => openModal("modalImportExport");

  const btnExpCSV = document.getElementById("btnExportCSV");
  if (btnExpCSV) btnExpCSV.onclick = exportProspectsCSV;

  const btnExpJSON = document.getElementById("btnExportJSON");
  if (btnExpJSON) btnExpJSON.onclick = exportProspectsJSON;

  const importInput = document.getElementById("importFileInput");
  if (importInput) {
    importInput.onchange = (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileImport(e.target.files[0]);
      }
    };
  }

  const btnReset = document.getElementById("btnResetProspects");
  if (btnReset) {
    btnReset.onclick = () => {
      if (confirm("Reset your directory to default 22 Addison County prospects? Any custom additions will be cleared.")) {
        resetProspectsToDefault();
        closeModal("modalImportExport");
      }
    };
  }

  const searchInput = document.getElementById("routeSearch");
  if (searchInput) {
    searchInput.oninput = (e) => {
      routeState.searchQuery = e.target.value;
      renderProspectList();
    };
  }
}

/* ---------- INIT ROUTE VIEW ---------- */
function initRoute() {
  if (routeState.inited) {
    setTimeout(() => routeState.map && routeState.map.invalidateSize(), 60);
    return;
  }
  routeState.inited = true;

  routeState.prospects = getProspects();
  updateProspectCountBadge();

  const hasSaved = loadRouteState();
  if (!hasSaved) {
    routeState.selected = ["p1", "p9", "p5", "p6"];
    routeState.visited = [];
    routeState.manualOrder = false;
  }

  renderStartLocationUI();
  renderRouteSegments();
  renderProspectList();
  initRouteModals();
  ensureMap();
  rebuildRoute();
  setTimeout(() => routeState.map && routeState.map.invalidateSize(), 80);
}
