import HeaderTitle from '@/app/(main)/_components/headerTitle';
import HeaderAlert from '@/app/(main)/_components/headerAlert';
import { BackSvg } from '@/asset/svg';
import HeaderSearch from '@/app/(main)/_components/headerSearch';

export default function Header() {
  return (
    <header className="header">
      <BackSvg />
      <HeaderTitle />
      <HeaderSearch />
      <HeaderAlert />
    </header>
  );
}
