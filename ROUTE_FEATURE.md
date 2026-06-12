# Prospecting Route Planner — what I built (v5)

**Boss's ask:** connect the demo to a map, give the rep a *visual* of their prospecting
route, ideally something they can add to a route they're already driving that day.

## What it does
- New **"Prospecting Route"** tab (home tile + bottom nav 🗺️).
- Interactive **Leaflet + OpenStreetMap** map — **no API key, $0, no billing.**
- **12 real Addison County prospects** (Middlebury/Vergennes/Bristol) tagged to the same
  customer segments the app already uses. Filter by segment chips.
- Tap prospects to add them → app **auto-optimizes the driving order** (nearest-neighbor
  from a Middlebury start), drops numbered pins, draws the route line.
- Live stats: **# stops, total miles, est. drive time.**
- **One-tap hand-off**: "Open in Google Maps" / "Open in Apple Maps" launches the rep's
  real phone nav with the optimized waypoints → live turn-by-turn. *This is the bridge
  between in-app planning and the route they actually drive.*
- Seeds a sample 4-stop day so the demo lights up the instant you open the tab.

## Why Leaflet/OSM instead of Google Maps JS
A real Google Maps embed needs a billed API key (Würth's). I wasn't going to wire up
billing while you were out. Leaflet gives the identical demo value today, and the swap to
native Google Maps JS later is basically one module — the route data + handoff URLs are
already Google-formatted.

## Swap-to-Google later (when/if Würth pays)
- Replace the `L.tileLayer(...OSM...)` with Google Maps JS `Map` + `DirectionsService`.
- `optimizeRoute()` (nearest-neighbor) → Google Directions `optimizeWaypoints:true`.
- Everything else (prospect DB, segment filters, UI, handoff) stays.

## Files
- `js/route.js` — all route logic (prospect DB, optimizer, map, handoff). Self-contained.
- `index.html` — view section + tile + nav + Leaflet includes.
- `css/styles.css` — route styles (Würth red), appended at bottom.
- `vendor/leaflet/` — Leaflet vendored locally so the PWA still works offline.
- `sw.js` — cache bumped to v5 with new assets.

## To demo
`cd projects/sales-coach && python3 -m http.server 8765` → open
http://localhost:8765 → tap **Prospecting Route**. (Note: live OSM map tiles + the
Maps handoff need internet; everything else works offline.)

## Verified
Syntax-checked both JS files; ran the optimizer + distance + handoff URL builders in Node —
correct ordering, sane mileage, valid Google/Apple Maps directions URLs with waypoints.
Couldn't grab a live screenshot (browser nav was policy-blocked this session), so eyeball
the map render when you're back — but the wiring + logic are solid.
