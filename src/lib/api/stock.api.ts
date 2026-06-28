import axios from "@/lib/axios";
import {
  IStockStats,
  ILowStockItem,
  IOutOfStockItem,
} from "@/interfaces/stock.interface";

export interface IStockOverview {
  stats: IStockStats;
  lowStockItems: ILowStockItem[];
  outOfStockItems: IOutOfStockItem[];
}

const stockApi = {
  fetchOverview: async (): Promise<IStockOverview> =>
    axios.get("/api/stock-report/overview"),
};

export default stockApi;
