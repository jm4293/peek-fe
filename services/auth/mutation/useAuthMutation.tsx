import { LocalStorageUtil, SessionStorageUtil } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/modal';

import { useUserMutation } from '@/services/user';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';
import { userAccountTypeDescription } from '@/shared/enum/user';

import { notificationTokenAtom } from '@/stores/notification-token.atom';

import authApi from '../api/auth.api';
import { CheckEmailCodeReq, CheckEmailReq, SignInEmailReq, SignInOAuthReq, SignUpEmailReq } from '../type';

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const notificationToken = useAtomValue(notificationTokenAtom);

  const { openToast } = useToast();
  // const { notificationTokenMutation } = useUserMutation();

  const signInMutation = useMutation({
    mutationFn: (dto: SignInEmailReq) => authApi.signInEmail(dto),
    onSuccess: async () => {
      // if (notificationToken) {
      //   await notificationTokenMutation.mutateAsync(notificationToken);
      // }

      openToast({ type: 'success', message: '로그인에 성공했습니다.' });
      router.push('/home');
      router.refresh();
    },
    onError: (err: any) => {
      const { message } = err.response.data;

      openToast({ type: 'error', message: message || '로그인에 실패했습니다. 다시 시도해주세요.' });
    },
  });

  const oauthSignInMutation = useMutation({
    mutationFn: (dto: SignInOAuthReq) => authApi.signInOauth(dto),
    onSuccess: async (_, variables) => {
      const { userAccountType } = variables;

      // if (notificationToken) {
      //   await notificationTokenMutation.mutateAsync(notificationToken);
      // }

      LocalStorageUtil.setItem(LocalStorageKey.lastLoginMethod, JSON.stringify(userAccountType));
      openToast({ type: 'success', message: `${userAccountTypeDescription[userAccountType]} 로그인에 성공했습니다.` });
      router.replace('/home');
      // router.refresh();
    },
    onError: () => {
      router.replace('/auth/login');
    },
  });

  const checkEmailMutation = useMutation({
    mutationFn: (dto: CheckEmailReq) => authApi.checkEmail(dto),
  });

  const checkEmailCodeMutation = useMutation({
    mutationFn: (dto: CheckEmailCodeReq) => authApi.checkEmailCode(dto),
  });

  const signUpMutation = useMutation({
    mutationFn: (dto: SignUpEmailReq) => authApi.signUp(dto),
    onSuccess: (res) => {
      const { email } = res.data;

      openToast({ type: 'success', message: '회원가입이 완료되었습니다.' });
      router.push(`/auth/login?email=${email}`);
    },
    onError: () => {
      openToast({ type: 'error', message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
    },
  });

  const signoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // const firebase_messaging = getMessaging();
      // await deleteToken(firebase_messaging);

      // if ('serviceWorker' in navigator) {
      //   const registrations = await navigator.serviceWorker.getRegistrations();
      //
      //   navigator.serviceWorker.addEventListener('message', (event) => {
      //     if (event.data && event.data.type === 'TERMINATED') {
      //       console.log('Service worker has been terminated.');
      //     }
      //   });
      //
      //   for (const registration of registrations) {
      //     if (registration.active) {
      //       registration.active.postMessage({ type: 'TERMINATE' });
      //     }
      //     await registration.unregister();
      //   }
      // }

      queryClient.clear();
      // LocalStorageUtil.clear();
      SessionStorageUtil.clear();
      openToast({ type: 'success', message: '로그아웃에 성공했습니다.' });
      router.push('/home');
      // router.refresh();
    },
    onError: () => {
      openToast({ type: 'error', message: '로그아웃에 실패했습니다. 다시 시도해주세요.' });
    },
  });

  return {
    signInMutation,
    oauthSignInMutation,
    checkEmailMutation,
    checkEmailCodeMutation,
    signUpMutation,
    signoutMutation,
  };
};
