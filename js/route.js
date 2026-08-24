/* ============================================================
   SALES COACH — SENIOR-FRIENDLY PROSPECTING ROUTE PLANNER
   Zero-Emoji, High-Contrast, Paper-and-Pencil Architecture.
   ============================================================ */

/* ---------- DEFAULT PROSPECT DATABASE (Addison County, VT) ---------- */
const DEFAULT_PROSPECTS = [
  { id: "p1",  name: "Foster Motors (Service Bay)",   type: "Auto / Dealership",   seg: "auto",       lat: 44.0153, lng: -73.1672, addr: "Rte 7 S, Middlebury, VT",      phone: "(802) 388-9961", hot: "Brake cleaner and shop towels burn fast here" },
  { id: "p2",  name: "Champlain Valley Equipment",     type: "Ag / Heavy Equip",    seg: "forklift",   lat: 44.1670, lng: -73.2540, addr: "Rte 7, Vergennes, VT",         phone: "(802) 877-3118", hot: "Hydraulics, grease, cutting fluids" },
  { id: "p3",  name: "G. Stone Motors",                type: "Auto / Dealership",   seg: "auto",       lat: 44.1610, lng: -73.2490, addr: "Rte 7, Vergennes, VT",         phone: "(802) 877-3600", hot: "Multi-bay — bulk chemicals and fasteners" },
  { id: "p4",  name: "Vermont Hard Cider (Facilities)",type: "Food / Beverage",     seg: "food",       lat: 44.1735, lng: -73.2120, addr: "Middlebury, VT",               phone: "(802) 388-0700", hot: "Food-grade lube (H1), SS fasteners, PPE" },
  { id: "p5",  name: "ACSU Bus Garage",                type: "Fleet / School Bus",  seg: "schoolbus",  lat: 44.0205, lng: -73.1740, addr: "Charles Ave, Middlebury, VT",  phone: "(802) 382-1274", hot: "Fleet PM — DEF-safe degreaser, wipes" },
  { id: "p6",  name: "Vermont Soap",                   type: "Mfg / Facilities",    seg: "facilities", lat: 44.0120, lng: -73.1620, addr: "Exchange St, Middlebury, VT",  phone: "(802) 388-4308", hot: "Janitorial, washroom, maintenance chem" },
  { id: "p7",  name: "Maple Landmark (Wood Mfg)",      type: "Mfg / Precision",     seg: "precision",  lat: 44.0185, lng: -73.1585, addr: "Exchange St, Middlebury, VT",  phone: "(802) 388-0627", hot: "Dust, fasteners, adhesives, blades" },
  { id: "p8",  name: "Bristol Collision",              type: "Auto / Body Shop",    seg: "auto",       lat: 44.1340, lng: -73.0790, addr: "Bristol, VT",                  phone: "(802) 453-2396", hot: "Body filler, abrasives, masking, PPE" },
  { id: "p9",  name: "Addison County Carwash",         type: "Carwash",             seg: "carwash",    lat: 44.0090, lng: -73.1690, addr: "Court St, Middlebury, VT",     phone: "(802) 388-6622", hot: "Foaming presoak, brushes, wheel cleaner" },
  { id: "p10", name: "Porter Medical (Plant Ops)",     type: "Healthcare / Facil.", seg: "facilities", lat: 44.0070, lng: -73.1755, addr: "South St, Middlebury, VT",     phone: "(802) 388-4701", hot: "Maintenance, electrical, lockout, wipes" },
  { id: "p11", name: "Otter Creek Brewing",            type: "Food / Beverage",     seg: "food",       lat: 44.0140, lng: -73.1710, addr: "Exchange St, Middlebury, VT",  phone: "(802) 388-1062", hot: "Food-grade, SS fasteners, hose clamps" },
  { id: "p12", name: "Vergennes Auto",                 type: "Auto / Service",      seg: "auto",       lat: 44.1665, lng: -73.2560, addr: "Main St, Vergennes, VT",       phone: "(802) 877-2244", hot: "Penetrant, brake clean, zip ties" },
  { id: "p13", name: "Middlebury College (Facilities)",type: "Institution / Facil.", seg: "facilities", lat: 44.0080, lng: -73.1770, addr: "College St, Middlebury, VT",   phone: "(802) 443-5000", hot: "Big campus PM — janitorial, electrical, HVAC" },
  { id: "p14", name: "Casella Waste (Yard)",            type: "Fleet / Waste",        seg: "schoolbus",  lat: 44.0240, lng: -73.1490, addr: "Middlebury, VT",               phone: "(802) 388-4690", hot: "Heavy fleet — hydraulics, DEF, heavy degreaser" },
  { id: "p15", name: "Bristol Electronics",             type: "Mfg / Precision",      seg: "precision",  lat: 44.1330, lng: -73.0810, addr: "Bristol, VT",                  phone: "(802) 453-4884", hot: "Solar installs — fasteners, sealants, PPE" },
  { id: "p16", name: "Champlain Orchards (Equip)",      type: "Ag / Equip",           seg: "forklift",   lat: 44.0790, lng: -73.2710, addr: "Shoreham, VT",                phone: "(802) 897-2777", hot: "Tractors, sprayers — grease, hydraulics, filters" },
  { id: "p17", name: "Vergennes Car Wash",              type: "Carwash",              seg: "carwash",    lat: 44.1690, lng: -73.2530, addr: "Vergennes, VT",               phone: "(802) 877-9911", hot: "Presoak, foaming detergent, spot-free" },
  { id: "p18", name: "Otter Valley Auto Body",          type: "Auto / Body Shop",     seg: "auto",       lat: 43.8990, lng: -73.1640, addr: "Brandon, VT",                 phone: "(802) 247-3000", hot: "Filler, primer, abrasives, masking" },
  { id: "p19", name: "Mack Molding (Plant)",            type: "Mfg / Precision",      seg: "precision",  lat: 43.8870, lng: -73.1490, addr: "Brandon, VT",                 phone: "(802) 247-4000", hot: "Injection molding — cutting fluid, fasteners, lockout" },
  { id: "p20", name: "Rosie's Restaurant (Kitchen)",    type: "Food / Beverage",      seg: "food",       lat: 44.0030, lng: -73.1660, addr: "Rte 7, Middlebury, VT",       phone: "(802) 388-7052", hot: "Food-grade lube, SS hardware, drain maint." },
  { id: "p21", name: "Addison Central School (Maint.)", type: "Institution / Facil.", seg: "facilities", lat: 44.0420, lng: -73.1830, addr: "Middlebury, VT",               phone: "(802) 382-1200", hot: "Custodial, HVAC filters, electrical, PPE" },
  { id: "p22", name: "Vermont Field Sports (Fleet)",    type: "Fleet / Service",      seg: "schoolbus",  lat: 44.0190, lng: -73.1620, addr: "Rte 7, Middlebury, VT",       phone: "(802) 388-3572", hot: "Service fleet — brake clean, penetrant, wipes" },
];

