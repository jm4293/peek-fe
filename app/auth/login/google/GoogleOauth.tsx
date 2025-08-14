'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LineSkeleton } from '@/components/skeleton';

import { useToast } from '@/hooks/modal';

import { signinOauthAction } from '@/services/auth';

import { UserAccountTypeEnum, userAccountTypeDescription } from '@/shared/enum/user';

export default function GoogleOauth() {
  const router = useRouter();

  const { openToast } = useToast();

  useEffect(() => {
    (() => {
      const hash = window.location.hash;

      const params = new URLSearchParams(hash.substring(1));

      const token = params.get('access_token');

      (async () => {
        if (token) {
          const { success } = await signinOauthAction({
            access_token: token,
            userAccountType: UserAccountTypeEnum.GOOGLE,
          });

          if (!success) {
            openToast({ type: 'error', message: '로그인에 실패했습니다. 다시 시도해주세요.' });
            router.push('/auth/login');
            return;
          }

          openToast({
            type: 'success',
            message: `${userAccountTypeDescription[UserAccountTypeEnum.GOOGLE]} 로그인에 성공했습니다.`,
          });
          router.push('/home');
        } else {
          router.push('/auth/login');
        }
      })();
    })();
  }, []);

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
