import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import AuthApi, { ICheckEmailDto } from '@/services/auth';
import UserApi from '@/services/user';

import { LocalStorage } from '@/utils/localStorage';
import { SessionStorage } from '@/utils/sessionStorage';

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // const signInMutation = useMutation({
  //   mutationFn: (dto: ILoginEmailDto) => AuthApi.signInEmail(dto),
  //   onSuccess: (res) => {
  //     router.push('/home');
  //   },
  // });

  // const googleSignInMutation = useMutation({
  //   mutationFn: (dto: ILoginOauthDto) => AuthApi.signInOauth(dto),
  //   onSuccess: (res) => {
  //     router.push('/home');
  //   },
  // });

  const checkEmailMutation = useMutation({
    mutationFn: (dto: ICheckEmailDto) => AuthApi.checkEmail(dto),
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

  // const logoutMutation = useMutation({
  //   mutationFn: () => AuthApi.logout(),
  //   onSuccess: async () => {
  //     queryClient.clear();

  //     // const firebase_messaging = getMessaging();
  //     // await deleteToken(firebase_messaging);

  //     // if ('serviceWorker' in navigator) {
  //     //   const registrations = await navigator.serviceWorker.getRegistrations();
  //     //
  //     //   navigator.serviceWorker.addEventListener('message', (event) => {
  //     //     if (event.data && event.data.type === 'TERMINATED') {
  //     //       console.log('Service worker has been terminated.');
  //     //     }
  //     //   });
  //     //
  //     //   for (const registration of registrations) {
  //     //     if (registration.active) {
  //     //       registration.active.postMessage({ type: 'TERMINATE' });
  //     //     }
  //     //     await registration.unregister();
  //     //   }
  //     // }

  //     LocalStorage.clear();
  //     SessionStorage.clear();
  //     // axios.defaults.headers.common = {};

  //     router.push('/guest');
  //   },
  // });

  return {
    // signInMutation,
    // googleSignInMutation,
    checkEmailMutation,
    // signUpMutation,
    // logoutMutation,
    registerMessagingTokenMutation,
  };
};
