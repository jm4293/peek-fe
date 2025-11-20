'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Wrapper } from '../wrapper';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { value: 'system', icon: Monitor, label: 'System' },
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
  ];

  return (
    <Wrapper.SECTION text="테마">
      <div className="flex flex-col gap-3">
        {themes.map(({ value, icon: Icon, label }) => {
          const isActive = theme === value;
          return (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-2
                ${
                  isActive
                    ? 'bg-[#9470dc]/10 border-[#9470dc] text-theme-text-main'
                    : 'bg-theme-bg-sub border-theme-border-light text-theme-text-sub hover:border-[#9470dc]/50 hover:text-theme-text-main'
                }
              `}
              title={label}>
              <Icon size={24} className={isActive ? 'text-[#9470dc]' : ''} />
              <span className="text-base font-medium">{label}</span>
              {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-[#9470dc]" />}
            </button>
          );
        })}
      </div>
    </Wrapper.SECTION>
  );
};
