import { PageChatFrame } from "~/pages/chats";
import { RouteProps } from "../route-props";

export default function Page({ params }: RouteProps) {
	return <PageChatFrame chatId={params.chatId} />
}

export const revalidate = 0;