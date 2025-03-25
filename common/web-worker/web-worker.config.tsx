'use client';

import { useEffect } from 'react';
import { useAuthMutation } from '@/hooks';
import { onMessageListener } from '@/common/firebase';

interface IProps {
  children: React.ReactNode;
}

export default function WebWorkerConfig(props: IProps) {
  const { children } = props;

  const { registerFirebaseToken } = useAuthMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (async () => {
        const token = await registerFirebaseToken();

        if ('serviceWorker' in navigator) {
          token &&
            navigator.serviceWorker
              .register('/firebase-messaging-sw.js')
              .then(async (registration) => {
                console.log('registration', registration);

                console.info('Service Worker registration successful');
              })
              .catch((err) => {
                console.log('Service Worker registration failed: ', err);
              });
        }
      })();
    }
  }, []);

  return <>{children}</>;
}
