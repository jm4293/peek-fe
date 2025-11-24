import { useDeviceLayout } from '@/hooks';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { footerVisibilityAtom } from '@/stores/footer-visibility.atom';

export const useFooterVisibility = () => {
  const [isVisible, setIsVisible] = useAtom(footerVisibilityAtom);
  const lastScrollY = useRef(0);
  const { isMobile } = useDeviceLayout();

  useEffect(() => {
    if (!isMobile) return;

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
  }, [isMobile, setIsVisible]);

  return { isVisible };
};
