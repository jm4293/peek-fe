import { UserTypeEnum } from '@/shared/enum/user/user-type.enum';

import { UserAccountModel } from './user-account.model';

export interface UserModel {
  id: number;
  uuid: string;
  nickname: string;
  name: string;
  type: UserTypeEnum;
  birth: Date | null;
  thumbnail: string | null;
  createdAt: Date;
  updatedAt: Date | null;

  userAccount: UserAccountModel;
}
