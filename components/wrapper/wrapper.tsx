import Text from '@/components/text/text';

interface IProps {
  title?: string;
  children: React.ReactNode;
}

function Wrapper(props: IProps) {
  const { title, children } = props;

  return (
    <div className="w-full bg-white rounded-2xl p-4">
      <div className="flex flex-col gap-8">
        {title && <Text value={title} weight="bold" />}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
