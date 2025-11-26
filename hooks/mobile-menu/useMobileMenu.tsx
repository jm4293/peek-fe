import { useAtom } from 'jotai';

import { mobileMenuAtom } from '@/stores/mobile-menu.atom';

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useAtom(mobileMenuAtom);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, openMenu, closeMenu, toggleMenu };
};

