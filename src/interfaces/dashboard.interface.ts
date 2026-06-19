export interface IDashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export interface IRevenuePoint {
  date: string;
  revenue: number;
}

export interface IOrderStatusPoint {
  status: string;
  count: number;
}

export interface ITopProductPoint {
  name: string;
  sold: number;
  image?: string;
}

export interface IDashboardAnalytics {
  summary: IDashboardSummary;
  revenueByDate: IRevenuePoint[];
  ordersByStatus: IOrderStatusPoint[];
  topProducts: ITopProductPoint[];
}
