import { ToggleGroup } from '~/shared/ui/kit';
import { cn } from "~/shared/lib/cn";
import { VToggleGroup } from '~/shared/ui/validation-inputs';

type ToggleGroupFieldProps = VToggleGroup.RootProps & {
	options: {
		id: string
		label: string
	}[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ToggleGroupField({ options, className, class: c, ...props }: ToggleGroupFieldProps) {
	return (
		<VToggleGroup.Root
			className={cn('flex flex-wrap justify-center px-[1.906rem] max-md:px-0', className)}
			multiple
			{...props}
		>
			{options.map(({ id, label }) => (
				<ToggleGroup.Item key={id} value={id} aria-label={label}>
					{label}
				</ToggleGroup.Item>
			))}

			<VToggleGroup.ErrorText />
		</VToggleGroup.Root>
	)
}
