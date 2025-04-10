import AuthApi from '@/api/auth/auth.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ICheckEmailDto } from '@/types/dto';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LocalStorage, SessionStorage } from '@/utils';
import UserApi from '@/api/user/user.api';

export const useAuthMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const checkEmailMutation = useMutation({
    mutationFn: (dto: ICheckEmailDto) => AuthApi.postCheckEmail(dto),
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
      axios.defaults.headers.common = {};

      router.push('/home');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    checkEmailMutation,
    logoutMutation,
    registerMessagingTokenMutation,
  };
};
