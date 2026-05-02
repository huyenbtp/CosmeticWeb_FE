
import { IBrand } from "@/interfaces/brand.interface";
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
export interface BrandPayload {
  name: string;
  status?: BrandStatus;
  logo?: File | null;
}

const brandApi = {
  fetchAllBrands: async (): Promise<IFetchedBrand[]> => {
    return axios.get("/api/brands");
  },

  fetchBrandsPagination: async (params: FetchBrandsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/brands/pagination", { params });
  },

  createBrand: async (payload: BrandPayload): Promise<IBrand> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "logo" && value instanceof File) {
        formData.append("logo", value);
      } else {
        formData.append(key, value as any);
      }
    });

    return axios.post("/api/brands", formData);
  },

  updateBrand: async (id: string, payload: BrandPayload): Promise<IBrand> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined) return;

      if (key === "logo") {
        if (value === null) {
          formData.append("logo", "null"); // xóa ảnh
        } else if (value instanceof File) {
          formData.append("logo", value);  // thêm ảnh mới
        }
        return;
      }

      formData.append(key, value as any);
    });

    return axios.put(`/api/brands/${id}`, formData);
  },
}

export default brandApi;