// Centralized content for Pat's Sheet Metal — Industrial Hardcore

export type ViewId =
  | "home"
  | "about"
  | "services"
  | "gallery"
  | "areas"
  | "reviews"
  | "team"
  | "faq"
  | "contact";

export const SHOP = {
  name: "Pat's Sheet Metal",
  phone: "(512) 555-0199",
  phoneHref: "tel:+15125550199",
  email: "shop@patssheetmetal.com",
  address: "4800 Industrial Ridge Rd, Austin, TX 78745",
  hours: "Mon–Fri · 7:00 AM – 5:00 PM",
  tagline: "Forged in Austin. Built to Outlast.",
  // Google Business Profile — used for the "Leave a Review on Google" CTA.
  // Replace with the shop's actual Google review write URL
  // (https://search.google.com/local/writereview?placeid=...).
  googleReviewUrl: "https://www.google.com/maps?q=Pat%27s+Sheet+Metal+Austin+TX",
  googleProfileUrl: "https://www.google.com/maps?q=Pat%27s+Sheet+Metal+Austin+TX",
};

export const NAV_ITEMS: { id: ViewId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "The Forge" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "The Anvil" },
  { id: "areas", label: "Service Areas" },
  { id: "reviews", label: "Reviews" },
  { id: "team", label: "Our Team" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Get a Quote" },
];

export type ServiceId = "fabrication" | "hvac" | "architectural";

export interface Service {
  id: ServiceId;
  title: string;
  tag: string;
  icon: string; // lucide icon name
  short: string;
  h1: string;
  copy: string;
  bullets: string[];
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: "fabrication",
    title: "Heavy-Duty Fabrication",
    tag: "Heavy-Gauge",
    icon: "Hammer",
    short:
      "Custom enclosures, heavy-gauge welding, and structural metalwork built for maximum durability.",
    h1: "Custom Fabrication: Zero Compromises.",
    copy: "From custom enclosures to industrial components, we fabricate to your exact specs. Heavy-gauge steel, precision welds, and tolerances held to the millimeter — built to take a beating and keep performing.",
    bullets: [
      "Custom electrical & equipment enclosures",
      "Heavy-gauge structural welding (MIG / TIG / Stick)",
      "Industrial brackets, frames & mounting systems",
      "Prototype to high-volume production runs",
      "Powder coating & protective finishes",
    ],
    image: "/images/gallery-structural.png",
  },
  {
    id: "hvac",
    title: "HVAC & Ductwork",
    tag: "Air-Sealed",
    icon: "Wind",
    short:
      "Precision-cut, perfectly sealed ductwork that optimizes airflow and slashes energy costs.",
    h1: "Precision Ductwork. Maximum Airflow.",
    copy: "Leaky ductwork is money down the drain. We engineer custom HVAC solutions that fit perfectly and perform flawlessly — sealed seams, optimized bends, and airflow that your energy bill will thank you for.",
    bullets: [
      "Custom galvanized & stainless ductwork",
      "Commercial HVAC runs & transitions",
      "Aerodynamic bend & fitting engineering",
      "Sealed seams — zero-leak guarantee",
      "Retrofit & replacement duct systems",
    ],
    image: "/images/gallery-ductwork.png",
  },
  {
    id: "architectural",
    title: "Architectural Metal",
    tag: "Hand-Finished",
    icon: "Gem",
    short:
      "Custom flashings, copper accents, and ornamental steel that elevates your property's curb appeal.",
    h1: "Architectural Metal: Elevate Your Space.",
    copy: "Custom range hoods, staircases, flashing, and copper work that turns structural necessity into visual art. Every piece is hand-finished to elevate your property's curb appeal and stand the test of time.",
    bullets: [
      "Custom copper range hoods & vent covers",
      "Ornamental staircases & railings",
      "Architectural flashings & copings",
      "Copper gutters, downspouts & accents",
      "Hand-finished patina & polish work",
    ],
    image: "/images/gallery-copper-hood.png",
  },
];

