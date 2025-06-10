import { AxiosConfig } from '@/common/axios';

import {
  IBoardListDto,
  ICreateBoardCommentDto,
  ICreateBoardDto,
  IDeleteBoardCommentDto,
  IUpdateBoardCommentDto,
  IUpdateBoardDto,
} from '@/types/dto';
import { IBoardCategoryRes, IBoardCommentListRes, IBoardListRes, IBoardRes } from '@/types/res';

class BoardApi extends AxiosConfig {
  private readonly _baseURL = '/board';

  async getBoardCategoryList() {
    return await this.get<IBoardCategoryRes, null>({ url: `${this._baseURL}/category` });
  }

  // 게시판
  async getBoardDetail(boardId: number) {
    return await this.get<IBoardRes, null>({ url: `${this._baseURL}/${boardId}` });
  }

  async getBoardList(dto: IBoardListDto) {
    return await this.get<IBoardListRes, { pageParam: number }>({
      url: `${this._baseURL}`,
      params: dto,
    });
  }

  async getBoardListMine(pageParam: number) {
    // return await this.get<IBoardListRes, { pageParam: number }>({
    //   url: `${this._baseURL}/mine`,
    //   params: { pageParam },
    // });
  }

  async createBoard(dto: ICreateBoardDto) {
    return await this.post<null, ICreateBoardDto>({ url: `${this._baseURL}`, data: dto });
  }

  async updateBoard(dto: IUpdateBoardDto) {
    const { boardId, ...res } = dto;

    return await this.put<null, Omit<IUpdateBoardDto, 'boardId'>>({ url: `${this._baseURL}/${boardId}`, data: res });
  }

  async deleteBoard(boardId: number) {
    return await this.delete<null, null>({ url: `${this._baseURL}/${boardId}` });
  }

  // 게시판 댓글
  async getBoardCommentList(params: { boardId: number; pageParam: number }) {
    const { boardId, pageParam } = params;

    return await this.get<IBoardCommentListRes, { pageParam: number }>({
      url: `${this._baseURL}/${boardId}/comments`,
      params: { pageParam },
    });
  }

  async getBoardCommentListMine(pageParam: number) {
    // return await this.get<IBoardCommentListRes, { pageParam: number }>({
    //   url: `${this._baseURL}/comment/mine`,
    //   params: { pageParam },
    // });
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

  // 게시판 좋아요(찜)
  async boardLike(boardSeq: number) {
    return await this.post<null, {}>({ url: `${this._baseURL}/${boardSeq}/like`, data: {} });
  }
}

export default new BoardApi();
