import { ProductCard, ProductProp } from "~/entities/product";
import { cn } from "~/shared/lib/cn";

export function PageProductCard({ className, ...props }: ProductCard.RootProps & ProductProp) {
	return (
		<ProductCard.Root
			{...props}
			className={cn('flex-row p-[0.5rem] gap-[1rem] items-center', className)}
		>
			<ProductCard.Image className='size-[5rem]' />
			<ProductCard.Content className='px-0 gap-[0.5rem]'>
				<ProductCard.Title />
				<ProductCard.Price />
			</ProductCard.Content>
		</ProductCard.Root>
	);
}