import { IFetchedProduct } from "@/features/inventory/inventoryImports/shared/AddImportItemDialog";
import { ICheckoutProduct, IMinMaxFilterData, IProduct, IProductDetail } from "@/interfaces/product.interface";
import axios from "@/lib/axios";

export type ProductKey = "name" | "sku";
export type ProductStatus = "published" | "unpublished";

export interface FetchProductsInfiniteParams {
  page?: number;
  limit?: number;
  q?: string;
}

export interface FetchProductsPaginationParams {
  page?: number;
  limit?: number;
  q?: string;
  by?: ProductKey;
  category_slug?: string;
  brand_id?: string;
  minStock?: number;
  maxStock?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
}

export interface ProductPayload {
  sku?: string;
  name: string;
  category_id: string;
  brand_id: string;
  skinTypeIds: string[];
  tagIds: string[];
  selling_price: number;
  description?: string;
  status?: ProductStatus;
  image?: File | null;
}

const productApi = {
  fetchProductsInfinite: async (params: FetchProductsInfiniteParams): Promise<ICheckoutProduct[]> => {
    return axios.get("/api/products/infinite", { params });
  },

  fetchProductsPagination: async (params: FetchProductsPaginationParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/products/pagination", { params });
  },

  fetchProductStats: async (): Promise<IMinMaxFilterData> => {
    return axios.get("/api/products/stats");
  },

  fetchProductById: async (id: string): Promise<IProductDetail> => {
    return axios.get(`/api/products/${id}`);
  },

  fetchProductBySKU: async (sku: string): Promise<IFetchedProduct | null> => {
    return axios.get(`/api/products/import-item/${sku}`);
  },

  createProduct: async (payload: ProductPayload): Promise<IProduct> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else {
        if (key === "skinTypeIds" || key === "tagIds")
          return;

        formData.append(key, value as any);
      }
    });

    payload.skinTypeIds.forEach(id => {
      formData.append("skinTypeIds", id);
    });

    payload.tagIds.forEach(id => {
      formData.append("tagIds", id);
    });

    console.log("tag: " + formData.getAll("tagIds"));
    return axios.post("/api/products", formData);
  },

  updateProduct: async (id: string, payload: ProductPayload): Promise<IProduct> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined) return;

      if (key === "image") {
        if (value === null) {
          formData.append("image", "null"); // xóa ảnh
        } else if (value instanceof File) {
          formData.append("image", value);  // thêm ảnh mới
        }
        return;
      }

      if (key === "skinTypeIds" || key === "tagIds")
        return;

      formData.append(key, value as any);
    });

    payload.skinTypeIds.forEach(id => {
      formData.append("skinTypeIds", id);
    });

    payload.tagIds.forEach(id => {
      formData.append("tagIds", id);
    });

    return axios.put(`/api/products/${id}`, formData);
  },

  updateStatus: async (id: string, status: ProductStatus): Promise<IProduct> => {
    return axios.patch(`/api/products/${id}/status`, { status });
  },

  deleteProduct: async (id: string) => {
    return axios.delete(`/api/products/${id}`);
  },
}

export default productApi;