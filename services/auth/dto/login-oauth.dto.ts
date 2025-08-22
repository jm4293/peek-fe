import { UserAccountTypeEnum } from '@/shared/enum/user';

export interface ILoginOauthDto {
  userAccountType: UserAccountTypeEnum;
  token: string;
  tokenType: string | null;
  expire: number | null;
}
