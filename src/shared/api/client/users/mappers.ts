import { User } from "../../model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

export const mapDtoToUser = ({ 
	profilePictureId, 
	username,
	email,
	telegramId,
	twitterId,
	...rest 
}: components['schemas']['User']): User => ({
	...rest,
	email: email ?? null,
	username: username ?? null,
	twitterId: twitterId ?? null,
	telegramId: telegramId ?? null,
	avatarImage: profilePictureId ? mapMediaIdToUrl(profilePictureId) : null
})