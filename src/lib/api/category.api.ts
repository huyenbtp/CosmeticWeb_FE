import { ICategory } from "@/interfaces/category.interface";
import axios from "@/lib/axios";

export interface CategoryPayload {
  name: string;
  slug: string;
  parent_id: string | null;
}

const categoryApi = {
  fetchAllCategories: async (): Promise<ICategory[]> => {
    return axios.get("/categories");
  },

  createCategory: async (payload: CategoryPayload): Promise<ICategory> => {
    return axios.post("/categories", payload);
  },

  updateCategory: async (id: string, payload: CategoryPayload): Promise<ICategory> => {
    return axios.put(`/categories/${id}`, payload);
  },
}

export default categoryApi;