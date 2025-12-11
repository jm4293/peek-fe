import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/modal';

import { QueryKeys } from '@/shared/constant/query-key';

import boardApi from '../api/board.api';
import { CreateBoardCommentReq, DeleteBoardCommentReq, UpdateBoardCommentReq } from '../type';

export const useBoardCommentMutation = () => {
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const createBoardCommentMutation = useMutation({
    mutationFn: (dto: CreateBoardCommentReq) => boardApi.createBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.commentList(String(boardId)) });
    },
  });

  const updateBoardCommentMutation = useMutation({
    mutationFn: (dto: UpdateBoardCommentReq) => boardApi.updateBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.commentList(String(boardId)) });
    },
  });

  const deleteBoardCommentMutation = useMutation({
    mutationFn: (dto: DeleteBoardCommentReq) => boardApi.deleteBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.commentList(String(boardId)) });
    },
    onError: (err: any) => {
      const { message } = err.response.data;

      openToast({ message, type: 'error' });
    },
  });

  return {
    createBoardCommentMutation,
    updateBoardCommentMutation,
    deleteBoardCommentMutation,
  };
};
