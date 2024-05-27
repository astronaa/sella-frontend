'use client';

import { useId } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { RegisterForm } from './RegisterForm';

type RegisterDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void
};

export function SetupProfileDialog(props: RegisterDialogProps) {
	const onActionFulfilled = () => {
		props?.onActionFulfilled?.();
	}

	const formId = useId();

	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>First things first</Dialog.Title>
						<Dialog.Description>
							Let&apos;s get you authenticated via Twitter, so we can get the ball rolling.
						</Dialog.Description>
					</Dialog.ContentHeading>

					<RegisterForm
						id={formId}
						onActionFulfilled={onActionFulfilled}
					/>

					<Dialog.ContentFooter>
						<Button form={formId} className='w-full' size='lg'>
							Continue
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
