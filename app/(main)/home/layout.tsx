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
      {stockKoreanTop10}
      {currency}
    </div>
  );
}
