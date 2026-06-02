import { IEditStaff, IStaff, IStaffDetail } from "@/interfaces/staff.interface";
import { IUser } from "@/interfaces/user.interface";
import axios from "@/lib/axios";

export type StaffStatus = "active" | "on_leave" | "terminated";
export type UserRole = "admin" | "cashier" | "warehouse_manager" | "order_processing";

export interface FetchStaffsParams {
  page?: number;
  limit?: number;
  q?: string;
  status?: StaffStatus;
  role_id?: string;
  is_active?: boolean;
}

export interface CreateStaffPayload {
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  status?: StaffStatus;
  image?: File | null;
  email: string;
  role_id: string;
  is_active?: boolean
}

export interface UpdateStaffPayload {
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  status?: StaffStatus;
  image?: File | null;
  role_id?: string;
  is_active?: boolean
}

const staffApi = {
  fetchStaffs: async (params: FetchStaffsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/staffs", { params });
  },

  fetchStaffByUserId: async (user_id: string): Promise<IStaffDetail> => {
    return axios.get(`/api/staffs/${user_id}`);
  },

  fetchStaffByUserIdToAdminEdit: async (user_id: string): Promise<IEditStaff> => {
    return axios.get(`/api/staffs/admin-edit/${user_id}`);
  },

  createStaff: async (payload: CreateStaffPayload): Promise<IUser> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else {
        formData.append(key, value as any);
      }
    });

    return axios.post("/api/staffs", formData);
  },

  updateStaff: async (id: string, payload: UpdateStaffPayload): Promise<IUser> => {
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

      formData.append(key, value as any);
    });

    return axios.put(`/api/staffs/${id}`, formData);
  },

  updateStatus: async (id: string, status: StaffStatus): Promise<IStaff> => {
  return axios.patch(`/api/staffs/${id}/status`, { status });
  },

  deleteStaff: async (id: string) => {
    return axios.delete(`/api/staffs/${id}`);
  },
}

export default staffApi;