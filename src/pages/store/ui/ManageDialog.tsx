'use client';

import { Button } from "~/shared/ui/kit/button";
import { StoreManageDialog } from "~/features/store/manage";
import { getStorePathname, useStoreStrictContext } from "~/entities/store";
import { useRouter } from "next/navigation";

export function ManageDialog() {
	const router = useRouter();
	const store = useStoreStrictContext();

	return (
		<StoreManageDialog
			store={store}
			triggerElement={
				<Button colorPalette='gray' size='lg'>
					Settings
				</Button>
			}
			onActionDeleteFulfilled={() => router.push(`/dashboard`)}
			onActionEditFulfilled={newStore => {
				if(store.url != newStore.url)
					router.push(getStorePathname(newStore.url))
			}}
		/>
	);
}
