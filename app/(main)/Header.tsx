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
  return <Text.TITLE text="PEEK" className="text-center" />;
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
    const handleCustomStorageChange = () => {
      const savedCategory = LocalStorageUtil.getItem(LocalStorageKey.boardStockCategory);
      setBoardStockCategory(savedCategory || StockCategoryEnum.KOSPI.toString());
    };

    window.addEventListener('stockCategoryChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('stockCategoryChange', handleCustomStorageChange);
    };
  }, []);

  if (isPending) {
    return <header className="backdrop-blur-sm" />;
  }

  if (isMobile) {
    return (
      <header className="backdrop-blur-md px-6 h-12">
        <div className="w-full grid grid-cols-3 items-center">
          {pathname.split('/').length > 2 ? (
            <div onClick={() => router.back()}>
              <ChevronLeft className="text-theme-txt-default" size={20} />
            </div>
          ) : (
            <div />
          )}

          <Logo />

          <div />
        </div>
      </header>
    );
  }

  return (
    <header className="backdrop-blur-md py-3">
      <div className="px-12 py-2 bg-white/90 dark:bg-[#1f1f22]/90 rounded-full shadow-md">
        <div className="flex items-center gap-12">
          <Logo />

          <nav className="flex items-center gap-3">
            {menuItems.map(({ path, label, basePath }) => {
              const isActive = pathname.startsWith(basePath);

              return (
                <Link key={label} href={path} scroll={true} className="relative">
                  <div
                    className={`relative px-5 py-1 rounded-full transition-all duration-300 ease-in-out ${
                      isActive
                        ? 'backdrop-blur-sm bg-white/50 dark:bg-white/10 shadow-md scale-110'
                        : 'hover:bg-white/30 dark:hover:bg-white/5 hover:scale-110 active:scale-95'
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
      </div>
    </header>
  );
};
