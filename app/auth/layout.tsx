import { Header } from '../(main)/Header';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="relative min-h-screen">
      <Header my={null} />
      <main className="min-w-64 min-h-screen pt-20 pb-16 bg-theme-bg-main">{children}</main>
    </div>
  );
}
