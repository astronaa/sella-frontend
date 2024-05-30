'use client';

import { Dialog } from '~/shared/ui/kit';
import { useId } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { useUserProfileSettingsDialog } from '~/shared/model/user-profile';
import { SettingsForm } from './SettingsForm';
import { useAccount } from 'wagmi';

type ProfileDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void
};

export function ProfileDialog({ onActionFulfilled, ...props }: ProfileDialogProps) {
	const formId = useId();
	const { address } = useAccount();
	const { open, setOpen } = useUserProfileSettingsDialog();

	return (
		<Dialog.Root
			{...props} open={open && !!address}
			onOpenChange={({ open }) => setOpen(open)}
		>
			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content
					className='items-start w-[37.5rem] gap-[2rem] pt-[1.5625rem] pb-[2.1875rem]'
				>
					<Dialog.CloseButton />

					<Dialog.ContentHeading className='items-start'>
						<Dialog.Title>Profile Settings</Dialog.Title>
					</Dialog.ContentHeading>

					<SettingsForm
						id={formId} 
						onActionFulfilled={onActionFulfilled}
					/>

					<Dialog.ContentFooter className='mt-[1rem]'>
						<Dialog.CloseTrigger asChild>
							<Button
								size='lg' colorPalette='gray'
								className='w-full'
							>
								Close
							</Button>
						</Dialog.CloseTrigger>
						<Button form={formId} className='w-full' size='lg'>
							Save Changes
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
