'use client';

import { useEffect, useState, useTransition } from 'react';
import { loginGoogle } from '@/app/auth/login/google/action';
import Skeleton from '@/components/skeleton/skeleton';

export default function Form() {
  const [isPending, startTransition] = useTransition();

  const [accessToken, setAccessToken] = useState('');

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
        await loginGoogle(accessToken);
      });
    }
  }, [accessToken]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Google 로그인중...</h1>

        <Skeleton />
      </div>
    </>
  );
}
