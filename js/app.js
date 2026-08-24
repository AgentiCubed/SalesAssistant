/* ============================================================
   SALES COACH — SENIOR-FRIENDLY APPLICATION LOGIC
   Zero-Emoji, High-Contrast, Accessible UI
   ============================================================ */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------- NAVIGATION ---------- */
function go(view) {
  $$(".view").forEach(v => v.classList.remove("active"));
  const target = $("#view-" + view);
  if (target) target.classList.add("active");

  // Show or hide persistent Back button based on whether we are on home screen
  const backBar = $("#persistentBackBar");
  if (backBar) {
    backBar.style.display = (view === "home") ? "none" : "flex";
  }

  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.go === view));
  if (view === "route" && typeof initRoute === "function") { initRoute(); }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (btn) {
    e.preventDefault();
    go(btn.dataset.go);
  }
});

/* ---------- THEME (High-Contrast Light / Dark Mode) ---------- */
function initTheme() {
  const saved = (() => { try { return localStorage.getItem("sc-theme"); } catch (e) { return null; } })();
  if (saved === "dark") document.body.classList.add("dark");
  updateThemeButtonLabel();

  const btn = $("#themeToggle");
  if (btn) btn.addEventListener("click", () => {
    const dark = document.body.classList.toggle("dark");
    try { localStorage.setItem("sc-theme", dark ? "dark" : "light"); } catch (e) {}
    updateThemeButtonLabel();
    if (typeof refreshMapTheme === "function") refreshMapTheme();
    if (typeof routeState !== "undefined" && routeState.map) {
      setTimeout(() => routeState.map.invalidateSize(), 60);
    }
  });
}

function updateThemeButtonLabel() {
  const label = $("#themeToggleLabel");
  const isDark = document.body.classList.contains("dark");
  if (label) {
    label.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
  }
}

/* ---------- HOME HERO ---------- */
function renderHero() {
  const hr = new Date().getHours();
  const greetEl = $("#heroGreeting");
  const subEl = $("#heroSub");
  const dateEl = $("#heroDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  }
  let greet, sub;
  if (hr >= 4 && hr < 12) {
    greet = "Good morning. Ready for today's sales route.";
    sub = "Your daily field sales cockpit. Select a section below to begin.";
  } else if (hr >= 12 && hr < 17) {
    greet = "Good afternoon. Keep the momentum going.";
    sub = "Review today's stops, battle cards, or product lookups.";
  } else {
    greet = "Sales Cockpit — Review and Planning.";
    sub = "Review today's account notes and prepare tomorrow's driving route.";
  }
  if (greetEl) greetEl.textContent = greet;
  if (subEl) subEl.textContent = sub;

  const counts = {
    hsProducts: (typeof CATALOG !== "undefined" ? CATALOG.length : 103),
    hsCards: (typeof BATTLE_CARDS !== "undefined" ? BATTLE_CARDS.length : 7),
    hsRoute: (typeof PROSPECTS !== "undefined" ? PROSPECTS.length : 22),
  };
  Object.entries(counts).forEach(([id, target]) => {
    const el = $("#" + id);
    if (el) el.textContent = target;
  });
}

/* ---------- TABLE OF CONTENTS (HOME MENU) ---------- */
const TOC_SECTIONS = [
  { num: "1", id: "route", title: "Today's Driving Route & Map", desc: "Build optimized customer visits, view map, and launch live turn-by-turn directions." },
  { num: "2", id: "battlecards", title: "Product Battle Cards & Demos", desc: "Proven physical demonstration scripts for top high-margin chemical and fastener lines." },
  { num: "3", id: "catalog", title: "Product Catalog & Article Lookup", desc: "Search 103 official MRO chemicals, fasteners, adhesives, and part numbers." },
  { num: "4", id: "cockpit", title: "Cold Call Talk Tracks", desc: "Step-by-step parking lot, door open, and presentation conversation scripts." },
  { num: "5", id: "objections", title: "Objection Handling Comebacks", desc: "Word-for-word responses for supplier loyalty, price objections, and brush-offs." },
  { num: "6", id: "precall", title: "Pre-Call Preparation Checklist", desc: "30-second physical prep list to review before walking through the customer's door." },
  { num: "7", id: "gameplan", title: "Customer Type Game Plans", desc: "Targeted opening angles tailored for 14 specific shop archetypes." },
  { num: "8", id: "anglefinder", title: "Non-Traditional Angle Finder", desc: "Find consumption hooks in hospitals, breweries, schools, and care facilities." },
  { num: "9", id: "methodology", title: "Sales Training: How to Persuade", desc: "The complete 6-module field sales training course by Phil M. Jones." },
];

function renderTableOfContents() {
  const wrap = $("#tocMenu");
  if (!wrap) return;
  wrap.innerHTML = TOC_SECTIONS.map(item => `
    <button class="toc-item-card" data-go="${item.id}">
      <span class="toc-num">${item.num}</span>
      <div class="toc-text">
        <h3 class="toc-title">${item.title}</h3>
        <p class="toc-desc">${item.desc}</p>
      </div>
      <span class="toc-arrow">Open &rarr;</span>
    </button>
  `).join("");
}

/* ---------- COACH BAR ---------- */
function setCoach(line) {
  const el = $("#coachLine");
  if (!el) return;
  el.textContent = line;
}
function initCoach() {
  const hr = new Date().getHours();
  const line = (hr >= 4 && hr < 12) ? pick(COACH_LINES.greetingMorning) : pick(COACH_LINES.greetingGeneric);
  setCoach(line);
}

/* ---------- DAILY GAME PLAN ---------- */
function renderCustTypes() {
  const grid = $("#custTypeGrid");
  if (!grid) return;
  grid.innerHTML = "";
  CUSTOMER_TYPES.forEach(ct => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = ct.name;
    chip.onclick = () => {
      $$(".chip", grid).forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      renderGamePlan(ct);
    };
    grid.appendChild(chip);
  });
}

