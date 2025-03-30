'use client';

import { useEffect } from 'react';
import { requestForToken } from '@/common/firebase/firebase.config';

interface IProps {
  children: React.ReactNode;
}

export default function MessagingConfig(props: IProps) {
  const { children } = props;

  useEffect(() => {
    async function requestNotificationPermission() {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          const token = await requestForToken();
          console.log('firebase cloud messaging token:', token);
        } else if (permission === 'denied') {
          console.log('Notification permission denied.');
        } else {
          console.log('Notification permission dismissed.');
        }
      } else {
        console.error('This browser does not support notifications.');
      }
    }

    requestNotificationPermission();
  }, []);

  return <div>{children}</div>;
}
