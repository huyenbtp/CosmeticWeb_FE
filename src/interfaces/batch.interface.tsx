export interface IBatch {
  _id: string;
  import_item_id: string;
  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
  batch_code: string;
  mfg_date: string;
  exp_date: string;
  imported_qty: number;
  remaining_qty: number;
}