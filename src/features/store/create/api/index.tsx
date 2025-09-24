'use client';

import { z } from 'zod';
import { storeQueries } from '~/entities/store';
import { apiClient } from "~/shared/api/client";
import { FormError } from '~/shared/lib/errors';

const fileSchema = typeof File !== 'undefined'
	? z.instanceof(File)
	: z.any().refine(val => val && typeof val.name === 'string' && typeof val.size === 'number', {
		message: "Expected a File object"
	});

export const schema = apiClient.stores.schemaCreate.merge(
	z.object({ previewImage: fileSchema })
);

export type SchemaType = z.infer<typeof schema>;

export async function createStore(values: SchemaType) {
	const { data, error } = await apiClient.stores.create(values);

	if(error){
		if (error.statusCode == 400) {
			throw new FormError(error.message as Record<string, string>);
		}else if(error.statusCode === 409){
			throw new FormError({url: error.message as unknown as string});
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