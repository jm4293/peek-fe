import createAxiosInstance from '@/lib/axios/axios.config';

import {
  CreateBoardCommentReq,
  CreateBoardReq,
  DeleteBoardCommentReq,
  DeleteBoardReq,
  GetBoardCommentListReq,
  GetBoardCommentListRes,
  GetBoardDetailRes,
  GetBoardListReq,
  GetBoardListRes,
  UpdateBoardCommentReq,
  UpdateBoardReq,
} from '@/services/board';

const axios = createAxiosInstance();
const baseURL = '/board';

const boardApi = {
  getBoardDetail: async (boardId: number) => {
    return await axios.get<GetBoardDetailRes, null>({ url: `${baseURL}/${boardId}` });
  },

  getBoardList: async (dto: GetBoardListReq) => {
    return await axios.get<GetBoardListRes, GetBoardListReq>({
      url: baseURL,
      params: dto,
    });
  },

  getBoardListMine: async (dto: GetBoardListReq) => {
    return await axios.get<GetBoardListRes, GetBoardListReq>({
      url: `${baseURL}/mine`,
      params: dto,
    });
  },

  createBoard: async (dto: CreateBoardReq) => {
    return await axios.post<null, CreateBoardReq>({ url: baseURL, data: dto });
  },

  updateBoard: async (dto: UpdateBoardReq) => {
    const { boardId, ...rest } = dto;

    return await axios.put<null, Omit<UpdateBoardReq, 'boardId'>>({
      url: `${baseURL}/${boardId}`,
      data: rest,
    });
  },

  deleteBoard: async (dto: DeleteBoardReq) => {
    const { boardId } = dto;

    return await axios.delete<null, null>({ url: `${baseURL}/${boardId}` });
  },

  // boardLike: async (boardSeq: number) => {
  //   return await axios.post<null, {}>({ url: `${baseURL}/${boardSeq}/like`, data: {} });
  // },

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  getBoardCommentList: async (params: GetBoardCommentListReq) => {
    const { boardId, page } = params;

    return await axios.get<GetBoardCommentListRes, Omit<GetBoardCommentListReq, 'boardId'>>({
      url: `${baseURL}/${boardId}/comments`,
      params: { page },
    });
  },

  getBoardCommentListMine: async (dto: Omit<GetBoardCommentListReq, 'boardId'>) => {
    return await axios.get<GetBoardCommentListRes, Omit<GetBoardCommentListReq, 'boardId'>>({
      url: `${baseURL}/mine/comment`,
      params: dto,
    });
  },

  createBoardComment: async (dto: CreateBoardCommentReq) => {
    const { boardId, ...rest } = dto;

    return await axios.post<null, Omit<CreateBoardCommentReq, 'boardId'>>({
      url: `${baseURL}/${boardId}/comment`,
      data: rest,
    });
  },

  updateBoardComment: async (dto: UpdateBoardCommentReq) => {
    const { boardId, boardCommentId, ...rest } = dto;

    return await axios.put<null, Omit<UpdateBoardCommentReq, 'boardId' | 'boardCommentId'>>({
      url: `${baseURL}/${boardId}/comment/${boardCommentId}`,
      data: rest,
    });
  },

  deleteBoardComment: async (dto: DeleteBoardCommentReq) => {
    const { boardId, boardCommentId } = dto;

    return await axios.delete<null, null>({ url: `${baseURL}/${boardId}/comment/${boardCommentId}` });
  },
};

export default boardApi;
