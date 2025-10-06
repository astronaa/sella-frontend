"use client";

import { useWallet as useTronWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { HTMLAttributes, useMemo } from "react";
import { Form } from "react-final-form";
import { z } from "zod";
import { invalidateUserGetQuery, useUserGetQuery } from "~/entities/user";
import { AuthChannelsVerifyEmailDialog } from "~/features/auth-channels";
import { apiClient } from "~/shared/api/client";
import { cn } from "~/shared/lib/cn";
import { useDialogState } from "~/shared/lib/dialog";
import { FormError } from "~/shared/lib/errors";
import { usePromiseResolver } from "~/shared/lib/use-promise-resolver";
import { zodValidate } from "~/shared/lib/zod-final-form";
import { DividerWithElement } from "~/shared/ui/kit/divider";
import { VImageUploader, VTextControl } from "~/shared/ui/validation-inputs";
import { TronWalletControl } from "./TronWalletControl";
/* import { TelegramControl } from "./TelegramControl"; */
import { EmailControl } from "./EmailControl";
import { toaster } from "~/shared/ui/toaster";

export const schema = z.object({
  username: apiClient.auth.schemaUsername,
  telegramId: z.string().min(3, "Min length is 3").nullable().optional(),
  email: z.string().email().nullable().optional(),
  avatar: apiClient.users.schemaAvatarFile.optional(),
});

export type SchemaType = z.infer<typeof schema>;

type SettingsFormProps = HTMLAttributes<HTMLFormElement> & {
  id: string;
  onBeforeAction?: () => void;
  onActionFulfilled?: () => void;
  onActionRejected?: () => void;
};

const validateForm = zodValidate(schema);

export function SettingsForm({
  onActionFulfilled,
  onBeforeAction,
  onActionRejected,
  className,
  ...props
}: SettingsFormProps) {
  const { data: user } = useUserGetQuery();
  const { address: tronAddress } = useTronWallet();

  const {
    createPromise: waitForEmailVerification,
    resolve: resolveEmailVerification,
  } = usePromiseResolver<boolean>();

  const {
    isOpen: isVerifyDialogOpen,
    open: openVerifyDialog,
    close: closeVerifyDialog,
    handleOpenChange: handleVerifyDialogOpenChange,
  } = useDialogState({
    onChange: (open) => {
      if (!open) resolveEmailVerification(false);
    },
  });

  const onSubmit = async (values: SchemaType) => {
    onBeforeAction?.();

    try {
      if (values.avatar) {
        const { error } = await apiClient.users.setAvatar(values.avatar);
        if (error) throw error;
      } else if (values.avatar === null) {
        const { error } = await apiClient.users.deleteAvatar();
        if (error) throw error;
      }

      if (user?.username != values.username) {
        const { error } = await apiClient.auth.setUsername(values.username);
        if (error) {
          if (error.statusCode == 400) {
            throw new FormError(error.message as Record<string, string>);
          }
          throw new Error(error.message as unknown as string);
        }
      }

      if (user?.email != values.email && values.email) {
        const { error } = await apiClient.auth.sendEmailCode(values.email);

        if (error) {
          if (error.statusCode == 400) {
            throw new FormError(error.message as Record<string, string>);
          }
          throw new Error(error.message as unknown as string);
        }

        openVerifyDialog();

        const result = await waitForEmailVerification();

        closeVerifyDialog();

        if (!result) throw result;
      }

      invalidateUserGetQuery();

      onActionFulfilled?.();
    } catch (error) {
      onActionRejected?.();

      if (error instanceof FormError) {
        return error.fields;
      } else if (error instanceof Error) {
        toaster.create({
          type: "error",
          title: "Error updating Settings",
          description: error.message,
        });
      }
    }
  };

  const ethAddress = user?.address;

  const initialValues = useMemo(
    () => ({
      ethAddress,
      tronAddress,
      email: user?.email,
      username: user?.username,
      avatarImage: user?.avatarImage,
      telegramId: user?.telegramId,
    }),
    [
      ethAddress,
      tronAddress,
      user?.email,
      user?.avatarImage,
      user?.username,
      user?.telegramId,
    ]
  );

  return (
    <Form
      onSubmit={onSubmit}
      validate={validateForm}
      initialValues={initialValues}
    >
      {({ handleSubmit, values }) => (
        <form
          {...props}
          onSubmit={handleSubmit}
          className={cn("flex flex-col w-full gap-[2rem]", className)}
        >
          <div className="flex gap-[2rem] w-full max-md:flex-col">
            <VImageUploader
              label="Upload Avatar"
              name="avatar"
              className="flex-shrink-0 size-[11.625rem] rounded-full"
              initialImageSrc={initialValues.avatarImage ?? undefined}
            />

            <div className="flex flex-col w-full justify-between max-md:gap-[1rem] gap-[0.5rem]">
              <VTextControl.Root className="w-full" name="ethAddress">
                <VTextControl.LabelOrError>
                  Ethereum Wallet
                </VTextControl.LabelOrError>
                <VTextControl.Input
                  className="pointer-events-none truncate max-w-full pe-[1rem]"
                  readOnly
                />
              </VTextControl.Root>

              <TronWalletControl />
            </div>
          </div>

          <VTextControl.Root className="w-full" name="username">
            <VTextControl.Label>Username</VTextControl.Label>
            <VTextControl.Input placeholder="Your username" />
            <VTextControl.ErrorText />
          </VTextControl.Root>

          <DividerWithElement className="text-black-40 text-[0.875rem]">
            2fa / Notifications
          </DividerWithElement>

          {/* <TelegramControl name='telegramId' /> */}

          <EmailControl name="email" />

          <AuthChannelsVerifyEmailDialog
            email={values.email ?? null}
            open={isVerifyDialogOpen}
            onOpenChange={handleVerifyDialogOpenChange}
            onActionFulfilled={() => resolveEmailVerification(true)}
          />
        </form>
      )}
    </Form>
  );
}
