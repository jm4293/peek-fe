import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ICreateBoardCommentDto, IDeleteBoardCommentDto, IUpdateBoardCommentDto } from '@/services/board';
import BoardApi from '@/services/board/api/board.api';

export const useBoardCommentMutation = () => {
  const queryClient = useQueryClient();

  const createBoardCommentMutation = useMutation({
    mutationFn: (dto: ICreateBoardCommentDto) => BoardApi.createBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.refetchQueries({ queryKey: ['board-comment-list', boardId] });
    },
  });

  const updateBoardCommentMutation = useMutation({
    mutationFn: (dto: IUpdateBoardCommentDto) => BoardApi.updateBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.invalidateQueries({ queryKey: ['board-comment-list', boardId] });
    },
  });

  const deleteBoardCommentMutation = useMutation({
    mutationFn: (dto: IDeleteBoardCommentDto) => BoardApi.deleteBoardComment(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.refetchQueries({ queryKey: ['board-comment-list', boardId] });
    },
  });

  return {
    createBoardCommentMutation,
    updateBoardCommentMutation,
    deleteBoardCommentMutation,
  };
};
