import { BoardCommentModel, BoardModel } from '@/services/board';
import { InquiryModel } from '@/services/inquiry';
import { UserModel, UserNotificationModel, UserStockFavoriteModel } from '@/services/user';

import { UserAccountStatusEnum, UserAccountTypeEnum } from '@/shared/enum/user';

export interface UserAccountModel {
  id: number;
  uuid: string;
  email: string;
  status: UserAccountStatusEnum;
  userAccountType: UserAccountTypeEnum;
  createdAt: Date;
  updatedAt: Date | null;

  user: UserModel;
  userNotifications: UserNotificationModel[];
  userStockFavorites: UserStockFavoriteModel[];
  boards: BoardModel[];
  boardComments: BoardCommentModel[];
  boardLikes: BoardModel[];
  inquiries: InquiryModel[];
}
