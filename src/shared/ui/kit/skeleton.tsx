import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { forwardRef } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

export interface SkeletonProps extends HTMLArkProps<'div'>, SkeletonVariantProps {
  /**
   *
   * @default false
   */
  loading?: boolean
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
	const { loading, className, ...rest } = props

	if (!loading) {
		return <ark.div className="animate-fade-in" ref={ref} {...rest} />
	}
	return <ark.div ref={ref} className={skeleton({ className })} {...rest} />
})

Skeleton.displayName = 'Skeleton'

type SkeletonVariantProps = VariantProps<typeof skeleton>

const skeleton = tv({ 
	base: 'skeleton bg-white/[.1]'
}, { twMerge: false })
