import { Suspense } from 'react';

import Login from '@/app/auth/login/Login';

import { Wrapper } from '@/components/wrapper';

export default function LoginPage() {
  return (
    <Wrapper.MAIN text="로그인">
      <Suspense>
        <Login />
      </Suspense>
    </Wrapper.MAIN>
  );
}
