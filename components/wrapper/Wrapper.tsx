import { Text } from '@/components/text';

interface Props {
  id?: string;
  text?: string | React.ReactNode;
  children?: React.ReactNode;
}

const MAIN = (props: Props) => {
  const { text, children } = props;

  return (
    <section className="w-full flex flex-col gap-4">
      {typeof text === 'string' ? <Text.TITLE text={text} /> : text}
      {children}
    </section>
  );
};

const SECTION = (props: Props) => {
  const { id, text, children } = props;

  return (
    <section key={id} className="w-full flex flex-col justify-center gap-4 p-4 rounded-lg bg-theme-bg-section">
      {typeof text === 'string' ? <Text.SUBTITLE text={text} /> : text}
      {children}
    </section>
  );
};

export const Wrapper = {
  MAIN,
  SECTION,
};
