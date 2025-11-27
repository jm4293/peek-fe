'use client';

import { DayjsUtil } from '@/utils';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

import { InfinityList } from '@/components/infinity-list';
import { PreText, Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { useNewsPanel } from '@/hooks/news-panel';

import { NoticeModel, useNoticeList } from '@/services/notice';

import { NoticeTypeEnumList } from '@/shared/enum/notice';

export const NewsPanel = () => {
  const { isOpen, closePanel } = useNewsPanel();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, isSuccess } = useNoticeList({});

  const renderItem = (item: NoticeModel) => {
    const { id, type, title, content, createdAt, noticeImages } = item;

    return (
      <li key={id}>
        <Wrapper.SECTION>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Text.PARAGRAPH text={DayjsUtil.of(createdAt).formatYYMMDDHHmm()} color="gray" />
              <div className="flex items-center gap-2">
                <Text.PARAGRAPH text={`[${NoticeTypeEnumList[type].label}]`} color={NoticeTypeEnumList[type].color} />
                <Text.PARAGRAPH text={title} />
              </div>
            </div>
            <div className="border-b border-theme-border-light/50" />
            <div>
              <PreText text={content} />
              <div className="flex flex-wrap justify-center gap-2">
                {noticeImages.map((image) => (
                  <Image key={image.id} src={image.image} alt={image.image} width={100} height={100} />
                ))}
              </div>
            </div>
          </div>
        </Wrapper.SECTION>
      </li>
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // 모달이 열릴 때 history entry 추가 (안드로이드 백 버튼 처리용)
      window.history.pushState(null, '', window.location.href);

      // 안드로이드 백 버튼 처리
      const handlePopState = () => {
        // 모달이 열려있을 때 백 버튼이 눌리면 모달을 닫음
        closePanel();
        // history를 다시 push해서 페이지가 뒤로 가지 않도록 함
        window.history.pushState(null, '', window.location.href);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('popstate', handlePopState);
      };
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, closePanel]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out 
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closePanel}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[420px] max-w-[100vw] backdrop-blur-xl bg-white/95 dark:bg-[#1f1f22]/95 z-50 transition-transform duration-300 ease-out flex flex-col gap-4
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col gap-2 p-5">
          <div className="flex justify-between items-center">
            <Text.TITLE text="PEEK" />
            <X className="text-theme-txt-secondary" size={20} onClick={closePanel} />
          </div>
          <div>
            <Text.PARAGRAPH text="최신 소식을 확인하세요!" color="gray" />
          </div>

          <div className="border-b border-theme-border-light/50" />

          <div className="h-[calc(100vh-100px)] overflow-y-auto">
            <InfinityList
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}>
              {data?.noticeList?.map(renderItem) || []}
            </InfinityList>

            <div className="mb-12" />
          </div>
        </div>
      </div>
    </>
  );
};
