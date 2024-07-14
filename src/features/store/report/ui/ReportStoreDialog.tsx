'use client';

import { ReactNode } from 'react';
import { Field, Form } from 'react-final-form';
import { z } from 'zod';
import { zodValidate } from '~/shared/lib/zod-final-form';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { VSubmitButton, VTextAreaControl, VTextControl } from '~/shared/ui/validation-inputs';
import { Collapsible } from "~/shared/ui/kit";
import { ToggleGroupField } from './ToggleGroupField';
import { apiClient } from "~/shared/api/client";
import { useDialogState } from "~/shared/lib/dialog";
import { storeQueries } from '~/entities/store';

type ReportStoreDialogProps = Dialog.RootProps & {
	onActionFulfilled?: () => void,
	cancelButton?: ReactNode
	storeUrl: string
};

const {
	ANOTHER_REASON_ID, reportReasons, schemaReport
} = apiClient.stores;

const options: { id: typeof reportReasons[number], label: string }[] = [
	{ id: 'Spam', label: 'Spam' },
	{ id: 'Nudity', label: 'Nudity' },
	{ id: 'Scam', label: 'Scam' },
	{ id: 'Illegal', label: 'Illegal' },
	{ id: 'Violence', label: 'Violence' },
	{ id: 'HateSpeech', label: 'Hate Speech' },
	{ id: ANOTHER_REASON_ID, label: 'Something Else' },
]

const schema = schemaReport
type SchemeType = z.infer<typeof schema>
const validate = zodValidate(schema);

export function ReportStoreDialog({ onActionFulfilled, cancelButton, storeUrl, ...props }: ReportStoreDialogProps) {
	const { isOpen, handleOpenChange, close } = useDialogState(props)

	const onSubmit = async (values: SchemeType) => {
		await apiClient.stores.for(storeUrl).report(values);
		storeQueries.invalidateReport(storeUrl);
		onActionFulfilled?.();
		close();
	}

	return (
		<>
			<Dialog.Root
				{...props}
				open={isOpen} onOpenChange={handleOpenChange}
				unmountOnExit lazyMount
			>
				<Dialog.Backdrop />

				<Dialog.Positioner>
					<Dialog.Content className='w-[34.375rem]'>
						<Dialog.CloseButton />
						<Form
							onSubmit={onSubmit}
							validate={validate}
							subscription={{}}
						>
							{() => (
								<>
									<Dialog.ContentHeading>
										<Dialog.Title>Report Shop</Dialog.Title>
										<Dialog.Description>
											Your report is anonymous, except if you&apos;re reporting an
											intellectual property infringement. Your report is anonymous, except if
											you&apos;re [need text
											here].
										</Dialog.Description>
									</Dialog.ContentHeading>

									<div className='flex flex-col gap-[2rem] w-full'>
										<ToggleGroupField
											name='reasons'
											options={options}
										/>

										<Field name='reasons'>{
											({ input: { value } }) => (
												<Collapsible.Root
													open={value?.includes(ANOTHER_REASON_ID)}>
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
											)
										}
										</Field>
									</div>

									<Dialog.ContentFooter>
										{cancelButton ?? (
											<Dialog.CloseTrigger asChild>
												<Button className='w-full' colorPalette='gray' size='lg'>
													Cancel
												</Button>
											</Dialog.CloseTrigger>
										)}
										<VSubmitButton className='w-full' size='lg'>
											Submit Report
										</VSubmitButton>
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
