"use client";
import { PropsWithChildren, useEffect } from "react";
import { Collapsible, Popover } from "~/shared/ui/kit";
import { SearchPanel, useSearchPanelStrictContext } from "~/features/search-panel";
import { MobileMenu } from "./mobile-menu";
import { CategoriesRoulette } from "./categories-roulette";
import { useCategoriesRouletteStrictContext } from "./categories-roulette/contex";

export function InteractiveProvider({ children }: PropsWithChildren) {
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
		open: searchOpen, setOpen: setSearchOpen
	} = useSearchPanelStrictContext();

	const {
		open: categoriesOpen, setOpen: setCategoriesOpen
	} = useCategoriesRouletteStrictContext();

	useEffect(() => {
		if (searchOpen)
			setCategoriesOpen(false);

	}, [searchOpen, setCategoriesOpen]);

	useEffect(() => {
		if (categoriesOpen)
			setSearchOpen(false);
	}, [categoriesOpen, setSearchOpen]);

	const open = categoriesOpen || searchOpen;

	const handleOpenChange = (open: boolean) => {
		setSearchOpen(open);
		setCategoriesOpen(open);
	};

	return (
		<Popover.Root
			open={open}
			onOpenChange={change => handleOpenChange(change.open)}
			positioning={{ strategy: 'fixed', gutter: 0 }}
			autoFocus={false} unmountOnExit lazyMount
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
							<CategoriesRoulette.Content
								className='px-[1rem]' />
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
