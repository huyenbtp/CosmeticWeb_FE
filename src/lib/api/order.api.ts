import { IOrder, IOrderDetail } from "@/interfaces/order.interface";
import axios from "@/lib/axios";

export type OrderKey = "order_code";
export type OrderPaymentMethod = "cash" | "bank_transfer";
export type OrderPaymentStatus = "paid" | "unpaid";
export type OrderStatus = "pending" | "confirmed" | "packed" | "shipping" | "delivered" | "cancelled" | "returned";

export interface FetchOrdersParams {
  page?: number;
  limit?: number;
  q?: string;
  by?: string;
  fromDate?: string;
  toDate?: string;
  payment_method?: OrderPaymentMethod;
  order_status?: OrderStatus;
}

export interface OrderPayload {
  customer_id: string | null;
  discount_id: string | null;
  items: {
    product_id: string;
    quantity: number;
    unit_price: number;
  }[];
  points_used: number;
  note: string;
}

const orderApi = {
  fetchOrders: async (params: FetchOrdersParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/orders/pagination", { params });
  },

  fetchOrderById: async (id: string): Promise<IOrderDetail> => {
    return axios.get(`/api/orders/${id}`);
  },

  createOrder: async (payload: OrderPayload): Promise<IOrder> => {
    return axios.post("/api/orders", payload);
  },

  updateNote: async (id: string, note: string): Promise<IOrder> => {
    return axios.patch(`/api/orders/${id}/note`, { note });
  },
}

export default orderApi;