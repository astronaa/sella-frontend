import { useState } from "react";
import { Dialog } from "~/shared/ui/kit";
import { RegisterSuccessDialog } from "./RegisterSuccessDialog";
import { TwoFaSuccessDialog } from "./TwoFaSuccessDialog";
import { Button } from "~/shared/ui/kit/button";

import { RegisterDialog } from "~/features/register";
import { StoreCreateDialog } from "~/features/store/create";
import { AuthChannelsSetupTwoFaDialog } from "~/features/auth-channels";
import { CreateStoreSuccessDialog } from "./CreateStoreSuccessDialog";
import { Store } from "~/shared/api/model";
import { ProductCreateDialog } from "~/features/product/create";
import { AllSetDialog } from "./AllSetDialog";

type ModalTypes =
  | "register"
  | "register-success"
  | "2fa"
  | "2fa-success"
  | "create-store"
  | "create-store-success"
  | "create-product"
  | "all-set";

export function FlowDialog(props: Dialog.BaseDialogProps) {
	const [currentModal, setCurrentModal] = useState<ModalTypes>("register");

	const isOpen = (modal: ModalTypes) => !!props?.open && currentModal == modal;
	const openModalAction = (modal: ModalTypes) => () => setCurrentModal(modal);

	const [createdStore, setCreatedStore] = useState<Store | null>(null);

	return (
		<>
			<RegisterDialog
				{...props}
				open={isOpen("register")}
				onActionFulfilled={openModalAction("register-success")}
			/>

			<RegisterSuccessDialog
				{...props}
				open={isOpen("register-success")}
				onContinue={openModalAction("2fa")}
			/>

			<AuthChannelsSetupTwoFaDialog
				{...props}
				open={isOpen("2fa")}
				onActionFulfilled={openModalAction("2fa-success")}
				cancelButton={
					<Button
						className="w-full"
						colorPalette="gray"
						onClick={openModalAction("create-store")}
					>
            Setup Later
					</Button>
				}
			/>

			<TwoFaSuccessDialog
				{...props}
				open={isOpen("2fa-success")}
				onContinue={openModalAction("create-store")}
			/>

			<StoreCreateDialog
				{...props}
				open={isOpen("create-store")}
				onActionFulfilled={(store) => {
					setCurrentModal("create-store-success");
					setCreatedStore(store);
				}}
				cancelButton={
					<Button
						className="w-full"
						colorPalette="gray"
						onClick={openModalAction("all-set")}
					>
            Skip
					</Button>
				}
			/>

			<CreateStoreSuccessDialog
				{...props}
				store={createdStore}
				open={isOpen("create-store-success")}
				onContinue={openModalAction("create-product")}
			/>

			{createdStore && (
				<ProductCreateDialog
					{...props}
					storeId={createdStore.id}
					open={isOpen("create-product")}
					onActionFulfilled={openModalAction("all-set")}
					cancelButton={
						<Button
							className="w-full"
							colorPalette="gray"
							onClick={openModalAction("all-set")}
						>
              Skip
						</Button>
					}
				/>
			)}

			<AllSetDialog {...props} open={isOpen("all-set")} />
		</>
	);
}
