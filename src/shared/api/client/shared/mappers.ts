import { API_BASE_URL } from "~/shared/config/api-base-url";
import { PayloadPagination } from "./schemas";
import { components } from "../../openapi";
import { PaymentMethod, Rating, Transaction } from "./models";

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

export const mapDtoToRating = (obj: Schemas['RatingDto']): Rating => ({
	likes: obj.positive,
	dislikes: obj.negative,
	reviewsCount: obj.total
})

export const mapDtoToTransaction = (
	obj: Schemas['OrderInfoDto'] | Schemas['SalesInfoDto']
): Transaction => ({
	status: obj.status,
	fulfillmentStatus: obj.fulfillmentStatus,
	createdAt: obj.createdAt,
	transactionUrl: '',
	totalPaid: obj.price,
	tokenAmount: obj.tokenAmount,
	block: obj.blockchain,
	token: obj.token,
})