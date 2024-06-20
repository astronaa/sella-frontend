'use client';

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { MobileMenuProvider, useMobileMenuStrictContext } from "./context";
import { usePathname } from "next/navigation";
import { PhoneNavbarContent } from "./PhoneNavbarContent";
import { ButtonProps, IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { cn } from "~/shared/lib/cn";

export function Root({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	const value = useMemo(() => ({
		open, setOpen
	}), [open, setOpen]);

	return (
		<MobileMenuProvider value={value}>
			{children}

			<PhoneNavbarContent />
		</MobileMenuProvider>
	);
}

export function Button({ className, ...props }: ButtonProps) {
	const { open, setOpen } = useMobileMenuStrictContext();

	return (
		<IconButton
			colorPalette='gray'
			variant="outline" size='sm'
			className={cn("lg:hidden [&_svg]:size-[1.5rem]", !open && 'border-none', className)}
			{...props}
			onClick={() => setOpen(o => !o)}
		>
			{open ? <Icons.Close /> : <Icons.Menu />}
		</IconButton>
	);
}