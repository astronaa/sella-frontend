'use client';
import { useFormState } from 'react-final-form';
import { invalidateUserGetQuery } from '~/entities/user';
import { AuthChannelsTelegramAuthButton } from '~/features/auth-channels';
import { Icons } from '~/shared/ui/icons';
import { InputAddon } from '~/shared/ui/kit/input';
import { VTextControl } from '~/shared/ui/validation-inputs';
import { SchemaType } from './SettingsForm';

export function TelegramControl({ name }: { name: string; }) {
	const { initialValues } = useFormState<SchemaType>({
		subscription: { initialValues: true }
	});

	return initialValues.telegramId ? (
		<VTextControl.Root className='w-full' name={name}>
			<VTextControl.Label className='flex justify-between w-full'>
				<span>Telegram</span>
				{initialValues.telegramId && (
					<span
						className='text-cyan-100 cursor-pointer'
					>
						Disconnect
					</span>
				)}
			</VTextControl.Label>
			<VTextControl.Input
				className='ps-[3rem] cursor-default'
				placeholder="Your @telegram"
				readOnly
			>
				<InputAddon className='left-0 ps-[1rem]'>
					<Icons.Telegram className='size-[1.25rem]' />
				</InputAddon>
			</VTextControl.Input>
			<VTextControl.ErrorText />
		</VTextControl.Root>
	) : (
		<div className='w-full'>
			<AuthChannelsTelegramAuthButton
				onActionFulfilled={invalidateUserGetQuery} />
		</div>
	);
}
