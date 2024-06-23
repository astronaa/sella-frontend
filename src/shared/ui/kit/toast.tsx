'use client'

import { Toast } from '@ark-ui/react/toast'
import { type VariantProps, tv } from 'tailwind-variants'
import { createStyleContext } from '~/shared/lib/create-style-context'
import './toast.css'

const toast = tv(
	{
		base: 'toast',
		slots: {
			actionTrigger: 'toast__actionTrigger',
			closeTrigger: 'toast__closeTrigger',
			group: 'toast__group',
			root: 'toast__root rounded-[1rem] border p-4 w-[400px] shadow-[0_6px_12px_0_#00000005]',
			title: 'toast__title font-manrope font-semibold mb-1 text-[1rem]',
			description: 'toast__description font-normal',
		},
		variants: {
			variant: {info:{root: 'border-white/[.02] bg-black-06', title: 'text-white', description: 'text-white'},error: {root: 'border-red-100/[.06] bg-[#1D1211]', title: 'text-red-100', description: 'text-red-100'}}
		},
	},
	{ twMerge: false },
)
const { withProvider, withContext } = createStyleContext(toast)

export interface RootProps extends Toast.RootProps, VariantProps<typeof toast> {}
export const Root = withProvider(Toast.Root, 'root')

export const ActionTrigger = withContext(
	Toast.ActionTrigger,
	'actionTrigger',
)

export const CloseTrigger = withContext(
	Toast.CloseTrigger,
	'closeTrigger',
)

export const Description = withContext(
	Toast.Description,
	'description',
)

export const Title = withContext(Toast.Title, 'title')

export {
	ToastContext as Context,
	Toaster,
	createToaster,
	type ToastContextProps as ContextProps,
	type ToasterProps,
} from '@ark-ui/react/toast'
