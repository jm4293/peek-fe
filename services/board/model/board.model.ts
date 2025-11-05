import { BoardArticleModel } from '@/services/board';
import { StockCategoryModel } from '@/services/stock';
import { UserAccountModel } from '@/services/user';

import { BoardTypeEnum } from '@/shared/enum/board';

export interface BoardModel {
  id: number;
  uuid: string;
  type: BoardTypeEnum;
  title: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date | null;
  commentCount: number;
  likeCount: number;

  userAccount: UserAccountModel;
  stockCategory: StockCategoryModel;
  boardArticle: BoardArticleModel;
}
