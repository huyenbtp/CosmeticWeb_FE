export interface IStockStats {
  totalItems: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
};

export interface ILowStockItem {
  _id: string;
  name: string;
  category: string;
  brand: string;
  stock_quantity: number;
  last_imported: string;
}

export interface IOutOfStockItem {
  _id: string;
  name: string;
  category: string;
  brand: string;
  last_imported: string;
}