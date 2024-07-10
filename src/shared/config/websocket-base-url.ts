import { invariant } from "../lib/asserts";

export const WEBSOCKET_BASE_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL!;
invariant(WEBSOCKET_BASE_URL, 'NEXT_PUBLIC_WEBSOCKET_URL not defined');