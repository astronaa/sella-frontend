import { Heading } from "~/shared/ui/kit/heading";
import { Eyebrow, Reveal } from "./shared";

/**
 * FAQ content sourced from the whitepaper (Solution, Technology,
 * Business Model, Token Utility). Keep answers in sync with the docs:
 * https://sellastore.gitbook.io/whitepaper
 */

const faqs = [
	{
		question: "How does the escrow actually work?",
		answer:
			"When a buyer pays, the money goes into an escrow smart contract, not to the seller. It stays locked there until the buyer confirms the order arrived as agreed. Then the contract releases the funds to the seller on-chain. Neither side, and not even Sella, can move the money while the order is in progress.",
	},
	{
		question: "Who resolves disputes?",
		answer:
			"The community does. If either side opens a dispute, five randomly selected community members review the case with AI-assisted insights and vote. Majority wins, three votes out of five, and the escrow contract automatically releases or refunds the funds based on that outcome.",
	},
	{
		question: "What are the fees?",
		answer:
			"No listing fees and no subscription. Sella charges a 2% transaction fee on completed sales paid in stablecoins or other cryptocurrencies, and 1% for payments made in $SELLA. You only pay when you actually sell.",
	},
	{
		question: "Which currencies can I use?",
		answer:
			"Payments run in USDT, USDC, and ETH, on Ethereum with Layer 2 support for lower gas fees. Crypto-native payments mean cross-border sales work without currency conversion or intermediaries.",
	},
	{
		question: "Who sets the escrow timeline?",
		answer:
			"The seller does, per listing. Every offer states its escrow window up front, so both sides know the timeline before any money is locked. The buyer can always release earlier by confirming delivery, and an open dispute freezes the clock until the jury decides.",
	},
	{
		question: "Do sellers have to babysit the chat?",
		answer:
			"No. Each storefront gets an AI assistant trained on your FAQ and listings. It answers routine buyer questions in the order chat around the clock and hands the conversation to you when a question actually needs the seller.",
	},
	{
		question: "Do I need to pass KYC?",
		answer:
			"No. Connect your wallet, reserve your storefront handle, and you can be selling within about 30 seconds. No identity verification, no waiting for approval.",
	},
	{
		question: "What can I sell?",
		answer:
			"Anything, digital or physical, goods or services, as long as it is legal and not harmful. Freedom of commerce is the point; prohibited and fraudulent items are moderated with community involvement and AI detection.",
	},
	{
		question: "Why should buyers trust the reviews?",
		answer:
			"Reviews live on immutable blockchain records, so history cannot be quietly edited away. Negative reviews deliberately carry more weight to warn buyers early, and sellers with multiple storefronts pool one reputation across all of them.",
	},
];

export function Faq() {
	return (
		<div className="py-[7rem] max-md:py-[4rem] px-4">
			<div className="flex flex-col lg:flex-row gap-[3.5rem] w-full max-w-content m-auto">
				<Reveal className="flex flex-col gap-[1.25rem] lg:w-[24rem] flex-shrink-0">
					<Eyebrow>Questions</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						Fair questions,
						<br />
						straight answers.
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.6]">
						The details live in the{" "}
						<a
							href="https://sellastore.gitbook.io/whitepaper"
							target="_blank"
							rel="noopener noreferrer"
							className="text-accent-100 hover:text-accent-hover transition-colors underline underline-offset-4"
						>
							whitepaper
						</a>
						. The short versions live here.
					</p>
				</Reveal>

				<div className="flex flex-col gap-[0.75rem] w-full">
					{faqs.map((faq, index) => (
						<Reveal key={faq.question} delay={index * 50}>
							<details className="group rounded-[1.25rem] bg-white/[0.03] open:bg-white/[0.05] transition-colors">
								<summary className="flex items-center justify-between gap-[1rem] cursor-pointer select-none list-none px-[1.5rem] py-[1.25rem] text-white font-semibold [&::-webkit-details-marker]:hidden">
									{faq.question}
									<span className="flex items-center justify-center size-[1.75rem] rounded-full border border-white/[0.1] text-black-60 transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
										<svg viewBox="0 0 16 16" className="size-[0.75rem] fill-current">
											<path d="M7.25 7.25V2h1.5v5.25H14v1.5H8.75V14h-1.5V8.75H2v-1.5h5.25z" />
										</svg>
									</span>
								</summary>
								<p className="px-[1.5rem] pb-[1.5rem] text-black-60 leading-[1.65] max-w-[44rem]">
									{faq.answer}
								</p>
							</details>
						</Reveal>
					))}
				</div>
			</div>
		</div>
	);
}
