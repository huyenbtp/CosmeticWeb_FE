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