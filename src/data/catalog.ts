import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import shirt from "@/assets/shirt.jpg";
import top from "@/assets/top.jpg";
import bottoms from "@/assets/bottoms.jpg";
import dress from "@/assets/dress.jpg";

export const productImages = { p1, p2, p3, p4 };

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  images: string[];
  category: Category;
  subcategory?: "festive" | "casual";
  audience: "women" | "girls";
  colors: { name: string; hex: string }[];
  sizes: string[];
  fabric: string;
  occasion: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: ("new" | "bestseller" | "restocked" | "sale")[];
  description: string;
  care: string[];
  createdAt: string;
};

export type Category =
  | "shirts-blouses"
  | "tops"
  | "bottoms"
  | "dresses"
  | "kurta-sets"
  | "co-ords"
  | "dupattas"
  | "kaftans"
  | "girls"
  | "footwear"
  | "bags-pouches"
  | "jewellery";

export type Division = "active" | "traditional";

export const divisions: { slug: Division; name: string; blurb: string; image: string }[] = [
  { slug: "active", name: "Active Wear", blurb: "Easy pieces for everyday movement and moments out.", image: shirt },
  { slug: "traditional", name: "Traditional Wear", blurb: "The enduring beauty of craft, made for now.", image: p1 },
];

export const categories: {
  slug: Category;
  name: string;
  blurb: string;
  image: string;
  division: Division;
}[] = [
  { slug: "shirts-blouses", name: "Shirts & Blouses", blurb: "Soft tailoring, hand finished", image: shirt, division: "active" },
  { slug: "tops", name: "Tops", blurb: "Festive and casual favourites", image: top, division: "active" },
  { slug: "bottoms", name: "Bottoms", blurb: "Easy, breathable separates", image: bottoms, division: "active" },
  { slug: "co-ords", name: "Co-ords", blurb: "Festive and casual sets", image: p2, division: "active" },
  { slug: "dresses", name: "Dresses", blurb: "Made to move with you", image: dress, division: "active" },
  { slug: "kurta-sets", name: "Kurta Sets", blurb: "Hand block-printed cotton", image: p1, division: "traditional" },
  { slug: "dupattas", name: "Dupattas", blurb: "Handwoven, plant dyed", image: p3, division: "traditional" },
  { slug: "kaftans", name: "Kaftans", blurb: "Breezy summer drapes", image: p2, division: "traditional" },
  { slug: "girls", name: "Girls", blurb: "Mini versions, same craft", image: p1, division: "traditional" },
  { slug: "footwear", name: "Footwear", blurb: "Embroidered juttis", image: p4, division: "traditional" },
  { slug: "bags-pouches", name: "Bags & Pouches", blurb: "Potlis and totes", image: p4, division: "traditional" },
  { slug: "jewellery", name: "Jewellery", blurb: "Silver & brass, oxidised", image: p3, division: "traditional" },
];

export const divisionFor = (category: Category): Division =>
  categories.find((c) => c.slug === category)?.division ?? "traditional";

const C = {
  ivory: { name: "Ivory", hex: "#f2e8d8" },
  indigo: { name: "Indigo", hex: "#264a73" },
  terracotta: { name: "Terracotta", hex: "#b5623c" },
  rose: { name: "Rose", hex: "#d47b8f" },
  olive: { name: "Olive", hex: "#7c7f4a" },
  black: { name: "Ink", hex: "#26232a" },
};

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];

function make(
  n: number,
  base: Omit<Product, "id" | "slug" | "createdAt"> & { slug: string },
): Product {
  return {
    ...base,
    id: `AAN-${1000 + n}`,
    slug: base.slug,
    createdAt: new Date(2026, 6, 28 - n).toISOString(),
  };
}

