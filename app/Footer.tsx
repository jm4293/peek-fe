'use client';

import { useDeviceLayout } from '@/hooks';
import { ChartCandlestick, House, MessagesSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Text } from '@/components/text';

export const Footer = () => {
  const pathname = usePathname();

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

  if (isMobile) {
    return (
      <footer className={`flex justify-between items-center bg-theme-bg-header`}>
        {menuItems.map(({ path, icon: Icon, label }) => (
          <Link key={path} href={path} className="flex flex-col items-center">
            <Icon size={18} className={getActiveClass(path)} />
            <Text.HEADING text={label} color={getActiveClass(path) ? 'main' : 'default'} />
          </Link>
        ))}
      </footer>
    );
  }
};
