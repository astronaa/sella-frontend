import { Portal } from "@ark-ui/react";
import { apiClient } from "~/shared/api/client";
import { Dialog } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";

interface DeleteButtonProps {
	storeUrl: string,
	onActionFulfilled?: () => void
}

export function DeleteButton({ storeUrl, onActionFulfilled }: DeleteButtonProps) {
	const action = async () => {
		const { error } = await apiClient.stores.for(storeUrl).delete();

		if (!error)
			onActionFulfilled?.();
	}

	return (
		<Dialog.Root lazyMount unmountOnExit>
			<Dialog.Backdrop />

			<Dialog.Trigger asChild>
				<Button
					variant='subtle'
					colorPalette='red' size='lg'
				>
					Remove Storefront
				</Button>
			</Dialog.Trigger>

			<Portal>
				<Dialog.Positioner>
					<Dialog.Content className=''>
						<Dialog.CloseButton />

						<Dialog.ContentHeading>
							<Dialog.Title>Delete store</Dialog.Title>
						</Dialog.ContentHeading>

						<p className='text-black-40 text-center text-[1.15rem]'>
							Are you sure you want to delete <b className='text-white'>{storeUrl}</b> store?
						</p>

						<Dialog.ContentFooter>
							<Dialog.CloseTrigger>
								<Button colorPalette='gray' className='w-full' size='lg'>
									Cancel
								</Button>
							</Dialog.CloseTrigger>

							<Button
								variant='subtle'
								colorPalette='red' size='lg'
								onClick={action}
							>
								Remove Storefront
							</Button>
						</Dialog.ContentFooter>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
