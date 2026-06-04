/**
 * BRAND CONFIGURATION — FOR HER THRONE
 *
 * Single source of truth for all brand-specific variables.
 * To launch a new brand: duplicate this file, update every value below,
 * run the sync script, and push. Zero structural changes needed elsewhere.
 *
 * Future brands: Latina wellness, Asian women's vitality, Black men's health,
 *                trans women's hormonal support, etc.
 *
 * CLAIMS_REVIEW: Before go-live, every sourceUrl must point to the exact
 * published study, not a landing page. Legal must sign off on all stat copy.
 */

const BRAND_CONFIG = {

  // ── Identity ───────────────────────────────────────────────────────────────
  brand: {
    name:               "For Her Throne",
    handle:             "for-her-throne",          // used in CSS classes, IDs, file names
    tagline:            "The healthcare system wasn't built with you in mind. For Her Throne was.",
    domain:             "forherthrone.myshopify.com",
    community:          "Black women",
    communityPossessive:"Black women's",
  },

  // ── Product ────────────────────────────────────────────────────────────────
  product: {
    name:     "For Her Throne Daily Reign",
    subtitle: "Hormonal Balance & Vitality Formula",
    price:    45.00,
    currency: "USD",
    handle:   "for-her-throne-daily-reign",          // Shopify product URL handle
  },

  // ── Color Palette ──────────────────────────────────────────────────────────
  colors: {
    primary:      "#0D0818",   // near-black deep navy — backgrounds
    accent:       "#C9A84C",   // gold — CTAs, highlights
    secondary:    "#4A2882",   // royal purple — section accents
    text:         "#FDF8F0",   // warm off-white — body text on dark
    textDark:     "#0D0818",   // body text on light
    surface:      "#1A1230",   // card backgrounds
    surfaceLight: "#231A3C",   // elevated card backgrounds
    accentLight:  "#E8C97A",   // lighter gold for hover states
    border:       "rgba(201, 168, 76, 0.25)",
  },

  // ── Typography ─────────────────────────────────────────────────────────────
  typography: {
    headingFont: "'Playfair Display', Georgia, serif",
    bodyFont:    "'Inter', system-ui, -apple-system, sans-serif",
  },

  // ── Health Disparity Data ──────────────────────────────────────────────────
  // CLAIMS_REVIEW: Replace every sourceUrl placeholder with exact PubMed or
  // CDC/NIH article URL before launch. Do NOT publish with placeholder URLs.
  healthStats: [
    {
      stat:        "82%",
      description: "of Black women are Vitamin D deficient",
      source:      "NIH / National Health and Nutrition Examination Survey",
      sourceUrl:   "CLAIMS_REVIEW_INSERT_EXACT_URL",
    },
    {
      stat:        "8 years",
      description: "earlier perimenopause onset compared to white women on average",
      source:      "Study of Women's Health Across the Nation (SWAN), CDC",
      sourceUrl:   "CLAIMS_REVIEW_INSERT_EXACT_URL",
    },
    {
      stat:        "3×",
      description: "higher rate of iron deficiency anemia vs. non-Hispanic white women",
      source:      "NIH / National Health and Nutrition Examination Survey",
      sourceUrl:   "CLAIMS_REVIEW_INSERT_EXACT_URL",
    },
    {
      stat:        "Underdiagnosed",
      description: "Black women with PCOS face significant diagnostic delays and dismissal",
      source:      "NIH / Endocrine Society Research",
      sourceUrl:   "CLAIMS_REVIEW_INSERT_EXACT_URL",
    },
  ],

  // ── Ingredient Stories ─────────────────────────────────────────────────────
  // CLAIMS_REVIEW: "benefit" lines must NOT claim to diagnose/treat/cure/prevent
  // any disease. Use "supports," "may help," "traditionally used for."
  // Each ingredient needs an individual published-research citation before launch.
  ingredients: [
    {
      name:      "Black Cohosh",
      dose:      "160mg",
      icon:      "🌿",
      relevance: "Black women experience perimenopause on average 8 years earlier — Black Cohosh addresses that earlier timeline directly.",
      benefit:   "Supports hormonal comfort and menopausal transition",
      // CLAIMS_REVIEW: cite specific Black Cohosh + menopausal symptom RCT
    },
    {
      name:      "Chasteberry (Vitex)",
      dose:      "50mg",
      icon:      "🫐",
      relevance: "PCOS and cycle irregularity disproportionately go undiagnosed in Black women. Vitex supports the cycle regulation they deserve.",
      benefit:   "Supports cycle regularity and hormonal balance",
      // CLAIMS_REVIEW: cite Vitex agnus-castus + PMS/PCOS study
    },
    {
      name:      "Dong Quai",
      dose:      "150mg",
      icon:      "🌸",
      relevance: "Used for centuries across Asian and African healing traditions for menstrual wellness — largely absent from mainstream US supplement lines.",
      benefit:   "Traditional menstrual health and comfort support",
      // CLAIMS_REVIEW: cite Angelica sinensis traditional use documentation + modern study
    },
    {
      name:      "Red Clover",
      dose:      "400mg",
      icon:      "🍀",
      relevance: "Rich in isoflavones (phytoestrogens) that support the hormonal balance disrupted by early perimenopause.",
      benefit:   "Phytoestrogen source for hormonal equilibrium support",
      // CLAIMS_REVIEW: cite Trifolium pratense isoflavone + perimenopause study
    },
    {
      name:      "Sage Leaf",
      dose:      "200mg",
      icon:      "🌱",
      relevance: "Hot flashes and night sweats begin earlier and present more severely in Black women. Sage Leaf targets these specific experiences.",
      benefit:   "Supports comfort during temperature regulation changes",
      // CLAIMS_REVIEW: cite Salvia officinalis + vasomotor symptoms study
    },
    {
      name:      "Wild Yam",
      dose:      "15mg",
      icon:      "🌾",
      relevance: "A natural source of diosgenin — a precursor that supports the adrenal and reproductive hormonal pathways.",
      benefit:   "Natural precursor support for hormonal pathways",
      // CLAIMS_REVIEW: cite Dioscorea villosa / diosgenin research
    },
    {
      name:      "Licorice Root",
      dose:      "150mg",
      icon:      "🪵",
      relevance: "Chronic stress directly disrupts hormonal health. Black women carry a disproportionate allostatic load — Licorice Root supports adrenal resilience.",
      benefit:   "Adrenal and stress hormone support",
      // CLAIMS_REVIEW: cite glycyrrhizin + cortisol study; FLAG contraindication
      // WARNING: Licorice Root is contraindicated for hypertension. Add label warning.
      // Black women have higher rates of hypertension — this MUST be on the label.
      contraindication: "Consult a healthcare provider if you have high blood pressure or are on blood pressure medication.",
    },
    {
      name:      "Red Raspberry Leaf",
      dose:      "50mg",
      icon:      "🍃",
      relevance: "A generational herb used across cultures for menstrual wellness, now formulated at a therapeutic dose.",
      benefit:   "Menstrual comfort and pelvic wellness support",
      // CLAIMS_REVIEW: cite Rubus idaeus + menstrual pain research
    },
  ],

  // ── Social & Creator ───────────────────────────────────────────────────────
  social: {
    instagram:     "fortherthrone",
    tiktok:        "fortherthrone",
    creatorHashtag:"#ForHerThrone",
    ugcCTA:        "Share your Daily Reign story",
    // CLAIMS_REVIEW: All creator UGC must carry individual experience disclosure.
    // Creator copy is their experience — never presented as brand health claims.
    creatorDisclosureText: "Individual experience. Results vary. Not a medical claim.",
  },

  // ── Brand Story ────────────────────────────────────────────────────────────
  about: {
    headline: "Built for you. Finally.",
    subheadline: "The research gap is real. So is this formula.",
    paragraphs: [
      "The healthcare system was not built with Black women in mind. The research gaps, the dismissals, the delayed diagnoses — they are not accidents. They are the result of decades of systemic exclusion from clinical trials, medical education, and supplement formulation.",
      "For Her Throne exists because that gap is real, documented, and unacceptable. Every ingredient in Daily Reign was chosen specifically for the hormonal health challenges that disproportionately affect Black women — challenges that mainstream wellness brands ignore entirely.",
      "This is not a product marketed to you as an afterthought. This was built from the data up, for you, first.",
    ],
    mission: "To close the wellness gap for Black women through evidence-informed supplementation and radical transparency.",
    valuesHeadline: "What we stand for",
    values: [
      { title: "Evidence first",    body: "Every ingredient tied to published research. Every stat cited. No wellness theater." },
      { title: "Radical transparency", body: "Full doses on the label. Full ingredient stories on the site. No proprietary blends." },
      { title: "Built for you",     body: "Not adapted. Not reformulated. Built from the data up, specifically for Black women's hormonal health." },
    ],
  },

  // ── Legal & Compliance ─────────────────────────────────────────────────────
  // CLAIMS_REVIEW: Legal review required on all copy before launch
  legal: {
    fdaDisclaimer:       "*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
    supplementFactsNote: "See Supplement Facts panel for complete ingredient and dosage information.",
    creatorDisclaimer:   "Creator content reflects their personal experience and is not a brand health claim.",
    consultNote:         "Consult your healthcare provider before starting any new supplement, especially if pregnant, nursing, or managing a medical condition.",
  },

};

// ── Exports ────────────────────────────────────────────────────────────────────
// CommonJS (Node / build scripts)
if (typeof module !== "undefined" && module.exports) {
  module.exports = BRAND_CONFIG;
}
// Browser global (loaded via <script> in theme.liquid)
if (typeof window !== "undefined") {
  window.BRAND_CONFIG = BRAND_CONFIG;
}
