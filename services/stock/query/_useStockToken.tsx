// import { useQuery } from '@tanstack/react-query';

// import { QUERY_CACHE_TIME_SIX } from '@/shared/constant/expire-time';
// import { QueryKeys } from '@/shared/constant/query-key';

// import stockApi from '../api';

// export const useStockToken = () => {
//   return useQuery({
//     queryKey: QueryKeys.stock.token(),
//     queryFn: () => stockApi.getToken(),
//     select: (res) => res.data.token,
//     staleTime: QUERY_CACHE_TIME_SIX,
//   });
// };
