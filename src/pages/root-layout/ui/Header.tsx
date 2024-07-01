'use client';

import { Icons } from "~/shared/ui/icons";
import { Button } from "~/shared/ui/kit/button";
import { NavHeader } from "~/widgets/nav-header";
import { RegsiterFlowStartButton } from "~/widgets/register-flow";
import { useUserProfileSettingsDialog } from "~/widgets/user/profile-settings";

export function Header() {
	return (
		<NavHeader.Root
			className='sticky top-[1rem] w-[calc(100%-2rem)] mx-auto z-header'
		>
			<NavHeader.SlotUnauthorizedButtons>
				<Button variant='outline'>
					Buy $SELLA
				</Button>

				<RegsiterFlowStartButton />
			</NavHeader.SlotUnauthorizedButtons>

			<NavHeader.SlotAuthorizedNavButtons>
				<NavHeader.NavIconButton
					href='/dashboard/sales'
					activeOnHrefs={['/dashboard/orders']}
				>
					<Icons.Package />
				</NavHeader.NavIconButton>

				<NavHeader.NavIconButton href='/dashboard' end>
					<Icons.Building />
				</NavHeader.NavIconButton>

				<NavHeader.NavIconButton
					href='/dashboard/quests'
					activeOnHrefs={['/dashboard/quests']}
				>
					<Icons.Coins />
				</NavHeader.NavIconButton>

				<UserSettingsButton />
			</NavHeader.SlotAuthorizedNavButtons>
		</NavHeader.Root>
	);
}

function UserSettingsButton() {
	const { open, setOpen } = useUserProfileSettingsDialog();
	
	return (
		<NavHeader.BaseNavIconButton
			active={open} onClick={() => setOpen(true)}
		>
			<Icons.Settings />
		</NavHeader.BaseNavIconButton>
	);
}