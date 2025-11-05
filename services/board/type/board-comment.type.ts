interface BaseBoardComment {
  boardId: number;
  content: string;
}

export interface CreateBoardCommentReq extends BaseBoardComment {
  boardCommentId?: number;
}

export interface CreateBoardCommentRes {}

export interface UpdateBoardCommentReq extends BaseBoardComment {
  boardCommentId: number;
}

export interface UpdateBoardCommentRes {}

export interface DeleteBoardCommentReq {
  boardId: number;
  boardCommentId: number;
}

export interface DeleteBoardCommentRes {}
