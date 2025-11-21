import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect } from 'react';

import { ThemeProvider } from '@/app/providers';

import { Toast } from '@/components/modal';

import { useToast } from '@/hooks/modal';

// Toast 환경을 제공하는 Decorator 컴포넌트
const ToastDecorator = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // toast-root DOM 요소 생성 (동기적으로 생성)
    if (typeof document !== 'undefined') {
      let toastRoot = document.getElementById('toast-root');
      if (!toastRoot) {
        toastRoot = document.createElement('div');
        toastRoot.id = 'toast-root';
        document.body.appendChild(toastRoot);
      }
    }

    return () => {
      const toastRoot = document.getElementById('toast-root');
      if (toastRoot && toastRoot.parentNode) {
        toastRoot.parentNode.removeChild(toastRoot);
      }
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen p-8">{children}</div>
      <Toast />
    </ThemeProvider>
  );
};

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastDecorator>
        <Story />
      </ToastDecorator>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// Toast를 제어할 수 있는 래퍼 컴포넌트
const ToastController = ({ message = '테스트 토스트 메시지입니다!' }: { message?: string }) => {
  const { openToast } = useToast();

  const showToast = () => {
    openToast({
      message,
      type: 'info',
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={showToast}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
        Toast 띄우기
      </button>
      <p className="text-sm text-gray-500">버튼을 클릭하면 토스트가 나타납니다</p>
    </div>
  );
};

// 기본 Toast
export const Main: Story = {
  render: () => <ToastController />,
};

// 긴 메시지 Toast
export const LongMessage: Story = {
  render: () => (
    <ToastController message="이것은 매우 긴 토스트 메시지입니다. 여러 줄로 표시될 수 있으며, 애니메이션이 어떻게 작동하는지 확인할 수 있습니다." />
  ),
};

// 짧은 메시지 Toast
export const ShortMessage: Story = {
  render: () => <ToastController message="짧은 메시지" />,
};

// 여러 줄 메시지 Toast
export const MultilineMessage: Story = {
  render: () => <ToastController message={'첫 번째 줄\n두 번째 줄\n세 번째 줄'} />,
};

// Success 타입 Toast
export const SuccessType: Story = {
  render: () => {
    const { openToast } = useToast();

    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => openToast({ message: '성공적으로 완료되었습니다!', type: 'success' })}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
          Success Toast 띄우기
        </button>
      </div>
    );
  },
};

// Error 타입 Toast
export const ErrorType: Story = {
  render: () => {
    const { openToast } = useToast();

    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => openToast({ message: '오류가 발생했습니다!', type: 'error' })}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
          Error Toast 띄우기
        </button>
      </div>
    );
  },
};

// Warning 타입 Toast
export const WarningType: Story = {
  render: () => {
    const { openToast } = useToast();

    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => openToast({ message: '주의가 필요합니다!', type: 'warning' })}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium">
          Warning Toast 띄우기
        </button>
      </div>
    );
  },
};

// Info 타입 Toast
export const InfoType: Story = {
  render: () => {
    const { openToast } = useToast();

    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => openToast({ message: '정보를 확인해주세요.', type: 'info' })}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
          Info Toast 띄우기
        </button>
      </div>
    );
  },
};
