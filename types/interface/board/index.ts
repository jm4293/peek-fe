import { IMARKET_TYPE } from '@/constant/stock';

import { IUser } from '@/types/interface';

export interface IBoard {
  boardSeq: number;
  marketType: IMARKET_TYPE;
  title: string;
  content: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;

  user: IUser;
}

export interface IBoardComment {
  boardCommentSeq: number;
  content: string;
  boardSeq: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date | null;

  user: IUser;
}

export interface IBoardCommentReply {
  boardCommentReplySeq: number;
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
  updatedAt: Date;

  user: IUser;
}
