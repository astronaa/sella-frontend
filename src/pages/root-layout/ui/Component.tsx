import { PropsWithChildren } from "react";
import { Footer } from "~/widgets/footer";
import { RegisterFlowDialog } from "~/widgets/register-flow";
import { UserProfileSettingsDialog } from "~/widgets/user/profile-settings";
import { Header } from "./Header";

export function Component({ children }: PropsWithChildren) {
	return (
		<>
			<Header />

			<div className='w-full min-h-full pt-[5rem] pb-[7.5rem]'>
				{children}
			</div>

			<Footer />

			<RegisterFlowDialog />
			<UserProfileSettingsDialog />
		</>
	);
}