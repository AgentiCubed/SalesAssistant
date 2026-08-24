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
    id: "auto-body",
    icon: "🚗",
    name: "Collision & Auto Body",
    painPoints: [
      "Dust contamination killing paint jobs",
      "Clip / fastener stockouts slowing assembly",
      "Techs grabbing cheap tape that leaves residue",
      "Seam sealer cure time backing up the booth",
    ],
    angles: [
      "Seam sealer demo: faster skin time = car in paint today, not tomorrow.",
      "Abrasives cost-per-panel story: Würth discs cut 2x longer, fewer changes.",
      "Body clip assortment: stop waiting on dealer parts for $0.50 retainers.",
    ],
    openers: [
      "\"Hey — who handles your shop supplies and paint prep materials?\"",
      "\"Quick question: how many times a week are your teardown guys waiting on OEM clips?\"",
    ],
    demoToSale: "Pull out the seam sealer or abrasive disc. Put it in the tech's hand. Let them feel the flex / grit.",
  },
  {
    id: "heavy-duty-fleet",
    icon: "🚛",
    name: "Heavy-Duty & Fleet",
    painPoints: [
      "DOT compliance panic — air brake leaks, lighting, reflective tape",
      "Corrosion eating electrical connectors in winter",
      "Hydraulic fittings blowing under load",
      "Shop towels / brake clean disappearing like water",
    ],
    angles: [
      "Heat-shrink terminals + dual-wall tubing = no road-salt comebacks.",
      "Grade 8 fastener bins — labeled, organized, never scavenged.",
      "Heavy-duty grease (SIG 3000): takes pounding shock load, won't splatter.",
    ],
    openers: [
      "\"Morning — who runs the service bays for the fleet?\"",
      "\"Noticed three rigs in the yard. What's your biggest headache keeping them on the road?\"",
    ],
    demoToSale: "The grease-hammer demo: half-dollar of SIG 3000 on a plate, hit it with a mallet. It doesn't splatter.",
  },
  {
    id: "ag-equipment",
    icon: "🚜",
    name: "Agriculture & Equipment",
    painPoints: [
      "Seasonal rush: planting/harvest downtime is $1,000s/hr",
      "Pins, bushings, and PTO shafts seizing from dirt + pressure",
      "Hydraulic cylinder seals failing in the field",
      "Rust welding everything together over winter",
    ],
    angles: [
      "Rost Off Max Ice: thermal shock freezes rust, breaks seized bolts cold.",
      "HHS-K: sprays as oil, sets as adhesive grease that won't fling off.",
      "Bulk cutting discs: farmer needs 20 at a time, priced right.",
    ],
    openers: [
      "\"Hey there — is the service manager around?\"",
      "\"Harvest is coming up. What's the one fastener or chemical you ran out of last year that pissed everybody off?\"",
    ],
    demoToSale: "Spray Rost Off on a seized bolt in their scrap pile. Watch the freeze crack the rust.",
  },
  {
    id: "general-auto-repair",
    icon: "🔧",
    name: "Independent Auto Repair",
    painPoints: [
      "Multiple parts-store drivers dropping off mixed-quality junk",
      "Techs wasting 15 min per job hunting for copper washers / crush washers",
      "Brake clean running out mid-afternoon",
      "Aerosol cans that die with 20% product left inside",
    ],
    angles: [
      "All-In-One DOS bottle: threadlocker, pipe sealant, flange sealant, bearing mount in one can.",
      "Brake clean bulk / refill program: save 30% vs parts store cans.",
      "Copper anti-seize + brake paste: professional finish, zero squeak comebacks.",
    ],
    openers: [
      "\"Hey — who's the owner or lead tech here?\"",
      "\"I'm with Würth. Not here to sell you a catalog — just want to show you one chemical that clears 4 cans off your shelf.\"",
    ],
    demoToSale: "Show the All-In-One DOS bottle. Explain how one product replaces Loctite blue, red, pipe thread, and sleeve retainer.",
  },
  {
    id: "municipality-schools",
    icon: "🚌",
    name: "School Bus & Municipal Fleet",
    painPoints: [
      "State inspection deadlines — zero tolerance on rust, lights, seat tears",
      "Tight budgets, slow PO processes, need reliable vendors on state contract",
      "Vandalism repair (seats, windows, graffiti)",
      "DEF-system corrosion and electrical gremlins",
    ],
    angles: [
      "Seat repair tape & vinyl adhesive: pass inspection without buying whole seats.",
      "Dielectric grease + sealed connectors: eliminate intermittent lighting faults.",
      "DEF-safe cleaners: protect sensitive emissions sensors.",
    ],
    openers: [
      "\"Hi — looking for the transportation director or head mechanic.\"",
      "\"State inspection cycle coming up? What's usually the biggest punch-list headache?\"",
    ],
    demoToSale: "Show the vinyl repair kit on a torn bus seat in the back lot. 2-minute fix, looks OEM.",
  },
  {
    id: "manufacturing-mro",
    icon: "🏭",
    name: "Manufacturing / Plant MRO",
    painPoints: [
      "Line downtime: $500–$5,000/minute while maintenance scrambles",
      "OSHA / safety compliance: lockout-tagout, chemical SDS sheets, eye wash",
      "Vending / inventory bloat: 10 different brands of drill bits that all snap",
      "Food-grade (H1/NSF) compliance if food/bev plant",
    ],
    angles: [
      "Cobalt drill bits: cuts stainless without work-hardening or snapping.",
      "NSF P1/H1 registered chemicals: food-contact safe, fully documented.",
      "Standardized fastener storage: visual Kanban bin management.",
    ],
    openers: [
      "\"Hi — looking for the plant maintenance supervisor or MRO buyer.\"",
      "\"What's your most common maintenance call that stops the line?\"",
    ],
    demoToSale: "Drill a hole through a piece of stainless steel with a cobalt bit. Compare time vs their standard HSS bit.",
  },
  {
    id: "car-wash",
    icon: "🚿",
    name: "Car Washes & Detailers",
    painPoints: [
      "High humidity + reclaimed water corrodes conveyor chains, bearings, motors",
      "Chemical staining on customer cars = liability claims",
      "High-pressure hose fittings failing under constant cycling",
      "Detailers using 6 different chemicals to clean wheels, glass, interior",
    ],
    angles: [
      "SIG 3000 grease: 100% water resistant, won't wash out of conveyor bearings.",
      "ECO Super Spray All: one green concentrate replaces 4 detail chemicals.",
      "Stainless hardware: zero rust in wet tunnel environments.",
    ],
    openers: [
      "\"Hey — is the general manager or facilities guy around?\"",
      "\"Tunnel maintenance is brutal on bearings. What grease are you pumping into the conveyor right now?\"",
    ],
    demoToSale: "The water jar test: drop SIG 3000 in a jar of water, shake it up. Grease stays solid, water stays clear.",
  },
  {
    id: "hvac-plumbing",
    icon: "❄️",
    name: "HVAC & Mechanical Contractors",
    painPoints: [
      "Refrigerant / gas leaks on pipe threads under thermal cycling",
      "Rusty condenser bolts rounding off during service calls",
      "Sheet metal screws stripping out in thin ductwork",
      "Van inventory chaos: techs buying overpriced hardware at big-box stores",
    ],
    angles: [
      "Pipe Sealant w/ PTFE: locks and seals instantly, no tape shred in valves.",
      "Self-drilling sheet metal screws with non-walking tips.",
      "Van bin restocking: keep your techs out of Home Depot.",
    ],
    openers: [
      "\"Morning — who manages the service vans or warehouse inventory?\"",
      "\"How much time do your guys waste running to the supply house for small hardware?\"",
    ],
    demoToSale: "Drive a Würth self-driller into heavy gauge sheet metal in 2 seconds flat, no center punch.",
  },
  {
    id: "landscaping-tree",
    icon: "🌲",
    name: "Landscaping & Tree Service",
    painPoints: [
      "Chainsaw / chipper vibration rattling bolts loose constantly",
      "2-stroke carb gumming and ethanol fuel issues",
      "Blades dulling fast on sandy turf",
      "Hydraulic lines on mowers / skid steers rubbing through",
    ],
    angles: [
      "Threadlocker blue (DOS bottle): stop losing deck bolts and muffler screws.",
      "Carb & choke cleaner (high-KB solvency): cleans varnish in seconds.",
      "Hose-protective spiral wrap + heavy grease for mower spindles.",
    ],
    openers: [
      "\"Hey — who keeps the mowers and equipment running around here?\"",
      "\"Vibration shakes everything loose on these commercial decks. What threadlocker are you using?\"",
    ],
    demoToSale: "Show the DOS bottle: one hand, no drips, exact drop onto a deck bolt.",
  },
  {
    id: "rv-powersports",
    icon: "🏕️",
    name: "RV & Powersports Dealers",
    painPoints: [
      "RV roof seam leaks = massive warranty chargebacks",
      "Dissimilar metal corrosion on trailers (aluminum skin + steel frame)",
      "Techs stripping aluminum threads on powersports engines",
      "Detail bay using harsh chemicals that haze polycarbonate windshields",
    ],
    angles: [
      "Bond and Seal: permanently elastic polyurethane roof seam sealer.",
      "Time-Sert thread repair: stronger than original threads in aluminum.",
      "Plastic-safe cleaners & dielectric grease for powersports wiring.",
    ],
    openers: [
      "\"Hi — looking for the service director or prep manager.\"",
      "\"What's your #1 warranty comeback on the RV side? Roof seams?\"",
    ],
    demoToSale: "Show a cured bead of Bond and Seal. Stretch it 400% — it flexes, silicone tears.",
  },
  {
    id: "waste-hauling",
    icon: "🗑️",
    name: "Waste & Recycling Haulers",
    painPoints: [
      "Packer blade pins & hinges under continuous brutal hydraulic pressure",
      "Leachate corrosion rotting hydraulic lines, electrical, frame bolts",
      "Tire / wheel stud failures from constant curb-rubbing and heavy loads",
      "Worst working conditions: grime, smell, continuous duty",
    ],
    angles: [
      "SIG 3000 grease: highest Timken load rating, handles packer blade shock.",
      "CU 800 Copper Anti-Seize: wheel studs come off without torches or impact breakage.",
      "Heavy-duty penetrant & degreaser: cuts through leachate sludge.",
    ],
    openers: [
      "\"Morning — looking for the fleet maintenance superintendent.\"",
      "\"Packer blades are the hardest working pins in the county. What grease are you using that actually stays in the bushing?\"",
    ],
    demoToSale: "The hammer demo. Hit SIG 3000 on a plate — show it absorbing the shock load without squeezing out.",
  },
  {
    id: "firearms-defense",
    icon: "🎯",
    name: "Gunsmiths, Ranges & Defense",
    painPoints: [
      "Carbon fouling baking onto bolt carrier groups and suppressors",
      "Optic mount screws vibrating loose under recoil",
      "Corrosion from humidity, sweat, and caustic powders",
      "Harsh chemicals damaging anodized aluminum, Cerakote, or polymer frames",
    ],
    angles: [
      "Threadlocker blue (DOS): precise single-drop for optic screws, no drip on glass.",
      "Brake/parts cleaner + synthetic gun lube: removes carbon without stripping finishes.",
      "Rust-inhibiting dry-film lube for magazines and trigger groups.",
    ],
    openers: [
      "\"Hey — who does the custom builds and armorer work here?\"",
      "\"Optic screws backing out under recoil? I've got the exact low-viscosity threadlocker precision armorers use.\"",
    ],
    demoToSale: "Show the DOS bottle: single drop accuracy on a tiny #6-48 scope base screw.",
  },
  {
    id: "hospitals-institutions",
    icon: "🏥",
    name: "Hospitals & Care Facilities",
    painPoints: [
      "Low odor / VOC regulations: can't use smelly solvents around patients",
      "24/7 HVAC, plumbing, emergency generator maintenance",
      "Strict sanitization and safety audit documentation",
      "Wheelchairs, gurneys, automatic doors needing clean, non-greasy lube",
    ],
    angles: [
      "ECO-line cleaners: zero VOC, zero harsh fumes, safe in occupied spaces.",
      "Clear silicone & food-grade lubes: clean, odorless, non-staining.",
      "Complete organized fastener & hardware storage for the maintenance shop.",
    ],
    openers: [
      "\"Hi — looking for the director of facilities or plant operations.\"",
      "\"I know you've got strict air quality and low-VOC requirements. We have a full certified green MRO chemical line.\"",
    ],
    demoToSale: "Spray ECO Super Spray All — let the facility director smell that there are zero chemical fumes.",
  },
  {
    id: "heavy-towing-recovery",
    icon: "🪝",
    name: "Towing & Recovery Operators",
    painPoints: [
      "Winch cables rusting from inside out under road spray",
      "Boom pins, pivot bushings under massive shock loads during rollovers",
      "Wheel lift cylinders exposed to road salt all winter",
      "Emergency lighting electrical failures at 2:00 AM on the highway",
    ],
    angles: [
      "HHS-K: penetrates winch cable strands, then turns into protective grease.",
      "Heat shrink electrical kit: road-salt proof wiring for light bars and strobes.",
      "SIG 3000: boom pins stay lubed under max recovery loads.",
    ],
    openers: [
      "\"Hey — who keeps the wreckers and rotators serviced?\"",
      "\"Road salt eats wrecker wiring alive. How many times a winter are your guys re-doing light bar connections?\"",
    ],
    demoToSale: "Submerge a heat-shrink butt connector in a glass of salt water with a light bulb circuit running through it.",
  },
];

