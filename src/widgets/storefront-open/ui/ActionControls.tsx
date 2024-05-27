import { HTMLAttributes } from "react";
import { StoreInputAddon } from "~/entities/store";
import { cn } from "~/shared/lib/cn";
import { Button } from "~/shared/ui/kit/button";
import { Input, InputGroup } from "~/shared/ui/kit/input";

export function ActionControls({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props} className={cn("flex gap-[1rem] flex-wrap", className)}>
			<StoreInputAddon>
				{({ Component: Addon, inputClassName }) => (
					<InputGroup>
						<Input
							className={cn("rounded-[1.25rem] border border-secondary w-full h-full", inputClassName)}
							placeholder="yourstorefront"
						/>
						<Addon className='text-white' />
					</InputGroup>
				)}
			</StoreInputAddon>

			<Button className="w-full md:w-auto" size="xl">
				Open Storefront
			</Button>
		</div>
	);
}
