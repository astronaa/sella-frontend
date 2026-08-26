import type { Category } from "~/shared/api/client";

import Business from "~/shared/assets/images/categories/Business.webp";
import Data from "~/shared/assets/images/categories/Data.webp";
import DigitalMarketing from "~/shared/assets/images/categories/Digital Marketing.webp";
import ESims from "~/shared/assets/images/categories/eSIMS.webp";
import FilmsMusicGames from "~/shared/assets/images/categories/Films, Music & Games.webp";
import GraphicsDesign from "~/shared/assets/images/categories/Graphics & Design.webp";
import ProgrammingTech from "~/shared/assets/images/categories/Programming & Tech.webp";
import Software from "~/shared/assets/images/categories/Software.webp";

/**
 * Offline fallback set, trimmed to the categories the demo stores and
 * products actually carry so every tile filters to real content. The
 * full catalog lives on the backend; when it's back, the API response
 * wins and this list is never seen.
 */
const entries: Array<[string, { src: string }]> = [
	["Contracts & Code", ProgrammingTech],
	["Promotion & KOLs", DigitalMarketing],
	["Design & Branding", GraphicsDesign],
	["Alpha & Access", Business],
	["Bots & Data", Data],
	["Memes & Media", FilmsMusicGames],

	// Original catalog names, kept for the shops restored from the live
	// marketplace. Tile art is the real render from the backend tag set.
	["eSIMS", ESims],
	["Software", Software],
];

export const staticCategories: Category[] = entries.map(([name, image]) => ({
	id: `static-category-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
	name,
	image: image.src,
}));
