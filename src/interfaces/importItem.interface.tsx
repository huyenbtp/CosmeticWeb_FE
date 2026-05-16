export interface IImportItem {
  _id: string;
  import_id: string;
  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
  batch_code: string;
  quantity: number;
  unit_price: number;
  mfg_date: string;
  exp_date: string;
}

export interface IAddEditImportItem {
  product_id: string;
  batch_code: string;
  quantity: number;
  unit_price: number;
  mfg_date: string;
  exp_date: string;
}

export interface IImportItemUI {
  product_id: string;
  batch_code: string;
  quantity: number;
  unit_price: number;
  mfg_date: string;
  exp_date: string;

  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
}