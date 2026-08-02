<div align="center">
  <img src="assets/agentic3_logo.png" width="340" alt="Agentic³" />
</div>

# Sales Coach

**Prospecting & cold-call coach for territory sales reps (TSRs).** An installable
Progressive Web App that turns a rep's phone into a field tool — battle cards, objection
handling, product catalog, call-flow scripts, and a visual prospecting-route planner.

## Features
- 🗺️ **Prospecting Route Planner** — interactive Leaflet / OpenStreetMap map with real
  Addison County (VT) prospects, segment filters, nearest-neighbor route optimization,
  live stops / miles / drive-time stats, and **one-tap hand-off to Google Maps or Apple
  Maps** for live turn-by-turn.
- 🎯 **Battle cards & objection handling** — quick-reference scripts and responses by
  customer segment.
- 📇 Product catalog, checklists, and call-flow guidance.
- 🌗 **Dark mode** (persisted) with a theme-aware map.
- 📲 **Installable PWA** — offline-capable service worker, home-screen install.
- 💸 **$0 to run** — no API keys, no billing (Google Fonts + free CARTO / OSM tiles).

## Design
A "Showroom Detail" premium UI — bold display type (Sora / Inter), deep charcoal +
brand-red palette, layered depth, refined motion. See
[`DESIGN_NOTES.md`](DESIGN_NOTES.md) and [`ROUTE_FEATURE.md`](ROUTE_FEATURE.md).

## Run locally
```bash
# Use a server that serves `manifest.webmanifest` with the correct MIME type for PWA install testing.
# `npx serve` handles this automatically and is the recommended option:
npx serve .
# Note: Python's built-in http.server often serves `.webmanifest` as `application/octet-stream`,
# which causes browsers to ignore the manifest and skip PWA install prompts.
# If you must use Python, open http://localhost:8000 and expect PWA install to be unavailable:
#   python3 -m http.server 8000
```

## Stack
Vanilla JS · HTML · CSS · Leaflet · PWA (service worker + web manifest).

---
<div align="center"><sub>An <b>Agentic³</b> project · Closing Multi-Dimensional Agentic Loops</sub></div>