function renderGamePlan(ct) {
  const out = $("#gameplanOut");
  const list = (arr) => arr.map(x => `<li>${x}</li>`).join("");
  const quotes = ct.openers.map(o => `<div class="quote-box">${o}</div>`).join("");
  out.innerHTML = `
    <div class="plan-card">
      <h3 class="card-section-header">THEIR COMMON PAIN POINTS:</h3>
      <ul>${list(ct.painPoints)}</ul>
    </div>
    <div class="plan-card">
      <h3 class="card-section-header">YOUR STRATEGIC ANGLES:</h3>
      <ul>${list(ct.angles)}</ul>
    </div>
    <div class="plan-card">
      <h3 class="card-section-header">RECOMMENDED OPENING LINES:</h3>
      ${quotes}
    </div>
    <div class="plan-card">
      <h3 class="card-section-header">DEMO-TO-SALE PROCESS:</h3>
      <div class="demo-box">${ct.demoToSale}</div>
    </div>
  `;
  setCoach(pick(COACH_LINES.encouragement));
  out.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- ANGLE FINDER ---------- */
function renderAngleFinder() {
  const grid = $("#angleGrid");
  if (!grid) return;
  grid.innerHTML = "";
  ANGLE_FINDER.forEach(a => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = a.label;
    chip.onclick = () => {
      chip.classList.toggle("selected");
      renderAngleOut();
    };
    chip.dataset.id = a.id;
    grid.appendChild(chip);
  });
}
function renderAngleOut() {
  const selected = $$("#angleGrid .chip.selected").map(c => c.dataset.id);
  const out = $("#angleOut");
  if (!selected.length) { out.innerHTML = ""; return; }
  const cards = ANGLE_FINDER.filter(a => selected.includes(a.id));
  out.innerHTML = cards.map(a => `
    <div class="plan-card">
      <h3 class="card-section-header">${a.label.toUpperCase()}</h3>
      <p style="margin:0 0 8px;font-size:16px;"><b>What they consume:</b> ${a.needs}</p>
      <div class="demo-box"><b>Your Opening Hook:</b> ${a.hook}</div>
    </div>
  `).join("");
}

/* ---------- BATTLE CARDS ---------- */
function renderBattleCards() {
  const list = $("#bcList");
  if (!list) return;
  list.innerHTML = BATTLE_CARDS.map(c => `
    <button class="bc-chip" data-bc="${c.id}">
      <span class="bc-chip-name">${c.name}</span>
      <span class="bc-chip-cat">Category: ${c.category} &middot; Art. ${c.artNo}</span>
    </button>
  `).join("");
  $$("#bcList .bc-chip").forEach(b => {
    b.onclick = () => {
      $$("#bcList .bc-chip").forEach(x => x.classList.remove("selected"));
      b.classList.add("selected");
      renderBattleCardDetail(b.dataset.bc);
    };
  });
}

