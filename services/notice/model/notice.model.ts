import { UserAccountModel } from '@/services/user';

import { NoticeTypeEnum } from '@/shared/enum/notice';

export interface NoticeModel {
  id: number;
  uuid: string;
  type: NoticeTypeEnum;
  title: string;
  content: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;

  userAccount: UserAccountModel;
}
