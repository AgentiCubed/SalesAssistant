/* ============================================================
   SALES COACH — CONTENT DATA LAYER
   First iteration: Prospecting & Cold Calls
   Grounded in industrial / MRO distribution (Würth-style:
   fasteners, chemicals, abrasives, safety, tools, MRO supplies).
   All content here is editable — this is the single source of
   truth the UI renders from. Swap in real battle-card language
   as it arrives.
   ============================================================ */

const COACH_LINES = {
  greetingMorning: [
    "Morning. Let's go find some business today.",
    "New day, new territory. Who are we winning over?",
    "Coffee in hand? Good. Let's build a plan that actually lands.",
  ],
  greetingGeneric: [
    "Alright — what are we working on?",
    "Let's turn a route into revenue.",
    "Pick a lane and I'll help you make the call count.",
    "Every business burns something. Let's find what they burn.",
    "Don't box yourself in. Hospitals, car washes, gun shops — all buyers.",
  ],
  encouragement: [
    "First 'no' isn't a door closing — it's information. Keep going.",
    "You don't need them to say yes today. You need them to remember you tomorrow.",
    "The rep who follows up 5 times beats the rep who calls once. Be that rep.",
    "Nervous before a cold call is normal. Walk in anyway — that's the whole job.",
    "Every top TSR was once the new kid making their first awkward call. You're on schedule.",
  ],
  postCall: [
    "Log it while it's fresh. Future-you will thank present-you.",
    "Win or lose, what's the next touch? Set it now.",
    "What did they actually care about? That's your angle next time.",
  ],
};

