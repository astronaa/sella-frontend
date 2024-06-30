import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";

export function PointsButton({ points, disabled, ...rest }: { points: number } & ButtonProps) {
	return (
		<Button size='sm' {...rest} colorPalette={disabled ? 'lightgray' : 'accent'} disabled={disabled}>
			{points}
			<Icons.PointsIcon/>
		</Button>
	)
}
