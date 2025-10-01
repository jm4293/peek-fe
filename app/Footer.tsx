'use client';

import { useDeviceLayout } from '@/hooks';
import { ChartCandlestick, House, MessagesSquare, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Text } from '@/components/text';

export const Footer = () => {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 48) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 게시글 상세 페이지에서는 Footer 숨김
  if (pathname.startsWith('/board') && pathname.split('/').length > 2) {
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
            <Icon className={getActiveClass(path)} />
            <Text.HEADING text={label} color={getActiveClass(path) ? 'main' : 'default'} />
          </Link>
        ))}
      </footer>
    );
  }

  return null;
};
