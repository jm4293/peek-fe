import { Suspense } from 'react';

import Login from '@/app/auth/login/Login';

import { Text } from '@/components/text';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="로그인" />
      <Suspense>
        <Login />
      </Suspense>
    </div>
  );
}