/* ---------- DAILY GAME PLAN: customer archetypes ---------- */
/* These map to the kinds of shops a TSR rolls into in a day. */
const CUSTOMER_TYPES = [
  {
    id: "auto-repair",
    name: "Auto Repair / Body Shop",
    icon: "🔧",
    painPoints: [
      "Downtime when they run out of a fastener or chemical mid-job",
      "Multiple suppliers = multiple invoices, no consistency",
      "Techs walking to the parts store instead of turning wrenches",
    ],
    angles: [
      "Vendor-managed inventory: never run dry on clips, fasteners, abrasives",
      "Consolidate their consumables to one accountable rep (you)",
      "Lead with a high-use pain item — fasteners, shop chemicals, or abrasives",
    ],
    openers: [
      "\"I work with a lot of shops your size — most are surprised how much time their techs lose hunting for the right fastener. Mind if I show you how we fix that?\"",
      "\"I'm not here to sell you a catalog. I'm here to make sure your techs never stop a job over a $0.40 part. Two minutes?\"",
    ],
    demoToSale: "Show the bin system / VMI. Quantify downtime: a tech making $30/hr walking to the parts store twice a day costs you real money. We stock it, we own it, you turn wrenches.",
  },
  {
    id: "fleet-maintenance",
    name: "Fleet / Trucking Maintenance",
    icon: "🚛",
    painPoints: [
      "Vehicles down = money lost every hour",
      "Safety/DOT compliance on consumables",
      "Bulk usage but inconsistent stocking",
    ],
    angles: [
      "Uptime is the whole game — position yourself as the uptime guy",
      "Safety + compliance items they legally can't run out of",
      "Standardize across the fleet to cut SKUs and errors",
    ],
    openers: [
      "\"How many trucks are down right now waiting on a part you should've had on the shelf? I help fleets close that gap.\"",
      "\"I work with fleet maintenance teams on keeping the trucks rolling. Who handles your shop consumables?\"",
    ],
    demoToSale: "Tie everything to uptime and cost-per-down-hour. Show how managed stocking of high-turn items keeps trucks on the road. Use a safety/compliance item as the no-brainer entry.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing / Production",
    icon: "🏭",
    painPoints: [
      "Line stoppages from missing MRO supplies",
      "Procurement overhead on small-dollar high-frequency orders",
      "Inconsistent quality of consumables affecting output",
    ],
    angles: [
      "Reduce purchase-order overhead — fewer transactions, one rep",
      "Line-side stocking so production never stops for a consumable",
      "Quality consistency on abrasives/fasteners/chemicals",
    ],
    openers: [
      "\"Your buyers are probably cutting POs for $15 items all day. I help plants kill that overhead and keep the line fed. Who runs MRO purchasing here?\"",
      "\"What stops your line more often than it should — and is it ever something as dumb as running out of a consumable?\"",
    ],
    demoToSale: "Speak to the buyer AND the floor. Buyer cares about transaction cost and consolidation; floor cares about never stopping. Show line-side bins + reorder automation.",
  },
  {
    id: "construction",
    name: "Construction / Contractor",
    icon: "🏗️",
    painPoints: [
      "Job-site runs to the hardware store kill productivity",
      "Crews using whatever's cheap, not what lasts",
      "Hard to track consumable usage across jobs",
    ],
    angles: [
      "Job-site trailer/truck stocking so crews never leave the site",
      "Upgrade them off cheap big-box consumables to pro-grade",
      "Be the rep who shows up TO the site, not waits at a counter",
    ],
    openers: [
      "\"How many trips to the big-box store did your crew make this week? Each one's an hour of paid labor gone. I fix that.\"",
      "\"I keep contractors stocked right on the truck — fasteners, abrasives, chemicals — so nobody leaves the site. Worth a look?\"",
    ],
    demoToSale: "Quantify the hardware-store run in labor dollars. Show truck/trailer stocking. Lead with the product they burn through fastest and prove it lasts longer / works better.",
  },
  {
    id: "ag-heavy",
    name: "Agriculture / Heavy Equipment",
    icon: "🚜",
    painPoints: [
      "Seasonal crunch — downtime in season is catastrophic",
      "Remote location, far from suppliers",
      "Harsh-duty consumables that need to actually hold up",
    ],
    angles: [
      "Pre-season stocking so they're ready when the window opens",
      "Heavy-duty / harsh-environment product fit (SIG 3000 grease eats heavy loads)",
      "Distance = you bringing the store to them is huge value",
    ],
    openers: [
      "\"When you're in-season, a down machine isn't an inconvenience — it's the whole week. Let's make sure a missing part never causes it.\"",
      "\"You're a haul from any decent supplier. What if the right parts were already on your shelf before you needed them?\"",
    ],
    demoToSale: "Lean hard on seasonality and distance. Pre-season stocking program. The SIG 3000 hammer demo crushes it here — prove it survives heavy loads. Position yourself as their on-site store.",
  },
  {
    id: "healthcare",
    name: "Hospital / Healthcare / Lab",
    icon: "🏥",
    painPoints: [
      "Constant PPE / glove burn — running out is not an option",
      "Facilities & biomed teams need food-grade / NSF-safe lubricants & cleaners",
      "Compliance & consistency matter more than price",
    ],
    angles: [
      "PPE volume: gloves, safety glasses — recurring, high-turn, sticky",
      "NSF / food-grade certified chemicals for areas with contact requirements",
      "Facilities maintenance: hinges, fasteners, lubricants for an enormous building",
    ],
    openers: [
      "\"You go through gloves by the case — who keeps you from ever running out? I can make that one less thing you worry about.\"",
      "\"Your facilities team maintains a building that never closes. I keep that kind of operation stocked on the stuff they can't run out of.\"",
    ],
    demoToSale: "Lead with PPE volume as the recurring anchor, then expand into facilities chemicals (NSF-certified lubricants like All In One for indirect food/water contact). Reliability and compliance beat price here.",
  },
  {
    id: "carwash",
    name: "Car Wash / Detailing",
    icon: "🚗",
    painPoints: [
      "Constantly cleaning their own bays, equipment, and rigs",
      "Degreasers & cleaners burned daily — buying retail or inconsistent",
      "Equipment corrosion from constant water exposure",
    ],
    angles: [
      "Degreasers to clean their own wash bay and equipment",
      "Corrosion protection on constantly-wet equipment (water-resistant grease)",
      "Consistent supply of the cleaners they burn through",
    ],
    openers: [
      "\"You clean cars all day — but who keeps YOUR bay and equipment clean? I've got the degreasers for exactly that.\"",
      "\"Everything you own is soaked all day. Let me show you a grease that laughs at water and keeps your equipment from rusting out.\"",
    ],
    demoToSale: "Degreaser for their own bay is the obvious wedge. Then the SIG 3000 water-jar demo lands hard on anyone whose equipment lives in water — prove it stays put and blocks corrosion.",
  },
  {
    id: "precision-mfg",
    name: "Precision / Firearms / Machining",
    icon: "⚙️",
    painPoints: [
      "Heavy cleaning of parts (brake clean / solvents) between machining steps",
      "Cutting & tapping fluids directly affect tool life and finish",
      "Corrosion protection on finished metal parts",
    ],
    angles: [
      "Brake clean / solvent cleaners for parts degreasing (e.g. firearms mfg)",
      "Cutting & tapping fluids (Cut Cool) and MPL-50 for machining",
      "Penetrants, threadlockers, corrosion inhibitors on finished goods",
    ],
    openers: [
      "\"You're cleaning parts and cutting metal all day — both are places I can make your output better and your costs lower. Two minutes?\"",
      "\"Shops like yours burn through brake clean and cutting fluid. I can keep you stocked and probably outperform what you're running now.\"",
    ],
    demoToSale: "Lead with their highest-burn consumable (brake clean / cutting fluid). Cut Cool and MPL-50 are easy expansions. Tool life + finish quality is the ROI story for the floor; consolidation for the buyer.",
  },
  {
    id: "food-processing",
    name: "Food & Beverage Processing",
    icon: "🍽️",
    painPoints: [
      "Everything in contact areas must be food-grade / NSF certified",
      "Wash-down environments destroy ordinary lubricants & cause corrosion",
      "Line stoppages from a missing compliant consumable are costly",
    ],
    angles: [
      "Food-grade / NSF-certified lubricants and cleaners (All In One is NSF P1 / ANSI 61)",
      "Water- & corrosion-resistant products for wash-down zones",
      "Compliant consumables stocked line-side so production never stops",
    ],
    openers: [
      "\"In your plant, the wrong lubricant is a compliance problem, not just a maintenance one. I stock the food-grade stuff so you're never caught out.\"",
      "\"Wash-down kills normal grease. Let me show you something that survives water AND is rated for food contact.\"",
    ],
    demoToSale: "NSF certification is the door key. All In One (NSF P1/ANSI 61), WD-40 Specialist Food-Grade (NSF H1, -100°F to 400°F) and the K2 food-processing contact cleaner cover lube + electrical in contact zones. Compliance + uptime is the pitch — price is secondary when a failed audit shuts them down.",
  },
  {
    id: "facilities",
    name: "Facilities / Property / Institutional",
    icon: "🏢",
    painPoints: [
      "Huge building footprints, endless small maintenance tasks",
      "Squeaky doors, seized hardware, general upkeep across many rooms",
      "Multiple small vendors, no single accountable supplier",
    ],
    angles: [
      "Door hinges & hardware (HHS-K adhesive lubricant is purpose-built)",
      "One-stop consumables: lubricants, fasteners, sealants, cleaners, PPE",
      "Consolidate maintenance supply to one rep who just handles it",
    ],
    openers: [
      "\"How many squeaky doors and seized hinges are on your work order list right now? I've got the one product that actually fixes them for good.\"",
      "\"You maintain a building that never sleeps. Let me be the one rep who keeps your whole maintenance shelf stocked.\"",
    ],
    demoToSale: "HHS-K washer-stick demo is perfect for facilities — show it cling and outlast WD40. Then expand to the full maintenance shelf, add janitorial consumables (towels, soap, restroom care), and close with a FREE ORSY bin system + on-site rep service. The pitch is 'one rep, never run out' — ORSY is the lock-in.",
  },
  {
    id: "school-bus",
    name: "School Bus / Pupil Transport",
    icon: "🚌",
    painPoints: [
      "Zero tolerance for safety failures — buses carry kids",
      "Diesel DPF maintenance & emissions compliance",
      "Graffiti, stains, interior damage from daily passenger use",
    ],
    angles: [
      "Safety + compliance framing on every product",
      "DPF cleaning program (DPF Cleaner 5861014500) vs. outsourcing",
      "High-frequency reorders: graffiti remover, brake cleaner, hinge lube",
    ],
    openers: [
      "\"You're hauling kids every day — safety isn't a feature, it's the whole job. Let me be the rep who keeps your fleet compliant and on the road.\"",
      "\"DPF maintenance is mandatory on your diesels. I can set up a cleaning program that beats what you're paying to outsource.\"",
    ],
    demoToSale: "Lead with Service + Quality (the #1 buying drivers here). Ultrasonic leak tool (5861999001) on door/window seals is a killer door-opener. Push assortment/bin programs for high-turn consumables. Shop Set-Up package available.",
  },
  {
    id: "rv",
    name: "RV / Motorhome / Mobile Home",
    icon: "🚐",
    painPoints: [
      "Water intrusion / roof leaks → rot, mold, costly structural damage",
      "Hidden leaks (air, vacuum, refrigerant) hard to diagnose",
      "Body panel separation, delamination, road-vibration squeaks",
    ],
    angles: [
      "'Inspect → Prep → Bond → Fasten' complete roof/body workflow",
      "Ultrasonic leak detection before the customer finds the leak",
      "Color-matched Tek screws + Bond and Seal for OEM-look repairs",
    ],
    openers: [
      "\"One missed roof leak turns into thousands in structural damage. I've got the tool that finds it before your customer does.\"",
      "\"I keep RV shops stocked on the whole repair workflow — find the leak, prep it, bond it, fasten it. One rep, start to finish.\"",
    ],
    demoToSale: "Ultrasonic tool (5861999001) scanning seals is the wow demo — 'it pays for itself on the first catch.' Bundle Clean Prep + Bond and Seal (08901003) + Fix All + color-matched Tek screws as the full workflow.",
  },
  {
    id: "waste",
    name: "Waste Hauling / Recycling",
    icon: "♻️",
    painPoints: [
      "Heavy diesel routes → frequent DPF clogging, costly downtime",
      "Lug/wheel hardware seizes from debris, moisture, road film",
      "Hydraulic/hopper leaks = slip hazards & environmental violations",
    ],
    angles: [
      "Sell waste reduction TO a waste hauler (REFILLOmat 19618917) — perfect irony hook",
      "DPF cleaning program for heavy-route diesels (5861014500)",
      "CU 800 anti-seize on wheel hardware; TigerFlex gloves for hopper safety",
    ],
    openers: [
      "\"You're in the business of handling waste — so let me show you how to cut YOUR aerosol waste and save money doing it.\"",
      "\"Your trucks run heavy diesel routes all day. DPF clogging is killing your uptime — I fix that with a cleaning program.\"",
    ],
    demoToSale: "REFILLOmat refill demo + annual can-disposal savings math lands hard here. A/C coil cleaner (089376438) before/after foam demo. Würth Absorb side-by-side spill demo (absorbs 20x). CU 800 corroded-vs-treated hardware.",
  },
  {
    id: "forklift",
    name: "Forklift / Material Handling",
    icon: "🚜️",
    painPoints: [
      "Mobile techs / small shops are space-constrained — need compact assortments",
      "Diverse fleet (electric, LP, diesel) = broad product coverage needed",
      "Hose/clamp failures, battery issues, coolant leaks cause downtime",
    ],
    angles: [
      "'Everything in one box' — ZEBRA Clamp Mobile Assortment (19641207)",
      "Complete engine-service bundle (degreaser + RTV + dyes + threadlockers)",
      "Battery service kit for the growing electric-forklift segment",
    ],
    openers: [
      "\"Having the right clamp size on the truck eliminates a second trip. Let me show you the assortment that lives in your service vehicle.\"",
      "\"You service every kind of lift out there. I can cover the whole range from one box — want to see it?\"",
    ],
    demoToSale: "Open the ZEBRA mobile assortment box (19641207) in front of them — labeled compartments, full 8–90mm range, included 7mm driver. It sells itself visually. Justify the box premium with 'no second trip' downtime math.",
  },
];

