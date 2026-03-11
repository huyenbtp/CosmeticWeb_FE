
import { IFetchedBrand } from "@/interfaces/product.interface";
import axios from "@/lib/axios";

export type BrandStatus = "active" | "archived";

export interface FetchBrandsParams {
  page?: number;
  limit?: number;
  q?: string;
  minTotal?: number;
  maxTotal?: number;
  status?: BrandStatus;
}

const brandApi = {
  fetchAllBrands: async (): Promise<IFetchedBrand[]> => {
    return axios.get("/brands");
  },
  fetchPaginationBrands: async (params: FetchBrandsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/brands", { params });
  },
}

export default brandApi;