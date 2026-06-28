import axios from "@/lib/axios";
import {
  IDashboardSummary,
  ISalesOverviewPoint,
  ICategoryPoint,
  ICustomerGrowthPoint,
  IOrderStatusPoint,
  IBrandPoint,
  ITopProductPoint,
} from "@/interfaces/dashboard.interface";

const dashboardApi = {
  fetchSummary: async (): Promise<IDashboardSummary> => {
    return axios.get("/api/dashboard/summary");
  },

  fetchSalesOverview: async (
    range: string = "monthly"
  ): Promise<ISalesOverviewPoint[]> => {
    return axios.get("/api/dashboard/sales-overview", { params: { range } });
  },

  fetchCategories: async (): Promise<ICategoryPoint[]> => {
    return axios.get("/api/dashboard/categories");
  },

  fetchCustomerGrowth: async (): Promise<ICustomerGrowthPoint[]> => {
    return axios.get("/api/dashboard/customer-growth");
  },

  fetchOrdersByStatus: async (): Promise<IOrderStatusPoint[]> => {
    return axios.get("/api/dashboard/orders-by-status");
  },

  fetchBrands: async (): Promise<IBrandPoint[]> => {
    return axios.get("/api/dashboard/brands");
  },

  fetchTopProducts: async (
    limit: number = 7
  ): Promise<ITopProductPoint[]> => {
    return axios.get("/api/dashboard/top-products", { params: { limit } });
  },
};

export default dashboardApi;