/* ---------- ANGLE FINDER: don't-box-me-in tool ----------
   Any business consumes SOMETHING. This maps observable
   business traits -> what they likely burn -> the Würth hook.
   Reps tag a prospect and get instant angles, even for
   businesses with no obvious 'shop'. */
const ANGLE_FINDER = [
  { id: "metal", label: "Works with metal", icon: "🔩", needs: "Cutting/tapping fluids, threadlockers, penetrants, anti-seize, abrasives", hook: "Tool life, clean threads, parts that come apart later. Cut Cool / MPL-50 / All In One." },
  { id: "vehicles", label: "Runs or fixes vehicles", icon: "🚙", needs: "Brake clean, grease, fasteners, shop chemicals, PPE", hook: "Uptime + never walking to the parts store. SIG 3000 for heavy loads, HHS-K for hinges." },
  { id: "washes", label: "Cleans things / wet environment", icon: "💧", needs: "Degreasers, cleaners, water-resistant grease, corrosion inhibitors", hook: "Clean their own equipment + stop corrosion. SIG 3000 water demo lands hard." },
  { id: "foodsafe", label: "Food / drink / medical contact", icon: "🥫", needs: "NSF / food-grade lubricants & cleaners, PPE/gloves", hook: "Compliance is non-negotiable. All In One is NSF P1 / ANSI 61. Lead with the cert." },
  { id: "building", label: "Maintains a building / facility", icon: "🚪", needs: "Hinge lube, fasteners, sealants, general MRO, PPE", hook: "Endless small fixes, one supplier. HHS-K for every squeaky door." },
  { id: "heavyload", label: "Heavy equipment / high load", icon: "🏋️", needs: "Impact grease, heavy-duty lubricants, harsh-duty consumables", hook: "Stuff that survives pounding. SIG 3000 hammer demo = instant believer." },
  { id: "crews", label: "Sends crews off-site", icon: "🦺", needs: "Truck/trailer stocking, all-in-one products, PPE", hook: "Nobody leaves the job. All In One replaces a shelf of sealants on the truck." },
  { id: "highppe", label: "Burns through PPE / gloves", icon: "🧤", needs: "Gloves, safety glasses, recurring PPE", hook: "Sticky recurring revenue. Anchor the account on PPE, expand from there." },
  { id: "partswash", label: "Washes parts / handles solvent waste", icon: "♻️", needs: "Parts washer, bioremediating fluid, no-hazmat cleaning", hook: "SmartWasher microbes eat the grease — ZERO hazardous waste. Kills hauler fees + EPA burden. OzzyJuice/OzzyMat are recurring razor-blades." },
  { id: "foodgrade", label: "Makes / packages food or drink", icon: "🍪", needs: "NSF H1/K2 food-grade lubes & contact cleaners, audit-safe MRO", hook: "WD-40 Specialist Food-Grade is NSF H1 (-100°F to 400°F). Lead with the cert — a failed audit is way more expensive than the product." },
  { id: "restrooms", label: "Has restrooms / breakrooms / public space", icon: "🧼", needs: "Janitorial: towels, soap, sanitizer, restroom care, can liners", hook: "Add recurring consumable revenue to any account that buys tools/fasteners. Purell + Clorox ToiletWand unlock schools/healthcare/facilities." },
  { id: "inventory", label: "Wastes time managing inventory / stockouts", icon: "📦", needs: "ORSY bins, on-site rep service, SIS usage billing, VMI", hook: "Free ORSY bin system + a rep who restocks for you = 'an extra employee without the expense.' Strong lock-in; SIS even turns parts usage into a billable profit center." },
];

