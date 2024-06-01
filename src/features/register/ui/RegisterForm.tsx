'use client';

import { HTMLAttributes } from 'react';
import { Form } from 'react-final-form';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { DividerWithElement } from '~/shared/ui/kit/divider';
import { VImageUploader, VTextControl } from '~/shared/ui/validation-inputs';
import { schema, SchemaType } from "~/features/register/api";
import { apiClient } from '~/shared/api/client';
import { invalidateUserGetQuery } from '~/entities/user';

type RegisterFormProps = HTMLAttributes<HTMLFormElement> & {
	id: string;
	onBeforeAction?: () => void;
	onActionFulfilled?: (values: SchemaType) => void;
};

export function RegisterForm({ onActionFulfilled, onBeforeAction, ...props }: RegisterFormProps) {
	const onSubmit = async (values: SchemaType) => {
		onBeforeAction?.();

		await apiClient.auth.setUsername(values.userName);

		if(values.avatar)
			await apiClient.users.setAvatar(values.avatar);

		invalidateUserGetQuery();

		onActionFulfilled?.(values);
	};

	return (
		<Form onSubmit={onSubmit} validate={zodValidate(schema)}>
			{({ handleSubmit }) => (
				<form
					className='flex flex-col w-full gap-[1rem]'
					{...props} onSubmit={handleSubmit}
				>
					<DividerWithElement className='gap-[1rem] mb-[1rem]'>
						<VImageUploader
							accept='image/png, image/jpeg'
							label='Upload Avatar' name='avatar'
							className='rounded-full'
						/>
					</DividerWithElement>

					<VTextControl.Root className='w-full' name='userName'>
						<VTextControl.Input
							className='text-center'
							size='2xl' placeholder="@username"
						/>
						<VTextControl.ErrorText />
						<VTextControl.Description className='text-center text-black-60'>
							This will be your unique identifier — choose a name that truly represents you or your brand.
						</VTextControl.Description>
					</VTextControl.Root>
				</form>
			)}
		</Form>
	);
}
