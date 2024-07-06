import { User } from "./model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

type Schemes = components['schemas'];

export const mapDtoToUser = ({ 
	profilePictureId, 
	username,
	...obj 
}: Schemes['User'] | Schemes["BaseUserDto"]) => ({
	username: username ?? null,
	avatarImage: profilePictureId ? mapMediaIdToUrl(profilePictureId) : null,
	email: 'email' in obj ? (obj.email ?? null) : undefined,
	twitterId: 'twitterId' in obj ? (obj.twitterId ?? null) : undefined,
	telegramId: 'telegramId' in obj ? (obj.telegramId ?? null) : undefined,
	address: 'address' in obj ? obj.address : undefined,
	tronAddress: 'tronAddress' in obj ? (obj.tronAddress ?? null) : undefined,
	refCode: 'refCode' in obj ? obj.refCode : undefined,
	createdAt: 'createdAt' in obj ? obj.createdAt : undefined
}) satisfies User