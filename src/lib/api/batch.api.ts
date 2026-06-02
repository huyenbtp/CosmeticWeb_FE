import { IFetchedBatch } from "@/features/inventory/inventoryImports/shared/AddImportItemDialog";
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

export interface BatchPayload {
  product_id: string;
  batch_code: string;
  mfg_date: string;
  exp_date: string;
}

const batchApi = {
  fetchBatches: async (params: FetchBatchesParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/inventory-batches", { params });
  },

  fetchBatchByBatchNumber: async (batchNumber: string): Promise<IFetchedBatch | null> => {
    return axios.get(`/api/inventory-batches/search-import/${batchNumber}`);
  },

  createBatch: async (payload: BatchPayload): Promise<IBatch> => {
    return axios.post("/api/inventory-batches", payload);
  },

  updateBatch: async (id: string, payload: BatchPayload): Promise<IBatch> => {
    return axios.put(`/api/inventory-batches/${id}`, payload);
  },

  deleteBatch: async (id: string): Promise<boolean> => {
    return axios.delete(`/api/inventory-batches/${id}`);
  },
}

export default batchApi;