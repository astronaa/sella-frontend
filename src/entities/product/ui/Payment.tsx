import { Icons } from "~/shared/ui/icons";
import { RadioGroup } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";
import { PaymentProps } from "./Prop";

const options = [
	{ id: 'sella', label: 'Pay with $SELLA', price: 0.89, oldPrice: 0.99 },
	{ id: 'usdt', label: 'Pay with $USDT', price: 0.99},
]

export function Payment({product, onCheckout}: PaymentProps) {
	return (
		<div className="border border-white-04 rounded-[20px] p-4 flex flex-col gap-8">
			<div className="flex flex-col gap-6">
				<div className="text-[18px]/[23.4px] font-semibold text-white-100">Choose Payment Method</div>
				<RadioGroup.Root>
					{options.map((option) => (
						<RadioGroup.Item key={option.id} value={option.id}>
							<RadioGroup.ItemControl />
							<RadioGroup.ItemText className="w-full">
								<div className="flex items-center justify-between">
									<div className="pay-option-label">{option.label}</div>
									<div className="flex items-center gap-1">
										<span>{option.price}</span>
										<span className="line-through text-black-60">{option.oldPrice}</span>
										<Icons.CurrencyUsdt/>
									</div>
								</div>
							</RadioGroup.ItemText>
						</RadioGroup.Item>
					))}
				</RadioGroup.Root>
			</div>
			<div className="flex flex-col gap-4">
				<Button variant="solid" onClick={() => onCheckout(false)}>Checkout</Button>
				<Button colorPalette="gray" onClick={() => onCheckout(true)}>Chat with a seller</Button>
			</div>
		</div>
	)
}