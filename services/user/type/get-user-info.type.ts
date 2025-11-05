import { UserAccountModel } from '../model';

export interface GetUserInfoReq {}

export interface GetUserInfoRes {
  userInfo: UserAccountModel;
}
