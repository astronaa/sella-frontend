import { cn } from "~/shared/lib/cn";

/**
 * Scripted buyer/seller order conversation used by the demo order
 * preview. Shows how escrow status messages interleave with chat.
 */

interface ChatProps {
	price?: number;
	productName?: string;
	sellerName?: string;
	className?: string;
}

export function DemoOrderChat({
	price = 120,
	productName = "your order",
	sellerName = "seller",
	className,
}: ChatProps) {
	const messages: Array<
		| { kind: "system"; text: string; tone?: "gold" | "green" }
		| { kind: "buyer" | "seller"; text: string; time: string }
	> = [
		{ kind: "system", text: `Order created · ${price} USDC locked in escrow`, tone: "gold" },
		{ kind: "buyer", text: "gm, just funded the escrow. When can you deliver?", time: "14:02" },
		{
			kind: "seller",
			text: `gm! ${productName} is in scope exactly as listed. Delivery within 24h, I'll post progress here.`,
			time: "14:05",
		},
		{ kind: "seller", text: "Delivered ✅ Files and the handover doc are attached above. Check everything and confirm when you're happy.", time: "19:41" },
		{ kind: "buyer", text: "Checked it all, works great. Releasing now 🤝", time: "20:12" },
		{ kind: "system", text: "Buyer confirmed · funds released to the seller", tone: "green" },
	];

	return (
		<div
			className={cn(
				"flex flex-col gap-[0.875rem] rounded-[1.25rem] border border-white/[0.07] bg-[#131313] p-[1.25rem]",
				className
			)}
		>
			<div className="flex items-center justify-between pb-[0.875rem] border-b border-white/[0.06]">
				<span className="text-white font-semibold text-[0.9375rem]">Order chat</span>
				<span className="text-black-40 text-[0.8125rem]">{sellerName}</span>
			</div>

			{messages.map((message, index) =>
				message.kind === "system" ? (
					<div key={index} className="flex justify-center">
						<span
							className={cn(
								"rounded-full border px-[0.875rem] py-[0.375rem] text-[0.78125rem] text-center",
								message.tone === "green"
									? "border-green-100/40 bg-green-100/[0.08] text-green-100"
									: "border-accent-100/30 bg-accent-100/[0.07] text-accent-100"
							)}
						>
							{message.text}
						</span>
					</div>
				) : (
					<div
						key={index}
						className={cn("flex", message.kind === "buyer" ? "justify-end" : "justify-start")}
					>
						<div
							className={cn(
								"max-w-[80%] rounded-[1rem] px-[1rem] py-[0.625rem] text-[0.875rem] leading-[1.5]",
								message.kind === "buyer"
									? "bg-accent-100/[0.12] border border-accent-100/20 text-white rounded-br-[0.25rem]"
									: "bg-white/[0.05] border border-white/[0.07] text-black-74 rounded-bl-[0.25rem]"
							)}
						>
							{message.text}
							<span className="block text-right text-[0.6875rem] text-black-40 mt-[0.25rem]">
								{message.time}
							</span>
						</div>
					</div>
				)
			)}

			<p className="text-black-40 text-[0.78125rem] text-center pt-[0.5rem] border-t border-white/[0.06]">
				The full chat history is the evidence if a dispute is ever opened.
			</p>
		</div>
	);
}