/* ---------- ANGLE FINDER: non-obvious hooks ---------- */
const ANGLE_FINDER = [
  {
    id: "hospital",
    icon: "🏥",
    label: "Hospital / Healthcare",
    needs: "HVAC filters, low-VOC degreasers, plumbing seals, gurney/wheelchair lube, electrical hardware, cleanroom wipe-downs.",
    hook: "\"You've got 200 doors, 50 gurneys, and 4 air handlers that cannot squeak or fail. Who keeps the physical plant running?\"",
  },
  {
    id: "carwash",
    icon: "🚿",
    label: "Car Wash",
    needs: "Water-proof grease (SIG 3000), stainless fasteners, foaming chemicals, hose fittings, high-pressure pump seals.",
    hook: "\"Reclaimed water is chewing up your conveyor bearings. Let me show you a grease that literally cannot be washed off with water.\"",
  },
  {
    id: "gunshop",
    icon: "🎯",
    label: "Gunsmith / Range",
    needs: "Precision threadlockers (DOS bottle), carbon solvents, rust preventatives, Cerakote-safe degreasers, safety glasses/PPE.",
    hook: "\"Optic screws vibrate loose. One drop of DOS blue on a #6 screw locks it cold — zero drip on the glass or finish.\"",
  },
  {
    id: "brewery",
    icon: "🍺",
    label: "Brewery / Cidery",
    needs: "NSF H1 food-grade lubricants, stainless steel fasteners, washdown-rated sealants, hose clamps, CIP maintenance chemicals.",
    hook: "\"Everything that touches product has to be NSF registered. We have the full line of food-grade lubes with instant SDS documentation.\"",
  },
  {
    id: "school",
    icon: "🏫",
    label: "School / College",
    needs: "Bus fleet PM, custodial chemicals, HVAC maintenance, locker/desk fasteners, athletic equipment hardware, turf mower lube.",
    hook: "\"Between the bus garage and campus facilities, you burn through thousands in hardware and penetrants. Let's look at a standardized bin setup.\"",
  },
  {
    id: "dairy",
    icon: "🥛",
    label: "Dairy / Ag Farm",
    needs: "Manure pump grease, milker vacuum pump lube, tractor hydraulic fittings, extreme rust penetrants, heavy-duty electrical wire shrink.",
    hook: "\"Manure and silage acid eats standard grease in 48 hours. SIG 3000 is acid-resistant and stays in the pin under 65,000 PSI.\"",
  },
  {
    id: "woodshop",
    icon: "🪵",
    label: "Woodworking / Furniture",
    needs: "Carbide/cobalt blades, wood adhesives, dust-resistant dry lubes for planer tables, pneumatic nailer O-ring oil, respirator PPE.",
    hook: "\"Sawdust clings to wet lube and jams drawer slides. Our dry PTFE lube creates a slick surface that dust literally slides off of.\"",
  },
  {
    id: "solar",
    icon: "☀️",
    label: "Solar / Electrical Contractor",
    needs: "Stainless & galvanized racking hardware, UV-rated cable ties, roof penetrant sealants (Bond and Seal), dielectric compounds, conduit hardware.",
    hook: "\"Roof racking brackets have to survive 25 years of Vermont winters. Bond and Seal flexes with thermal shock and never cracks.\"",
  },
  {
    id: "towing",
    icon: "🪝",
    label: "Wrecker / Towing",
    needs: "Winch cable lube (HHS-K), salt-proof heat shrink terminals, high-impact boom grease, strobe wiring, grade 70 transport chain hardware.",
    hook: "\"Winter salt spray rots wrecker light bars from the inside. Dual-wall heat shrink with internal sealant makes connections 100% waterproof.\"",
  },
  {
    id: "golf",
    icon: "⛳",
    label: "Golf Course Maintenance",
    needs: "Reel mower grinding abrasives, hydraulic leak check dyes, bedknife screws, high-moisture spindle grease, irrigation hardware.",
    hook: "\"A hydraulic leak on a green is a $10,000 disaster. Our high-pressure line checks and pure synthetic grease protect your turf equipment.\"",
  },
  {
    id: "marina",
    icon: "⚓",
    label: "Marina / Boat Repair",
    needs: "Marine polyurethane sealant (Bond and Seal), 316 stainless hardware, corrosion-inhibiting battery terminal spray, salt-wash degreasers.",
    hook: "\"Silicone fails below the waterline. Bond and Seal permanently bonds fiberglass and aluminum with 400% elastic elongation.\"",
  },
  {
    id: "waste",
    icon: "🗑️",
    label: "Waste & Transfer Station",
    needs: "Packer blade shock grease (SIG 3000), hydraulic cylinder rebuild seals, heavy degreasers, anti-seize wheel stud compound.",
    hook: "\"Packer blade pins take more pounding than anything in the state. If your grease is squeezing out on the first cycle, you're wearing out pins.\"",
  },
];

