'use client';

import { useEffect, useState } from 'react';

export const useDeviceLayout = () => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);

      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  if (!width) {
    return { isMobile: null };
  }

  return { isMobile: width < 768 };
};
