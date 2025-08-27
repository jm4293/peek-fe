'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/modal';

import { ICreateBoardDto, IUpdateBoardDto } from '@/services/board';
import BoardApi from '@/services/board/api/board.api';

import { QueryKeys } from '@/shared/constant/query-key';

export const useBoardMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openToast } = useToast();

  const createBoardMutation = useMutation({
    mutationFn: (dto: ICreateBoardDto) => BoardApi.createBoard(dto),
    onSuccess: async (_, variables) => {
      const { categoryId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.list(categoryId) });

      openToast({ message: '게시글이 등록되었습니다.', type: 'success' });
      router.push('/board');
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: (dto: IUpdateBoardDto) => BoardApi.updateBoard(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.refetchQueries({ queryKey: QueryKeys.board.detail(String(boardId)) });
      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.list() });

      openToast({ message: '게시글이 수정되었습니다.', type: 'success' });
      router.push(`/board/${boardId}`);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: (boardId: number) => BoardApi.deleteBoard(boardId),
    onSuccess: async () => {
      router.push('/board');

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.list() });
    },
  });

  const boardLikeMutation = useMutation({
    mutationFn: (boardSeq: number) => BoardApi.boardLike(boardSeq),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.list() });
    },
    onError: (err) => {},
  });

  return {
    createBoardMutation,
    updateBoardMutation,
    deleteBoardMutation,
    boardLikeMutation,
  };
};
