'use client';

import { HTMLAttributes, useMemo } from 'react';
import { Form } from 'react-final-form';
import { useAccount } from 'wagmi';
import { z } from 'zod';
import { invalidateUserGetQuery, useUserGetQuery } from '~/entities/user';
import { AuthChannelsVerifyEmailDialog } from '~/features/auth-channels';
import { apiClient } from '~/shared/api/client';
import { cn } from '~/shared/lib/cn';
import { useDialogState } from '~/shared/lib/dialog';
import { usePromiseResolver } from '~/shared/lib/use-promise-resolver';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { Icons } from '~/shared/ui/icons';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { VImageUploader, VTextControl } from '~/shared/ui/validation-inputs';
import { LoginButton } from '@telegram-auth/react';

export const schema = z.object({
	username: apiClient.auth.schemaUsername,
	telegramId: z.string().min(3, 'Min length is 3').nullable().optional(),
	email: z.string().email().nullable().optional(),
	avatar: apiClient.users.schemaAvatarFile.optional()
});

export type SchemaType = z.infer<typeof schema>

type SettingsFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	onBeforeAction?: () => void;
	onActionFulfilled?: () => void;
	onActionRejected?: () => void;
};

export function SettingsForm({ onActionFulfilled, onBeforeAction, onActionRejected, className, ...props }: SettingsFormProps) {
	const { data: user } = useUserGetQuery();
	const { address } = useAccount();

	const {
		createPromise: waitForEmailVerification,
		resolve: resolveEmailVerification
	} = usePromiseResolver<boolean>();

	const {
		isOpen: isVerifyDialogOpen,
		open: openVerifyDialog,
		close: closeVerifyDialog,
		handleOpenChange: handleVerifyDialogOpenChange
	} = useDialogState({
		processValueChange: open => {
			if (!open)
				resolveEmailVerification(false);
		}
	});

	const onSubmit = async (values: SchemaType) => {
		onBeforeAction?.();

		try {
			if (values.avatar) {
				const { error } = await apiClient.users.setAvatar(values.avatar);
				if (error)
					throw error;
			}
			else if (values.avatar === null) {
				const { error } = await apiClient.users.deleteAvatar();
				if (error)
					throw error;
			}

			if (user?.username != values.username) {
				const { error } = await apiClient.auth.setUsername(values.username);
				if (error)
					throw error;
			}

			if (user?.email != values.email && values.email) {
				const { error } = await apiClient.auth.sendEmailCode(values.email);

				if (error)
					throw error;

				openVerifyDialog();

				const result = await waitForEmailVerification();

				closeVerifyDialog();

				if (!result)
					throw result;
			}

			invalidateUserGetQuery();

			onActionFulfilled?.();
		}
		catch {
			return onActionRejected?.();
		}
	};

	const initialValues = useMemo(() => ({
		wallet: address,
		...user
	}), [address, user]);

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
							label='Upload Avatar' name='avatar'
							className='flex-shrink-0 size-[11.625rem] rounded-full'
							initialImageSrc={initialValues.avatarImage ?? undefined}
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

					{initialValues.telegramId ? (
						<VTextControl.Root className='w-full' name='telegramId'>
							<VTextControl.Label>
								Telegram
							</VTextControl.Label>
							<VTextControl.Input
								className='ps-[3rem] cursor-default'
								placeholder="Your @telegram"
								readOnly
							>
								<span className='flex items-center justify-center absolute h-full top-0 left-0 ps-[1rem]'>
									<Icons.Telegram className='size-[1.25rem]' />
								</span>
							</VTextControl.Input>
							<VTextControl.ErrorText />
						</VTextControl.Root>
					) : (
						<div className='w-full [&_iframe]:w-full'>
							<LoginButton
								botUsername='dsabdsahbdsahbot'
								authCallbackUrl='https://sella.veydlin.com/api/auth/telegram'
							/>
						</div>
					)}

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
						onActionFulfilled={() => resolveEmailVerification(true)}
					/>
				</form>
			)}
		</Form>
	);
}
