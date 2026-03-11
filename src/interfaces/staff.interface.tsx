import { IAddEditUserAccount, IEditUserAccount, IUserAccount, IUserAccountDetail } from "./userAccount.interface";

export interface IStaff {
  _id: string;
  staff_code: string;
  full_name: string;
  phone: string;
  image: string;
  position: string;
  status: string;
  account: IUserAccount;
}

export interface IStaffDetail {
  _id: string;
  staff_code: string;
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
  position: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  account: IUserAccountDetail;
  purchasesHandled: IStaffPurchasesHandled[];
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
  position: string;
  status: string;
  account: IAddEditUserAccount;
}

export interface IEditStaff {
  full_name: string;
  gender: string;
  dob: string;
  phone: string;
  image: string;
  position: string;
  status: string;
  account: IEditUserAccount;
}