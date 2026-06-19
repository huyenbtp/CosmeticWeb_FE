import axios from "@/lib/axios";
import {
  IDashboardSummary,
  IRevenuePoint,
  IOrderStatusPoint,
  ITopProductPoint,
} from "@/interfaces/dashboard.interface";

const dashboardApi = {
  fetchSummary: async (): Promise<IDashboardSummary> => {
    return axios.get("/api/dashboard/summary");
  },

  fetchRevenue: async (range: string = "7d"): Promise<IRevenuePoint[]> => {
    return axios.get("/api/dashboard/revenue", { params: { range } });
  },

  fetchOrdersByStatus: async (): Promise<IOrderStatusPoint[]> => {
    return axios.get("/api/dashboard/orders-by-status");
  },

  fetchTopProducts: async (limit: number = 5): Promise<ITopProductPoint[]> => {
    return axios.get("/api/dashboard/top-products", { params: { limit } });
  },
};

export default dashboardApi;
