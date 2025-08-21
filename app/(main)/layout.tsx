import { myAction } from '@/services/user';

import { Header } from './Header';

interface IProps {
  children: React.ReactNode;
}

export default async function Layout(props: IProps) {
  const { children } = props;

  const { data: my } = await myAction();

  return (
    <div className="layout">
      <Header my={my} />
      <main>{children}</main>
    </div>
  );
}
