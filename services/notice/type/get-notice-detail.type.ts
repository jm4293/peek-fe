import { NoticeModel } from '../model';

export interface GetNoticeDetailReq {
  noticeId: number;
}

export interface GetNoticeDetailRes {
  notice: NoticeModel;
}
