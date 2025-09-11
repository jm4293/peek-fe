import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { stockKoreanActions } from '@/services/stock';

import BoardDetail from './BoardDetail';

interface IProps {
  params: Promise<{ code: string }>;
}

export default async function StockDetailPage(props: IProps) {
  const { code } = await props.params;

  const { data } = await stockKoreanActions({ code });

  if (!data) {
    return (
      <Wrapper.MAIN text="상세 정보">
        <Wrapper.SECTION>
          <Text.HEADING text="종목 정보를 불러올 수 없습니다." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

  return (
    <Wrapper.MAIN text="상세 정보">
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <div>
            <Text.TITLE text={data.stk_nm} />
            <Text.PARAGRAPH text={data.stk_cd} color="gray" />
          </div>
          <div>
            <Text.HEADING text={data.cur_prc} />
          </div>
        </div>

        {/* <BoardDetail code={code} /> */}
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
