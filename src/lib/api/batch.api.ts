import { IBatch, } from "@/interfaces/batch.interface";
import axios from "@/lib/axios";

export type BatchExpiredStatus = "less-than-1-month" | "1-3-months" | "3-6-months";
export type BatchStockStatus = "low" | "out";

export interface FetchBatchesParams {
  page?: number;
  limit?: number;
  q?: string;
  by?: string;
  expiredStatus?: string;
  stockStatus?: string;
}

const batchApi = {
  fetchBatches: async (params: FetchBatchesParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/inventory-batches", { params });
  },

}

export default batchApi;