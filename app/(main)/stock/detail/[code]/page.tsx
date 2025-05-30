import BoardDetail from '@/app/(main)/stock/detail/[code]/_components/boardDetail';

interface IProps {
  params: Promise<{ code: string }>;
}

export default async function Page(props: IProps) {
  const { code } = await props.params;

  return (
    <div>
      <BoardDetail code={code} />
    </div>
  );
}
