'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';

import { useToast } from '@/hooks/modal';

import { signinOauthAction } from '@/services/auth';

import { UserAccountTypeEnum, userAccountTypeDescription } from '@/shared/enum/user';

export default function KakaoOauth() {
  const router = useRouter();

  const { openToast } = useToast();

  useEffect(() => {
    (() => {
      const queryParams = new URLSearchParams(window.location.search);

      const token = queryParams.get('code');

      (async () => {
        if (token) {
          const { success } = await signinOauthAction({
            token,
            userAccountType: UserAccountTypeEnum.KAKAO,
            tokenType: null,
            expire: null,
          });

          if (!success) {
            openToast({ type: 'error', message: '로그인에 실패했습니다. 다시 시도해주세요.' });
            router.push('/auth/login');
            return;
          }

          openToast({
            type: 'success',
            message: `${userAccountTypeDescription[UserAccountTypeEnum.KAKAO]} 로그인에 성공했습니다.`,
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
        <Text.HEADING text="카카오 로그인중..." />

        <LineSkeleton height={2} />
        <LineSkeleton height={2} />
      </div>
    </>
  );
}
