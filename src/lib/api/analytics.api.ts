import axios from "@/lib/axios";
import {
  IAnalyticsKpi,
  IRevenuePoint,
  ICategoryShare,
  ITopProductRow,
  IAnalyticsFilter,
} from "@/interfaces/analytics.interface";

const analyticsApi = {
  fetchKpis: async (filter: IAnalyticsFilter): Promise<IAnalyticsKpi[]> =>
    axios.get("/api/analytics/kpis", { params: filter }),

  fetchRevenueTrend: async (
    filter: IAnalyticsFilter
  ): Promise<IRevenuePoint[]> =>
    axios.get("/api/analytics/revenue-trend", { params: filter }),

  fetchCategoryShare: async (
    filter: IAnalyticsFilter
  ): Promise<ICategoryShare[]> =>
    axios.get("/api/analytics/category-share", { params: filter }),

  fetchTopProducts: async (
    filter: IAnalyticsFilter
  ): Promise<ITopProductRow[]> =>
    axios.get("/api/analytics/top-products", { params: filter }),
};

export default analyticsApi;
