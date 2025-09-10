'use client';

import { useDeviceLayout } from '@/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { BackButton, ThemeSwitcher } from '@/components/button';
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
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { isMobile } = useDeviceLayout();

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

  if (isMobile === null) {
    return (
      <header className="flex justify-center items-center bg-theme-bg-header">
        <Logo />
      </header>
    );
  }

  if (isMobile) {
    return (
      <header className="flex justify-between items-center bg-theme-bg-header">
        {pathname.split('/').length > 2 ? <BackButton /> : <div style={{ width: '24px' }} />}
        <Logo />
        <ThemeSwitcher />
      </header>
    );
  }

  return (
    <header
      className={`
        bg-theme-bg-header
        flex justify-center items-center
        transition-transform duration-500 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}>
      <div className="w-3/4 flex justify-between">
        <div className="flex items-center gap-8">
          <Logo />

          <div className="flex items-center gap-4">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.path} scroll={true}>
                <Text.HEADING text={item.name} />
              </Link>
            ))}
          </div>
        </div>

        <ThemeSwitcher />
      </div>
    </header>
  );
};
