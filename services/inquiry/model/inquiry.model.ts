import { UserAccountModel } from '@/services/user';

import { InquiryImageModel } from './inquiry-image.model';
import { InquiryReplyModel } from './inquiry-reply.model';

export interface InquiryModel {
  id: number;
  uuid: string;
  title: string;
  content: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date | null;

  inquiryReply: InquiryReplyModel;
  inquiryImages: InquiryImageModel[];
  userAccount: UserAccountModel;
}