function renderBattleCardDetail(id) {
  const c = BATTLE_CARDS.find(x => x.id === id);
  const out = $("#bcDetail");
  if (!c) { out.innerHTML = ""; return; }
  const li = arr => arr.map(x => `<li>${x}</li>`).join("");
  const fab = c.fab && c.fab.length ? `
    <div class="plan-card"><h3 class="card-section-header">FEATURE &rarr; ADVANTAGE &rarr; BENEFIT</h3>
      ${c.fab.map(r => `<div class="fab-row"><b>Feature:</b> <span>${r.f}</span><br><b>Advantage:</b> <span>${r.a}</span><br><b>Customer Benefit:</b> <em class="benefit-em">${r.b}</em></div>`).join("")}
    </div>` : "";
  const demo = c.demo ? `
    <div class="plan-card"><h3 class="card-section-header">HANDS-ON DEMO: ${c.demo.name}</h3>
      ${c.demo.bits.map(d => `
        <div class="demo-bit">
          <div class="demo-bit-title"><b>Demo Step:</b> ${d.title}</div>
          <div class="demo-bit-tools"><b>Tools Required:</b> ${d.tools}</div>
          <div class="demo-bit-how"><b>How to Execute:</b> ${d.how}</div>
        </div>`).join("")}
    </div>` : "";
  out.innerHTML = `
    <div class="plan-card">
      <h3 class="card-section-header">${c.name} &mdash; Article Number: ${c.artNo}</h3>
      <p class="bc-tagline"><b>Tagline:</b> ${c.tagline}</p>
      <p style="font-size:16px;line-height:1.5;margin:8px 0 0;"><b>Primary Application:</b> ${c.application}</p>
    </div>
    <div class="plan-card"><h3 class="card-section-header">IDEAL CUSTOMER TYPES</h3><ul>${li(c.bestFor)}</ul></div>
    <div class="plan-card"><h3 class="card-section-header">KEY TECHNICAL FEATURES</h3><ul>${li(c.features)}</ul></div>
    ${fab}
    ${demo}
    <div class="plan-card"><h3 class="card-section-header">DISPLACES THESE COMPETITORS</h3><ul>${li(c.competitors)}</ul></div>
    <div class="plan-card"><h3 class="card-section-header">CROSS-SELL OPPORTUNITIES</h3><ul>${li(c.crossSell)}</ul></div>
    <div class="plan-card"><h3 class="card-section-header">FIELD SALES NOTE</h3><div class="demo-box">${c.note}</div></div>
  `;
  out.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- PRODUCT FINDER ---------- */
let catFilterCat = "";
function renderCatalogCats() {
  const wrap = $("#catCats");
  if (!wrap) return;
  wrap.innerHTML = "";
  const all = document.createElement("button");
  all.className = "chip selected"; all.textContent = "All Categories";
  all.onclick = () => { catFilterCat = ""; setCatActive(all); renderCatalog(); };
  wrap.appendChild(all);
  CATALOG_CATS.forEach(c => {
    const chip = document.createElement("button");
    chip.className = "chip"; chip.textContent = c;
    chip.onclick = () => { catFilterCat = c; setCatActive(chip); renderCatalog(); };
    wrap.appendChild(chip);
  });
}
function setCatActive(el) { $$("#catCats .chip").forEach(c => c.classList.remove("selected")); el.classList.add("selected"); }
function renderCatalog() {
  const q = ($("#catSearch").value || "").trim().toLowerCase();
  const out = $("#catOut");
  const matches = CATALOG.filter(p => {
    if (catFilterCat && p.cat !== catFilterCat) return false;
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.art.toLowerCase().includes(q) ||
           p.cat.toLowerCase().includes(q) || p.note.toLowerCase().includes(q);
  });
  if (!matches.length) { out.innerHTML = `<div class="empty">No products found matching your search. Please check the spelling or article number.</div>`; return; }
  out.innerHTML = matches.map(p => `
    <div class="cat-card">
      <div class="cat-head"><span class="cat-name">${p.name}</span><span class="cat-art">Art. ${p.art}</span></div>
      <div class="cat-meta"><b>Category:</b> ${p.cat}${p.size && p.size !== "—" ? " &middot; <b>Packaging:</b> " + p.size : ""}</div>
      <div class="cat-note"><b>Application:</b> ${p.note}</div>
    </div>
  `).join("");
}

/* ---------- METHODOLOGY ACCORDION ---------- */
function renderMethodologyPreview() {
  const out = $("#methodPreview");
  if (!out) return;
  out.innerHTML = "";
  METHODOLOGY_PREVIEW.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "acc-item" + (i === 0 ? " open" : "");
    item.innerHTML = `
      <div class="acc-head">${p.title}<span class="caret">&plusmn;</span></div>
      <div class="acc-body"><ol>${p.steps.map(s => `<li>${s}</li>`).join("")}</ol></div>
    `;
    item.querySelector(".acc-head").onclick = () => item.classList.toggle("open");
    out.appendChild(item);
  });
}

