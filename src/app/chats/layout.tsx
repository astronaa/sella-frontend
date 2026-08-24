'use client';

import { PropsWithChildren } from "react";
import { PageChatsRoot } from "~/pages/chats";
import { useUserGetQuery } from "~/entities/user";

/**
 * Demo mode: the real chats shell (list + socket queries) only mounts
 * for signed-in users; signed-out visitors get the scripted preview
 * rendered by page.tsx. Restore `export { PageChatsRoot as default }`
 * at launch.
 */
export default function ChatsLayout({ children }: PropsWithChildren) {
	const { data: user } = useUserGetQuery();

	if (!user) return <>{children}</>;

	return <PageChatsRoot>{children}</PageChatsRoot>;
}
