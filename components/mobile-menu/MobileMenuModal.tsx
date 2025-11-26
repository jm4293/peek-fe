'use client';

import { ChartCandlestick, House, MessagesSquare, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useMobileMenu } from '@/hooks/mobile-menu';

import { Text } from '../text';
import { Wrapper } from '../wrapper';

const menuItems = [
  { path: '/home', icon: House, label: '메인' },
  { path: '/stock', icon: ChartCandlestick, label: '주식' },
  { path: '/board', icon: MessagesSquare, label: '커뮤니티' },
  { path: '/user', icon: User, label: '내 정보' },
];

export const MobileMenuModal = () => {
  const pathname = usePathname();
  const { isOpen, closeMenu } = useMobileMenu();

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* 모달 패널 */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] backdrop-blur-xl bg-white/90 dark:bg-[#1f1f22]/90 border-l border-white/20 dark:border-white/10 shadow-2xl z-50 transition-transform duration-300 ease-out 
          flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* 헤더 */}
        <div className="p-2 ">
          <button onClick={closeMenu} className="flex justify-end">
            <X className="text-theme-txt-default" size={24} />
          </button>
        </div>

        {/* 메뉴 아이템들 - 스크롤 가능한 영역 */}
        <div className="flex-1 overflow-y-auto p-2">
          <Wrapper.SECTION>
            <div className="flex flex-col gap-4">
              {menuItems.map(({ path, icon: Icon, label }) => {
                const isActive = pathname === path || (path !== '/home' && pathname.startsWith(path));
                return (
                  <Link key={path} href={path} onClick={closeMenu} className="block">
                    <div
                      className={`relative py-3 rounded-full transition-all duration-300 ease-in-out ${
                        isActive
                          ? 'backdrop-blur-sm bg-white/50 dark:bg-white/10 shadow-md border border-white/20 dark:border-white/10'
                          : 'hover:bg-white/30 dark:hover:bg-white/5 active:scale-95'
                      }`}>
                      <div className="flex items-center gap-4 px-4">
                        <Icon className={isActive ? 'text-theme-main-color' : 'text-theme-txt-secondary'} size={24} />
                        <Text.HEADING
                          text={label}
                          color={isActive ? 'main' : 'default'}
                          className={isActive ? 'font-semibold' : 'font-medium'}
                        />
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-theme-main-color/10 to-transparent pointer-events-none" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Wrapper.SECTION>
        </div>
      </div>
    </>
  );
};
