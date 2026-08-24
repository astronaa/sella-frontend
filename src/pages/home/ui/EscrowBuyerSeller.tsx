import { Heading } from "~/shared/ui/kit/heading";
import { VideoAnimationPlayer } from "~/shared/ui/video-anim-player";
import { StorefrontOpenControls } from "~/widgets/storefront-open";
import { Eyebrow, Reveal } from "./shared";

interface SideStep {
	title: string;
	description: string;
}

const buyerSteps: SideStep[] = [
	{
		title: "Pay from your wallet",
		description:
			"USDC, USDT or ETH, two clicks, done. As easy as any online checkout, except the payment goes into the escrow contract instead of the seller's pocket, and stays locked until the order is complete.",
	},
	{
		title: "Receive your order",
		description:
			"The seller ships the goods or delivers files and services in the order chat. Every message and file is timestamped there, so there's always evidence of what was delivered.",
	},
	{
		title: "Release the money, or dispute",
		description:
			"Delivery matches the listing? You confirm, and the contract pays the seller that second. Wrong, late, or missing? You open a dispute: the money stays locked and a jury of five decides who gets it.",
	},
];

const sellerSteps: SideStep[] = [
	{
		title: "Open your storefront",
		description:
			"Thirty seconds, no KYC. List services, files, or physical goods, set the price and the escrow release window, and share your link.",
	},
	{
		title: "Start after the money locks",
		description:
			"An order only begins once the buyer's payment is secured in the contract. You see the funds are there before you lift a finger, so you never work unpaid.",
	},
	{
		title: "Deliver, then get paid",
		description:
			"You deliver through the order chat. The moment the buyer confirms, or the release window ends with no dispute, the contract sends the money to your wallet.",
	},
];

function SideColumn({
	label,
	steps,
	guarantee,
}: {
	label: string;
	steps: SideStep[];
	guarantee: string;
}) {
	return (
		<div className="flex flex-col gap-[1.75rem] flex-1 p-[2rem] max-md:p-[1.5rem]">
			<span className="text-accent-100 text-[0.8125rem] font-semibold uppercase tracking-[0.16em]">
				{label}
			</span>

			<div className="flex flex-col gap-[1.5rem]">
				{steps.map((step, index) => (
					<div key={step.title} className="flex gap-[1rem]">
						<span className="flex items-center justify-center size-[2rem] flex-shrink-0 rounded-full bg-accent-100/[0.12] text-accent-100 font-semibold text-[0.875rem]">
							{index + 1}
						</span>
						<div className="flex flex-col gap-[0.25rem]">
							<span className="text-white font-semibold text-[1rem]">
								{step.title}
							</span>
							<span className="text-black-60 text-[0.9375rem] leading-[1.55]">
								{step.description}
							</span>
						</div>
					</div>
				))}
			</div>

			<div className="mt-auto flex gap-[0.625rem] items-start rounded-[0.875rem] bg-accent-100/[0.06] px-[1rem] py-[0.875rem]">
				<svg viewBox="0 0 16 16" className="size-[1rem] flex-shrink-0 mt-[0.125rem] fill-accent-100">
					<path d="M8 1l5.5 2.2v3.6c0 3.5-2.3 6.6-5.5 7.7-3.2-1.1-5.5-4.2-5.5-7.7V3.2L8 1zm-.9 9.1L4.9 7.9 6 6.8l1.1 1.1 2.9-2.9 1.1 1.1-4 4z" />
				</svg>
				<span className="text-black-74 text-[0.875rem] leading-[1.5]">{guarantee}</span>
			</div>
		</div>
	);
}

