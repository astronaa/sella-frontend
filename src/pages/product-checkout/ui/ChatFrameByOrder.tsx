'use client';

import { useQuery } from "@tanstack/react-query";
import { chatQueries } from "~/entities/chat";
import { ChatFrame } from "~/features/chat-frame";
import { OrderId } from "~/shared/api/client";

export function ChatFrameByOrder({ orderId }: { orderId: OrderId }) {
	const { data: chat } = useQuery({
		...chatQueries.getFromOrderOptions(orderId),
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