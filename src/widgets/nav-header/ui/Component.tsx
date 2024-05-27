"use client";

import Link from "next/link";
import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "~/shared/lib/cn";
import { AppLogo } from "~/shared/ui/logo";
import { NavItems } from "./NavItems";
import { UserNavBar } from "./user-nav-bar";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { PhoneNavItems } from "./PhoneNavItems";
import { usePathname } from "next/navigation";

export function Component({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const [showPhoneNavbar, setShowPhoneNavbar] = useState(false);

	const togglePhoneNavbar = () => {
		setShowPhoneNavbar((prev) => !prev);
	};

	const pathname = usePathname();

	useEffect(() => {
		setShowPhoneNavbar(false);
	}, [pathname]);

	return (
		<>
			<div
				{...props}
				className={cn(
					'flex items-center justify-between gap-[1rem] p-[1rem] rounded-[1.25rem] h-[4.38rem]',
					'backdrop-blur-[3rem] bg-black-08/[.80]',
					'border border-secondary', showPhoneNavbar && "border-transparent bg-transparent backdrop-blur-none",
					className
				)}
			>
				<div className='flex items-center gap-[2rem] max-lg:justify-between w-full'>
					<Link href='/'>
						<AppLogo />
					</Link>

					<IconButton
						colorPalette='gray'
						variant="outline" size='sm'
						className="lg:hidden [&_svg]:size-[1.5rem]"
						onClick={togglePhoneNavbar}
					>
						{showPhoneNavbar ? (
							<Icons.Close />
						) : (
							<Icons.Menu />
						)}
					</IconButton>

					<NavItems className='max-lg:hidden' />
				</div>

				<UserNavBar
					className='max-lg:hidden'
				/>
			</div>

			{showPhoneNavbar && (
				<PhoneNavbarContent
					onClose={() => setShowPhoneNavbar(false)}
				/>
			)}
		</>
	);
}

interface PhoneNavbarContentProps {
	onClose: () => void
}

function PhoneNavbarContent({ onClose }: PhoneNavbarContentProps) {
	return (
		<div className={cn(
			"backdrop-blur-[3rem] bg-black-06/50 flex flex-col p-4 justify-between h-screen pt-36 pb-[2.875rem] fixed top-0 z-drawer w-full",
			"lg:hidden",
			""
		)}>
			<PhoneNavItems
				onClose={onClose}
				className="text-[2.5rem] gap-[2.25rem] pl-[1.25rem] font-semibold leading-[1]"
			/>

			<UserNavBar className='flex-col-reverse [&_button]:w-full' />
		</div>
	);
}