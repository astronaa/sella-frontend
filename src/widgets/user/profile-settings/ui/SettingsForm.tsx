'use client';

import { HTMLAttributes, useMemo, useRef } from 'react';
import { Form } from 'react-final-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';
import { invalidateUserGetQuery, useUserGetQuery } from '~/entities/user';
import { AuthChannelsVerifyEmailDialog } from '~/features/auth-channels';
import { apiClient } from '~/shared/api/client';
import { cn } from '~/shared/lib/cn';
import { useDialogState } from '~/shared/lib/dialog';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { Icons } from '~/shared/ui/icons';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { VImageUploader, VTextControl } from '~/shared/ui/validation-inputs';

export const schema = z.object({
	username: apiClient.auth.schemaUsername,
	telegramId: z.string().min(3, 'Min length is 3').nullable().optional(),
	email: z.string().email().nullable().optional()
});

export type SchemaType = z.infer<typeof schema>

type SettingsFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	onActionFulfilled?: () => void;
	onActionRejected?: () => void;
	onBeforeAction?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsForm({ onActionFulfilled, onBeforeAction, onActionRejected, className, ...props }: SettingsFormProps) {
	const { data: user } = useUserGetQuery();
	const { address } = useAccount();

	const {
		isOpen: isVerifyDialogOpen,
		open: openVerifyDialog,
		close: closeVerifyDialog,
		handleOpenChange: handleVerifyDialogOpenChange
	} = useDialogState({
		processValueChange: open => {
			if (!open)
				verifyDialogResolverRef.current?.(false);
		}
	});

	const verifyDialogResolverRef = useRef<((result: boolean) => void) | null>(null);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmit = async (values: SchemaType) => {
		onBeforeAction?.();

		if (user?.username != values.username) {
			await apiClient.auth.setUsername(values.username);

			invalidateUserGetQuery();
		}

		if (user?.email != values.email && values.email) {
			const { error } = await apiClient.auth.sendEmailCode(values.email);

			if (error)
				return onActionRejected?.();

			openVerifyDialog();

			const result = await new Promise<boolean>(resolve => {
				verifyDialogResolverRef.current = resolve;
			})

			closeVerifyDialog();

			if (!result)
				return onActionRejected?.();
		}

		onActionFulfilled?.();
	};

	const initialValues = useMemo(() => ({
		wallet: address,
		...user
	}), [address, user])

	return (
		<Form
			onSubmit={onSubmit}
			validate={zodValidate(schema)}
			initialValues={initialValues}
		>
			{({ handleSubmit, values }) => (
				<form
					{...props} onSubmit={handleSubmit}
					className={cn('flex flex-col w-full gap-[2rem]', className)}
				>
					<div className='flex gap-[2rem] w-full max-md:flex-col'>
						<VImageUploader
							label='Upload Avatar' name='avatarImage'
							className='flex-shrink-0 size-[11.625rem] rounded-full'
						/>
						<div className='flex flex-col justify-between max-md:gap-[1rem]'>
							<VTextControl.Root className='w-full' name='wallet'>
								<VTextControl.LabelOrError>
									Wallet
								</VTextControl.LabelOrError>
								<VTextControl.Input
									className='pointer-events-none truncate max-w-full pe-[1rem]'
									readOnly
								/>
							</VTextControl.Root>

							<VTextControl.Root className='w-full' name='username'>
								<VTextControl.LabelOrError>
									Username
								</VTextControl.LabelOrError>
								<VTextControl.Input
									placeholder='Your username'
								/>
							</VTextControl.Root>
						</div>
					</div>

					<DividerWithElement className='text-black-40 text-[0.875rem]'>
						2fa / Notifications
					</DividerWithElement>

					<VTextControl.Root className='w-full' name='telegramId'>
						<VTextControl.Label>
							Telegram
						</VTextControl.Label>
						<VTextControl.Input
							className='ps-[3rem]'
							placeholder="Your @telegram"
						>
							<span className='flex items-center justify-center absolute h-full top-0 left-0 ps-[1rem]'>
								<Icons.Telegram className='size-[1.25rem]' />
							</span>
						</VTextControl.Input>
						<VTextControl.ErrorText />
					</VTextControl.Root>

					<VTextControl.Root className='w-full' name='email'>
						<VTextControl.Label>
							Email Address
						</VTextControl.Label>
						<VTextControl.Input
							placeholder="johnappleseed@gmail.com"
						/>
						<VTextControl.ErrorText />
					</VTextControl.Root>

					<AuthChannelsVerifyEmailDialog
						email={values.email ?? null}
						open={isVerifyDialogOpen}
						onOpenChange={handleVerifyDialogOpenChange}
						onActionFulfilled={() => {
							verifyDialogResolverRef.current?.(true);
						}}
					/>
				</form>
			)}
		</Form>
	);
}
