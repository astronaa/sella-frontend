import { User } from "./model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

type Schemes = components['schemas'];

export const mapDtoToUser = ({ 
	profilePictureId, 
	username,
	email,
	telegramId,
	twitterId,
	...rest 
}: Schemes['User']) => ({
	...rest,
	email: email ?? null,
	username: username ?? null,
	twitterId: twitterId ?? null,
	telegramId: telegramId ?? null,
	avatarImage: profilePictureId ? mapMediaIdToUrl(profilePictureId) : null
}) satisfies User

export const mapDtoToUserShort = ({ username, profilePictureId }: Schemes["CommentUserDto"]) => ({
	username,
	avatarImage: profilePictureId ? mapMediaIdToUrl(profilePictureId) : null
}) satisfies User;