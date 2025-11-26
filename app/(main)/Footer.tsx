'use client';

import { useDeviceLayout, useFooterVisibility } from '@/hooks';
import { ChartCandlestick, House, MessagesSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Text } from '@/components/text';

export const Footer = () => {
  const pathname = usePathname();

  const { isVisible } = useFooterVisibility();
  const { isMobile } = useDeviceLayout();

  const getActiveClass = (path: string) => {
    return pathname.startsWith(path) ? 'text-theme-main-color' : '';
  };

  const menuItems = [
    { path: '/home', icon: House, label: '메인' },
    { path: '/stock', icon: ChartCandlestick, label: '주식' },
    { path: '/board', icon: MessagesSquare, label: '커뮤니티' },
    { path: '/user', icon: User, label: '내 정보' },
  ];

  // 게시글 상세 페이지에서는 Footer 숨김
  if (pathname.startsWith('/board') && !isNaN(Number(pathname.split('/').pop()))) {
    return null;
  }

  if (isMobile) {
    return (
      <footer
        className={`
          flex justify-between items-center bg-theme-bg-header
          transition-transform duration-500 ease-in-out
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}>
        {menuItems.map(({ path, icon: Icon, label }) => (
          <Link key={path} href={path} className="flex flex-col items-center">
            <Icon className={getActiveClass(path)} size={18} />
            <Text.PARAGRAPH text={label} color={getActiveClass(path) ? 'main' : 'default'} />
          </Link>
        ))}
      </footer>
    );
  }

  return null;
};
