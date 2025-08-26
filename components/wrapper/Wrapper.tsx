import { Text } from '@/components/text';

interface IProps {
  id?: string;
  text?: string;
  children: React.ReactNode;
}

const MAIN = (props: IProps) => {
  const { text = '', children } = props;

  return (
    <div className="flex flex-col gap-4">
      <Text.TITLE text={text} />
      {children}
    </div>
  );
};

const SECTION = (props: IProps) => {
  const { id, text = '', children } = props;

  return (
    <div key={id} className="w-full rounded-lg p-4 bg-theme-bg-section">
      <div className="flex flex-col gap-4">
        {text && <Text.SUBTITLE text={text} />}
        {children}
      </div>
    </div>
  );
};

export const Wrapper = {
  MAIN,
  SECTION,
};
