import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useToast } from '@/hooks/modal';

import { QueryKeys } from '@/shared/constant/query-key';

import inquiryApi from '../api';
import { ICreateInquiryDto, IUpdateInquiryDto } from '../dto';

export const useInquiryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openToast } = useToast();

  const createInquiryMutation = useMutation({
    mutationFn: (dto: ICreateInquiryDto) => inquiryApi.createInquiry(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.inquiry.list() });

      openToast({ message: '문의가 등록되었습니다.', type: 'success' });
      router.push('/user/inquiry');
    },
  });

  const updateInquiryMutation = useMutation({
    mutationFn: (dto: IUpdateInquiryDto) => inquiryApi.modifyInquiry(dto),
    onSuccess: async (_, variables) => {
      const { inquiryId } = variables;

      await queryClient.invalidateQueries({ queryKey: QueryKeys.inquiry.list() });

      openToast({ message: '문의가 수정되었습니다.', type: 'success' });
      router.push(`/user/inquiry/${inquiryId}`);
    },
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: (inquiryId: number) => inquiryApi.deleteInquiry(inquiryId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.inquiry.list() });

      openToast({ message: '문의가 삭제되었습니다.', type: 'success' });
      router.push('/user/inquiry');
    },
  });

  return {
    createInquiryMutation,
    updateInquiryMutation,
    deleteInquiryMutation,
  };
};
