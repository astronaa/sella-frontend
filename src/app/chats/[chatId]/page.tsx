import { RedirectTo } from "~/shared/ui/redirect-to";

/** Demo mode: single chat threads live inside the scripted inbox. */
export default function Page() {
	return <RedirectTo href="/chats" />;
}

export function generateStaticParams() {
	return [{ chatId: "demo" }];
}

export const dynamicParams = false;
