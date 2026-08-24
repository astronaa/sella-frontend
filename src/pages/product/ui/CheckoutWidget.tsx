'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProductStrictContext } from "~/entities/product";
import { useUserGetQuery } from "~/entities/user";
import { OrderCreateBaseCard } from "~/features/order/create";
import { ProductManageDialog } from "~/features/product/manage";
import { useRegisterFlow } from "~/features/register";
import { objToSearchParams } from "~/shared/lib/search-params";
import { Button } from "~/shared/ui/kit/button";
import { Skeleton } from "~/shared/ui/kit/skeleton";

export function CheckoutWidget() {
	const product = useProductStrictContext();
	const router = useRouter();
	const startFlow = useRegisterFlow(s => s.startFlow);
	const { data: user } = useUserGetQuery();
	void startFlow;

	return (
		<OrderCreateBaseCard
			title='Choose Payment Method'
			product={product}
		>
			{({ disabled, ...method }) => (
				disabled === true ? (
					<ProductManageDialog
						product={product}
						triggerElement={
							<Button
								className='w-full'
								variant="solid"
							>
								Edit Product
							</Button>
						}
					/>
				) : (
					<div className="flex flex-col gap-4">
						<Skeleton asChild loading={disabled === undefined}>
							<Link
								className='w-full'
								href={`${product.id}/checkout?${objToSearchParams({ tab: 'order-actions', ...method })}`}
								onClick={e => {
									if (!user) {
										e.preventDefault();
										e.stopPropagation();

										// Demo mode: signed-out checkout opens the order
										// preview. When the backend is live, restore:
										// startFlow(true);
										router.push(`/products/${product.id}/demo-order`);
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
						</Skeleton>

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
				)
			)}
		</OrderCreateBaseCard>
	)
}