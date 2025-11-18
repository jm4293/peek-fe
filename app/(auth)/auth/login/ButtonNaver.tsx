'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';

const NaverLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"
      fill="#03C75A"
    />
  </svg>
);

export const ButtonNaver = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Link
      href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL}&state=peek`}
      className={`
        w-full flex items-center justify-center gap-3
        px-4 py-3 rounded-lg
        border transition-all duration-200
        hover:shadow-md active:scale-[0.98]
        ${isDark 
          ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-gray-100' 
          : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
        }
      `}>
      <NaverLogo />
      <span className="font-medium">Login with Naver</span>
    </Link>
  );
};
