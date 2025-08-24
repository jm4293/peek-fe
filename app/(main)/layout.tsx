import { myAction } from '@/services/user';

import { Header } from './Header';

interface IProps {
  children: React.ReactNode;
}

export default async function Layout(props: IProps) {
  const { children } = props;

  const { data: my } = await myAction();

  return (
    <div className="relative min-h-screen">
      <Header my={my} />
      <main className="min-w-64 min-h-screen pt-20 pb-16 bg-theme-bg-main">{children}</main>
    </div>
  );
}
