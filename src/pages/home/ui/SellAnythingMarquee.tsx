/**
 * Two counter-scrolling rows of concrete listings. The point: Sella is
 * as broad as a freelance platform and then some — if you can deliver
 * it, you can sell it.
 */

const rowOne = [
	["🛡", "Solidity audit", "1,200 USDC"],
	["🎨", "Logo + full brand kit", "199 USDC"],
	["🧵", "Sponsored X thread", "400 USDC"],
	["🎮", "Indie game (DRM-free)", "14 USDC"],
	["📈", "Dune dashboard", "299 USDC"],
	["🎤", "Hosted AMA", "600 USDC"],
	["👟", "Rare sneakers, shipped", "240 USDC"],
	["🧠", "1:1 strategy call", "150 USDC"],
	["🎬", "30s launch video", "180 USDC"],
	["📦", "Hardware wallet, sealed", "129 USDC"],
] as const;

const rowTwo = [
	["✍️", "EN ⇄ ES store translation", "69 USDC"],
	["🤖", "Telegram shop bot", "79 USDC"],
	["🃏", "WL spot bundle", "90 USDC"],
	["🎵", "Lo-fi beat pack", "24 USDC"],
	["📕", "Worldbuilding ebook", "21 USDC"],
	["💾", "Cleaned trends dataset", "89 USDC"],
	["🧩", "Custom mint contract", "349 USDC"],
	["📣", "5-KOL launch bundle", "1,800 USDC"],
	["🖼", "Mascot character sheet", "240 USDC"],
	["⌨️", "Custom keyboard build", "189 USDC"],
] as const;

function Chip({ item }: { item: readonly [string, string, string] }) {
	const [emoji, label, price] = item;

	return (
		<span className="flex items-center gap-[0.625rem] rounded-full border border-white/[0.08] bg-white/[0.025] px-[1.125rem] py-[0.625rem] whitespace-nowrap">
			<span className="text-[1rem] leading-none">{emoji}</span>
			<span className="text-black-74 text-[0.9375rem]">{label}</span>
			<span className="text-accent-100/90 text-[0.875rem] font-semibold">{price}</span>
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
				className="flex gap-[0.75rem] pr-[0.75rem] w-max"
				style={{
					animation: `${reverse ? "lp-marquee-reverse" : "lp-marquee"} 80s linear infinite`,
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
		<div className="flex flex-col gap-[0.75rem] w-screen relative left-1/2 -translate-x-1/2" aria-hidden>
			<Row items={rowOne} />
			<Row items={rowTwo} reverse />
		</div>
	);
}
