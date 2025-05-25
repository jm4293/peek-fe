import { LocalStorage, SessionStorage } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import AuthApi from '@/api/auth/auth.api';
import UserApi from '@/api/user/user.api';

import { ICheckEmailDto, ILoginEmailDto, ISignUpDto } from '@/types/dto';

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const signInMutation = useMutation({
    mutationFn: (dto: ILoginEmailDto) => AuthApi.postSignInEmail(dto),
    onSuccess: (res) => {
      const { accessToken } = res.data.data;

      SessionStorage.setItem('accessToken', accessToken);

      router.push('/home');
    },
  });

  const checkEmailMutation = useMutation({
    mutationFn: (dto: ICheckEmailDto) => AuthApi.postCheckEmail(dto),
  });

  const signUpMutation = useMutation({
    mutationFn: (dto: ISignUpDto) => AuthApi.postSignUp(dto),
    onSuccess: (res) => {
      const { email } = res.data.data;

      router.push(`/auth/login?email=${email}`);
    },
  });

  const registerMessagingTokenMutation = useMutation({
    mutationFn: (token: string) => UserApi.postRegisterPushToken({ pushToken: token }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => AuthApi.postLogout(),
    onSuccess: async () => {
      queryClient.clear();

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

      LocalStorage.clear();
      SessionStorage.clear();
      // axios.defaults.headers.common = {};

      router.push('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    signInMutation,
    checkEmailMutation,
    signUpMutation,

    logoutMutation,
    registerMessagingTokenMutation,
  };
};
