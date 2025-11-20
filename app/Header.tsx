'use client';

import { useDeviceLayout } from '@/hooks';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Text } from '@/components/text';

const menuItems = [
  { name: '메인', path: '/home' },
  { name: '주식', path: '/stock' },
  { name: '커뮤니티', path: '/board' },
  { name: '내 정보', path: '/user' },
];

const Logo = () => {
  return (
    <Link href="/home" scroll={true}>
      <Text.TITLE text="PEEK" />
    </Link>
  );
};

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isMobile, isPending } = useDeviceLayout();

  if (isPending) {
    return (
      <header className="flex justify-center items-center bg-theme-bg-header">
        <Logo />
      </header>
    );
  }

  if (isMobile) {
    return (
      <header className="bg-theme-bg-header">
        <div className="w-full h-full grid grid-cols-3 items-center px-4">
          <div className="justify-self-start">
            {pathname.split('/').length > 2 && <ChevronLeft onClick={() => router.back()} />}
          </div>
          <div className="justify-self-center">
            <Logo />
          </div>
          <div className="justify-self-end">{/* 우측 공간 (필요시 버튼 추가) */}</div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-theme-bg-header">
      <div className="w-full h-full max-w-[2345px] px-16 mx-auto flex justify-between items-center">
        <div className="w-full flex items-center gap-8">
          <Logo />

          <div className="flex items-center gap-4">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.path} scroll={true}>
                <Text.HEADING text={item.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
