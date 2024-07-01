import { ProductProp } from "~/entities/product";
import { useProductContextOrProp } from "./context";
import { RatingRow } from "~/shared/ui/rating";

export function Rating({ product: p, ...props }: Omit<RatingRow.RootProps, 'rating'> & Partial<ProductProp>) {
	const { rating } = useProductContextOrProp(p);

	if (!rating)
		return null;

	return (
		<RatingRow.Composed
			rating={rating}
			{...props}
		/>
	);
}