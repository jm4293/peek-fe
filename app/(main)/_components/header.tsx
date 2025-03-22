import HeaderTitle from '@/app/(main)/_components/headerTitle';
import { BackSvg } from '@/asset/svg';

export default function Header() {
  return (
    <div className="header">
      <BackSvg />
      <HeaderTitle />
      <p className="text-right">알림</p>
    </div>
  );
}
