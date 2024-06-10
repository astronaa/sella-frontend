'use client';

import { Icons } from '~/shared/ui/icons';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { useEffect, useRef } from "react";
import { useCallbackRef } from '~/shared/lib/use-callback-ref';
import { apiClient } from '~/shared/api/client';
import { invalidateUserGetQuery } from '~/entities/user';

type ConnectTwitterDialogProps = Dialog.RootProps & {
	onActionFulfilled: () => void;
};

export function ConnectTwitterDialog({ onActionFulfilled, ...props }: ConnectTwitterDialogProps) {
	const windowRef = useRef<Window | null>(null);

	const handleConnect = () => {
		const width = 350, height = 500;	
		const left = (window.innerWidth - width) / 2;
		const top = (window.innerHeight - height) / 2;

		windowRef.current = window.open(
			apiClient.auth.getTwitterAuthUrl(), '_blank',
			`popup,width=${width},height=${height},left=${left},top=${top}`
		);
	}

	const onActionFulfilledCb = useCallbackRef(onActionFulfilled);

	useEffect(() => {
		const listener = (e: MessageEvent) => {
			if (e.origin !== window.location.origin) return

			if (e.data.type == 'twitter-auth-result') {
				windowRef.current?.close();
				invalidateUserGetQuery();
				onActionFulfilledCb()
			}
		}

		window.addEventListener('message', listener)
		return () => window.removeEventListener('message', listener)
	}, [onActionFulfilledCb]);

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
							onClick={handleConnect}
						>
							<Icons.Xtwitter /> Connect X
						</Button>
					</Dialog.ContentFooter>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
}
