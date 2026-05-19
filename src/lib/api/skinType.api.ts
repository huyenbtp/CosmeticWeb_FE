import { IFetchedSkinType } from "@/interfaces/product.interface";
import { ISkinType } from "@/interfaces/skinType.interface";
import axios from "@/lib/axios";

export interface SkinTypePayload {
  name: string;
  description: string;
}

const skinTypeApi = {
  fetchAllSkinTypes: async (): Promise<IFetchedSkinType[]> => {
    return axios.get("/api/skin-types");
  },

  createSkinType: async (payload: SkinTypePayload): Promise<ISkinType> => {
    return axios.post("/api/skin-types", payload);
  },

  updateSkinType: async (id: string, payload: SkinTypePayload): Promise<ISkinType> => {
    return axios.put(`/api/skin-types/${id}`, payload);
  },
  
  deleteSkinType: async (id: string): Promise<boolean> => {
    return axios.delete(`/api/skin-types/${id}`);
  },
}

export default skinTypeApi;