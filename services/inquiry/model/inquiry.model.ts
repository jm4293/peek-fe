import { IUserAccountModel } from '@/services/user';

import { IInquiryImageModel } from './inquiry-image.model';
import { IInquiryReplyModel } from './inquiry-reply.model';

export interface IInquiryModel {
  id: number;
  uuid: string;
  title: string;
  content: string;
  createdAt: Date;
  reply: IInquiryReplyModel;
  images: IInquiryImageModel[];

  userAccount: IUserAccountModel;
}
