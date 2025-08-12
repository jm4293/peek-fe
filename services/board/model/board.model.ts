import { IBoardArticleModel } from '@/services/board';
import { IStockCategoryModel } from '@/services/stock';
import { IUserAccountModel } from '@/services/user';

import { BoardTypeEnum } from '@/shared/enum/board';

export interface IBoardModel {
  id: number;
  type: BoardTypeEnum;
  title: string;
  viewCount: number;
  createdAt: Date;
  commentCount: number;
  likeCount: number;

  category: IStockCategoryModel;
  article: IBoardArticleModel;
  userAccount: IUserAccountModel;
}
