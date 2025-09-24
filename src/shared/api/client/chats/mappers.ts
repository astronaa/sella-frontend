import { components } from "../../openapi";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToUser, mapBaseUserDtoToUser } from "../users/mappers";
import { Chat, ChatMessage } from "./model";

type Schemes = components['schemas'];

export const mapDtoToChat = (obj: Schemes['ChatDTO']): Chat => ({
	id: obj.id,
	buyer: mapBaseUserDtoToUser(obj.buyer),
	product: mapDtoToProduct(obj.product),
	// @ts-expect-error expecting openapi changes
	lastMessage: obj.lastMessage ? mapDtoToChatMessage(obj.lastMessage) : null,
	unreadMessagesCount: obj.unreadMessagesCount,
	isFrozen: obj.isFrozen
}) // satisfies Chat

export const mapDtoToChatMessage = (dto: Schemes['MessageDto']): ChatMessage => ({
	id: dto.id,
	chatId: dto.chatId,
	content: dto.content,
	createdAt: dto.createdAt, 
	fileIds: dto.fileIds,
	readAt: dto.readAt,
	isSystem: dto.isSystem,
	systemType: dto.systemType,
	systemData: dto.systemData,
	sender: mapDtoToUser(dto.sender)
}) // satisfies ChatMessage