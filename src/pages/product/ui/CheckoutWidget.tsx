'use client';

import Link from "next/link";
import { useProductStrictContext } from "~/entities/product";
import { Icons } from "~/shared/ui/icons";
import { RadioGroup } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";

const options = [
	{ id: 'sella', label: 'Pay with $SELLA' },
	{ id: 'usdt', label: 'Pay with $USDT' },
]

export function CheckoutWidget() {
	const product = useProductStrictContext();

	return (
		<div className="border border-white/[.04] rounded-[1.25rem] p-4 flex flex-col gap-8">
			<div className="flex flex-col gap-6">
				<div className="text-[1.125rem]/[1.4625rem] font-semibold text-white">Choose Payment Method</div>
				<RadioGroup.Root>
					{options.map((option) => (
						<RadioGroup.Item key={option.id} value={option.id}>
							<RadioGroup.ItemControl />
							<RadioGroup.ItemText className="w-full">
								<div className="flex items-center justify-between">
									<span>{option.label}</span>
									<div className="flex items-center gap-1">
										<span>{product.price}</span>
										<Icons.CurrencyUsdt />
									</div>
								</div>
							</RadioGroup.ItemText>
						</RadioGroup.Item>
					))}
				</RadioGroup.Root>
			</div>
			<div className="flex flex-col gap-4">
				<Button variant="solid" asChild>
					<Link href={`${product.id}/checkout?tab=order-actions`}>
						Checkout
					</Link>
				</Button>
				<Button colorPalette="gray" asChild>
					<Link href={`${product.id}/checkout?tab=chat`}>
						Chat with a seller
					</Link>
				</Button>
			</div>
		</div>
	)
}