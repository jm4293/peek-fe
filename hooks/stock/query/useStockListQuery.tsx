import { IStockListDto } from '@/types/dto';
import { useQuery } from '@tanstack/react-query';
import StockApi from '@/api/stock/stock.api';

interface IProps extends IStockListDto {}

export const useStockListQuery = (props: IProps) => {
  const { text, kind } = props;

  return useQuery({
    queryKey: ['stock-list', text, kind],
    queryFn: () => StockApi.getStockList(props),
    select: (res) => {
      const { stocks, total } = res.data.data;

      return { stocks, total };
    },
    staleTime: 1000 * 60 * 60 * 6, // 6시간,
  });
};