export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin" | "twitter";
  url: string;
}

export interface Craftsman {
  name: string;
  role: string;
  image: string;
  specialty: string;
  quote: string;
  certifications: string[];
  equipment: string[];
  social: SocialLink[];
}

export const CRAFTSMEN: Craftsman[] = [
  {
    name: "Pat McAllister",
    role: "Founder · Master Welder",
    image: "/images/craftsman-pat.png",
    specialty: "Heavy Gauge Welding",
    quote: "If it's structural, it's personal.",
    certifications: ["AWS D1.1 Certified", "30+ Years Experience", "Structural Steel Specialist"],
    equipment: ["Miller Multimatic 255", "Lincoln Power MIG 360MP", "Heavy-duty press brake"],
    social: [
      { platform: "facebook", url: "https://facebook.com/pats.sheetmetal" },
      { platform: "instagram", url: "https://instagram.com/pats.sheetmetal" },
      { platform: "linkedin", url: "https://linkedin.com/in/pat-mcallister" },
    ],
  },
  {
    name: "Elena Vasquez",
    role: "Lead Fabricator",
    image: "/images/craftsman-fabricator.png",
    specialty: "Architectural Finishes",
    quote: "Precision is non-negotiable.",
    certifications: ["Architectural Sheet Metal Cert.", "Copper & Specialty Metals", "15 Years Experience"],
    equipment: ["Slip roll & bar folder", "TIG welding rig", "Polishing & patina station"],
    social: [
      { platform: "instagram", url: "https://instagram.com/elena.fabricates" },
      { platform: "linkedin", url: "https://linkedin.com/in/elena-vasquez" },
      { platform: "twitter", url: "https://twitter.com/elena_fab" },
    ],
  },
  {
    name: "Marcus Reed",
    role: "HVAC Lead",
    image: "/images/craftsman-hvac.png",
    specialty: "Aerodynamic Ductwork",
    quote: "Airflow is an art.",
    certifications: ["SMACNA Certified", "HVAC Design & Layout", "12 Years Experience"],
    equipment: ["CNC plasma duct cutter", "Pittsburgh lock former", "Seam-sealing rig"],
    social: [
      { platform: "facebook", url: "https://facebook.com/marcus.reed.hvac" },
      { platform: "linkedin", url: "https://linkedin.com/in/marcus-reed" },
      { platform: "twitter", url: "https://twitter.com/marcus_reed" },
    ],
  },
];

export interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
  project: string;
  date: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Sarah M.",
    role: "Homeowner · Westlake",
    rating: 5,
    text: "Pat's team fabricated a custom copper range hood for my kitchen renovation and I genuinely could not be happier. The hammer-finished texture is stunning, the welds are flawless, and they matched my stonemason's color palette perfectly. They treated a residential hood like it was a museum piece. True artists.",
    project: "Copper Range Hood",
    date: "March 2024",
  },
  {
    name: "Derek H.",
    role: "Construction Foreman · Austin Commercial GC",
    rating: 5,
    text: "We use Pat's for all our commercial HVAC ductwork — three downtown office build-outs in the last two years. Fast turnaround, zero leaks on every pressure test, and they have never missed a deadline. That kind of reliability is rare. They're first on our call sheet now.",
    project: "Commercial HVAC Run",
    date: "January 2024",
  },
  {
    name: "David & Maria T.",
    role: "Homeowners · Round Rock",
    rating: 5,
    text: "Custom steel staircase with reclaimed oak treads for our loft. The craftsmanship is unreal — every weld is a work of art and the fit was dead-on to the millimeter. They walked us through finish options and the patina came out exactly like the renderings. Worth every penny.",
    project: "Architectural Staircase",
    date: "November 2023",
  },
  {
    name: "Lakeside Builders",
    role: "General Contractor · Lakeway",
    rating: 5,
    text: "Architectural copper flashing and copings on a luxury lakefront build. Pat's hit every spec, coordinated with the roofer on-site, and finished a full week ahead of schedule. The client called the metalwork the 'crown jewel' of the exterior. Our go-to fabricator for high-end work.",
    project: "Architectural Flashing",
    date: "September 2023",
  },
  {
    name: "Marcus L.",
    role: "Facility Manager · Georgetown Manufacturing",
    rating: 5,
    text: "Heavy-gauge powder-coated enclosures for our plant — twelve units, all identical, all built like tanks. Tolerances held tight across the whole run and the finish is bulletproof. These guys don't cut corners, they cut precision. Already re-ordering for phase two.",
    project: "Industrial Enclosures",
    date: "July 2023",
  },
  {
    name: "Jenna R.",
    role: "Homeowner · Cedar Park",
    rating: 5,
    text: "Replaced all the leaky ductwork in our 90s home. Crew was professional, on time, and cleaned up every scrap. Our energy bill dropped noticeably the first month and the airflow is finally balanced. Wish we'd called them years ago. Highly recommend.",
    project: "HVAC Ductwork Retrofit",
    date: "May 2023",
  },
  {
    name: "Elena K.",
    role: "Interior Designer · Austin",
    rating: 5,
    text: "I specify custom metalwork on high-end residential projects all over Austin, and Pat's is the only shop I trust with a statement piece. They've done brass range hoods, steel pantry doors, and a copper bar back for my clients — every single one flawless and delivered when promised.",
    project: "Custom Architectural Metal",
    date: "February 2024",
  },
  {
    name: "Hill Country HVAC",
    role: "Subcontractor · Travis County",
    rating: 5,
    text: "Been subcontracting our custom duct fittings to Pat's for over five years. Tightest seams in the business, fair pricing, and they'll turn a rush order when the jobsite demands it. As a trade partner they're the most dependable shop we work with, bar none.",
    project: "Custom Duct Fittings",
    date: "October 2023",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Do you work with homeowners or just commercial contractors?",
    a: "Both — and we treat every job with the same standard. A homeowner's custom copper range hood gets the same precision as a commercial HVAC run. No job is too small to matter, and none is too large to handle. You get the same shop, the same craftsmen, and the same obsession with quality either way.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. Pat's Sheet Metal is a fully licensed Texas fabricator and carries comprehensive liability insurance. We're happy to share our certificate of insurance with your GC, property manager, or HOA before any work begins — just ask.",
  },
  {
    q: "Do you stand behind your work with a warranty?",
    a: "Absolutely. Every fabrication carries a workmanship guarantee — welds, seams, and finishes are warrantied against defects. Our HVAC ductwork ships with a zero-leak guarantee on sealed seams. If something we built ever fails under normal use, we make it right.",
  },
  {
    q: "How fast is your typical turnaround?",
    a: "Standard ductwork and flashing orders are out the door fast — often within a few business days. Custom fabrication timelines depend on complexity and current shop load, but we always give you a clear, honest deadline upfront and hit it. No vague 'two-ish weeks' — you'll know the date.",
  },
  {
    q: "Can you handle large-scale production runs?",
    a: "Yes. Our shop is equipped for both one-off custom pieces and high-volume production runs. From a single enclosure to a hundred matching units, we scale the process to your build and keep quality consistent across every piece.",
  },
  {
    q: "Can you help with design, or do I need finished plans?",
    a: "We can do either. Bring us finished blueprints and we'll fabricate to spec — or come to us with a sketch on a napkin and a rough idea, and our team will help engineer the details: gauge selection, joinery, finishes, and the most cost-effective way to build it. We're your partner from concept to delivery, not just a cut-and-weld vendor.",
  },
  {
    q: "How does pricing work? Any hidden costs?",
    a: "Pricing is transparent and quoted upfront based on material, complexity, and volume — no surprises on the invoice. Once we review your specs, you get a clear, itemized quote before any work starts. If something changes mid-build, we communicate the cost impact before proceeding, never after.",
  },
  {
    q: "Do you offer online quotes?",
    a: "Yes — and it's the fastest way to get started. Use our 'Blueprint to Build' quote form on the Contact page. Tell us what you need, upload a PDF or sketch if you have one, and a craftsman (not a salesperson) will get back to you within one business day with a real estimate. There's no obligation and no cost to request a quote.",
  },
  {
    q: "What materials do you work with?",
    a: "Steel, stainless steel, galvanized, aluminum, copper, brass, and zinc. We help you choose the right metal for the job — balancing durability, aesthetics, weather performance, and budget. If it's metal, we can shape it to spec.",
  },
  {
    q: "Do you deliver outside Austin?",
    a: "Yes. Based in Austin, we deliver across Travis County and the surrounding Hill Country with fast weekly routes to Round Rock, Cedar Park, Georgetown, Pflugerville, San Marcos, Buda, and Lakeway. Beyond that, we crate and ship custom pieces statewide. See our Service Areas page for details.",
  },
  {
    q: "What if I have a rush or emergency project?",
    a: "Tell us your deadline and we'll tell you the truth. We keep flex in the schedule for genuine emergencies — a failed duct run on a jobsite, a missing flashing holding up an inspection — and we'll do everything we can to keep your project moving. Rush fees, if any, are always quoted upfront.",
  },
  {
    q: "How will you keep me updated during the build?",
    a: "You'll hear from a real person, not a ticket system. We confirm receipt of every quote immediately, follow up with questions or a quote within one business day, and keep you posted at each milestone — material sourced, fabrication started, finishing, and ready-for-delivery. You're never left wondering where your project stands.",
  },
];

