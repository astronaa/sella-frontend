'use client';

import Link from "next/link";
import { useProductStrictContext } from "~/entities/product";
import { useUserGetQuery } from "~/entities/user";
import { OrderCreateBaseCard } from "~/features/order/create";
import { useRegisterFlow } from "~/features/register";
import { objToSearchParams } from "~/shared/lib/search-params";
import { Button } from "~/shared/ui/kit/button";

export function CheckoutWidget() {
	const product = useProductStrictContext();
	const startFlow = useRegisterFlow(s => s.startFlow);
	const { data: user } = useUserGetQuery();

	return (
		<OrderCreateBaseCard
			title='Choose Payment Method'
			product={product}
		>
			{({ disabled, ...method }) => (
				<div className="flex flex-col gap-4">
					<Link
						className='w-full'
						href={`${product.id}/checkout?${objToSearchParams({ tab: 'order-actions', ...method })}`}
						onClick={e => {
							if(!user) {
								e.preventDefault();
								e.stopPropagation();

								startFlow(true);
							}
						}}
					>
						<Button
							className='w-full'
							variant="solid"
							disabled={disabled}
						>
							Checkout
						</Button>
					</Link>

					{!!user && (
						<Link
							className='w-full'
							href={`${product.id}/checkout?${objToSearchParams({ tab: 'chat', ...method })}`}
						>
							<Button
								className='w-full'
								colorPalette="gray"
								disabled={disabled}
							>
								Chat with a seller
							</Button>
						</Link>
					)}
				</div>
			)}
		</OrderCreateBaseCard>
	)
}