/* ---------- PROSPECTING PLAYBOOK ---------- */
const PLAYBOOK = [
  {
    title: "Step 1: The Observation Walk-In",
    steps: [
      "Park facing the shop so you can observe the bays before walking in.",
      "Look at the scrap pile, the trash bins, and the delivery staging area.",
      "Spot the pain point: Rusted rotors? Empty chemical cans? Messy bolt bins?",
      "Walk straight past the front desk towards the service desk or shop floor with purpose (clipboard or sample in hand).",
      "Do NOT ask: \"Are you the person who buys things?\" (They will say no or brush you off).",
      "DO ask: \"Who runs the service bays back here?\" or \"Who keeps these machines running?\"",
    ],
  },
  {
    title: "Step 2: The Disarming Opener",
    steps: [
      "Use the magic phrase: \"I'm not sure if this is for you, but...\"",
      "State what you noticed: \"I saw two trucks in bay 2 with the wheels off...\"",
      "Offer immediate, specific value: \"...and I wanted to leave one can of a freeze penetrant that breaks seized studs in 30 seconds so your techs don't have to torch them.\"",
      "Hand them the physical product. When their hands are holding the can, their attention is 100% on you.",
    ],
  },
  {
    title: "Step 3: The 60-Second Physical Demo",
    steps: [
      "Never describe what a product does. Show it.",
      "For Grease: The Hammer Impact Test. Mallet hits grease on a plate — zero splatter.",
      "For HHS-K: The Washer Cling Test. Spray on washer, stick to vertical metal — stays put.",
      "For Rost Off: The Cold Shock Test. Spray seized bolt — watch the frost crack the rust.",
      "For Bond and Seal: The Elastic Pull. Hand them the rubber coupon and let them try to tear it.",
    ],
  },
  {
    title: "Step 4: The Low-Risk Trial Close",
    steps: [
      "Ask an open-minded question: \"How open-minded would you be to testing one case in bay 1 for the next two weeks?\"",
      "Remove all friction: \"If the lead tech tells you it didn't save them 20 minutes a day, I'll take the rest back and tear up the invoice.\"",
      "Lock down the review date: \"I'm back through here next Tuesday at 10:00 AM. I'll check in with Dave in bay 1 to see how it worked.\"",
    ],
  },
];

