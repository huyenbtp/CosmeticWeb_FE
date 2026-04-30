import axios from "@/lib/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserInfo;
  profile: StaffInfo | CustomerInfo;
}

export interface UserInfo {
  _id: string;
  email: string;
  role: string;
}

export interface StaffInfo {
  _id: string;
  full_name: string;
  image: string;
}

export interface CustomerInfo {
  _id: string;
  full_name: string;
}

const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    return axios.post("/auth/login", payload);
  },

  logout: () => axios.post("/auth/logout"),
  
  resendVerification: (payload: {
    email: string;
  }) => axios.post("/auth/resend-verification", payload),
  
  changePassword: (payload: {
    oldPassword: string;
    newPassword: string;
  }) => axios.post("/auth/change-password", payload),

  forgotPassword: (payload: {
    email: string;
  }) => axios.post("/auth/forgot-password", payload),
}

export default authApi;