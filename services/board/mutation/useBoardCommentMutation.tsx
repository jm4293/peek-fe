import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/modal';

import { ICreateBoardCommentDto, IDeleteBoardCommentDto, IUpdateBoardCommentDto } from '@/services/board';
import BoardApi from '@/services/board/api/board.api';

import { QueryKeys } from '@/shared/constant/query-key';

export const useBoardCommentMutation = () => {
  const queryClient = useQueryClient();

  const { openToast } = useToast();

  const createBoardCommentMutation = useMutation({
    mutationFn: (dto: ICreateBoardCommentDto) => BoardApi.createBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.commentList(String(boardId)) });
    },
  });

  const updateBoardCommentMutation = useMutation({
    mutationFn: (dto: IUpdateBoardCommentDto) => BoardApi.updateBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.commentList(String(boardId)) });
    },
  });

  const deleteBoardCommentMutation = useMutation({
    mutationFn: (dto: IDeleteBoardCommentDto) => BoardApi.deleteBoardComment(dto),
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
