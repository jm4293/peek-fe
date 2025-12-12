'use client';

import { useDeviceLayout } from '@/hooks';
import { LocalStorageUtil } from '@/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Text } from '@/components/text';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';
import { StockCategoryEnum } from '@/shared/enum/stock';

const Logo = () => {
  return (
    <Link href="/home" scroll={true}>
      <Text.TITLE text="PEEK" />
    </Link>
  );
};

const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="backdrop-blur-sm bg-white/10 dark:bg-[#1f1f22]/10">
      <div className="px-12 py-3 flex items-center justify-between backdrop-blur-md bg-white/50 dark:bg-[#1f1f22]/50 rounded-full shadow-lg">
        {children}
      </div>
    </header>
  );
};

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isMobile, isPending } = useDeviceLayout();

  const [boardStockCategory, setBoardStockCategory] = useState(() => {
    const savedCategory = LocalStorageUtil.getItem(LocalStorageKey.boardStockCategory);
    return savedCategory || StockCategoryEnum.KOSPI.toString();
  });

  const boardPath = useMemo(() => {
    return `/board?stockCategory=${boardStockCategory}`;
  }, [boardStockCategory]);

  const menuItems = [
    { path: '/home', label: '메인', basePath: '/home' },
    { path: '/stock', label: '주식', basePath: '/stock' },
    { path: boardPath, label: '커뮤니티', basePath: '/board' },
    { path: '/user', label: '내 정보', basePath: '/user' },
  ];

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LocalStorageKey.boardStockCategory) {
        setBoardStockCategory(e.newValue || StockCategoryEnum.KOSPI.toString());
      }
    };

    // 같은 탭에서의 로컬스토리지 변경도 감지하기 위한 커스텀 이벤트
    const handleCustomStorageChange = () => {
      const savedCategory = LocalStorageUtil.getItem(LocalStorageKey.boardStockCategory);
      setBoardStockCategory(savedCategory || StockCategoryEnum.KOSPI.toString());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
    };
  }, []);

  if (isPending) {
    return (
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
    );
    return null;
  }

  if (isMobile) {
    return (
      <header className="w-full backdrop-blur-sm bg-white/10 dark:bg-[#1f1f22]/10">
        <div className="px-4 py-2 bg-theme-bg-header shadow-md">
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
    <HeaderContainer>
      <div className="flex items-center gap-12">
        <Logo />

        <nav className="flex items-center gap-3">
          {menuItems.map(({ path, label, basePath }) => {
            // const isActive = pathname === item.path || (item.path !== '/home' && pathname.startsWith(item.path));

            const isActive = pathname.startsWith(basePath);

            return (
              <Link key={label} href={path} scroll={true} className="relative">
                <div
                  className={`relative px-5 py-1 rounded-full transition-all duration-300 ease-in-out ${
                    isActive
                      ? 'backdrop-blur-sm bg-white/50 dark:bg-white/10 shadow-md scale-105'
                      : 'hover:bg-white/30 dark:hover:bg-white/5 hover:scale-105 active:scale-95'
                  }`}>
                  <Text.HEADING
                    text={label}
                    color={isActive ? 'default' : 'gray'}
                    className={`whitespace-nowrap transition-all duration-300 ${isActive ? 'font-semibold' : 'font-medium'}`}
                  />
                  {isActive && <div className="absolute inset-0 rounded-full" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </HeaderContainer>
  );
};
