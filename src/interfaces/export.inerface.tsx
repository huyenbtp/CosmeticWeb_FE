import { IExportItem, IAddEditExportItem } from "./exportItem.interface";

export interface IExport {
  _id: string;
  export_code: string;
  staff: {
    _id: string;
    staff_code: string;
    full_name: string;
  };
  total_amount: number;
  items_exported: number;
  type: string;
  createdAt: string;
}

export interface IExportDetail {
  _id: string;
  export_code: string;
  createdStaff: {
    _id: string;
    staff_code: string;
    full_name: string;
  };
  items: IExportItem[];
  products_updated: number;
  items_exported: number;
  total_amount: number;
  type: string;
  order: {
    _id: string;
    order_code: string;
  } | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditExport {
  items: IAddEditExportItem[];
  notes: string;
}