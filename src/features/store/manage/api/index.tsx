'use client';

import { z } from 'zod';
import { Store } from "~/shared/api/client"
import { zodValidate } from '~/shared/lib/zod-final-form';
import { apiClient } from "~/shared/api/client";
import { FormError } from '~/shared/lib/errors';
import { storeQueries } from '~/entities/store';

export const schema = apiClient.stores.schemaCreate.merge(
	z.object({
		previewImage: z.instanceof(File).optional()
	})
);

export type SchemaType = z.infer<typeof schema>;

export async function updateStore(store: Store, { previewImage, ...data }: SchemaType) {
	const { error, response } = await apiClient.stores.for(store.shortName)
		.update({
			name: data.name,
			shortName: data.shortName,
			description: data.description
		});

	if (response.status == 409) {
		throw new FormError({
			field: 'shortName',
			message: error?.message as unknown as string
		});
	}
	else if (error)
		throw error;

	if (previewImage)
		await apiClient.stores.for(store.shortName).setImage(previewImage);

	storeQueries.invalidateAll();

	return { ...store, ...data };
}

export const validateForm = zodValidate(schema);