/* Preset territory starting hubs */
const PRESET_HUBS = [
  { name: "Middlebury, VT (Route 7 Hub)", lat: 44.0153, lng: -73.1672 },
  { name: "Vergennes, VT (Main Street)", lat: 44.1670, lng: -73.2540 },
  { name: "Rutland, VT (Route 7 North)", lat: 43.6106, lng: -72.9726 },
  { name: "Burlington, VT (Shelburne Road)", lat: 44.4759, lng: -73.2121 },
  { name: "Montpelier, VT (State Street)", lat: 44.2601, lng: -72.5754 },
];

/* Customer segment classifications */
const ROUTE_SEGMENTS = [
  { id: "auto",       label: "Auto / Body Shop" },
  { id: "food",       label: "Food & Beverage" },
  { id: "facilities", label: "Plant Facilities" },
  { id: "schoolbus",  label: "School Bus & Fleet" },
  { id: "forklift",   label: "Ag & Heavy Equipment" },
  { id: "carwash",    label: "Car Wash Facilities" },
  { id: "precision",  label: "Precision Manufacturing" },
];

/* ---------- LOCAL PERSISTENCE STORAGE KEYS ---------- */
const STORAGE_KEY_ROUTE = "sc_route_state_v1";
const STORAGE_KEY_PROSPECTS = "sc_prospects_v2";
const STORAGE_KEY_NOTES = "sc_customer_notes_v1";

