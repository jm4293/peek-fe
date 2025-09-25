import { IBoardCommentModel } from '@/services/board';

export interface IBoardCommentListRes {
  boardCommentList: IBoardCommentModel[];
  total: number;
  nextPage: number | null;
}
