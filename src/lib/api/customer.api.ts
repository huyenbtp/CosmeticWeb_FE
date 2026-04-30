import { ICustomer } from "@/interfaces/customer.interface";
import axios from "@/lib/axios";

export interface CustomerPayload {
  name: string;
  phone: string;
}

const customerApi = {
  fetchCustomers: async (): Promise<ICustomer[]> => {
    return axios.get("/api/customers");
  },

  fetchCustomerById: async (id: string): Promise<ICustomer> => {
    return axios.get(`/api/customers/${id}`);
  },

  fetchCustomerByPhone: async (phone: string): Promise<ICustomer> => {
    return axios.get(`/api/customers/phone/${phone}`);
  },

  createCustomer: async (payload: CustomerPayload): Promise<ICustomer> => {
    return axios.post("/api/customers", payload);
  },

  updateCustomer: async (id: string, payload: CustomerPayload): Promise<ICustomer> => {
    return axios.put(`/api/customers/${id}`, payload);
  },
}

export default customerApi;