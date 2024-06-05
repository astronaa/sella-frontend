import {
	PayloadCreate,
	PayloadUpdate,
	PayloadUploadImages,
	schemaCreate,
	schemaUpdate,
	schemaUploadImages
} from "./schemas";

import { Product, ProductId } from "../../model";
import { authFetchClient } from "../fetch-client";
import { mapDtoToProduct } from "./mappers";
import { invariant } from "~/shared/lib/asserts";

export function createProductsClient() {
	return {
		async create(storeUrl: string, payload: PayloadCreate) {
			const { data, error } = await authFetchClient.POST('/api/products', {
				body: { storeUrl, ...payload }
			});

			return data ? {
				data: mapDtoToProduct(data), error
			} : {
				data, error
			}
		},

		for: (productId: ProductId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/products/{id}', {
					params: { path: { id: productId } }
				});

				return data ? {
					data: mapDtoToProduct(data), error
				} : {
					data, error
				}
			},
			async update(payload: PayloadUpdate) {
				const { data, error } = await authFetchClient.PATCH('/api/products/{id}', {
					params: { path: { id: productId } },
					body: payload
				});

				return data ? {
					data: mapDtoToProduct(data), error
				} : {
					data, error
				}
			},
			async uploadImages(
				initialState: Pick<Product, 'imageIds' | 'hasPreview'>,
				payload: PayloadUploadImages,
			) {
				if (payload.previewImage === undefined && payload.galleryImages === undefined)
					return false;

				const syncImages = async (input: (File | string)[]) => {
					const filesToUpload = input.filter((i): i is File => i instanceof File);
					if (!filesToUpload.length)
						return input.filter((i): i is string => typeof i == 'string');

					const { data } = await authFetchClient.POST('/api/products/{id}/images', {
						params: { path: { id: productId } },
						body: { file: [] },
						bodySerializer: () => {
							const formData = new FormData();
							filesToUpload.forEach(f => formData.append('file', f));
							console.log(filesToUpload, formData.getAll('file'))
							return formData;
						}
					});

					const uploadedImages = data?.imageIds;
					const uploadedImagesCount = uploadedImages?.length;
					if (!uploadedImages || !uploadedImagesCount)
						return []

					invariant(uploadedImagesCount == filesToUpload.length, 'Upload images endpoint works incorrect');

					// синхронизируем только что загруженные файлы с уже загруженными:
					// на место File в изначальном массиве подставляем новые соответствующие айдишники загруженных файлов
					let index = 0;
					return input.map(img => img instanceof File ? data.imageIds[index++] : img)
				}

				const patch = async (payload: { imageIds: string[], hasPreview: boolean }) => {
					const { error } = await authFetchClient.PATCH('/api/products/{id}', {
						params: { path: { id: productId } }, body: payload
					});
					return !error;
				}

				if (payload.previewImage !== undefined && payload.galleryImages !== undefined) {
					const imagesToUpload = payload.galleryImages;
					if (payload.previewImage !== null)
						imagesToUpload.unshift(payload.previewImage);

					const uploadedFileIds = await syncImages(imagesToUpload);

					return await patch({
						hasPreview: payload.previewImage !== null,
						imageIds: uploadedFileIds
					})
				}
				else if (payload.previewImage !== undefined) {
					const imagesToUpload: (File | string)[] = initialState.imageIds;

					if (initialState.hasPreview)
						imagesToUpload.pop();

					if (payload.previewImage !== null)
						imagesToUpload.unshift(payload.previewImage);

					const uploadedFileIds = await syncImages(imagesToUpload);

					return await patch({
						hasPreview: payload.previewImage !== null,
						imageIds: uploadedFileIds
					})
				}
				else if (payload.galleryImages !== undefined) {
					const uploadedFileIds = await syncImages(payload.galleryImages);
					if (initialState.hasPreview && initialState.imageIds[0])
						uploadedFileIds.unshift(initialState.imageIds[0])

					return await patch({
						hasPreview: initialState.hasPreview,
						imageIds: uploadedFileIds
					})
				}

				return false;

				// // сливаем все (File | string) в один массив. Превью на первое место.
				// const allDefinedImagesInPayload = payload.galleryImages ?? initialState.imageIds;
				// if (payload.previewImage)
				// 	allDefinedImagesInPayload.unshift(payload.previewImage);
				// else if(payload.previewImage == null && initialState.hasPreview)
				// 	allDefinedImagesInPayload.pop();

				// const imagesToUpload = allDefinedImagesInPayload.filter((i): i is File => i instanceof File) ?? [];
				// let imageIdsToSet: string[] = [];

				// if (imagesToUpload.length) {
				// 	// загружаем файлы, если они есть в массиве. Получаем соответствующие айдишники загруженных фотографий
				// 	const { data } = await authFetchClient.POST('/api/products/{id}/images', {
				// 		params: { path: { id: productId } },
				// 		body: { file: [] },
				// 		bodySerializer: () => {
				// 			const formData = new FormData();
				// 			imagesToUpload.forEach(f => formData.set('file', f));
				// 			return formData;
				// 		}
				// 	});

				// 	const uploadedImages = data?.imageIds;
				// 	const uploadedImagesCount = uploadedImages?.length;
				// 	if (uploadedImages && uploadedImagesCount) {
				// 		invariant(uploadedImagesCount == imagesToUpload.length);

				// 		// синхронизируем только что загруженные файлы с уже загруженными:
				// 		// на место File в изначальном массиве подставляем новые соответствующие айдишники загруженных файлов
				// 		let index = 0;
				// 		imageIdsToSet = allDefinedImagesInPayload.map(img => img instanceof File ? data.imageIds[index++] : img)
				// 	}
				// }

				// const { error } = await authFetchClient.PATCH('/api/products/{id}', {
				// 	params: { path: { id: productId } },
				// 	body: {
				// 		imageIds: imageIdsToSet,
				// 		hasPreview: payload.previewImage !== undefined  
				// 			? (payload.previewImage !== null)
				// 			: initialState.hasPreview
				// 	}
				// });

				// return !error;
			},
		}),


		schemaCreate,
		schemaUpdate,
		schemaUploadImages,
	}
}
