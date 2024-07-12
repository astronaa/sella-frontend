"use client";

import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { truncateStrFromMiddle } from "~/shared/lib/string-tools";
import { useUserGetQuery } from "~/entities/user";
import { useBalance } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";
import { SlotAuthorizedNavButtons } from "../slots";

type Props = HTMLAttributes<HTMLDivElement> & {
  address: `0x${string}`;
};

export function AuthorizedBar({ className, address, ...props }: Props) {
	const pathname = usePathname();
	const { data: user } = useUserGetQuery();
	const { openAccountModal } = useAccountModal();
	const { data: balance } = useBalance({ address });

	const isQuestsRoute = pathname?.includes("/quests");

	return (
		<div
			{...props}
			className={cn(
				"flex gap-[0.75rem]",
				"max-lg:flex-col max-lg:border-t max-lg:border-t-secondary max-lg:pt-[1.5rem] max-lg:px-[1.25rem]",
				className
			)}
		>
			{openAccountModal && (
				<button
					onClick={openAccountModal}
					className="flex flex-col items-end justify-between text-[0.8125rem] max-lg:flex-row \
						max-lg:text-[1.125rem] hover:bg-white/[.04] px-[0.5rem] rounded-[0.5rem]"
				>
					<span className="truncate max-w-full">
						{user?.username ?? "unnamed"}
					</span>

					{isQuestsRoute && balance ? (
						<span className="text-accent-100 text-nowrap">
							{`${balance.decimals} ${balance.symbol}`}
						</span>
					) : (
						<span className="text-black-40">
							{address && truncateStrFromMiddle(address)}
						</span>
					)}
				</button>
			)}

			<div className="flex gap-[0.75rem] max-lg:[&>*]:w-full max-lg:[&>*]:h-[3.4375rem]">
				<SlotAuthorizedNavButtons.Renderer />
			</div>
		</div>
	);
}
