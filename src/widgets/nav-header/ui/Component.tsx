"use client";

import Link from "next/link";
import { HTMLAttributes, PropsWithChildren, useEffect } from "react";
import { cn } from "~/shared/lib/cn";
import { AppLogo } from "~/shared/ui/logo";
import { NavItems } from "./NavItems";
import { UserNavBar } from "./user-nav-bar";
import { Collapsible, Popover } from "~/shared/ui/kit";
import { SearchPanel, useSearchPanelStrictContext } from "~/features/search-panel";
import { MobileMenu, useMobileMenuStrictContext } from "./mobile-menu";
import { usePopoverContext } from "@ark-ui/react";
import { usePathname } from "next/navigation";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { CategoriesRoulette } from "./categories-roulette";
import { useCategoriesRouletteStrictContext } from "./categories-roulette/contex";

export function Component(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<InteractiveProvider>
			<Header {...props} />
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
					className
				)}
			>
				<div className='flex items-center gap-[2rem] max-lg:justify-between w-full'>
					<Link href='/'>
						<AppLogo />
					</Link>

					<div className='flex'>
						<CategoriesRoulette.Button
							className='border border-secondary rounded-r-none'
						/>
						<SearchPanel.SearchBarRoot className='w-full max-w-[18.75rem]'>
							<SearchPanel.SearchBarInput
								className='rounded-l-none border-l-0'
								placeholder='Search products, stores'
							/>
						</SearchPanel.SearchBarRoot>
					</div>

					<NavItems className='max-lg:hidden' />
				</div>

				<UserNavBar
					className='max-lg:hidden'
				/>

				<MobileMenu.Button />
			</div>
		</Popover.Anchor>
	);
}

function InteractiveProvider({ children }: PropsWithChildren) {
	return (
		<MobileMenu.Root>
			<SearchPanel.Root>
				<CategoriesRoulette.Root>
					<InteractivePopover>
						{children}
					</InteractivePopover>
				</CategoriesRoulette.Root>
			</SearchPanel.Root>
		</MobileMenu.Root>
	);
}

function InteractivePopover({ children }: PropsWithChildren) {
	const {
		open: searchOpen,
		setOpen: setSearchOpen
	} = useSearchPanelStrictContext();

	const {
		open: categoriesOpen,
		setOpen: setCategoriesOpen
	} = useCategoriesRouletteStrictContext();

	useEffect(() => {
		if(searchOpen)
			setCategoriesOpen(false);

	}, [searchOpen, setCategoriesOpen])

	useEffect(() => {
		if(categoriesOpen)
			setSearchOpen(false);
	}, [categoriesOpen, setSearchOpen])

	const open = categoriesOpen || searchOpen;

	const handleOpenChange = (open: boolean) => {
		setSearchOpen(open);
		setCategoriesOpen(open);
	}

	return (
		<Popover.Root
			open={open}
			onOpenChange={change => handleOpenChange(change.open)}
			positioning={{ strategy: 'fixed', gutter: 0 }}
			autoFocus={false}
			onInteractOutside={e => {
				const target = e.detail.originalEvent.target as HTMLElement;

				if (target && target.closest('[data-scope="popover"][data-part="anchor"]')) {
					e.stopPropagation();
					e.preventDefault();
				}
			}}
		>
			{children}

			<Popover.Positioner
				className='w-[var(--reference-width)]'
				style={{ minWidth: 'unset' }}
			>
				<Popover.Content
					className='max-w-full w-full backdrop-blur-[3rem] bg-black-08/[.80] 
						border border-secondary rounded-[1.25rem] rounded-t-none
						flex flex-col gap-[2rem]
					'
				>
					<Collapsible.Root
						open={categoriesOpen}
						className='mx-[-1rem] w-[calc(100%+1rem*2)]'
					>
						<Collapsible.Content>
							<CategoriesRoulette.Content className='px-[1rem]' />
						</Collapsible.Content>
					</Collapsible.Root>

					<Collapsible.Root open={searchOpen}>
						<Collapsible.Content>
							<SearchPanel.Content />
						</Collapsible.Content>
					</Collapsible.Root>
				</Popover.Content>
			</Popover.Positioner>
		</Popover.Root>
	);
}