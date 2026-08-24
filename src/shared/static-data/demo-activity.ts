import type { Product, TransactionFulfillmentStatus, TransactionStatus } from "~/shared/api/client";
import { staticProductById } from "./marketplace";

/**
 * Demo mode: order history and chat inbox for the signed-out preview
 * (/orders and /chats). Built on the same demo products the marketplace
 * shows so every row and conversation links to a real product page.
 * Remove together with the rest of demo mode at launch.
 */

export interface DemoOrder {
	id: string;
	product: Product;
	storeName: string;
	createdAt: string;
	status: TransactionStatus;
	fulfillmentStatus: TransactionFulfillmentStatus;
	price: number;
}

interface DemoOrderSeed {
	productId: string;
	createdAt: string;
	status: TransactionStatus;
	fulfillmentStatus: TransactionFulfillmentStatus;
}

const orderSeeds: DemoOrderSeed[] = [
	{ productId: "tg-bot", createdAt: "2026-08-24T11:42:00Z", status: "Hold", fulfillmentStatus: "Pending" },
	{ productId: "kol-package", createdAt: "2026-08-23T09:15:00Z", status: "Hold", fulfillmentStatus: "Processing" },
	{ productId: "custom-audit", createdAt: "2026-08-22T16:30:00Z", status: "Released", fulfillmentStatus: "Fulfilled" },
	{ productId: "dune-dash", createdAt: "2026-08-18T14:05:00Z", status: "Released", fulfillmentStatus: "Fulfilled" },
	{ productId: "meme-pack", createdAt: "2026-08-15T19:48:00Z", status: "Released", fulfillmentStatus: "Fulfilled" },
	{ productId: "wl-bundle", createdAt: "2026-08-12T08:22:00Z", status: "Resolved", fulfillmentStatus: "Fulfilled" },
	{ productId: "landing-fig", createdAt: "2026-08-10T12:10:00Z", status: "Released", fulfillmentStatus: "Fulfilled" },
];

export const demoOrders: DemoOrder[] = orderSeeds.flatMap((seed, index) => {
	const product = staticProductById(seed.productId);
	if (!product) return [];

	return [{
		id: `demo-order-${index + 1}`,
		product,
		storeName: product.store?.name ?? "Store",
		createdAt: seed.createdAt,
		status: seed.status,
		fulfillmentStatus: seed.fulfillmentStatus,
		price: product.price ?? 0,
	}];
});

export const demoOrdersTotal = demoOrders.reduce((sum, order) => sum + order.price, 0);

export interface DemoChatMessage {
	kind: "buyer" | "seller" | "system";
	body: string;
	time?: string;
}

export interface DemoChat {
	id: string;
	product: Product;
	unread: number;
	lastTime: string;
	messages: DemoChatMessage[];
}

interface DemoChatSeed {
	productId: string;
	unread: number;
	lastTime: string;
	messages: DemoChatMessage[];
}

const chatSeeds: DemoChatSeed[] = [
	{
		productId: "tg-bot",
		unread: 3,
		lastTime: "14:36",
		messages: [
			{ kind: "buyer", body: "gm, just funded the escrow. I need the bot for a merch drop, around 30 SKUs.", time: "11:44" },
			{ kind: "system", body: "Order created · 79 USDC locked in escrow" },
			{ kind: "seller", body: "gm! Saw the escrow land. Send the product list and your TG channel handle and I'll start wiring it up.", time: "12:02" },
			{ kind: "seller", body: "Also: do you want USDC only at checkout, or ETH too?", time: "12:03" },
			{ kind: "seller", body: "Sent you a preview bot to poke at, check @your_shop_preview_bot 👀", time: "14:36" },
		],
	},
	{
		productId: "kol-package",
		unread: 2,
		lastTime: "13:12",
		messages: [
			{ kind: "system", body: "Order created · 1,800 USDC locked in escrow" },
			{ kind: "buyer", body: "Launch is Thursday 14:00 UTC. Threads should go out within the first hour.", time: "09:20" },
			{ kind: "seller", body: "Confirmed with all five accounts. Drafts coming your way today, you approve every one before it posts.", time: "09:31" },
			{ kind: "seller", body: "First two drafts attached. The hook on #2 is the strongest imo.", time: "13:11" },
			{ kind: "seller", body: "Third one incoming tonight 🫡", time: "13:12" },
		],
	},
	{
		productId: "custom-audit",
		unread: 0,
		lastTime: "Fri",
		messages: [
			{ kind: "buyer", body: "Repo access sent. It's the staking module plus the vesting contract, ~600 lines total.", time: "10:15" },
			{ kind: "system", body: "Order created · 1,200 USDC locked in escrow" },
			{ kind: "seller", body: "Received, starting today. You'll get findings as they come, full report at the end.", time: "10:40" },
			{ kind: "seller", body: "Found a reentrancy path in the withdraw flow. Not exploitable yet but one refactor away from it. Writing it up with a fix.", time: "18:22" },
			{ kind: "seller", body: "Report delivered ✅ Two mediums, one low, fixes included. Ping me here if anything is unclear.", time: "16:05" },
			{ kind: "buyer", body: "Clean work. Confirming now, thanks 🤝", time: "16:28" },
			{ kind: "system", body: "Buyer confirmed · funds released to the seller" },
		],
	},
	{
		productId: "meme-pack",
		unread: 1,
		lastTime: "Sat",
		messages: [
			{ kind: "system", body: "Order created · 120 USDC locked in escrow" },
			{ kind: "buyer", body: "Coin is $WAGYU, mascot is a chunky cow. Go wild.", time: "12:30" },
			{ kind: "seller", body: "Say less. 30 memes, cow-maxxed, tomorrow evening.", time: "12:34" },
			{ kind: "seller", body: "Delivered ✅ Folder link in the files. The wojak ones are the strongest, lead with those.", time: "19:47" },
			{ kind: "system", body: "Buyer confirmed · funds released to the seller" },
			{ kind: "seller", body: "Saw $WAGYU trending today, the memes are everywhere. LFG 🐄", time: "21:03" },
		],
	},
	{
		productId: "wl-bundle",
		unread: 1,
		lastTime: "08.13",
		messages: [
			{ kind: "system", body: "Order created · 90 USDC locked in escrow" },
			{ kind: "seller", body: "Three WL spots confirmed for your wallet. Check the allowlist checkers within 48h.", time: "09:10" },
			{ kind: "buyer", body: "Two spots showed up, the third one isn't on the checker. Can you look into it?", time: "14:52" },
			{ kind: "seller", body: "Team says the third snapshot runs tomorrow, should appear after that.", time: "15:20" },
			{ kind: "buyer", body: "It's been two days and still nothing. Opening a dispute so the timer doesn't run out on me.", time: "11:02" },
			{ kind: "system", body: "Dispute opened · funds stay locked while the jury reviews" },
			{ kind: "system", body: "Dispute resolved 4-1 · partial refund of 30 USDC executed by the contract" },
			{ kind: "seller", body: "Fair outcome, the third spot fell through on the project's side. Apologies fren, the other two are solid.", time: "10:15" },
		],
	},
];

export const demoChats: DemoChat[] = chatSeeds.flatMap((seed, index) => {
	const product = staticProductById(seed.productId);
	if (!product) return [];

	return [{
		id: `demo-chat-${index + 1}`,
		product,
		unread: seed.unread,
		lastTime: seed.lastTime,
		messages: seed.messages,
	}];
});

export const demoChatsUnreadTotal = demoChats.reduce((sum, chat) => sum + chat.unread, 0);
