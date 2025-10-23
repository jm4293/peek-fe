'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

// import dark from '@/asset/login/naver_login_dark.png';
import dark from '@/asset/login/naver_login_light.png';
import light from '@/asset/login/naver_login_light.png';

export const ButtonNaver = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Link
      href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL}&state=peek`}>
      <Image src={theme === 'dark' ? dark : light} alt="Naver Login" width={0} height={0} className="w-full h-10" />
    </Link>
  );
};
