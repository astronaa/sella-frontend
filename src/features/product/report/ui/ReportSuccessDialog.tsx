'use client';

import { DotLottiePlayer } from '@dotlottie/react-player';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';

type ReportSuccessDialogProps = Dialog.RootProps & {
	onContinue?: () => void
}

export function ReportSuccessDialog({ onContinue, ...props }: ReportSuccessDialogProps) {
	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop onClick={onContinue} />

			<Dialog.Positioner>
				<Dialog.Content className='w-[34.375rem]'>
					<Dialog.CloseButton onClick={onContinue} />

					<Dialog.ContentHeading>
						<Dialog.Title>Thank you for submitting a report</Dialog.Title>
						<Dialog.Description>
							We take reports seriously and after a thorough review, our support team will get back to you
						</Dialog.Description>
					</Dialog.ContentHeading>

					<DotLottiePlayer
						src='/lottie/police.lottie'
						className='size-[11rem]' autoplay loop
					/>

					<Dialog.ContentFooter>
						<Button
							className='w-full' size='lg'
							onClick={onContinue}
						>
							Close
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
