'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

import { useNewsPanel } from '@/hooks/news-panel';

import { Text } from '../text';

export const NewsPanel = () => {
  const { isOpen, closePanel } = useNewsPanel();

  // 패널이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out 
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closePanel}
      />

      {/* 패널 - 오른쪽에서 왼쪽으로 슬라이드 */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] max-w-[85vw] backdrop-blur-xl bg-white/95 dark:bg-[#1f1f22]/95 border-l border-theme-border-light/50 dark:border-white/10 z-50 transition-transform duration-300 ease-out flex flex-col 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* 헤더 */}
        <div className="p-5 border-b border-theme-border-light/50">
          <div className="flex items-center justify-between">
            <Text.TITLE text="PEEK" />

            <X className="text-theme-txt-secondary" size={20} onClick={closePanel} />
          </div>
        </div>

        {/* 컨텐츠 영역 - 스크롤 가능 */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* 여기에 새로운 소식 컨텐츠를 추가하세요 */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-theme-bg-card/50 border border-theme-border-light/50 hover:border-theme-border-light transition-colors">
              <Text.HEADING text="새로운 기능이 추가되었습니다!" className="mb-1.5" />
              <Text.PARAGRAPH text="더 나은 서비스를 위해 계속 업데이트 중입니다." color="gray" />
            </div>
            {/* 추가 컨텐츠... */}
          </div>
        </div>
      </div>
    </>
  );
};
