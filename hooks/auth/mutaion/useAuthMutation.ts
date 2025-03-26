import AuthApi from '@/api/auth/auth.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICheckEmailDto, ILoginOauthDto } from '@/types/dto';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LocalStorage, SessionStorage } from '@/utils';
import { deleteToken, getMessaging } from 'firebase/messaging';
import UserApi from '@/api/user/user.api';

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // const signUpMutation = useMutation({
  //   mutationFn: (dto: ISignUpDto) => AuthApi.postSignUp(dto),
  //   onSuccess: (res) => {
  //     const { email } = res.data.data;
  //
  //     router.push('/auth/login' + `?email=${email}`);
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //   },
  // });

  // const loginEmailMutation = useMutation({
  //   mutationFn: (dto: ILoginEmailDto) => AuthApi.postSignInEmail(dto),
  //   onSuccess: async (res) => {
  //     const { accessToken } = res.data.data;
  //
  //     _registerSessionStorage({ accessToken });
  //
  //     // await _registerFirebaseToken();
  //
  //     router.push('/home');
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //   },
  // });

  const loginOauthMutation = useMutation({
    mutationFn: (dto: ILoginOauthDto) => AuthApi.postSignInOauth(dto),
    onSuccess: async (res) => {
      const { accessToken } = res.data.data;

      // await registerFirebaseToken();

      router.push('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const checkEmailMutation = useMutation({
    mutationFn: (dto: ICheckEmailDto) => AuthApi.postCheckEmail(dto),
  });

  const registerMessagingTokenMutation = useMutation({
    mutationFn: (token: string) => UserApi.postRegisterPushToken({ pushToken: token }),
    onSuccess: (res) => {
      console.log('registerFirebaseMessagingTokenMutation', res);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => AuthApi.postLogout(),
    onSuccess: async () => {
      queryClient.clear();

      const firebase_messaging = getMessaging();
      await deleteToken(firebase_messaging);

      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();

        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'TERMINATED') {
            console.log('Service worker has been terminated.');
          }
        });

        for (const registration of registrations) {
          if (registration.active) {
            registration.active.postMessage({ type: 'TERMINATE' });
          }
          await registration.unregister();
        }
      }

      LocalStorage.clear();
      SessionStorage.clear();
      axios.defaults.headers.common = {};

      router.push('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // const refreshTokenMutation = useMutation({
  //   mutationFn: () => AuthApi.postRefreshToken(),
  //   onSuccess: (res) => {
  //     const { accessToken } = res.data.data;
  //
  //     _registerSessionStorage({ accessToken });
  //   },
  //   onError: (err) => {
  //     // alert('로그인이 필요합니다.');
  //     // navigate('/auth/login', { replace: true });
  //   },
  // });

  // const _registerSessionStorage = (params: { accessToken: string }) => {
  //   const { accessToken } = params;
  //
  // const encryptedState = CryptoJS.AES.encrypt(
  //   JSON.stringify(params),
  //   process.env.NEXT_PUBLIC_LOCAL_STORAGE_SECRET_KEY as string,
  // ).toString();
  //
  // SessionStorage.setItem('state', accessToken);
  // };

  return {
    loginOauthMutation,
    checkEmailMutation,
    logoutMutation,
    registerMessagingTokenMutation,
  };
};
