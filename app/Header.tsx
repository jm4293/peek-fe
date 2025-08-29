'use client';

import { useDeviceLayout } from '@/hooks';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { MdOutlineDashboard } from 'react-icons/md';
import { RiHome9Line } from 'react-icons/ri';
import { RiUserSettingsLine } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';

import { BackButton, ThemeSwitcher } from '@/components/button';
import { Thumbnail } from '@/components/image';
import { Text } from '@/components/text';

import { IUserAccountModel } from '@/services/user';

interface IProps {
  my: IUserAccountModel | null;
}

const menuItems = [
  { name: '메인', path: '/home', icon: <RiHome9Line size={18} /> },
  { name: '주식', path: '/stock', icon: <AiOutlineStock size={18} /> },
  { name: '게시판', path: '/board', icon: <MdOutlineDashboard size={18} /> },
  { name: '마이페이지', path: '/user', icon: <RiUserSettingsLine size={18} /> },
];

const Logo = () => {
  return (
    <Link href="/home" scroll={true}>
      <Text.TITLE text="PEEK" />
    </Link>
  );
};

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
      <header className="bg-theme-bg-header">
        <Logo />
      </header>
    );
  }

  if (isMobile) {
    return (
      <>
        <header className="justify-between bg-theme-bg-header">
          <BackButton />
          <Logo />
          <RxHamburgerMenu size={24} onClick={toggleMenu} />
        </header>

        {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu} />}

        <div
          className={`fixed top-0 right-0 h-full w-60 shadow-lg transform transition-transform duration-300 ease-in-out z-50 bg-theme-bg-header rounded-tl-xl rounded-bl-xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="relative h-full flex flex-col">
            <div className="flex justify-between items-center p-4">
              {!!my ? (
                <Link href="/user" onClick={closeMenu} className="flex items-center gap-2" scroll={true}>
                  <Thumbnail thumbnail={my.user.thumbnail} w={24} />
                  <Text.HEADING text={my.user.nickname} />
                </Link>
              ) : (
                <Link href="/auth/login" onClick={closeMenu} scroll={true}>
                  <Text.HEADING text="로그인" />
                </Link>
              )}
              <IoIosClose size={24} onClick={closeMenu} />
            </div>

            <div className="flex flex-col p-4 gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  scroll={true}
                  className="flex justify-between items-center"
                  onClick={closeMenu}>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <Text.HEADING text={item.name} />
                  </div>
                  <MdOutlineArrowForwardIos />
                </Link>
              ))}
            </div>

            <div className="absolute bottom-4 left-4">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <header
      className={`
        bg-theme-bg-header
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

        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          <div className="flex items-center gap-2">
            {!!my ? (
              <Link href="/user" className="flex items-center gap-2" scroll={true}>
                <Thumbnail thumbnail={my.user.thumbnail} />
                <Text.HEADING text={my.user.nickname} />
              </Link>
            ) : (
              <Link href="/auth/login" scroll={true}>
                <Text.HEADING text="로그인" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
