import AXIOS from '@/lib/axios';

import {
  IBoardCommentListDto,
  IBoardCommentListRes,
  IBoardDetailRes,
  IBoardListDto,
  IBoardListRes,
  ICreateBoardCommentDto,
  ICreateBoardDto,
  IDeleteBoardCommentDto,
  IUpdateBoardCommentDto,
  IUpdateBoardDto,
} from '@/services/board';

class BoardApi extends AXIOS {
  private readonly _baseURL = '/board';

  async getBoardDetail(boardId: number) {
    return await this.get<IBoardDetailRes, null>({ url: `${this._baseURL}/${boardId}` });
  }

  async getBoardList(dto: IBoardListDto) {
    return await this.get<IBoardListRes, IBoardListDto>({
      url: `${this._baseURL}`,
      params: dto,
    });
  }

  async getBoardListMine(page: number) {
    return await this.get<IBoardListRes, IBoardListDto>({
      url: `${this._baseURL}/mine`,
      params: { page },
    });
  }

  async createBoard(dto: ICreateBoardDto) {
    return await this.post<null, ICreateBoardDto>({ url: `${this._baseURL}`, data: dto });
  }

  async updateBoard(dto: IUpdateBoardDto) {
    const { boardId, ...res } = dto;

    return await this.put<null, Omit<IUpdateBoardDto, 'boardId'>>({
      url: `${this._baseURL}/${boardId}`,
      data: res,
    });
  }

  async deleteBoard(boardId: number) {
    return await this.delete<null, null>({ url: `${this._baseURL}/${boardId}` });
  }

  async getBoardCommentList(params: IBoardCommentListDto) {
    const { boardId, page } = params;

    return await this.get<IBoardCommentListRes, Omit<IBoardCommentListDto, 'boardId'>>({
      url: `${this._baseURL}/${boardId}/comments`,
      params: { page },
    });
  }

  async getBoardCommentListMine(page: number) {
    return await this.get<IBoardCommentListRes, { page: number }>({
      url: `${this._baseURL}/mine/comment`,
      params: { page },
    });
  }

  async createBoardComment(dto: ICreateBoardCommentDto) {
    const { boardId, ...res } = dto;

    return await this.post<null, Omit<ICreateBoardCommentDto, 'boardId'>>({
      url: `${this._baseURL}/${boardId}/comment`,
      data: res,
    });
  }

  async updateBoardComment(dto: IUpdateBoardCommentDto) {
    const { boardId, boardCommentSeq, ...res } = dto;

    return await this.put<null, Omit<IUpdateBoardCommentDto, 'boardId' | 'boardCommentSeq'>>({
      url: `${this._baseURL}/${boardId}/comment/${boardCommentSeq}`,
      data: res,
    });
  }

  async deleteBoardComment(dto: IDeleteBoardCommentDto) {
    const { boardId, boardCommentId } = dto;

    return await this.delete<null, null>({ url: `${this._baseURL}/${boardId}/comment/${boardCommentId}` });
  }

  async boardLike(boardSeq: number) {
    return await this.post<null, {}>({ url: `${this._baseURL}/${boardSeq}/like`, data: {} });
  }
}

const boardApi = new BoardApi();

export default boardApi;
