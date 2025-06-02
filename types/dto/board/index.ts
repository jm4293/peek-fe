// 게시판
export interface IBoardListDto {
  pageParam: number;
  category?: string;
}

interface IBaseBoardDto {
  title: string;
  content: string;
}

export interface ICreateBoardDto extends IBaseBoardDto {
  categoryId: number;
}

export interface IUpdateBoardDto extends IBaseBoardDto {
  boardId: number;
}

// 게시판 댓글
interface IBaseBoardCommentDto {
  boardId: number;
  content: string;
}

export interface ICreateBoardCommentDto extends IBaseBoardCommentDto {
  commentId?: number;
}

export interface IUpdateBoardCommentDto extends IBaseBoardCommentDto {
  boardCommentSeq: number;
}

export interface IDeleteBoardCommentDto {
  boardId: number;
  boardCommentId: number;
}