/* ---------- PROSPECTING PLAYBOOK ---------- */
const PLAYBOOK = [
  {
    title: "Find Your Ideal Targets",
    steps: [
      "Drive your territory with eyes open: every shop, plant, and contractor yard is a prospect.",
      "Prioritize businesses that BURN consumables daily — repair, fleet, production, construction.",
      "Note the ones Speedy shows nearby existing customers — neighbors of happy customers convert.",
      "Bigger isn't always better. A mid-size shop with a decisive owner beats a slow corporate buyer.",
    ],
  },
  {
    title: "Do 5 Minutes of Homework",
    steps: [
      "What do they make/fix/build? That tells you what they consume.",
      "Who's the decision-maker — owner, shop foreman, purchasing? Aim for who feels the pain.",
      "Any visible signals: fleet size, crew size, what's on the racks, what brand they use now.",
      "Have ONE specific angle ready before you walk in. Generic = forgettable.",
    ],
  },
  {
    title: "The Opening Move",
    steps: [
      "Lead with THEIR problem, not your catalog. Pain first, product second.",
      "Earn 2 minutes, not the whole sale. Low ask, high curiosity.",
      "Get to the person who feels the pain — don't pitch the front-desk gatekeeper, befriend them.",
      "Always leave with a next step: a callback time, a sample drop, a demo date.",
    ],
  },
  {
    title: "The Follow-Up (where deals are actually won)",
    steps: [
      "Most reps quit after one touch. Winners touch 5+ times. Set the next touch BEFORE you leave.",
      "Bring value each touch — a sample, a tip, a relevant battle card — not just 'checking in.'",
      "Log every interaction immediately. Memory lies; notes don't.",
      "Persistence ≠ pestering. Be useful, be consistent, be the rep they think of first.",
    ],
  },
];

