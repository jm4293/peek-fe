import Link from 'next/link';

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
        <header className="grid grid-cols-3 items-center bg-theme-bg-header">
          <div className="flex justify-start">
            <BackButton />
          </div>

          <div className="text-center">
            <Link href="/home">
              <Text.TITLE text="PEEK" />
            </Link>
          </div>

          <div className="flex justify-end">
            <ThemeSwitcher />
          </div>
        </header>

        <div className="px-4 py-8">{children}</div>
      </div>
    </div>
  );
}
