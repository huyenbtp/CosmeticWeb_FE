export interface ICategory {
  _id: string;
  parent_id: string | null;
  name: string;
  slug: string;
}

export interface IAddEditCategory {
  _id?: string;
  parent_id: string | null;
  name: string;
  slug: string;
}