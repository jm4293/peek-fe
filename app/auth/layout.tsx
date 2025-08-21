import { BackButton } from '@/components/button';

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="h-screen flex justify-center overflow-hidden">
      <div className="w-[720px] overflow-y-auto bg-white">
        <div className="w-full grid grid-cols-3 items-center p-4 border-b">
          <BackButton />
          <strong className="m-auto">PEEK</strong>
        </div>

        <div className="w-full p-4  mb-8">{children}</div>
      </div>
    </div>
  );
}
