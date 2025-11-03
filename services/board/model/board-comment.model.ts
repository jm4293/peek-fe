import { IUserAccountModel } from '@/services/user';

import { IBoardModel } from './board.model';

export interface IBoardCommentModel {
  id: number;
  uuid: string;
  content: string;
  createdAt: Date;
  parentCommentId: number | null;

  userAccount: IUserAccountModel;
  board: IBoardModel;
  replies: IBoardCommentModel[];
}
