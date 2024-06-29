import { ProductId } from "~/shared/api/client"
import { Button } from "~/shared/ui/kit/button";

interface DeleteButtonProps {
	productId: ProductId,
	onActionFulfilled?: () => void
}

export function DeleteButton({ onActionFulfilled }: DeleteButtonProps) {
	return (
		<Button
			variant='subtle' colorPalette='red'
			size='lg' onClick={onActionFulfilled}
		>
			Remove Product
		</Button>
	);
}
