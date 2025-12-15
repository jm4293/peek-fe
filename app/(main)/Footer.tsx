'use client';

import { useDeviceLayout, useDevicePlatform, useFooterVisibility } from '@/hooks';
import { ChartCandlestick, House, MessagesSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';
import { StockCategoryEnum } from '@/shared/enum/stock/stock-category.enum';

import { LocalStorageUtil } from '@/utils/local-storage.util';

export const Footer = () => {
  const pathname = usePathname();

  const { isVisible } = useFooterVisibility();
  const { isMobile } = useDeviceLayout();
  const { platform } = useDevicePlatform();

  // 로컬스토리지 값 변경을 감지하기 위한 state
  const [boardStockCategory, setBoardStockCategory] = useState(() => {
    const savedCategory = LocalStorageUtil.getItem(LocalStorageKey.boardStockCategory);
    return savedCategory || StockCategoryEnum.KOSPI.toString();
  });

  const boardPath = useMemo(() => {
    return `/board?stockCategory=${boardStockCategory}`;
  }, [boardStockCategory]);

  const menuItems = [
    { path: '/home', icon: House, label: '메인', basePath: '/home' },
    { path: '/stock', icon: ChartCandlestick, label: '주식', basePath: '/stock' },
    { path: boardPath, icon: MessagesSquare, label: '커뮤니티', basePath: '/board' },
    { path: '/user', icon: User, label: '내 정보', basePath: '/user' },
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

  // 게시글 상세 페이지에서는 Footer 숨김
  if (pathname.startsWith('/board') && !isNaN(Number(pathname.split('/').pop()))) {
    return null;
  }

  if (!isMobile) {
    return null;
  }

  return (
    <footer
      className={`
          px-4 transition-transform duration-500 ease-in-out
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}>
      <div
        className={`px-6 py-3 flex justify-between items-center 
        backdrop-blur-md bg-white/50 dark:bg-[#1f1f22]/50 
        border border-white/30 dark:border-white/20 rounded-full shadow-lg
        ${platform === 'ios' ? 'mb-4' : 'mb-2'}
        `}>
        {menuItems.map(({ path, icon: Icon, label, basePath }) => {
          const isActive = pathname.startsWith(basePath);

          return (
            <Link key={basePath} href={path} className="relative flex flex-col items-center">
              <div
                className={`relative px-3 py-1 rounded-full transition-all duration-300 ease-in-out ${
                  isActive
                    ? 'backdrop-blur-sm bg-white/50 dark:bg-white/10 shadow-md scale-110'
                    : 'hover:bg-white/30 dark:hover:bg-white/5 hover:scale-110 active:scale-95'
                }`}>
                <Icon className={isActive ? 'text-theme-main-color' : 'text-theme-txt-secondary'} size={20} />
                {isActive && <div className="absolute inset-0 rounded-full" />}
              </div>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};
