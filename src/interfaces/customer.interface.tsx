export interface ICustomer {
  _id: string;
  name: string;
  phone: string;
  points: number;
  createdAt: string;
}

export interface ICustomerDetail {
  _id: string;
  name: string;
  phone: string;
  points: number;
  createdAt: string;
  lastPurchase: string;
  totalPurchases: number;
  totalSpent: number;
  averagePurchaseValue: number;
  purchases: {
    _id: string;
    date: string;
    total_items: number;
    final_amount: number;
    payment_method: string;
  }[];
}

export interface IAddEditCustomer {
  _id?: string;
  name: string;
  phone: string;
}