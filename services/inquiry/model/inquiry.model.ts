import { IInquiryImageModel } from './inquiry-image.model';
import { IInquiryReplyModel } from './inquiry-reply.model';

export interface IInquiryModel {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  reply: IInquiryReplyModel;
  images: IInquiryImageModel[];
}
