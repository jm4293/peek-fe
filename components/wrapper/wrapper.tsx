import Text from '@/components/text/text';

interface IProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
}

function Wrapper(props: IProps) {
  const { id, title, children } = props;

  return (
    <div key={id} className="w-full bg-white rounded-lg p-4">
      <div className="flex flex-col gap-8">
        {title && <Text value={title} weight="bold" />}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