/* ---------- PLAYBOOK ---------- */
function renderPlaybook() {
  const out = $("#playbookOut");
  if (!out) return;
  out.innerHTML = "";
  PLAYBOOK.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "acc-item" + (i === 0 ? " open" : "");
    item.innerHTML = `
      <div class="acc-head">${p.title}<span class="caret">&plusmn;</span></div>
      <div class="acc-body"><ol>${p.steps.map(s => `<li>${s}</li>`).join("")}</ol></div>
    `;
    item.querySelector(".acc-head").onclick = () => item.classList.toggle("open");
    out.appendChild(item);
  });
}

/* ---------- COCKPIT (TALK TRACKS) ---------- */
function renderCockpit() {
  const out = $("#cockpitOut");
  if (!out) return;
  out.innerHTML = CALL_FLOW.map(f => `
    <div class="flow-card">
      <div class="flow-phase">${f.phase.toUpperCase()}</div>
      <div class="flow-cue"><b>When to execute:</b> ${f.cue}</div>
      <div class="flow-script"><b>What to say:</b><br>${f.script}</div>
      <div class="flow-tip"><b>Field Sales Tip:</b> ${f.tip}</div>
    </div>
  `).join("");
}

/* ---------- OBJECTIONS ---------- */
function renderObjections(filter = "") {
  const out = $("#objOut");
  if (!out) return;
  const q = filter.trim().toLowerCase();
  const matches = OBJECTIONS.filter(o => {
    if (!q) return true;
    return o.objection.toLowerCase().includes(q) ||
           o.tags.some(t => t.includes(q)) ||
           o.response.toLowerCase().includes(q);
  });
  if (!matches.length) {
    out.innerHTML = `<div class="empty">No matching objection found. Try keywords like: price, supplier, time, budget.</div>`;
    return;
  }
  out.innerHTML = matches.map(o => `
    <div class="obj-card">
      <div class="obj-q"><b>Customer Objection:</b> ${o.objection}</div>
      <div class="obj-a"><b>Recommended Response:</b><br>${o.response}</div>
      <div class="obj-why"><b>Why this approach works:</b> ${o.why}</div>
    </div>
  `).join("");
}

/* ---------- PRECALL CHECKLIST (32px Checkboxes) ---------- */
const STORAGE_KEY_PRECALL = "sc_precall_checked_v1";

function getPrecallState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRECALL);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function savePrecallState(indices) {
  try {
    localStorage.setItem(STORAGE_KEY_PRECALL, JSON.stringify(indices));
  } catch (e) {}
}

function renderPrecall() {
  const out = $("#precallOut");
  if (!out) return;
  out.innerHTML = "";
  const checkedIndices = getPrecallState();
  PRECALL.forEach((item, idx) => {
    const li = document.createElement("li");
    const isChecked = checkedIndices.includes(idx);
    li.className = "precall-li" + (isChecked ? " checked" : "");
    li.innerHTML = `
      <label class="precall-label">
        <input type="checkbox" class="checkbox-large" data-idx="${idx}" ${isChecked ? "checked" : ""} />
        <span class="checkbox-custom"></span>
        <span class="precall-text">${item}</span>
      </label>
    `;
    li.querySelector("input").onchange = (e) => {
      li.classList.toggle("checked", e.target.checked);
      const currentChecked = $$("#precallOut input:checked").map(el => Number(el.dataset.idx));
      savePrecallState(currentChecked);
    };
    out.appendChild(li);
  });
}

/* ---------- INIT APP ---------- */
function init() {
  initTheme();
  renderHero();
  renderTableOfContents();
  initCoach();
  renderCustTypes();
  renderAngleFinder();
  renderBattleCards();
  renderCatalogCats();
  renderCatalog();
  renderMethodologyPreview();
  renderPlaybook();
  renderCockpit();
  renderObjections();
  renderPrecall();

  const catSearch = $("#catSearch");
  if (catSearch) catSearch.addEventListener("input", renderCatalog);
  const catClear = $("#btnCatSearchClear");
  if (catClear) catClear.onclick = () => { if (catSearch) catSearch.value = ""; renderCatalog(); };

  const objSearch = $("#objSearch");
  if (objSearch) objSearch.addEventListener("input", (e) => renderObjections(e.target.value));
  const objClear = $("#btnObjSearchClear");
  if (objClear) objClear.onclick = () => { if (objSearch) objSearch.value = ""; renderObjections(); };

  const precallReset = $("#precallReset");
  if (precallReset) {
    precallReset.addEventListener("click", () => {
      if (confirm("Reset all checkboxes on the pre-call preparation checklist?")) {
        $$("#precallOut input").forEach(cb => cb.checked = false);
        $$("#precallOut li").forEach(li => li.classList.remove("checked"));
        savePrecallState([]);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
