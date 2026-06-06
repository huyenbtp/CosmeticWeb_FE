export interface IExportItem {
  _id: string;
  export_id: string;
  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
  batch: {
    _id: string;
    batch_number: string;
  };
  quantity: number;
  unit_price: number;
  notes: string;
}

export interface IAddEditExportItem {
  batch_id: string;
  quantity: number;
  unit_price: number;
  notes: string;
}

export interface IExportItemUI {
  product_id: string;

  suggested_batch_id: string;
  suggested_batch_number: string;
  suggested_quantity: number;

  actual_batch_id: string;
  actual_batch_number: string;
  actual_quantity: number;

  unit_price: number;
  notes: string;

  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
}