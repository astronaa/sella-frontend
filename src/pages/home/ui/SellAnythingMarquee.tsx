/**
 * Two counter-scrolling rows of concrete listings. The point: Sella is
 * as broad as a freelance platform and then some — if you can deliver
 * it, you can sell it. Rows are wide enough that a single set covers
 * ultrawide screens, so the loop never shows a gap. Hovering pauses
 * the row and flips the chip to "Coming soon".
 */

const rowOne = [
	["🛡", "Solidity audit", "1,200 USDC"],
	["🎨", "Logo + full brand kit", "199 USDC"],
	["🏠", "Tokenized real estate consult", "650 USDC"],
	["🧵", "Sponsored X thread", "400 USDC"],
	["🎮", "Indie game (DRM-free)", "14 USDC"],
	["⌚", "Rolex, authenticated + shipped", "8,400 USDC"],
	["📈", "Dune dashboard", "299 USDC"],
	["🎤", "Hosted AMA", "600 USDC"],
	["🧾", "Invoice tokenization setup", "900 USDC"],
	["👟", "Rare sneakers, shipped", "240 USDC"],
	["🧠", "1:1 strategy call", "150 USDC"],
	["🥇", "Gold-backed token audit", "1,500 USDC"],
	["🎬", "30s launch video", "180 USDC"],
	["📦", "Hardware wallet, sealed", "129 USDC"],
	["🗳", "DAO governance setup", "300 USDC"],
	["🔐", "Multisig setup + training", "150 USDC"],
] as const;

const rowTwo = [
	["✍️", "EN ⇄ ES store translation", "69 USDC"],
	["🤖", "Telegram shop bot", "79 USDC"],
	["🌾", "Farmland yield token deck", "500 USDC"],
	["🃏", "WL spot bundle", "90 USDC"],
	["🎵", "Lo-fi beat pack", "24 USDC"],
	["🏛", "RWA legal wrapper setup", "1,100 USDC"],
	["📕", "Worldbuilding ebook", "21 USDC"],
	["💾", "Cleaned trends dataset", "89 USDC"],
	["🧩", "Custom mint contract", "349 USDC"],
	["💎", "Tokenized diamond cert check", "260 USDC"],
	["📣", "5-KOL launch bundle", "1,800 USDC"],
	["🖼", "Mascot character sheet", "240 USDC"],
	["⛓", "Subgraph development", "400 USDC"],
	["🏦", "T-bill vault integration", "950 USDC"],
	["⌨️", "Custom keyboard build", "189 USDC"],
	["🧮", "Tokenomics model", "500 USDC"],
] as const;

type Item = readonly [string, string, string];

function Chip({ item }: { item: Item }) {
	const [emoji, label, price] = item;

	return (
		<span className="group relative flex items-center gap-[0.625rem] rounded-full bg-white/[0.045] px-[1.125rem] py-[0.625rem] whitespace-nowrap cursor-default">
			<span className="text-[1rem] leading-none">{emoji}</span>
			<span className="text-black-74 text-[0.9375rem]">{label}</span>
			<span className="text-accent-100/90 text-[0.875rem] font-semibold">{price}</span>

			{/* hover: the listing isn't buyable yet */}
			<span className="absolute inset-0 flex items-center justify-center rounded-full bg-accent-100 text-black-100 text-[0.875rem] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
				Coming soon 👀
			</span>
		</span>
	);
}

function Row({
	items,
	reverse,
}: {
	items: typeof rowOne | typeof rowTwo;
	reverse?: boolean;
}) {
	const doubled = [...items, ...items];

	return (
		<div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
			<div
				className="flex gap-[0.75rem] pr-[0.75rem] w-max hover:[animation-play-state:paused]"
				style={{
					animation: `${reverse ? "lp-marquee-reverse" : "lp-marquee"} 110s linear infinite`,
				}}
			>
				{doubled.map((item, index) => (
					<Chip key={`${item[1]}-${index}`} item={item} />
				))}
			</div>
		</div>
	);
}

export function SellAnythingMarquee() {
	return (
		<div className="flex flex-col gap-[0.75rem] w-screen relative left-1/2 -translate-x-1/2">
			<Row items={rowOne} />
			<Row items={rowTwo} reverse />
		</div>
	);
}
