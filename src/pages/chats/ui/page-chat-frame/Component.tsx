import { ChatId } from "~/shared/api/client";
import { MobileHeader } from "./MobileHeader";
import { ChatFrameById } from "./Chat";

export async function PageChatFrame({ chatId }: { chatId: ChatId }) {
	return (
		<div className='flex flex-col max-lg:h-[calc(100vh-10rem)]'>
			<div className='flex flex-col gap-[0.75rem] px-[1.25rem] mt-[-3rem] lg:hidden'>
				<MobileHeader chatId={chatId} />
				<div
					className='bg-white/[.02] w-full h-[1rem] rounded-t-[1.25rem]'
				/>
			</div>
			<ChatFrameById chatId={chatId} />
		</div>
	);
}