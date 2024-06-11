import {
	Product,
	ProductCarousel,
	ProductRate,
	ProductReview,
} from "~/shared/api/model";

export interface ProductProp {
  product: Product
}

export type ProductCarouseProps = ProductCarousel;

export interface ProductRateProps {
  rates: ProductRate;
}

export interface ProductReviewProps {
	review: ProductReview
}

export interface PaymentProps {
	product: Product,
	onCheckout: (withChat: boolean) => void
}