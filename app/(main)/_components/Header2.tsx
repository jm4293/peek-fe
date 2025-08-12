'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const menuItems = [
  { name: '홈', path: '/home' },
  { name: '주식', path: '/stock' },
  { name: '게시판', path: '/board' },
];

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

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

  return (
    <header className={`${isVisible ? '' : 'hide'}`}>
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-12">
          <strong>PEEK</strong>

          <div className="flex items-center gap-8">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <h2>{item.name}</h2>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Link href="/user">마이페이지</Link>
        </div>
      </div>
    </header>
  );
}
