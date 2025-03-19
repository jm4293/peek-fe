import { NavbarBoard, NavbarHome, NavbarMyPage, NavbarStock } from '@/app/(main)';

export default function Navbar() {
  return (
    <div className="navbar">
      <NavbarHome />
      <NavbarStock />
      <NavbarBoard />
      <NavbarMyPage />
    </div>
  );
}
