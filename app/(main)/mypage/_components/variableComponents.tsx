'use client';

import { SessionStorage } from '@/utils';
import ActivateLogin from '@/app/(main)/mypage/_components/activateLogin';
import DeactivateLogin from '@/app/(main)/mypage/_components/deactivateLogin';

export default function VariableComponents() {
  const isAuth = SessionStorage.getItem('state');

  return isAuth ? <ActivateLogin /> : <DeactivateLogin />;
}
