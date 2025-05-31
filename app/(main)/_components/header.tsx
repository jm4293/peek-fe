'use client';

import { SessionStorage } from '@/utils';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsLoggedIn(!!SessionStorage.getItem('__xt__'));

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

  return (
    <header className={`${isVisible ? '' : 'hide'}`}>
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-12">
          <strong>PEEK</strong>
          <div className="flex items-center gap-8">
            <h2>인기</h2>
            <h2>주식</h2>
            <Link href="/board">게시판</Link>
            <h2>공지사항</h2>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {isLoggedIn ? <Link href="/user">마이페이지</Link> : <Link href="/auth/login">로그인</Link>}
        </div>
      </div>
    </header>
  );
}
