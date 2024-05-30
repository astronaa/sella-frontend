'use client';

import { useEffect, useState } from 'react';
import { dayJs } from '~/shared/lib/dayjs';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { PinInput } from '~/shared/ui/kit/pin-input';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '~/shared/api/client';
import { Portal } from '@ark-ui/react';

type VerifyEmailDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void;
	email: string | null
};

const PIN_DIGITS_COUNT = 4;

export function VerifyEmailDialog({ onActionFulfilled, email, ...props }: VerifyEmailDialogProps) {
	const [codeValue, setCodeValue] = useState<string[]>([]);
	const isValueValid = codeValue.length == PIN_DIGITS_COUNT;

	const { mutateAsync: verifyEmail, error } = useMutation<null, { message: string }, string>({
		mutationFn: async (code: string) => {
			const { error } = await apiClient.auth.verifyEmailCode({
				email: email ?? '', code
			})

			if (error)
				throw error;

			return null;
		}
	})

	const onFormSubmit = async () => {
		verifyEmail(codeValue.join(''))
			.then(() => onActionFulfilled?.())
			.catch(() => setCodeValue([]))
	}

	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop />

			<Portal>
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseButton />
						<Dialog.ContentHeading>
							<Dialog.Title>Verify Email</Dialog.Title>
							<Dialog.Description>
								Please check your inbox to continue
								securing your account.
							</Dialog.Description>
						</Dialog.ContentHeading>

						<div className='flex flex-col items-center gap-[1rem] w-full'>
							<PinInput
								size='2xl' error={!!error}
								value={codeValue}
								onValueChange={({ value }) => setCodeValue(value)}
								length={PIN_DIGITS_COUNT}
							/>

							{!!error && (
								<p className='text-error-100 text-center'>
									{error.message}
								</p>
							)}

							<RepeatCounter 
								onResendClick={() => {
									if(email) {
										setCodeValue([]);
										apiClient.auth.sendEmailCode(email);
									}

									return 60;
								}}
							/>
						</div>

						<Dialog.ContentFooter>
							<Button
								className='w-full' size='lg'
								onClick={onFormSubmit}
								disabled={!isValueValid}
							>
								Continue
							</Button>
						</Dialog.ContentFooter>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}

interface RepeatCounterProps {
	onResendClick?: () => number
}

function RepeatCounter(props: RepeatCounterProps) {
	const [timer, setTimer] = useState(60);

	useEffect(() => {
		const timeout = setInterval(() => {
			setTimer(t => t > 0 ? t - 1 : 0);
		}, 1000)

		return () => {
			clearInterval(timeout);
		}
	}, []);

	const onResendClick = async () => {
		if(!timer && props.onResendClick) {
			const newTime = props.onResendClick();
			setTimer(newTime);
		}
	}

	return (
		<p className='text-black-60'>
			Didn’t received the code? <span
				className='text-cyan-100 cursor-pointer'
				onClick={onResendClick}
			>
				{timer ? `Resend in ${dayJs(timer * 1000).format('mm:ss')}` : 'Resend now'}
			</span>
		</p>
	);
}
