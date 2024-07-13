'use client';

import { useQuery } from "@tanstack/react-query";
import { chatQueries } from "~/entities/chat";
import { ChatFrame } from "~/features/chat-frame";
import { ProductId } from "~/shared/api/client";

export function ChatFrameByProduct({ productId }: { productId: ProductId }) {
	const { data } = useQuery({
		...chatQueries.getFromProductOptions(productId),
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