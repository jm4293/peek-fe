import { UserAccountModel } from '@/services/user';

import { BoardModel } from './board.model';

export interface BoardCommentModel {
  id: number;
  uuid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  parentCommentId: number | null;

  userAccount: UserAccountModel;
  board: BoardModel;
  replies: BoardCommentModel[];
}
