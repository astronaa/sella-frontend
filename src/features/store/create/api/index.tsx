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
	const { data, error } = await apiClient.stores.create({
		url: values.url,
		name: values.name,
		description: values.description
	});

	if (error?.statusCode == 409) {
		throw new FormError({
			field: 'url',
			message: error.message
		});
	}
	else if (error)
		throw error;

	await apiClient.stores.for(data.url).setImage(values.previewImage);

	storeQueries.invalidateAll();

	return {
		...data,
		previewImage: URL.createObjectURL(values.previewImage)
	};
}