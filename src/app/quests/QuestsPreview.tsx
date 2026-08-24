'use client';

import { useEffect, useRef, useState } from "react";
import { cn } from "~/shared/lib/cn";
import { Heading } from "~/shared/ui/kit/heading";
import { Button } from "~/shared/ui/kit/button";

/**
 * Public preview of the Quests dashboard: the full original layout
 * (referral bar, summary cards, task tabs, decentralized management),
 * with every interaction answering "coming soon". Content aligned with
 * the whitepaper wording; sample numbers are illustrative.
 */

const summaryCards = [
	{
		title: "Earn Points",
		items: [
			"Resolve Disputes & Reports",
			"Complete Social Tasks & Refer Friends",
			"Achieve Sella Milestones",
		],
	},
	{
		title: "Referral Program",
		items: [
			"Get 10% of Referred Individuals' Points",
			"Achieve Referral Milestones & Get Boosts",
			"Single-level Referrals Only",
		],
	},
	{
		title: "Redeem Points",
		items: [
			"Top Up Your Sella Balance",
			"Get Vested $SELLA Tokens",
			"Exchange Points for Gift Cards",
		],
	},
];

interface Task {
	title: string;
	description: string;
	points: number;
	complete?: boolean;
	locked?: boolean;
}

const socialTasks: { left: Task[]; right: Task[] } = {
	left: [
		{ title: "Follow on X", description: "Stay updated with the latest Sella trends and news!", points: 2000, complete: true },
		{ title: "Add 🟡 Sella to username", description: "Show support by adding 'Sella' to your username!", points: 1500 },
		{ title: "Retweet on X", description: "Spread the word! Share Sella with your network!", points: 1500 },
		{ title: "Like on X", description: "Love Sella? Hit like and let everyone know!", points: 750 },
		{ title: "Comment on X", description: "Leave a comment and join the conversation!", points: 2500 },
		{ title: "Follow on Telegram", description: "Join our Telegram community for exclusive updates!", points: 500 },
	],
	right: [
		{ title: "Like Medium Post", description: "Show Sella articles some love with claps!", points: 500 },
		{ title: "Upvote on Reddit", description: "Think Sella's cool? Give it an upvote on Reddit!", points: 500 },
		{ title: "Refer 1 friend", description: "Refer a friend and share the joy!", points: 1000 },
		{ title: "Refer 5 friends", description: "More friends, more fun!", points: 5000, locked: true },
		{ title: "Refer 10 friends", description: "Become a super referrer!", points: 15000, locked: true },
		{ title: "Create your first Store", description: "Start your entrepreneurial journey!", points: 500 },
	],
};

const milestones: Task[] = [
	{ title: "Complete your first escrow order", description: "Buy or sell anything, escrow-protected.", points: 3000 },
	{ title: "First sale in your storefront", description: "The contract releases, the points land.", points: 5000 },
	{ title: "10 completed orders", description: "Buyer or seller, volume counts.", points: 10000, locked: true },
	{ title: "First dispute vote", description: "Serve on a jury and vote with the majority.", points: 2000, locked: true },
];

const managementPanels = [
	{
		heading: "Resolve Dispute",
		blurb:
			"Become part of Sella's decentralized management and steer the platform towards success!",
		points: 15000,
		columns: [
			{
				title: "Decentralized Management",
				items: [
					"Users can vote on dispute resolution",
					"Receive points for voting",
					"Jury of five, selected at random, majority wins",
				],
			},
			{
				title: "Securing the Escrow System",
				items: [
					"Users are the backbone of the escrow system",
					"Malicious actors swiftly banned forever",
					"Perks and incentives assure quick resolution",
				],
			},
			{
				title: "Funds Release Guarantee",
				items: [
					"Consensus enforced by an automatic system",
					"Funds released as the dispute resolves",
					"Functionality secured through the smart contract",
				],
			},
		],
	},
	{
		heading: "Reports",
		blurb:
			"Act as the platform's vanguard, shield users from malicious actors and earn points for doing so!",
		points: 15000,
		columns: [
			{
				title: "Educate Yourself",
				items: [
					"Read our prohibited items list",
					"Study our terms of service",
					"Get tips on best practices",
				],
			},
			{
				title: "Jump Into Action",
				items: [
					"Click the button below to start",
					"Carefully study each report",
					"Vote only when you are certain",
				],
			},
			{
				title: "Cash In",
				items: [
					"Points are automatically added to your account",
					"Exchange points via the Spend Points dashboard",
					"Reap the benefits of your efforts",
				],
			},
		],
	},
];

