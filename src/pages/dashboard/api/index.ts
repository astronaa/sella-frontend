import { Store } from "~/shared/api/model";

export async function fetchMyStorefronts(): Promise<Store[]> {
	return [
		{
			id: '1',
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
		},
		{
			id: '2',
			name: "Second Store",
			shortName: "@storename",
			isVerified: true,
			description: "Market, Limit, Stop Limit, and Auction Mode orders.",
			previewImage: null,
			rating: {
				likes: 45,
				dislikes: 16,
				reviewsCount: 673,
			},
		},
		{
			id: '3',
			name: "Third Store",
			shortName: "@storename",
			isVerified: true,
			description: "Market, Limit, Stop Limit, and Auction Mode orders.",
			previewImage: null,
			rating: {
				likes: 45,
				dislikes: 16,
				reviewsCount: 673,
			},
		},
	]
}