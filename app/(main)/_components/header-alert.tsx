'use client';

import { usePathname, useRouter } from 'next/navigation';

import { AlertSvg } from '@/asset/svg';

export function HeaderAlert() {
  const pathname = usePathname();
  const router = useRouter();

  const clickHandler = () => {
    if (pathname.includes('guest')) {
      alert('로그인이 필요한 서비스입니다.');
      return router.push('/auth/login');
    }

    router.push('/user/alert');
  };

  return pathname.includes('/user') ? (
    <div className="flex justify-end">
      <AlertSvg onClick={clickHandler} />
    </div>
  ) : null;
}
