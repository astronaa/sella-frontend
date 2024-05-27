'use client';

import { Icons } from '~/shared/ui/icons';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';

type ConnectTwitterDialogProps = Dialog.RootProps & {
	onConnectClick: () => void;
};

export function ConnectTwitterDialog({ onConnectClick, ...props }: ConnectTwitterDialogProps) {
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

					<Dialog.ContentFooter>
						<Button
							className='w-full gap-[0.5rem]'
							colorPalette='social' size='lg'
							onClick={onConnectClick}
						>
							<Icons.Xtwitter /> Connect X
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
