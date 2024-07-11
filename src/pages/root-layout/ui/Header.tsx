"use client";

import { Icons } from "~/shared/ui/icons";
import { Tooltip } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";
import { NavHeader } from "~/widgets/nav-header";
import { RegsiterFlowStartButton } from "~/widgets/register-flow";
import { useUserProfileSettingsDialog } from "~/widgets/user/profile-settings";

export function Header() {
  return (
    <NavHeader.Root className="sticky top-[1rem] w-[calc(100%-2rem)] mx-auto z-header">
      <NavHeader.SlotUnauthorizedButtons>
        <Button variant="outline">Buy $SELLA</Button>

        <RegsiterFlowStartButton />
      </NavHeader.SlotUnauthorizedButtons>

      <NavHeader.SlotAuthorizedNavButtons>
        <Tooltip.Composed label="Orders/Sales">
          <NavHeader.NavIconButton
            href="/dashboard/sales"
            activeOnHrefs={["/dashboard/orders"]}
          >
            <Icons.Package />
          </NavHeader.NavIconButton>
        </Tooltip.Composed>

        <Tooltip.Composed label="Dashboard">
          <NavHeader.NavIconButton href="/dashboard" end>
            <Icons.Building />
          </NavHeader.NavIconButton>
        </Tooltip.Composed>

        <Tooltip.Composed label="Quests">
          <NavHeader.NavIconButton
            href="/dashboard/quests"
            activeOnHrefs={["/dashboard/quests"]}
          >
            <Icons.Coins />
          </NavHeader.NavIconButton>
        </Tooltip.Composed>

        <Tooltip.Composed label="Chats">
          <NavHeader.NavIconButton href="/chats" activeOnHrefs={["/chats"]}>
            <Icons.Chat />
          </NavHeader.NavIconButton>
        </Tooltip.Composed>

        <Tooltip.Composed label="Settings">
          <UserSettingsButton />
        </Tooltip.Composed>
      </NavHeader.SlotAuthorizedNavButtons>
    </NavHeader.Root>
  );
}

function UserSettingsButton() {
  const { open, setOpen } = useUserProfileSettingsDialog();

  return (
    <NavHeader.BaseNavIconButton active={open} onClick={() => setOpen(true)}>
      <Icons.Settings />
    </NavHeader.BaseNavIconButton>
  );
}
