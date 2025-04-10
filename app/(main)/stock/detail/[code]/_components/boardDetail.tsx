'use client';

interface IProps {
  code: string;
}

export default function BoardDetail(props: IProps) {
  const { code } = props;

  console.log('BoardDetail', code);

  return <></>;
}
