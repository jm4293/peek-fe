import { UserAccountTypeEnum } from '@/shared/enum/user';

export interface SignInOAuthReq {
  userAccountType: UserAccountTypeEnum;
  token: string;
  tokenType: string | null;
  expire: number | null;
}

export interface SignInOAuthRes {
  accessToken: string;
  refreshToken: string;
}
