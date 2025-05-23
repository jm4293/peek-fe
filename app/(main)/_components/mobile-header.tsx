'use client';

import { usePathname } from 'next/navigation';

import { BackSvg } from '@/asset/svg';

const headerPathName: { [key: string]: string } = {
  home: '홈',
  stock: '주식',
  board: '게시판',
  user: '내 정보',
  notification: '알림',
};

export default function MobileHeader() {
  const pathname = usePathname();
  const path = pathname.split('/')[1];

  return (
    <header className="bg-white grid grid-cols-3 items-center" style={{ border: '1px solid red' }}>
      <BackSvg />
      <h1 className="text-center">{headerPathName[path]}</h1>
      {/*<HeaderTitle />*/}
      {/*<HeaderSearch />*/}
      {/*<HeaderAlert />*/}
    </header>
  );
}
