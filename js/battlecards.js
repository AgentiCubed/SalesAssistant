/* ============================================================
   BATTLE CARDS — real Würth product cards
   Sourced from official Würth USA battle cards (FOR INTERNAL USE).
   Structure mirrors the cards: Art. No., features, applications,
   competitors, the demo theater (tools + process), and the
   feature→advantage→benefit selling logic.
   Add more cards by appending to this array.
   ============================================================ */

const BATTLE_CARDS = [
  {
    id: "all-in-one",
    name: "All In One",
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
    demo: null,
    note: "Lead line: \"Great opportunity to kick out the competition.\" One product clears a whole shelf of Loctite.",
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
    fab: [],
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
    fab: [],
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
];
