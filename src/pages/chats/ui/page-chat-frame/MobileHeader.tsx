'use client';

import { IconButton } from "~/shared/ui/kit/button";
import { useChatPanelTabStrictContext } from "../../model/tabs";
import { Icons } from "~/shared/ui/icons";
import { ChatOverallUnreadBadge, chatQueries } from "~/entities/chat";
import { ChatId } from "~/shared/api/client";
import { useQuery } from "@tanstack/react-query";

export function MobileHeader({ chatId }: { chatId: ChatId }) {
	const { setTab } = useChatPanelTabStrictContext();
	const { data } = useQuery({
		...chatQueries.getByIdOptions(chatId),
		staleTime: Infinity,
		refetchOnWindowFocus: false
	});

	return (
		<div className='flex items-center justify-center relative'>
			<IconButton
				variant='unstyled'
				className='border-none absolute left-0'
				onClick={() => setTab('chats-list')}
			>
				<Icons.ChevronLeft />
				<ChatOverallUnreadBadge />
			</IconButton>

			<span>{data?.chat.buyer.username}</span>
		</div>
	);
}