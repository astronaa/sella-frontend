import { Product } from "./model";
import { components } from "../../openapi";
import { mapDtoToRating, mapMediaIdToUrl } from "../shared/mappers";
import { mapDtoToUser } from "../users/mappers";
import { mapDtoToStore } from "../stores/mappers";

type Schemes = components['schemas'];

export const mapDtoToProduct = (obj: 
	Schemes['ProductDto'] 
	| Schemes['BaseProductDto'] 
	| Schemes['ProductDetailsDTO']
	| Schemes['EnumeratedProductDto']
) => {
	const mappedImages = obj.imageIds.map(mapMediaIdToUrl);

	const imagesConfig = obj.hasPreview ? {
		previewImage: mappedImages[0],
		galleryImages: mappedImages.slice(1)
	} : {
		previewImage: null,
		galleryImages: mappedImages
	}

	return {
		id: obj.id,
		name: obj.name,
		price: 'price' in obj ? Number(obj.price) : undefined,
		description: 'description' in obj ? (obj.description ?? null) : undefined,
		shortDescription: 'shortDescription' in obj ? obj.shortDescription : undefined,
		hasPreview: obj.hasPreview,
		imageIds: obj.imageIds,
		storeUrl: 'storeUrl' in obj ? obj.storeUrl : undefined,
		isFrozen: 'isFrozen' in obj ? obj.isFrozen : undefined,
		tagNames: 'tagNames' in obj ? obj.tagNames : undefined,
		holdPeriod: 'holdPeriod' in obj ? obj.holdPeriod : undefined,
		...imagesConfig,
		rating: 'rating' in obj ? mapDtoToRating(obj.rating) : undefined,
		store: 'store' in obj ? {
			...mapDtoToStore(obj.store),
			owner: {
				...mapDtoToUser(obj.storeOwner),
				overallRating: mapDtoToRating(obj.storeOwner.rating)
			}
		} : undefined	
	} satisfies Product;
};