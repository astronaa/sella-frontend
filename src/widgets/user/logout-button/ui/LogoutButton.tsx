"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/shared/api";
import { Button } from "~/shared/ui/kit/button";
import { invalidateUserGetQuery } from "~/entities/user";

export function LogoutButton() {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await api.auth.logout();
			await invalidateUserGetQuery();
			router.push('/');
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleLogout}
			disabled={isLoggingOut}
		>
			{isLoggingOut ? 'Logging out...' : 'Logout'}
		</Button>
	);
}