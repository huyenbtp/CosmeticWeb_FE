import { IAddEditUserAccount, IEditUserAccount, IUser, IUserAccountDetail } from "./user.interface";

export interface IStaff {
  _id: string;
  staff_code: string;
  full_name: string;
  phone: string;
  image: string;
  status: string;
  user: IUser;
}

export interface IStaffDetail {
  _id: string;
  staff_code: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: IUserAccountDetail;
}

export interface IStaffPurchasesHandled {
  _id: string;
  order_code: string;
  customerName: string;
  date: string;
  final_amount: number;
  payment_method: string;
}

export interface IAddEditStaff {
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
  status: string;
  user: IAddEditUserAccount;
}

export interface IEditStaff {
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
  status: string;
  user: IEditUserAccount;
}