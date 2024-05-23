import { Hero } from "./Hero";
import { Reviews } from "./Reviews";

export function Component() {
	return (
		<div className="flex items-start gap-16 mx-auto max-w-content">
			<div className="w-[65.52%] max-w-[760px] flex flex-col gap-16">
				<Hero />
				<Reviews />
			</div>
		</div>
	);
}
