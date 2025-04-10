'use client';

import { useAuthMutation } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { loginGoogle } from '@/app/auth/login/action';

import LineSkeleton from '@/components/skeleton/lineSkeleton';

import { ResCodeEnum } from '@/constant/enum';

export default function Form() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [accessToken, setAccessToken] = useState('');

  const { registerMessagingTokenMutation } = useAuthMutation();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        setAccessToken(token);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      startTransition(async () => {
        const ret = await loginGoogle(accessToken);

        if (ret.result === ResCodeEnum.SUCCESS) {
          // if (Notification.permission === 'granted') {
          //   const token = await requestForToken();
          //
          //   if (token) {
          //     await registerMessagingTokenMutation.mutateAsync(token);
          //   }
          // }

          router.push('/user');
        }

        if (ret.result === ResCodeEnum.FAIL) {
          router.push('/auth/login');
        }
      });
    }
  }, [accessToken]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Google 로그인중...</h1>

        <LineSkeleton height={2} />
      </div>
    </>
  );
}
