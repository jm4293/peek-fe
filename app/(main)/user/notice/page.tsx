import { Wrapper } from '@/components/wrapper';

import NoticeList from './NoticeList';

export default function UserNoticePage() {
  return (
    <Wrapper.MAIN text="공지사항">
      <NoticeList />
    </Wrapper.MAIN>
  );
}
