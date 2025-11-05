export interface CheckEmailReq {
  email: string;
}

export interface CheckEmailRes {
  isExist: boolean;
  email: string;
  message: string;
}
