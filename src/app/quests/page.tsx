import { Metadata } from "next";
import Link from "next/link";
import { Heading } from "~/shared/ui/kit/heading";
import { Button } from "~/shared/ui/kit/button";

export const metadata: Metadata = {
	title: "Quests · Sella",
	description:
		"Sella Quests: earn points for trading, inviting, and supporting the marketplace. Coming soon.",
};

const previewQuests = [
	{ points: 2000, title: "Follow on X", description: "Stay updated with the latest Sella news." },
	{ points: 1500, title: "Retweet the launch", description: "Help the timeline find us." },
	{ points: 1500, title: "Add 🟡 to your username", description: "Fly the colors on X or Telegram." },
	{ points: 3000, title: "Complete your first escrow order", description: "Buy or sell anything, protected." },
	{ points: 5000, title: "Open a storefront", description: "Claim your handle and list a product." },
	{ points: 2500, title: "Invite a friend who trades", description: "Points land when their first order closes." },
];

export default function Page() {
	return (
		<div className="flex flex-col gap-[3.5rem] w-full max-w-content mx-auto px-[1rem] pb-[5rem]">
			<div className="flex flex-col items-center gap-[1.5rem] text-center pt-[2rem]">
				<span className="flex items-center gap-[0.5rem] rounded-full border border-accent-100/30 bg-accent-100/[0.07] px-[0.875rem] py-[0.375rem] text-[0.8125rem] text-accent-100">
					<span className="size-[0.375rem] rounded-full bg-accent-100 animate-pulse" />
					Coming soon
				</span>

				<Heading size="lg" className="tracking-[-0.02em] max-w-[38rem] text-balance">
					Sella Quests.
					<br />
					<span className="bg-gradient-to-r from-accent-100 via-[#FFE865] to-accent-hover bg-clip-text text-transparent">
						Earn while you trade.
					</span>
				</Heading>

				<p className="text-black-60 text-[1.0625rem] leading-[1.6] max-w-[36rem]">
					Points for trading, inviting, and backing the marketplace early.
					Quests are being wired up right now; here is a preview of the first
					season.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[1.25rem]">
				{previewQuests.map((quest) => (
					<div
						key={quest.title}
						className="relative flex flex-col gap-[0.75rem] rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] p-[1.5rem] overflow-hidden"
					>
						<div className="flex items-center justify-between">
							<span className="rounded-full border border-accent-100/25 bg-accent-100/[0.08] px-[0.75rem] py-[0.25rem] text-[0.8125rem] font-semibold text-accent-100">
								+{quest.points.toLocaleString("en-US")} pts
							</span>
							<span className="flex items-center justify-center size-[1.75rem] rounded-full border border-white/[0.1] text-black-40">
								<svg viewBox="0 0 16 16" className="size-[0.8125rem] fill-current">
									<path d="M8 1a3.5 3.5 0 013.5 3.5V6H12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h.5V4.5A3.5 3.5 0 018 1zm0 1.5A2 2 0 006 4.5V6h4V4.5a2 2 0 00-2-2z" />
								</svg>
							</span>
						</div>
						<h3 className="text-white font-semibold">{quest.title}</h3>
						<p className="text-black-60 text-[0.9375rem] leading-[1.5]">
							{quest.description}
						</p>
					</div>
				))}
			</div>

			<div className="flex flex-col items-center gap-[1rem] text-center rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-[2.5rem]">
				<p className="text-black-60 max-w-[32rem]">
					Get a head start: open your storefront now, and your early activity
					counts when quests go live.
				</p>
				<Link href="/">
					<Button variant="solid">Open Storefront</Button>
				</Link>
			</div>
		</div>
	);
}
