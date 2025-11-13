'use client';

import { useEffect, useState } from 'react';

import { Text } from '@/components/text';

interface Props {
  children: React.ReactNode;
}

export const NetworkError = (props: Props) => {
  const { children } = props;

  const [isNetworkOffline, setIsNetworkOffline] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return !navigator.onLine;
  });

  const handleOnOffLine = () => {
    setIsNetworkOffline(() => !navigator.onLine);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsNetworkOffline(!navigator.onLine);

    window.addEventListener('online', handleOnOffLine);
    window.addEventListener('offline', handleOnOffLine);

    return () => {
      window.removeEventListener('online', handleOnOffLine);
      window.removeEventListener('offline', handleOnOffLine);
    };
  }, []);

  if (isNetworkOffline) {
    return (
      <div className="w-screen h-screen">
        <div className="h-1/2 flex flex-col justify-center items-center gap-8">
          <strong>PEEK</strong>

          <div className="flex flex-col items-center gap-4">
            <Text.SUBTITLE text="네트워크 오프라인" />

            <div className="flex flex-col items-center gap-2">
              <Text.HEADING text="현재 접속이 원활하지 않습니다." />
              <Text.HEADING text="네트워크 문제로 화면을 불러오지 못하였습니다. 잠시 후 다시 시도해 주세요." />

              <Text.HEADING text="로그인 페이지로 이동" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
