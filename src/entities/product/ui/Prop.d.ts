import { Review } from "~/shared/api/client"
import { Product } from "~/shared/api/client"

export interface ProductProp {
	product: Product
}

export interface ProductReviewProps {
	review: Review
}

export interface PaymentProps {
	product: Product,
	onCheckout: (withChat: boolean) => void
}