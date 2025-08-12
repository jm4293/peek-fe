import { UserAccountTypeEnum } from '@/shared/enum/user';

export interface ILoginOauthDto {
  userAccountType: UserAccountTypeEnum;
  access_token: string;
}
