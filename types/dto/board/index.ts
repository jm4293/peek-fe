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
  content: string;
  boardSeq: number;
}

export interface ICreateBoardCommentDto extends IBaseBoardCommentDto {}

export interface IUpdateBoardCommentDto extends IBaseBoardCommentDto {
  boardCommentSeq: number;
}

export interface IDeleteBoardCommentDto {
  boardSeq: number;
  boardCommentSeq: number;
}

// 게시글 댓글 답장
interface IBaseBoardCommentReplyDto {
  boardCommentSeq: number;
  content: string;
}

export interface ICreateBoardCommentReplyDto extends IBaseBoardCommentReplyDto {}

export interface IDeleteBoardCommentReplyDto {
  boardCommentSeq: number;
  boardCommentReplySeq: number;
}
