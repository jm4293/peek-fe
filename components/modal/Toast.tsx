'use client';

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useToast } from '@/hooks/modal';

export const Toast = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { toast, closeToast } = useToast();

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

  const currentToastRoot = typeof document !== 'undefined' ? document.getElementById('toast-root') : null;

  if (!currentToastRoot || !toast.visible) {
    return null;
  }

  // 타입별 스타일 설정
  const toastStyles = (() => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      case 'info':
      default:
        return 'bg-theme-main-color/10 dark:bg-theme-main-color/20 border-theme-main-color/30 dark:border-theme-main-color/50 text-theme-main-color dark:text-theme-main-color-light';
    }
  })();

  return ReactDOM.createPortal(
    <div
      ref={toastRef}
      className={`fixed left-1/2 top-24 -translate-x-1/2 px-4 py-3 rounded-lg border shadow-lg z-[1100] ${toastStyles}`}
      style={{ minWidth: 200, textAlign: 'center' }}>
      <p className="whitespace-pre-line w-full break-keep">{toast.message}</p>
    </div>,
    currentToastRoot,
  );
};
