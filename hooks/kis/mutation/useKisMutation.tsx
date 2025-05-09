import { useMutation } from '@tanstack/react-query';

import KisApi from '@/api/kis/kis.api';

export const useKisMutation = () => {
  const deleteOauthRevoke = useMutation({
    mutationFn: () => KisApi.deleteOauthRevoke(),
    onSuccess: () => {
      // navigate('/auth/login');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    deleteOauthRevoke,
  };
};
