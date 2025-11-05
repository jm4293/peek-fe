export interface CheckEmailCodeReq {
  email: string;
  code: string;
}

export interface CheckEmailCodeRes {
  success: boolean;
  message: string;
}
