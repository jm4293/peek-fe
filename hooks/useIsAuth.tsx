import { useEffect, useState } from 'react';
import { SessionStorage } from '@/utils';

export default function useIsAuth() {
  const [isAuth, setIsAuth] = useState<string | null>(null);

  useEffect(() => {
    setIsAuth(SessionStorage.getItem('state'));
  }, []);

  return [isAuth];
}
