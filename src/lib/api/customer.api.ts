import { ICustomer } from "@/interfaces/customer.interface";
import axios from "@/lib/axios";

export interface CustomerPayload {
  name: string;
  phone: string;
}

const customerApi = {
  fetchAllCategories: async (): Promise<ICustomer[]> => {
    return axios.get("/customers");
  },

  fetchCustomerById: async (id: string): Promise<ICustomer> => {
    return axios.get(`/customers/${id}`);
  },

  fetchCustomerByPhone: async (phone: string): Promise<ICustomer> => {
    return axios.get(`/customers/phone/${phone}`);
  },

  createCustomer: async (payload: CustomerPayload): Promise<ICustomer> => {
    return axios.post("/customers", payload);
  },

  updateCustomer: async (id: string, payload: CustomerPayload): Promise<ICustomer> => {
    return axios.put(`/customers/${id}`, payload);
  },
}

export default customerApi;