/* ---------- OBJECTION HANDLING DATABASE ---------- */
const OBJECTIONS = [
  {
    objection: "\"We're happy with our current supplier (NAPA / Fastenal / Lawson).\"",
    response: "\"That's great — you shouldn't switch from a supplier that treats you well. I'm not asking you to change vendors today. Most of our best accounts buy 90% of their stuff from their main house, but they use us for 2 or 3 specialized problem-solvers that save their techs an hour of teardown time. Could I show you the one chemical they keep in bay 1?\"",
    why: "Validates their loyalty, removes the threat of a full vendor change, and narrows the sale to a single high-margin problem solver (the Trojan Horse).",
    tags: ["supplier", "happy", "vendor", "napa", "fastenal", "lawson"],
  },
  {
    objection: "\"Your prices are too high / Würth is too expensive.\"",
    response: "\"Compared to a parts store aerosol can, you're 100% right on the upfront ticket. But what does a bay hour cost in your shop — $135? If a tech spends 20 minutes with a torch and snapping a stud with a cheap penetrant, that $4 can just cost you $60 in lost shop labor. If our product breaks it in 30 seconds on the first try, which can actually cost you less?\"",
    why: "Reframes unit price into total labor cost and bay downtime. Shop owners understand labor dollars.",
    tags: ["price", "expensive", "cost", "cheap", "budget", "money"],
  },
  {
    objection: "\"I don't have time to talk right now / We're swamped.\"",
    response: "\"I can see the bays are backed up — I will get out of your hair in 30 seconds. Take this can of Rost Off Ice and give it to your lead tech on the nastiest rusted exhaust job today. I'm back in town Thursday morning at 9:00 AM — I'll pop in for 60 seconds to see if it saved him time. Fair enough?\"",
    why: "Respects their time, leaves a high-impact sample behind, and establishes a specific permission-based follow-up milestone.",
    tags: ["time", "busy", "swamped", "later", "not now"],
  },
  {
    objection: "\"We buy everything through corporate / HQ handles purchasing.\"",
    response: "\"Completely understand — corporate handles the big supply contracts. But who decides what tools and consumables the techs need when an emergency job is stalled in the bay? Usually the shop foreman has discretionary budget for shop supplies. What's the one item corporate never sends enough of?\"",
    why: "Distinguishes between national contracts and local shop-level discretionary consumable budgets.",
    tags: ["corporate", "hq", "purchasing", "po", "contract"],
  },
  {
    objection: "\"Just leave a catalog / business card and I'll look it over.\"",
    response: "\"I'd be happy to leave a card, but honestly, catalogs are 1,000 pages of parts you don't need. What is the single most frustrating bolt or chemical failure your guys had this week? I'll dog-ear the exact one page that solves it so you don't waste 10 minutes looking.\"",
    why: "Stops the brush-off and forces them to name a specific pain point.",
    tags: ["catalog", "card", "leave information", "flyer"],
  },
  {
    objection: "\"We don't need anything today.\"",
    response: "\"I'd be surprised if you did — I just walked in the door! But let me ask you: when was the last time you ran out of a $0.50 copper washer or clip right in the middle of finishing a car for a customer at 4:30 PM?\"",
    why: "Brings up the universal nightmare of stockouts on low-cost hardware halting billable deliveries.",
    tags: ["don't need", "nothing", "good", "set"],
  },
  {
    objection: "\"My techs don't like trying new stuff.\"",
    response: "\"Techs hate gimmicks that don't work — they're trying to beat book time. Let me do this: let me spray this on that scrap hub over there and let your most skeptical tech take a wrench to it. If he doesn't like it, I'll walk out right now.\"",
    why: "Enlists the skeptical tech as the judge. When the tech approves, the owner buys.",
    tags: ["techs", "mechanics", "new", "change"],
  },
  {
    objection: "\"We already have a full fastener bin system.\"",
    response: "\"That's awesome. Who stocks it for you — do you have to do inventory counts yourself, or does a rep come in, clean the drawers, and barcode them so you never have stockouts? How often do you find mixed bolts in the same drawer?\"",
    why: "Attacks the hidden labor cost of messy, unmanaged competitor bin systems.",
    tags: ["bins", "fasteners", "drawers", "stock", "hardware"],
  },
];

