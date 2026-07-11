export type ProductCategorySlug = "knit" | "woven" | "flat-knit" | "others";

export type ProductCategory = {
  slug: ProductCategorySlug;
  title: string;
  intro: string;
  description: string;
};

export type Product = {
  slug: string;
  category: ProductCategorySlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
  specs: string[];
};

const image = (id: string, width = 900, height = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=82`;

export const productCategories: ProductCategory[] = [
  {
    slug: "knit",
    title: "Knit",
    intro:
      "Full range of knit garments from soft cotton tees to performance fleece, produced through our compliant supply chain.",
    description:
      "Knit collections cover daily essentials, babywear, activewear and intimate categories with flexible fabrics, trims and finishes.",
  },
  {
    slug: "woven",
    title: "Woven",
    intro:
      "Woven shirts, bottoms, outerwear and workwear from compliant factories with strong technical capability.",
    description:
      "Woven production supports casual and formal silhouettes, technical outerwear, durable bottoms and buyer-specific finishing.",
  },
  {
    slug: "flat-knit",
    title: "Flat Knit",
    intro: "Flat knit sweaters from 3gg to 14gg in cotton, wool, acrylic and blended yarns.",
    description:
      "Flat knit ranges include clean wardrobe staples and seasonal fashion sweaters with gauge, yarn and pattern flexibility.",
  },
  {
    slug: "others",
    title: "Others",
    intro:
      "Accessories and home textile items capable of complete-package supply alongside apparel.",
    description:
      "Selected accessories and home textile products support broader sourcing programs with consistent quality control.",
  },
];

export const products: Product[] = [
  {
    slug: "mens-t-shirt-polo-tank-top",
    category: "knit",
    name: "Men's T-Shirt, Polo, Tank Top",
    shortName: "Men's",
    description:
      "Crew neck, V-neck, polo and tank silhouettes in buyer-ready jersey and pique fabrics.",
    image: image("photo-1521572163474-6864f9cf17ab"),
    specs: [
      "Cotton, CVC and blended jersey",
      "Multiple GSM options",
      "Print, embroidery and wash support",
    ],
  },
  {
    slug: "ladies-t-shirt-tank-top-nightwear",
    category: "knit",
    name: "Ladies T-Shirt, Tank Top, Nightwear",
    shortName: "Ladies",
    description: "Soft-touch ladies knitwear for fashion, lounge and sleep categories.",
    image: image("photo-1515886657613-9f3515b0c78f"),
    specs: [
      "Relaxed and fashion fits",
      "Modal and cotton blend options",
      "Seasonal color development",
    ],
  },
  {
    slug: "kids-t-shirt-dress-jogging-set",
    category: "knit",
    name: "Kids T-Shirt, Dress, Jogging Top, Jogging Pant",
    shortName: "Kids",
    description: "Comfort-focused childrenswear with playful styling and durable finishing.",
    image: image("photo-1503919545889-aef636e10ad4"),
    specs: ["Age-appropriate sizing", "Soft rib and elastic trims", "Print and applique options"],
  },
  {
    slug: "fleece-sweatshirt-jacket",
    category: "knit",
    name: "Fleece Sweatshirt, Bonded Jacket, Polar & Micro Fleece",
    shortName: "Fleece",
    description: "Warm fleece products for casual, outdoor and layering programs.",
    image: image("photo-1551028719-00167b16eac5"),
    specs: ["Brushed back fleece", "Bonded and micro fleece", "Hoodie, crew and jacket builds"],
  },
  {
    slug: "babies-t-shirt",
    category: "knit",
    name: "Babies T-Shirt",
    shortName: "Babies",
    description: "Soft infant tops designed for comfort, easy care and everyday wear.",
    image: image("photo-1519689680058-324335c77eba"),
    specs: ["Organic cotton options", "Nickel-free trims", "Soft hand feel finishing"],
  },
  {
    slug: "baby-rompers",
    category: "knit",
    name: "Baby Rompers",
    shortName: "Baby Rompers",
    description:
      "One-piece baby rompers and bodysuits with gentle fabrics and practical fastening.",
    image: image("photo-1522771930-78848d9293e8"),
    specs: [
      "Snap-front and envelope neck options",
      "Printed and solid bodies",
      "Infant-safe construction",
    ],
  },
  {
    slug: "ladies-lingerie-swimwear",
    category: "knit",
    name: "Ladies Bra, Bikini & Swimwear",
    shortName: "Lingerie",
    description: "Knit lingerie and swim styles with stretch, recovery and lining control.",
    image: image("photo-1543076447-215ad9ba6923"),
    specs: ["Elastane blend fabrics", "Printed swim and solid basics", "Fit and trim development"],
  },
  {
    slug: "underwear-boxer-brief-panty",
    category: "knit",
    name: "Underwear Boxer, Brief, Panty, Hipster, Thong",
    shortName: "Underwear",
    description: "Essential underwear categories in cotton, modal and stretch blends.",
    image: image("photo-1556905055-8f358a7a47b2"),
    specs: ["Men's and women's silhouettes", "Waistband customization", "Comfort seam finishing"],
  },
  {
    slug: "shirts",
    category: "woven",
    name: "Shirts",
    shortName: "Shirts",
    description: "Casual, formal and overshirt styles in cotton, linen and blended woven fabrics.",
    image: image("photo-1598033129183-c4f50c736f10"),
    specs: [
      "Formal and casual collars",
      "Yarn dyed and solid fabric",
      "Wash and easy-care options",
    ],
  },
  {
    slug: "ladies-woven-tops-dress",
    category: "woven",
    name: "Ladies Woven Tops & Dress",
    shortName: "Ladies Woven Tops, Dress",
    description: "Blouses, tunics and dresses with clean finishing and fashion detailing.",
    image: image("photo-1485968579580-b6d095142e6e"),
    specs: [
      "Viscose, cotton and blends",
      "Embroidery and print support",
      "Midi, maxi and blouse shapes",
    ],
  },
  {
    slug: "woven-bottom",
    category: "woven",
    name: "Woven Bottom",
    shortName: "Woven Bottom",
    description:
      "Chinos, trousers, joggers and tailored bottoms for casual and structured programs.",
    image: image("photo-1542272604-787c3835535d"),
    specs: [
      "Twill and canvas options",
      "Elastic and fixed waistband",
      "Garment dye and wash finishing",
    ],
  },
  {
    slug: "cargo-shorts",
    category: "woven",
    name: "Cargo Shorts",
    shortName: "Cargo Shorts",
    description: "Utility cargo shorts and casual shorts with pocket and trim customization.",
    image: image("photo-1506629905607-d9f297d42596"),
    specs: [
      "Multi-pocket construction",
      "Cotton twill and ripstop",
      "Washed and garment-dyed finishes",
    ],
  },
  {
    slug: "swimming-wear-denim-shorts",
    category: "woven",
    name: "Swimming Wear & Denim Shorts",
    shortName: "Swimming Wear",
    description: "Quick-dry swim shorts and lightweight denim shorts for seasonal programs.",
    image: image("photo-1503342217505-b0a15ec3261c"),
    specs: ["Quick-dry shells", "Mesh lining options", "Lightweight denim washes"],
  },
  {
    slug: "jacket",
    category: "woven",
    name: "Jacket",
    shortName: "Jacket",
    description: "Padded, twill, windbreaker, parka and bomber jackets across seasonal needs.",
    image: image("photo-1548883354-7622d03aca27"),
    specs: [
      "Shell and insulated builds",
      "Technical lining options",
      "Zipper, snap and hood details",
    ],
  },
  {
    slug: "nightwear",
    category: "woven",
    name: "Nightwear",
    shortName: "Nightwear",
    description: "Woven pajama sets and lounge pieces in breathable fabrics.",
    image: image("photo-1558769132-cb1aea458c5e"),
    specs: [
      "Cotton and viscose options",
      "Piping and contrast details",
      "Set and separates development",
    ],
  },
  {
    slug: "workwear",
    category: "woven",
    name: "Workwear",
    shortName: "Workwear",
    description:
      "Durable workwear with reinforced construction for industrial and uniform programs.",
    image: image("photo-1504917595217-d4dc5ebe6122"),
    specs: ["Reinforced seams", "Heavy twill and canvas", "Utility pocket engineering"],
  },
  {
    slug: "blazer",
    category: "woven",
    name: "Blazer",
    shortName: "Blazer",
    description: "Casual and structured blazers with buyer-specific fabrics and silhouettes.",
    image: image("photo-1507679799987-c73779587ccf"),
    specs: [
      "Structured and soft tailoring",
      "Lining and trim options",
      "Wool blend and cotton options",
    ],
  },
  {
    slug: "flat-knit-sweater",
    category: "flat-knit",
    name: "Flat Knit Sweater",
    shortName: "Flat Knit Sweater",
    description: "Crew, V-neck, cardigan, jacquard, intarsia and cable styles from 3gg to 14gg.",
    image: image("photo-1516762689617-e1cffcef479d"),
    specs: [
      "3gg to 14gg gauge range",
      "Cotton, acrylic and wool blends",
      "Jacquard, cable and intarsia",
    ],
  },
  {
    slug: "cap",
    category: "others",
    name: "Cap",
    shortName: "Cap",
    description: "Five-panel, six-panel, dad caps and trucker caps with brand-ready decoration.",
    image: image("photo-1521369909029-2afed882baee"),
    specs: [
      "Embroidery and print decoration",
      "Adjustable closures",
      "Cotton twill and mesh builds",
    ],
  },
  {
    slug: "bed-sheet",
    category: "others",
    name: "Bed Sheet",
    shortName: "Bed Sheet",
    description:
      "Cotton percale and sateen bed sheet sets in solid, yarn dyed and printed options.",
    image: image("photo-1505693416388-ac5ce068fe85"),
    specs: ["Percale and sateen options", "Solid and printed programs", "Set packaging support"],
  },
  {
    slug: "towel",
    category: "others",
    name: "Towel",
    shortName: "Towel",
    description: "Bath, hand and beach towels in multiple weights, textures and constructions.",
    image: image("photo-1583847268964-b28dc8f51f92"),
    specs: [
      "Bath, hand and beach sizes",
      "Multiple GSM ranges",
      "Jacquard and dobby border options",
    ],
  },
];

export function getCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}

export function getProduct(category: string, slug: string) {
  return products.find((product) => product.category === category && product.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, limit);
}
