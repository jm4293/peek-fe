import { getStockToken } from '@/services/stock';

import BestNews from './BestNews';
import BestWeekend from './best-weekend';
import Chart from './chart';

export default async function HomePage() {
  const ret = await getStockToken();

  if (!ret.data) {
    return <div>Token not found</div>;
  }

  return (
    <div className="flex gap-2">
      <div className="w-full flex flex-col gap-2">
        <BestNews token={ret.data} />
        <BestWeekend />
      </div>
      <div className="w-full">
        <Chart />
      </div>
    </div>
  );
}
