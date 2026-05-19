export interface ISkinType {
  _id: string;
  name: string;
  description: string;
  status: string;
  total_products: number;
}

export interface IAddEditSkinType {
  _id?: string;
  name: string;
  description: string;
}