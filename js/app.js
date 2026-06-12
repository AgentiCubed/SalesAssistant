/* ============================================================
   SALES COACH — APP LOGIC
   ============================================================ */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------- NAVIGATION ---------- */
function go(view) {
  $$(".view").forEach(v => v.classList.remove("active"));
  const target = $("#view-" + view);
  if (target) target.classList.add("active");

  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.go === view));
  // lazy-init the route planner (Leaflet needs the view visible to size correctly)
  if (view === "route" && typeof initRoute === "function") { initRoute(); }
  // map sub-views onto nearest nav button
  const navMap = { playbook: "anglefinder", precall: "objections", gameplan: "gameplan", methodology: "anglefinder", catalog: "catalog" };
  if (navMap[view]) {
    $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.go === navMap[view]));
  }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (btn) { go(btn.dataset.go); }
});

/* ---------- THEME (dark mode) ---------- */
function initTheme() {
  const saved = (() => { try { return localStorage.getItem("sc-theme"); } catch (e) { return null; } })();
  if (saved === "dark") document.body.classList.add("dark");
  const btn = $("#themeToggle");
  if (btn) btn.addEventListener("click", () => {
    const dark = document.body.classList.toggle("dark");
    try { localStorage.setItem("sc-theme", dark ? "dark" : "light"); } catch (e) {}
    if (typeof refreshMapTheme === "function") refreshMapTheme();
    if (typeof routeState !== "undefined" && routeState.map) {
      setTimeout(() => routeState.map.invalidateSize(), 60);
    }
  });
}

