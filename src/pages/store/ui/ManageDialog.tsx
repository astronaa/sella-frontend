'use client';

import { Button } from "~/shared/ui/kit/button";
import { StoreManageDialog } from "~/features/store/manage";
import { StoreProp } from "~/entities/store";
import { useRouter } from "next/navigation";

export function ManageDialog({ store }: StoreProp) {
	const router = useRouter();

	return (
		<StoreManageDialog
			store={store}
			triggerElement={
				<Button colorPalette='gray' size='lg'>
					Settings
				</Button>
			}
			onActionDeleteFulfilled={() => router.push(`/dashboard`)}
			onActionEditFulfilled={newStore => router.push(`/stores/${newStore.shortName}`)}
		/>
	);
}
