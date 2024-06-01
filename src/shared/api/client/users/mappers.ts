import { User } from "../../model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

export const mapDtoToUser = ({ profilePictureId, ...rest }: components['schemas']['User']): User => ({
	...rest,
	avatarImage: profilePictureId ? mapMediaIdToUrl(profilePictureId) : null
})