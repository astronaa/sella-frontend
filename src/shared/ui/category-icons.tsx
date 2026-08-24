import { ReactNode } from "react";

/**
 * Glyph icons for the web3-native categories, keyed by category name.
 * One consistent set for the live categories and the coming-soon tiles
 * in the Categories popup. Unknown names return null so callers can
 * fall back to the category image (e.g. once the backend catalog is
 * live again).
 */

type IconProps = { children: ReactNode; fill?: boolean };

function Icon({ children, fill }: IconProps) {
	return (
		<svg
			viewBox="0 0 48 48"
			className="size-full"
			fill={fill ? "currentColor" : "none"}
			stroke="currentColor"
			strokeWidth={2.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			{children}
		</svg>
	);
}

const icons: Record<string, ReactNode> = {
	"Contracts & Code": (
		<Icon>
			<path d="M15 14 7 24l8 10" />
			<path d="M33 14l8 10-8 10" />
			<path d="M27 9l-6 30" opacity={0.55} />
		</Icon>
	),
	"Promotion & KOLs": (
		<Icon>
			<path d="M9 20v8l19 8V12L9 20Z" />
			<path d="M13 30v7h6v-5" opacity={0.55} />
			<path d="M34 17a9 9 0 0 1 0 14" />
			<path d="M39 13a15 15 0 0 1 0 22" opacity={0.55} />
		</Icon>
	),
	"Design & Branding": (
		<Icon>
			<path d="M24 7 35 26 24 41 13 26 24 7Z" />
			<circle cx={24} cy={26} r={3} />
			<path d="M24 7v16" opacity={0.55} />
		</Icon>
	),
	"Alpha & Access": (
		<Icon>
			<circle cx={16} cy={24} r={7.5} />
			<circle cx={16} cy={24} r={2} opacity={0.55} />
			<path d="M23.5 24H41" />
			<path d="M34 24v6" opacity={0.55} />
			<path d="M41 24v8" />
		</Icon>
	),
	"Bots & Data": (
		<Icon>
			<rect x={12} y={17} width={24} height={19} rx={5} />
			<path d="M24 17v-6" />
			<circle cx={24} cy={8.5} r={2} fill="currentColor" stroke="none" />
			<circle cx={18.5} cy={26.5} r={2.2} fill="currentColor" stroke="none" />
			<circle cx={29.5} cy={26.5} r={2.2} fill="currentColor" stroke="none" />
			<path d="M12 25H7M36 25h5" opacity={0.55} />
		</Icon>
	),
	"Memes & Media": (
		<Icon>
			<path d="M14 9h20a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H23l-9 8v-8a5 5 0 0 1-5-5V14a5 5 0 0 1 5-5Z" />
			<path d="M18 20a6 6 0 0 0 12 0" opacity={0.55} />
		</Icon>
	),
	"RWA & Tokenized Assets": (
		<Icon>
			<path d="M9 40V17l9-7 9 7v23" />
			<path d="M9 40h18" />
			<path d="M15 22h6M15 29h6" opacity={0.55} />
			<circle cx={34} cy={32} r={7.5} />
			<circle cx={34} cy={32} r={3} opacity={0.55} />
		</Icon>
	),
	"AI Agents": (
		<Icon>
			<path d="M22 8c1.2 8 4.5 11.5 12.5 13-8 1.5-11.3 5-12.5 13-1.2-8-4.5-11.5-12.5-13 8-1.5 11.3-5 12.5-13Z" />
			<path d="M36 28c.6 4 2.3 5.8 6 6.5-3.7.7-5.4 2.5-6 6.5-.6-4-2.3-5.8-6-6.5 3.7-.7 5.4-2.5 6-6.5Z" opacity={0.55} />
		</Icon>
	),
	"DeFi & Yield": (
		<Icon>
			<path d="M12 36 36 12" />
			<circle cx={16} cy={15} r={4.5} />
			<circle cx={32} cy={33} r={4.5} opacity={0.55} />
		</Icon>
	),
	"NFTs & Collectibles": (
		<Icon>
			<path d="M24 6l14 8v20l-14 8-14-8V14l14-8Z" />
			<path d="M24 17l7 7-7 7-7-7 7-7Z" opacity={0.55} />
		</Icon>
	),
	"Gaming & Metaverse": (
		<Icon>
			<rect x={7} y={17} width={34} height={17} rx={8.5} />
			<path d="M16 22v7M12.5 25.5h7" />
			<circle cx={30} cy={23.5} r={1.8} fill="currentColor" stroke="none" />
			<circle cx={35} cy={28} r={1.8} fill="currentColor" stroke="none" />
		</Icon>
	),
	"DAO & Governance": (
		<Icon>
			<rect x={9} y={21} width={30} height={17} rx={3} />
			<path d="M20 21h8" opacity={0.55} />
			<path d="M18 21V9h12v12" />
			<path d="M21 14l2.5 2.5L28.5 11" />
		</Icon>
	),
	"Security & Audits": (
		<Icon>
			<path d="M24 6l14 5v12c0 10-5.8 15.8-14 19-8.2-3.2-14-9-14-19V11l14-5Z" />
			<path d="M17 23.5l5 5 9-10" opacity={0.55} />
		</Icon>
	),
	"Nodes & Infra": (
		<Icon>
			<rect x={9} y={9} width={30} height={12} rx={3} />
			<rect x={9} y={27} width={30} height={12} rx={3} />
			<circle cx={16} cy={15} r={1.8} fill="currentColor" stroke="none" />
			<circle cx={16} cy={33} r={1.8} fill="currentColor" stroke="none" />
			<path d="M29 15h5M29 33h5" opacity={0.55} />
		</Icon>
	),
	"Trading Tools": (
		<Icon>
			<path d="M15 12v6M15 30v6" opacity={0.55} />
			<rect x={11} y={18} width={8} height={12} rx={1.5} />
			<path d="M33 8v6M33 32v8" opacity={0.55} />
			<rect x={29} y={14} width={8} height={18} rx={1.5} />
		</Icon>
	),
	"Domains & Identity": (
		<Icon>
			<circle cx={23} cy={24} r={7} />
			<path d="M30 17v10a4.5 4.5 0 0 0 9 0v-3a16 16 0 1 0-6.5 12.8" />
		</Icon>
	),
	"Physical Goods": (
		<Icon>
			<path d="M24 6l16 8v20l-16 8-16-8V14l16-8Z" />
			<path d="M8 14l16 8 16-8" opacity={0.55} />
			<path d="M24 22v20" opacity={0.55} />
		</Icon>
	),
	"Content & Media": (
		<Icon>
			<circle cx={24} cy={24} r={17} />
			<path d="M20.5 17.5 32 24l-11.5 6.5v-13Z" fill="currentColor" stroke="none" opacity={0.85} />
		</Icon>
	),
};

export function categoryIcon(name: string): ReactNode | null {
	return icons[name] ?? null;
}
