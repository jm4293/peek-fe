import { Header } from './Header';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
    </div>
  );
}
