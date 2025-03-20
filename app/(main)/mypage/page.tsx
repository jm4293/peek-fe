'use client';

import ActivateLogin from '@/app/(main)/mypage/_components/activateLogin';
import DeactivateLogin from '@/app/(main)/mypage/_components/deactivateLogin';
import useIsAuth from '@/hooks/useIsAuth';

export default function Page() {
  const [isAuth] = useIsAuth();

  return isAuth ? <ActivateLogin /> : <DeactivateLogin />;
}
