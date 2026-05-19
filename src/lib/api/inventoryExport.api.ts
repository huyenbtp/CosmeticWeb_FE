
import { IExport, IExportDetail } from "@/interfaces/export.inerface";
import axios from "@/lib/axios";

export type ExportType = "sales" | "discard" | "adjust";

export interface FetchExportsParams {
  page?: number;
  limit?: number;
  q?: string;
  fromDate?: string;
  toDate?: string;
  type?: ExportType;
}

export interface ExportPayload {
  items: {
    product_id: string;
    batch_id: string;
    quantity: number;
    unit_price: number;
    notes: string;
  }[];
  notes: string;
  type: string;
}

const exportApi = {
  fetchExports: async (params: FetchExportsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/product-exports", { params });
  },

  fetchExportById: async (id: string): Promise<IExportDetail> => {
    return axios.get(`/api/product-exports/${id}`);
  },

  updateNotes: async (id: string, notes: string): Promise<IExport> => {
    return axios.patch(`/api/product-exports/${id}/notes`, { notes });
  },
}

export default exportApi;