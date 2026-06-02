export interface IBatch {
  _id: string;
  batch_number: string;
  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
  batch_code: string;
  mfg_date: string;
  exp_date: string;
  remaining_qty: number;
}

export interface IAddEditBatch {
  batch_number?: string;
  product_id: string;
  batch_code: string;
  mfg_date: string;
  exp_date: string;
}

export interface IBatchUI {
  batch_number?: string;
  product_id: string;
  batch_code: string;
  mfg_date: string;
  exp_date: string;

  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
}