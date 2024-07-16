import { Header } from "./Header";
import { Footer } from "~/widgets/footer";
import { PropsWithChildren } from "react";
import { RegisterFlowDialog } from "~/widgets/register-flow";
import { UserProfileSettingsDialog } from "~/widgets/user/profile-settings";
import { TronWalletConnectDialog } from "~/features/tron-wallet";
import { Toaster } from "~/widgets/toaster";
import { ChatSocketProvider } from "~/entities/chat";

export function Component({ children }: PropsWithChildren) {
	return (
		<ChatSocketProvider>
			<Header />

			<div className='w-full min-h-full pt-[8rem]'>
				{children}
			</div>

			<Toaster />
			<Footer />

			<RegisterFlowDialog />
			<UserProfileSettingsDialog />
			<TronWalletConnectDialog />
		</ChatSocketProvider>
	);
}