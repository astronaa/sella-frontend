import { invariant } from "../lib/asserts";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
invariant(API_BASE_URL, 'NEXT_PUBLIC_API_URL not defined');