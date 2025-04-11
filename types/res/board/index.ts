import { IBoard, IBoardComment, IBoardCommentReply } from '@/types/interface';

export interface IBoardListRes {
  boards: IBoard[];
  total: number;
  nextPage: number | null;
}

export interface IBoardDetailRes {
  board: IBoard;
  isMine: boolean;
}

export interface IBoardCommentListRes {
  boardComments: (IBoardComment & {
    isMine: boolean;
    boardCommentReplies: (IBoardCommentReply & { isMine: boolean })[];
  })[];
  total: number;
  nextPage: number | null;
}
