'use client';

import { Pagination as ArkPagination, type PaginationRootProps } from '@ark-ui/react/pagination'
import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { IconButton, Button } from '~/shared/ui/kit/button'

export interface PaginationProps extends PaginationRootProps, PaginationVariantProps { }

export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
	const { className, ...rootProps } = props
	const { root, ellipsis, item, prevTrigger, nextTrigger } = styles()

	return (
		<ArkPagination.Root ref={ref} className={root({ className })} {...rootProps}>
			<ArkPagination.PrevTrigger
				asChild
				className={prevTrigger({ className: 'max-md:hidden' })}
			>
				<IconButton size='sm' colorPalette='gray' aria-label="Next Page">
					<ChevronLeftIcon />
				</IconButton>
			</ArkPagination.PrevTrigger>
			<ArkPagination.Context>
				{({ pages }) => (
					pages.map((page, index) =>
						page.type === 'page' ? (
							<ArkPagination.Item className={item()} key={index} {...page} asChild>
								<Button className='px-[0.1rem]' size='sm' colorPalette='gray'>
									{String(page.value).padStart(2, '0')}
								</Button>
							</ArkPagination.Item>
						) : (
							<ArkPagination.Ellipsis className={ellipsis()} key={index} index={index}>
								&#8230;
							</ArkPagination.Ellipsis>
						),
					)
				)}
			</ArkPagination.Context>
			<ArkPagination.NextTrigger
				asChild
				className={nextTrigger({ className: 'max-md:hidden' })}
			>
				<IconButton size='sm' colorPalette='gray' aria-label="Next Page">
					<ChevronRightIcon />
				</IconButton>
			</ArkPagination.NextTrigger>
		</ArkPagination.Root>
	)
})

Pagination.displayName = 'Pagination'

type PaginationVariantProps = VariantProps<typeof styles>

const styles = tv(
	{
		base: 'pagination',
		slots: {
			root: 'pagination__root gap-[1rem] max-md:gap-[0.75rem]',
			item: 'pagination__item',
			ellipsis: 'pagination__ellipsis text-white',
			prevTrigger: 'pagination__prevTrigger',
			nextTrigger: 'pagination__nextTrigger',
		},
		variants: {},
	},
	{ twMerge: false },
)

const ChevronLeftIcon = () => (
	<svg className='size-[1.5rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<title>Chevron Left</title>
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="m15 18l-6-6l6-6"
		/>
	</svg>
)

const ChevronRightIcon = () => (
	<svg className='size-[1.5rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<title>Chevron Right</title>
		<path
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="m9 18l6-6l-6-6"
		/>
	</svg>
)
