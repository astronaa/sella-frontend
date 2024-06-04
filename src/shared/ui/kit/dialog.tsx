'use client'

import { HTMLArkProps, ark } from '@ark-ui/react'
import { Dialog } from '@ark-ui/react/dialog'
import { forwardRef, type ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'
import { IconButton } from './button'
import { Icons } from '../icons'

const styles = tv(
	{
		base: 'dialog',
		slots: {
			trigger: 'dialog__trigger',
			backdrop: 'dialog__backdrop bg-black/10 backdrop-blur-[0.5rem]',
			positioner: 'dialog__positioner max-sm:items-end',
			content: `dialog__content bg-[#141414] border border-white/[.02] flex flex-col items-center
				overflow-y-auto max-md:max-w-[100%] max-md:max-h-[90vh]`,
			contentHeading: 'flex flex-col items-center',
			contentFooter: 'flex gap-[1rem] w-full [&>*]:w-full max-md:flex-col-reverse',
			title: 'text-[2rem] font-semibold font-manrope text-center',
			description: 'text-black-40 text-center leading-[1.5]',
			closeTrigger: 'dialog__closeTrigger',
			closeButton: 'absolute text-black-40',
		},
		variants: {
			size: {
				default: {
					contentHeading: 'gap-[1.5rem]',
					content: 'p-[3.125rem] rounded-[1.25rem] w-[28.125rem] gap-[3.125rem]',
					closeButton: 'top-[1rem] right-[1rem] rounded-full'
				}
			}
		},
		defaultVariants: {
			size: 'default'
		}
	},
	{ twMerge: false },
)
const { withProvider, withContext } = createStyleContext(styles)

export const Root = withProvider(Dialog.Root)
export const Backdrop = withContext(Dialog.Backdrop, 'backdrop')
export const CloseTrigger = withContext(Dialog.CloseTrigger, 'closeTrigger')
export const Content = withContext(Dialog.Content, 'content')
export const Description = withContext(Dialog.Description, 'description')
export const Positioner = withContext(Dialog.Positioner, 'positioner')
export const Title = withContext(Dialog.Title, 'title')
export const Trigger = withContext(Dialog.Trigger, 'trigger')
export const ContentHeading = withContext(ark.div, 'contentHeading')
export const ContentFooter = withContext(ark.div, 'contentFooter')

const BaseCloseButton = forwardRef<HTMLButtonElement, HTMLArkProps<'button'>>((props, ref) => (
	<CloseTrigger asChild>
		<IconButton ref={ref} variant='ghost' {...props}>
			<Icons.Close />
		</IconButton>
	</CloseTrigger>
));

BaseCloseButton.displayName = 'Dialog.CloseButton';

export const CloseButton = withContext(BaseCloseButton, 'closeButton');

export type RootProps = ComponentProps<typeof Root>
export type BackdropProps = ComponentProps<typeof Backdrop>
export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>
export type ContentProps = ComponentProps<typeof Content>
export type DescriptionProps = ComponentProps<typeof Description>
export type PositionerProps = ComponentProps<typeof Positioner>
export type TitleProps = ComponentProps<typeof Title>
export type TriggerProps = ComponentProps<typeof Trigger>
export type ContentHeadingProps = ComponentProps<typeof ContentHeading>
export type ContentFooterProps = ComponentProps<typeof ContentFooter>
