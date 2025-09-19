'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';

import { useToast } from '@/hooks/modal';

import { useAuthMutation } from '@/services/auth';

import { UserAccountTypeEnum } from '@/shared/enum/user';

export default function KakaoOauth() {
  const router = useRouter();

  const { openToast } = useToast();
  const { oauthSignInMutation } = useAuthMutation();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const token = queryParams.get('code');

    if (!token) {
      openToast({ type: 'error', message: '카카오 로그인에 실패했습니다. 다시 시도해주세요.' });
      router.replace('/auth/login');
      return;
    }

    oauthSignInMutation.mutate({
      token,
      userAccountType: UserAccountTypeEnum.KAKAO,
      tokenType: null,
      expire: null,
    });
  }, []);

  return (
    <div className="text-center flex flex-col gap-4">
      <Text.HEADING text="카카오 로그인중..." />

      <LineSkeleton h={2} />
      <LineSkeleton h={2} />
    </div>
  );
}
