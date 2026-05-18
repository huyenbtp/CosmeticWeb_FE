import { IAddEditOrderItem, IOrderItem } from "./orderItem.interface";

export interface IOrder {
  _id: string;
  order_code: string;
  user_id: string;
  customer: {
    _id: string;
    full_name: string;
    phone: string;
    email: string;
  };
  total_items: number;
  total_estimated: number;
  payment_method: string;
  order_status: string;
  createdAt: string;
}

export interface IOrderDetail {
  _id: string;
  order_code: string;
  user_id: string | null;
  customer: {
    _id: string;
    full_name: string;
    phone: string;
    email: string;
  } ;
  items: IOrderItem[];
  total_items: number;
  subtotal: number;
  shipping_fee: number;
  total_estimated: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  notes: string;
  receiver_name: string;
  phone: string;
  address_line: string;
  ward: string;
  district: string;
  city: string;
  reveive_time: string | null;
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