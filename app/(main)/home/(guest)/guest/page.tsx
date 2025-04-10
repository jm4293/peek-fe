import BestNews from '@/app/(main)/home/_components/bestNews';
import BestWeekend from '@/app/(main)/home/_components/bestWeekend';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <BestNews />
      <BestWeekend />
    </div>
  );
}
