import { useQuery } from "@tanstack/react-query";

import { api, type ApiPage } from "./api";

export type CmsField = {
  key: string;
  label: string;
  value: string;
  type?: "text" | "textarea" | "image";
};

export type CmsSection = {
  id: string;
  label: string;
  type: "hero" | "content" | "cards" | "form" | "settings" | "chart";
  fields: CmsField[];
};

export type CmsPage = {
  slug: string;
  title: string;
  status: "Published" | "Draft";
  updated: string;
  sections: CmsSection[];
};

export type CmsSettings = {
  siteName: string;
  email: string;
  phone: string;
  address: string;
  primaryColor: string;
  seoTitle: string;
};

export const defaultSettings: CmsSettings = {
  siteName: "Fashion Source BD",
  email: "info@fashionsource-bd.com",
  phone: "+8801613341001, +880168684132",
  address: "Zila Parishad, Fatullah, Narayanganj-1400, Dhaka, Bangladesh",
  primaryColor: "#17b86a",
  seoTitle: "Fashion Source BD - Export Oriented Garments Buying House",
};

const field = (key: string, label: string, value: string, type: CmsField["type"] = "text") => ({
  key,
  label,
  value,
  type,
});

const page = (
  slug: string,
  title: string,
  heroTitle: string,
  heroSubtitle: string,
  sections: CmsSection[],
): CmsPage => ({
  slug,
  title,
  status: "Published",
  updated: "Today",
  sections: [
    {
      id: "hero",
      label: "Hero Section",
      type: "hero",
      fields: [
        field("subtitle", "Small Label", heroSubtitle),
        field("title", "Hero Title", heroTitle, "textarea"),
        field("breadcrumb", "Breadcrumb", `Fashion Source BD / ${title}`),
      ],
    },
    ...sections,
  ],
});

