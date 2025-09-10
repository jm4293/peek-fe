import { INoticeModel } from '../model';

export interface INoticeListRes {
  noticeList: INoticeModel[];
  total: number;
  nextPage: number | null;
}
