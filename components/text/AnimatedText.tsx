'use client';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  text: string;
  className?: string;
  color?: 'default' | 'gray' | 'blue' | 'red' | 'main';
}

const textColor = {
  default: 'text-theme-txt-default',
  gray: 'text-theme-txt-gray',
  blue: 'text-theme-txt-blue',
  red: 'text-theme-txt-red',
  main: 'text-theme-main-color',
};

const useTextAnimation = <T extends HTMLElement>(text: string) => {
  const textRef = useRef<T>(null);
  const prevTextRef = useRef<string>(text);

  useEffect(() => {
    if (!textRef.current) return;

    const currentText = text;
    const prevText = prevTextRef.current;

    // 숫자가 포함된 텍스트인지 확인
    const hasNumbers = /\d/.test(currentText) && /\d/.test(prevText);

    if (hasNumbers && currentText !== prevText) {
      // 숫자 추출하여 비교 (증가/감소 판단)
      const currentNum = parseFloat(currentText.replace(/[^\d.-]/g, ''));
      const prevNum = parseFloat(prevText.replace(/[^\d.-]/g, ''));
      const isIncreasing = currentNum > prevNum;

      // 주식 숫자처럼 위아래로 슬라이드 애니메이션
      gsap.fromTo(
        textRef.current,
        {
          y: isIncreasing ? 20 : -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
      );
    }

    prevTextRef.current = currentText;
  }, [text]);

  return textRef;
};

const TITLE = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  const textRef = useTextAnimation<HTMLHeadingElement>(text);

  return (
    <h1 ref={textRef} className={`text-xl font-semibold ${textColor[color]} ${className}`} {...rest}>
      {text}
    </h1>
  );
};

const SUBTITLE = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  const textRef = useTextAnimation<HTMLHeadingElement>(text);

  return (
    <h2 ref={textRef} className={`text-lg font-medium ${textColor[color]} ${className}`} {...rest}>
      {text}
    </h2>
  );
};

const HEADING = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  const textRef = useTextAnimation<HTMLHeadingElement>(text);

  return (
    <h3 ref={textRef} className={`text-base font-medium ${textColor[color]} ${className}`} {...rest}>
      {text}
    </h3>
  );
};

const PARAGRAPH = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  const textRef = useTextAnimation<HTMLParagraphElement>(text);

  return (
    <p ref={textRef} className={`text-sm ${textColor[color]} ${className}`} {...rest}>
      {text}
    </p>
  );
};

const CAPTION = (props: Props) => {
  const { className, text, color = 'default', ...rest } = props;
  const textRef = useTextAnimation<HTMLParagraphElement>(text);

  return (
    <p ref={textRef} className={`text-xs italic ${textColor[color]} ${className}`} {...rest}>
      {text}
    </p>
  );
};

export const AnimatedText = {
  TITLE,
  SUBTITLE,
  HEADING,
  PARAGRAPH,
  CAPTION,
};
