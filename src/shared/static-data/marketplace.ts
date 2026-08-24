import type { Product, Store } from "~/shared/api/client";

/**
 * Demo dataset used as a fail-soft fallback whenever the live API is
 * unreachable. Read paths try the API first and fall back here, so the
 * site works as a full demo with no backend and heals itself when the
 * backend comes online.
 */

export const staticStores: Store[] = [
  {
    id: "static-design-market",
    name: "Design Market",
    url: "design-market",
    description: "Digital templates, product assets, and custom storefront kits.",
    isVerified: true,
    ownerUsername: "designmarket",
    tagNames: ["Graphics & Design", "Digital Marketing"],
    previewImage: null,
    rating: { likes: 128, dislikes: 3, reviewsCount: 64 },
  },
  {
    id: "static-code-lab",
    name: "Code Lab",
    url: "code-lab",
    description: "Small software tools, scripts, integrations, and code reviews.",
    isVerified: false,
    ownerUsername: "codelab",
    tagNames: ["Programming & Tech", "Business"],
    previewImage: null,
    rating: { likes: 94, dislikes: 2, reviewsCount: 37 },
  },
  {
    id: "static-media-vault",
    name: "Media Vault",
    url: "media-vault",
    description: "Stock clips, music loops, motion graphics, and audio packs.",
    isVerified: false,
    ownerUsername: "mediavault",
    tagNames: ["Music & Audio", "Video & Animation"],
    previewImage: null,
    rating: { likes: 76, dislikes: 4, reviewsCount: 28 },
  },
  {
    id: "static-secure-goods",
    name: "Secure Goods",
    url: "secure-goods",
    description: "Curated digital goods sold with escrow-backed checkout.",
    isVerified: true,
    ownerUsername: "securegoods",
    tagNames: ["Electronics, Computers & Parts", "Data"],
    previewImage: null,
    rating: { likes: 151, dislikes: 5, reviewsCount: 82 },
  },
  {
    id: "static-writers-room",
    name: "Writers Room",
    url: "writers-room",
    description: "Copywriting, translation, editing, and launch content.",
    isVerified: false,
    ownerUsername: "writersroom",
    tagNames: ["Writing & Translation", "Business"],
    previewImage: null,
    rating: { likes: 67, dislikes: 1, reviewsCount: 19 },
  },
  {
    id: "static-indie-shelf",
    name: "Indie Shelf",
    url: "indie-shelf",
    description: "Games, books, learning resources, and creator-made downloads.",
    isVerified: false,
    ownerUsername: "indieshelf",
    tagNames: ["Films, Music & Games", "Books"],
    previewImage: null,
    rating: { likes: 119, dislikes: 6, reviewsCount: 45 },
  },
];

interface DemoProductSeed {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  storeUrl: string;
  rating: { likes: number; dislikes: number; reviewsCount: number };
  totalSales?: number;
}

