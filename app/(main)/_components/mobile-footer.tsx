import { NavbarBoardSvg, NavbarHomeSvg, NavbarMySvg, NavbarStockSvg } from '@/asset/svg';

export default function MobileFooter() {
  return (
    <footer>
      <NavbarHomeSvg />
      <NavbarStockSvg />
      <NavbarBoardSvg />
      <NavbarMySvg />
    </footer>
  );
}
