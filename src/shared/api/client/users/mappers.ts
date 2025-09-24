import { User } from "./model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";
import { mapDtoToQuest } from "../quests/mappers";

type Schemas = components['schemas'];

export const mapDtoToUser = (dto: Schemas['User']): User => ({
	id: dto.id,
	avatarImage: dto.profilePictureId ? mapMediaIdToUrl(dto.profilePictureId) : null,
	address: dto.address,
	username: dto.username,
	email: dto.email ?? null,
	twitterId: dto.twitterId ?? null,
	twitterUsername: dto.twitterUsername ?? null,
	telegramId: dto.telegramId ?? null,
	refCode: dto.refCode,
	invitedBy: dto.invitedBy,
	points: dto.points,
	tronAddress: dto.tronAddress ?? null,
	lastOnline: dto.lastOnline,
	completedQuests: dto.completedQuests?.map(mapDtoToQuest) || [],
	createdAt: dto.createdAt
})

export const mapCommentUserDtoToUser = (dto: Schemas['CommentUserDto']): Pick<User, 'username' | 'avatarImage'> => ({
	username: dto.username,
	avatarImage: dto.profilePictureId ? mapMediaIdToUrl(dto.profilePictureId) : null
})

export const mapBaseUserDtoToUser = (dto: Schemas['BaseUserDto']): Pick<User, 'username' | 'avatarImage'> => ({
	username: dto.username,
	avatarImage: dto.profilePictureId ? mapMediaIdToUrl(dto.profilePictureId) : null
})

export const mapSellerDtoToUser = (dto: Schemas['SellerDto']): Pick<User, 'username' | 'avatarImage' | 'address' | 'tronAddress'> => ({
	username: dto.username,
	avatarImage: dto.profilePictureId ? mapMediaIdToUrl(dto.profilePictureId) : null,
	address: dto.address,
	tronAddress: dto.tronAddress ?? null
})

export const mapStoreOwnerDtoToUser = (dto: Schemas['StoreOwnerDto']): Pick<User, 'username' | 'avatarImage'> => ({
	username: dto.username,
	avatarImage: dto.profilePictureId ? mapMediaIdToUrl(dto.profilePictureId) : null
})