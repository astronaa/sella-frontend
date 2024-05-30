'use client';

import { useId, useState } from 'react';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { RegisterForm } from './RegisterForm';
import { SchemaType } from "~/features/register/api";
import { apiClient } from "~/shared/api/client";

type RegisterDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void
};

export function SetupProfileDialog(props: RegisterDialogProps) {
	const [loading, setLoading] = useState(false)

	const onActionFulfilled = async (values: SchemaType) => {
		setLoading(true)

		await apiClient.auth.setUsername(values.userName)
		await apiClient.users.setAvatar(values.avatar)

		props?.onActionFulfilled?.();
		setLoading(false)
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
