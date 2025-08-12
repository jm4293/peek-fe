'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkeleton } from '@/components/skeleton';

import { useAuthMutation } from '@/services/auth';

import { UserAccountTypeEnum } from '@/shared/enum/user';

export default function GoogleOauth() {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState('');

  const { googleSignInMutation } = useAuthMutation();

  useEffect(() => {
    (() => {
      const hash = window.location.hash;

      const params = new URLSearchParams(hash.substring(1));

      const token = params.get('access_token');

      if (token) {
        setAccessToken(token);
      } else {
        router.push('/auth/login');
      }
    })();
  }, []);

  useEffect(() => {
    if (accessToken) {
      googleSignInMutation.mutate({
        userAccountType: UserAccountTypeEnum.GOOGLE,
        access_token: accessToken,
      });
    }
  }, [accessToken]);

  return (
    <>
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Google 로그인중...</h1>

        <LineSkeleton height={2} />
        <LineSkeleton height={2} />
      </div>
    </>
  );
}
