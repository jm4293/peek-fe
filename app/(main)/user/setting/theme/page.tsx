import { ThemeSwitcher } from '@/components/button';
import { Wrapper } from '@/components/wrapper';

export default function UserSettingThemePage() {
  return (
    <Wrapper.MAIN text="테마 설정">
      <ThemeSwitcher />
    </Wrapper.MAIN>
  );
}
