import { NoticeTypeEnum } from '@/shared/enum/notice';

import { NoticeModel } from '../model';

export interface GetNoticeListReq {
  page: number;
  type?: NoticeTypeEnum;
}

export interface GetNoticeListRes {
  noticeList: NoticeModel[];
  total: number;
  nextPage: number | null;
}