/* ---------- OBJECTION HANDLING: they said X -> you say Y ---------- */
const OBJECTIONS = [
  {
    objection: "We already have a supplier.",
    tags: ["supplier", "happy", "current"],
    response: "\"Good — that means you know the value of a reliable one. I'm not asking you to fire anyone. I'm asking for one product line to prove I show up, I stock you right, and I make your day easier. If I don't, you've lost nothing.\"",
    why: "You're not attacking their relationship; you're asking for a low-risk trial on a single line. Foot in the door beats frontal assault.",
  },
  {
    objection: "We're happy with what we've got.",
    tags: ["happy", "satisfied"],
    response: "\"Love that. Most of my best customers said the exact same thing — until they saw what 'never running out' actually feels like. Can I show you one thing that might make 'happy' into 'wouldn't go back'?\"",
    why: "Acknowledge, don't argue. Reframe satisfaction as a ceiling you can raise. Curiosity gap, not a confrontation.",
  },
  {
    objection: "Your price is too high.",
    tags: ["price", "expensive", "cost"],
    response: "\"Fair — on the sticker, maybe. But what's it cost when your tech walks to the parts store, or the line stops because you ran out? I sell uptime, not just parts. Let's look at the real number.\"",
    why: "Never defend price head-on. Shift from unit price to total cost — downtime, labor, consistency. You sell outcomes.",
  },
  {
    objection: "I don't have time right now.",
    tags: ["time", "busy", "later"],
    response: "\"Totally get it — you're running a business, not waiting for me. Give me 90 seconds now, or tell me the best 10 minutes this week and I'll be back, prepared, and out fast.\"",
    why: "Respect their time, shrink the ask, and ALWAYS pin a concrete next step. 'I'll stop back' is where deals die.",
  },
  {
    objection: "Just leave a catalog / send me info.",
    tags: ["catalog", "info", "brushoff"],
    response: "\"I could — but a catalog won't tell me what YOU actually burn through. Give me one problem you hit this month and I'll come back with the exact fix, not 800 pages you'll never open.\"",
    why: "The catalog brush-off is a polite no. Don't take the exit — trade it for one piece of real info that keeps you in the conversation.",
  },
  {
    objection: "I'm not the decision-maker.",
    tags: ["decision", "authority", "boss"],
    response: "\"No problem — who is? And while I've got you: you're the one who actually uses this stuff. If it makes YOUR day easier, you're exactly who I want in my corner when I talk to them. Mind introducing me?\"",
    why: "Turn the gatekeeper into an internal champion. The user of the product is your ally even when they can't sign.",
  },
  {
    objection: "We tried Würth/you guys before and it didn't work out.",
    tags: ["past", "history", "before", "burned"],
    response: "\"I appreciate you telling me — and I'm sorry it left a bad taste. I'd rather earn it back than pretend it didn't happen. Tell me what went wrong, and let me own fixing it. That's literally my job now.\"",
    why: "Don't get defensive about history you didn't create. Own it, get the specifics, and position yourself as the reset.",
  },
  {
    objection: "Call me back next quarter / not in the budget.",
    tags: ["budget", "later", "quarter", "timing"],
    response: "\"Done — I'll mark it. But let's not start from zero then. Let me set you up with a sample now so when budget opens, you already know it works. Deal?\"",
    why: "Accept the timing, but plant something that makes the future call warm instead of cold. Keep momentum across the gap.",
  },
];

