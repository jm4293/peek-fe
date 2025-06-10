import { Suspense } from 'react';

import Login from '@/app/auth/login/Login';

function SearchBarFallback() {
  return <></>;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <Login />
    </Suspense>
  );
}
