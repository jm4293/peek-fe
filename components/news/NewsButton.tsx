'use client';

import { useNewsPanel } from '@/hooks/news-panel';

import { Text } from '../text';

export const NewsButton = () => {
  const { openPanel } = useNewsPanel();

  return (
    <div
      onClick={openPanel}
      className="fixed left-0 bottom-32 z-40 bg-gradient-to-b from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-2 rounded-r-lg shadow-lg transition-all duration-200 cursor-pointer">
      <Text.PARAGRAPH text="새로운 소식" className="[writing-mode:vertical-rl] text-white font-medium" />
    </div>
  );
};