export function EscrowBuyerSeller() {
	return (
		<div
			id="features"
			className="relative overflow-hidden rounded-[3rem] px-4 py-[6.5rem] max-md:py-[4rem] md:m-[1.25rem] bg-black-100"
		>
			<div className="absolute inset-0 lp-grid-texture [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(50% 40% at 85% 8%, rgba(255,221,0,0.09) 0%, transparent 100%)",
				}}
			/>

			<div className="relative w-full max-w-content m-auto flex flex-col gap-[4.5rem]">
				{/* header row: copy left, artist render right */}
				<div className="flex items-center justify-between gap-[2rem] max-lg:justify-center">
					<Reveal className="flex flex-col gap-[1.5rem] max-w-[34rem]">
						<Eyebrow>How escrow works</Eyebrow>

						<Heading size="lg" className="tracking-[-0.02em]">
							One contract.
							<br />
							<span className="bg-gradient-to-r from-accent-100 to-accent-hover bg-clip-text text-transparent">
								Both sides covered.
							</span>
						</Heading>

						<p className="text-black-60 text-[1.0625rem] leading-[1.6]">
							Every sale runs through an escrow smart contract, but nothing
							about it feels technical: you shop like on any site, and the
							contract does its work under the hood. Your money can&apos;t be
							stolen, and your work can&apos;t go unpaid.
						</p>

						<div className="flex flex-wrap gap-[0.5rem]">
							{["Non-custodial", "Every trade covered", "Neutral dispute resolution"].map((chip) => (
								<span
									key={chip}
									className="rounded-full bg-accent-100/[0.08] px-[0.875rem] py-[0.4375rem] text-[0.8125rem] text-accent-100"
								>
									{chip}
								</span>
							))}
						</div>
					</Reveal>

					<VideoAnimationPlayer
						src="/videos/ecrow.webm"
						srcHevc="/videos/ecrow.mov"
						className="flex-shrink-0 w-[24rem] xl:w-[30rem] hidden lg:block"
					/>
				</div>

				{/* split panel: buying on the left, selling on the right,
				    the escrow medallion sitting on the divider between them */}
				<Reveal className="relative">
					<div className="relative flex max-md:flex-col rounded-[1.5rem] bg-white/[0.03]">
						<SideColumn
							label="You're buying"
							steps={buyerSteps}
							guarantee="The seller never touches your money until you confirm. Getting scammed out of a payment is structurally impossible."
						/>

						{/* divider with the escrow lock on it */}
						<div className="relative flex items-center justify-center md:w-px md:self-stretch max-md:h-px max-md:w-full max-md:my-[0.5rem]">
							<span className="absolute inset-0 md:w-px md:mx-auto max-md:h-px max-md:my-auto bg-gradient-to-b max-md:bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />
							<span className="relative z-10 flex items-center justify-center size-[3.25rem] rounded-full bg-accent-100 text-black-100 shadow-[0_0_30px_-6px_rgba(255,221,0,0.55)]">
								<svg viewBox="0 0 16 16" className="size-[1.25rem] fill-current">
									<path d="M8 1a3.5 3.5 0 013.5 3.5V6H12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h.5V4.5A3.5 3.5 0 018 1zm0 1.5A2 2 0 006 4.5V6h4V4.5a2 2 0 00-2-2z" />
								</svg>
							</span>
						</div>

						<SideColumn
							label="You're selling"
							steps={sellerSteps}
							guarantee="Once escrow releases, the money is yours. No chargebacks, no frozen balances, no platform holding your payout."
						/>
					</div>

					{/* shared dispute branch */}
					<div className="mt-[1.25rem] flex items-center gap-[1rem] rounded-[1.25rem] bg-white/[0.03] px-[1.5rem] py-[1.125rem] max-md:flex-col max-md:items-start">
						<span className="flex items-center gap-[0.5rem] text-white font-semibold whitespace-nowrap">
							<svg viewBox="0 0 16 16" className="size-[1.125rem] text-accent-100 fill-current">
								<path d="M8 1.5l6.5 11.3H1.5L8 1.5zm-.75 4.5v3.5h1.5V6h-1.5zm0 4.75v1.5h1.5v-1.5h-1.5z" />
							</svg>
							Something goes wrong?
						</span>
						<p className="text-black-60 text-[0.9375rem] leading-[1.55]">
							Either side can open a dispute. Funds stay locked while five
							randomly selected community jurors review the order and vote.
							Three of five decides it, and the contract executes the outcome
							automatically.
						</p>
					</div>
				</Reveal>

				<div className="max-w-[34rem]">
					<StorefrontOpenControls />
				</div>
			</div>
		</div>
	);
}
