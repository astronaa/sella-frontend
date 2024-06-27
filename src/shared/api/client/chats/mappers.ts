import { components } from "../../openapi";
import { mapDtoToUserShort } from "../users/mappers";
import { Chat, ChatMessage } from "./model";

type Schemes = components['schemas'];

export const mapDtoToChat = ({ chatId, ...rest }: Schemes['ChatResponseDto']) => ({
	id: chatId,
	...rest
}) satisfies Chat

export const mapDtoToChatMessage = (dto: Schemes['MessageDto']) => ({
	...dto,
	sender: mapDtoToUserShort(dto.sender)
}) satisfies ChatMessage