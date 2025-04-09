import { NavbarBoard, NavbarHome, NavbarMyPage, NavbarStock } from '@/app/(main)';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavbarHome />
      <NavbarStock />
      <NavbarBoard />
      <NavbarMyPage />
    </nav>
  );
}
