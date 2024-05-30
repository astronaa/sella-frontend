import { Store } from "~/shared/api/model";

export async function fetchStores(): Promise<Store[]> {
	return (Array
		.from({ length: 8 })
		.fill({
			id: 0,
			name: "First Store",
			shortName: "@storename",
			isVerified: true,
			description: "Market, Limit, Stop Limit, and Auction Mode orders.",
			previewImage: null,
			rating: {
				likes: 45,
				dislikes: 16,
				reviewsCount: 673,
			},
		}) as Store[])
		.map((item, index) => ({ ...item, id: index + 1 }))
}