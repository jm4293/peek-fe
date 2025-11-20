'use client';

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useToast } from '@/hooks/modal';

export const Toast = () => {
  const toastRoot = useRef<Element | null>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const { toast, closeToast } = useToast();

  useEffect(() => {
    toastRoot.current = document.getElementById('toast-root');
  }, []);

  useEffect(() => {
    if (toast.visible && toastRef.current) {
      // 나타날 때: 위에서 아래로 슬라이드 + 페이드인
      gsap.fromTo(
        toastRef.current,
        {
          // y: -100,
          opacity: 0,
        },
        {
          // y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'none',
        },
      );

      // 3초 후 사라지는 타이머
      const timer = setTimeout(() => {
        if (toastRef.current) {
          // 사라질 때: 아래에서 위로 슬라이드 + 페이드아웃
          gsap.to(toastRef.current, {
            // y: -100,
            opacity: 0,
            duration: 0.5,
            ease: 'none',
            onComplete: () => {
              closeToast();
            },
          });
        }
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast.visible, closeToast]);

  if (!toastRoot.current || !toast.visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      ref={toastRef}
      className="fixed left-1/2 top-24 -translate-x-1/2 px-4 py-3 rounded-lg border shadow-lg z-[1100] bg-theme-bg-card border-theme-border-light text-theme-txt-default"
      style={{ minWidth: 200, textAlign: 'center' }}>
      <p className="whitespace-pre-line w-full break-keep">{toast.message}</p>
    </div>,
    toastRoot.current,
  );
};
