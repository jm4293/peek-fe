import { useEffect } from 'react';

interface UseConfirmExitOptions {
  message?: string;
  enabled?: boolean;
}

function useConfirmExit(options: UseConfirmExitOptions = {}) {
  const { message = '정말로 페이지를 나가시겠습니까?', enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [message, enabled]);
}

export default useConfirmExit;
