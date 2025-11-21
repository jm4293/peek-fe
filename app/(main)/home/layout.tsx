interface Props {
  children: React.ReactNode;
  stockKoreanIndex: React.ReactNode;
  stockKoreanTop10: React.ReactNode;
  currency: React.ReactNode;
}

export default function HomeLayout(props: Props) {
  const { children, stockKoreanIndex, stockKoreanTop10, currency } = props;

  return (
    <div className="flex flex-col gap-4">
      {children}
      {stockKoreanIndex}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)]">{stockKoreanTop10}</div>
        <div className="flex-1 min-w-full md:min-w-[calc(50%-0.5rem)]">{currency}</div>
      </div>
    </div>
  );
}
