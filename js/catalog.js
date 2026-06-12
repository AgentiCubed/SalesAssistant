/* ============================================================
   PRODUCT CATALOG — real Würth products with article numbers
   Sourced from Würth USA Best-Selling Chemicals sheet + expert
   guides (Truck/Fleet, School Bus, RV, Waste Hauling, Forklift)
   and product sheets. Article numbers transcribed as printed —
   VERIFY against current Würth USA catalog before quoting.
   This powers the searchable Product Finder in the app.
   ============================================================ */

const CATALOG = [
  /* ---- LUBRICANTS / GREASES ---- */
  { name: "HHS-K Adhesive Hinge Lubricant", art: "0893106050", cat: "Lubricants", size: "500 mL aerosol", note: "Sprays as oil, sets as grease. Door hinges, linkages. PRO USE ONLY." },
  { name: "SIG 3000 Super Impact Grease", art: "0890401000", cat: "Lubricants", size: "14 oz", note: "Takes pounding loads (65 Timken), 550°F, water/corrosion resistant. Hammer demo." },
  { name: "MPL 50 Multi-Purpose Lubricant", art: "0893055470", cat: "Lubricants", size: "10 oz aerosol", note: "Penetrant/lube/protectant. Machining & general MRO." },
  { name: "Rost Off Max Ice Penetrating Lubricant", art: "0893241002", cat: "Lubricants", size: "aerosol", note: "Freezes & cracks rust to break seized fasteners." },
  { name: "CU 800 Copper Anti-Seize", art: "8859800125", cat: "Lubricants", size: "—", note: "All metals/plastics, silicone-free, 50-state compliant. Wheel hardware." },
  { name: "Dielectric Grease", art: "0893844100", cat: "Lubricants", size: "3 oz tube", note: "Protects electrical connections from moisture/corrosion." },
  { name: "Silicone Lubricant", art: "18909221", cat: "Lubricants", size: "10.5 oz aerosol", note: "General silicone lube." },
  { name: "Brake Protection Paste w/ Applicator", art: "0893920250", cat: "Lubricants", size: "—", note: "Anti-seize for brake hardware." },

  /* ---- ADHESIVES / SEALANTS ---- */
  { name: "All In One (Threadlocker/Sealant)", art: "0893555050", cat: "Adhesives", size: "DOS bottle", note: "Threadlocker + pipe + flange + bearing retainer. NSF P1/ANSI 61. Kicks Loctite." },
  { name: "DOS Thread Locker Blue", art: "0893243050", cat: "Adhesives", size: "1.76 oz", note: "Medium-strength removable threadlocker." },
  { name: "Super RTV Silicone Black", art: "08933311", cat: "Adhesives", size: "200 mL", note: "High-temp gasket maker." },
  { name: "RTV Silicone — Sensor Safe Red", art: "08909102", cat: "Adhesives", size: "—", note: "Sensor-safe gasket maker (low odor)." },
  { name: "RTV Silicone — Sensor Safe Black", art: "08909103", cat: "Adhesives", size: "—", note: "Sensor-safe gasket maker." },
  { name: "RTV Silicone Clear", art: "08909104", cat: "Adhesives", size: "—", note: "General sealing." },
  { name: "Würth Fix All 2-Part Adhesive", art: "0893301900", cat: "Adhesives", size: "50 mL", note: "Bonds dissimilar substrates (metal+fiberglass). Reduces fasteners." },
  { name: "Super Glue", art: "08930900", cat: "Adhesives", size: ".17 oz syringe", note: "Instant CA adhesive." },
  { name: "Non-Sag Seam Sealer Beige", art: "089391042", cat: "Adhesives", size: "207 mL", note: "Body seam sealing." },
  { name: "Pipe Sealant", art: "0893511050", cat: "Adhesives", size: "—", note: "Thread/pipe sealing." },
  { name: "Bond and Seal", art: "08901003", cat: "Adhesives", size: "cartridge", note: "Bonds AND seals in one. RV roof seams, flexes without cracking." },

  /* ---- CLEANING / DEGREASERS ---- */
  { name: "Foaming Engine Degreaser", art: "0893013058", cat: "Cleaning", size: "15.7 oz", note: "Ultra-high long-lasting foam, silicone/phosphate free. Strong visual demo." },
  { name: "Brake & Parts Cleaner (aerosol)", art: "089099107", cat: "Cleaning", size: "aerosol", note: "Fast-evaporating parts cleaner. Machining/firearms parts prep." },
  { name: "Brake Cleaner (55-gal drum)", art: "1890991076", cat: "Cleaning", size: "55 gal", note: "Bulk brake cleaner for high-volume shops." },
  { name: "Engine Degreaser Spray", art: "0890610210", cat: "Cleaning", size: "—", note: "General engine degreasing." },
  { name: "ECO Super Spray All", art: "089090901", cat: "Cleaning", size: "1 L pump", note: "Green all-purpose cleaner." },
  { name: "Glass Cleaner", art: "8890925", cat: "Cleaning", size: "19 oz", note: "Streak-free glass." },
  { name: "Volcano Hand Cleaner", art: "0893900001", cat: "Cleaning", size: "4 L", note: "Heavy-duty hand cleaner." },
  { name: "Contact Cleaner OL", art: "0890101101", cat: "Cleaning", size: "—", note: "Electrical contact cleaner." },
  { name: "A/C Coil Cleaner", art: "089376438", cat: "Cleaning", size: "foam", note: "Restores A/C cooling efficiency. Spray-on foam, before/after demo." },
  { name: "ECO Graffiti Remover", art: "089313550", cat: "Cleaning", size: "—", note: "High-frequency reorder for transit/bus interiors." },

  /* ---- EMISSIONS / FILTER ---- */
  { name: "Diesel Particulate Filter (DPF) Cleaner", art: "5861014500", cat: "Emissions", size: "400 mL", note: "Non-flammable, metal-free, residue-free. Diesel fleet must-have." },

  /* ---- TIRE / WHEEL ---- */
  { name: "Tire Mounting Paste", art: "08901221", cat: "Tire & Wheel", size: "11 lb pail", note: "Eases tire mounting, prevents bead damage." },

  /* ---- UNDERBODY / PAINT ---- */
  { name: "High Build Under Seal Undercoating", art: "88909071", cat: "Underbody", size: "17.5 oz aerosol", note: "Corrosion/abrasion underbody protection." },
  { name: "Flexible Trim Paint Satin Black", art: "0892140029", cat: "Paint", size: "15 oz aerosol", note: "Flexible trim/bumper paint." },

  /* ---- ABSORBENTS / SAFETY ---- */
  { name: "Würth Absorb (natural/organic)", art: "0890620020", cat: "Safety & Spill", size: "—", note: "Absorbs up to 20x more than competitors. Spill cleanup." },
  { name: "Ultrasonic Diagnostic Tool Kit", art: "5861999001", cat: "Tools", size: "kit", note: "Finds inaudible leaks (seals, air, vacuum, exhaust). High wow-factor demo." },
  { name: "UV Cure Headlight/Lens Sealant Kit", art: "1893573850", cat: "Tools", size: "kit", note: "Restores polycarbonate lenses. Patented." },

  /* ---- FASTENERS / SHOP ---- */
  { name: "ZEBRA Clamp Mobile Service Assortment", art: "19641207", cat: "Fasteners & Clamps", size: "box, 8–90mm", note: "Full hose-clamp range + 7mm driver in a portable case. Mobile-tech upsell." },
  { name: "REFILLOmat® Refillable Aerosol System", art: "19618917", cat: "Shop Systems", size: "system", note: "Recharges a can in 7 sec. Cuts aerosol waste & cost. Great for waste haulers." },

  /* ============================================================
     BATCH 2 — transcribed from Würth USA catalog/spotlight PDFs
     (Chemicals, Tools, Truck, Spotlights, Promos, WD-40 Food
     Grade, SmartWasher, Janitorial, Stainless/Brass/Hydraulics).
     Article #s read from page images — VERIFY before quoting.
     ============================================================ */

  /* ---- LUBRICANTS / GREASES ---- */
  { name: "HHS Plus Adhesive Lubricant", art: "0893106026", cat: "Lubricants", size: "500 mL aerosol", note: "Tacky synthetic lube + corrosion protection for wet/salty environments. Sister to HHS-K." },
  { name: "SIG MOLY Grease", art: "0890603", cat: "Lubricants", size: "14 oz", note: "Moly-fortified grease for slow, high-load conditions — forklift masts, kingpins." },
  { name: "Würth Film Corrosion-Protection Lube", art: "0890333000", cat: "Lubricants", size: "11.3 oz aerosol", note: "Film coating protects against rust up to 12 months. Long-term storage/seasonal equipment." },
  { name: "Chain & Wire Rope Lubricant", art: "0893105800", cat: "Lubricants", size: "16 oz", note: "EP + moly additive. Top lift-chain lube for forklifts, hoists, conveyors." },
  { name: "Dry Graphite Lubricant", art: "0893555001", cat: "Lubricants", size: "14 oz aerosol", note: "Dry-film lube for dusty/high-fiber spaces — paper & textile mills." },
  { name: "CU 800 Copper Paste (tube)", art: "08938001", cat: "Lubricants", size: "100 g tube", note: "Anti-seize to 2,192°F. Stops brake squeal, seizing, cold welding." },
  { name: "CU 800 Copper Paste (can)", art: "08938002", cat: "Lubricants", size: "1,000 g can", note: "Shop-size copper paste for heavy brake/exhaust/bearing service." },
  { name: "Silicone Spray Lubricant", art: "8858221", cat: "Lubricants", size: "13.5 oz aerosol", note: "Heat-stable to 500°F. Rubber seals, window channels, plastic mold release." },

  /* ---- ADHESIVES / SEALANTS ---- */
  { name: "RTV Sensor-Safe Red (8 oz)", art: "0890912", cat: "Adhesives", size: "8 oz", note: "Non-corrosive sensor-safe RTV to 550°F. Valve covers, oil pans, pump housings." },
  { name: "RTV Sensor-Safe Black (8 oz)", art: "0890913", cat: "Adhesives", size: "8 oz", note: "MIL-A-46146A black RTV — blends on dark engine surfaces." },
  { name: "Permatex Super Black Weatherstrip Adhesive", art: "1890181850", cat: "Adhesives", size: "5 fl oz", note: "Pro black formula blends with weatherstrip on door/trunk seals." },

  /* ---- CLEANING / DEGREASERS ---- */
  { name: "Industrial Strength Degreaser (1 L)", art: "0890000000", cat: "Cleaning", size: "1 L", note: "Heavy-duty liquid degreaser. Scales 1 L → 20 L → 210 L for any account size." },
  { name: "Industrial Strength Degreaser (20 L)", art: "0890000002", cat: "Cleaning", size: "20 L", note: "Bulk degreaser for shop-floor dispensing." },
  { name: "Industrial Strength Degreaser (210 L)", art: "0890000003", cat: "Cleaning", size: "210 L drum", note: "Drum-size degreaser for high-volume production environments." },
  { name: "Grez-Off Heavy Duty Degreaser (32 oz)", art: "1890122732", cat: "Cleaning", size: "32 fl oz", note: "Biodegradable, non-flammable, USDA-approved. Removes 5th-wheel grease & hydraulic fluid." },
  { name: "Grez-Off Heavy Duty Degreaser (1 gal)", art: "1890122701", cat: "Cleaning", size: "1 gal", note: "Value gallon for continuous shop degreasing." },
  { name: "Aktiv-Clean Foaming Spot/Stain Remover", art: "0893472", cat: "Cleaning", size: "500 mL aerosol", note: "Micro-fine active foam for upholstery, textiles, leather. Phosphate/silicone-free." },
  { name: "Active Clean", art: "0893033100", cat: "Cleaning", size: "500 g", note: "Dependable everyday shop cleaner for routine tasks." },
  { name: "Citrus Remover", art: "08902600", cat: "Cleaning", size: "16 fl oz", note: "Citrus-based remover for tough residue, adhesive, tar." },
  { name: "Multi Purpose Solvent (55 gal)", art: "1890991086", cat: "Cleaning", size: "55 gal", note: "Bulk general-purpose solvent. Pair with REFILLOmat to cut aerosol cost." },
  { name: "Fast Orange Mechanic's Laundry Detergent", art: "1890122340", cat: "Cleaning", size: "40 fl oz", note: "Removes grease/oil/ground-in dirt from work clothes. Recurring consumable." },
  { name: "Rust Armour", art: "0893110360", cat: "Cleaning", size: "1 qt", note: "Penetrating rust-killing topcoat — dehydrates metal, chip-resistant, paintable." },

  /* ---- INTERIOR / DETAILING ---- */
  { name: "Leather Conditioner (1 qt)", art: "0893010032", cat: "Interior Care", size: "1 qt", note: "Pro leather care protects & restores interior surfaces. Detailers reorder." },
  { name: "Interior Cleaner (1 gal)", art: "0893156001", cat: "Interior Care", size: "1 gal", note: "Versatile interior cleaner for daily detailing volume." },
  { name: "Carpet Shampoo (1 gal)", art: "0893200001", cat: "Interior Care", size: "1 gal", note: "Deep-clean carpet shampoo for interior restoration." },
  { name: "Cockpit Care", art: "08934731", cat: "Interior Care", size: "500 mL", note: "Cleans & protects dash/trim from UV. High-frequency detail reorder." },

  /* ---- A/C SERVICE ---- */
  { name: "R134A Refrigerant (30 lb)", art: "1892764401", cat: "A/C Service", size: "30 lb cyl", note: "Legacy-platform refrigerant. Sells in 4-packs/bundle packages." },
  { name: "R1234YF Refrigerant (10 lb)", art: "1892764502", cat: "A/C Service", size: "10 lb cyl", note: "Late-model A/C refrigerant (Honeywell Solstice yf). High-margin bundle." },
  { name: "Master A/C O-Ring Assortment", art: "1964090911", cat: "A/C Service", size: "2,025 pc", note: "Covers virtually every A/C fitting size in one tray. Instant A/C department." },
  { name: "A/C Leak Stop w/ Can Tap Package", art: "1964764300", cat: "A/C Service", size: "12×4 oz + hose", note: "Ready-to-use leak-stop kit for quick field repairs." },
  { name: "Universal A/C UV Dye (10 app)", art: "0892764041", cat: "A/C Service", size: "10-app bottle", note: "UV dye pinpoints leaks fast. Per-vehicle upsell driver." },
  { name: "A/C Dye Injector Kit", art: "1964764016", cat: "A/C Service", size: "kit", note: "Complete inject-and-document kit: connector, adapter, dye, applicator, labels." },
  { name: "1234YF Coupler — High Side", art: "0764002125", cat: "A/C Service", size: "each", note: "Dedicated high-side R1234YF coupler for modern A/C." },
  { name: "1234YF Coupler — Low Side", art: "0764002126", cat: "A/C Service", size: "each", note: "Dedicated low-side R1234YF coupler for modern A/C." },

  /* ---- HOSE FAB / HYDRAULICS ---- */
  { name: "Portable Hydraulic Hose Crimper (w/ dies)", art: "CCS160PD", cat: "Hydraulics", size: "to 1¼ in 4-spiral", note: "Crimp your own hoses on-site — zero downtime waiting on hose shops." },
  { name: "Benchtop Hose Crimper 1¼ in", art: "CCS165", cat: "Hydraulics", size: "60-ton, 110V", note: "In-house hose fab station w/ full die set + storage. Massive uptime sell." },
  { name: "Air-Hydraulic Hand Pump", art: "CHH13", cat: "Hydraulics", size: "10,000 PSI", note: "Air-powered crimper pump, 3-way valve. Portable hose builds anywhere." },
  { name: "JIC Male Connector BSPT 1/2 in", art: "MD700088", cat: "Hydraulics", size: "1/2 JIC x 1/2-14 BSPT", note: "Common hydraulic adapter — stock for on-site hose builds." },
  { name: "Spiral Hose Protector 1.00 in OD", art: "089480025", cat: "Hydraulics", size: "25 ft", note: "Yellow-lined wear-indicator hose guard. Protects hydraulic lines from abrasion." },

  /* ---- DIESEL / EMISSIONS ---- */
  { name: "WD-40 Specialist Machine & Engine Degreaser", art: "1899300070", cat: "Cleaning", size: "18 oz", note: "Deep-penetrating low-residue foaming degreaser. Recognizable WD-40 brand pull." },

  /* ---- TOOLS / DIAGNOSTIC ---- */
  { name: "The Original Thread Checker", art: "SWTC26", cat: "Tools", size: "handheld", note: "Identify any thread on the spot. Quick everyday bench tool." },
  { name: "Wall-Mounted Thread Checker", art: "SWTCWM1", cat: "Tools", size: "wall unit", note: "Fixed thread-ID station for the shop wall." },
  { name: "Leak Source Finder", art: "0892450238", cat: "Tools", size: "8 fl oz (1:10)", note: "Bubble solution pinpoints air/tire/gas/pressure leaks fast. Cheap, sticky reorder." },
  { name: "TPMS Parts Assortment #1", art: "0879023025", cat: "Tire & Wheel", size: "145 pc", note: "Chrysler/Ford/GM valve cores, caps + torque tool. One-tray TPMS service." },

  /* ---- TIRE / WHEEL ---- */
  { name: "Zebra Hose Clamp Rack Assortment", art: "05391207", cat: "Fasteners & Clamps", size: "120 pc, 8–120mm", note: "Pre-stocked display rack — instant clamp department on the customer's wall." },
  { name: "Steel-Coated Adhesive Wheel Weights (1/4 oz)", art: "183014300", cat: "Tire & Wheel", size: "3 oz strip", note: "Lead-free, works steel & aluminum rims, peel-and-stick. Eco + recurring." },
  { name: "Wheel Weights on a Roll (1/4 oz steel)", art: "0830142014", cat: "Tire & Wheel", size: "1,272 segments", note: "One roll replaces multiple weight styles. High-volume tire shops." },

  /* ---- PARTS WASHING (SmartWasher) ---- */
  { name: "SmartWasher SW-23 Mobile Parts Washer", art: "1004858", cat: "Parts Washing", size: "15 gal, 400 lb", note: "Bioremediating washer — microbes eat the grease, ZERO hazardous waste. Kills hauler fees + EPA burden." },
  { name: "SmartWasher SW-28 SuperSink Parts Washer", art: "1004851", cat: "Parts Washing", size: "25 gal, 500 lb", note: "Dual-station bioremediating washer for production floors. No solvent disposal." },
  { name: "OzzyJuice SW-1 Cleaning Solution", art: "SW-1", cat: "Parts Washing", size: "pail", note: "Bioremediating fluid — self-cleaning, regenerates continuously. Recurring consumable lock-in." },
  { name: "OzzyMat FL-4 Microbe Filter", art: "FL-4", cat: "Parts Washing", size: "mat", note: "Microbe-infused filter; swap every 30 days. The recurring razor-blade of the SmartWasher system." },

  /* ---- FOOD-GRADE (NSF) ---- */
  { name: "WD-40 Specialist Food-Grade Lubricant (H1)", art: "VERIFY-WD40-H1", cat: "Food-Grade", size: "12 oz aerosol", note: "NSF H1, -100°F to 400°F. Incidental food contact OK. Unlocks food/bev/dairy/bakery plants. (Art # not printed in deck — get from rep.)" },
  { name: "WD-40 Specialist Food-Processing Contact Cleaner (K2)", art: "VERIFY-WD40-K2", cat: "Food-Grade", size: "12 oz aerosol", note: "NSF K2 electrical contact cleaner for food plants. Fast-dry, residue-free. (Art # not printed — get from rep.)" },

  /* ---- JANITORIAL / SANITATION ---- */
  { name: "Scott Shop Towels (Blue, std roll)", art: "5899800950", cat: "Janitorial", size: "55T x 12 rolls", note: "Heavy-duty DRC towel for shop fluid cleanup. Easy add-on consumable for any account." },
  { name: "WypAll X60 General Clean Cloths", art: "1899100515", cat: "Janitorial", size: "126/box x 10", note: "HydroKnit cloths — reusable-style performance at disposable cost." },
  { name: "Purell Advanced Hand Sanitizer TFX Refill", art: "1899301259", cat: "Janitorial", size: "1,200 mL x2", note: "Kills 99.99% germs in 15 sec. Unlocks healthcare/schools/food service." },
  { name: "Clorox ToiletWand Disposable System", art: "1695943932", cat: "Janitorial", size: "wand + 6 refills", note: "No brush contact, no cross-contamination. Easy restroom-care upsell for facilities/schools." },
  { name: "Tork Advanced Hand Towel Roll", art: "1899000558", cat: "Janitorial", size: "800 ft x 6", note: "800-ft rolls cut maintenance visits & labor. Facilities/property lock-in." },

  /* ---- SAFETY / PPE (NSI) ---- */
  { name: "NSI Fall Protection Harness + 6' Lanyard Combo", art: "NS26979", cat: "Safety & PPE", size: "universal", note: "ANSI Z359 harness + shock lanyard + carry bag. Anchors construction/industrial PPE accounts." },
  { name: "NSI KutShieldz A3 Cut-Resistant Gloves (Hi-Vis)", art: "NS922HL", cat: "Safety & PPE", size: "XS–2XL", note: "ANSI A3 cut, abrasion 4, 72 pr/case. Sticky recurring PPE revenue." },
  { name: "NSI Ultrabrite Class 2 Breakaway Safety Vest", art: "NS558L", cat: "Safety & PPE", size: "XS–8X", note: "ANSI Class 2 hi-vis, breakaway, 4 pockets. Easy PPE anchor product." },

  /* ---- STAINLESS / BRASS FASTENERS ---- */
  { name: "316 SS Nylon Insert Lock Nut 3/8 in", art: "2391138", cat: "Fasteners (SS/Brass)", size: "3/8 in coarse", note: "316/A4 stainless (molybdenum) — marine, coastal, food-plant corrosion resistance." },
  { name: "316 SS Hex Flange Nut 3/8 in (serrated)", art: "23993816", cat: "Fasteners (SS/Brass)", size: "3/8 in coarse", note: "Serrated 316 flange nut for chloride/saltwater environments." },
  { name: "Brass 90° Street Elbow 3/4 in", art: "1884058005", cat: "Fasteners (SS/Brass)", size: "3/4 FPTxMPT", note: "Brass = non-sparking — plumbing/gas + flammable-environment fittings." },
  { name: "Brass DOT Composite Branch Tee 1/2 in", art: "1886720808", cat: "Fasteners (SS/Brass)", size: "1/2x1/2 PI", note: "DOT-rated push-to-connect for air/brake lines. Truck & trailer builds." },
];

/* Distinct categories for filter chips */
const CATALOG_CATS = [...new Set(CATALOG.map(p => p.cat))];
