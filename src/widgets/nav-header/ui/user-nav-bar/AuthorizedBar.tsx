'use client';

import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { truncateStrFromMiddle } from "~/shared/lib/truncate";
import { Icons } from "~/shared/ui/icons";
import { IconButton } from "~/shared/ui/kit/button";
import { NavIconButton } from "./NavIconButton";
import { useUserGetQuery } from "~/entities/user";
import { useAccount } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useUserProfileSettingsDialog } from "~/shared/model/user-profile";

export function AuthorizedBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const { data: user } = useUserGetQuery();
	const { address } = useAccount();
	const { openAccountModal } = useAccountModal();
	const { open, setOpen } = useUserProfileSettingsDialog();

	return (
		<div {...props}
			className={cn(
				'flex gap-[0.75rem]',
				'max-lg:flex-col max-lg:border-t max-lg:border-t-secondary max-lg:pt-[1.5rem] max-lg:px-[1.25rem]',
				className
			)}
		>
			{openAccountModal && (
				<button
					onClick={openAccountModal}
					className='flex flex-col items-end justify-between text-[0.8125rem] max-lg:flex-row \
						max-lg:text-[1.125rem] hover:bg-white/[.04] px-[0.5rem] rounded-[0.5rem]'
				>
					<span className='truncate max-w-full'>
						{user?.username ?? 'unnamed'}
					</span>
					<span className='text-black-40'>
						{address && truncateStrFromMiddle(address)}
					</span>
				</button>
			)}

			<div className='flex gap-[0.75rem] max-lg:[&>*]:w-full max-lg:[&>*]:h-[3.4375rem]'>
				<NavIconButton
					href='/dashboard/sales'
					activeOnHrefs={['/dashboard/orders']}
				>
					<Icons.Package />
				</NavIconButton>

				<NavIconButton href='/dashboard' end>
					<Icons.Building />
				</NavIconButton>

				<IconButton
					className='text-accent-100'
					colorPalette='gray' size='sm'
					active={open} onClick={() => setOpen(true)}
				>
					<Icons.Settings />
				</IconButton>
			</div>
		</div>
	);
}
