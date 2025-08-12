import { Text } from '@/components/text';

interface IProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
}

export const Wrapper = (props: IProps) => {
  const { id, title, children } = props;

  return (
    <div key={id} className="w-full bg-white rounded-lg p-4">
      <div className="flex flex-col gap-4">
        {title && <Text.HEADING text={title} />}
        {children}
      </div>
    </div>
  );
};
