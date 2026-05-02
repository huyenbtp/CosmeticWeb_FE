import { BrandStatus } from "@/lib/api/brand.api";

export interface IBrand {
  _id: string;
  name: string;
  logo: string;
  status: string;
  total_products: number;
}

export interface IAddEditBrand {
  _id?: string;
  name: string;
  logo: string;
  status: BrandStatus;
}