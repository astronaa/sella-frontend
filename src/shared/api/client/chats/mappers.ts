import { components } from "../../openapi";
import { mapDtoToProduct } from "../products/mappers";
import { productMock } from "../products/mock";
import { mapDtoToUser } from "../users/mappers";
import { Chat, ChatMessage } from "./model";

type Schemes = components['schemas'];

export const mapDtoToChat = (obj: Schemes['ChatResponseDto']) => ({
	id: obj.chatId,
	buyerId: obj.buyerId,
	sellerId: obj.sellerId,
	product: obj.product ? mapDtoToProduct(obj.product) : productMock,
	lastMessages: obj.messages?.map(mapDtoToChatMessage) ?? []
}) satisfies Chat

export const mapDtoToChatMessage = (dto: Schemes['MessageDto']) => ({
	...dto,
	sender: mapDtoToUser(dto.sender)
}) satisfies ChatMessage