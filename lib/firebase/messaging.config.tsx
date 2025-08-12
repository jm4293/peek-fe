'use client';

import { useEffect } from 'react';

import { requestForToken } from '@/lib/firebase/firebase.config';

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
          const token = await requestForToken();
        } else if (permission === 'denied') {
        } else {
        }
      } else {
      }
    }

    requestNotificationPermission();
  }, []);

  return <div>{children}</div>;
}
