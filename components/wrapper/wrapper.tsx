import Text from '@/components/text/text';

interface IProps {
  title?: string;
  children: React.ReactNode;
}

function Wrapper(props: IProps) {
  const { title, children } = props;

  return (
    <div className="w-full bg-white rounded-2xl p-4">
      <div className="flex flex-col">
        {title && (
          <div>
            <Text value={title} color="#000000" weight="bold" />
            <div className="border-b border-gray-[#F2F2F5] my-4" />
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Wrapper;
