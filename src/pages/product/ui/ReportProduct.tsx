'use client';

import { ProductReportFlow } from "~/features/product/report";
import { productQueries, useProductStrictContext } from "~/entities/product";
import { useUserGetQuery } from "~/entities/user";
import { useQuery } from "@tanstack/react-query";

export function ReportProduct() {
	const product = useProductStrictContext();
	const { data: user, isLoading: isUserLoading } = useUserGetQuery()

	const { data: reportData, isLoading: isReportLoading } = useQuery({
		...productQueries.getGetProductReportOptions({
			productId: product.id,
		}),
		retry: false
	})

	const isMyProduct = product.store?.owner.username === user?.username

	if(isMyProduct || isReportLoading || reportData || isUserLoading) {
		return null
	}

	return (
		<ProductReportFlow product={product}/>
	)
}
