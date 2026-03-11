import { IImportItem, IAddEditImportItem } from "./importItem.interface";

export interface IImport {
  _id: string;
  import_code: string;
  staff_id: string | null;
  staff: {
    _id: string;
    staff_code: string;
    full_name: string;
  };
  products_updated: number;
  items_imported: number;
  total_amount: number;
  createdAt: string;
}

export interface IMinMaxFilterData {
  totalAmount: {
    min: number;
    max: number;
  };
}

export interface IImportDetail {
  _id: string;
  import_code: string;
  staff: {
    _id: string;
    staff_code: string;
    full_name: string;
  };
  items: IImportItem[];
  products_updated: number;
  items_imported: number;
  total_amount: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditImport {
  items: IAddEditImportItem[];
  note: string;
}