/* ---------- COLD CALL COCKPIT: live-call structure ---------- */
const CALL_FLOW = [
  {
    phase: "Open (first 15 seconds)",
    cue: "Pattern interrupt + earn a moment",
    script: "\"Hey, I know you didn't ask me to stop by — I'll be quick. I work with shops like yours on keeping the right parts on the shelf so your guys never stop working. Who handles that stuff here?\"",
    tip: "Confidence > script. Smile, be human, lead with their world.",
  },
  {
    phase: "Diagnose (find the pain)",
    cue: "Ask, then shut up and listen",
    script: "\"What's the thing you run out of at the worst possible time?\" / \"How often does someone leave to grab a part you wish you'd had?\"",
    tip: "The rep who asks the best question wins. Let them tell you the angle.",
  },
  {
    phase: "Bridge (connect pain to fix)",
    cue: "Mirror their words back",
    script: "\"So if I'm hearing you — running out of [their item] costs you real time. That's exactly the thing I fix. Here's how...\"",
    tip: "Use THEIR language. People buy when they feel understood, not pitched.",
  },
  {
    phase: "Micro-commit (the small yes)",
    cue: "Low-risk next step, not the close",
    script: "\"Let's not boil the ocean. Let me set you up on one line — [their pain item]. If I deliver, we grow. If I don't, you walk. Fair?\"",
    tip: "Land a small yes today. The big yes comes after you prove yourself.",
  },
  {
    phase: "Lock the next step",
    cue: "Never leave without one",
    script: "\"I'll drop a sample Thursday and check the bin. Best time — morning or afternoon?\"",
    tip: "A specific next touch is the difference between a lead and a lost cause.",
  },
];

