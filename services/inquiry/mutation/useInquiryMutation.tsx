import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/modal';

import { QueryKeys } from '@/shared/constant/query-key';

import inquiryApi from '../api/inquiry.api';
import { CreateInquiryReq, DeleteInquiryReq, UpdateInquiryReq } from '../type';

export const useInquiryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openToast } = useToast();

  const createInquiryMutation = useMutation({
    mutationFn: (dto: CreateInquiryReq) => inquiryApi.createInquiry(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.inquiry.list() });

      openToast({ message: '문의가 등록되었습니다.', type: 'success' });
      router.push('/inquiry');
    },
  });

  const updateInquiryMutation = useMutation({
    mutationFn: (dto: UpdateInquiryReq) => inquiryApi.modifyInquiry(dto),
    onSuccess: async (_, variables) => {
      const { inquiryId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.inquiry.list() });

      openToast({ message: '문의가 수정되었습니다.', type: 'success' });
      router.push(`/inquiry/${inquiryId}`);
    },
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: (dto: DeleteInquiryReq) => inquiryApi.deleteInquiry(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.inquiry.list() });

      openToast({ message: '문의가 삭제되었습니다.', type: 'success' });
      router.push('/inquiry');
    },
  });

  return {
    createInquiryMutation,
    updateInquiryMutation,
    deleteInquiryMutation,
  };
};
