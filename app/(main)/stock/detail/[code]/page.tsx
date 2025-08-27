import BoardDetail from './BoardDetail';

interface IProps {
  params: Promise<{ code: string }>;
}

export default async function StockDetailPage(props: IProps) {
  const { code } = await props.params;

  return (
    <div>
      <BoardDetail code={code} />
    </div>
  );
}
