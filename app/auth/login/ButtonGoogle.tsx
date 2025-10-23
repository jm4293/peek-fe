'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

// import dark from '@/asset/login/google_login_dark.png';
import dark from '@/asset/login/google_login_light.png';
import light from '@/asset/login/google_login_light.png';

export const ButtonGoogle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Link
      href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL}&response_type=token&scope=openid email profile&include_granted_scopes=true`}>
      <Image src={theme === 'dark' ? dark : light} alt="Google Login" width={0} height={0} className="w-full h-10" />
    </Link>
  );
};
