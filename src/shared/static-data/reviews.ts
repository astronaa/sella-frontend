import type { Review } from "~/shared/api/client";

/**
 * Demo reviews keyed by product id. Same fail-soft role as the rest of
 * the static data: served only when the live API is unreachable.
 */

type Seed = [username: string, isPositive: boolean, daysAgo: number, body: string];

const REVIEW_SEEDS: Record<string, Seed[]> = {
	"erc20-deploy": [
		["0xhamster", true, 12, "Contract was live and verified 9 hours after I sent the params. Walked me through the liquidity lock on a call. Based dev."],
		["gm_degen", true, 34, "Second launch with these guys. Clean code, renounce option explained honestly instead of upsold. Will be back for the staking vault."],
		["ser_liquidity", true, 61, "Compared three sellers before this. Chain Foundry was the only one that asked about vesting before quoting. Got exactly what the listing says."],
		["anon_ape42", false, 88, "Took 30h instead of 24 because of an explorer verification issue. They kept me updated in the chat the whole time, so ok, but still late."],
	],
	"staking-vault": [
		["wagmi_wale", true, 20, "APR schedule config is exactly what our DAO needed. Handover call answered everything, admin panel is simple enough for our non-dev mod."],
		["defi_dad", true, 55, "Deployed on Base, worked first try. Emergency withdraw got tested in staging before handover, appreciated that."],
		["rektproof", true, 90, "Solid work. Asked for a small change to lock periods, done same day, no extra charge."],
	],
	"nft-mint": [
		["mint_maxi", true, 15, "721A with allowlist phases set up cleaner than the last dev we paid twice as much. Mint page snippet dropped straight into our Next site."],
		["pfp_enjoyer", true, 42, "Gas on mint came in under our target. Reveal worked exactly on schedule."],
		["floor_watcher", false, 70, "Wanted a custom mechanic that wasn't in the listing scope. My fault for assuming, but the seller offered a fair custom quote instead of ghosting."],
	],
	"custom-audit": [
		["safu_sam", true, 8, "Found a reentrancy path our own dev missed. Report was readable, fixes were concrete, re-check was included. Worth every cent."],
		["auditooor", true, 39, "Not a rubber stamp. Two highs, five mediums, all real. The 72h turnaround actually held."],
		["shipfast_sol", true, 77, "Sent 650 lines of cursed Solidity, got back a report that didn't sugarcoat anything. Fixed, re-checked, shipped."],
	],

	"seed-alloc": [
		["earlybird_eth", true, 18, "Allocation confirmed on-chain in 5 days, tokens landed at TGE as promised. Escrow made me comfortable wiring this kind of size to a stranger."],
		["quiet_whale", true, 47, "Second allocation through Alpha Desk. Terms matched the deck they shared, distribution was on time."],
		["down_bad_dave", false, 74, "Round I wanted was full, got offered the next one instead. Took the refund through escrow, no drama, back in a week."],
	],
	"presale-spot": [
		["apejustin", true, 9, "Project ghosted TGE on one of these last month and the dispute went my way in 3 days. This time everything landed. This is how presales should work."],
		["moon_or_dust", true, 28, "Entry confirmed in 12 hours. The escrow holding until confirmation is the whole reason I use this instead of DMs."],
		["ngmi_reformed", true, 52, "Third spot bought here. Two shipped, one refunded via dispute. Net very positive, and zero trust required."],
		["cope_seller", false, 81, "Spot was legit but comms were slow over a weekend. Escrow meant I wasn't sweating it, still, answer faster ser."],
	],
	"wl-bundle": [
		["wl_grinder", true, 14, "All three spots showed on the allowlist checkers within a day. One mint already did a 4x. Curation is real."],
		["jpeg_janitor", true, 40, "No more grinding Discords at 3am. Spots delivered to my wallet, escrow released after I verified. Simple."],
		["salty_minter", false, 66, "One of the three mints delayed a month. Not the seller's fault and they offered a partial refund unprompted. Fair."],
	],
	"alpha-report": [
		["chart_goblin", true, 6, "The unlock calendar alone pays for this. Called the rotation into DePIN two weeks before my timeline did."],
		["sunday_reader", true, 33, "Concise, sourced, no shilling of their own bags. Rare."],
		["fomo_fighter", true, 59, "Been subscribed 3 months. The setups come with invalidations, which tells you it's written by people who actually trade."],
	],

	"x-thread": [
		["cto_larper", true, 11, "Draft was properly researched, not a template shill. Thread did 480K impressions and our TG grew 2K in 48h."],
		["launch_szn", true, 37, "Approved the draft Monday, live Tuesday, pinned as promised. Escrow released after I checked the link myself."],
		["small_cap_carl", false, 68, "Reach was below their usual because the algo hated us that week. They posted a bonus quote tweet to compensate. Decent handling."],
	],
	"kol-package": [
		["memecoin_marcus", true, 16, "All 5 posts live within the window, links and screenshots in the report. Volume on launch day says it worked."],
		["stealth_dev", true, 49, "Coordinated posting actually coordinated for once. One KOL swapped out last minute, replacement had bigger reach."],
		["rugpull_survivor", true, 83, "Used the escrow specifically because KOL deals are where I've been burned. Everything delivered, nothing to dispute."],
	],
	"ama-host": [
		["voice_of_ct", true, 22, "Host actually read our docs, asked real questions, kept the trolls in check. Recording delivered next morning."],
		["gm_gn_guy", true, 58, "Promo posts brought 300+ concurrent listeners. Smooth from booking to recording."],
	],
	"tg-raid": [
		["community_carl", true, 13, "Daily reports with screenshots. Raids hit every launch-week post. Captions matched our voice instead of generic wagmi spam."],
		["hype_hank", true, 44, "Second launch using the pack. Energy in the TG was noticeably different vs our first unassisted launch."],
	],

	"tg-bot": [
		["indie_seller", true, 19, "Bot was posting my listings 20 minutes after purchase. Source is clean Node, edited the templates easily."],
		["vps_enjoyer", true, 51, "Runs on my $5 box exactly as advertised. Webhook notes saved me an evening."],
		["bot_curious", true, 79, "Asked two setup questions in the order chat, both answered within the hour."],
	],
	"snipe-config": [
		["fast_finger_fred", true, 10, "The safety checklist alone saved me from two honeypots in week one. Configs are current, not last cycle's."],
		["latency_lord", true, 38, "Monthly update arrived as promised. Settings documented, not just dumped."],
		["paper_hands_pete", false, 72, "Expected magic, got tooling. It's good tooling, but you still need to know what you're doing. Read the listing properly, unlike me."],
	],
	"dune-dash": [
		["data_degen", true, 25, "Dashboard live in 36h. Whale-flow panel caught a wallet accumulating before it hit CT. Queries handed over like promised."],
		["numbers_nancy", true, 62, "Clean queries we could fork ourselves. Team uses it daily now."],
	],
	"dex-boiler": [
		["frontend_fatigue", true, 17, "Skinned it to our brand in one afternoon, exactly as claimed. Wagmi hooks are current versions, not rotted."],
		["ship_it_sam", true, 46, "Saved us 3 weeks minimum. Slippage and token-list handling already production-grade."],
		["react_andy", true, 85, "Readable code with actual commit history. You can tell it's been shipped before."],
	],

	"meme-pack": [
		["shitpost_chad", true, 7, "50 memes and maybe 40 were instantly usable, which is an insane hit rate. Community stole them within the hour."],
		["viral_vince", true, 31, "Formats were current, not 2024 leftovers. Posting-order doc was a nice touch."],
		["mod_mike", true, 64, "Second pack ordered. First one carried our launch week TG activity."],
	],
	"sticker-set": [
		["sticker_stan", true, 12, "Install link worked instantly, animations are smooth. Our TG uses the cope one hourly."],
		["tg_tommy", true, 43, "Mascot came out better in the stickers than our original art. Source files included as listed."],
	],
	"shill-video": [
		["cut_once", true, 21, "First draft was already usable, second revision nailed it. Format matched what's actually trending."],
		["attention_arb", true, 56, "30 seconds, subtitles baked, CA on screen. Did numbers on both X and TikTok."],
		["patience_zero", false, 78, "Took the full 72h and I wanted it in 24. Quality was worth it, but plan ahead if you're on a launch clock."],
	],
	"mascot-art": [
		["mascot_max", true, 26, "12 poses, consistent style, transparent PNGs. Community started making their own memes with them same day."],
		["art_appreciator", true, 60, "Vector source means our next hire can extend the set. Professional handover."],
	],

	"memecoin-brand": [
		["launch_larry", true, 9, "48h delivery held. DEX screener art alone made us look 10x more serious than the competition that week."],
		["brand_brian", true, 35, "Mini style guide keeps our mods from butchering the logo. Small thing, big difference."],
		["serious_project_sry", true, 67, "Came for a memecoin kit, stayed because it's actual design work. Source files all there."],
	],
	"dapp-ui": [
		["figma_fiend", true, 15, "Wallet flows and tx states are the components everyone forgets to design. This kit has them all, dark mode included."],
		["tailwind_tina", true, 48, "Tokens mapped to Tailwind almost 1:1 like the listing says. Quarterly update arrived."],
		["design_dad", true, 82, "Bought for one project, used on three. Best value in my toolkit."],
	],
	"landing-fig": [
		["same_day_sam", true, 18, "Swapped copy and colors, published from Framer the same evening. Tokenomics blocks saved real design time."],
		["template_tim", true, 53, "Clean structure, no lorem-ipsum rot in hidden layers. Rare for templates."],
	],
	"pitch-deck": [
		["fundraise_frank", true, 24, "Used the structure for our pre-seed. Two investors specifically said the deck was clear. Notes on each slide are the real product."],
		["deck_doctor", true, 57, "Keynote version matched the Figma one exactly. No font chaos."],
		["anon_founder", true, 89, "The ask-slide guidance stopped me from making the classic vague-ask mistake."],
	],
};

function toReviews(productId: string, seeds: Seed[]): Review[] {
	const now = Date.now();

	return seeds.map(([username, isPositive, daysAgo, body], index) => ({
		id: `static-review-${productId}-${index}`,
		body,
		isPositive,
		createdAt: new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
		user: { username, avatarImage: null },
	}));
}

export function staticReviewsForProduct(
	productId: string,
	sort: string = "newest",
	page = 1,
	limit = 10,
) {
	const seeds = REVIEW_SEEDS[productId];
	if (!seeds) return { items: [], total: 0 };

	const reviews = toReviews(productId, seeds);

	reviews.sort((a, b) => {
		switch (sort) {
			case "oldest":
				return a.createdAt.localeCompare(b.createdAt);
			case "highestRating":
				return Number(b.isPositive) - Number(a.isPositive);
			case "lowestRating":
				return Number(a.isPositive) - Number(b.isPositive);
			case "newest":
			default:
				return b.createdAt.localeCompare(a.createdAt);
		}
	});

	const start = (page - 1) * limit;

	return {
		items: reviews.slice(start, start + limit),
		total: reviews.length,
	};
}
