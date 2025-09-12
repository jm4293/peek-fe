import { IInquiryModel } from '../model';

export interface IInquiryListRes {
  inquiryList: IInquiryModel[];
  total: number;
  nextPage: number | null;
}
