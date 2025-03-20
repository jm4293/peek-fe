'use client';

import ActivateLogin from '@/app/(main)/mypage/_components/activateLogin';
import DeactivateLogin from '@/app/(main)/mypage/_components/deactivateLogin';

export default function VariableComponents() {
  const state = sessionStorage.getItem('state');

  return state ? <ActivateLogin /> : <DeactivateLogin />;
}
