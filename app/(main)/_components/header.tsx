import HeaderAlert from '@/app/(main)/_components/headerAlert';
import HeaderSearch from '@/app/(main)/_components/headerSearch';
import HeaderTitle from '@/app/(main)/_components/headerTitle';

import { BackSvg } from '@/asset/svg';

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
