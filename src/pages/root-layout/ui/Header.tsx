"use client";

import { Icons } from "~/shared/ui/icons";
import { NavHeader } from "~/widgets/nav-header";
import { useWindowScroll } from "../lib/use-window-scroll";
import { RegsiterFlowStartButton } from "~/widgets/register-flow";
import { useUserProfileSettingsDialog } from "~/widgets/user/profile-settings";
import { Avatar } from "~/shared/ui/kit/avatar";
import { useUserGetQuery } from "~/entities/user";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { ChatOverallUnreadBadge } from "~/entities/chat";
import {
  PATH_DASHBOARD_ORDERS_PAGE,
  PATH_DASHBOARD_SALES_PAGE,
} from "~/shared/config/urls";
import { useDashboardPreferedOrdersPage } from "~/features/dashboard-prefs";
import { LogoutButton } from "~/widgets/user/logout-button";

export function Header() {
  const onTop = !useWindowScroll({ defaultValue: true });

  return (
    <NavHeader.Root
      staticMode={onTop}
      className="sticky top-[1rem] w-[calc(100%-2rem)] mx-auto z-header"
    >
      <NavHeader.SlotUnauthorizedButtons>
        {/* <Button variant="outline">Buy $SELLA</Button> */}

        <RegsiterFlowStartButton />
      </NavHeader.SlotUnauthorizedButtons>

      <NavHeader.SlotAuthorizedNavButtons>
        <NavHeader.NavIconButton href="/dashboard" end>
          <Icons.Building /> Stores
        </NavHeader.NavIconButton>

        <NavHeader.NavIconButton
          href="/dashboard/quests"
          activeOnHrefs={["/dashboard/quests"]}
        >
          <Icons.Coins /> Quests
        </NavHeader.NavIconButton>

        <NavHeader.NavIconButton href="/chats" activeOnHrefs={["/chats"]}>
          <Icons.Chat /> Chats
          <ChatOverallUnreadBadge className="absolute top-0 right-[0.5625rem] min-w-[1rem] h-[1rem]" />
        </NavHeader.NavIconButton>

        <OrdersPreferedButton />

        <LogoutButton />

        <UserSettingsButton />
      </NavHeader.SlotAuthorizedNavButtons>
    </NavHeader.Root>
  );
}

function UserSettingsButton() {
  const { data: user, isLoading } = useUserGetQuery();
  const setOpen = useUserProfileSettingsDialog((s) => s.setOpen);

  return (
    <Skeleton asChild loading={isLoading}>
      <Avatar
        className="text-[2.625rem] cursor-pointer transition border border-transparent hover:border-accent-100"
        name={user?.username}
        src={user?.avatarImage ?? undefined}
        onClick={() => setOpen(true)}
      />
    </Skeleton>
  );
}

function OrdersPreferedButton() {
  const [page] = useDashboardPreferedOrdersPage();
  const className = "min-w-[3.875rem]";

  return page == "orders" ? (
    <NavHeader.NavIconButton
      className={className}
      href={PATH_DASHBOARD_ORDERS_PAGE}
      activeOnHrefs={[PATH_DASHBOARD_ORDERS_PAGE]}
    >
      <Icons.Package /> Orders
    </NavHeader.NavIconButton>
  ) : (
    <NavHeader.NavIconButton
      className={className}
      href={PATH_DASHBOARD_SALES_PAGE}
      activeOnHrefs={[PATH_DASHBOARD_SALES_PAGE]}
    >
      <Icons.Package /> Sales
    </NavHeader.NavIconButton>
  );
}
