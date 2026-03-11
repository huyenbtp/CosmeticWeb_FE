import { IEditStaff, IStaff, IStaffDetail } from "@/interfaces/staff.interface";
import axios from "@/lib/axios";

export type StaffStatus = "active" | "on_leave" | "terminated";
export type AccountStatus = "active" | "inactive";
export type AccountRole = "admin" | "cashier" | "warehouse_manager" | "order_processing";

export interface FetchStaffsParams {
  page?: number;
  limit?: number;
  q?: string;
  staffStatus?: StaffStatus;
  role?: string;
  accountStatus?: AccountStatus;
}

export interface CreateStaffPayload {
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  position?: string;
  staffStatus?: StaffStatus;
  image?: File | null;
  username: string;
  password: string;
  role?: AccountRole;
  accountStatus?: AccountStatus
}

export interface UpdateStaffPayload {
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  position?: string;
  staffStatus?: StaffStatus;
  image?: File | null;
  role?: AccountRole;
  accountStatus?: AccountStatus
}

const staffApi = {
  fetchStaffs: async (params: FetchStaffsParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/staffs", { params });
  },

  fetchStaffById: async (id: string): Promise<IStaffDetail> => {
    return axios.get(`/staffs/${id}`);
  },

  fetchStaffByIdToAdminEdit: async (id: string): Promise<IEditStaff> => {
    return axios.get(`/staffs/admin-edit/${id}`);
  },

  createStaff: async (payload: CreateStaffPayload): Promise<IStaff> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else {
        formData.append(key, value as any);
      }
    });

    return axios.post("/staffs", formData);
  },

  updateStaff: async (id: string, payload: UpdateStaffPayload): Promise<IStaff> => {
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

    return axios.put(`/staffs/${id}`, formData);
  },

  updateStatus: async (id: string, status: StaffStatus): Promise<IStaff> => {
  return axios.patch(`/staffs/${id}/status`, { status });
  },

  deleteStaff: async (id: string) => {
    return axios.delete(`/staffs/${id}`);
  },
}

export default staffApi;