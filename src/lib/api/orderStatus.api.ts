import { IOrderStatus } from "@/interfaces/orderStatus.interface";
import axios from "@/lib/axios";

export interface OrderStatusPayload {
  order_id: string;
  status: string;
  notes?: string;
}

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PACKED: "packed",
  SHIPPING: "shipping",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
};

export const ALLOWED_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.CANCELLED,
  ],

  [ORDER_STATUS.CONFIRMED]: [
    ORDER_STATUS.PACKED,
    ORDER_STATUS.CANCELLED,
  ],

  [ORDER_STATUS.PACKED]: [
    ORDER_STATUS.SHIPPING,
    ORDER_STATUS.CANCELLED,
  ],

  [ORDER_STATUS.SHIPPING]: [
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.RETURNED,
  ],

  [ORDER_STATUS.DELIVERED]: [
    ORDER_STATUS.RETURNED,
  ],

  [ORDER_STATUS.CANCELLED]: [],

  [ORDER_STATUS.RETURNED]: [],
};

const orderStatusApi = {
  fetchOrderStatusByOrderId: async (id: string): Promise<IOrderStatus[]> => {
    return axios.get(`/api/order-status-history/${id}`);
  },

  updateOrderStatus: async (payload: OrderStatusPayload): Promise<IOrderStatus> => {
    return axios.post("/api/order-status-history", payload);
  },

  updateNotes: async (id: string, notes: string): Promise<IOrderStatus> => {
    return axios.patch(`/api/order-status-history/${id}/notes`, { notes });
  },
}

export default orderStatusApi;