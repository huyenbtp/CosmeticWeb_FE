import { ICategory } from "@/interfaces/category.interface";
import axios from "@/lib/axios";

export interface CategoryPayload {
  name: string;
  slug: string;
  parent_id: string | null;
}

const categoryApi = {
  fetchAllCategories: async (): Promise<ICategory[]> => {
    return axios.get("/api/categories");
  },

  createCategory: async (payload: CategoryPayload): Promise<ICategory> => {
    return axios.post("/api/categories", payload);
  },

  updateCategory: async (id: string, payload: CategoryPayload): Promise<ICategory> => {
    return axios.put(`/api/categories/${id}`, payload);
  },
}

export default categoryApi;