interface IBaseBoardDto {
  title: string;
  content: string;
}

export interface ICreateBoardDto extends IBaseBoardDto {}

export interface IUpdateBoardDto extends IBaseBoardDto {
  boardSeq: number;
}

export interface IBaseBoardCommentDto {
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
