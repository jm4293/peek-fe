import Header from '@/app/(main)/_components/header';
import Navbar from '@/app/(main)/_components/navbar';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="layout">
      <Header />
      <div className="content_wrapper">
        <div className="content">{children}</div>
      </div>
      <Navbar />
    </div>
  );
}
