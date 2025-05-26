export interface ILoginRes {
  accessToken: string;
}

export interface ISignUpRes {
  email: string;
}

export interface ICheckEmailRes {
  isExist: boolean;
  email: string;
}

export interface IRefreshTokenRes {
  accessToken: string;
}
