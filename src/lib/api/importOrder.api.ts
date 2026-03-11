import { IMinMaxFilterData, IImport, IImportDetail } from "@/interfaces/import.interface";
import axios from "@/lib/axios";

export type ImportKey = "import_code" | "staff_name" | "staff_code";

export interface FetchImportsParams {
  page?: number;
  limit?: number;
  q?: string;
  by?: string;
  fromDate?: string;
  toDate?: string;
  minTotal?: number;
  maxTotal?: number;
}

export interface ImportPayload {
  items: {
    product_id: string;
    quantity: number;
    unit_price: number;
  }[];
  note: string;
}

const importApi = {
  fetchImports: async (params: FetchImportsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/product-imports", { params });
  },

  fetchImportStats: async (): Promise<IMinMaxFilterData> => {
    return axios.get("/product-imports/stats");
  },

  fetchImportById: async (id: string): Promise<IImportDetail> => {
    return axios.get(`/product-imports/${id}`);
  },

  createImport: async (payload: ImportPayload): Promise<IImport> => {
    return axios.post("/product-imports", payload);
  },

  updateNote: async (id: string, note: string): Promise<IImport> => {
    return axios.patch(`/product-imports/${id}/note`, { note });
  },
}

export default importApi;