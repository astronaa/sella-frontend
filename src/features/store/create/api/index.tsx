'use client';
import { z } from 'zod';
import { apiClient } from "~/shared/api/client";
import { queryClient } from '~/shared/config/query-client';
import { FormError } from '~/shared/lib/errors';
import { zodValidate } from '~/shared/lib/zod-final-form';

export const schema = apiClient.stores.schemaCreate.merge(
	z.object({
		previewImage: z.instanceof(File)
	})
);

export type SchemaType = z.infer<typeof schema>;

export async function createStore(values: SchemaType) {
	const { data, error } = await apiClient.stores.create({
		shortName: values.shortName,
		name: values.name,
		description: values.description
	});

	if (error?.statusCode == 409) {
		throw new FormError({
			field: 'shortName',
			message: error.message
		});
	}
	else if (error)
		throw error;

	await apiClient.stores.for(data.shortName).setImage(values.previewImage);

	queryClient.invalidateQueries({ queryKey: ['stores'] });

	return {
		...data,
		previewImage: URL.createObjectURL(values.previewImage)
	};
}

export const validateForm = zodValidate(schema);