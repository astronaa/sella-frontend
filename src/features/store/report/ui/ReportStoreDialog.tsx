'use client';

import { ReactNode } from 'react';
import { Form } from 'react-final-form';
import { z } from 'zod';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { VTextAreaControl, VTextControl } from '~/shared/ui/validation-inputs';
import { Collapsible } from "~/shared/ui/kit";
import { FormApi } from "final-form";
import { ToggleGroupField } from './ToggleGroupField';
import { apiClient } from "~/shared/api/client";
import { ANOTHER_REASON_ID, reportReasons, schemaReport } from "~/shared/api/client/stores/schemas";
import { useDialogState } from "~/shared/lib/dialog";

type ReportStoreDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void,
	cancelButton?: ReactNode
	storeUrl: string
};


const options: { id: typeof reportReasons[number], label: string }[] = [
	{ id: 'Spam', label: 'Spam' },
	{ id: 'Nudity', label: 'Nudity' },
	{ id: 'Scam', label: 'Scam' },
	{ id: 'Illegal', label: 'Illegal' },
	{ id: 'Violence', label: 'Violence' },
	{ id: 'HateSpeech', label: 'Hate Speech' },
	{ id: ANOTHER_REASON_ID, label: 'Something Else' },
]

const initialValues = {
	reason: [],
	description: ''
}

const schema = schemaReport

type SchemeType = z.infer<typeof schema>

export function ReportStoreDialog({ onActionFulfilled, cancelButton, storeUrl, ...props }: ReportStoreDialogProps) {
	const { isOpen, handleOpenChange, close } = useDialogState(props)

	const onSubmit = async (values: SchemeType, form: FormApi<SchemeType, typeof initialValues>) => {
		await apiClient.stores.for(storeUrl).report(values)
		form.reset()
		onActionFulfilled?.()
		close()
	}

	return (
		<>
			<Dialog.Root
				{...props}
				open={isOpen}
				onOpenChange={handleOpenChange}
			>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content className='w-[34.375rem]'>
						<Dialog.CloseButton />
						<Form
							onSubmit={onSubmit}
							initialValues={initialValues}
							validate={zodValidate(schema)}
						>
							{({ form }) => (
								<>
									<Dialog.ContentHeading>
										<Dialog.Title>Report Shop</Dialog.Title>
										<Dialog.Description>
											Your report is anonymous, except if you&apos;re reporting an
											intellectual property infringement. Your report is anonymous, except if you&apos;re [need text
											here].
										</Dialog.Description>
									</Dialog.ContentHeading>

									<div className='flex flex-col gap-[2rem] w-full'>
										<ToggleGroupField
											name='reasons'
											options={options}
										/>

										<Collapsible.Root open={form.getFieldState('reasons')?.value?.includes(ANOTHER_REASON_ID)}>
											<Collapsible.Content>
												<VTextControl.Root name='description'>
													<VTextControl.Label>Reason</VTextControl.Label>
													<VTextAreaControl.Input
														className='resize-none h-auto'
														rows={4}
														placeholder='Help us understand the problem'
													/>
													<VTextControl.ErrorText className='text-center' />
												</VTextControl.Root>
											</Collapsible.Content>
										</Collapsible.Root>
									</div>

									<Dialog.ContentFooter>
										{cancelButton ?? (
											<Dialog.CloseTrigger asChild>
												<Button className='w-full' colorPalette='gray' size='lg'>
													Cancel
												</Button>
											</Dialog.CloseTrigger>
										)}
										<Button onClick={form.submit} className='w-full' size='lg'>
											Submit Report
										</Button>
									</Dialog.ContentFooter>
								</>
							)}
						</Form>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}
