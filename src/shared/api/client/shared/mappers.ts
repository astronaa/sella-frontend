import { API_BASE_URL } from "~/shared/config/api-base-url";
import { PayloadPagination } from "./schemas";
import { components } from "../../openapi";
import { PaymentMethod } from "./models";

type Schemas = components['schemas'];

export const mapMediaIdToUrl = (mediaId: string) =>
	new URL(`/api/media/${mediaId}`, API_BASE_URL).toString();

export const mapMediaUrlToId = (mediaUrl: string) =>
	mediaUrl.split('/').pop()!;

export const mapPaginationPayloadToDto = (obj: PayloadPagination) => ({
	page: obj.page,
	pageSize: obj.limit
});

export const mapDtoToPaymentMethod = (obj: Schemas['PaymentMethod']): PaymentMethod => (
	obj
);