'use client';

import { useEffect } from 'react';
import { requestForToken } from '@/common/firebase';

interface IProps {
  children: React.ReactNode;
}

export default function WebWorkerConfig(props: IProps) {
  const { children } = props;

  // const { registerFirebaseToken } = useAuthMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (async () => {
        const token = await requestForToken();

        console.log('worker token', token);

        if ('serviceWorker' in navigator && 'PushManager' in window) {
          navigator.serviceWorker
            .register('/firebase-messaging-sw.js') // 경로 수정
            .then((registration) => {})
            .catch((error) => {
              console.error('Service Worker registration failed:', error);
            });
        } else {
          console.warn('This browser does not support the required APIs for Firebase Messaging.');
        }
      })();
    }
  }, []);

  return <div>{children}</div>;
}
