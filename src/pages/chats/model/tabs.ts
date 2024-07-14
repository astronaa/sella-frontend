import { Dispatch, SetStateAction } from "react";
import { createContextFactory } from "~/shared/lib/create-context-factory"

export type PossibleTabs = 'chats-list' | 'chat'

interface Context {
	tab: PossibleTabs,
	setTab: Dispatch<SetStateAction<PossibleTabs>>
}

const create = createContextFactory('chatPanelTab');

export const {
	useChatPanelTabStrictContext,
	ChatPanelTabProvider
} = create<Context>();