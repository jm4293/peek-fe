'use client';

import { LocalStorageUtil } from '@/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { AnimatedBackground } from '@/components/canvas';
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

const getTimeBasedMessage = () => {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 3) {
    return '밤늦게까지 투자 정보를 찾고 계시는군요';
  } else if (hour >= 3 && hour < 6) {
    return '새벽의 고요함 속에서 시장을 준비해요';
  } else if (hour >= 6 && hour < 9) {
    return '장 시작 전, 새로운 기회를 함께 찾아요';
  } else if (hour >= 9 && hour < 12) {
    return '장이 활발하게 움직이는 시간이에요';
  } else if (hour >= 12 && hour < 14) {
    return '점심 시간, 잠시 휴식하며 시장을 바라봐요';
  } else if (hour >= 14 && hour < 18) {
    return '장 마감 전, 하루의 마무리를 함께해요';
  } else if (hour >= 18 && hour < 21) {
    return '장이 마감되었어요, 오늘 하루는 어떠셨나요?';
  } else {
    return '내일을 위한 준비, 함께 정보를 나눠요';
  }
};

export function LoginOAuth() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  const [lastLoginMethod, setLastLoginMethod] = useState<UserAccountTypeEnum | null>(null);

  useGSAP(
    () => {
      if (!buttonsRef.current || !backButtonRef.current) {
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

      tl.from(
        backButtonRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2',
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
    <div className="relative w-screen h-screen flex justify-center items-center bg-theme-bg-main overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md" ref={containerRef}>
        <div ref={textRef} className="flex flex-col gap-2">
          <Text.TITLE text="안녕하세요!" className="text-center" />
          <Text.PARAGRAPH text={getTimeBasedMessage()} className="text-center" />
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

        <button
          ref={backButtonRef}
          onClick={() => router.back()}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 text-sm underline">
          돌아가기
        </button>
      </div>
    </div>
  );
}
