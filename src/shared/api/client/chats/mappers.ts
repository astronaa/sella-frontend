import { components } from "../../openapi";
import { Chat } from "./model";

type Schemes = components['schemas'];

export const mapDtoToChat = ({ chatId, ...rest }: Schemes['ChatResponseDto']) => ({
	id: chatId,
	...rest
}) satisfies Chat