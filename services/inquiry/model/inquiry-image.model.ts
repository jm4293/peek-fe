import { InquiryModel } from './inquiry.model';

export interface InquiryImageModel {
  id: number;
  uuid: string;
  image: string;
  createdAt: Date;

  inquiry: InquiryModel;
}
