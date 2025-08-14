import BestNews from './BestNews';
import BestWeekend from './best-weekend';
import Chart from './chart';

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
