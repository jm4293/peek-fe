import { IUserAccountModel } from '@/services/user';

export interface IBoardCommentModel {
  id: number;
  content: string;
  createdAt: Date;
  parentCommentId: number | null;

  userAccount: IUserAccountModel;
  replies: IBoardCommentModel[];
}
