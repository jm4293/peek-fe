import HeaderTitle from '@/app/(main)/_components/headerTitle';

export default function Header() {
  return (
    <div className="header">
      <p className="text-left">뒤로가기</p>
      <HeaderTitle />
      <p className="text-right">알림</p>
    </div>
  );
}
