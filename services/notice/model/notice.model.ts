import { UserAccountModel } from '@/services/user';

import { NoticeTypeEnum } from '@/shared/enum/notice';

import { NoticeImageModel } from './notice-image.model';

export interface NoticeModel {
  id: number;
  uuid: string;
  type: NoticeTypeEnum;
  title: string;
  content: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;

  noticeImages: NoticeImageModel[];
  userAccount: UserAccountModel;
}
