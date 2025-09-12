import { IBaseInquiryDto } from './base-inquiry.dto';

export interface IUpdateInquiryDto extends IBaseInquiryDto {
  inquiryId: number;
}
