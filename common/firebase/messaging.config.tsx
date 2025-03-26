'use client';

import { useEffect } from 'react';
import { requestForToken } from '@/common/firebase/firebase.config';
import { useAuthMutation } from '@/hooks';

interface IProps {
  children: React.ReactNode;
}

export default function MessagingConfig(props: IProps) {
  const { children } = props;

  const { registerMessagingTokenMutation } = useAuthMutation();

  useEffect(() => {
    (async () => {
      const token = await requestForToken();

      console.log('firebase cloud messaging token:', token);

      token && registerMessagingTokenMutation.mutate(token);
    })();
  }, []);

  return <div>{children}</div>;
}
