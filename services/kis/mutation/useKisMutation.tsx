import { useMutation } from '@tanstack/react-query';

import KisApi from '@/services/kis';

export const useKisMutation = () => {
  const deleteOauthRevoke = useMutation({
    mutationFn: () => KisApi.deleteOauthRevoke(),
    onSuccess: () => {
      // navigate('/auth/login');
    },
    onError: (err) => {},
  });

  return {
    deleteOauthRevoke,
  };
};
