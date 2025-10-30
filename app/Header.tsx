'use client';

import { useDeviceLayout } from '@/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  const { isMobile } = useDeviceLayout();

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
    <header className="flex justify-center items-center bg-theme-bg-header">
      <div className="w-full max-w-screen-xl flex justify-between">
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
