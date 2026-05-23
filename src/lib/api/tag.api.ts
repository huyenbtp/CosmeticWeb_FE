import { IFetchedTag } from "@/interfaces/product.interface";
import { ITag } from "@/interfaces/tag.interface";
import axios from "@/lib/axios";

export type TagStatus = "active" | "archived";

export interface FetchTagsParams {
  page?: number;
  limit?: number;
  q?: string;
  status?: TagStatus;
}
export interface TagPayload {
  name: string;
  status?: TagStatus;
}

const tagApi = {
  fetchAllTags: async (): Promise<IFetchedTag[]> => {
    return axios.get("/api/tags");
  },

  fetchTagsPagination: async (params: FetchTagsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/tags/pagination", { params });
  },

  createTag: async (payload: TagPayload): Promise<ITag> => {
    return axios.post("/api/tags", payload);
  },

  updateTag: async (id: string, payload: TagPayload): Promise<ITag> => {
    return axios.put(`/api/tags/${id}`, payload);
  },
  
  updateStatus: async (id: string, status: TagStatus): Promise<ITag> => {
    return axios.patch(`/api/tags/${id}/status`, { status });
  },

  deleteTag: async (id: string): Promise<boolean> => {
    return axios.delete(`/api/tags/${id}`);
  },
}

export default tagApi;