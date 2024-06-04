import { invariant } from "../lib/asserts";

export const TG_BOT_NAME = process.env.NEXT_PUBLIC_TG_BOT_NAME!;
invariant(TG_BOT_NAME, 'NEXT_PUBLIC_TG_BOT_NAME not defined');