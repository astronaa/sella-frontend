'use client';

import { Icons } from '~/shared/ui/icons';
import { Button } from '~/shared/ui/kit/button';
import { Dialog } from '~/shared/ui/kit';
import { apiClient } from "~/shared/api/client";
import { useEffect } from "react";
import { invariant } from "~/shared/lib/asserts";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
invariant(BASE_URL, 'NEXT_PUBLIC_API_URL not defined');

type ConnectTwitterDialogProps = Dialog.RootProps & {
	onActionFulfilled: () => void;
};

export function ConnectTwitterDialog({ onActionFulfilled, ...props }: ConnectTwitterDialogProps) {

	const handleConnect = () => {
		window.open(apiClient.auth.getTwitterAuthUrl(), '_blank', 'popup')
	}

	useEffect(() => {
		const listener = (e: MessageEvent) => {
			if (e.origin !== BASE_URL) return
			console.log(e)

			// onActionFulfilled(e.data)
			onActionFulfilled()
		}


		window.addEventListener('message', listener)
		return () => window.removeEventListener('message', listener)
	}, []);

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
