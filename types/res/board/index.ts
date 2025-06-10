import { BoardTypeEnum } from '@/constant/enum/board';

import { IUserAccountRes } from '@/types/res';

export interface IBoardCategory {
  id: number;
  name: string;
  enName: string;
  createdAt: Date;
}

export interface IBoardCategoryRes {
  boardCategories: IBoardCategory[];
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

export interface IBoardListRes {
  boards: IBoardRes[];
  total: number;
  nextPage: number | null;
}

export interface IBoardArticleRes {
  content: string;
  createdAt: Date;
}

export interface IBoardCommentRes {
  id: number;
  content: string;
  createdAt: Date;
  parentCommentId: number | null;
  userAccount: IUserAccountRes;
  replies: IBoardCommentRes[];
}

export interface IBoardCommentListRes {
  boardComments: IBoardCommentRes[];
  total: number;
  nextPage: number | null;
}
