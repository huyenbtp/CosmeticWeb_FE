export interface IImportItem {
  _id: string;
  import_id: string;
  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
  quantity: number;
  unit_price: number;
}

export interface IAddEditImportItem {
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface IImportItemUI {
  product_id: string;
  quantity: number;
  unit_price: number;

  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  }
}