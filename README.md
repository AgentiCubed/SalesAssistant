# Sales Coach

**Prospecting, routing, and field sales cockpit for territory sales representatives.**

Sales Coach is an installable Progressive Web App (PWA) designed for field reps on the road. Engineered around cognitive accessibility, high-contrast visual ergonomics, large touch targets, and paper-and-pencil simplicity, it provides instant access to territory route planning, customer battle cards, live demonstration scripts, cold-call talk tracks, and MRO catalog part lookups with zero login or server dependencies.

---

## Core Capabilities

* **Table of Contents Main Menu:** Clean, single-column numbered directory organizing all operational tools into a linear, recognizable structure.
* **Prospecting Route Planner & Daily Run Sheet:**
  * **Live GPS & Territory Starting Hubs:** Auto-detects real-time vehicle coordinates with one-tap recalculation or quick-switches between regional hubs (Middlebury, Vergennes, Rutland, Burlington, Montpelier).
  * **Automated Route Optimization:** Calculates the shortest driving sequence across selected accounts with live mileage and drive-time estimations.
  * **Turn-by-Turn Hand-Off:** Single-tap hand-off to Google Maps or Apple Maps for the entire multi-stop route or direct point-to-point routing to any individual stop.
  * **Tactile Reordering & Stop Check-Off:** Large Up / Down step buttons to manually adjust arrival sequence and 32px checkboxes to log visited accounts.
  * **Print-to-Paper Mode:** Dedicated print layout (`@media print`) formats the daily route and notes into a clean, black-and-white 8.5x11 run sheet for truck clipboards.
* **Customer Account Directory & Scratchpad Notes:**
  * **In-App Territory CRUD:** Add, edit, and delete customer accounts for any geographic territory.
  * **Customer Call Scratchpad:** Dedicated note box on every customer card that auto-saves call notes, follow-up dates, and key contact details to `localStorage` on every keystroke with a visible timestamp.
  * **Direct One-Tap Phone Calling:** Tap-to-call phone links (`tel:...`) formatted in large, underlined text for instant dialing.
  * **CSV & JSON Tooling:** Export customer lists to spreadsheet format or import custom territory lead lists without server processing.
* **Hands-On Demo Battle Cards:** Step-by-step physical demonstration scripts, Feature-Advantage-Benefit (FAB) tables, and competitor displacement talk tracks across 7 high-margin consumable lines:
  1. *All In One (Threadlocker / Sealant - Art. 0893555050)*
  2. *SIG 3000 Super Impact Grease (Art. 0890401000)*
  3. *HHS-K Adhesive Lubricant (Art. 0893106050)*
  4. *Rost Off Max Ice Thermal Shock Penetrant (Art. 0893241002)*
  5. *Bond and Seal Structural Polyurethane (Art. 08901003)*
  6. *Super RTV Silicone Power-Can Gasket Maker (Art. 08933311)*
  7. *Foaming Engine & Machinery Degreaser (Art. 0893013058)*
* **Product Catalog & Part Lookup:** Searchable directory of 103 official MRO chemical, adhesive, fastener, and abrasive part numbers.
* **Cold Call Cockpit & Objection Handling:** Step-by-step parking lot, door open, and presentation conversation scripts, plus word-for-word responses for 8 common customer pushbacks.
* **Sales Methodology Course:** Full 6-module interactive *How to Persuade & Get Paid* coaching curriculum.
* **Pre-Call Preparation Checklist:** 30-second physical preparation checklist with 32px square checkboxes and persistent local state.

---

## Senior-Friendly & Accessible Design Standards

* **Zero-Emoji Policy:** Standardized monochrome geometric markers, high-contrast badges (`[VISITED]`, `[ON ROUTE]`, `[COMPLETED]`), and clean vector lines replace decorative emojis.
* **Large 18px Base Typography:** Built with Inter sans-serif at 18px body font and 1.5x line height for effortless readability in high-glare environments.
* **WCAG AAA Contrast Standard:** Stark dark charcoal (`#111827`) on pure white (`#ffffff`) surfaces with solid 1.5px-2px boundary borders.
* **48px Minimum Touch Targets:** Generously sized buttons, inputs, category chips, and list rows prevent accidental mis-taps.
* **Persistent Back Navigation:** Permanent `< Back to Main Menu` bar on all sub-screens ensures reps never get lost.
* **Reversible Action Banner:** Top-of-screen notification toast with instant single-tap `Undo` capability.

---

## Technical Stack & Architecture

* **Runtime:** Vanilla JavaScript (ES6+), HTML5, CSS3.
* **Mapping Engine:** Leaflet 1.9.4 with CARTO high-contrast tiles and local vendored fallback.
* **Storage:** Client-side `localStorage` (`sc_route_state_v1`, `sc_prospects_v2`, `sc_customer_notes_v1`, `sc_precall_checked_v1`).
* **Offline PWA:** Service Worker (`sales-coach-v18`) with static asset caching and Web App Manifest.
* **Hosting / CI-CD:** Automated deployment via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages.

---

## Live Deployment

The application is deployed live on GitHub Pages at:
`https://agenticubed.github.io/SalesAssistant/`
