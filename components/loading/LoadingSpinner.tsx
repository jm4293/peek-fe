'use client';

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

export default function LoadingSpinner() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // 각 글자에 순차적으로 애니메이션 적용
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        tl.to(
          letter,
          {
            y: -20,
            opacity: 0.3,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          index * 0.15,
        ).to(
          letter,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          index * 0.15 + 0.3,
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  const letters = ['P', 'E', 'E', 'K'];

  return (
    <div className="fixed w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50">
      <div className="flex gap-2">
        {letters.map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              lettersRef.current[index] = el;
            }}
            className="text-2xl font-bold text-theme-main-color"
            style={{ display: 'inline-block' }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
