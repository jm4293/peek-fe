import { BoardCommentModel } from '../model';

export interface GetBoardCommentListReq {
  page: number;
  boardId: string;
}

export interface GetBoardCommentListRes {
  boardCommentList: BoardCommentModel[];
  total: number;
  nextPage: number | null;
}
