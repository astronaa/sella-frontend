import { components } from "../../openapi";
import { mapDtoToUser } from "../users/mappers";
import { Chat, ChatMessage } from "./model";

type Schemes = components['schemas'];

export const mapDtoToChat = ({ chatId, ...rest }: Schemes['ChatResponseDto']) => ({
	id: chatId,
	...rest
}) satisfies Chat

export const mapDtoToChatMessage = (dto: Schemes['MessageDto']) => ({
	...dto,
	sender: mapDtoToUser(dto.sender)
}) satisfies ChatMessage