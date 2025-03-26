'use client';

import { useEffect } from 'react';
import { isClientRender } from '@/utils';
import { requestForToken } from '@/common/firebase/firebase.config';
import { useAuthMutation } from '@/hooks';

interface IProps {
  children: React.ReactNode;
}

export default function MessagingConfig(props: IProps) {
  const { children } = props;

  const { registerMessagingTokenMutation } = useAuthMutation();

  useEffect(() => {
    if (isClientRender()) {
      (async () => {
        const token = await requestForToken();

        console.log('firebase cloud messaging token:', token);

        registerMessagingTokenMutation.mutate(token);
      })();
    }
  }, []);

  return <div>{children}</div>;
}
