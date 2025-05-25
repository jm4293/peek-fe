import { BestNews, BestWeekend, Chart } from '@/app/(main)/home/_components';

export default function Page() {
  return (
    <div className="flex gap-2">
      <div className="w-full flex flex-col gap-2">
        <BestNews />
        <BestWeekend />
      </div>
      <div className="w-full">
        <Chart />
      </div>
    </div>
  );
}
