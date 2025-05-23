import { BestNews, BestWeekend, Chart } from '@/app/(main)/home/_components';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <BestNews />
      <BestWeekend />
      <Chart />
    </div>
  );
}
