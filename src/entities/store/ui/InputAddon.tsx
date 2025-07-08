import { ComponentType, HTMLAttributes, ReactNode } from "react";
import { cn } from "~/shared/lib/cn";

type AddonProps = HTMLAttributes<HTMLSpanElement>;

interface InputAddonProps {
  children: (args: {
    Component: ComponentType<AddonProps>;
    inputClassName: string;
  }) => ReactNode;
}

export function InputAddon({ children }: InputAddonProps) {
	return children({
		Component: Addon,
		inputClassName: "ps-[6.2rem]",
	});
}

function Addon({ className, ...props }: AddonProps) {
	return (
		<span
			{...props}
			className={cn(
				"flex items-center absolute top-0 h-full ps-[1rem] text-black-40 cursor-default",
				className
			)}
		>
      sella.store/
		</span>
	);
}


