import { useAtom } from 'jotai';

import { newsPanelAtom } from '@/stores/news-panel.atom';

export const useNewsPanel = () => {
  const [isOpen, setIsOpen] = useAtom(newsPanelAtom);

  const openPanel = () => {
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, openPanel, closePanel, togglePanel };
};

