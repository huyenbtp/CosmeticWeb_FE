
import { IRole } from "@/interfaces/role.interface";
import axios from "@/lib/axios";

const roleApi = {
  fetchAllRoles: async (): Promise<IRole[]> => {
    return axios.get("/api/roles");
  },
}

export default roleApi;