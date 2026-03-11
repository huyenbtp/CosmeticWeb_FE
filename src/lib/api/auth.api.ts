import axios from "@/lib/axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  user: StaffInfo;
}

export interface StaffInfo {
  _id: string;
  full_name: string;
  position: string;
  image: string;
}

const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    return axios.post("/auth/login", payload);
  },

  logout: () => axios.post("/auth/logout"),
  
  changePassword: (payload: {
    oldPassword: string;
    newPassword: string;
  }) => axios.post("/auth/change-password", payload),

  resetPassword: (payload: {
    accountId: string;
    newPassword: string;
  }) => axios.post("/auth/reset-password", payload),
}

export default authApi;