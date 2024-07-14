import { Avatar as ArkAvatar, type AvatarRootProps } from '@ark-ui/react/avatar'
import { forwardRef } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

export interface AvatarProps extends AvatarRootProps, AvatarVariantProps {
  name?: string
  src?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
	const { className, name, src, ...rootProps } = props
	const { root, fallback, image } = avatar()

	return (
		<ArkAvatar.Root ref={ref} className={root({ className })} {...rootProps}>
			<ArkAvatar.Fallback className={fallback()}>
				{getInitials(name) || <UserIcon />}
			</ArkAvatar.Fallback>
			<ArkAvatar.Image className={image()} src={src} alt={name} />
		</ArkAvatar.Root>
	)
})

Avatar.displayName = 'Avatar'

type AvatarVariantProps = VariantProps<typeof avatar>

const avatar = tv(
	{
		base: 'avatar',
		slots: { 
			root: 'avatar__root overflow-hidden size-[1em]', 
			image: 'avatar__image', 
			fallback: 'avatar__fallback text-[0.55em]' 
		}
	},
	{ twMerge: false },
)

const UserIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
	>
		<title>User</title>
		<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</svg>
)

const getInitials = (name = '') =>
	name
		.split(' ')
		.map((part) => part[0])
		.splice(0, 2)
		.join('')
		.toUpperCase()
