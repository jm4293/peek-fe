import { IBoardCommentModel } from '@/services/board';

export interface IBoardCommentListRes {
  boardComments: IBoardCommentModel[];
  total: number;
  nextPage: number | null;
}
