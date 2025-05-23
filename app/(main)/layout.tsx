import Header from '@/app/(main)/_components/header';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="layout">
      <Header />
      {/*<MobileHeader />*/}
      <main>{children}</main>
    </div>
  );
}
