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
        <BoardDetail code={code} />

        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="종목코드:" className="text-gray-500" />
          <Text.HEADING text={data.shtn_pdno} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="종목명:" className="text-gray-500" />
          <Text.HEADING text={data.prdt_abrv_name} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="종목명(영문):" className="text-gray-500" />
          <Text.HEADING text={data.prdt_eng_abrv_name} />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="상장일:" className="text-gray-500" />
          <Text.HEADING text={data?.frst_erlm_dt || '정보없음'} />
        </div>
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