const productSeeds: DemoProductSeed[] = [
  // design-market
  {
    id: "static-product-landing-kit",
    name: "Launch Landing Kit",
    shortDescription: "Hero copy, launch graphics, and reusable product sections.",
    description:
      "A polished starter pack for storefront announcements. Includes hero layouts, launch banners, and a set of reusable product sections in Figma.",
    category: "Graphics & Design",
    price: 49,
    storeUrl: "design-market",
    rating: { likes: 43, dislikes: 1, reviewsCount: 18 },
    totalSales: 62,
  },
  {
    id: "static-product-brand-sheet",
    name: "One-Page Brand Sheet",
    shortDescription: "Logo lockups, palette, and type scale on a single sheet.",
    description:
      "A compact brand reference for small shops: logo usage, color palette with contrast notes, and a ready type scale. Delivered as Figma and PDF.",
    category: "Graphics & Design",
    price: 29,
    storeUrl: "design-market",
    rating: { likes: 27, dislikes: 0, reviewsCount: 11 },
    totalSales: 38,
  },
  {
    id: "static-product-social-pack",
    name: "Social Announcement Pack",
    shortDescription: "30 editable templates for product drops and promos.",
    description:
      "Thirty editable social templates sized for X and Instagram, tuned for product drops, restocks, and promo codes.",
    category: "Digital Marketing",
    price: 39,
    storeUrl: "design-market",
    rating: { likes: 35, dislikes: 2, reviewsCount: 14 },
    totalSales: 51,
  },

  // code-lab
  {
    id: "static-product-automation-pack",
    name: "Automation Script Pack",
    shortDescription: "CSV cleanup, order exports, and notification helpers.",
    description:
      "Utility scripts for small storefront operations: CSV cleanup, order exports, and notification helpers with setup notes.",
    category: "Programming & Tech",
    price: 79,
    storeUrl: "code-lab",
    rating: { likes: 58, dislikes: 2, reviewsCount: 21 },
    totalSales: 74,
  },
  {
    id: "static-product-tg-bot",
    name: "Telegram Shop Bot Template",
    shortDescription: "A ready bot that posts new listings to your channel.",
    description:
      "A configurable Telegram bot template that announces new listings, price changes, and restocks to your channel. Node.js source included.",
    category: "Programming & Tech",
    price: 59,
    storeUrl: "code-lab",
    rating: { likes: 41, dislikes: 1, reviewsCount: 16 },
    totalSales: 47,
  },
  {
    id: "static-product-code-review",
    name: "Smart Contract Code Review",
    shortDescription: "A focused review of your Solidity contract, in writing.",
    description:
      "A written review of one Solidity contract up to 500 lines: findings, severity, and suggested fixes, delivered as a report.",
    category: "Business",
    price: 149,
    storeUrl: "code-lab",
    rating: { likes: 22, dislikes: 0, reviewsCount: 9 },
    totalSales: 18,
  },

  // media-vault
  {
    id: "static-product-audio-loops",
    name: "Creator Audio Loops",
    shortDescription: "Royalty-friendly loops for creator projects.",
    description:
      "Short audio loops for videos, games, and social posts. Royalty-friendly license for creator projects.",
    category: "Music & Audio",
    price: 24,
    storeUrl: "media-vault",
    rating: { likes: 36, dislikes: 0, reviewsCount: 12 },
    totalSales: 89,
  },
  {
    id: "static-product-motion-titles",
    name: "Motion Title Templates",
    shortDescription: "12 animated title cards for product videos.",
    description:
      "Twelve animated title cards with editable text and color, exported for After Effects and as transparent WebM.",
    category: "Video & Animation",
    price: 34,
    storeUrl: "media-vault",
    rating: { likes: 29, dislikes: 1, reviewsCount: 10 },
    totalSales: 42,
  },
  {
    id: "static-product-sfx-bundle",
    name: "UI Sound Effects Bundle",
    shortDescription: "Clicks, swipes, and confirmations for apps and games.",
    description:
      "A curated bundle of interface sounds: clicks, swipes, success and error cues. WAV and OGG, normalized loudness.",
    category: "Music & Audio",
    price: 19,
    storeUrl: "media-vault",
    rating: { likes: 44, dislikes: 2, reviewsCount: 17 },
    totalSales: 103,
  },

  // secure-goods
  {
    id: "static-product-hardware-wallet",
    name: "Hardware Wallet (Sealed)",
    shortDescription: "Factory-sealed hardware wallet, shipped tracked.",
    description:
      "A factory-sealed hardware wallet shipped with tracking. Escrow releases only after you confirm the seal is intact.",
    category: "Electronics, Computers & Parts",
    price: 129,
    storeUrl: "secure-goods",
    rating: { likes: 71, dislikes: 2, reviewsCount: 33 },
    totalSales: 57,
  },
  {
    id: "static-product-mech-keyboard",
    name: "Custom Mechanical Keyboard",
    shortDescription: "Hot-swap 75% board, lubed switches, assembled.",
    description:
      "An assembled 75% hot-swap mechanical keyboard with lubed switches and PBT caps. Ships insured; escrow covers delivery condition.",
    category: "Electronics, Computers & Parts",
    price: 189,
    storeUrl: "secure-goods",
    rating: { likes: 39, dislikes: 1, reviewsCount: 15 },
    totalSales: 21,
  },
  {
    id: "static-product-dataset",
    name: "E-commerce Trends Dataset",
    shortDescription: "Cleaned quarterly dataset with source notes.",
    description:
      "A cleaned, documented dataset of e-commerce category trends, updated quarterly. CSV plus a notebook with examples.",
    category: "Data",
    price: 89,
    storeUrl: "secure-goods",
    rating: { likes: 26, dislikes: 1, reviewsCount: 8 },
    totalSales: 34,
  },

  // writers-room
  {
    id: "static-product-launch-copy",
    name: "Product Launch Copy",
    shortDescription: "Landing copy for one product, two revisions included.",
    description:
      "Landing page copy for one product: headline options, feature sections, and a CTA pass. Two revision rounds included.",
    category: "Writing & Translation",
    price: 99,
    storeUrl: "writers-room",
    rating: { likes: 31, dislikes: 1, reviewsCount: 13 },
    totalSales: 29,
  },
  {
    id: "static-product-translation",
    name: "Store Translation (EN ⇄ ES)",
    shortDescription: "Native translation of your storefront and listings.",
    description:
      "Native-speaker translation of your storefront, up to 20 listings, English to Spanish or back. Consistent glossary included.",
    category: "Writing & Translation",
    price: 69,
    storeUrl: "writers-room",
    rating: { likes: 24, dislikes: 0, reviewsCount: 9 },
    totalSales: 25,
  },
  {
    id: "static-product-newsletter",
    name: "Launch Newsletter Sequence",
    shortDescription: "Five emails that warm up and convert your list.",
    description:
      "A five-email launch sequence: teaser, story, proof, offer, last call. Written in your voice from a short questionnaire.",
    category: "Business",
    price: 119,
    storeUrl: "writers-room",
    rating: { likes: 18, dislikes: 1, reviewsCount: 7 },
    totalSales: 15,
  },

  // indie-shelf
  {
    id: "static-product-pixel-game",
    name: "Pixel Roguelike (DRM-free)",
    shortDescription: "A tight 6-hour roguelike, DRM-free download.",
    description:
      "A tight six-hour pixel roguelike with daily runs. DRM-free download for Windows, Mac, and Linux, plus the soundtrack.",
    category: "Films, Music & Games",
    price: 14,
    storeUrl: "indie-shelf",
    rating: { likes: 87, dislikes: 4, reviewsCount: 41 },
    totalSales: 210,
  },
  {
    id: "static-product-worldbuilding-book",
    name: "Worldbuilding Workbook",
    shortDescription: "A 120-page workbook for fiction and game writers.",
    description:
      "A 120-page workbook of prompts and frameworks for building consistent worlds, for fiction writers and game designers. PDF and EPUB.",
    category: "Books",
    price: 21,
    storeUrl: "indie-shelf",
    rating: { likes: 33, dislikes: 1, reviewsCount: 12 },
    totalSales: 66,
  },
  {
    id: "static-product-game-course",
    name: "Make Your First Game (Course)",
    shortDescription: "A 4-week self-paced course, engine included.",
    description:
      "A four-week self-paced course that takes you from zero to a finished small game, using a free engine. Includes project files.",
    category: "Films, Music & Games",
    price: 49,
    storeUrl: "indie-shelf",
    rating: { likes: 52, dislikes: 3, reviewsCount: 23 },
    totalSales: 95,
  },
];

export const staticProducts: Product[] = productSeeds.map((seed) => ({
  ...seed,
  previewImage: null,
  galleryImages: [],
  imageIds: [],
  hasPreview: false,
  tagNames: [seed.category],
  holdPeriod: 7,
}));

export function staticStoreByUrl(storeUrl: string): Store | undefined {
  return staticStores.find((store) => store.url === storeUrl);
}

export function staticProductsForStore(storeUrl: string, page = 1, limit = 12) {
  const all = staticProducts.filter((product) => product.storeUrl === storeUrl);
  const start = (page - 1) * limit;

  return {
    items: all.slice(start, start + limit),
    total: all.length,
  };
}

export function staticProductById(productId: string): Product | undefined {
  const product = staticProducts.find((item) => item.id === productId);
  if (!product) return undefined;

  const store = staticStoreByUrl(product.storeUrl!);
  if (!store) return product;

  return {
    ...product,
    store: {
      ...store,
      owner: {
        username: store.ownerUsername ?? store.url,
        avatarImage: null,
        overallRating: store.rating!,
      },
    },
  };
}
