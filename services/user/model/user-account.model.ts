import { IUserModel } from '@/services/user';

import { UserAccountTypeEnum } from '@/shared/enum/user';

export interface IUserAccountModel {
  id: number;
  uuid: string;
  email: string;
  userAccountType: UserAccountTypeEnum;
  createdAt: Date;

  user: IUserModel;
}
