'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';

import { useAuthMutation } from '@/services/auth';

import { UserAccountTypeEnum } from '@/shared/enum/user';

export default function GoogleOauth() {
  const router = useRouter();

  const { oauthSignInMutation } = useAuthMutation();

  useEffect(() => {
    (() => {
      const hash = window.location.hash;

      const params = new URLSearchParams(hash.substring(1));

      const token = params.get('access_token');
      const tokenType = params.get('token_type');
      const expire = params.get('expires_in');

      if (token) {
        oauthSignInMutation.mutate({
          token,
          userAccountType: UserAccountTypeEnum.GOOGLE,
          tokenType,
          expire: expire ? Number(expire) : null,
        });
      } else {
        router.push('/auth/login');
      }
    })();
  }, []);

  return (
    <div className="text-center flex flex-col gap-4">
      <Text.HEADING text="구글 로그인중..." />

      <LineSkeleton h={2} />
      <LineSkeleton h={2} />
    </div>
  );
}
