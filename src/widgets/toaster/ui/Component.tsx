'use client'

import {toaster} from "~/shared/lib/toaster";
import { Toast } from "~/shared/ui/kit";
import {IconButton} from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";

export function Component() {
	return (
		<Toast.Toaster toaster={toaster}>
			{(toast) => (
				<Toast.Root key={toast.id} variant={toast.type as "info" | "error"}>
					<Toast.Title>{toast.title}</Toast.Title>
					<Toast.Description>{toast.description}</Toast.Description>
					<Toast.CloseTrigger asChild>
						<IconButton size="xs" variant="ghost">
							<Icons.Close className="size-[12px] text-black-40"/>
						</IconButton>
					</Toast.CloseTrigger>
				</Toast.Root>
			)}
		</Toast.Toaster>
	);
}
