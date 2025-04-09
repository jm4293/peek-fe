import Text from '@/components/text/text';

interface IProps {
  key?: string;
  title?: string;
  children: React.ReactNode;
}

function Wrapper(props: IProps) {
  const { key, title, children } = props;

  return (
    <section key={key} className="w-full bg-white rounded-2xl p-4">
      <div className="flex flex-col gap-8">
        {title && <Text value={title} weight="bold" />}
        <div>{children}</div>
      </div>
    </section>
  );
}

export default Wrapper;
