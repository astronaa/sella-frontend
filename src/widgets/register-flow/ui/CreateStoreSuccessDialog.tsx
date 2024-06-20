'use client';

import { DotLottiePlayer } from '@dotlottie/react-player';
import { Store } from "~/shared/api/client"
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';

type RegisterSuccessDialog = Dialog.RootProps & {
	store: Store | null,
	onContinue: () => void
}

export function CreateStoreSuccessDialog({ onContinue, store, ...props }: RegisterSuccessDialog) {
	return (
		<Dialog.Root {...props}>
			<Dialog.Backdrop />

			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.CloseButton />

					<Dialog.ContentHeading>
						<Dialog.Title>Yoohoo!<br /> {store?.name} is now open!</Dialog.Title>
						<Dialog.Description>
							Let&apos;s upload your first item to start showcasing what you have to offer.
						</Dialog.Description>
					</Dialog.ContentHeading>

					<DotLottiePlayer
						src='/lottie/hooyak.lottie'
						className='size-[11rem]' autoplay loop
					/>

					<Dialog.ContentFooter>
						<Button
							className='w-full' size='lg'
							onClick={onContinue}
						>
							Add your first item
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}