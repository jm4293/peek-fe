import type { Meta, StoryObj } from '@storybook/nextjs';
import gsap from 'gsap';
import { useTheme } from 'next-themes';
import { useRef, useState } from 'react';

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// Standalone Toast 컴포넌트 (Jotai 없이 작동)
const StandaloneToast = ({ message }: { message: string }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      ref={toastRef}
      className={`
        fixed left-1/2 top-24 -translate-x-1/2 
        px-4 py-3 rounded-lg
        border transition-all duration-200
        shadow-lg z-[1100]
        ${isDark ? 'border-gray-700 bg-gray-800/50 text-gray-100' : 'border-gray-300 bg-white text-gray-900'}
      `}
      style={{ minWidth: 200, textAlign: 'center' }}>
      <p className="whitespace-pre-line w-full break-keep">{message}</p>
    </div>
  );
};

// Toast 데모 래퍼
const ToastDemo = ({ message = '테스트 토스트 메시지입니다!' }: { message?: string }) => {
  const [visible, setVisible] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const showToast = () => {
    setVisible(true);

    if (toastRef.current) {
      // 나타날 때: 위에서 아래로 슬라이드 + 페이드인
      gsap.fromTo(
        toastRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'none',
        },
      );

      // 3초 후 사라지는 타이머
      setTimeout(() => {
        if (toastRef.current) {
          // 사라질 때: 아래에서 위로 슬라이드 + 페이드아웃
          gsap.to(toastRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.5,
            ease: 'bounce',
            onComplete: () => {
              setVisible(false);
            },
          });
        }
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <button
        onClick={showToast}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
        Toast 띄우기
      </button>

      {visible && (
        <div
          ref={toastRef}
          className={`
            fixed left-1/2 top-24 -translate-x-1/2 
            px-4 py-3 rounded-lg
            border transition-all duration-200
            shadow-lg z-[1100]
            ${isDark ? 'border-gray-700 bg-gray-800/50 text-gray-100' : 'border-gray-300 bg-white text-gray-900'}
          `}
          style={{ minWidth: 200, textAlign: 'center' }}>
          <p className="whitespace-pre-line w-full break-keep">{message}</p>
        </div>
      )}
    </div>
  );
};

// 기본 Toast
export const Default: StoryObj = {
  render: () => <ToastDemo />,
};

// 긴 메시지 Toast
export const LongMessage: StoryObj = {
  render: () => (
    <ToastDemo message="이것은 매우 긴 토스트 메시지입니다. 여러 줄로 표시될 수 있으며, 애니메이션이 어떻게 작동하는지 확인할 수 있습니다." />
  ),
};

// 짧은 메시지 Toast
export const ShortMessage: StoryObj = {
  render: () => <ToastDemo message="짧은 메시지" />,
};

// 여러 줄 메시지 Toast
export const MultilineMessage: StoryObj = {
  render: () => <ToastDemo message={'첫 번째 줄\n두 번째 줄\n세 번째 줄'} />,
};

// 정적 표시 (애니메이션 없이)
export const Static: StoryObj = {
  render: () => <StandaloneToast message="정적으로 표시되는 Toast" />,
};
