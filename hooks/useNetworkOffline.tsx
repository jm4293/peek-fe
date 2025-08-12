import { useEffect, useState } from 'react';

export const useNetworkOffline = () => {
  const [isNetworkOffline, setIsNetworkOffline] = useState(() => {
    // SSR 환경에서는 기본값을 false로 설정
    if (typeof window === 'undefined') {
      return false;
    }
    return !navigator.onLine;
  });

  const handleOnOffLine = () => {
    setIsNetworkOffline(() => !navigator.onLine);
  };

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') {
      return;
    }

    // 초기 상태를 클라이언트에서 다시 설정 (hydration mismatch 방지)
    setIsNetworkOffline(!navigator.onLine);

    window.addEventListener('online', handleOnOffLine);
    window.addEventListener('offline', handleOnOffLine);

    return () => {
      window.removeEventListener('online', handleOnOffLine);
      window.removeEventListener('offline', handleOnOffLine);
    };
  }, []);

  return { isNetworkOffline };
};
