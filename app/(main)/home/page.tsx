import BestNews from '@/app/(main)/home/BestNews';
import BestWeekend from '@/app/(main)/home/best-weekend';
import Chart from '@/app/(main)/home/chart';

export default function HomePage() {
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