export const SERVICE_AREAS = [
  { name: "Austin", note: "Home base — Travis County", primary: true },
  { name: "Round Rock", note: "Fast delivery", primary: false },
  { name: "Cedar Park", note: "Fast delivery", primary: false },
  { name: "Georgetown", note: "Weekly routes", primary: false },
  { name: "Pflugerville", note: "Fast delivery", primary: false },
  { name: "San Marcos", note: "Scheduled delivery", primary: false },
  { name: "Buda", note: "Scheduled delivery", primary: false },
  { name: "Lakeway", note: "Scheduled delivery", primary: false },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: "Fabrication" | "HVAC" | "Architectural";
  image: string;
  blurb: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "copper-hood",
    title: "Hand-Hammered Copper Range Hood",
    category: "Architectural",
    image: "/images/gallery-copper-hood.png",
    blurb: "Custom patina copper hood, hand-finished for a Westlake kitchen renovation.",
  },
  {
    id: "ductwork",
    title: "Commercial HVAC Duct Run",
    category: "HVAC",
    image: "/images/gallery-ductwork.png",
    blurb: "Zero-leak galvanized ductwork for a downtown Austin office build-out.",
  },
  {
    id: "staircase",
    title: "Industrial Steel & Wood Staircase",
    category: "Architectural",
    image: "/images/gallery-staircase.png",
    blurb: "Ornamental steel staircase with reclaimed treads for a Round Rock loft.",
  },
  {
    id: "enclosure",
    title: "Heavy-Gauge Equipment Enclosure",
    category: "Fabrication",
    image: "/images/gallery-enclosure.png",
    blurb: "Powder-coated steel enclosure built to spec for a Georgetown facility.",
  },
  {
    id: "flashing",
    title: "Architectural Copper Flashing",
    category: "Architectural",
    image: "/images/gallery-flashing.png",
    blurb: "Custom copper flashing with natural patina on a Lakeway luxury home.",
  },
  {
    id: "structural",
    title: "Structural Steel Fabrication",
    category: "Fabrication",
    image: "/images/gallery-structural.png",
    blurb: "Heavy I-beam welding for a commercial structural build in Austin.",
  },
];

export const TRUST_STATS = [
  { value: "5-Star", label: "Austin's Trusted Metal Craftsmen" },
  { value: "±1mm", label: "Precision Engineering Tolerances" },
  { value: "On Schedule", label: "Fast Turnarounds, Every Time" },
];
