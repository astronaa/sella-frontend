"use client";

import { HTMLAttributes, useEffect } from "react";
import { cn } from "~/shared/lib/cn";
import { UserNavBar } from "./user-nav-bar";
import { Popover } from "~/shared/ui/kit";
import { useMobileMenuStrictContext } from "./mobile-menu";
import { usePopoverContext } from "@ark-ui/react";
import { usePathname } from "next/navigation";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { HeaderDesktopView, HeaderTabletView, HeaderMobileView } from "./HeaderViews";
import { InteractiveProvider } from "./Interactive";
import { SlotsProvider } from "~/shared/ui/create-slot";

export function Root({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<InteractiveProvider>
			<SlotsProvider value={children}>
				<Header {...props} />
			</SlotsProvider>
		</InteractiveProvider>
	);
}

function Header({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const { open: mobileMenuOpen } = useMobileMenuStrictContext();
	const { open: popupOpen, setOpen: setPopupOpen } = usePopoverContext();

	const pathname = usePathname();
	const setOpenCb = useCallbackRef(setPopupOpen);

	useEffect(() => {
		setOpenCb(false);
	}, [pathname, setOpenCb])

	return (
		<Popover.Anchor asChild>
			<div
				{...props}
				className={cn(
					'flex items-center gap-[1rem] p-[1rem] rounded-[1.25rem] h-[4.38rem] relative transition-all',
					'backdrop-blur-[3rem] bg-black-08/[.80]',
					'border border-secondary', mobileMenuOpen && "border-transparent bg-transparent backdrop-blur-none",
					popupOpen && "border-b-transparent rounded-b-none",
					'max-md:gap-0',
					className
				)}
			>
				<HeaderDesktopView />
				<HeaderTabletView />
				<HeaderMobileView />

				<UserNavBar
					className='max-lg:hidden'
				/>
			</div>
		</Popover.Anchor>
	);
}