/* ---------- METHODOLOGY PREVIEW (Iteration 2 groundwork) ----------
   Grounded in Würth's own training: Phil M. Jones,
   "How to Persuade and Get Paid." This is a PREVIEW stub for
   the demo — the full guided course is built in Iteration 2. */
const METHODOLOGY_PREVIEW = [
  {
    title: "The 9 Levels of Success",
    steps: [
      "1. Give a good representation of yourself & your company — help the PERSON before the PROBLEM.",
      "2. Build rapport with emotion + logic — smile, use their name, and LISTEN (the letters spell SILENT).",
      "3. Create a genuine opportunity — Questions → Conversations → Relationships → Opportunities → Sales.",
      "4. Give enough info to decide — value before price (so value looks bigger); say 'investment,' not 'cost.'",
      "5. Gain a positive decision — if you don't ask, you don't get. Master the 7 closes.",
      "6. Establish future opportunities — what else, what next, who else can they introduce you to?",
      "7. Schedule the next action — when, exactly, will it be?",
      "8 & 9. Ask for — and get — referrals, at every moment they show gratitude.",
    ],
  },
  {
    title: "Overcoming Objections (6 steps)",
    steps: [
      "1. Clarify: 'What makes you say that?'",
      "2. Agree and/or apologize.",
      "3. Find out if there are other objections.",
      "4. Hear their objection positively.",
      "5. Respond with what you CAN do.",
      "6. Close with a summary or a condition.",
    ],
  },
  {
    title: "Principles to live by",
    steps: [
      "\"A story will always sell, whereas a fact will only tell.\"",
      "\"Selling is earning the right to make a recommendation.\"",
      "\"The sweetest sound to any person is the sound of their own name.\"",
      "\"Every time you miss, you still contribute to your score.\" — action always counts.",
      "\"Quite often the work you do today does not pay today.\" — sales is a process.",
    ],
  },
];

/* ---------- PRE-CALL CHECKLIST ---------- */
const PRECALL = [
  "Do I know what this business makes/fixes/builds?",
  "Do I have ONE specific angle for them (not a generic pitch)?",
  "Who am I trying to reach — and who feels the pain?",
  "What's my low-risk ask (the small yes I want today)?",
  "Do I have a sample or battle card relevant to them in hand?",
  "What's my planned next step if they say 'not now'?",
  "Head right, smile on. They can hear the difference.",
];
