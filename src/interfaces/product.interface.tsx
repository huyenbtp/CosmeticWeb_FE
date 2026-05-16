export interface IProduct {
  _id: string;
  name: string;
  category: { _id: string; name: string }
  brand: { _id: string; name: string }
  total_stock: number;
  selling_price: number;
  status: string;
  image: string;
}

export interface ICheckoutProduct {
  _id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  total_stock: number;
  selling_price: number;
  image: string;
}

export interface IMinMaxFilterData {
  price: {
    min: number;
    max: number;
  };
  stock: {
    min: number;
    max: number;
  };
}

export interface IProductDetail {
  _id: string;
  sku: string;
  name: string;
  category: { _id: string; name: string }
  brand: { _id: string; name: string }
  skinTypes: { _id: string; name: string }[];
  tags: { _id: string; name: string }[];
  selling_price: number;
  import_price: number;
  description: string;
  image: string;
  total_stock: number;
  reserved_stock: number;
  available_stock: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  totalSold: number;
  totalRevenue: number;
  lastImportDate: string | null;
}

export interface IAddEditProduct {
  sku?: string;
  name: string;
  category: { _id: string; name: string }
  brand: { _id: string; name: string }
  skinTypeIds: string[];
  tagIds: string[];
  selling_price: number;
  description: string;
  status: string;
  image: string;
}

export interface IFetchedCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface IFetchedBrand {
  _id: string;
  name: string;
}

export interface IFetchedSkinType{
  _id: string;
  name: string;
}

export interface IFetchedTag{
  _id: string;
  name: string;
}