'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/modal';

import { QueryKeys } from '@/shared/constant/query-key';

import boardApi from '../api/board.api';
import { CreateBoardReq, DeleteBoardReq, UpdateBoardReq } from '../type';

export const useBoardMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openToast } = useToast();

  const createBoardMutation = useMutation({
    mutationFn: (dto: CreateBoardReq) => boardApi.createBoard(dto),
    onSuccess: async (_, variables) => {
      const { categoryId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.list(categoryId) });

      openToast({ message: '게시글이 등록되었습니다.', type: 'success' });
      router.push('/board');
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: (dto: UpdateBoardReq) => boardApi.updateBoard(dto),
    onSuccess: async (_, variables) => {
      const { boardId } = variables;

      await queryClient.refetchQueries({ queryKey: QueryKeys.board.detail(String(boardId)) });
      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.list() });

      openToast({ message: '게시글이 수정되었습니다.', type: 'success' });
      router.push(`/board/${boardId}`);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: (dto: DeleteBoardReq) => boardApi.deleteBoard(dto),
    onSuccess: async () => {
      router.push('/board');

      await queryClient.invalidateQueries({ queryKey: QueryKeys.board.list() });
    },
  });

  // const boardLikeMutation = useMutation({
  //   mutationFn: (boardSeq: number) => boardApi.boardLike(boardSeq),
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({ queryKey: QueryKeys.board.list() });
  //   },
  // });

  return {
    createBoardMutation,
    updateBoardMutation,
    deleteBoardMutation,
    // boardLikeMutation,
  };
};
