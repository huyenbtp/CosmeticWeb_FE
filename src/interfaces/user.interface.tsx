export interface IUser {
  _id: string;
  email: string;
  role:  { _id: string; name: string };
  is_active: boolean;
}

export interface IUserAccountDetail {
  _id: string;
  username: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAddEditUserAccount {
  username?: string;
  password?: string;
  role: string;
  status: string;
}

export interface IEditUserAccount {
  role: string;
  status: string;
}