import { Text } from '@/components/text';

interface Props {
  id?: string;
  text?: string | React.ReactNode;
  children?: React.ReactNode;
}

const MAIN = (props: Props) => {
  const { text, children } = props;

  return (
    <section className="flex flex-col gap-4">
      {/* {typeof text === 'string' ? <Text.TITLE text={text} /> : text} */}
      {children}
    </section>
  );
};

const SECTION = (props: Props) => {
  const { id, text, children } = props;

  return (
    <section
      key={id}
      className="flex flex-col justify-center gap-4 p-4 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#1f1f22]/70 border border-white/20 dark:border-white/10 shadow-md">
      {typeof text === 'string' ? <Text.SUBTITLE text={text} /> : text}
      {children}
    </section>
  );
};

export const Wrapper = {
  MAIN,
  SECTION,
};
