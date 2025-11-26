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
    if (isMobile) {
      return (
        <header className="flex justify-center items-center bg-theme-bg-header border-b border-theme-border-light">
          <Logo />
        </header>
      );
    }

    return (
      <header className="w-full backdrop-blur-xl">
        <div className="px-12 py-4 flex justify-center items-center backdrop-blur-xl bg-white/70 dark:bg-[#1f1f22]/70 border border-white/20 dark:border-white/10 rounded-full shadow-lg">
          <Logo />
        </div>
      </header>
    );
  }

  if (isMobile) {
    return (
      <header className="h-16 bg-theme-bg-header border-b border-theme-border-light">
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
    <header className="w-full backdrop-blur-xl">
      <div className="px-12 py-2 flex items-center justify-between backdrop-blur-xl bg-white/70 dark:bg-[#1f1f22]/70 border border-white/20 dark:border-white/10 rounded-full shadow-lg">
        <div className="flex items-center gap-12">
          <Logo />

          <nav className="flex items-center gap-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/home' && pathname.startsWith(item.path));
              return (
                <Link key={item.name} href={item.path} scroll={true} className="relative">
                  <div
                    className={`relative px-5 py-1 rounded-full transition-all duration-300 ease-in-out ${
                      isActive
                        ? 'backdrop-blur-sm bg-white/50 dark:bg-white/10 shadow-md scale-105'
                        : 'hover:bg-white/30 dark:hover:bg-white/5 hover:scale-105 active:scale-95'
                    }`}>
                    <Text.HEADING
                      text={item.name}
                      color={isActive ? 'default' : 'gray'}
                      className={`transition-all duration-300 ${isActive ? 'font-semibold' : 'font-medium'}`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent pointer-events-none animate-pulse" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