/* Global in-memory route state */
const routeState = {
  map: null,
  layer: null,
  prospects: [],
  selected: [],
  segFilter: new Set(),
  searchQuery: "",
  start: { lat: 44.0153, lng: -73.1672, name: "Middlebury, VT (Route 7 Hub)", isGps: false },
  ordered: [],
  manualOrder: false,
  visited: [],
  inited: false,
};

/* ---------- CUSTOMER NOTES & SCRATCHPAD ---------- */
function getAllCustomerNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function getCustomerNote(id) {
  const notes = getAllCustomerNotes();
  return notes[id] || { text: "", updated: "" };
}

function saveCustomerNote(id, text) {
  try {
    const notes = getAllCustomerNotes();
    const timeStr = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const stamp = "Saved: " + dateStr + " at " + timeStr;
    notes[id] = { text: text, updated: stamp };
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
    return stamp;
  } catch (e) {
    return "Saved locally";
  }
}

/* ---------- TOP STATUS BANNER WITH UNDO ---------- */
let toastTimer = null;
function showToast(message, undoAction = null) {
  const toast = document.getElementById("statusToast");
  const msgEl = document.getElementById("statusToastMsg");
  const undoBtn = document.getElementById("statusToastUndo");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (undoAction && undoBtn) {
    undoBtn.style.display = "inline-block";
    undoBtn.onclick = () => {
      undoAction();
      hideToast();
    };
  } else if (undoBtn) {
    undoBtn.style.display = "none";
  }

  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => hideToast(), 5500);
}

function hideToast() {
  const toast = document.getElementById("statusToast");
  if (toast) toast.classList.remove("visible");
}

/* ---------- PROSPECT REPOSITORY (CRUD) ---------- */
function getProspects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROSPECTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Could not load stored prospects:", e);
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
    name: (item.name || "Untitled Customer").trim(),
    type: (item.type || "Commercial / Industrial").trim(),
    seg: item.seg || "auto",
    lat: lat,
    lng: lng,
    addr: (item.addr || "Local Territory").trim(),
    phone: (item.phone || "(802) 555-0100").trim(),
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
  showToast('Customer added: "' + newProspect.name + '"', () => deleteProspect(id));
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
    phone: (item.phone || list[idx].phone || "").trim(),
    hot: (item.hot || list[idx].hot).trim(),
  };

  saveProspects(list);
  renderProspectList();
  rebuildRoute();
  showToast('Customer record updated: "' + list[idx].name + '"');
  return list[idx];
}

function deleteProspect(id) {
  let list = getProspects();
  const target = list.find(p => p.id === id);
  const prevList = list.slice();
  const name = target ? target.name : "Customer";
  list = list.filter(p => p.id !== id);
  saveProspects(list);

  routeState.selected = routeState.selected.filter(x => x !== id);
  routeState.visited = routeState.visited.filter(x => x !== id);
  saveRouteState();

  renderProspectList();
  rebuildRoute();
  showToast('Removed "' + name + '"', () => {
    saveProspects(prevList);
    renderProspectList();
    rebuildRoute();
  });
}

function resetProspectsToDefault() {
  saveProspects(DEFAULT_PROSPECTS);
  routeState.selected = ["p1", "p9", "p5", "p6"];
  routeState.visited = [];
  routeState.manualOrder = false;
  saveRouteState();
  renderProspectList();
  rebuildRoute();
  showToast("Reset customer list to default 22 territory accounts.");
}

