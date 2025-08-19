import { IUserAccountModel } from '@/services/user';

import { IBoardModel } from './board.model';

export interface IBoardCommentModel {
  id: number;
  content: string;
  createdAt: Date;
  parentCommentId: number | null;

  userAccount: IUserAccountModel;
  replies: IBoardCommentModel[];
  board: IBoardModel;
}
