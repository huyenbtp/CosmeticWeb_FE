export interface IDashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

export interface ISalesOverviewPoint {
  label: string;
  revenue: number;
  orders: number;
}

export interface ICategoryPoint {
  name: string;
  value: number;
}

export interface ICustomerGrowthPoint {
  month: string;
  customers: number;
}

export interface IOrderStatusPoint {
  status: string;
  count: number;
}

export interface IBrandPoint {
  name: string;
  logo?: string;
  value: number;
}

export interface ITopProductPoint {
  name: string;
  sold: number;
  image?: string;
}

export interface IDashboardAnalytics {
  summary: IDashboardSummary;
  salesOverview: ISalesOverviewPoint[];
  categories: ICategoryPoint[];
  customerGrowth: ICustomerGrowthPoint[];
  ordersByStatus: IOrderStatusPoint[];
  brands: IBrandPoint[];
  topProducts: ITopProductPoint[];
}
