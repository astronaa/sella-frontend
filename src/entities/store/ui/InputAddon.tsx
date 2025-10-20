import {
  ComponentProps,
  ComponentType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "~/shared/lib/cn";
import { InputAddon as BaseInputAddon } from "~/shared/ui/kit/input";

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
    inputClassName: "ps-[4.8rem]",
  });
}

function Addon({ className, ...props }: ComponentProps<typeof BaseInputAddon>) {
  return (
    <BaseInputAddon
      {...props}
      className={cn(
        "flex items-center absolute top-0 h-full ps-[1rem] text-black-60 cursor-default",
        className
      )}
    >
      sella.to/
    </BaseInputAddon>
  );
}
