import { IMinMaxFilterData, IImport, IImportDetail } from "@/interfaces/import.interface";
import axios from "@/lib/axios";

export type ImportKey = "import_code" | "staff_name" | "staff_code";
export type ImportStatus = "draft" | "confirmed";
export type ImportType = "purchase" | "customer_return";

export interface FetchImportsParams {
  page?: number;
  limit?: number;
  q?: string;
  by?: string;
  fromDate?: string;
  toDate?: string;
  minTotal?: number;
  maxTotal?: number;
  status?: ImportStatus;
  type?: ImportType;
}

export interface ImportPayload {
  items: {
    batch_id: string;
    quantity: number;
    unit_price: number;
  }[];
  notes: string;
}

const importApi = {
  fetchImports: async (params: FetchImportsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/product-imports", { params });
  },

  fetchImportStats: async (): Promise<IMinMaxFilterData> => {
    return axios.get("/api/product-imports/stats");
  },

  fetchImportById: async (id: string): Promise<IImportDetail> => {
    return axios.get(`/api/product-imports/${id}`);
  },

  createImport: async (payload: ImportPayload): Promise<IImport> => {
    return axios.post("/api/product-imports", payload);
  },

  updateImport: async (id: string, payload: ImportPayload): Promise<IImport> => {
    return axios.put(`/api/product-imports/${id}`, payload);
  },

  confirmImport: async (id: string): Promise<{ newBatchesCount: number }> => {
    return axios.post(`/api/product-imports/${id}/confirm`);
  },

  deleteImport: async (id: string): Promise<boolean> => {
    return axios.delete(`/api/product-imports/${id}`);
  },

  updateNotes: async (id: string, notes: string): Promise<IImport> => {
    return axios.patch(`/api/product-imports/${id}/notes`, { notes });
  },
}

export default importApi;