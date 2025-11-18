'use client';

import { LocalStorageUtil } from '@/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { Text } from '@/components/text';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';
import { UserAccountTypeEnum } from '@/shared/enum/user';

import { ButtonGoogle } from './ButtonGoogle';
import { ButtonKakao } from './ButtonKakao';
import { ButtonNaver } from './ButtonNaver';

gsap.registerPlugin(useGSAP);

const LastLoginCheck = () => {
  return (
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
      <div
        className="relative text-white px-4 py-1 rounded-full text-sm font-medium shadow-md"
        style={{ backgroundColor: 'var(--main-color)' }}>
        최근 로그인
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent"
          style={{ borderTopColor: 'var(--main-color)' }}></div>
      </div>
    </div>
  );
};

export function LoginOAuth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [lastLoginMethod, setLastLoginMethod] = useState<UserAccountTypeEnum | null>(null);

  useGSAP(
    () => {
      if (!buttonsRef.current) {
        return;
      }

      const tl = gsap.timeline();

      const buttonElements = Array.from(buttonsRef.current.children);

      tl.from(
        buttonElements,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
        },
        0.3,
      );

      return () => {
        tl.kill();
      };
    },
    {
      scope: containerRef,
    },
  );

  useEffect(() => {
    const lastMethod = LocalStorageUtil.getItem(LocalStorageKey.lastLoginMethod);

    if (lastMethod) {
      setLastLoginMethod(JSON.parse(lastMethod));
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md" ref={containerRef}>
      <div ref={textRef}>
        <Text.TITLE text="안녕하세요!" className="text-center" />
        <Text.SUBTITLE text="다양한 서비스를 이용해보세요." className="text-center" />
      </div>

      <div className="flex flex-col gap-8 w-full px-8" ref={buttonsRef}>
        <div className="relative w-full">
          {lastLoginMethod === UserAccountTypeEnum.GOOGLE && <LastLoginCheck />}
          <ButtonGoogle />
        </div>

        <div className="relative w-full">
          {lastLoginMethod === UserAccountTypeEnum.NAVER && <LastLoginCheck />}
          <ButtonNaver />
        </div>

        <div className="relative w-full">
          {lastLoginMethod === UserAccountTypeEnum.KAKAO && <LastLoginCheck />}
          <ButtonKakao />
        </div>

        <Text.PARAGRAPH
          text="계속 진행하면 PEEK의 이용약관 및 개인정보처리방침에 동의하는 것입니다."
          className="text-center"
        />
      </div>
    </div>
  );
}
