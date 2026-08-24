import { OrdersPreview } from "./OrdersPreview";

/**
 * Demo mode: public orders preview for signed-out visitors. The real
 * orders dashboard lives at /dashboard/orders behind auth; remove this
 * route at launch.
 */
export default function Page() {
	return <OrdersPreview />;
}
