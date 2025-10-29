'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import dark from '@/asset/login/kakao_login.png';
import light from '@/asset/login/kakao_login.png';

export const ButtonKakao = () => {
  const { theme } = useTheme();

  return (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`}>
      <Image src={theme === 'dark' ? dark : light} alt="Kakao Login" width={0} height={0} className="w-full h-10" />
    </Link>
  );
};
