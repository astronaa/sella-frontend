'use client';

import { useId, useState } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { RegisterForm } from './RegisterForm';

type RegisterDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void;
};

export function SetupProfileDialog({ onActionFulfilled, ...props }: RegisterDialogProps) {
	const [loading, setLoading] = useState(false)

	const onFormSubmit = async () => {
		onActionFulfilled?.();
		setLoading(false);
	}

	const formId = useId();

	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>Setup Your Profile</Dialog.Title>
						<Dialog.Description>
							Let&apos;s create your profile and get you started.
						</Dialog.Description>
					</Dialog.ContentHeading>

					<RegisterForm
						id={formId}
						onBeforeAction={() => setLoading(true)}
						onActionFulfilled={onFormSubmit}
					/>

					<Dialog.ContentFooter>
						<Button
							form={formId} disabled={loading}
							className='w-full' size='lg'
						>
							Continue
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
