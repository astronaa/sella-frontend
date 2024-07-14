"use client";

import { HTMLAttributes, Suspense, useEffect } from "react";
import { cn } from "~/shared/lib/cn";
import { UserNavBar } from "./user-nav-bar";
import { Collapsible, Popover } from "~/shared/ui/kit";
import { useMobileMenuStrictContext } from "./mobile-menu";
import { usePopoverContext } from "@ark-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { HeaderDesktopView, HeaderTabletView, HeaderMobileView } from "./HeaderViews";
import { InteractiveProvider } from "./Interactive";
import { SlotsProvider } from "~/shared/ui/create-slot";
import { Scrollable } from "~/shared/ui/scrollable";
import { categoryQueries } from "~/entities/category";
import { NavLink } from "~/shared/ui/nav-link";

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
					'flex flex-col rounded-[1.25rem] h-[4.38rem] relative transition-all gap-[0.5rem]',
					'backdrop-blur-[3rem] bg-black-08/[.80]',
					'border border-secondary', mobileMenuOpen && "border-transparent bg-transparent backdrop-blur-none",
					popupOpen && "border-b-transparent rounded-b-none",
					'max-md:gap-0',
					className,
					!popupOpen && !mobileMenuOpen && staticMode && 'border-transparent backdrop-blur-none bg-transparent w-full',
				)}
			>
				<div className='flex items-center gap-[1rem] p-[1rem] w-full h-full'>
					<HeaderDesktopView />
					<HeaderTabletView />
					<HeaderMobileView />

					<UserNavBar
						className='max-lg:hidden'
					/>
				</div>

				<CategoriesRoulette
					open={staticMode && !mobileMenuOpen}
				/>
			</div>
		</Popover.Anchor>
	);
}

function CategoriesRoulette(props: { open: boolean }) {
	const { data: categories, isLoading } = categoryQueries.useGetAll();
	const open = props.open && !isLoading;

	return (
		<Collapsible.Root open={open}>
			<Collapsible.Content
				className={cn(
					'w-full border-b border-secondary pb-[1.125rem] transition-opacity opacity-0',
					open && 'opacity-100'
				)}
			>
				<Scrollable.Root className='w-full'>
					<Scrollable.Container className='px-[1rem] gap-[1.5rem] text-black-60'>
						{categories?.map(c => (
							<NavLink
								key={c.id}
								href={`/marketplace/?tagNames=${encodeURIComponent(c.name)}`}
								className='whitespace-nowrap'
							>
								{c.name}
							</NavLink>
						))}
					</Scrollable.Container>
				</Scrollable.Root>
			</Collapsible.Content>
		</Collapsible.Root>
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