export const products: Product[] = [
  make(1, {
    slug: "sanjhi-block-print-kurta-set",
    name: "Sanjhi Block-Print Kurta Set",
    price: 3450,
    mrp: 4200,
    images: [p1, p2],
    category: "kurta-sets",
    audience: "women",
    colors: [C.ivory, C.terracotta],
    sizes: APPAREL,
    fabric: "Pure cotton mul",
    occasion: "Daywear",
    rating: 4.8,
    reviewCount: 64,
    stock: 12,
    tags: ["bestseller", "new"],
    description:
      "Hand block-printed on pure cotton mul with natural madder dye, finished with a scalloped yoke and tonal thread work. Comes with straight pants.",
    care: ["Hand wash separately in cold water", "Dry in shade", "Warm iron inside out"],
  }),
  make(2, {
    slug: "neel-indigo-coord-set",
    name: "Neel Indigo Co-ord Set",
    price: 2890,
    mrp: 3400,
    images: [p2, p1],
    category: "co-ords",
    subcategory: "casual",
    audience: "women",
    colors: [C.indigo, C.black],
    sizes: APPAREL,
    fabric: "Handloom cotton",
    occasion: "Resort",
    rating: 4.6,
    reviewCount: 41,
    stock: 6,
    tags: ["bestseller"],
    description:
      "Dipped in real indigo at our Ahmedabad studio. Relaxed button-down top with matching shorts — the set you will over-wear all summer.",
    care: ["Wash separately first three washes", "Do not bleach", "Line dry"],
  }),
  make(3, {
    slug: "gulaab-handwoven-dupatta",
    name: "Gulaab Handwoven Dupatta",
    price: 1650,
    mrp: 1650,
    images: [p3, p1],
    category: "dupattas",
    audience: "women",
    colors: [C.rose, C.ivory],
    sizes: ["Free Size"],
    fabric: "Kota cotton",
    occasion: "Festive",
    rating: 4.9,
    reviewCount: 88,
    stock: 0,
    tags: ["restocked"],
    description:
      "Woven on pit looms with a hand-knotted fringe. Rose and rust stripes dyed with madder root and lac.",
    care: ["Dry clean recommended", "Store folded with muslin"],
  }),
  make(4, {
    slug: "phool-embroidered-potli",
    name: "Phool Embroidered Potli",
    price: 1250,
    mrp: 1500,
    images: [p4, p3],
    category: "bags-pouches",
    audience: "women",
    colors: [C.ivory, C.rose],
    sizes: ["One Size"],
    fabric: "Cotton canvas",
    occasion: "Festive",
    rating: 4.7,
    reviewCount: 27,
    stock: 20,
    tags: ["new"],
    description:
      "Chain-stitch florals embroidered by our karigars in Kutch, lined in soft cotton with a drawstring and tassels.",
    care: ["Spot clean only", "Keep away from moisture"],
  }),
  make(5, {
    slug: "mitti-kaftan",
    name: "Mitti Everyday Kaftan",
    price: 2350,
    mrp: 2800,
    images: [p1, p3],
    category: "kaftans",
    audience: "women",
    colors: [C.terracotta, C.olive],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Cotton voile",
    occasion: "Loungewear",
    rating: 4.5,
    reviewCount: 33,
    stock: 9,
    tags: ["sale"],
    description:
      "A one-size-fits-most kaftan in whisper-light voile, hand-dyed in clay tones with a hand-embroidered neckline.",
    care: ["Machine wash gentle", "Do not tumble dry"],
  }),
  make(6, {
    slug: "chhoti-gudiya-girls-kurta",
    name: "Chhoti Gudiya Girls' Kurta",
    price: 1450,
    mrp: 1750,
    images: [p1, p4],
    category: "girls",
    audience: "girls",
    colors: [C.ivory, C.rose],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    fabric: "Pure cotton",
    occasion: "Daywear",
    rating: 4.9,
    reviewCount: 52,
    stock: 15,
    tags: ["new", "bestseller"],
    description:
      "The little sister to our Sanjhi set — same block prints, softer seams, and pockets deep enough for treasures.",
    care: ["Machine wash cold", "Iron on reverse"],
  }),
  make(7, {
    slug: "banjara-juttis",
    name: "Banjara Embroidered Juttis",
    price: 1990,
    mrp: 2400,
    images: [p4, p2],
    category: "footwear",
    audience: "women",
    colors: [C.black, C.terracotta],
    sizes: ["36", "37", "38", "39", "40", "41"],
    fabric: "Leather sole, cotton upper",
    occasion: "Festive",
    rating: 4.4,
    reviewCount: 19,
    stock: 4,
    tags: ["restocked"],
    description:
      "Hand-stitched juttis with metallic zari motifs and a cushioned footbed for all-day wear.",
    care: ["Wipe with dry cloth", "Avoid water"],
  }),
  make(8, {
    slug: "chandni-oxidised-earrings",
    name: "Chandni Oxidised Earrings",
    price: 890,
    mrp: 1100,
    images: [p3, p4],
    category: "jewellery",
    audience: "women",
    colors: [C.black],
    sizes: ["One Size"],
    fabric: "German silver",
    occasion: "Festive",
    rating: 4.6,
    reviewCount: 46,
    stock: 30,
    tags: ["bestseller", "sale"],
    description:
      "Featherlight oxidised jhumkas with tiny ghungroo drops. Nickel-free and hypoallergenic.",
    care: ["Store in pouch", "Keep away from perfume"],
  }),
  make(9, {
    slug: "bagh-print-kurta-set",
    name: "Bagh Print Kurta Set",
    price: 3890,
    mrp: 4600,
    images: [p2, p1],
    category: "kurta-sets",
    audience: "women",
    colors: [C.indigo, C.ivory],
    sizes: APPAREL,
    fabric: "Cotton mul",
    occasion: "Occasion",
    rating: 4.8,
    reviewCount: 71,
    stock: 8,
    tags: ["new"],
    description:
      "Traditional Bagh printing from Madhya Pradesh, with an anarkali silhouette and matching dupatta.",
    care: ["Dry clean for first wash", "Hand wash thereafter"],
  }),
  make(10, {
    slug: "reet-cotton-coord",
    name: "Reet Cotton Co-ord",
    price: 3150,
    mrp: 3150,
    images: [p2, p3],
    category: "co-ords",
    subcategory: "casual",
    audience: "women",
    colors: [C.olive, C.ivory],
    sizes: APPAREL,
    fabric: "Khadi cotton",
    occasion: "Workwear",
    rating: 4.3,
    reviewCount: 12,
    stock: 11,
    tags: ["new"],
    description:
      "Structured khadi shirt with pleated trousers — a boutique take on quiet, everyday tailoring.",
    care: ["Hand wash cold", "Steam iron"],
  }),
  make(11, {
    slug: "ranga-girls-coord",
    name: "Ranga Girls' Co-ord",
    price: 1690,
    mrp: 1990,
    images: [p1, p2],
    category: "girls",
    audience: "girls",
    colors: [C.rose, C.indigo],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    fabric: "Pure cotton",
    occasion: "Festive",
    rating: 4.7,
    reviewCount: 24,
    stock: 0,
    tags: ["restocked"],
    description:
      "Twirl-friendly top and pants in soft hand-printed cotton with coconut shell buttons.",
    care: ["Machine wash cold", "Do not bleach"],
  }),
  make(12, {
    slug: "sooti-tote",
    name: "Sooti Everyday Tote",
    price: 1150,
    mrp: 1350,
    images: [p4, p1],
    category: "bags-pouches",
    audience: "women",
    colors: [C.ivory, C.olive],
    sizes: ["One Size"],
    fabric: "Heavy cotton canvas",
    occasion: "Everyday",
    rating: 4.5,
    reviewCount: 38,
    stock: 25,
    tags: ["sale"],
    description:
      "A roomy block-printed tote with reinforced straps that holds a laptop, a tiffin, and the whole day.",
    care: ["Machine wash cold", "Air dry"],
  }),
  make(13, {
    slug: "nira-cotton-shirt", name: "Nira Block-Print Shirt", price: 2150, mrp: 2550,
    images: [shirt, shirt], category: "shirts-blouses", audience: "women",
    colors: [C.ivory, C.indigo], sizes: APPAREL, fabric: "Pure cotton",
    occasion: "Everyday", rating: 4.7, reviewCount: 18, stock: 14, tags: ["new"],
    description: "A relaxed cotton shirt with indigo floral block prints, made for the everyday wardrobe.",
    care: ["Hand wash cold", "Dry in shade"],
  }),
  make(14, {
    slug: "tara-festive-top", name: "Tara Embroidered Top", price: 1950, mrp: 2350,
    images: [top, top], category: "tops", audience: "women",
    colors: [C.rose], sizes: APPAREL, fabric: "Cotton voile",
    occasion: "Festive", rating: 4.8, reviewCount: 15, stock: 11, tags: ["new"],
    description: "A rose cotton top with delicate neckline embroidery for celebrations and evenings out.",
    care: ["Hand wash separately", "Dry in shade"],
  }),
  make(15, {
    slug: "aara-casual-top", name: "Aara Everyday Top", price: 1550, mrp: 1850,
    images: [shirt, top], category: "tops", audience: "women",
    colors: [C.ivory, C.indigo], sizes: APPAREL, fabric: "Pure cotton",
    occasion: "Everyday", rating: 4.6, reviewCount: 12, stock: 19, tags: ["new"],
    description: "An easy cotton top with subtle hand-printed details for slow days and busy ones.",
    care: ["Machine wash cold", "Dry in shade"],
  }),
  make(16, {
    slug: "van-cotton-trousers", name: "Van Wide-Leg Trousers", price: 1850, mrp: 2200,
    images: [bottoms, bottoms], category: "bottoms", audience: "women",
    colors: [C.olive], sizes: APPAREL, fabric: "Cotton twill",
    occasion: "Everyday", rating: 4.7, reviewCount: 21, stock: 16, tags: ["new"],
    description: "Relaxed olive cotton trousers finished with a delicate printed hem.",
    care: ["Machine wash cold", "Iron inside out"],
  }),
  make(17, {
    slug: "gulmohar-midi-dress", name: "Gulmohar Printed Dress", price: 2950, mrp: 3500,
    images: [dress, dress], category: "dresses", audience: "women",
    colors: [C.ivory, C.terracotta], sizes: APPAREL, fabric: "Pure cotton",
    occasion: "Daywear", rating: 4.8, reviewCount: 26, stock: 13, tags: ["new"],
    description: "An easy midi dress in breathable cotton with terracotta floral block prints.",
    care: ["Hand wash cold", "Dry in shade"],
  }),
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
export const byTag = (tag: Product["tags"][number]) =>
  products.filter((p) => p.tags.includes(tag));

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export type Review = {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  status: "published" | "pending";
};

export const reviews: Review[] = [
  {
    id: "r1",
    productSlug: "sanjhi-block-print-kurta-set",
    author: "Ananya M.",
    rating: 5,
    title: "The cotton is unreal",
    body: "Wore it through an Ahmedabad afternoon and stayed cool. The print is crisp and the fit is generous without looking boxy.",
    date: "2026-07-14",
    verified: true,
    status: "published",
  },
  {
    id: "r2",
    productSlug: "sanjhi-block-print-kurta-set",
    author: "Priya S.",
    rating: 4,
    title: "Lovely, size up",
    body: "Beautiful colour in person. Sleeves run slightly slim, I would size up if you prefer a loose sleeve.",
    date: "2026-06-30",
    verified: true,
    status: "published",
  },
  {
    id: "r3",
    productSlug: "neel-indigo-coord-set",
    author: "Rhea K.",
    rating: 5,
    title: "Indigo done right",
    body: "Faded gently after two washes exactly as described. Feels like it will only get better.",
    date: "2026-07-02",
    verified: true,
    status: "published",
  },
  {
    id: "r4",
    productSlug: "chhoti-gudiya-girls-kurta",
    author: "Meera J.",
    rating: 5,
    title: "My daughter refuses to take it off",
    body: "Soft, no scratchy seams, and the pockets were an instant hit.",
    date: "2026-07-19",
    verified: true,
    status: "published",
  },
  {
    id: "r5",
    productSlug: "gulaab-handwoven-dupatta",
    author: "Unverified guest",
    rating: 3,
    title: "Waiting for restock",
    body: "Please bring the rose colourway back soon!",
    date: "2026-08-01",
    verified: false,
    status: "pending",
  },
];

export const testimonials = [
  {
    name: "Ananya M.",
    city: "Bengaluru",
    quote:
      "It is rare to find block prints this fine at this price. My third order and every parcel smells faintly of the studio.",
  },
  {
    name: "Sana Q.",
    city: "London",
    quote:
      "Shipped to the UK in eight days, beautifully packed in cloth. The dupatta is now my most complimented piece.",
  },
  {
    name: "Divya R.",
    city: "Ahmedabad",
    quote:
      "I bought matching sets for my daughter and me. The kidswear seams are so soft she actually keeps it on.",
  },
];

export const brandValues = [
  { title: "Pure Cotton", body: "Mul, khadi and Kota — breathable, never blended." },
  { title: "Plant Dyes", body: "Madder, indigo and pomegranate, no azo chemicals." },
  { title: "Hand Block Printed", body: "Carved teak blocks, printed metre by metre." },
  { title: "Fair Karigar Wages", body: "Paid per piece, above the regional benchmark." },
  { title: "Plastic-free Parcels", body: "Cloth pouches and recycled kraft only." },
  { title: "Small Batches", body: "40–60 pieces per print. When it's gone, it's gone." },
];
