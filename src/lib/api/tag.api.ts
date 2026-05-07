import { ITag } from "@/interfaces/tag.interface";
import axios from "@/lib/axios";

export interface TagPayload {
  name: string;
}

const tagApi = {
  fetchAllTags: async (): Promise<ITag[]> => {
    return axios.get("/api/tags");
  },

  createTag: async (payload: TagPayload): Promise<ITag> => {
    return axios.post("/api/tags", payload);
  },

  updateTag: async (id: string, payload: TagPayload): Promise<ITag> => {
    return axios.put(`/api/tags/${id}`, payload);
  },
}

export default tagApi;