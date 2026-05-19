import { TagStatus } from "@/lib/api/tag.api";

export interface ITag {
  _id: string;
  name: string;
  status: string;
  total_products: number;
}

export interface IAddEditTag {
  _id?: string;
  name: string;
  status: TagStatus;
}