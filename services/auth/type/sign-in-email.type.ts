export interface SignInEmailReq {
  email: string;
  password: string;
}

export interface SignInEmailRes {
  accessToken: string;
  refreshToken: string;
}
