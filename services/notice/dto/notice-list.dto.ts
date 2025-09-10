import { NoticeTypeEnum } from '@/shared/enum/notice';

export interface INoticeListDto {
  page: number;
  type?: NoticeTypeEnum;
}
