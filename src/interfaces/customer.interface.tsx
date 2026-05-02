export interface ICustomer {
  _id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface ICustomerDetail {
  _id: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  user: {
    _id: string;
    email: string;
    is_active: boolean;
    is_verified: boolean;
  };
  createdAt: string;
  lastOrder: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  orders: {
    _id: string;
    order_code: string;
    total_items: number;
    total_estimated: number;
    payment_method: string;
    order_status: string;
    createdAt: string;
  }[];
  userAddressList: {
    _id: string;
    receiver_name: string;
    phone: string;
    address_line: string;
    ward: string;
    district: string;
    city: string;
    is_default: boolean;
  }[];
}

export interface IAddEditCustomer {
  _id?: string;
  name: string;
  phone: string;
}