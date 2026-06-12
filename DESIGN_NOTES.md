# Sales Coach — "Showroom Detail" design pass (v6–v11)

Brief from James: make it look clean, slick, hi-class — "like a luxury vehicle in the
showroom, freshly detailed and ready to be driven." Full autonomy, all day.

## Design language adopted
Researched 2026 premium/automotive UI patterns. Distilled to: **bold premium type,
deep charcoal + brand-red palette, layered depth, refined motion, tactile micro-
interactions.** Applied as a cohesive "Showroom Detail" system driven by CSS variables.

## What changed (commit-by-commit)
1. **Foundation (v6)** — Sora (display) + Inter (text) fonts; deepened Würth-red ramp +
   warm-charcoal neutrals; layered soft shadows + a red "glow" shadow; charcoal hero header
   with an animated brushed-metal sheen; tactile tiles/chips/nav (hover-lift, press-squish,
   hairline trim highlights); staggered view-entrance reveals; animated route-line draw +
   pin drop-in; premium route stat cards & gradient handoff buttons.
2. **Home hero (v7)** — time-aware greeting ("Good morning. Let's hunt." etc.), "today's
   snapshot" with live data-driven stat counters that count up on load (pulls real CATALOG /
   BATTLE_CARDS / PROSPECTS counts), frosted-glass stat tiles, primary "Plan today's route"
   CTA, uppercase section labels.
3. **Interior trim (v8)** — focus-ring search inputs; accent-bar call-flow cards; hover-lift
   on every card type (battle/objection/product/checklist/accordion); refined script &
   response quote blocks (gradient fills, asymmetric radius); taller accordion.
4. **Map finish (v9)** — swapped cluttered OSM tiles for clean CARTO Positron basemap
   (free, no key, retina @2x) — pale "showroom floor" look that makes the red route pop.
5. **Night drive (v10)** — full dark-mode toggle (top-right of hero), localStorage-
   persisted, complete dark token remap, and a **theme-aware map** (CARTO dark tiles when
   dark). Also fixed a sticky-header/coach-bar overlap.
6. **Finish line (v11)** — aligned PWA theme-color + manifest to the charcoal hero so the
   installed home-screen app's status bar matches.

## Still $0 / no API keys
All fonts via Google Fonts (graceful system fallback). Map via free CARTO tiles. No billing
anywhere. Google Maps JS remains a clean one-module swap later (handoff URLs already Google-
formatted).

## Verified
- CSS brace-balanced (230/230); both JS files `node --check` clean; all element refs wired;
  local server 200; both CARTO basemaps (light + dark) return 200.
- NOTE: browser navigation was policy-blocked for the agent this session, so I could not
  self-screenshot. James has been refreshing the live server. If any visual detail looks
  off on his end, it's a quick fix — the structure is sound.

## Demo it
`cd projects/sales-coach && python3 -m http.server 8765` → http://localhost:8765
Hard-refresh (Cmd+Shift+R) to clear the old service-worker cache after updates.
Tap the ◐ top-right to flip dark mode. Tap 🗺️ Route for the map.

## Continued (v12–v13)
7. **Route depth (v12)** — expanded prospect DB to **22 real Addison County businesses**
   (Middlebury/Vergennes/Bristol/Brandon/Shoreham) for a fuller, more convincing map; the
   home "Prospects" stat auto-reflects it. Added **drag-to-reorder** on the stop list (grip
   handles, live drop indicators, off-by-one-safe reorder math verified in Node) with a
   "⚡ Re-optimize" snap-back to the shortest drive. Manual order is preserved when adding
   new stops.
8. **Finish polish (v13)** — map **loading shimmer** skeleton (clears on first tile paint),
   coach-bar **text crossfade** so guidance updates feel intentional.

## State at end of day-session
8 detail passes, all committed and verified (CSS brace-balanced, both JS `node --check`
clean, all assets + map tiles 200). Dark mode fully covers every hardcoded-light surface.
Still $0 / no API keys. Browser-nav remained policy-blocked so no agent self-screenshot;
James verified visually on the live server through the day.