const tabs = ["Social tasks", "Milestones", "Decentralized management"] as const;

export function QuestsPreview() {
	const [tab, setTab] = useState<(typeof tabs)[number]>("Social tasks");
	const [toastVisible, setToastVisible] = useState(false);
	const toastTimer = useRef<ReturnType<typeof setTimeout>>();

	const comingSoon = () => {
		setToastVisible(true);
		if (toastTimer.current) clearTimeout(toastTimer.current);
		toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
	};

	useEffect(() => () => {
		if (toastTimer.current) clearTimeout(toastTimer.current);
	}, []);

	const PointsPill = ({ task }: { task: Task }) => (
		<button
			onClick={comingSoon}
			className={cn(
				"flex items-center gap-[0.25rem] rounded-full px-[1rem] py-[0.4375rem] font-semibold text-[0.875rem] whitespace-nowrap transition",
				task.complete
					? "border border-accent-100/50 text-accent-100 uppercase tracking-[0.06em] text-[0.78125rem]"
					: task.locked
						? "bg-white/[0.08] text-black-60"
						: "bg-accent-100 text-black-100 hover:bg-accent-hover"
			)}
		>
			{task.complete ? "Complete" : (
				<>
					{task.locked && (
						<svg viewBox="0 0 16 16" className="size-[0.8125rem] fill-current">
							<path d="M8 1a3.5 3.5 0 013.5 3.5V6H12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h.5V4.5A3.5 3.5 0 018 1zm0 1.5A2 2 0 006 4.5V6h4V4.5a2 2 0 00-2-2z" />
						</svg>
					)}
					{task.points.toLocaleString("en-US")}
					<span className="flex items-center justify-center size-[1rem] rounded-full bg-black-100/20 text-[0.625rem] font-bold">
						P
					</span>
				</>
			)}
		</button>
	);

	const TaskRow = ({ task }: { task: Task }) => (
		<div className="flex items-center justify-between gap-[1rem] rounded-[1rem] border border-white/[0.06] bg-white/[0.02] px-[1.25rem] py-[1rem]">
			<div className="flex flex-col gap-[0.125rem] min-w-0">
				<span className="text-white font-semibold">{task.title}</span>
				<span className="text-black-60 text-[0.875rem]">{task.description}</span>
			</div>
			<PointsPill task={task} />
		</div>
	);

	return (
		<div className="flex flex-col gap-[2.5rem] w-full max-w-content mx-auto px-[1rem] pb-[5rem]">
			<div className="flex items-end justify-between gap-[1rem] pt-[1rem] max-md:flex-col max-md:items-start">
				<Heading size="lg" className="tracking-[-0.02em]">Quests</Heading>
				<span className="flex items-center gap-[0.5rem] rounded-full border border-accent-100/30 bg-accent-100/[0.07] px-[0.875rem] py-[0.375rem] text-[0.8125rem] text-accent-100">
					<span className="size-[0.375rem] rounded-full bg-accent-100 animate-pulse" />
					Preview · launching soon
				</span>
			</div>

			{/* referral bar */}
			<div className="flex items-center gap-[1rem] rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] p-[1.25rem] max-lg:flex-col max-lg:items-stretch">
				<div className="flex items-center gap-[0.75rem] flex-1 min-w-0">
					<div className="flex items-center rounded-[0.75rem] border border-white/[0.08] bg-black-100 px-[1rem] py-[0.75rem] text-black-60 min-w-0">
						<span className="text-white">sella.to/</span>
						<span className="truncate">your-ref-code</span>
					</div>
					<button
						onClick={comingSoon}
						className="flex items-center justify-center size-[2.75rem] flex-shrink-0 rounded-[0.75rem] bg-accent-100 text-black-100 hover:bg-accent-hover transition"
						aria-label="Copy referral link"
					>
						<svg viewBox="0 0 16 16" className="size-[1.125rem] fill-current">
							<path d="M5 2a2 2 0 012-2h5a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2V2zm-1 3H3a2 2 0 00-2 2v7a2 2 0 002 2h5a2 2 0 002-2v-1H7a3 3 0 01-3-3V5z" />
						</svg>
					</button>
				</div>

				<div className="flex items-center gap-[2rem] text-[0.9375rem] max-md:flex-col max-md:items-start max-md:gap-[0.5rem]">
					<span className="text-black-60">Friends Referred: <span className="text-white font-semibold">5</span></span>
					<span className="text-black-60">Referral Points: <span className="text-white font-semibold">650</span></span>
					<span className="text-black-60">Points Earned: <span className="text-white font-semibold">17,500</span></span>
				</div>
			</div>

			{/* summary cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-[1.25rem]">
				{summaryCards.map((card) => (
					<div key={card.title} className="flex flex-col gap-[1rem] rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] p-[1.5rem]">
						<h3 className="text-white font-semibold text-[1.125rem]">{card.title}</h3>
						<ul className="flex flex-col gap-[0.625rem]">
							{card.items.map((item) => (
								<li key={item} className="flex items-start gap-[0.625rem] text-black-60 text-[0.9375rem] leading-[1.4]">
									<span className="mt-[0.4375rem] size-[0.3125rem] flex-shrink-0 rounded-full bg-accent-100/70" />
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* tabs + points */}
			<div className="flex items-center justify-between gap-[1rem] max-md:flex-col max-md:items-stretch">
				<div className="flex gap-[0.5rem] flex-wrap">
					{tabs.map((t) => (
						<button
							key={t}
							onClick={() => setTab(t)}
							className={cn(
								"rounded-full px-[1.125rem] py-[0.5625rem] text-[0.9375rem] transition",
								tab === t
									? "bg-white/[0.08] text-white font-semibold"
									: "text-black-60 hover:text-white"
							)}
						>
							{t}
						</button>
					))}
				</div>

				<div className="flex items-center gap-[1rem]">
					<span className="flex items-center gap-[0.375rem] text-accent-100 font-semibold">
						8,500
						<span className="flex items-center justify-center size-[1.125rem] rounded-full bg-accent-100 text-black-100 text-[0.6875rem] font-bold">P</span>
					</span>
					<Button variant="solid" onClick={comingSoon}>Spend Points</Button>
				</div>
			</div>

			{/* tab content */}
			{tab === "Social tasks" && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[2.5rem] gap-y-[0.75rem]">
					<div className="flex flex-col gap-[0.75rem]">
						{socialTasks.left.map((task) => <TaskRow key={task.title} task={task} />)}
					</div>
					<div className="flex flex-col gap-[0.75rem]">
						{socialTasks.right.map((task) => <TaskRow key={task.title} task={task} />)}
					</div>
				</div>
			)}

			{tab === "Milestones" && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[2.5rem] gap-y-[0.75rem]">
					{milestones.map((task) => <TaskRow key={task.title} task={task} />)}
				</div>
			)}

			{tab === "Decentralized management" && (
				<div className="flex flex-col gap-[1.5rem]">
					{managementPanels.map((panel) => (
						<div key={panel.heading} className="flex flex-col gap-[1.75rem] rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-[2rem]">
							<div className="flex flex-col gap-[0.5rem]">
								<h3 className="text-white font-semibold text-[1.75rem] font-manrope">{panel.heading}</h3>
								<p className="text-black-60 max-w-[34rem]">{panel.blurb}</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem]">
								{panel.columns.map((column) => (
									<div key={column.title} className="flex flex-col gap-[0.75rem]">
										<h4 className="text-white font-semibold">{column.title}</h4>
										<ul className="flex flex-col gap-[0.5rem]">
											{column.items.map((item) => (
												<li key={item} className="text-black-60 text-[0.9375rem] leading-[1.45] pl-[1rem] border-l border-white/[0.12]">
													{item}
												</li>
											))}
										</ul>
									</div>
								))}
							</div>

							<button
								onClick={comingSoon}
								className="flex items-center gap-[0.375rem] w-fit rounded-full bg-accent-100 text-black-100 px-[1.25rem] py-[0.5625rem] font-semibold hover:bg-accent-hover transition"
							>
								{panel.points.toLocaleString("en-US")}
								<span className="flex items-center justify-center size-[1rem] rounded-full bg-black-100/20 text-[0.625rem] font-bold">P</span>
							</button>
						</div>
					))}
				</div>
			)}

			{/* coming soon toast */}
			<div
				aria-live="polite"
				className={cn(
					"fixed bottom-[2rem] left-1/2 -translate-x-1/2 z-[120] transition-all duration-300",
					toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.75rem] pointer-events-none"
				)}
			>
				<span className="flex items-center gap-[0.625rem] rounded-full border border-accent-100/40 bg-[#161616] px-[1.25rem] py-[0.75rem] text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
					<span className="size-[0.5rem] rounded-full bg-accent-100 animate-pulse" />
					Quests are coming soon. Early activity will count.
				</span>
			</div>
		</div>
	);
}
