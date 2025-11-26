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
  // const { openMenu } = useMobileMenu();

  if (isPending) {
    return (
      <header className="w-full backdrop-blur-sm bg-white/10 dark:bg-[#1f1f22]/10">
        <div className="py-3 flex justify-center items-center backdrop-blur-md bg-white/50 dark:bg-[#1f1f22]/50 shadow-lg">
          <Logo />
        </div>
      </header>
    );
  }

  if (isMobile) {
    return (
      <header className="backdrop-blur-sm bg-white/10 dark:bg-[#1f1f22]/10">
        <div className="px-4 py-2 shadow-lg">
          <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start h-9 flex items-center">
              {pathname.split('/').length > 2 ? (
                <div
                  className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/5 cursor-pointer"
                  onClick={() => router.back()}>
                  <ChevronLeft className="text-theme-txt-default" size={20} />
                </div>
              ) : (
                <div className="w-9" />
              )}
            </div>
            <div className="justify-self-center">
              <Logo />
            </div>
            <div className="justify-self-end h-9 flex items-center">
              {/* <div
                className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/5 transition-all duration-300 ease-in-out active:scale-95 cursor-pointer"
                onClick={openMenu}>
                <Menu className="text-theme-txt-default" size={20} />
              </div> */}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="backdrop-blur-sm bg-white/10 dark:bg-[#1f1f22]/10">
      <div className="px-12 py-3 flex items-center justify-between backdrop-blur-md bg-white/50 dark:bg-[#1f1f22]/50 rounded-full shadow-lg">
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
