'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (theme === 'dark') {
    return <MdOutlineDarkMode size={24} color="#d0d0d4" onClick={() => setTheme('light')} />;
  }

  return <MdOutlineLightMode size={24} color="#151515" onClick={() => setTheme('dark')} />;
};
