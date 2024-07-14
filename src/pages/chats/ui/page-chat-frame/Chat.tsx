'use client';

import { useQuery } from "@tanstack/react-query";
import { chatQueries } from "~/entities/chat";
import { ChatFrame } from "~/features/chat-frame";
import { ChatId } from "~/shared/api/client";

export function ChatFrameById({ chatId }: { chatId: ChatId }) {
	const { data } = useQuery({
		...chatQueries.getById(chatId),
		staleTime: Infinity,
		refetchOnWindowFocus: false
	});

	return (
		<ChatFrame
			chat={data?.chat ?? null}
			accessToken={data?.accessToken ?? null}
			className='w-full'
		/>
	);
}