'use client';

import { IconButton } from "~/shared/ui/kit/button";
import { useChatPanelTabStrictContext } from "../../model/tabs";
import { Icons } from "~/shared/ui/icons";
import { ChatOverallUnreadBadge } from "~/entities/chat";

export function MobileHeader() {
	const { setTab } = useChatPanelTabStrictContext();

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

			<span>Sharon Bruce</span>
		</div>
	);
}