/* ---------- HOME HERO ---------- */
function renderHero() {
  const hr = new Date().getHours();
  const greetEl = $("#heroGreeting");
  const subEl = $("#heroSub");
  const dateEl = $("#heroDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }
  let greet, sub;
  if (hr >= 4 && hr < 12) { greet = "Good morning. Let's hunt."; sub = "Fresh day, full tank. Pick a play and get the first door open."; }
  else if (hr >= 12 && hr < 17) { greet = "Afternoon push."; sub = "Momentum's the game — line up your next stops and keep rolling."; }
  else if (hr >= 17 && hr < 21) { greet = "Closing stretch."; sub = "Finish strong. Lock the follow-ups before you call it."; }
  else { greet = "Burning the midnight oil."; sub = "Prep tonight, dominate tomorrow. Stack your route."; }
  if (greetEl) greetEl.textContent = greet;
  if (subEl) subEl.textContent = sub;

  // live counts from the real data, with a count-up animation
  const counts = {
    hsProducts: (typeof CATALOG !== "undefined" ? CATALOG.length : 103),
    hsCards: (typeof BATTLE_CARDS !== "undefined" ? BATTLE_CARDS.length : 3),
    hsRoute: (typeof PROSPECTS !== "undefined" ? PROSPECTS.length : 12),
  };
  Object.entries(counts).forEach(([id, target]) => countUp($("#" + id), target));
}

function countUp(el, target, dur = 900) {
  if (!el) return;
  const start = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3);
  function step(now) {
    const t = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(ease(t) * target);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ---------- COACH BAR ---------- */
function setCoach(line) {
  const el = $("#coachLine");
  if (!el) return;
  if (el.textContent === line) return;
  el.style.transition = "opacity .18s ease, transform .18s ease";
  el.style.opacity = "0";
  el.style.transform = "translateY(3px)";
  setTimeout(() => {
    el.textContent = line;
    el.style.opacity = "1";
    el.style.transform = "none";
  }, 180);
}
function initCoach() {
  const hr = new Date().getHours();
  const line = (hr >= 4 && hr < 12) ? pick(COACH_LINES.greetingMorning) : pick(COACH_LINES.greetingGeneric);
  setCoach(line);
}

/* ---------- DAILY GAME PLAN ---------- */
function renderCustTypes() {
  const grid = $("#custTypeGrid");
  grid.innerHTML = "";
  CUSTOMER_TYPES.forEach(ct => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.innerHTML = `<span>${ct.icon}</span>${ct.name}`;
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
  const quotes = ct.openers.map(o => `<div class="quote">${o}</div>`).join("");
  out.innerHTML = `
    <div class="plan-card">
      <h3>Their Pain Points</h3>
      <ul>${list(ct.painPoints)}</ul>
    </div>
    <div class="plan-card">
      <h3>Your Angles</h3>
      <ul>${list(ct.angles)}</ul>
    </div>
    <div class="plan-card">
      <h3>Opening Moves</h3>
      ${quotes}
    </div>
    <div class="plan-card">
      <h3>Demo → Sale</h3>
      <div class="demo">${ct.demoToSale}</div>
    </div>
  `;
  setCoach(pick(COACH_LINES.encouragement));
  out.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- ANGLE FINDER ---------- */
function renderAngleFinder() {
  const grid = $("#angleGrid");
  grid.innerHTML = "";
  ANGLE_FINDER.forEach(a => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.innerHTML = `<span>${a.icon}</span>${a.label}`;
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
      <h3>${a.icon} ${a.label}</h3>
      <p style="margin:0 0 8px;font-size:15px;"><b>They likely burn:</b> ${a.needs}</p>
      <div class="demo"><b>Your hook:</b> ${a.hook}</div>
    </div>
  `).join("");
  setCoach("Nice — you just found an angle on a business that isn't even a 'shop'. That's the whole game.");
}

/* ---------- BATTLE CARDS ---------- */
function renderBattleCards() {
  const list = $("#bcList");
  list.innerHTML = BATTLE_CARDS.map(c => `
    <button class="bc-chip" data-bc="${c.id}">
      <span class="bc-chip-name">${c.name}</span>
      <span class="bc-chip-cat">${c.category}</span>
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
    <div class="plan-card"><h3>Feature → Advantage → Benefit</h3>
      ${c.fab.map(r => `<div class="fab-row"><b>${r.f}</b><span>${r.a}</span><em>${r.b}</em></div>`).join("")}
    </div>` : "";
  const demo = c.demo ? `
    <div class="plan-card"><h3>🎬 Demo: ${c.demo.name}</h3>
      ${c.demo.bits.map(d => `
        <div class="demo-bit">
          <div class="demo-bit-title">${d.title}</div>
          <div class="demo-bit-tools"><b>Tools:</b> ${d.tools}</div>
          <div class="demo-bit-how">${d.how}</div>
        </div>`).join("")}
    </div>` : "";
  out.innerHTML = `
    <div class="plan-card">
      <h3>${c.name} — Art. ${c.artNo}</h3>
      <p class="bc-tagline">${c.tagline}</p>
      <p style="font-size:15px;line-height:1.5;margin:8px 0 0;">${c.application}</p>
    </div>
    <div class="plan-card"><h3>Best For</h3><ul>${li(c.bestFor)}</ul></div>
    <div class="plan-card"><h3>Features</h3><ul>${li(c.features)}</ul></div>
    ${fab}
    ${demo}
    <div class="plan-card"><h3>Beats These Competitors</h3><ul>${li(c.competitors)}</ul></div>
    <div class="plan-card"><h3>Cross-Sell</h3><ul>${li(c.crossSell)}</ul></div>
    <div class="plan-card"><h3>💡 Rep Note</h3><div class="demo">${c.note}</div></div>
  `;
  setCoach("Know the demo cold. The product that gets shown is the product that gets sold.");
  out.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- PRODUCT FINDER ---------- */
let catFilterCat = "";
function renderCatalogCats() {
  const wrap = $("#catCats");
  wrap.innerHTML = "";
  const all = document.createElement("button");
  all.className = "chip selected"; all.textContent = "All";
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
  if (!matches.length) { out.innerHTML = `<div class="empty">No product match. Try a name, category, or article number.</div>`; return; }
  out.innerHTML = matches.map(p => `
    <div class="cat-card">
      <div class="cat-head"><span class="cat-name">${p.name}</span><span class="cat-art">${p.art}</span></div>
      <div class="cat-meta">${p.cat}${p.size && p.size !== "—" ? " · " + p.size : ""}</div>
      <div class="cat-note">${p.note}</div>
    </div>
  `).join("");
}

/* ---------- METHODOLOGY PREVIEW (locked) ---------- */
function renderMethodologyPreview() {
  const out = $("#methodPreview");
  out.innerHTML = "";
  METHODOLOGY_PREVIEW.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "acc-item" + (i === 0 ? " open" : "");
    item.innerHTML = `
      <div class="acc-head">${p.title}<span class="caret">›</span></div>
      <div class="acc-body"><ol>${p.steps.map(s => `<li>${s}</li>`).join("")}</ol></div>
    `;
    item.querySelector(".acc-head").onclick = () => item.classList.toggle("open");
    out.appendChild(item);
  });
}

/* ---------- PLAYBOOK ---------- */
function renderPlaybook() {
  const out = $("#playbookOut");
  out.innerHTML = "";
  PLAYBOOK.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "acc-item" + (i === 0 ? " open" : "");
    item.innerHTML = `
      <div class="acc-head">${p.title}<span class="caret">›</span></div>
      <div class="acc-body"><ol>${p.steps.map(s => `<li>${s}</li>`).join("")}</ol></div>
    `;
    item.querySelector(".acc-head").onclick = () => item.classList.toggle("open");
    out.appendChild(item);
  });
}

/* ---------- COCKPIT ---------- */
function renderCockpit() {
  const out = $("#cockpitOut");
  out.innerHTML = CALL_FLOW.map(f => `
    <div class="flow-card">
      <div class="flow-phase">${f.phase}</div>
      <div class="flow-cue">${f.cue}</div>
      <div class="flow-script">${f.script}</div>
      <div class="flow-tip"><b>Tip:</b> ${f.tip}</div>
    </div>
  `).join("");
}

/* ---------- OBJECTIONS ---------- */
function renderObjections(filter = "") {
  const out = $("#objOut");
  const q = filter.trim().toLowerCase();
  const matches = OBJECTIONS.filter(o => {
    if (!q) return true;
    return o.objection.toLowerCase().includes(q) ||
           o.tags.some(t => t.includes(q)) ||
           o.response.toLowerCase().includes(q);
  });
  if (!matches.length) {
    out.innerHTML = `<div class="empty">No match. Try: price, supplier, time, budget, happy…</div>`;
    return;
  }
  out.innerHTML = matches.map(o => `
    <div class="obj-card">
      <div class="obj-q">${o.objection}</div>
      <div class="obj-a">${o.response}</div>
      <div class="obj-why"><b>Why it works:</b> ${o.why}</div>
    </div>
  `).join("");
}

/* ---------- PRECALL ---------- */
function renderPrecall() {
  const out = $("#precallOut");
  out.innerHTML = "";
  PRECALL.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item}</span>`;
    li.onclick = () => li.classList.toggle("checked");
    out.appendChild(li);
  });
}

/* ---------- INIT ---------- */
function init() {
  initTheme();
  renderHero();
  initCoach();
  renderCustTypes();
  renderAngleFinder();
  renderBattleCards();
  renderCatalogCats();
  renderCatalog();
  renderMethodologyPreview();
  renderPlaybook();
  $("#catSearch").addEventListener("input", renderCatalog);
  renderCockpit();
  renderObjections();
  renderPrecall();

  $("#objSearch").addEventListener("input", (e) => renderObjections(e.target.value));
  $("#precallReset").addEventListener("click", () => {
    $$("#precallOut li").forEach(li => li.classList.remove("checked"));
    setCoach(pick(COACH_LINES.encouragement));
  });
}

document.addEventListener("DOMContentLoaded", init);
