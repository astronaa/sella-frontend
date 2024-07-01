import { redirect, RedirectType } from "next/navigation";

const Redirect = async () => {
	redirect('/dashboard/quests/social-tasks', RedirectType.replace)
}

export default Redirect
