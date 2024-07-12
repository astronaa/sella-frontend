import { PageChatFrame } from "~/pages/chats";
import { RouteProps } from "../route-props";

export default function Page({ params }: RouteProps) {
	return <PageChatFrame productId={params.productId} />
}

export const revalidate = 0;