export const defaultCmsPages: CmsPage[] = [
  {
    slug: "/",
    title: "Home",
    status: "Published",
    updated: "Today",
    sections: [
      {
        id: "hero",
        label: "Cinematic Hero",
        type: "hero",
        fields: [
          field("eyebrow", "Eyebrow Label", "Global Garments Sourcing House"),
          field(
            "title",
            "Headline",
            "Precision sourcing for brands that refuse to compromise.",
            "textarea",
          ),
          field(
            "subtitle",
            "Subtitle",
            "A 100% export-oriented buying house connecting international buyers with compliant, capable factories across Bangladesh — from concept to shipment.",
            "textarea",
          ),
          field("trust1", "Trust Badge 1", "Est. 1998"),
          field("trust2", "Trust Badge 2", "4 Global Offices"),
          field("trust3", "Trust Badge 3", "100+ Compliant Factories"),
          field("trust4", "Trust Badge 4", "BSCI-Aligned Sourcing"),
          field(
            "slide1Image",
            "Slide 1 Image",
            "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1800&q=82",
            "image",
          ),
          field(
            "slide2Image",
            "Slide 2 Image",
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=82",
            "image",
          ),
          field(
            "slide3Image",
            "Slide 3 Image",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=82",
            "image",
          ),
        ],
      },
      {
        id: "classic-stats",
        label: "Home Stats Band",
        type: "cards",
        fields: [
          field("stat1Value", "Stat 1 Value", "2017"),
          field("stat1Suffix", "Stat 1 Suffix", ""),
          field("stat1Label", "Stat 1 Label", "Established"),
          field("stat2Value", "Stat 2 Value", "150"),
          field("stat2Suffix", "Stat 2 Suffix", "+"),
          field("stat2Label", "Stat 2 Label", "Skilled Employees"),
          field("stat3Value", "Stat 3 Value", "134"),
          field("stat3Suffix", "Stat 3 Suffix", "+"),
          field("stat3Label", "Stat 3 Label", "Associated Factories"),
          field("stat4Value", "Stat 4 Value", "2"),
          field("stat4Suffix", "Stat 4 Suffix", ""),
          field("stat4Label", "Stat 4 Label", "Locations"),
        ],
      },
      {
        id: "about-editorial",
        label: "About (Editorial)",
        type: "content",
        fields: [
          field(
            "heading",
            "Heading",
            "Three decades of manufacturing intelligence, built into every order.",
            "textarea",
          ),
          field(
            "body",
            "Body",
            "Fashion Source BD is a 100% export-oriented buying house connecting international buyers with capable, compliant factories across Bangladesh. We manage the full lifecycle — vendor selection, sampling, production, quality control and shipment — as a single accountable partner.",
            "textarea",
          ),
        ],
      },
      {
        id: "services",
        label: "Services (Floating Cards)",
        type: "cards",
        fields: [
          field(
            "heading",
            "Section Heading",
            "A single accountable partner, end to end.",
            "textarea",
          ),
          field("researchTitle", "Card 1 Title", "Research"),
          field(
            "researchBody",
            "Card 1 Body",
            "New styles, fabrics, accessories and trims developed continuously from home and abroad.",
            "textarea",
          ),
          field("designTitle", "Card 2 Title", "Design"),
          field(
            "designBody",
            "Card 2 Body",
            "Seasonal trend forecasts and collections showcasing the latest market direction.",
            "textarea",
          ),
          field("sourcingTitle", "Card 3 Title", "Sourcing"),
          field(
            "sourcingBody",
            "Card 3 Body",
            "A practical vendor network and material support built on long-term relationships.",
            "textarea",
          ),
          field("productionTitle", "Card 4 Title", "Production"),
          field(
            "productionBody",
            "Card 4 Body",
            "Manufactured through sister concerns and long-term partner factories.",
            "textarea",
          ),
          field("logisticsTitle", "Card 5 Title", "Logistics"),
          field(
            "logisticsBody",
            "Card 5 Body",
            "Coordinated movement from approved production straight through to delivery.",
            "textarea",
          ),
        ],
      },
      {
        id: "why-choose-us",
        label: "Why Choose Us",
        type: "cards",
        fields: [
          field(
            "heading",
            "Section Heading",
            "The difference shows up in the details.",
            "textarea",
          ),
          field("item1Title", "Item 1 Title", "Long-Term Experience"),
          field(
            "item1Body",
            "Item 1 Body",
            "Since 1998, deep knowledge of Bangladesh's apparel manufacturing landscape.",
            "textarea",
          ),
          field("item2Title", "Item 2 Title", "Real-Time Order Tracking"),
          field(
            "item2Body",
            "Item 2 Body",
            "Our own ERP system gives customers live visibility into production status.",
            "textarea",
          ),
          field("item3Title", "Item 3 Title", "In-House Design & QA Teams"),
          field(
            "item3Body",
            "Item 3 Body",
            "Dedicated design and quality assurance teams support every order.",
            "textarea",
          ),
          field("item4Title", "Item 4 Title", "Compliant Factory Network"),
          field(
            "item4Body",
            "Item 4 Body",
            "Access to socially compliant, certified manufacturing partners.",
            "textarea",
          ),
        ],
      },
      {
        id: "factory-process",
        label: "Factory Process (Timeline)",
        type: "cards",
        fields: [
          field("heading", "Section Heading", "How We Work"),
          field(
            "intro",
            "Intro Text",
            "We prioritize your requirements, functioning as your committed representative - from receiving a query to after-sales support.",
            "textarea",
          ),
          field("item1Title", "Step 1 Title", "1. Receiving Query"),
          field(
            "item1Body",
            "Step 1 Body",
            "We carefully review every inquiry to understand your exact requirements.",
            "textarea",
          ),
          field("item2Title", "Step 2 Title", "2. Vendor Selection"),
          field(
            "item2Body",
            "Step 2 Body",
            "We select the right compliant, capable factory for your specific product.",
            "textarea",
          ),
          field("item3Title", "Step 3 Title", "3. Order & Execution"),
          field(
            "item3Body",
            "Step 3 Body",
            "Production is planned and executed with clear milestones and tracking.",
            "textarea",
          ),
          field("item4Title", "Step 4 Title", "4. Quality Assurance"),
          field(
            "item4Body",
            "Step 4 Body",
            "Inspection and quality checks run throughout the production cycle.",
            "textarea",
          ),
          field("item5Title", "Step 5 Title", "5. Shipping & Logistic"),
          field(
            "item5Body",
            "Step 5 Body",
            "Documentation and shipment coordination keep delivery on schedule.",
            "textarea",
          ),
          field("item6Title", "Step 6 Title", "6. After Sales Services"),
          field(
            "item6Body",
            "Step 6 Body",
            "We stay engaged after delivery to support repeat orders and feedback.",
            "textarea",
          ),
        ],
      },
      {
        id: "statistics",
        label: "Statistics",
        type: "cards",
        fields: [
          field("heading", "Section Heading", "Performance you can measure.", "textarea"),
          field("item1Label", "Metric 1 Label", "On-Time Delivery"),
          field("item2Label", "Metric 2 Label", "Quality Pass Rate"),
          field("item3Label", "Metric 3 Label", "Repeat Buyer Rate"),
          field("item4Label", "Metric 4 Label", "Factory Compliance Coverage"),
        ],
      },
      {
        id: "factory-showcase",
        label: "Factory Showcase",
        type: "cards",
        fields: [
          field("heading", "Section Heading", "Where every order comes to life.", "textarea"),
          field("item1Label", "Image 1 Label", "Cutting Section"),
          field("item2Label", "Image 2 Label", "Sewing Line"),
          field("item3Label", "Image 3 Label", "Quality Inspection"),
          field("item4Label", "Image 4 Label", "Warehouse"),
          field("item5Label", "Image 5 Label", "Finished Goods"),
        ],
      },
      {
        id: "global-presence",
        label: "Global Presence",
        type: "content",
        fields: [
          field("heading", "Heading", "Four offices. Every major export market.", "textarea"),
          field(
            "body",
            "Body",
            "From our Dhaka headquarters to sourcing and finance offices across Asia, the Middle East and Europe, we stay close to both production and the buyers we serve.",
            "textarea",
          ),
        ],
      },
      {
        id: "values",
        label: "Our Values",
        type: "cards",
        fields: [
          field("heading", "Section Heading", "Our Values"),
          field("item1Title", "Item 1 Title", "Excellence"),
          field(
            "item1Body",
            "Item 1 Body",
            "We strive to deliver exceptional results and ensure customer satisfaction.",
            "textarea",
          ),
          field("item2Title", "Item 2 Title", "Integrity"),
          field(
            "item2Body",
            "Item 2 Body",
            "We create trust through responsible action and honest relationships.",
            "textarea",
          ),
          field("item3Title", "Item 3 Title", "Customer Focus"),
          field(
            "item3Body",
            "Item 3 Body",
            "Nothing means more to us than the satisfaction of our customers.",
            "textarea",
          ),
          field("item4Title", "Item 4 Title", "Collaboration"),
          field(
            "item4Body",
            "Item 4 Body",
            "We achieve more when we work together and all pull in the same direction.",
            "textarea",
          ),
          field("item5Title", "Item 5 Title", "Accountability"),
          field(
            "item5Body",
            "Item 5 Body",
            "Each of us is accountable for our words, actions and results.",
            "textarea",
          ),
          field("item6Title", "Item 6 Title", "Respect"),
          field(
            "item6Body",
            "Item 6 Body",
            "We value everyone and treat people with dignity and professionalism.",
            "textarea",
          ),
        ],
      },
      {
        id: "industries",
        label: "Industries Served",
        type: "cards",
        fields: [
          field("heading", "Section Heading", "Built for every apparel category.", "textarea"),
          field("item1Title", "Industry 1", "Fashion"),
          field("item2Title", "Industry 2", "Sportswear"),
          field("item3Title", "Industry 3", "Denim"),
          field("item4Title", "Industry 4", "Kids Wear"),
          field("item5Title", "Industry 5", "Workwear"),
          field("item6Title", "Industry 6", "Uniform"),
          field("item7Title", "Industry 7", "Outerwear"),
        ],
      },
      {
        id: "testimonials",
        label: "Testimonials",
        type: "cards",
        fields: [
          field("heading", "Section Heading", "Trusted by sourcing teams worldwide.", "textarea"),
          field(
            "item1Quote",
            "Quote 1",
            "Order visibility changed completely once we started working with their ERP tracking. We always know exactly where production stands.",
            "textarea",
          ),
          field("item1Role", "Role 1", "Sourcing Director"),
          field("item1Company", "Company 1", "European Activewear Brand"),
          field(
            "item2Quote",
            "Quote 2",
            "Their QA team catches issues before they become our problem. That reliability is worth more than a lower quote.",
            "textarea",
          ),
          field("item2Role", "Role 2", "Head of Procurement"),
          field("item2Company", "Company 2", "North American Retail Chain"),
          field(
            "item3Quote",
            "Quote 3",
            "From sampling to shipment, communication never went quiet. That single point of accountability makes a real difference.",
            "textarea",
          ),
          field("item3Role", "Role 3", "Merchandising Manager"),
          field("item3Company", "Company 3", "UK Fashion Importer"),
        ],
      },
      {
        id: "cta-banner",
        label: "Let's Work Together Banner",
        type: "content",
        fields: [
          field("heading", "Heading", "Let's Work Together"),
          field(
            "subtext",
            "Subtext",
            "If you find yourself questioning, 'Is this the best it can be?' then look no further — we are the right team to assist you.",
            "textarea",
          ),
          field("button", "Button Label", "Contact Us"),
        ],
      },
    ],
  },
  page(
    "/about",
    "About Us",
    "A sourcing partner built around practical garment execution.",
    "ABOUT US",
    [
      {
        id: "company-profile",
        label: "Company Profile",
        type: "content",
        fields: [
          field(
            "heading",
            "Section Heading",
            "We connect buyers with capable factories and disciplined follow-up.",
            "textarea",
          ),
          field(
            "body",
            "Section Body",
            "Fashion Source BD works as a buying and trading house for export-oriented garment programs.",
            "textarea",
          ),
        ],
      },
      {
        id: "stats",
        label: "Stats Cards",
        type: "cards",
        fields: [
          field("stat1Value", "Stat 1 Value", "2017"),
          field("stat1Suffix", "Stat 1 Suffix", ""),
          field("stat1Label", "Stat 1 Label", "Industry Experience"),
          field("stat2Value", "Stat 2 Value", "150"),
          field("stat2Suffix", "Stat 2 Suffix", "+"),
          field("stat2Label", "Stat 2 Label", "Skilled Employees"),
          field("stat3Value", "Stat 3 Value", "134"),
          field("stat3Suffix", "Stat 3 Suffix", "+"),
          field("stat3Label", "Stat 3 Label", "Associated Factories"),
          field("stat4Value", "Stat 4 Value", "2"),
          field("stat4Suffix", "Stat 4 Suffix", ""),
          field("stat4Label", "Stat 4 Label", "Key Locations"),
        ],
      },
      {
        id: "goal",
        label: "Company Goal",
        type: "content",
        fields: [
          field("heading", "Goal Heading", "Long-term trust, measured in execution."),
          field(
            "body",
            "Goal Body",
            "Our goal is to become a reliable long-term partner through honest communication, disciplined follow-up and responsible sourcing practices.",
            "textarea",
          ),
        ],
      },
    ],
  ),
  page(
    "/services",
    "Our Services",
    "A structured sourcing workflow from concept to shipment.",
    "OUR SERVICES",
    [
      {
        id: "service-model",
        label: "Service Model",
        type: "content",
        fields: [
          field(
            "heading",
            "Heading",
            "Built for buyers who need reliable execution, not loose promises.",
            "textarea",
          ),
          field(
            "body",
            "Body",
            "Fashion Source BD manages sourcing work across vendor selection, sampling, quality follow-up, commercial support and shipment coordination.",
            "textarea",
          ),
        ],
      },
      {
        id: "service-flow",
        label: "Service Flow Steps",
        type: "cards",
        fields: [
          field("step1", "Step 1", "Research"),
          field("step2", "Step 2", "Development"),
          field("step3", "Step 3", "Sourcing"),
          field("step4", "Step 4", "Production"),
          field("step5", "Step 5", "Inspection"),
          field("step6", "Step 6", "Shipment"),
          field("step7", "Step 7", "Sampling"),
        ],
      },
      {
        id: "service-cards",
        label: "Service Cards",
        type: "cards",
        fields: [
          field("vendorTitle", "Card 1 Title", "Selection of Vendors"),
          field(
            "vendor",
            "Card 1 Body",
            "Factory assessment, capability review and vendor approval coordination.",
            "textarea",
          ),
          field("samplingTitle", "Card 2 Title", "Sampling"),
          field(
            "sampling",
            "Card 2 Body",
            "Buyer-led sample development across fabrics, colors, trims, fits and seasonal directions.",
            "textarea",
          ),
          field("qualityTitle", "Card 3 Title", "Total Quality Management"),
          field(
            "quality",
            "Card 3 Body",
            "Inspection, corrective action, measurement control, workmanship and packaging checks.",
            "textarea",
          ),
          field("statusTitle", "Card 4 Title", "Status Reporting"),
          field(
            "status",
            "Card 4 Body",
            "Multi-stage order updates, production tracking and delivery risk visibility.",
            "textarea",
          ),
          field("shippingTitle", "Card 5 Title", "Shipping Coordination"),
          field(
            "shipping",
            "Card 5 Body",
            "Document review, shipment follow-up and communication with buyer instructions.",
            "textarea",
          ),
          field("priceTitle", "Card 6 Title", "Price"),
          field(
            "price",
            "Card 6 Body",
            "Factory quotation review with practical market and local cost-structure understanding.",
            "textarea",
          ),
          field("otherTitle", "Card 7 Title", "Other Services"),
          field(
            "other",
            "Card 7 Body",
            "Market trend, new material, regulation and fashion development information.",
            "textarea",
          ),
        ],
      },
    ],
  ),
  page("/contact", "Contact", "Talk to our sourcing and operations team.", "CONTACT", [
    {
      id: "contact-info",
      label: "Contact Information",
      type: "settings",
      fields: [
        field("phone", "Phone", defaultSettings.phone),
        field("email", "Email", defaultSettings.email),
        field("address", "Address", defaultSettings.address, "textarea"),
        field("hours", "Office Hours", "Sun - Thu: 10:00 am - 07:00 pm", "textarea"),
      ],
    },
    {
      id: "contact-form",
      label: "Contact Form Copy",
      type: "form",
      fields: [
        field("heading", "Form Heading", "Send a message"),
        field(
          "description",
          "Form Description",
          "For product, supplier, buyer or partnership queries.",
          "textarea",
        ),
      ],
    },
  ]),
  page("/faq", "FAQ", "Answers for buyers, suppliers and partners.", "FAQ", [
    {
      id: "faq-list",
      label: "FAQ Questions",
      type: "cards",
      fields: [
        field("tag1", "Q1 Tag", "Company"),
        field("q1", "Q1 Question", "What kind of business organization is Fashion Source BD?"),
        field(
          "a1",
          "Q1 Answer",
          "Fashion Source BD is a buying house and garments sourcing partner based in Bangladesh.",
          "textarea",
        ),
        field("tag2", "Q2 Tag", "Products"),
        field("q2", "Q2 Question", "What is on Fashion Source BD's product list?"),
        field(
          "a2",
          "Q2 Answer",
          "Knits, flat knit, woven garments, workwear, jackets, towels and selected home textile items.",
          "textarea",
        ),
        field("tag3", "Q3 Tag", "Contact"),
        field("q3", "Q3 Question", "How can I contact Fashion Source BD?"),
        field(
          "a3",
          "Q3 Answer",
          "Email info@fashionsourcebd.com or call +88-09606-333222 for business inquiries.",
          "textarea",
        ),
        field("tag4", "Q4 Tag", "Buyers"),
        field("q4", "Q4 Question", "What type of client can approach Fashion Source BD?"),
        field(
          "a4",
          "Q4 Answer",
          "Retailers, importers, wholesalers and brands looking for reliable apparel sourcing support.",
          "textarea",
        ),
        field("tag5", "Q5 Tag", "Orders"),
        field("q5", "Q5 Question", "What is the shipment lead time after order placement?"),
        field(
          "a5",
          "Q5 Answer",
          "Typically 60-110 days depending on product type, material sourcing, approval and inspection stages.",
          "textarea",
        ),
        field("tag6", "Q6 Tag", "Commercial"),
        field("q6", "Q6 Question", "What is the payment term?"),
        field(
          "a6",
          "Q6 Answer",
          "L/C at sight and TT payment are common. Other options can be discussed case by case.",
          "textarea",
        ),
        field("tag7", "Q7 Tag", "MOQ"),
        field("q7", "Q7 Question", "What is the minimum order quantity per color or style?"),
        field(
          "a7",
          "Q7 Answer",
          "MOQ varies by product. Many knit programs start around 2,000-3,000 pcs per color and woven programs around 3,000-4,000 pcs.",
          "textarea",
        ),
        field("tag8", "Q8 Tag", "Partnership"),
        field("q8", "Q8 Question", "Why should buyers work with Fashion Source BD?"),
        field(
          "a8",
          "Q8 Answer",
          "The team combines sourcing experience, production follow-up, inspection discipline and long-term factory relationships.",
          "textarea",
        ),
        field("tag9", "Q9 Tag", "Career"),
        field("q9", "Q9 Question", "How do I apply for a job at Fashion Source BD?"),
        field(
          "a9",
          "Q9 Answer",
          "Visit the Job Openings page and submit your resume through the application form.",
          "textarea",
        ),
      ],
    },
  ]),
  page(
    "/become-supplier",
    "Become Supplier",
    "Apply to join our approved supplier network.",
    "BECOME SUPPLIER",
    [
      {
        id: "supplier-intro",
        label: "Supplier Intro",
        type: "content",
        fields: [
          field(
            "heading",
            "Heading",
            "Share the details our merchandising team needs first.",
            "textarea",
          ),
          field(
            "body",
            "Body",
            "We review supplier applications based on product strength, capacity, compliance readiness and responsiveness.",
            "textarea",
          ),
        ],
      },
      {
        id: "supplier-form",
        label: "Supplier Form Fields",
        type: "form",
        fields: [
          field("company", "Field 1", "Name of Company"),
          field("contact", "Field 2", "Contact Person"),
          field("capacity", "Field 3", "Monthly Capacity"),
          field("profile", "Upload Label", "Upload company profile"),
        ],
      },
    ],
  ),
  page(
    "/concern",
    "Sister Concern",
    "A connected network for apparel sourcing and execution.",
    "SISTER CONCERN",
    [
      {
        id: "network-intro",
        label: "Network Intro",
        type: "content",
        fields: [
          field("heading", "Heading", "Production support beyond one office."),
          field(
            "body",
            "Body",
            "Connected companies support manufacturing, sourcing, embroidery, printing, packaging and logistics.",
            "textarea",
          ),
        ],
      },
      {
        id: "concern-list",
        label: "Concern Companies",
        type: "cards",
        fields: [
          field("company1Name", "Company 1 Name", "EFL - Emon Fashion Limited"),
          field(
            "company1Desc",
            "Company 1 Description",
            "Manufacturing, supplying and exporting high quality garments.",
            "textarea",
          ),
          field("company1Url", "Company 1 Website", "http://www.efl.com.bd/"),
          field("company2Name", "Company 2 Name", "Jann Composite Mills Limited"),
          field(
            "company2Desc",
            "Company 2 Description",
            "Vertically integrated knit garment manufacturing and exporting composite unit.",
            "textarea",
          ),
          field("company2Url", "Company 2 Website", "https://janncomposite.com/"),
          field("company3Name", "Company 3 Name", "Arshad Embroidery Limited"),
          field(
            "company3Desc",
            "Company 3 Description",
            "Embroidery manufacturing support for apparel programs.",
            "textarea",
          ),
          field("company3Url", "Company 3 Website", "http://arshademb.com/"),
          field("company4Name", "Company 4 Name", "Jann Printing and Packaging Ltd."),
          field(
            "company4Desc",
            "Company 4 Description",
            "Textile printing and packaging support.",
            "textarea",
          ),
          field("company4Url", "Company 4 Website", "https://jannprinting.com/"),
          field("company5Name", "Company 5 Name", "Fashion Source BD DWC-LLC"),
          field(
            "company5Desc",
            "Company 5 Description",
            "Service provider for ready-made garments.",
            "textarea",
          ),
          field("company5Url", "Company 5 Website", "https://fashionsourcebd.com/"),
          field("company6Name", "Company 6 Name", "Fashion Source BD Sourcing (CN) Ltd."),
          field(
            "company6Desc",
            "Company 6 Description",
            "Garments sourcing company and material follow-up support.",
            "textarea",
          ),
          field("company6Url", "Company 6 Website", "https://fashionsourcebd.com/"),
          field("company7Name", "Company 7 Name", "Jann Global Logistics Limited"),
          field(
            "company7Desc",
            "Company 7 Description",
            "Logistics and freight forwarding partner.",
            "textarea",
          ),
          field("company7Url", "Company 7 Website", "http://jannglobal.com/"),
        ],
      },
    ],
  ),
  page(
    "/our-culture",
    "Our Culture",
    "A workplace culture shaped by care, discipline and growth.",
    "OUR CULTURE",
    [
      {
        id: "culture-intro",
        label: "Culture Intro",
        type: "content",
        fields: [
          field("heading", "Heading", "Strong sourcing work starts with a stable team."),
          field(
            "body",
            "Body",
            "Our culture focuses on practical care, professional responsibility and continuous improvement. A strong internal team helps buyers receive better communication, faster follow-up and cleaner execution.",
            "textarea",
          ),
        ],
      },
      {
        id: "culture-cards",
        label: "Culture Cards",
        type: "cards",
        fields: [
          field("card1Title", "Card 1 Title", "Working Environment"),
          field(
            "card1Body",
            "Card 1 Body",
            "Clean, healthy and professional workplaces for daily sourcing and merchandising work.",
            "textarea",
          ),
          field("card2Title", "Card 2 Title", "Care"),
          field(
            "card2Body",
            "Card 2 Body",
            "Respect for people, health awareness and support for long-term team wellbeing.",
            "textarea",
          ),
          field("card3Title", "Card 3 Title", "Development"),
          field(
            "card3Body",
            "Card 3 Body",
            "Skill growth through product learning, technical exposure and team leadership.",
            "textarea",
          ),
          field("card4Title", "Card 4 Title", "Complimentary Food"),
          field(
            "card4Body",
            "Card 4 Body",
            "A workplace culture that values practical care and team connection.",
            "textarea",
          ),
          field("card5Title", "Card 5 Title", "Atmosphere"),
          field(
            "card5Body",
            "Card 5 Body",
            "Internal celebrations and shared moments that keep the team connected.",
            "textarea",
          ),
          field("card6Title", "Card 6 Title", "Education"),
          field(
            "card6Body",
            "Card 6 Body",
            "Support for learning, community improvement and the next generation.",
            "textarea",
          ),
        ],
      },
      {
        id: "culture-values",
        label: "Culture Values",
        type: "cards",
        fields: [
          field("value1", "Value 1", "Respect"),
          field("value2", "Value 2", "Responsibility"),
          field("value3", "Value 3", "Discipline"),
          field("value4", "Value 4", "Teamwork"),
        ],
      },
    ],
  ),
  page(
    "/key-contacts",
    "Key Contacts",
    "Leadership contacts for business communication.",
    "KEY CONTACTS",
    [
      {
        id: "leadership-intro",
        label: "Leadership Intro",
        type: "content",
        fields: [
          field("heading", "Heading", "Reach the right team faster."),
          field(
            "body",
            "Body",
            "For product development, sourcing, supplier or operational communication, these contacts help direct inquiries to the relevant department.",
            "textarea",
          ),
        ],
      },
      {
        id: "people",
        label: "Leadership People",
        type: "cards",
        fields: [
          field("person1Name", "Person 1 Name", "MD. Abu Sayed"),
          field("person1Role", "Person 1 Role", "Director"),
          field("person1Initials", "Person 1 Initials", "AS"),
          field("person1Email", "Person 1 Email", "info@fashionsource-bd.com"),
          field("person2Name", "Person 2 Name", "Md. Abdul Karim"),
          field("person2Role", "Person 2 Role", "Managing Director & CEO"),
          field("person2Initials", "Person 2 Initials", "AK"),
          field("person2Email", "Person 2 Email", "info@fashionsource-bd.com"),
        ],
      },
    ],
  ),
  page(
    "/products",
    "Products",
    "Browse knit, woven, flat knit and accessory products.",
    "PRODUCT CATALOGUE",
    [
      {
        id: "product-listing",
        label: "Product Listing",
        type: "content",
        fields: [
          field("heading", "Heading", "All Products"),
          field("search", "Search Placeholder", "Search products..."),
        ],
      },
    ],
  ),
  page(
    "/compliance",
    "Compliance",
    "Plan, Do, Act, Check — a structured management method for efficient compliance.",
    "COMPLIANCE",
    [
      {
        id: "compliance-goals",
        label: "Compliance Goal",
        type: "cards",
        fields: [
          field("heading", "Section Heading", "Compliance Goal"),
          field(
            "goal1",
            "Goal 1",
            "Accelerating the business by creating a successful compliance program.",
          ),
          field(
            "goal2",
            "Goal 2",
            "Minimizing business risk through safe, secure and environment-friendly workplaces.",
          ),
          field(
            "goal3",
            "Goal 3",
            "Increasing business reputation by fulfilling customer requirements.",
          ),
          field(
            "goal4",
            "Goal 4",
            "Achieving trustworthiness of all business partners through commitment and transparency.",
          ),
        ],
      },
      {
        id: "compliance-steps",
        label: "Management Method (PDCA)",
        type: "cards",
        fields: [
          field("heading", "Section Heading", "Management Method"),
          field("planTitle", "Step 1 Title", "1. PLAN"),
          field(
            "planItems",
            "Step 1 Items",
            "Compliance team & responsibilities\nYearly & monthly audit schedule\nDeveloping unique audit protocol & checklist\nWeb-based monitoring & verification\nTraining schedule for factory capacity building\nSetting a target",
            "textarea",
          ),
          field("doTitle", "Step 2 Title", "2. DO"),
          field(
            "doItems",
            "Step 2 Items",
            "Assessment & creating report\nDevelopment visit & CAP follow-up\nTraining on COC, local law & certification\nWebsite follow-up and desktop verification\nSWOT analysis and special care of vulnerable factories\nSelf assessment and management monitoring",
            "textarea",
          ),
          field("actTitle", "Step 3 Title", "3. ACT"),
          field(
            "actItems",
            "Step 3 Items",
            "Development visit & proper guidance\nPreparing the TNA & measuring progress\nKnowledge, document and experience sharing\nEnsuring fulfillment of requirements",
            "textarea",
          ),
          field("checkTitle", "Step 4 Title", "4. CHECK"),
          field(
            "checkItems",
            "Step 4 Items",
            "Follow-up audit\nDesktop verification\nSurprise visits",
            "textarea",
          ),
        ],
      },
    ],
  ),
  page(
    "/why-work-with-us",
    "Why Work With Us",
    "Unique features that make us a trusted long-term sourcing partner.",
    "WHY CHOOSE FASHION SOURCE BD?",
    [
      {
        id: "why-us-items",
        label: "Reasons to Choose Us",
        type: "cards",
        fields: [
          field("item1Title", "Item 1 Title", "Long History"),
          field(
            "item1Body",
            "Item 1 Body",
            "Fashion Source BD has a long and rich history and knows the Bangladesh market thoroughly through trusted relationships with local apparel manufacturers.",
            "textarea",
          ),
          field("item2Title", "Item 2 Title", "Reasonable Price"),
          field(
            "item2Body",
            "Item 2 Body",
            "We are committed to providing the best value by sourcing high-quality products at competitive and reasonable prices. Through our strong supplier network and efficient sourcing process, we help our clients reduce costs without compromising on quality, compliance, or timely delivery.",
            "textarea",
          ),
          field("item3Title", "Item 3 Title", "Own Design Team"),
          field(
            "item3Body",
            "Item 3 Body",
            "Our design team presents new trends in demand. Samples are shared with customers and a dedicated R&D team supports new fabrics and samples.",
            "textarea",
          ),
          field("item4Title", "Item 4 Title", "Import Fabric & Trims Sourcing"),
          field(
            "item4Body",
            "Item 4 Body",
            "Our own office in China supports customers with imported fabrics and trims, giving access to new materials with extra support.",
            "textarea",
          ),
          field("item5Title", "Item 5 Title", "Real Order Update"),
          field(
            "item5Body",
            "Item 5 Body",
            "Fashion Source BD has its own ERP software where customers get real-time order updates throughout the production cycle.",
            "textarea",
          ),
          field("item6Title", "Item 6 Title", "Highly Skilled Merchandising Team"),
          field(
            "item6Body",
            "Item 6 Body",
            "Specialists and experts for different products and categories — buyers get proper, product-specific support.",
            "textarea",
          ),
          field("item7Title", "Item 7 Title", "Skilled Technical Team"),
          field(
            "item7Body",
            "Item 7 Body",
            "Our team gives customers utmost quality and support throughout the whole process — from sampling until shipment.",
            "textarea",
          ),
          field("item8Title", "Item 8 Title", "Special QA Team"),
          field(
            "item8Body",
            "Item 8 Body",
            "A highly trained Quality Assurance Team ensures 100% quality as per customer demand.",
            "textarea",
          ),
        ],
      },
    ],
  ),
  page("/job-openings", "Job Openings", "Career opportunities at Fashion Source BD.", "JOBS", [
    {
      id: "job-notice",
      label: "Openings Notice",
      type: "content",
      fields: [
        field(
          "message",
          "Notice Message",
          "We currently have no open positions. You're welcome to upload your résumé and we'll be in touch when a suitable position opens.",
          "textarea",
        ),
      ],
    },
    {
      id: "job-form",
      label: "Application Form Copy",
      type: "form",
      fields: [
        field("heading", "Form Heading", "Upload Résumé"),
        field("success", "Success Message", "Thank you. Your résumé has been received."),
      ],
    },
  ]),
];

