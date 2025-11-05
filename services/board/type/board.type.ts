interface BaseBoard {
  title: string;
  content: string;
}

export interface CreateBoardReq extends BaseBoard {
  categoryId: number;
}

export interface CreateBoardRes {}

export interface UpdateBoardReq extends BaseBoard {
  boardId: number;
}

export interface UpdateBoardRes {}

export interface DeleteBoardReq {
  boardId: number;
}

export interface DeleteBoardRes {}
