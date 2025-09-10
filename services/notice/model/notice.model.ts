import { NoticeTypeEnum } from '@/shared/enum/notice';

export interface INoticeModel {
  id: number;
  type: NoticeTypeEnum;
  title: string;
  content: string;
  viewCount: number;
  createdAt: Date;
}
