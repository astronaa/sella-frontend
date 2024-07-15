'use client';

import { useQuery } from "@tanstack/react-query";
import { chatQueries } from "~/entities/chat";
import { ChatFrame } from "~/features/chat-frame";
import { ChatId } from "~/shared/api/client";

export function ChatFrameById({ chatId }: { chatId: ChatId }) {
	const { data: chat } = useQuery({
		...chatQueries.getByIdOptions(chatId),
		staleTime: Infinity,
		refetchOnWindowFocus: false
	});

	return (
		<ChatFrame
			chat={chat ?? null}
			className='w-full'
		/>
	);
}