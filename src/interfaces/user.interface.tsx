export interface IUser {
  _id: string;
  email: string;
  role: { _id: string; name: string };
  is_active: boolean;
}

export interface IUserAccountDetail {
  _id: string;
  email: string;
  role: string;
  is_active: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditUserAccount {
  email?: string;
  role: { _id: string; name: string };
  is_active: boolean;
}

export interface IEditUserAccount {
  role: { _id: string; name: string };
  is_active: boolean;
}