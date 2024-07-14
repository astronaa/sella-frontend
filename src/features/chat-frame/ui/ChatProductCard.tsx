import { ProductCard, ProductLink } from "~/entities/product";
import { cn } from "~/shared/lib/cn";

export function ChatProductCard({ className, ...props }: ProductCard.RootProps) {
	return (
		<ProductCard.Root
			{...props}
			className={cn("flex-row p-[0.5rem] gap-[1rem] items-center", className)}
			asChild
		>
			<ProductLink>
				<ProductCard.Image className="size-[3.875rem]" />
				<ProductCard.Content className="px-0 gap-[0.5rem]">
					<ProductCard.Title />
					<ProductCard.Price />
				</ProductCard.Content>
			</ProductLink>
		</ProductCard.Root>
	);
}
