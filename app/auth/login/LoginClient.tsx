'use client';

import { LocalStorageUtil } from '@/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { LocalStorageKey } from '@/shared/constant/local-storage-key';
import { UserAccountTypeEnum } from '@/shared/enum/user';

import { ButtonGoogle } from './ButtonGoogle';
import { ButtonKakao } from './ButtonKakao';
import { ButtonNaver } from './ButtonNaver';

gsap.registerPlugin(useGSAP);

const LastLoginCheck = () => {
  return (
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
      <div
        className="relative text-white px-3 py-1.5 rounded-xl shadow-md"
        style={{ backgroundColor: 'var(--main-color)' }}>
        <Text.PARAGRAPH text="최근 로그인" className="text-white" />

        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent"
          style={{ borderTopColor: 'var(--main-color)' }}></div>
      </div>
    </div>
  );
};

export function LoginClient() {
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
    <div className="flex flex-col gap-10" ref={containerRef}>
      <div className="flex flex-col items-center gap-2" ref={textRef}>
        <Text.HEADING text="안녕하세요!" />
        <Text.HEADING text="소셜 계정으로 간편하게 로그인하세요." />
      </div>

      <div className="flex flex-col gap-2" ref={buttonsRef}>
        <Wrapper.SECTION>
          <div className="relative w-[180px] m-auto">
            {lastLoginMethod === UserAccountTypeEnum.GOOGLE && <LastLoginCheck />}
            <ButtonGoogle />
          </div>
        </Wrapper.SECTION>

        <Wrapper.SECTION>
          <div className="w-[180px] m-auto">
            {lastLoginMethod === UserAccountTypeEnum.NAVER && <LastLoginCheck />}
            <ButtonNaver />
          </div>
        </Wrapper.SECTION>

        <Wrapper.SECTION>
          <div className="w-[180px] m-auto">
            {lastLoginMethod === UserAccountTypeEnum.KAKAO && <LastLoginCheck />}
            <ButtonKakao />
          </div>
        </Wrapper.SECTION>
      </div>
    </div>
  );
}
