import type { Product, Store } from "~/shared/api/client";

/**
 * Demo dataset used as a fail-soft fallback whenever the live API is
 * unreachable. Read paths try the API first and fall back here, so the
 * site works as a full demo with no backend and heals itself when the
 * backend comes online. Covers and logos live in /public/demo.
 */

export const staticStores: Store[] = [
	{
		id: "static-chain-foundry",
		name: "Chain Foundry",
		url: "chain-foundry",
		description:
			"Smart contracts, shipped. Token launches, staking vaults, NFT mints. Deployed, verified, and handed over with docs.",
		isVerified: true,
		ownerUsername: "chainsmith",
		tagNames: ["Programming & Tech", "Business"],
		previewImage: "/demo/logo-chain-foundry.jpg",
		rating: { likes: 214, dislikes: 6, reviewsCount: 97 },
	},
	{
		id: "static-alpha-desk",
		name: "Alpha Desk",
		url: "alpha-desk",
		description:
			"Early-round access and research for people who ape responsibly. Every allocation escrow-held until tokens land.",
		isVerified: true,
		ownerUsername: "alphadesk",
		tagNames: ["Business", "Data"],
		previewImage: "/demo/logo-alpha-desk.jpg",
		rating: { likes: 168, dislikes: 11, reviewsCount: 74 },
	},
	{
		id: "static-kol-boost",
		name: "KOL Boost",
		url: "kol-boost",
		description:
			"X threads, KOL bundles, AMAs, and raid packs for launch week. You pay when the posts are live, not before.",
		isVerified: false,
		ownerUsername: "kolboost",
		tagNames: ["Digital Marketing", "Business"],
		previewImage: "/demo/logo-kol-boost.jpg",
		rating: { likes: 132, dislikes: 9, reviewsCount: 58 },
	},
	{
		id: "static-code-lab",
		name: "Code Lab",
		url: "code-lab",
		description:
			"Bots, dashboards, and frontends for onchain projects. Source code included, no black boxes.",
		isVerified: false,
		ownerUsername: "codelab",
		tagNames: ["Programming & Tech", "Data"],
		previewImage: "/demo/logo-code-lab.jpg",
		rating: { likes: 96, dislikes: 3, reviewsCount: 41 },
	},
	{
		id: "static-meme-forge",
		name: "Meme Forge",
		url: "meme-forge",
		description:
			"Memes, stickers, and hype cuts in your project's skin. The content side of your launch, handled.",
		isVerified: false,
		ownerUsername: "memeforge",
		tagNames: ["Graphics & Design", "Films, Music & Games"],
		previewImage: "/demo/logo-meme-forge.jpg",
		rating: { likes: 151, dislikes: 4, reviewsCount: 66 },
	},
	{
		id: "static-design-market",
		name: "Design Market",
		url: "design-market",
		description:
			"Web3 branding and product design: memecoin kits, dapp UI libraries, landing templates, investor decks.",
		isVerified: true,
		ownerUsername: "designmarket",
		tagNames: ["Graphics & Design", "Digital Marketing"],
		previewImage: "/demo/logo-design-market.jpg",
		rating: { likes: 187, dislikes: 5, reviewsCount: 85 },
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
	cover: string;
	rating: { likes: number; dislikes: number; reviewsCount: number };
	totalSales: number;
}

const productSeeds: DemoProductSeed[] = [
	// chain-foundry
	{
		id: "erc20-deploy",
		name: "Token Launch Setup",
		shortDescription: "ERC-20 + liquidity lock, deployed and verified in 24h.",
		description:
			"Full token launch package: audited ERC-20 template configured to your tokenomics, liquidity lock, ownership renounce option, deployment to mainnet or an L2, and source verification on the explorer. You get the deployer walkthrough, all addresses, and a handover doc. Delivered within 24 hours of receiving your parameters.",
		category: "Programming & Tech",
		price: 499,
		storeUrl: "chain-foundry",
		cover: "/demo/p-erc20-deploy.jpg",
		rating: { likes: 78, dislikes: 2, reviewsCount: 34 },
		totalSales: 61,
	},
	{
		id: "staking-vault",
		name: "Staking Vault Setup",
		shortDescription: "Audited staking contract with APR config and admin panel.",
		description:
			"Battle-tested staking vault deployed for your token: configurable APR schedule, lock periods, emergency withdraw, and a simple admin panel to manage rewards. Includes deployment, verification, and a 30-minute handover call.",
		category: "Programming & Tech",
		price: 899,
		storeUrl: "chain-foundry",
		cover: "/demo/p-staking-vault.jpg",
		rating: { likes: 41, dislikes: 1, reviewsCount: 19 },
		totalSales: 27,
	},
	{
		id: "nft-mint",
		name: "NFT Mint Contract",
		shortDescription: "ERC-721A with allowlist, reveal, and gas-optimized mint.",
		description:
			"ERC-721A mint contract with allowlist phases, delayed reveal, per-wallet limits, and withdraw splits. Gas-optimized and deployed to the chain of your choice, with a mint page snippet to drop into your site.",
		category: "Programming & Tech",
		price: 349,
		storeUrl: "chain-foundry",
		cover: "/demo/p-nft-mint.jpg",
		rating: { likes: 52, dislikes: 2, reviewsCount: 23 },
		totalSales: 44,
	},
	{
		id: "custom-audit",
		name: "Contract Review",
		shortDescription: "Line-by-line review of your Solidity, report in 72h.",
		description:
			"An independent line-by-line review of one contract up to 800 lines: findings ranked by severity, concrete fixes, and a re-check of your patches. Written report delivered within 72 hours. Not a formal audit certificate, but the bugs get found.",
		category: "Business",
		price: 1200,
		storeUrl: "chain-foundry",
		cover: "/demo/p-custom-audit.jpg",
		rating: { likes: 43, dislikes: 1, reviewsCount: 21 },
		totalSales: 25,
	},

	// alpha-desk
	{
		id: "seed-alloc",
		name: "Seed Round Access",
		shortDescription: "Vetted early-round allocations, escrow-held until tokens land.",
		description:
			"Access to vetted seed and private-round allocations we negotiate as a syndicate. Your payment sits in escrow until the allocation is confirmed on-chain and tokens are distributed to your wallet. If the round falls through, the contract refunds you automatically.",
		category: "Business",
		price: 2500,
		storeUrl: "alpha-desk",
		cover: "/demo/p-seed-alloc.jpg",
		rating: { likes: 47, dislikes: 4, reviewsCount: 24 },
		totalSales: 19,
	},
	{
		id: "presale-spot",
		name: "Presale Spot",
		shortDescription: "Guaranteed presale entry, refunded if TGE never happens.",
		description:
			"A guaranteed spot in a curated presale, one per buyer. The escrow holds your payment until your entry is confirmed by the project. No TGE, no deal: disputes have gone our buyers' way every time a project ghosted.",
		category: "Business",
		price: 250,
		storeUrl: "alpha-desk",
		cover: "/demo/p-presale-spot.jpg",
		rating: { likes: 66, dislikes: 5, reviewsCount: 31 },
		totalSales: 87,
	},
	{
		id: "wl-bundle",
		name: "WL Spot Bundle",
		shortDescription: "Three curated mint whitelists from this month's picks.",
		description:
			"Three whitelist spots across this month's curated mints. We filter for teams that ship, not rug. Spots delivered to your wallet address within 48 hours, escrow releases when you confirm them on the allowlist checkers.",
		category: "Business",
		price: 90,
		storeUrl: "alpha-desk",
		cover: "/demo/p-wl-bundle.jpg",
		rating: { likes: 38, dislikes: 2, reviewsCount: 15 },
		totalSales: 112,
	},
	{
		id: "alpha-report",
		name: "Weekly Alpha Report",
		shortDescription: "On-chain flows, unlock calendar, narrative watch. PDF.",
		description:
			"A weekly PDF for people who read before they ape: smart-money flows, unlock calendar for the next 30 days, narrative rotation watch, and three setups we're tracking with entries and invalidations.",
		category: "Data",
		price: 30,
		storeUrl: "alpha-desk",
		cover: "/demo/p-alpha-report.jpg",
		rating: { likes: 71, dislikes: 3, reviewsCount: 29 },
		totalSales: 340,
	},

	// kol-boost
	{
		id: "x-thread",
		name: "Sponsored Thread",
		shortDescription: "Deep-dive thread from a 120K-follower crypto account.",
		description:
			"A researched deep-dive thread about your project posted from our 120K crypto account, pinned for 48 hours. You approve the draft before it goes live, and escrow releases only after the thread is up with the link in your order chat.",
		category: "Digital Marketing",
		price: 400,
		storeUrl: "kol-boost",
		cover: "/demo/p-x-thread.jpg",
		rating: { likes: 44, dislikes: 3, reviewsCount: 20 },
		totalSales: 53,
	},
	{
		id: "kol-package",
		name: "KOL Bundle",
		shortDescription: "Five mid-tier KOLs post within 48h, report included.",
		description:
			"Five mid-tier crypto KOLs (30K-150K) post about your project within a 48-hour window, coordinated for launch week. You get the post links and a reach report. Escrow releases when all five posts are verified live.",
		category: "Digital Marketing",
		price: 1800,
		storeUrl: "kol-boost",
		cover: "/demo/p-kol-package.jpg",
		rating: { likes: 31, dislikes: 4, reviewsCount: 16 },
		totalSales: 22,
	},
	{
		id: "ama-host",
		name: "Hosted AMA",
		shortDescription: "X Spaces AMA: hosted, promoted, and recorded.",
		description:
			"A one-hour X Spaces AMA for your project: professional host, promo posts before the event, moderated questions, and the recording delivered after. Calendar slot confirmed in your order chat within 24 hours.",
		category: "Digital Marketing",
		price: 600,
		storeUrl: "kol-boost",
		cover: "/demo/p-ama-host.jpg",
		rating: { likes: 27, dislikes: 1, reviewsCount: 12 },
		totalSales: 18,
	},
	{
		id: "tg-raid",
		name: "Raid Pack",
		shortDescription: "TG raid team plus caption pack for launch week.",
		description:
			"A coordinated Telegram raid team for launch week plus a caption pack tuned to your project's voice. Daily activity report in the order chat so you can see exactly what ran.",
		category: "Digital Marketing",
		price: 220,
		storeUrl: "kol-boost",
		cover: "/demo/p-tg-raid.jpg",
		rating: { likes: 30, dislikes: 1, reviewsCount: 10 },
		totalSales: 41,
	},

	// code-lab
	{
		id: "tg-bot",
		name: "Telegram Shop Bot",
		shortDescription: "Node.js storefront bot, webhook-ready source included.",
		description:
			"A Telegram bot that announces your new listings, price changes, and restocks to your channel. Node.js source included with webhook setup notes; runs on any $5 VPS.",
		category: "Programming & Tech",
		price: 79,
		storeUrl: "code-lab",
		cover: "/demo/p-tg-bot.jpg",
		rating: { likes: 35, dislikes: 1, reviewsCount: 14 },
		totalSales: 96,
	},
	{
		id: "snipe-config",
		name: "Sniper Config",
		shortDescription: "Battle-tested bot configs plus a safety checklist.",
		description:
			"Our battle-tested configuration files for the popular sniping bots, plus the safety checklist that keeps you out of honeypots. Updated monthly; you get the current pack and the next update.",
		category: "Programming & Tech",
		price: 149,
		storeUrl: "code-lab",
		cover: "/demo/p-snipe-config.jpg",
		rating: { likes: 48, dislikes: 5, reviewsCount: 22 },
		totalSales: 128,
	},
	{
		id: "dune-dash",
		name: "Dune Dashboard",
		shortDescription: "Custom dashboard for your token, live within 48h.",
		description:
			"A custom Dune dashboard for your token: holders over time, whale flows, DEX volume, and unlock tracking. Live within 48 hours, with the queries handed over so your team owns it.",
		category: "Data",
		price: 299,
		storeUrl: "code-lab",
		cover: "/demo/p-dune-dash.jpg",
		rating: { likes: 26, dislikes: 0, reviewsCount: 11 },
		totalSales: 33,
	},
	{
		id: "dex-boiler",
		name: "DEX Frontend Kit",
		shortDescription: "Next.js swap UI with wagmi hooks, theme-ready.",
		description:
			"A production Next.js swap frontend: wagmi hooks, wallet connect, token lists, slippage settings, and a theming layer so you can skin it to your brand in an afternoon. Source with commit history.",
		category: "Programming & Tech",
		price: 199,
		storeUrl: "code-lab",
		cover: "/demo/p-dex-boiler.jpg",
		rating: { likes: 39, dislikes: 2, reviewsCount: 17 },
		totalSales: 71,
	},

	// meme-forge
	{
		id: "meme-pack",
		name: "Launch Meme Pack",
		shortDescription: "50 custom memes in your project's skin, launch-ready.",
		description:
			"Fifty custom memes built on formats that are actually moving, re-skinned to your project's mascot and colors. Delivered as a sorted pack with posting-order suggestions for launch week.",
		category: "Graphics & Design",
		price: 120,
		storeUrl: "meme-forge",
		cover: "/demo/p-meme-pack.jpg",
		rating: { likes: 58, dislikes: 1, reviewsCount: 26 },
		totalSales: 143,
	},
	{
		id: "sticker-set",
		name: "TG Sticker Set",
		shortDescription: "24 animated stickers, delivered install-ready.",
		description:
			"Twenty-four animated Telegram stickers of your mascot: gm, wagmi, pump, cope, and twenty more. Delivered install-ready with the share link, plus source files.",
		category: "Graphics & Design",
		price: 60,
		storeUrl: "meme-forge",
		cover: "/demo/p-sticker-set.jpg",
		rating: { likes: 49, dislikes: 1, reviewsCount: 21 },
		totalSales: 167,
	},
	{
		id: "shill-video",
		name: "Hype Cut",
		shortDescription: "A 30-second launch video edited to the trending format.",
		description:
			"A 30-second launch video cut to whatever format is trending this month: your branding, your CA, licensed music, subtitles baked in. Two revision rounds, delivered in 72 hours.",
		category: "Films, Music & Games",
		price: 180,
		storeUrl: "meme-forge",
		cover: "/demo/p-shill-video.jpg",
		rating: { likes: 33, dislikes: 2, reviewsCount: 13 },
		totalSales: 58,
	},
	{
		id: "mascot-art",
		name: "Mascot Sheet",
		shortDescription: "Character sheet with 12 poses for your memecoin.",
		description:
			"A full character sheet for your memecoin mascot: 12 poses and expressions, transparent PNGs plus vector source, ready for memes, stickers, and site art. Consistent style your community can run with.",
		category: "Graphics & Design",
		price: 240,
		storeUrl: "meme-forge",
		cover: "/demo/p-mascot-art.jpg",
		rating: { likes: 42, dislikes: 0, reviewsCount: 18 },
		totalSales: 64,
	},

	// design-market
	{
		id: "memecoin-brand",
		name: "Memecoin Brand Kit",
		shortDescription: "Logo, banner, DEX screener art, and TG skin.",
		description:
			"Everything a launch needs to not look like a rug: logo with variants, X banner, DEX screener art, Telegram skin, and a mini style guide. Delivered in 48 hours with source files.",
		category: "Graphics & Design",
		price: 199,
		storeUrl: "design-market",
		cover: "/demo/p-memecoin-brand.jpg",
		rating: { likes: 61, dislikes: 2, reviewsCount: 28 },
		totalSales: 91,
	},
	{
		id: "dapp-ui",
		name: "Dapp UI Kit",
		shortDescription: "320+ Figma components with dark mode and tokens.",
		description:
			"A dapp-focused Figma UI kit: 320+ components, wallet flows, transaction states, empty states, dark mode, and design tokens that map cleanly to Tailwind. Updated quarterly.",
		category: "Graphics & Design",
		price: 89,
		storeUrl: "design-market",
		cover: "/demo/p-dapp-ui.jpg",
		rating: { likes: 54, dislikes: 1, reviewsCount: 24 },
		totalSales: 176,
	},
	{
		id: "landing-fig",
		name: "Token Landing Page",
		shortDescription: "Figma + Framer template with tokenomics blocks.",
		description:
			"A token landing template in Figma and Framer: hero, tokenomics blocks, roadmap, FAQ, and CTA sections. Swap the copy and colors and you're live the same day.",
		category: "Graphics & Design",
		price: 59,
		storeUrl: "design-market",
		cover: "/demo/p-landing-fig.jpg",
		rating: { likes: 37, dislikes: 1, reviewsCount: 16 },
		totalSales: 132,
	},
	{
		id: "pitch-deck",
		name: "Investor Deck Kit",
		shortDescription: "A 20-slide deck template that raised real rounds.",
		description:
			"The 20-slide structure we've seen raise seed rounds: problem, wedge, traction, tokenomics, ask. Figma and Keynote versions with guidance notes on every slide.",
		category: "Business",
		price: 79,
		storeUrl: "design-market",
		cover: "/demo/p-pitch-deck.jpg",
		rating: { likes: 29, dislikes: 1, reviewsCount: 12 },
		totalSales: 84,
	},
];

export const staticProducts: Product[] = productSeeds.map(({ cover, ...seed }) => ({
	...seed,
	previewImage: cover,
	galleryImages: [],
	imageIds: [],
	hasPreview: true,
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
				avatarImage: store.previewImage ?? null,
				overallRating: store.rating!,
			},
		},
	};
}
