import { Metadata } from "next";
import { QuestsPreview } from "./QuestsPreview";

export const metadata: Metadata = {
	title: "Quests · Sella",
	description:
		"Sella Quests: earn points for trading, referring, resolving disputes, and backing the marketplace early. Launching soon.",
};

export default function Page() {
	return <QuestsPreview />;
}
