import axios from 'axios';
import { useCallback } from 'react';

export const useApiError = () => {
  const handleError = useCallback((error: unknown): string => {
    const statusHandlers: {
      [key: number]: () => string;
      default: () => string;
    } = {
      400: () => '잘못된 요청입니다. 입력한 정보를 확인해주세요.',
      500: () => '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      default: () => '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    };

    if (axios.isAxiosError(error)) {
      const httpStatus = error.response?.status;
      const handle = httpStatus ? statusHandlers[httpStatus] : statusHandlers.default;
      return handle();
    }

    return '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.';
  }, []);

  return { handleError };
};
