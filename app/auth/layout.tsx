import { BackButton, ThemeSwitcher } from '@/components/button';
import { Text } from '@/components/text';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="h-screen flex justify-center bg-theme-bg-section">
      <div className="w-[720px] overflow-y-auto bg-theme-bg-main">
        <div className="w-full h-16 grid grid-cols-3 items-center px-4 bg-theme-bg-header">
          <div className="flex justify-start">
            <BackButton />
          </div>

          <div className="text-center">
            <Text.TITLE text="PEEK" />
          </div>

          <div className="flex justify-end">
            <ThemeSwitcher />
          </div>
        </div>

        <div className="px-4 py-8">{children}</div>
      </div>
    </div>
  );
}
