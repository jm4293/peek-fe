'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  return null;
}
