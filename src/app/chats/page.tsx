'use client';

import { PageChatInitialSection } from "~/pages/chats";
import { useUserGetQuery } from "~/entities/user";
import { ChatsPreview } from "./ChatsPreview";

/**
 * Demo mode: signed-out visitors see the scripted chat inbox preview.
 * Restore the plain PageChatInitialSection page at launch.
 */
export default function Page() {
	const { data: user, isLoading } = useUserGetQuery();

	if (isLoading) return null;

	if (user) return <PageChatInitialSection className='size-full' />;

	return <ChatsPreview />;
}
