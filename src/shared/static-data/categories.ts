import type { Category } from "~/shared/api/client";

import Automotive from "~/shared/assets/images/categories/Automotive & Motorcycle.webp";
import Beauty from "~/shared/assets/images/categories/Beauty.webp";
import Books from "~/shared/assets/images/categories/Books.webp";
import Business from "~/shared/assets/images/categories/Business.webp";
import DIY from "~/shared/assets/images/categories/DIY.webp";
import Data from "~/shared/assets/images/categories/Data.webp";
import DigitalMarketing from "~/shared/assets/images/categories/Digital Marketing.webp";
import Electronics from "~/shared/assets/images/categories/Electronics, Computers & Parts.webp";
import FilmsMusicGames from "~/shared/assets/images/categories/Films, Music & Games.webp";
import GraphicsDesign from "~/shared/assets/images/categories/Graphics & Design.webp";
import HomeGardenPets from "~/shared/assets/images/categories/Home, Garden & Pets.webp";
import Jewelery from "~/shared/assets/images/categories/Jewelery.webp";
import Lifestyle from "~/shared/assets/images/categories/Lifestyle.webp";
import MusicAudio from "~/shared/assets/images/categories/Music & Audio.webp";
import Photography from "~/shared/assets/images/categories/Photography.webp";
import ProgrammingTech from "~/shared/assets/images/categories/Programming & Tech.webp";
import SportsOutdoors from "~/shared/assets/images/categories/Sports & Outdoors.webp";
import Toys from "~/shared/assets/images/categories/Toys.webp";
import VideoAnimation from "~/shared/assets/images/categories/Video & Animation.webp";
import WritingTranslation from "~/shared/assets/images/categories/Writing & Translation.webp";

/**
 * Ordered to match what actually sells on the demo marketplace:
 * crypto-native services and digital goods first, general commerce
 * last. Categories not listed here still exist on the backend; this
 * is only the offline fallback set.
 */
const entries: Array<[string, { src: string }]> = [
	["Programming & Tech", ProgrammingTech],
	["Digital Marketing", DigitalMarketing],
	["Graphics & Design", GraphicsDesign],
	["Business", Business],
	["Data", Data],
	["Films, Music & Games", FilmsMusicGames],
	["Music & Audio", MusicAudio],
	["Video & Animation", VideoAnimation],
	["Writing & Translation", WritingTranslation],
	["Books", Books],
	["Photography", Photography],
	["Electronics, Computers & Parts", Electronics],
];

void Automotive; void Beauty; void DIY; void HomeGardenPets;
void Jewelery; void Lifestyle; void SportsOutdoors; void Toys;

export const staticCategories: Category[] = entries.map(([name, image]) => ({
	id: `static-category-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
	name,
	image: image.src,
}));
