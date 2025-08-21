'use client';

import { useDeviceLayout } from '@/hooks';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { PiHamburger } from 'react-icons/pi';

import { BackButton } from '@/components/button';
import { Thumbnail } from '@/components/image';
import { Text } from '@/components/text';

import { IUserAccountModel } from '@/services/user';

interface IProps {
  my: IUserAccountModel | null;
}

const menuItems = [
  { name: '홈', path: '/home' },
  { name: '주식', path: '/stock' },
  { name: '게시판', path: '/board' },
];

export function Header(props: IProps) {
  const { my } = props;

  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const { isMobile } = useDeviceLayout();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    if (!isMobile) {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobile]);

  if (isMobile === null) {
    return (
      <header>
        <strong>PEEK</strong>
      </header>
    );
  }

  if (isMobile) {
    return (
      <>
        <header>
          <div className="w-full flex justify-between items-center">
            <BackButton />
            <strong>PEEK</strong>
            <PiHamburger size={24} onClick={toggleMenu} />
          </div>
        </header>

        {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu} />}

        <div
          className={`fixed top-0 right-0 h-full w-60 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              {!!my ? (
                <Link href="/user" onClick={closeMenu} className="flex items-center gap-2">
                  <Thumbnail thumbnail={my.user.thumbnail} w={24} />
                  <Text.HEADING text={my.user.nickname} />
                </Link>
              ) : (
                <Link href="/auth/login" onClick={closeMenu}>
                  <Text.HEADING text="로그인" />
                </Link>
              )}
              <IoIosClose size={24} onClick={closeMenu} />
            </div>

            <div className="flex flex-col p-4 gap-4">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.path} onClick={closeMenu}>
                  <Text.HEADING text={item.name} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <header
      className={`flex justify-center transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className={`${isMobile ? 'w-full' : 'w-3/4'} flex justify-between`}>
        <div className="flex items-center gap-8">
          <strong>PEEK</strong>

          <div className="flex items-center gap-4">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <Text.HEADING text={item.name} />
              </Link>
            ))}
          </div>
        </div>

        {!!my ? (
          <Link href="/user" className="flex items-center gap-2">
            <Thumbnail thumbnail={my.user.thumbnail} w={24} />
            <Text.HEADING text={my.user.nickname} />
          </Link>
        ) : (
          <Link href="/auth/login">
            <Text.HEADING text="로그인" />
          </Link>
        )}
      </div>
    </header>
  );
}
