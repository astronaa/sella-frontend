import { PropsWithChildren } from "react";
import { RegisterFlowDialog } from "~/widgets/register-flow";
import { UserProfileSettingsDialog } from "~/widgets/user/profile-settings";
import { TronWalletConnectDialog } from "~/features/tron-wallet";
import { Toaster } from "~/widgets/toaster";
import { ChatSocketProvider } from "~/entities/chat";
import { Header } from "./Header";
import { Footer } from "~/widgets/footer";
import Link from "next/link";
import { AppLogo } from "~/shared/ui/logo";

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
	if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
		return <StaticComponent>{children}</StaticComponent>;
	}

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

function StaticComponent({ children }: PropsWithChildren) {
	return (
		<div className="w-full min-h-full">
			<header className="sticky top-[1rem] z-header w-[calc(100%-2rem)] max-w-content mx-auto">
				<nav className="flex items-center justify-between gap-[1rem] rounded-[1.25rem] border border-secondary bg-black-08/[.80] px-[1rem] py-[0.875rem] backdrop-blur-[3rem]">
					<Link href="/" className="flex items-center">
						<AppLogo className="h-[2rem] w-auto" />
					</Link>

					<div className="flex items-center gap-[1rem] text-sm text-black-60">
						<Link className="transition hover:text-white" href="/marketplace">
							Marketplace
						</Link>
						<Link className="transition hover:text-white" href="/products/search">
							Products
						</Link>
					</div>
				</nav>
			</header>

			<div className="w-full min-h-full pt-[8rem]">
				{children}
			</div>

			<Footer />
		</div>
	);
}

export { ProductionComponent as Component }
