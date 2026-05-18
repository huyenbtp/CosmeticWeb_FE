export interface IOrderStatus {
  _id: string;
  order_id: string;
  status: string;
  notes: string;
  updated_by: string;
  updated_by_name: string;
  updated_by_type: string;
  total_estimated: number;
  payment_method: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateOrderStatus {
  status: string;
  notes?: string;
}