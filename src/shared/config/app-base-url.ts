import { invariant } from "../lib/asserts";

export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL!;
invariant(APP_BASE_URL, 'NEXT_PUBLIC_APP_URL not defined');