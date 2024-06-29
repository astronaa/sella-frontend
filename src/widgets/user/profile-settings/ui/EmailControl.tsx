'use client';
import { useField, useForm, useFormState } from 'react-final-form';
import { VTextControl } from '~/shared/ui/validation-inputs';
import { SchemaType } from './SettingsForm';

export function EmailControl({ name }: { name: string; }) {
	const { change } = useForm();
	const { input } = useField(name);
	const { initialValues } = useFormState<SchemaType>({
		subscription: { initialValues: true }
	});

	return (
		<VTextControl.Root className='w-full' name={name}>
			<VTextControl.Label className='flex justify-between w-full'>
				<span>Email Address</span>
				{initialValues.email && input.value == initialValues.email && (
					<span
						className='text-cyan-100 cursor-pointer'
						onClick={() => change('email', null)}
					>
						Disconnect
					</span>
				)}
			</VTextControl.Label>
			<VTextControl.Input
				placeholder="johnappleseed@gmail.com" />
			<VTextControl.ErrorText />
		</VTextControl.Root>
	);
}
