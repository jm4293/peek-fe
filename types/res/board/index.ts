import { BoardTypeEnum } from '@/constant/enum/board';

import { IUserAccountRes } from '@/types/res';

export interface IBoardListRes {
  boards: IBoardRes[];
  total: number;
  nextPage: number | null;
}

export interface IBoardCategoryRes {
  id: number;
  name: string;
  enName: string;
  createdAt: Date;
  boards?: IBoardRes[];
}

export interface IBoardRes {
  id: number;
  type: BoardTypeEnum;
  title: string;
  viewCount: number;
  createdAt: Date;
  commentCount: number;
  likeCount: number;
  category: IBoardCategoryRes;
  article: IBoardArticleRes;
  userAccount: IUserAccountRes;
}

export interface IBoardArticleRes {
  content: string;
  createdAt: Date;
}
