import { PropsWithChildren } from "react";
import { RegisterFlowDialog } from "~/widgets/register-flow";
import { UserProfileSettingsDialog } from "~/widgets/user/profile-settings";
import { TronWalletConnectDialog } from "~/features/tron-wallet";
import { Toaster } from "~/widgets/toaster";
import { ChatSocketProvider } from "~/entities/chat";
import { Header } from "./Header";
import { Footer } from "~/widgets/footer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Component({ children }: PropsWithChildren) {
	return (
		<div className='w-full min-h-full'>
			{children}
		</div>
	);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProductionComponent({ children }: PropsWithChildren) {
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

export { ProductionComponent as Component }