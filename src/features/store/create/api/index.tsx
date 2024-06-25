'use client';

import { z } from 'zod';
import { storeQueries } from '~/entities/store';
import { apiClient } from "~/shared/api/client";
import { FormError } from '~/shared/lib/errors';

export const schema = apiClient.stores.schemaCreate.merge(
	z.object({ previewImage: z.instanceof(File) })
);

export type SchemaType = z.infer<typeof schema>;

export async function createStore(values: SchemaType) {
	const { data, error } = await apiClient.stores.create(values);

	if(error){
		if (error.statusCode == 400) {
			throw new FormError(error.message as Record<string, string>);
		}
		throw new Error(error.message as unknown as string);
	}

	await apiClient.stores.for(data.url).setImage(values.previewImage);

	storeQueries.invalidateAll();

	return {
		...data,
		previewImage: URL.createObjectURL(values.previewImage)
	};
}