import { ICustomer, ICustomerDetail } from "@/interfaces/customer.interface";
import axios from "@/lib/axios";

export interface FetchCustomersParams {
  page?: number;
  limit?: number;
  q?: string;
  is_active?: boolean;
}

const customerApi = {
  fetchCustomers: async (params: FetchCustomersParams): Promise<{ data: any, pagination: any }> => {
    return axios.get("/api/customers", { params });
  },

  fetchCustomerById: async (id: string): Promise<ICustomerDetail> => {
    return axios.get(`/api/customers/${id}`);
  },

}

export default customerApi;