import {
	Product,
	ProductRate,
	Review,
} from "~/shared/api/model";

export interface ProductProp {
  product: Product
}

export interface ProductRateProps {
  rates: ProductRate;
}

export interface ProductReviewProps {
	review: Review
}

export interface PaymentProps {
	product: Product,
	onCheckout: (withChat: boolean) => void
}