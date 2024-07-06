'use client';

import { Dialog } from '~/shared/ui/kit';
import { useId, useState } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { SettingsForm } from './SettingsForm';
import { useAccount } from 'wagmi';
import { Portal } from '@ark-ui/react';
import { useSettingsDialog } from '../model/dialog';

type ProfileDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void
};

export function ProfileDialog({ onActionFulfilled, ...props }: ProfileDialogProps) {
	const formId = useId();
	const { address } = useAccount();
	const { open, setOpen } = useSettingsDialog();
	const [loading, setLoading] = useState(false);

	const onFormActionFulfilled = () => {
		setOpen(false);
		setLoading(false);

		onActionFulfilled?.();
	}

	return (
		<Dialog.Root
			{...props} open={open && !!address}
			onOpenChange={({ open }) => setOpen(open)}
			unmountOnExit lazyMount
		>
			<Portal>
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
							onBeforeAction={() => setLoading(true)}
							onActionFulfilled={onFormActionFulfilled}
							onActionRejected={() => setLoading(false)}
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
							<Button
								className='w-full' size='lg'
								form={formId} disabled={loading}
							>
								Save Changes
							</Button>
						</Dialog.ContentFooter>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
