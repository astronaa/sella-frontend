"use client";

import { HTMLAttributes, Suspense, useEffect } from "react";
import { cn } from "~/shared/lib/cn";
import { UserNavBar } from "./user-nav-bar";
import { Popover } from "~/shared/ui/kit";
import { useMobileMenuStrictContext } from "./mobile-menu";
import { usePopoverContext } from "@ark-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { HeaderDesktopView, HeaderTabletView, HeaderMobileView } from "./HeaderViews";
import { InteractiveProvider } from "./Interactive";
import { SlotsProvider } from "~/shared/ui/create-slot";

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
	staticMode?: boolean
}

export function Root({ children, ...props }: RootProps) {
	return (
		<SlotsProvider value={children}>
			<InteractiveProvider>
				<Header {...props} />

				<Suspense>
					<AutoCloseOnUrlChange />
				</Suspense>
			</InteractiveProvider>
		</SlotsProvider>
	);
}

function Header({ className, staticMode = false, ...props }: RootProps) {
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
					// height is NOT fixed: the categories strip lives inside
					// the header, so the header grows to contain it instead of
					// letting it overflow onto page content
					'flex flex-col rounded-[1.25rem] relative transition-all gap-[0.5rem]',
					'backdrop-blur-[3rem] bg-black-08/[.80]',
					'border border-secondary', mobileMenuOpen && "border-transparent bg-transparent backdrop-blur-none",
					popupOpen && "border-b-transparent rounded-b-none",
					'max-md:gap-0',
					className,
					!popupOpen && !mobileMenuOpen && staticMode && 'border-transparent backdrop-blur-none bg-transparent w-full',
				)}
			>
				<div className='flex items-center gap-[1rem] p-[1rem] w-full h-[4.38rem]'>
					<HeaderDesktopView />
					<HeaderTabletView />
					<HeaderMobileView />

					<UserNavBar
						className='max-lg:hidden'
					/>
				</div>
			</div>
		</Popover.Anchor>
	);
}

function AutoCloseOnUrlChange() {
	const { setOpen: setPopupOpen } = usePopoverContext();
	const { setOpen: setMobileMenuOpen } = useMobileMenuStrictContext();

	const pathname = usePathname();
	const searchParams = useSearchParams();
	const setOpenCb = useCallbackRef(setPopupOpen);

	useEffect(() => {
		setOpenCb(false);
		setMobileMenuOpen(false);
	}, [pathname, searchParams, setOpenCb, setMobileMenuOpen])

	return null;
}