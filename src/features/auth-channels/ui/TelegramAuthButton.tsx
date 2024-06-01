import { apiClient } from "~/shared/api/client"
import { TG_BOT_NAME } from "~/shared/config/tg-bot-name"
import { TelegramLoginButton } from "~/shared/ui/telegram-auth";

interface TelegramAuthButtonProps {
	onActionFulfilled?: () => void,
	onActionRejected?: () => void
}

export function TelegramAuthButton({ onActionFulfilled, onActionRejected }: TelegramAuthButtonProps) {
	return (
		<TelegramLoginButton
			botUsername={TG_BOT_NAME}
			onAuthCallback={async data => {
				const { error } = await apiClient.auth.telegramCallback(data);

				if(error)
					return onActionRejected?.();

				onActionFulfilled?.();
			}}
		/>
	)
}