/* ---------- COLD CALL COCKPIT (live call talk tracks) ---------- */
const CALL_FLOW = [
  {
    phase: "Phase 1: The Parking Lot Scan",
    cue: "Before you touch the door handle",
    script: "Spot 2 specific details: What vehicle makes are in the bays? Is the yard clean or muddy? Are technicians searching for parts or turning wrenches?",
    tip: "Your opening line must reference something you just observed in their yard or bay.",
  },
  {
    phase: "Phase 2: The Door Open & Navigation",
    cue: "Walking inside",
    script: "\"Morning! Who keeps the bays running back here?\" (Walk with steady pace toward service/shop area).",
    tip: "Never ask the receptionist if the 'owner' is available — ask for the person in charge of service or fleet.",
  },
  {
    phase: "Phase 3: The Disarming Hook",
    cue: "First 15 seconds with the decision maker",
    script: "\"Hey [Name], I know you're busy so I'll keep this to 60 seconds. I'm with Würth. I noticed you've got three heavy chassis on the lifts. I'm not sure if this is for you, but I wanted to show you one specialty chemical that saves technicians 20 minutes on every teardown.\"",
    tip: "Put the physical can or demo coupon into their hands immediately.",
  },
  {
    phase: "Phase 4: The 60-Second Demo",
    cue: "Demonstrating the product",
    script: "\"Watch what happens when I spray this... Notice how the foam clings vertically without running into the drain? That dwell time dissolves the grease so your techs don't have to scrub with a wire brush.\"",
    tip: "Let them test the physical property themselves (smell, touch, wipe, pull).",
  },
  {
    phase: "Phase 5: The Trial Close & Next Date",
    cue: "Closing the interaction",
    script: "\"Would it make sense to put a starter pack in bay 1 for your lead tech to test on his next tough job? I'll be back through Middlebury next Tuesday at 9:30 AM to check his feedback. If he loves it, we'll keep you stocked; if not, no worries at all.\"",
    tip: "Always lock a specific calendar day and time for the follow-up.",
  },
];

