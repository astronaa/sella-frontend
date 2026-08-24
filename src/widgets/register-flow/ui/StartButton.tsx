'use client';

import { useState } from "react";
import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { useRegisterFlow } from "~/features/register";
import { LaunchSoonDialog } from "~/widgets/storefront-open/ui/LaunchSoonDialog";

export function StartButton(props: ButtonProps) {
	const [launchSoonOpen, setLaunchSoonOpen] = useState(false);
	const startFlow = useRegisterFlow(s => s.startFlow);
	void startFlow;

	return (
		<>
			<Button
				{...props}
				// Demo mode: the backend is down, so the register flow would
				// error out. When storefront creation goes live, restore:
				// onClick={() => startFlow()}
				onClick={() => setLaunchSoonOpen(true)}
			>
				Open Storefront
			</Button>

			<LaunchSoonDialog
				open={launchSoonOpen}
				onClose={() => setLaunchSoonOpen(false)}
			/>
		</>
	);
}
