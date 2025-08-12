import Guest from '@/app/(main)/guest/Guest';

import { Text } from '@/components/text';

export default function GuestPage() {
  return (
    <div className="flex flex-col gap-4">
      <Text.SUBTITLE text="" />
      <Guest />
    </div>
  );
}
