import spearOfChaos from "@/assets/spear-of-chaos-cover.jpg";
import spearOfDestiny from "@/assets/spear-of-destiny-cover.jpg";
import daughterOfDeath from "@/assets/daughter-of-death-cover.jpg";
import blessingBowl from "@/assets/blessing-bowl-cover.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category: "ebook" | "audiobook" | "signed" | "merchandise";
  bookSlug: string; // which book this product relates to
  bookTitle: string;
  badge?: string;
  features?: string[];
  available: boolean;
  productType: "digital" | "physical"; // NEW: digital (ebook, audiobook) or physical (signed, merchandise)
  stripeProductId?: string; // NEW: Stripe product ID for this product
}

export const products: Product[] = [
  // // Spear of Chaos products
  // {
  //   id: "soc-ebook",
  //   name: "Spear of Chaos - E-Book",
  //   description: "Digital edition of the first book in the Annals of Aeturnum series. Perfect for reading on any device.",
  //   price: 9.99,
  //   image: spearOfChaos,
  //   category: "ebook",
  //   bookSlug: "spear-of-chaos",
  //   bookTitle: "Spear of Chaos",
  //   features: ["Instant download", "PDF, EPUB, MOBI formats", "Lifetime access"],
  //   available: true,
  //   productType: "digital",
  // },
  // {
  //   id: "soc-audiobook",
  //   name: "Spear of Chaos - Audiobook",
  //   description: "Experience the Viking saga as intended, narrated with ambient Norse soundscapes.",
  //   price: 24.99,
  //   image: spearOfChaos,
  //   category: "audiobook",
  //   bookSlug: "spear-of-chaos",
  //   bookTitle: "Spear of Chaos",
  //   badge: "Fan Favorite",
  //   features: ["12+ hours of audio", "Professional narration", "Original soundtrack", "Offline listening"],
  //   available: true,
  //   productType: "digital",
  // },
  // {
  //   id: "soc-signed",
  //   name: "Spear of Chaos - Signed Hardcover",
  //   description: "Premium hardcover personally signed by Mary Lou Wells. Includes exclusive artwork.",
  //   price: 89.99,
  //   image: spearOfChaos,
  //   category: "signed",
  //   bookSlug: "spear-of-chaos",
  //   bookTitle: "Spear of Chaos",
  //   badge: "Limited Edition",
  //   features: ["Hand-signed", "Numbered edition", "Premium binding", "Exclusive artwork insert"],
  //   available: true,
  //   productType: "physical",
  // },
  // {
  //   id: "soc-tshirt",
  //   name: "Spear of Chaos T-Shirt",
  //   description: "Premium cotton t-shirt featuring the iconic Spear of Chaos artwork. Available in multiple sizes.",
  //   price: 34.99,
  //   image: spearOfChaos,
  //   category: "merchandise",
  //   bookSlug: "spear-of-chaos",
  //   bookTitle: "Spear of Chaos",
  //   features: ["100% organic cotton", "Unisex fit", "S-3XL sizes", "Machine washable"],
  //   available: true,
  //   productType: "physical",
  // },

  // // Spear of Destiny products
  // {
  //   id: "sod-ebook",
  //   name: "Spear of Destiny - E-Book",
  //   description: "Digital edition of the Firebird Award-winning second book. Alexander's legendary tale awaits.",
  //   price: 9.99,
  //   image: spearOfDestiny,
  //   category: "ebook",
  //   bookSlug: "spear-of-destiny",
  //   bookTitle: "Spear of Destiny",
  //   badge: "Award Winner",
  //   features: ["Instant download", "PDF, EPUB, MOBI formats", "Lifetime access"],
  //   available: true,
  //   productType: "digital",
  // },
  // {
  //   id: "sod-audiobook",
  //   name: "Spear of Destiny - Audiobook",
  //   description: "Immerse yourself in ancient Macedonia with professional narration and epic soundscapes.",
  //   price: 24.99,
  //   image: spearOfDestiny,
  //   category: "audiobook",
  //   bookSlug: "spear-of-destiny",
  //   bookTitle: "Spear of Destiny",
  //   features: ["10+ hours of audio", "Professional narration", "Original soundtrack", "Offline listening"],
  //   available: true,
  //   productType: "digital",
  // },
  // {
  //   id: "sod-signed",
  //   name: "Spear of Destiny - Signed Hardcover",
  //   description: "Award-winning novel personally signed by Mary Lou Wells with a personalized dedication.",
  //   price: 89.99,
  //   image: spearOfDestiny,
  //   category: "signed",
  //   bookSlug: "spear-of-destiny",
  //   bookTitle: "Spear of Destiny",
  //   badge: "Exclusive",
  //   features: ["Hand-signed", "Personalized dedication", "Premium binding", "Firebird Award sticker"],
  //   available: true,
  //   productType: "physical",
  // },
  // {
  //   id: "sod-bookmark",
  //   name: "Bucephalus Bookmark Set",
  //   description: "Elegant metal bookmarks inspired by Alexander's legendary horse. Set of 3 with different designs.",
  //   price: 19.99,
  //   category: "merchandise",
  //   bookSlug: "spear-of-destiny",
  //   bookTitle: "Spear of Destiny",
  //   features: ["Set of 3", "Metal with enamel", "Gift boxed", "Horse motifs"],
  //   available: true,
  //   productType: "physical",
  // },

  // // Daughter of Death products
  // {
  //   id: "dod-ebook",
  //   name: "Daughter of Death - E-Book",
  //   description: "Journey to ancient Saharan Africa in this digital edition of book three.",
  //   price: 9.99,
  //   image: daughterOfDeath,
  //   category: "ebook",
  //   bookSlug: "daughter-of-death",
  //   bookTitle: "Daughter of Death",
  //   badge: "New Release",
  //   features: ["Instant download", "PDF, EPUB, MOBI formats", "Lifetime access"],
  //   available: true,
  //   productType: "digital",
  // },
  // {
  //   id: "dod-audiobook",
  //   name: "Daughter of Death - Audiobook",
  //   description: "Experience ancient Africa with professional narration and atmospheric soundscapes.",
  //   price: 24.99,
  //   image: daughterOfDeath,
  //   category: "audiobook",
  //   bookSlug: "daughter-of-death",
  //   bookTitle: "Daughter of Death",
  //   features: ["11+ hours of audio", "Professional narration", "African ambient sounds", "Offline listening"],
  //   available: true,
  //   productType: "digital",
  // },
  // {
  //   id: "dod-signed",
  //   name: "Daughter of Death - Signed Hardcover",
  //   description: "Premium hardcover personally signed by Mary Lou Wells. First edition collectors item.",
  //   price: 89.99,
  //   image: daughterOfDeath,
  //   category: "signed",
  //   bookSlug: "daughter-of-death",
  //   bookTitle: "Daughter of Death",
  //   badge: "First Edition",
  //   features: ["Hand-signed", "First edition", "Premium binding", "Exclusive artwork insert"],
  //   available: true,
  //   productType: "physical",
  // },
  // {
  //   id: "dod-poster",
  //   name: "Shaman's Vision Art Print",
  //   description: "High-quality giclée print featuring Kai'ahsha's mystical vision. Museum-quality paper.",
  //   price: 49.99,
  //   category: "merchandise",
  //   bookSlug: "daughter-of-death",
  //   bookTitle: "Daughter of Death",
  //   features: ["18x24 inches", "Giclée print", "Archival paper", "Limited to 500"],
  //   available: true,
  //   productType: "physical",
  // },

  // // The Blessing Bowl products
  // {
  //   id: "tbb-ebook",
  //   name: "The Blessing Bowl - E-Book",
  //   description: "Pre-order the digital edition of the epic conclusion to the Annals of Aeturnum.",
  //   price: 9.99,
  //   originalPrice: 12.99,
  //   image: blessingBowl,
  //   category: "ebook",
  //   bookSlug: "the-blessing-bowl",
  //   bookTitle: "The Blessing Bowl",
  //   badge: "Pre-Order",
  //   features: ["Pre-order discount", "Instant delivery on release", "All formats included"],
  //   available: true,
  //   productType: "digital",
  // },
  // {
  //   id: "tbb-signed",
  //   name: "The Blessing Bowl - Signed Hardcover",
  //   description: "Reserve your signed first edition of the grand finale. Limited quantities available.",
  //   price: 99.99,
  //   image: blessingBowl,
  //   category: "signed",
  //   bookSlug: "the-blessing-bowl",
  //   bookTitle: "The Blessing Bowl",
  //   badge: "Pre-Order",
  //   features: ["Hand-signed", "First edition", "Numbered certificate", "Exclusive slipcase"],
  //   available: true,
  //   productType: "physical",
  // },

  // // Series bundles (associated with spear-of-chaos as the "main" book)
  // {
  //   id: "bundle-ebook",
  //   name: "Complete E-Book Bundle",
  //   description: "Get all four books in the series in digital format. The best value for devoted readers.",
  //   price: 29.99,
  //   originalPrice: 49.99,
  //   category: "ebook",
  //   bookSlug: "spear-of-chaos",
  //   bookTitle: "Complete Series",
  //   badge: "Best Value",
  //   features: ["All 4 books", "Instant download", "All formats", "Lifetime access", "40% savings"],
  //   available: true,
  //   productType: "digital",
  // },
  // {
  //   id: "peacock-feather-set",
  //   name: "Peacock Feather Bookmark Set",
  //   description: "Elegant metal bookmarks inspired by the peacock motifs from the series. Set of 3 designs.",
  //   price: 19.99,
  //   category: "merchandise",
  //   bookSlug: "spear-of-chaos",
  //   bookTitle: "Complete Series",
  //   features: ["Set of 3", "Metal with enamel", "Gift boxed", "Peacock designs"],
  //   available: true,
  //   productType: "physical",
  // },
];

export const getProductsByBook = (bookSlug: string): Product[] => {
  return products.filter(p => p.bookSlug === bookSlug);
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
  return products.filter(p => p.category === category);
};
