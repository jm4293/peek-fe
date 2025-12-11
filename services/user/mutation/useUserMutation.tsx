'use client';

import { LocalStorageUtil, SessionStorageUtil } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useModal, useToast } from '@/hooks/modal';

import { QueryKeys } from '@/shared/constant/query-key';

import userApi from '../api/user.api';
import { ResetUserPasswordReq, UpdateUserInfoReq, UpdateUserPasswordReq, UpdateUserThumbnailReq } from '../type';

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const updateUserMutation = useMutation({
    mutationFn: (dto: UpdateUserInfoReq) => userApi.updateUser(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: QueryKeys.user.myInfo() });
      openToast({ message: '회원정보 수정 완료', type: 'success' });
      router.push('/user');
      // router.refresh();
    },
  });

  const updateThumbnailMutation = useMutation({
    mutationFn: (dto: UpdateUserThumbnailReq) => userApi.updateThumbnail(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: QueryKeys.user.myInfo() });
    },
  });

  // const checkEmailMutation = useMutation({
  //   mutationFn: (dto: ICheckEmailDto) => userApi.checkEmail(dto),
  // });

  // const checkEmailCodeMutation = useMutation({
  //   mutationFn: (dto: ICheckEmailCodeDto) => userApi.checkEmailCode(dto),
  // });

  const updatePasswordMutation = useMutation({
    mutationFn: (dto: UpdateUserPasswordReq) => userApi.updatePassword(dto),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: QueryKeys.user.myInfo() });
      openToast({ message: '비밀번호가 변경되었습니다.', type: 'success' });
      router.push('/user');
    },
    onError: (err: any) => {
      const { message } = err.response.data;

      openModal({
        title: '알림',
        content: message,
        onConfirm: closeModal,
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (dto: ResetUserPasswordReq) => userApi.resetPassword(dto),
    onSuccess: (_, variables) => {
      const { email } = variables;

      openToast({ message: '비밀번호 재설정이 완료되었습니다.', type: 'success' });
      router.replace(`/auth/login?email=${email}`);
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: () => userApi.withdraw(),
    onSuccess: () => {
      queryClient.clear();
      LocalStorageUtil.clear();
      SessionStorageUtil.clear();
      openToast({ message: '탈퇴가 완료되었습니다.', type: 'success' });
      router.push('/home');
      router.refresh();
    },
  });

  // const readNotificationMutation = useMutation({
  //   mutationFn: (dto: IReadNotificationDto) => userApi.postNotificationRead(dto),
  //   onSuccess: async () => {
  //     await queryClient.refetchQueries({ queryKey: ['notification-list'] });
  //   },
  // });

  // const readAllNotificationMutation = useMutation({
  //   mutationFn: () => userApi.postNotificationReadAll(),
  //   onSuccess: async () => {
  //     await queryClient.refetchQueries({ queryKey: ['notification-list'] });
  //   },
  // });

  // const deleteNotificationMutation = useMutation({
  //   mutationFn: (notificationSeq: number) => userApi.deleteNotification(notificationSeq),
  //   onSuccess: async () => {
  //     await queryClient.refetchQueries({ queryKey: ['notification-list'] });
  //   },
  // });

  // const notificationTokenMutation = useMutation({
  //   mutationFn: (token: string) => userApi.postRegisterPushToken({ pushToken: token }),
  // });

  return {
    updateUserMutation,
    updateThumbnailMutation,
    // checkEmailMutation,
    // checkEmailCodeMutation,
    resetPasswordMutation,
    updatePasswordMutation,
    withdrawMutation,
    // readNotificationMutation,
    // readAllNotificationMutation,
    // deleteNotificationMutation,
    // notificationTokenMutation,
  };
};
