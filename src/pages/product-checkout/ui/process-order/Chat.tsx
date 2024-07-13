'use client';

import { useQuery } from "@tanstack/react-query";
import { chatQueries } from "~/entities/chat";
import { ChatFrame } from "~/features/chat-frame";
import { OrderId } from "~/shared/api/client";

export function ChatFrameByOrder({ orderId }: { orderId: OrderId }) {
	const { data } = useQuery({
		...chatQueries.getFromOrderOptions(orderId),
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