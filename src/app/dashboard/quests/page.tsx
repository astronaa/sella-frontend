import { redirect, RedirectType } from "next/navigation";

export default async () => {
	redirect('/dashboard/quests/social-tasks', RedirectType.replace)
}
