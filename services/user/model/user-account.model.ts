import { IUserModel } from '@/services/user';

export interface IUserAccountModel {
  email: string;
  createdAt: Date;

  user: IUserModel;
}
