import { API_BASE_URL } from "~/shared/config/api-base-url";

export const mapMediaIdToUrl = (mediaId: string) =>
	new URL(`/api/media/${mediaId}`, API_BASE_URL).toString();

export const mapMediaUrlToId = (mediaUrl: string) =>
	mediaUrl.split('/').pop()!;