import { InquiryModel } from './inquiry.model';

export interface InquiryReplyModel {
  id: number;
  uuid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;

  inquiry: InquiryModel;
}