function updateProspectCountBadge() {
  const badge = document.getElementById("prospectCount");
  if (badge) badge.textContent = routeState.prospects.length;
}

/* ---------- ROUTE PERSISTENCE ---------- */
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

/* ---------- START LOCATION & LIVE GPS ---------- */
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
  showToast(isGps ? "Acquired live GPS location from device" : 'Starting point set to: "' + routeState.start.name + '"');
}

function requestGpsLocation() {
  const btn = document.getElementById("btnUseGps");
  if (btn) {
    btn.classList.add("loading");
    btn.textContent = "Acquiring Device GPS...";
  }

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your device browser.");
    if (btn) {
      btn.classList.remove("loading");
      btn.textContent = "Use Current Device GPS";
    }
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = Number(pos.coords.latitude.toFixed(4));
      const lng = Number(pos.coords.longitude.toFixed(4));
      setStartLocation({ lat, lng, name: "Live GPS (Current Vehicle Location)" }, true);
      if (btn) {
        btn.classList.remove("loading");
        btn.textContent = "GPS Fixed (" + lat + ", " + lng + ")";
      }
      setTimeout(() => closeModal("modalStartLoc"), 400);
    },
    (err) => {
      console.warn("GPS error:", err);
      alert("Unable to acquire GPS coordinates (" + err.message + "). Please select a preset hub or enter coordinates.");
      if (btn) {
        btn.classList.remove("loading");
        btn.textContent = "Use Current Device GPS";
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
      <span class="hub-label">[HUB]</span>
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

/* ---------- CSV & JSON DATA IMPORT / EXPORT ---------- */

/* ---------- DAILY ACTIVITY & MILEAGE LOG EXPORT ---------- */
function exportDailyActivityLog() {
  const ord = routeState.ordered;
  if (!ord.length) {
    alert("No stops in today's route to export.");
    return;
  }
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
  const miles = routeDistance(ord).toFixed(1);
  const driveMin = Math.round((routeDistance(ord) / 35) * 60);
  const visitedCount = ord.filter(p => routeState.visited.includes(p.id)).length;

  const header = [
    "SALES COACH — DAILY ACTIVITY & MILEAGE REPORT",
    "Date," + dateStr,
    "Starting Location," + '"' + (routeState.start.name || "").replace(/"/g, '""') + '"',
    "Total Stops Planned," + ord.length,
    "Stops Completed," + visitedCount,
    "Total Route Miles," + miles + " miles",
    "Estimated Drive Time," + driveMin + " minutes",
    "",
    "Stop #,Company Name,Category,Street Address,Direct Phone,Visited (Yes/No),Opportunities,Rep Call Notes & Follow-ups",
  ];

  const rows = ord.map((p, i) => {
    const isDone = routeState.visited.includes(p.id) ? "YES" : "NO";
    const noteData = getCustomerNote(p.id);
    return [
      (i + 1),
      '"' + (p.name || "").replace(/"/g, '""') + '"',
      '"' + (p.type || "").replace(/"/g, '""') + '"',
      '"' + (p.addr || "").replace(/"/g, '""') + '"',
      '"' + (p.phone || "").replace(/"/g, '""') + '"',
      isDone,
      '"' + (p.hot || "").replace(/"/g, '""') + '"',
      '"' + (noteData.text || "").replace(/"/g, '""') + '"',
    ].join(",");
  });

  const csvContent = "data:text/csv;charset=utf-8," + [header.join("\n"), ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  const filename = "Daily_Sales_Log_" + new Date().toISOString().slice(0, 10) + ".csv";
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Exported daily mileage and activity log to CSV");
}

function exportProspectsCSV() {
  const list = routeState.prospects;
  const headers = ["id", "name", "type", "seg", "lat", "lng", "addr", "phone", "hot"];
  const rows = list.map(p => [
    p.id,
    '"' + (p.name || "").replace(/"/g, '""') + '"',
    '"' + (p.type || "").replace(/"/g, '""') + '"',
    p.seg,
    p.lat,
    p.lng,
    '"' + (p.addr || "").replace(/"/g, '""') + '"',
    '"' + (p.phone || "").replace(/"/g, '""') + '"',
    '"' + (p.hot || "").replace(/"/g, '""') + '"',
  ].join(","));
  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "sales_coach_prospects.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Exported " + list.length + " accounts to CSV");
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
  showToast("Exported " + list.length + " accounts to JSON");
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
        const lines = text.split(/\r\n|\n/).filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(",");
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
                phone: parts[7] ? clean(parts[7]) : "(802) 555-0100",
                hot: parts[8] ? clean(parts[8]) : "Account lead",
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
        showToast("Successfully imported " + imported.length + " accounts from file");
      } else {
        alert("Could not parse valid customer records from the file.");
      }
    } catch (err) {
      alert("Error parsing file: " + err.message);
    }
  };
  reader.readAsText(file);
}

/* ---------- LEAFLET ICONS (HIGH-CONTRAST MONOCHROME/RED) ---------- */
function brandIcon(n, hot, visited) {
  const classes = ["route-pin"];
  if (hot) classes.push("hot");
  if (visited) classes.push("visited");
  return L.divIcon({
    className: classes.join(" "),
    html: '<div class="route-pin-inner">' + (visited ? "DONE" : n) + "</div>",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}
function startIcon() {
  return L.divIcon({
    className: "route-pin start",
    html: '<div class="route-pin-inner">START</div>',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

/* ---------- RENDER: SEGMENT FILTER CHIPS ---------- */
function renderRouteSegments() {
  const wrap = $("#routeSegments");
  if (!wrap) return;
  wrap.innerHTML = "";
  const all = document.createElement("button");
  all.className = "chip" + (routeState.segFilter.size === 0 ? " selected" : "");
  all.textContent = "All Categories";
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
    chip.textContent = s.label;
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

/* ---------- RENDER: PROSPECT DIRECTORY & SCRATCHPAD ---------- */
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
      (p.phone && p.phone.toLowerCase().includes(q)) ||
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
    out.innerHTML = '<div class="empty">No accounts match this search filter. Tap "Add Customer" to add one.</div>';
    return;
  }

  out.innerHTML = list.map(p => {
    const on = routeState.selected.includes(p.id);
    const isDone = routeState.visited.includes(p.id);
    const cardClasses = "prospect-card" + (on ? " added" : "") + (isDone ? " visited" : "");
    const noteData = getCustomerNote(p.id);
    const phoneLink = p.phone ? `<a href="tel:${p.phone.replace(/[^0-9]/g, '')}" class="prospect-phone-link" title="Call ${p.name}">${p.phone}</a>` : "";

    return (
      '<div class="' + cardClasses + '" data-pid="' + p.id + '">' +
        '<div class="prospect-card-header">' +
          '<label class="prospect-checkbox-label">' +
            '<input type="checkbox" class="checkbox-large" data-action="toggle-route" data-pid="' + p.id + '"' + (on ? ' checked' : '') + ' />' +
            '<span class="checkbox-custom"></span>' +
            '<span class="prospect-name">' + p.name + '</span>' +
          '</label>' +
          (isDone ? '<span class="status-pill visited">[COMPLETED]</span>' : (on ? '<span class="status-pill on-route">[ON ROUTE]</span>' : '')) +
        '</div>' +
        '<div class="prospect-details-grid">' +
          '<div class="pd-row"><b>Category:</b> <span>' + p.type + '</span></div>' +
          '<div class="pd-row"><b>Address:</b> <span>' + p.addr + '</span></div>' +
          (p.phone ? '<div class="pd-row"><b>Direct Phone:</b> <span>' + phoneLink + '</span></div>' : '') +
          '<div class="pd-row"><b>Opportunities:</b> <span>' + p.hot + '</span></div>' +
        '</div>' +
        '<div class="customer-scratchpad">' +
          '<div class="scratchpad-header">' +
            '<label class="scratchpad-label">MY CALL NOTES & FOLLOW-UPS:</label>' +
            '<span class="scratchpad-status" id="noteStatus_' + p.id + '">' + (noteData.updated || "") + '</span>' +
          '</div>' +
          '<textarea class="scratchpad-textarea" data-pid="' + p.id + '" placeholder="Type call notes, decision maker names, or agreed next steps here...">' + (noteData.text || "") + '</textarea>' +
        '</div>' +
        '<div class="prospect-card-actions">' +
          '<button class="btn-table-action" data-action="drive-stop" data-pid="' + p.id + '">Drive to This Stop</button>' +
          '<button class="btn-table-action secondary" data-action="edit-prospect" data-pid="' + p.id + '">Edit Customer Record</button>' +
        '</div>' +
      '</div>'
    );
  }).join("");

  // Checkbox toggle handlers
  $$("#prospectList input[data-action='toggle-route']").forEach(cb => {
    cb.onchange = () => {
      const id = cb.dataset.pid;
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

  // Direct drive handlers
  $$("#prospectList [data-action='drive-stop']").forEach(btn => {
    btn.onclick = () => openSingleStopNav(btn.dataset.pid);
  });

  // Edit customer handlers
  $$("#prospectList [data-action='edit-prospect']").forEach(btn => {
    btn.onclick = () => openAddProspectModal(btn.dataset.pid);
  });

  // Auto-saving scratchpad notes
  $$("#prospectList .scratchpad-textarea").forEach(ta => {
    ta.oninput = () => {
      const pid = ta.dataset.pid;
      const stamp = saveCustomerNote(pid, ta.value);
      const statusEl = document.getElementById("noteStatus_" + pid);
      if (statusEl) statusEl.textContent = stamp;
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
      .bindPopup('<b>Stop ' + (i + 1) + ': ' + p.name + '</b>' + (isVisited ? ' [COMPLETED]' : '') + '<br>' + p.type + '<br><i>' + p.hot + '</i>')
      .addTo(routeState.layer);
  });

  // route polyline
  if (routeState.ordered.length) {
    const pts = [[routeState.start.lat, routeState.start.lng],
                 ...routeState.ordered.map(p => [p.lat, p.lng])];
    L.polyline(pts, { color: "#d50000", weight: 5, opacity: 0.9, lineCap: "round" }).addTo(routeState.layer);
    routeState.map.fitBounds(L.latLngBounds(pts).pad(0.25));
  }

  saveRouteState();
  renderRouteSummary();
}

function toggleStopVisited(id) {
  const idx = routeState.visited.indexOf(id);
  if (idx >= 0) {
    routeState.visited.splice(idx, 1);
    showToast("Marked stop as pending");
  } else {
    routeState.visited.push(id);
    showToast("Marked stop as completed", () => toggleStopVisited(id));
  }
  saveRouteState();
  renderProspectList();
  redrawFromOrdered();
}

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
  showToast("Reordered stop sequence");
}

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

/* ---------- RENDER: SUMMARY / RUN SHEET ---------- */
function renderRouteSummary() {
  const out = $("#routeSummary");
  if (!out) return;
  const ord = routeState.ordered;
  if (!ord.length) {
    out.innerHTML = '<div class="empty">No stops selected for today\'s route. Check off accounts from the directory below to build your driving sheet.</div>';
    return;
  }
  const miles = routeDistance(ord).toFixed(1);
  const driveMin = Math.round((routeDistance(ord) / 35) * 60);
  const visitedCount = ord.filter(p => routeState.visited.includes(p.id)).length;

  const stops = ord.map((p, i) => {
    const isDone = routeState.visited.includes(p.id);
    const rowClass = "stop-row" + (isDone ? " is-visited" : "");
    const noteData = getCustomerNote(p.id);
    const isFirst = i === 0;
    const isLast = i === ord.length - 1;

    return (
      '<li class="' + rowClass + '" data-idx="' + i + '" data-pid="' + p.id + '">' +
        '<div class="stop-row-top">' +
          '<label class="stop-checkbox-container">' +
            '<input type="checkbox" class="checkbox-large" data-action="toggle-visited" data-pid="' + p.id + '"' + (isDone ? ' checked' : '') + ' />' +
            '<span class="checkbox-custom"></span>' +
            '<span class="stop-num-badge">STOP ' + (i + 1) + ' OF ' + ord.length + '</span>' +
          '</label>' +
          '<div class="stop-nudge-btns">' +
            '<button class="btn-nudge btn-up" data-idx="' + i + '"' + (isFirst ? ' disabled' : '') + '>Move Up</button>' +
            '<button class="btn-nudge btn-down" data-idx="' + i + '"' + (isLast ? ' disabled' : '') + '>Move Down</button>' +
          '</div>' +
        '</div>' +
        '<div class="stop-row-main">' +
          '<div class="stop-title-row">' +
            '<h4 class="stop-name">' + p.name + '</h4>' +
            (isDone ? '<span class="status-pill visited">[VISITED]</span>' : '<span class="status-pill pending">[PENDING]</span>') +
          '</div>' +
          '<div class="stop-meta-line">' + p.type + ' &middot; ' + p.addr + '</div>' +
          (p.phone ? '<div class="stop-meta-line">Direct Phone: <a href="tel:' + p.phone.replace(/[^0-9]/g, '') + '" class="phone-link">' + p.phone + '</a></div>' : '') +
          '<div class="stop-hot-line"><b>Opportunity:</b> ' + p.hot + '</div>' +
          (noteData.text ? '<div class="stop-note-preview"><b>My Notes:</b> ' + noteData.text + '</div>' : '') +
        '</div>' +
        '<div class="stop-row-actions">' +
          '<button class="btn-action-drive" data-pid="' + p.id + '">Drive to Stop ' + (i + 1) + '</button>' +
        '</div>' +
      '</li>'
    );
  }).join("");

  const manual = routeState.manualOrder;
  const orderLabel = manual ? "Custom Rep Sequence" : "Auto-Optimized Driving Order";

  out.innerHTML = (
    '<div class="route-stat-box">' +
      '<div class="route-stat-item"><span class="rs-label">Progress:</span><span class="rs-val">' + visitedCount + ' of ' + ord.length + ' Completed</span></div>' +
      '<div class="route-stat-item"><span class="rs-label">Total Distance:</span><span class="rs-val">' + miles + ' Miles</span></div>' +
      '<div class="route-stat-item"><span class="rs-label">Estimated Drive:</span><span class="rs-val">' + driveMin + ' Minutes</span></div>' +
    '</div>' +
    '<div class="run-sheet-toolbar">' +
      '<div class="run-sheet-title-col">' +
        '<h3 class="run-sheet-heading">Daily Clipboard Run Sheet</h3>' +
        '<span class="run-sheet-sub">' + orderLabel + '</span>' +
      '</div>' +
      '<div class="run-sheet-actions">' +
        (manual ? '<button id="btnReopt" class="btn-text-action">Re-Optimize Shortest Drive</button>' : '') +
        '<button id="btnExportActivityLog" class="btn-text-action">Export Mileage & Activity Log (CSV)</button><button id="btnPrintRunSheet" class="btn-text-action">Print Run Sheet</button>' +
      '</div>' +
    '</div>' +
    '<ol class="stop-list" id="stopList">' + stops + '</ol>' +
    '<div class="full-nav-actions">' +
      '<button id="btnGoogle" class="btn-full-nav google">Start Entire Route in Google Maps</button>' +
      '<button id="btnApple" class="btn-full-nav apple">Start Entire Route in Apple Maps</button>' +
      '<button id="btnClearRoute" class="btn-full-nav clear">Clear Today\'s Route</button>' +
    '</div>'
  );

  $("#btnGoogle").onclick = openInGoogleMaps;
  $("#btnApple").onclick = openInAppleMaps;
  $("#btnClearRoute").onclick = () => {
    if (confirm("Are you sure you want to clear all stops from today's route?")) {
      const prevSel = routeState.selected.slice();
      routeState.selected = [];
      routeState.ordered = [];
      routeState.visited = [];
      routeState.manualOrder = false;
      saveRouteState();
      renderProspectList();
      rebuildRoute();
      showToast("Cleared today's route", () => {
        routeState.selected = prevSel;
        saveRouteState();
        renderProspectList();
        rebuildRoute();
      });
    }
  };

  const reopt = $("#btnReopt");
  if (reopt) {
    reopt.onclick = () => {
      routeState.manualOrder = false;
      rebuildRoute();
      saveRouteState();
      showToast("Recalculated shortest driving route");
    };
  }

  const logBtn = $("#btnExportActivityLog"); if (logBtn) logBtn.onclick = exportDailyActivityLog;
  const printBtn = $("#btnPrintRunSheet");
  if (printBtn) {
    printBtn.onclick = () => window.print();
  }

  // Wire stop check-off inputs
  $$("#stopList input[data-action='toggle-visited']").forEach(cb => {
    cb.onchange = () => toggleStopVisited(cb.dataset.pid);
  });

  // Wire individual stop navigation
  $$("#stopList .btn-action-drive").forEach(btn => {
    btn.onclick = () => openSingleStopNav(btn.dataset.pid);
  });

  // Wire up/down nudge buttons
  $$("#stopList .btn-up").forEach(btn => {
    btn.onclick = () => moveStop(Number(btn.dataset.idx), -1);
  });
  $$("#stopList .btn-down").forEach(btn => {
    btn.onclick = () => moveStop(Number(btn.dataset.idx), 1);
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
      .bindPopup('<b>Stop ' + (i + 1) + ': ' + p.name + '</b>' + (isVisited ? ' [COMPLETED]' : '') + '<br>' + p.type + '<br><i>' + p.hot + '</i>')
      .addTo(routeState.layer);
  });
  if (routeState.ordered.length) {
    const pts = [[routeState.start.lat, routeState.start.lng],
                 ...routeState.ordered.map(p => [p.lat, p.lng])];
    L.polyline(pts, { color: "#d50000", weight: 5, opacity: 0.9, lineCap: "round" }).addTo(routeState.layer);
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
  const inputPhone = document.getElementById("inputProspectPhone");
  const inputLat = document.getElementById("inputProspectLat");
  const inputLng = document.getElementById("inputProspectLng");
  const inputHot = document.getElementById("inputProspectHot");

  if (!form) return;
  form.reset();

  if (editId) {
    const existing = routeState.prospects.find(p => p.id === editId);
    if (existing) {
      if (title) title.textContent = "Edit Customer Account";
      inputId.value = existing.id;
      inputName.value = existing.name;
      inputType.value = existing.type;
      selectSeg.value = existing.seg;
      inputAddr.value = existing.addr;
      if (inputPhone) inputPhone.value = existing.phone || "";
      inputLat.value = existing.lat;
      inputLng.value = existing.lng;
      inputHot.value = existing.hot;
      if (btnDel) {
        btnDel.style.display = "inline-block";
        btnDel.onclick = () => {
          if (confirm('Permanently delete "' + existing.name + '" from your territory accounts?')) {
            deleteProspect(existing.id);
            closeModal("modalAddProspect");
          }
        };
      }
    }
  } else {
    if (title) title.textContent = "Add New Customer Account";
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
        phone: ($("#inputProspectPhone") ? $("#inputProspectPhone").value : ""),
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
      if (confirm("Reset your directory to default 22 territory accounts? Any custom additions will be cleared.")) {
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

  const clearSearchBtn = document.getElementById("btnRouteSearchClear");
  if (clearSearchBtn) {
    clearSearchBtn.onclick = () => {
      if (searchInput) searchInput.value = "";
      routeState.searchQuery = "";
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
