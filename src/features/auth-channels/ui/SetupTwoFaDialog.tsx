"use client";

import { ReactNode, useState } from "react";
import { Form } from "react-final-form";
import { z } from "zod";
import { zodValidate } from "~/shared/lib/zod-final-form";
import { Button } from "~/shared/ui/kit/button";
import { Dialog } from "~/shared/ui/kit";
/* import { DividerWithElement } from "~/shared/ui/kit/divider"; */
import { VTextControl } from "~/shared/ui/validation-inputs";
import { VerifyEmailDialog } from "./VerifyEmailDialog";
/* import { TelegramAuthButton } from "./TelegramAuthButton"; */
/* import { useUserGetQuery } from "~/entities/user"; */
import { useDialogState } from "~/shared/lib/dialog";
import { Portal } from "@ark-ui/react";
import { apiClient } from "~/shared/api/client";

type SetupTwoFaDialogProps = Dialog.RootProps & {
  onActionFulfilled?: () => void;
  cancelButton?: ReactNode;
};

const schema = z.object({
  email: z.string().email().optional(),
});

export function SetupTwoFaDialog({
  onActionFulfilled,
  cancelButton,
  open,
  ...props
}: SetupTwoFaDialogProps) {
  /* const { data: user } = useUserGetQuery(); */
  const [email, setEmail] = useState<string | null>(null);
  const {
    open: openVerifyEmailDialog,
    close: closeVerifyEmailDialog,
    isOpen: isVerifyEmailDialogOpened,
    handleOpenChange: handleVerifyEmailDialogOpenChange,
  } = useDialogState();

  /* const isTelegramAuthorized = !!user?.telegramId; */

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!values.email) return;

    const { error } = await apiClient.auth.sendEmailCode(values.email);
    if (error) return;

    setEmail(values.email);
    openVerifyEmailDialog();
  };

  const onEmailVerified = () => {
    closeVerifyEmailDialog();
    props?.onOpenChange?.({ open: false });

    onActionFulfilled?.();
  };

  return (
    <>
      <VerifyEmailDialog
        {...props}
        email={email}
        open={isVerifyEmailDialogOpened}
        onOpenChange={handleVerifyEmailDialogOpenChange}
        onActionFulfilled={onEmailVerified}
      />

      <Dialog.Root
        {...props}
        open={open && !isVerifyEmailDialogOpened}
        unmountOnExit
        lazyMount
      >
        <Dialog.Backdrop />

        <Portal>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseButton />

              <Form onSubmit={onSubmit} validate={zodValidate(schema)}>
                {({ form, valid, values }) => (
                  <>
                    <Dialog.ContentHeading>
                      <Dialog.Title>Set up 2FA</Dialog.Title>
                      <Dialog.Description>
                        What’s your preferred method for receiving Sella alerts?
                        Select email, Telegram, or both –and you can always
                        change this later.
                      </Dialog.Description>
                    </Dialog.ContentHeading>

                    <div className="flex flex-col gap-[2rem] w-full">
                      {/* {!isTelegramAuthorized && (
												<>
													<TelegramAuthButton
														onActionFulfilled={onActionFulfilled}
													/>

													<DividerWithElement className='w-full'>
														Or
													</DividerWithElement>
												</>
											)} */}

                      <VTextControl.Root name="email">
                        <VTextControl.Label>Email Address</VTextControl.Label>
                        <VTextControl.Input type="email" />
                        <VTextControl.ErrorText />
                      </VTextControl.Root>
                    </div>

                    <Dialog.ContentFooter>
                      {cancelButton ?? (
                        <Dialog.CloseTrigger asChild>
                          <Button className="w-full" colorPalette="gray">
                            Cancel
                          </Button>
                        </Dialog.CloseTrigger>
                      )}
                      <Button
                        onClick={form.submit}
                        className="w-full"
                        size="lg"
                        disabled={
                          !valid ||
                          /* isTelegramAuthorized &&  */ !values.email?.length
                        }
                      >
                        Continue
                      </Button>
                    </Dialog.ContentFooter>
                  </>
                )}
              </Form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
