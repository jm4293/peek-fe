import { Text } from '@/components/text';

import Register from './Register';

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="회원가입" />
      <Register />
    </div>
  );
}
