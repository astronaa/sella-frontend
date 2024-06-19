"use client";

import Link from "next/link";
import { useState } from "react";
import { AppLogo } from "~/shared/ui/logo";
import { NavItems } from "./NavItems";
import { SearchPanel } from "~/features/search-panel";
import { MobileMenu, useMobileMenuStrictContext } from "./mobile-menu";
import { usePopoverContext } from "@ark-ui/react";
import { CategoriesRoulette } from "./categories-roulette";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { InputGroup } from "~/shared/ui/kit/input";

export function HeaderDesktopView() {
	return (
		<div className='flex items-center gap-[2rem] max-lg:justify-between w-full max-xl:hidden'>
			<Link href='/'>
				<AppLogo />
			</Link>

			<div className='flex'>
				<CategoriesRoulette.Button
					className='border border-secondary rounded-r-none flex-shrink-0'
				>
					Categories
				</CategoriesRoulette.Button>
				<SearchPanel.SearchBarRoot className='w-full max-w-[18.75rem]'>
					<SearchPanel.SearchBarInput
						className='rounded-l-none border-l-0'
						placeholder='Search products, stores' />
				</SearchPanel.SearchBarRoot>
			</div>

			<NavItems />
		</div>
	);
}

export function HeaderTabletView() {
	const { open: popupOpen } = usePopoverContext();
	const [searchShouldMaximize, setSearchShouldMaximize] = useState(false);

	const searchBarMaximized = popupOpen || searchShouldMaximize;

	return (
		<div className='flex items-center gap-[2rem] max-lg:justify-between w-full max-lg:hidden xl:hidden'>
			<Link href='/'>
				<AppLogo />
			</Link>

			<div className='flex gap-[0.75rem]'>
				<CategoriesRoulette.Button
					className='border border-secondary flex-shrink-0 px-0 max-lg:hidden' />

				{searchBarMaximized ? (
					<SearchPanel.SearchBarRoot className='w-full'>
						<SearchPanel.SearchBarInput
							autoFocus
							placeholder='Search products, stores'
							onBlur={() => setSearchShouldMaximize(false)} />
					</SearchPanel.SearchBarRoot>
				) : (
					<IconButton
						colorPalette='gray' size='sm'
						onClick={() => setSearchShouldMaximize(true)}
					>
						<Icons.Search className='size-[1.25rem] text-black-60' />
					</IconButton>
				)}
			</div>

			{!searchBarMaximized && <NavItems />}
		</div>
	);
}

export function HeaderMobileView() {
	const { open: popupOpen } = usePopoverContext();
	const { open: mobileMenuOpen } = useMobileMenuStrictContext();
	const [searchShouldMaximize, setSearchShouldMaximize] = useState(false);

	const searchBarMaximized = popupOpen || searchShouldMaximize;

	return (
		<>
			<div className='flex items-center gap-[2rem] max-lg:justify-between w-full lg:hidden'>
				{!searchBarMaximized && (
					<Link href='/'>
						<AppLogo />
					</Link>
				)}

				{searchBarMaximized ? (
					<InputGroup className='flex items-center w-full'>
						<span>
							<Icons.Search className='size-[1.5rem]' />
						</span>

						<SearchPanel.Input
							variant='unstyled' autoFocus
							className='w-full'
							placeholder='Search products, stores'
							onBlur={() => setSearchShouldMaximize(false)} />

						<SearchPanel.ContextConsumer>
							{api => (
								<IconButton
									colorPalette='gray' size='sm'
									variant='outline'
									onClick={() => api.setSearchText('')}
								>
									<Icons.Close className='size-[1.25rem]' />
								</IconButton>
							)}
						</SearchPanel.ContextConsumer>
					</InputGroup>
				) : (
					!mobileMenuOpen && (
						<IconButton
							colorPalette='gray' size='sm'
							variant='outline' className='border-none'
							onClick={() => setSearchShouldMaximize(true)}
						>
							<Icons.Search className='size-[1.25rem]' />
						</IconButton>
					)
				)}
			</div>

			{!searchBarMaximized && (
				<MobileMenu.Button
					className='flex-shrink-0' />
			)}
		</>
	);
}
