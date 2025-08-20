import { UserAccountTypeEnum } from '@/shared/enum/user';

export interface ILoginOauthDto {
  userAccountType: UserAccountTypeEnum;
  token: string;
}
