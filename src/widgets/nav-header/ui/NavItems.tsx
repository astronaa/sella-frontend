import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { Link } from "~/shared/ui/nav-link";

export function NavItems({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props} className={cn("flex items-start gap-[2rem]", className)}>
			<Link href="/marketplace">Explore</Link>
			<Link href="/#features">Features</Link>
			<Link href="/#whitepaper">Whitepaper</Link>
			<Link href="/#roadmap">Roadmap</Link>
		</div>
	);
}
