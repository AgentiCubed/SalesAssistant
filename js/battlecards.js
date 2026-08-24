/* ============================================================
   SALES COACH — ACCESSIBLE BATTLE CARDS
   Zero-Emoji, Technical Features, Applications, Demos, FAB Logic
   ============================================================ */

const BATTLE_CARDS = [
  {
    id: "all-in-one",
    name: "All In One (Threadlocker/Sealant)",
    artNo: "0893555050",
    category: "Threadlocker / Sealant",
    tagline: "Threadlocker, pipe sealant, flange sealant and bearing retainer in a single bottle.",
    bestFor: ["General maintenance", "Mobile technicians", "Multi-trade shops"],
    application: "One DOS bottle replaces a shelf of threadlockers and sealants. Ideal for maintenance and mobile technicians who need versatility in the field.",
    features: [
      "Patented DOS bottle: clog-free, easy-open cap, store upside down to use all product",
      "Medium-strength anaerobic adhesive and sealant that locks, seals, and retains",
      "Fast cure on most metals; fills gaps; resists corrosion, water, solvents, and extreme temps",
      "No drip formulation ideal for overhead use",
      "NSF P1 and ANSI 61 certified for indirect food and drinking water contact",
    ],
    competitors: [
      "Loctite threadlockers: 222, 242, 243, 271, 272, 277",
      "Loctite pipe sealants: 545, 565, 567",
      "Loctite flange sealants: 510, 515, 518, 574",
      "Loctite bearing retainers: 601, 603, 609, 620, 638, 680",
    ],
    crossSell: ["Fasteners", "Surface prep solvents", "PPE safety glasses and gloves"],
    fab: [
      { f: "Performs the function of threadlocker, pipe, flange, and bearing sealant", a: "Replaces 4 specialized products in the shop", b: "Technicians carry one bottle rather than a heavy kit of specialized sealants" },
      { f: "Fast room-temperature cure", a: "Less downtime waiting for seals to set", b: "Returns equipment and vehicles to service faster" },
      { f: "Patented DOS dispensing cap", a: "Precise single-drop control with zero clogging", b: "Eliminates wasted chemical and saves money" },
    ],
    demo: {
      name: "The 4-in-1 Overhead Seal Test",
      bits: [
        { title: "Overhead No-Drip Dispensing", tools: "DOS bottle, steel plate, wipe", how: "Dispense a bead overhead on an inverted plate to demonstrate that the thixotropic gel holds without dripping onto hands or shop floor." },
        { title: "Shelf Cleanout Comparison", tools: "Loctite cross-reference chart", how: "Show how one bottle of All In One replaces Loctite blue, red, hydraulic pipe sealant, and sleeve retainer." }
      ]
    },
    note: "Position this as the inventory-cleaner. One SKU on the shelf eliminates stockouts across four separate adhesives.",
  },
  {
    id: "sig-3000",
    name: "SIG 3000 (Super Impact Grease)",
    artNo: "0890401000",
    category: "Grease / Lubricant",
    tagline: "Fortified grease engineered to withstand heavy shock load and pounding without splattering.",
    bestFor: ["Fleet trucks", "Heavy equipment", "Agriculture", "Pounding pin and bushing assemblies"],
    application: "Multi-purpose extreme-pressure grease for heavy machinery that stays in the joint under pounding loads.",
    features: [
      "Withstands heavy shock load and pounding pressure without splattering",
      "65 Timken load rating (65,000 PSI load capacity)",
      "High temperature resistance up to 550 degrees F",
      "Water and acid washout resistant",
      "Inhibits rust, oxidation, and road-salt corrosion",
    ],
    competitors: ["ZEP Misty Super Impact Grease", "Big Red Grease", "Winzer Super Impact Grease"],
    crossSell: ["True Glide", "Dielectric grease", "Grade 8 Fasteners"],
    fab: [
      { f: "65 Timken load rating", a: "Absorbs brutal impact shock between pins and bushings", b: "Prevents metal-on-metal wear and saves thousands in bushing replacement" },
      { f: "Water and acid washout resistance", a: "Remains inside the joint during high-pressure washdowns", b: "Extends lubrication intervals by 2x to 3x" }
    ],
    demo: {
      name: "The Mallet Impact Test",
      bits: [
        { title: "Hammer Impact Test", tools: "Rubber mallet, SIG 3000, competitor grease sample, paper plate", how: "Place a half-dollar amount of SIG 3000 on a plate and strike it directly with the rubber mallet. It cushions the blow and stays in place, whereas standard grease splatters everywhere." },
        { title: "Water Washout Resistance", tools: "Glass jar, grease sample, water", how: "Place grease in a jar with water and shake vigorously. The grease remains bonded to the glass and does not emulsify." }
      ],
    },
    note: "This is a physical demonstration product. Once a shop foreman sees the grease absorb a mallet strike without splattering, the sale is closed.",
  },
  {
    id: "hhs-k",
    name: "HHS-K (Adhesive Lubricant)",
    artNo: "0893106050",
    category: "Adhesive Lubricant",
    tagline: "Sprays as a penetrating oil and transforms into an adhesive grease that resists fling-off.",
    bestFor: ["Door hinges and latches", "Exposed gears and linkages", "Manufacturing moving parts"],
    application: "Specialized lubricant for door hinges, latches, and mechanical linkages that creeps into tight gaps and sets into a long-lasting grease.",
    features: [
      "High adhesive properties that resist centrifugal fling-off",
      "Tear and pressure resistant under high mechanical stress",
      "Silicone-free, resin-free, and acid-free",
      "High capillary creeping action that wicks into pin assemblies",
      "Not for sale in California (HHS Plus 0893106026 is the 50-state compliant variant)",
    ],
    competitors: ["Sprayon 711", "WD-40 Specialist", "CRC Power Lube", "Winzer Break-Thru", "ZEP 2000"],
    crossSell: ["HHS Plus", "Penetrating oils", "Fasteners"],
    fab: [
      { f: "Dual-phase formulation (sprays as oil, cures to grease)", a: "Wicks into tight hinge pins then locks in place", b: "Stops hinge squeaks permanently without messy dripping" },
      { f: "Centrifugal fling resistance", a: "Clings to high-speed gears and moving chains", b: "Protects equipment without contaminating surrounding areas" }
    ],
    demo: {
      name: "The Vertical Washer Cling Test",
      bits: [
        { title: "Vertical Washer Adhesion", tools: "Steel washer, vertical metal sheet, HHS-K can", how: "Spray a drop on a washer and press it against a vertical metal surface. The adhesive grease holds the washer in place against gravity, while competitor oil runs down the sheet." },
        { title: "Shear Strength Mixer Test", tools: "Hand mixer, beaker, HHS-K", how: "Run a mixer blade through HHS-K to show the fluid wrapping around the spindle under centrifugal force rather than spraying off." }
      ],
    },
    note: "The transformation from thin oil to tacky grease is the selling point. Compare it directly against standard aerosol lubricants.",
  },
  {
    id: "rost-off-max-ice",
    name: "Rost Off Max Ice (Thermal Shock Penetrant)",
    artNo: "0893241002",
    category: "Penetrating Lubricant",
    tagline: "Freezes seized metal to minus 40 degrees F to crack rust and draw synthetic oil into threads.",
    bestFor: ["Seized exhaust studs and manifold bolts", "Agricultural machinery teardowns", "Rusted suspension hardware"],
    application: "Extreme-duty penetrating freeze spray designed to break heavily rusted, corroded, or seized bolts without torches.",
    features: [
      "Thermal shock freeze action down to minus 40 degrees F",
      "Synthetic creeping oil penetrates rusted micro-crevices instantly",
      "Acid-free, silicone-free, and resin-free",
      "Safe on surrounding rubber, wiring, and paint",
      "360-degree spray valve for inverted applications"
    ],
    competitors: ["PB Blaster", "Kroil", "Liquid Wrench", "Sea Foam Deep Creep"],
    crossSell: ["Copper Anti-Seize", "Grade 8 Fasteners", "Wire Wheels"],
    fab: [
      { f: "Thermal shock minus 40 degree freeze", a: "Shrinks bolt diameter micro-fractions to fracture rust bonds", b: "Breaks seized hardware cold without heating with a torch or snapping studs" },
      { f: "High capillary creeping action", a: "Wicks upward into vertical threads against gravity", b: "Saves 30 minutes of labor on rusted vehicle teardowns" }
    ],
    demo: {
      name: "The Cold Rust Fracture Test",
      bits: [
        { title: "Frost Fracture Demonstration", tools: "Rusted bolt and nut assembly, can of Rost Off Max Ice", how: "Spray a 5-second burst onto the seized nut. Show the frost ring forming as the rust cracks, then remove the nut with a standard hand wrench." }
      ]
    },
    note: "Target technicians who reach for the torch. Heat destroys rubber boots and softens bolt temper. Max Ice breaks seized bolts cold.",
  },
  {
    id: "bond-and-seal",
    name: "Bond and Seal (Structural Polyurethane)",
    artNo: "08901003",
    category: "Structural Adhesive / Sealant",
    tagline: "Permanently bonds and seals dissimilar metals, fiberglass, wood, and plastics without primers.",
    bestFor: ["Commercial trailer roof seams", "RV slideouts and caps", "Bus body panel bonding"],
    application: "High-strength 1-component polyurethane adhesive and sealant for heavy transport, bodywork, and waterproof joint sealing.",
    features: [
      "Permanently elastic polyurethane matrix that absorbs vibration and chassis flex",
      "Over-paintable once skinned",
      "Non-corrosive and silicone-free",
      "Resistant to UV, weathering, and road-salt wash",
      "Primerless adhesion to bare aluminum, steel, and fiberglass"
    ],
    competitors: ["3M 5200", "Sikaflex 221", "Dynatron Seam Sealer"],
    crossSell: ["Caulking Guns", "Surface Cleaners", "Rivets"],
    fab: [
      { f: "Permanently elastic polyurethane matrix", a: "Expands and contracts with thermal expansion and road twist", b: "Eliminates roof seam leaks and costly warranty water-damage rework" },
      { f: "High shear bonding strength", a: "Acts as structural adhesive and sealant in one step", b: "Reduces mechanical fastener counts on trailer skins" }
    ],
    demo: {
      name: "The 400 Percent Elastic Stretch Test",
      bits: [
        { title: "Elastic Stretch Demonstration", tools: "Cured sample coupon of Bond and Seal", how: "Hand the cured coupon to the customer and have them twist and stretch the coupon 90 degrees to prove the bond does not tear or release." }
      ]
    },
    note: "Fleet yards lose money on seam leak comebacks. Silicone dries out and cracks under road vibration within a year; Bond and Seal remains flexible.",
  },
  {
    id: "super-rtv-black",
    name: "Super RTV Silicone (Power-Can Gasket Maker)",
    artNo: "08933311",
    category: "Gasket Maker / High-Temp Silicone",
    tagline: "Pressurized Power-Can dispenses a uniform gasket bead at any angle with zero squeeze-tube waste.",
    bestFor: ["Differential covers, oil pans, valve covers", "Timing chain covers, thermostat housings", "Heavy-duty fleet engine overhauls"],
    application: "Sensor-safe silicone gasket maker for automotive and heavy-duty fleet maintenance.",
    features: [
      "Pressurized Power-Can delivery: 100 percent product evacuation with zero hand fatigue",
      "Instant blowout resistance for fast return to service",
      "High resistance to synthetic gear oils, ATF, and coolants",
      "Sensor safe, non-corrosive, low odor",
      "Operating temperature range from minus 76 degrees F to 482 degrees F"
    ],
    competitors: ["Permatex Right Stuff", "Permatex Ultra Black", "ThreeBond 1217H"],
    crossSell: ["Brake Cleaner Surface Prep", "Gasket Scrapers", "Shop Towels"],
    fab: [
      { f: "Pressurized Power-Can trigger", a: "Lays down a precise, uniform bead upside down or sideways", b: "Completes differential cover gaskets in 15 seconds" },
      { f: "Zero-clog nozzle with 100 percent evacuation", a: "Chemical does not cure inside a half-used tube on the shelf", b: "Eliminates wasted product and saves money" }
    ],
    demo: {
      name: "The 15-Second Inverted Bead Test",
      bits: [
        { title: "Inverted Dispensing Demonstration", tools: "Super RTV Power-Can, cardboard template", how: "Hold the Power-Can completely upside down and draw a uniform 1/8-inch bead around the perimeter without sputtering or hand strain." }
      ]
    },
    note: "Technicians dislike rolled-up tubes that split at the seam. Hand the Power-Can to the lead technician to demonstrate the trigger feel.",
  },
  {
    id: "foaming-engine-degreaser",
    name: "Foaming Engine & Machinery Degreaser",
    artNo: "0893013058",
    category: "Heavy-Duty Degreaser",
    tagline: "Dense clinging foam adheres to vertical engine blocks to dissolve caked grease, soot, and road grime.",
    bestFor: ["Fleet truck engine bay detailing", "Heavy equipment hydraulic booms", "Machine shop degreasing"],
    application: "Dense foaming degreaser engineered to cling to vertical metal surfaces and dissolve heavy grease and road film.",
    features: [
      "High-density foam remains on vertical surfaces for 15 minutes",
      "Emulsifies heavy grease, diesel soot, and hydraulic fluid",
      "Silicone-free and phosphate-free",
      "Rinses clean with water leaving zero oily residue",
      "Safe on wiring harnesses, aluminum, and rubber hoses"
    ],
    competitors: ["Gunk Engine Cleaner", "Purple Power", "ZEP Big Orange"],
    crossSell: ["ECO Super Spray All", "Shop Towels", "Nitrile Gloves"],
    fab: [
      { f: "Clinging foam matrix", a: "Maintains chemical dwell time on vertical walls instead of dripping into the drain", b: "Chemical dwell time dissolves the grime so technicians do not have to scrub" },
      { f: "Water-rinsable emulsion", a: "Washes away completely with a water hose", b: "Leaves an engine bay clean in 5 minutes" }
    ],
    demo: {
      name: "The Vertical Wall Cling Test",
      bits: [
        { title: "Vertical Cling Demonstration", tools: "Greasy steel plate, Foaming Degreaser, liquid cleaner", how: "Spray competitor liquid on left half (runs off). Spray Würth foam on right half (thick foam blanket clings). Within 60 seconds, watch the foam turn brown as it liquefies the grease." }
      ]
    },
    note: "Look for dirty hydraulic equipment in the yard and spray a 6-inch test patch. The visual contrast sells the product on the spot.",
  }
];