export function getField(
  page: CmsPage | undefined,
  sectionId: string,
  fieldKey: string,
  fallback: string,
) {
  return (
    page?.sections
      .find((section) => section.id === sectionId)
      ?.fields.find((field) => field.key === fieldKey)?.value ?? fallback
  );
}

// ── Backend <-> Admin editor conversion ────────────────────────────────────────
export function apiPageToCms(page: ApiPage): CmsPage {
  return {
    slug: page.slug,
    title: page.title,
    status: page.status === "published" ? "Published" : "Draft",
    updated: new Date(page.updatedAt).toLocaleDateString(),
    sections: [...page.sections]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => ({
        id: s.section_key,
        label: s.label,
        type: (s.section_type || "content") as CmsSection["type"],
        fields: (s.content?.fields ?? []) as CmsField[],
      })),
  };
}

export function cmsToApiPayload(page: CmsPage) {
  return {
    slug: page.slug,
    title: page.title,
    status: (page.status === "Published" ? "published" : "draft") as "published" | "draft",
    sections: page.sections.map((s, i) => ({
      section_key: s.id,
      label: s.label,
      section_type: s.type,
      content: { fields: s.fields } as Record<string, unknown>,
      sort_order: i,
    })),
  };
}

// ── Live-backend-first CMS pages, falling back to hardcoded defaults ───────────
export function useCmsPages() {
  const { data: apiPages } = useQuery({
    queryKey: ["pages"],
    queryFn: () => api.getPages().then((r) => r.data),
    staleTime: 60_000,
  });

  if (!apiPages || apiPages.length === 0) return defaultCmsPages;

  const bySlug = new Map(apiPages.map((p) => [p.slug, apiPageToCms(p)]));
  return defaultCmsPages.map((fallback) => bySlug.get(fallback.slug) ?? fallback);
}

export function useCmsPage(slug: string) {
  const pages = useCmsPages();
  return pages.find((page) => page.slug === slug);
}
