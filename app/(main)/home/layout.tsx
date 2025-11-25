interface Props {
  children: React.ReactNode;
  stockKoreanIndex: React.ReactNode;
  stockKoreanTop10: React.ReactNode;
  stockUsIndex: React.ReactNode;
  currency: React.ReactNode;
}

export default function HomeLayout({ children, stockKoreanIndex, stockKoreanTop10, stockUsIndex, currency }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)]">{stockKoreanIndex}</div>
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)]">{stockUsIndex}</div>
      </div>
      {/* <div className="flex flex-wrap gap-4">
        <div className="min-w-full md:flex-[2] md:min-w-0">{stockKoreanTop10}</div>
        <div className="min-w-full md:flex-1 md:min-w-0">{currency}</div>
      </div> */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)]">{stockKoreanTop10}</div>
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)]">{currency}</div>
      </div>
    </div>
  );
}
