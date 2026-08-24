/* ============================================================
   BATTLE CARDS — real Würth product cards
   Sourced from official Würth USA battle cards (FOR INTERNAL USE).
   Structure mirrors the cards: Art. No., features, applications,
   competitors, the demo theater (tools + process), and the
   feature→advantage→benefit selling logic.
   ============================================================ */

const BATTLE_CARDS = [
  {
    id: "all-in-one",
    name: "All In One (Threadlocker/Sealant)",
    artNo: "0893555050",
    category: "Threadlocker / Sealant",
    tagline: "Threadlocker, pipe sealant, flange sealant & bearing retainer — ALL IN ONE.",
    bestFor: ["General maintenance", "Mobile technicians", "Multi-trade shops"],
    application: "One DOS bottle replaces a shelf of threadlockers and sealants. Ideal for maintenance & mobile techs who need variety at the job site.",
    features: [
      "Patented DOS bottle: clog-free, easy-open cap, store upside down to use all product",
      "Medium-strength anaerobic adhesive & sealant — locks, seals, retains",
      "Fast cure on most metals; fills gaps; resists corrosion, water, solvents, extreme temps",
      "No drip — ideal for overhead use",
      "NSF P1 & ANSI 61 certified (indirect food & drinking water contact)",
    ],
    competitors: [
      "Loctite threadlockers: 222, 242, 243, 271, 272, 277",
      "Loctite pipe sealants: 545, 565, 567",
      "Loctite flange sealants: 510, 515, 518, 574",
      "Loctite bearing retainers: 601, 603, 609, 620, 638, 680",
    ],
    crossSell: ["Fasteners", "Surface prep — wire wheels, solvent cleaners", "PPE — gloves & safety glasses"],
    fab: [
      { f: "Does the job of a threadlocker, pipe, flange & bearing sealant", a: "Replaces several products in the shop", b: "Techs don't carry a pile of sealants to the job site" },
      { f: "Fast cure", a: "Less downtime waiting to cure", b: "Saves time assembling" },
      { f: "Patented DOS cap", a: "Precise, controlled application, no clogging", b: "Uses less, wastes less — saves time & money" },
    ],
    demo: {
      name: "The 4-in-1 Replacement Show",
      bits: [
        { title: "Overhead No-Drip Bead", tools: "DOS bottle, steel plate, wipe", how: "Dispense a bead overhead on an inverted plate — it holds without dripping onto hands or floor." },
        { title: "Shelf Cleanout Pitch", tools: "Card with Loctite competitor cross-reference", how: "Line up their 4 Loctite bottles and set 1 All In One bottle next to it. 'One bottle cuts inventory complexity 75%.'" }
      ]
    },
    note: 'Lead line: "Great opportunity to kick out the competition." One product clears a whole shelf of Loctite.',
  },
  {
    id: "sig-3000",
    name: "SIG 3000 (Super Impact Grease)",
    artNo: "0890401000",
    category: "Grease / Lubricant",
    tagline: "Fortified grease that takes heavy impact & pounding pressure without splattering.",
    bestFor: ["Fleets", "Heavy equipment", "Ag", "Anything under heavy load"],
    application: "Multi-purpose grease for fleets and heavy equipment — stays in place under pounding loads.",
    features: [
      "Withstands heavy impact & pounding pressure; doesn't splatter",
      "Long lasting under heavy loads (up to 65,000 PSI — 65 Timken load)",
      "Heat resistant up to 550°F",
      "Superior water resistance; inhibits rust & corrosion",
      "Resistant to acids, weather, dirt, water, steam, oxidation",
    ],
    competitors: ["ZEP Misty Super Impact Grease", "Big Red Super Impact Grease", "Winzer Super Impact Grease"],
    crossSell: ["True Glide", "Silicone lubricating compound", "Fasteners"],
    fab: [
      { f: "65 Timken load rating (65,000 PSI)", a: "Resists pounding shock loads on pins and bushings", b: "Prevents metal-on-metal wear and expensive pin replacement" },
      { f: "Water & acid washout resistance", a: "Stays in the joint during washdowns and salt exposure", b: "Extends lubrication intervals by 2x to 3x" }
    ],
    demo: {
      name: "The 3-demo grease show",
      bits: [
        { title: "Hammer Impact", tools: "Rubber mallet, SIG 3000, competitor grease, paper plate", how: "Put a half-dollar of SIG 3000 on a plate, swing the mallet at it. It absorbs the impact and won't splatter — competitor scatters everywhere." },
        { title: "Water Resistance", tools: "Glass jar, True Glide, 80 mL water", how: "Half-fill a jar with grease, pour 80 mL water on top, seal it. The water never penetrates — it just sits there." },
        { title: "Corrosion Protection", tools: "Two uncoated steel fasteners, corrosion accelerator, silicone lubricating compound, glass jar", how: "Coat one fastener, leave one bare, drop both in accelerator. Pull them out — the coated one is protected, the bare one's corroding." },
      ],
    },
    note: "This is a SHOW-don't-tell product. The hammer demo sells itself — let them watch it not splatter.",
  },
  {
    id: "hhs-k",
    name: "HHS-K (Adhesive Lubricant)",
    artNo: "0893106050",
    category: "Adhesive Lubricant",
    tagline: "Sprays in like an oil, transforms into a grease that stays put — built for door hinges.",
    bestFor: ["Auto (door hinges)", "Any hinged / moving metal that squeaks or wears", "Mfg moving assemblies"],
    application: "Specialized lubricant for door hinges. Sprays as a penetrating oil, then sets into an adhesive grease that won't fling off.",
    features: [
      "Adhesive properties — stays in place no matter the movement",
      "Tear & pressure resistant",
      "Silicone-, resin-, and acid-free",
      "Excellent capillary penetrating action",
      "*Not for sale in California (HHS-K). HHS PLUS (0893106026) has no state restriction.",
    ],
    competitors: ["Sprayon 711", "WD40 Specialist Corrosion Inhibitor", "CRC Power Lube", "Winzer Break-Thru", "Kent Pene-Grease", "ZEP 2000 / ZEP 45"],
    crossSell: ["HHS PLUS (0893106026)", "Penetrants", "Fasteners"],
    fab: [
      { f: "Sprays as oil, sets as high-adhesion grease", a: "Penetrates tight hinge pins then locks in place", b: "No messy drips onto customer car sills or shop floor" },
      { f: "Extreme centrifugal fling resistance", a: "Clings to high-speed gears and linkages", b: "Long-lasting lubrication that stops customer squeak comebacks" }
    ],
    demo: {
      name: "The transformation demos",
      bits: [
        { title: "Washer Stick", tools: "Washers, glass vial, pipettes, vertical metal surface, HHS-K", how: "Drip HHS-K on a washer, stick it to a vertical metal surface. It clings via adhesion. Compare to WD40 / white lithium — theirs runs right off." },
        { title: "Acrylic Plate (pressure)", tools: "Acrylic cards, pipettes, HHS-K", how: "Sandwich the lube between two acrylic cards, push hard and slide. It resists tearing and stays put under pressure — competitors squeeze out." },
        { title: "Finger Demo", tools: "Disposable gloves, HHS PLUS & HHS-K", how: "Rub a drop between finger and thumb. Watch the solvent flash off and the oil turn to tacky grease." },
        { title: "Hand Mixer", tools: "Hand mixer, HHS, glass beaker", how: "Run a mixer in the product — it balls up, grabs the centrifuge, and resists the RPM. Pure shear strength vs. competitor." },
      ],
    },
    note: "The 'oil that becomes grease' moment is the hook. Once they see it cling and not fling, the WD40 comparison closes it.",
  },
  {
    id: "rost-off-max-ice",
    name: "Rost Off Max Ice (Thermal Penetrant)",
    artNo: "0893241002",
    category: "Penetrating Lubricant",
    tagline: "Freezes metal down to -40°F to micro-crack rust capillaries and drive penetrating oil deep into seized threads.",
    bestFor: ["Seized exhaust studs & manifold bolts", "Ag equipment & rusted heavy machinery", "Suspension & chassis teardown"],
    application: "Extreme-duty penetrating freeze lubricant for rusted, corroded, or seized bolts where standard penetrants fail.",
    features: [
      "Thermal shock action (-40°F instant freeze shrink)",
      "Synthetic creeping oil penetrates rusted micro-crevices instantly",
      "Acid-free, silicone-free, resin-free",
      "Safe on rubber, paint, and plastics",
      "Specialized 360° spray valve operates at any angle"
    ],
    competitors: ["PB Blaster", "Kroil", "Liquid Wrench", "WD-40 Specialist Penetrant", "Sea Foam Deep Creep"],
    crossSell: ["CU 800 Copper Anti-Seize", "Grade 8 Fasteners", "Wire Wheels & Brushes"],
    fab: [
      { f: "Thermal shock -40°F freeze action", a: "Shrinks bolt diameter micro-fractions to fracture rust bonds", b: "Breaks seized fasteners without heat, torches, or snapped studs" },
      { f: "High capillary creeping synthetic oil", a: "Wicks upward into vertical threads against gravity", b: "Saves 30+ minutes of tech teardown labor per rusted vehicle" }
    ],
    demo: {
      name: "The Thermal Shock Freeze Demo",
      bits: [
        { title: "Frost Fracture Show", tools: "Heavily rusted bolt & nut assembly, can of Rost Off Max Ice", how: "Spray a 5-second burst onto the seized nut. Show the foreman the instant frost line forming as the rust fractures. Spin the nut off with standard hand wrench without cheater bar." },
        { title: "Wick Test", tools: "Glass capillary tube or sugar cube, Rost Off Max Ice", how: "Touch spray tip to bottom of tube or sugar cube — watch synthetic creeping fluid wick instantly to the top." }
      ]
    },
    note: "Target the shop foreman who keeps an oxy-acetylene torch in the bay. Torch heat destroys rubber seals, wiring harnesses, and weakens metal temper. Max Ice breaks bolts cold.",
  },
  {
    id: "bond-and-seal",
    name: "Bond and Seal (Structural Polyurethane)",
    artNo: "08901003",
    category: "Structural Adhesive / Sealant",
    tagline: "Permanently bonds and waterproof-seals dissimilar metals, fiberglass, wood, and plastics without primers.",
    bestFor: ["Commercial trailer roof seams & skin panels", "RV slideouts & roof caps", "Bus body panel bonding & vibration dampening"],
    application: "High-strength 1-component polyurethane adhesive and sealant for heavy transport, bodywork, and structural joint sealing.",
    features: [
      "Permanently elastic matrix (absorbs road vibration, shock, and dynamic chassis flex)",
      "Over-paintable once skinned",
      "Non-corrosive, silicone-free",
      "High UV, weather, and saltwater resistance",
      "Excellent primerless adhesion to bare aluminum, galvanized steel, and fiberglass"
    ],
    competitors: ["3M 5200 / 4200", "Sikaflex 221 / 252", "Dynatron Seam Sealer", "Lord Fusor"],
    crossSell: ["Caulking Guns", "Surface Prep Solvents", "Rivets & Fasteners"],
    fab: [
      { f: "Permanently elastic polyurethane formulation", a: "Expands and contracts with weather and chassis flex", b: "Eliminates roof seam leaks and costly warranty water-damage comebacks" },
      { f: "High shear bonding strength", a: "Acts as adhesive AND sealant in a single application", b: "Reduces mechanical fastener counts on trailer skins" }
    ],
    demo: {
      name: "The Elastic Flex & Pull Demo",
      bits: [
        { title: "400% Elastic Stretch", tools: "Cured sample bead of Bond and Seal on split metal coupon", how: "Hand the cured coupon to the fleet manager. Have them pull and twist the metal coupon 90 degrees — the polyurethane stretches like rubber without tearing or losing bond." },
        { title: "Silicone vs Polyurethane Scrape", tools: "Dried silicone bead vs Bond and Seal bead on painted aluminum", how: "Scrape silicone off with fingernail (peels away). Attempt to scrape Bond and Seal — it has permanently bonded to the substrate." }
      ]
    },
    note: "Fleet yards and trailer repair shops bleed money on roof leak rework. Silicone dries out and cracks within 12 months under road vibration. Bond and Seal is a permanent structural fix.",
  },
  {
    id: "super-rtv-black",
    name: "Super RTV Silicone (Power-Can Gasket Maker)",
    artNo: "08933311",
    category: "Gasket Maker / High-Temp Silicone",
    tagline: "Pressurized Power-Can dispenses a perfect, uniform gasket bead at any angle with zero squeeze-tube waste.",
    bestFor: ["Differential covers, oil pans, valve covers", "Timing chain covers, thermostat housings", "Heavy-duty fleet PM & engine overhaul"],
    application: "Sensor-safe high-performance silicone gasket maker formulated for demanding automotive and heavy-duty fleet applications.",
    features: [
      "Pressurized Power-Can delivery: 100% product evacuation, zero hand cramping",
      "Instant blowout resistance — torque and return to service quickly",
      "Exceptional resistance to synthetic gear oils, ATF, coolants, and engine oils",
      "Sensor safe, non-corrosive, low odor",
      "Continuous operating temp -76°F to 482°F (intermittent to 572°F)"
    ],
    competitors: ["Permatex Right Stuff", "Permatex Ultra Black", "ThreeBond 1217H", "Loctite 598"],
    crossSell: ["Brake & Parts Cleaner (Surface Prep)", "Plastic Gasket Scrapers", "Shop Towels"],
    fab: [
      { f: "Patented Power-Can pressurized trigger", a: "Lays down a precise, uniform bead upside down or sideways", b: "Lays a complete differential cover gasket in under 15 seconds" },
      { f: "Zero-clog nozzle with 100% evacuation", a: "Product doesn't cure inside a half-used tube on the shelf", b: "Zero wasted product — saves the shop 30% in chemical cost" }
    ],
    demo: {
      name: "The 15-Second Inverted Bead Show",
      bits: [
        { title: "Inverted Power-Can Bead", tools: "Super RTV Power-Can, differential cover or cardboard template", how: "Hold the Power-Can completely upside down. Pull the trigger smoothly around the perimeter — dispenses an OEM-perfect 1/8-inch bead with zero sputtering or air pockets." },
        { title: "Synthetic Gear Oil Dip", tools: "Cured coupon of Super RTV in synthetic 75W-90 gear lube", how: "Pull coupon from gear oil — rubber remains resilient and firm, while competitor silicone turns soft and gummy." }
      ]
    },
    note: "Techs hate rolled-up squeeze tubes that split at the seam or plug solid after one use. Put the Power-Can in the tech's hand and let them pull the trigger once — they will never go back to tubes.",
  },
  {
    id: "foaming-engine-degreaser",
    name: "Foaming Engine & Machinery Degreaser",
    artNo: "0893013058",
    category: "Heavy-Duty Degreaser",
    tagline: "Dense, clinging foam sticks to vertical engine blocks and machinery to dissolve caked oil, soot, and road grime.",
    bestFor: ["Fleet truck engine bay detailing", "Heavy equipment hydraulic leaks & radiator cores", "Machine shop degreasing"],
    application: "Ultra-dense foaming degreaser engineered to cling to vertical metal surfaces and emulsify baked-on oil and road dirt.",
    features: [
      "Ultra-high long-lasting foam stays on vertical walls for 15+ minutes",
      "Emulsifies heavy grease, diesel soot, road film, and hydraulic oil",
      "Silicone-free and phosphate-free",
      "Rinses completely clean with cold water leaving zero oily film",
      "Safe on wiring harnesses, painted engine blocks, and rubber hoses"
    ],
    competitors: ["Gunk Original Engine Cleaner", "Purple Power", "ZEP Big Orange", "Simple Green Pro HD"],
    crossSell: ["ECO Super Spray All", "Wipes / Shop Towels", "Nitrile Gloves"],
    fab: [
      { f: "Clinging foam matrix", a: "Maintains contact on vertical engine blocks instead of running into the drain", b: "Chemical dwell time dissolves the grime so techs don't have to scrub" },
      { f: "Water-rinsable emulsion", a: "Washes away completely with a garden hose or pressure washer", b: "Leaves a showroom-clean engine bay in 5 minutes" }
    ],
    demo: {
      name: "The Vertical Wall Cling Test",
      bits: [
        { title: "Vertical Foam Cling Demo", tools: "Greasy vertical engine casing or steel plate, Foaming Degreaser, liquid competitor", how: "Spray competitor liquid on left half (runs off immediately). Spray Würth foam on right half (thick white foam blanket sticks). Within 60 seconds, watch the white foam turn deep brown as it liquefies the grease." }
      ]
    },
    note: "When walking into a truck shop or ag dealer, look for the dirtiest hydraulic boom or engine bay. Spray a 6-inch test patch. When they see the white foam turn brown with dissolved grease, it's an instant case sale.",
  }
];
