import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/modal';

import AuthApi, { ICheckEmailCodeDto, ICheckEmailDto, ILoginEmailDto, ILoginOauthDto } from '@/services/auth';
import UserApi from '@/services/user';

import { userAccountTypeDescription } from '@/shared/enum/user';

import { LocalStorage } from '@/utils/localStorage';
import { SessionStorage } from '@/utils/sessionStorage';

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openToast } = useToast();

  const signInMutation = useMutation({
    mutationFn: (dto: ILoginEmailDto) => AuthApi.signInEmail(dto),
    onSuccess: () => {
      openToast({ type: 'success', message: '로그인에 성공했습니다.' });
      router.push('/home');
    },
    onError: (err: any) => {
      const { message } = err.response.data;

      openToast({ type: 'error', message: message || '로그인에 실패했습니다. 다시 시도해주세요.' });
    },
  });

  const oauthSignInMutation = useMutation({
    mutationFn: (dto: ILoginOauthDto) => AuthApi.signInOauth(dto),
    onSuccess: (_, variables) => {
      const { userAccountType } = variables;

      openToast({ type: 'success', message: `${userAccountTypeDescription[userAccountType]} 로그인에 성공했습니다.` });
      router.replace('/home');
    },
    onError: (err) => {
      router.replace('/auth/login');
    },
  });

  const checkEmailMutation = useMutation({
    mutationFn: (dto: ICheckEmailDto) => AuthApi.checkEmail(dto),
  });

  const checkEmailCodeMutation = useMutation({
    mutationFn: (dto: ICheckEmailCodeDto) => AuthApi.checkEmailCode(dto),
  });

  // const signUpMutation = useMutation({
  //   mutationFn: (dto: ISignUpDto) => AuthApi.signUp(dto),
  //   onSuccess: (res) => {
  //     const { email } = res.data;

  //     router.push(`/auth/login?email=${email}`);
  //   },
  // });

  const registerMessagingTokenMutation = useMutation({
    mutationFn: (token: string) => UserApi.postRegisterPushToken({ pushToken: token }),
  });

  const signoutMutation = useMutation({
    mutationFn: () => AuthApi.logout(),
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
      LocalStorage.clear();
      SessionStorage.clear();
      openToast({ type: 'success', message: '로그아웃에 성공했습니다.' });
      router.push('/home');
      router.refresh();
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
    // signUpMutation,
    signoutMutation,
    registerMessagingTokenMutation,
  };
};
