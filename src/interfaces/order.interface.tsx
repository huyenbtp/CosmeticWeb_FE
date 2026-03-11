import { IAddEditOrderItem, IOrderItem } from "./orderItem.interface";

export interface IOrder {
  _id: string;
  order_code: string;
  customer_id: string | null;
  customer: {
    _id: string;
    name: string;
    phone: string;
  } | null;
  total_items: number;
  total: number;
  payment_method: string;
  payment_status: string;
  createdAt: string;
}

export interface IOrderDetail {
  _id: string;
  order_code: string;
  customer_id: string | null;
  customer: {
    _id: string;
    name: string;
    phone: string;
  } | null;
  items: IOrderItem[];
  total_items: number;
  subtotal: number;
  discount_amount: number;
  points_used: number;
  total: number;
  payment_method: string;
  payment_status: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditOrder {
  customer_id: string | null;
  discount_id: string | null;
  items: IAddEditOrderItem[];
  points_used: number;
  note: string;
}

export interface IDiscountCode {
  _id: string;
  code: string;
  description: string;
  type: string;
  value: number;
  start_date: string;
  end_date: string;
  min_order_value: number;
  max_uses: number;
  used_count: number;
  is_active: boolean;
}