import { Order, Sale } from "../api/client";

export const PATH_DASHBOARD = `/dashboard`
export const PATH_DASHBOARD_ORDERS_PAGE = `${PATH_DASHBOARD}/orders`
export const PATH_DASHBOARD_SALES_PAGE = `${PATH_DASHBOARD}/sales`
export const PATH_ORDER_PAGE = (o: Order | Sale) => `/products/${o.product.id}/checkout/${o.id}`;
export const PATH_ORDER_REVIEW_PAGE = (o: Order) => `${PATH_ORDER_PAGE(o)}/review`;