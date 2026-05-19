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
    batch_code: string;
  };
  quantity: number;
  unit_price: number;
  notes: string;
}

export interface IAddEditExportItem {
  batch_id: string;
  quantity: number;
  unit_price: number;
}

export interface IExportItemUI {
  product_id: string;
  batch_code: string;
  quantity: number;
  unit_price: number;

  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
}