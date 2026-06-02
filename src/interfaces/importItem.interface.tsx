export interface IImportItem {
  _id: string;
  import_id: string;
  product: {
    _id: string;
    sku: string;
    name: string;
    image: string;
  };
  batch: {
    _id: string;
    batch_number: string;
    batch_code: string;
  };
  quantity: number;
  unit_price: number;
}

export interface IAddEditImportItem {
  batch_id: string;
  quantity: number;
  unit_price: number;
}

export interface IImportItemUI {
  batch_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;

  batch: {
    _id: string;
    batch_number: string;
    batch_code: string;
    product: {
      _id: string;
      sku: string;
      name: string;
      image: string;
    };
  };
}