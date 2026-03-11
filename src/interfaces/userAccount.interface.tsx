export interface IUserAccount {
  _id: string;
  username: string;
  role: string;
  status: string;
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