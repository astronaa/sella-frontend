import useEmblaCarousel from 'embla-carousel-react'
import { Children } from 'react';
import { cn } from '~/shared/lib/cn';
import { ark, HTMLArkProps } from '@ark-ui/react'

export type RootProps = HTMLArkProps<'div'> & {
	scrollOptions?: Parameters<typeof useEmblaCarousel>[0]
}

export function Root({ scrollOptions = { dragFree: true }, className, children, ...props }: RootProps) {
	const [ref] = useEmblaCarousel(scrollOptions);
	const element = Children.only(children)

	return (
		<ark.div
			ref={ref} {...props}
			className={cn(className, 'overflow-hidden')}
		>
			{element}
		</ark.div>
	);
}

export function Container({ className, ...props }: HTMLArkProps<'div'>) {
	return (
		<ark.div
			{...props}
			className={cn('flex cursor-grab w-full', className)}
		/>
	);
}