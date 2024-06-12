import { HTMLArkProps, ark } from "@ark-ui/react";
import { ProductProp } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import { Icons } from "~/shared/ui/icons";
import { useProductContextOrProp } from "./context";

export function Rating({ className, product: p, ...props }: HTMLArkProps<"div"> & Partial<ProductProp>) {
	const { rating } = useProductContextOrProp(p);

	if(!rating)
		return null;

	return (
		<ark.div
			className={cn("flex items-center gap-[0.75rem]", className)}
			{...props}
		>
			<span className="text-black-60 font-semibold">
				{rating.reviewsCount} Reviews
			</span>

			<div className="flex items-center gap-[0.75rem]">
				<div className="flex gap-[0.2rem] text-green-100 items-center font-semibold">
					<Icons.Likes className="size-[1rem]" />{" "}
					<span>{rating.likes}</span>
				</div>

				<div className="flex items-center gap-[0.4rem] text-red-100 font-semibold">
					<Icons.Dislikes className="size-[1rem]" />{" "}
					<span>{rating.dislikes}</span>
				</div>
			</div>
		</ark.div>
	);
}