/* ---------- METHODOLOGY: HOW TO PERSUADE & GET PAID ---------- */
const METHODOLOGY_PREVIEW = [
  {
    title: "Module 1: The 9 Levels of Success (The TSR Foundation)",
    steps: [
      "Level 1: Professional Representation — Help the PERSON before solving the PROBLEM. First impressions set price elasticity.",
      "Level 2: Rapport with Emotion & Logic — Smile, use their name, and listen actively (SILENT is an anagram of LISTEN).",
      "Level 3: Genuine Opportunity Pipeline — Questions lead to Conversations → Relationships → Opportunities → Sales.",
      "Level 4: Value Framing Before Price — Always establish ROI, time-savings, and safety before quoting numbers. Use 'Investment', never 'Cost'.",
      "Level 5: Positive Decision — If you don't ask, you don't get. Always ask for the order.",
      "Level 6: Establish Future Opportunity — 'What else in the shop gives you headaches like this? Who else handles ordering?'",
      "Level 7: Schedule the Exact Next Action — Lock down date, time, and specific milestone for the follow-up before leaving the parking lot.",
      "Levels 8 & 9: Systematic Referral Generation — Ask for introductions at every moment the customer expresses satisfaction or gratitude."
    ],
  },
  {
    title: "Module 2: Magic Words & Cold Call Openers",
    steps: [
      "The Disarming Hook: 'I am not sure if this is for you, but...' (Removes pressure and creates curiosity).",
      "The Open-Minded Question: 'How open-minded are you to trying something that cuts 20 minutes off this job?' (People hate admitting they are closed-minded).",
      "The Swapped Friction: 'What do you do when your current supplier shorts you on hardware on Friday afternoon?'",
      "The Direct Contrast: 'Most shop foremen tell us they lose $150/hr in labor when techs search for bolts. What is your experience?'",
      "The Permission Gate: 'Would it make sense to take 60 seconds to look at one thing that fixes this?'"
    ],
  },
  {
    title: "Module 3: Overcoming Objections (The 6-Step Loop)",
    steps: [
      "Step 1 — Clarify with Curiosity: 'What makes you say that?' or 'Help me understand where that is coming from?'",
      "Step 2 — Validate & Agree: 'I completely understand why you feel that way. Most of our top accounts said the exact same thing.'",
      "Step 3 — Isolate the Core Issue: 'Aside from that price difference, is there anything else holding you back from testing this?'",
      "Step 4 — Hear the Reality Positively: Reframe their skepticism as a desire for shop efficiency and reliability.",
      "Step 5 — Bridge with Capability: 'What we can do is drop a trial case in bay 1 for 14 days so you can verify the results risk-free.'",
      "Step 6 — Conditional Close: 'If the techs tell you it cut their teardown time in half, would you be open to putting it on the regular order?'"
    ],
  },
  {
    title: "Module 4: The Physical Demo Theater (Show, Don't Tell)",
    steps: [
      "Rule 1 — Never Pitch from a Catalog: A brochure is paper; a live chemical reaction is revenue.",
      "Rule 2 — The 3-Foot Rule: Put the aerosol can, mallet, or torque wrench directly into the shop foreman's hands within 3 minutes.",
      "Rule 3 — Contrast Against Their Current Brand: Never insult their supplier. Say: 'Your current product is good. Let us look at what happens under extreme shock load.'",
      "Rule 4 — The Dramatic Reveal: Strike the grease with a rubber mallet, freeze the bolt with thermal shock, or run the high-shear mixer.",
      "Rule 5 — Immediate Trial Offer: 'Let us leave this can with your lead tech. I will check in Tuesday to see how it performed.'"
    ],
  },
  {
    title: "Module 5: The 7 High-Conversion Closes for TSRs",
    steps: [
      "1. The Alternative Choice Close: 'Would you prefer we start with the 500mL aerosol pack or the shop gallon drum?'",
      "2. The Minor Point Close: 'Should we set up delivery for Tuesday morning or Thursday afternoon?'",
      "3. The Assumptive Agreement Close: 'Let us get the initial bin stocked so your techs have it first thing next week.'",
      "4. The Sharp Angle Close: Customer: 'Can you deliver by Monday?' Rep: 'If I can guarantee Monday 8:00 AM delivery, can we lock the order right now?'",
      "5. The Lost Opportunity Close: 'If that bolt snaps tomorrow because the penetrant failed, what does that cost in bay downtime?'",
      "6. The Summary Confirmation Close: Summarize the 3 major labor savings they agreed on, then hand them the order form.",
      "7. The Direct Action Close: 'Based on what you have seen, what happens next is entirely up to you. Shall we give it a run?'"
    ],
  },
  {
    title: "Module 6: Route Rhythm & Follow-Up Discipline",
    steps: [
      "The Rule of 5 Touches: 80% of wholesale sales happen between the 5th and 12th interaction. 48% of sales reps quit after call #1.",
      "The 5-Minute In-Truck Debrief: Log the exact hook, personal detail (e.g. kid in hockey, restoration project in bay 3), and agreed next date before shifting into drive.",
      "The Trojan Horse Strategy: Sell one consumable problem solver (e.g. Rost Off or All In One) to earn the right to audit their full fastener bins on visit #3.",
      "Route Cluster Integrity: Never drive 15 miles for one meeting. Always wrap 3 cold prospect calls around every scheduled delivery or meeting."
    ],
  }
];

/* ---------- PRE-CALL CHECKLIST ---------- */
const PRECALL = [
  "Scanned the yard: observed 2 specific vehicles or pieces of equipment in service.",
  "Demo ready: demo kit & sample products within arm's reach in the truck.",
  "Decided on the opener: tailored to their specific business archetype.",
  "Identified 1 competitor to displace: (Loctite, WD40, ZEP, NAPA, Fastenal).",
  "Target Decision Maker: determined whether seeking Shop Foreman, Fleet Superintendent, or Facilities Director.",
  "Reframe locked: ready to calculate labor downtime savings rather than unit price.",
  "Follow-up date selected: ready to state the exact next visit day/time before leaving.",
];
