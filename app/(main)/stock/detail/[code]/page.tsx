import { StockSignMarkUtil } from '@/utils';

import { StockPriceText } from '@/components/stock/stock-price';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

import { stockKoreanDetailAction } from '@/services/stock';

interface IProps {
  params: Promise<{ code: string }>;
}

export default async function StockDetailPage(props: IProps) {
  const { code } = await props.params;

  const { data, success } = await stockKoreanDetailAction({ code });

  if (!success) {
    return (
      <Wrapper.MAIN text="상세 정보">
        <Wrapper.SECTION>
          <Text.HEADING text="서버 오류가 발생했습니다." />
        </Wrapper.SECTION>
      </Wrapper.MAIN>
    );
  }

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
            <StockPriceText
              price={(+data.cur_prc.slice(1)).toLocaleString()}
              sign={data.pre_sig}
              size="HEADING"
              className="text-end"
            />
            <StockPriceText
              price={`${StockSignMarkUtil(data.pre_sig.slice(1))}${(+data.pred_pre).toLocaleString()}(${data.flu_rt}%)`}
              sign={data.pre_sig}
              size="PARAGRAPH"
              className="text-end"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="전일" />
            <Text.PARAGRAPH text={(+data.base_pric).toLocaleString()} />
          </div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="시가" />
            <Text.PARAGRAPH text={(+data.open_pric).toLocaleString()} />
          </div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="고가" />
            <Text.PARAGRAPH text={(+data.high_pric).toLocaleString()} />
          </div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="저가" />
            <Text.PARAGRAPH text={(+data.low_pric.slice(1)).toLocaleString()} />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="거래량" />
            <Text.PARAGRAPH text={(+data.trde_qty).toLocaleString()} />
          </div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="상장주식수" />
            <Text.PARAGRAPH text={`${(+data.flo_stk * 1000).toLocaleString()}주`} />
          </div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="유통주식수" />
            <Text.PARAGRAPH text={`${(+data.dstr_stk * 1000).toLocaleString()}주`} />
          </div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="유통비율" />
            <Text.PARAGRAPH text={`${(+data.dstr_rt).toLocaleString()}%`} />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="시가총액" />
            <Text.PARAGRAPH text={`${(+data.mac * 10000).toLocaleString()}원`} />
          </div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="연중최고" />
            <Text.PARAGRAPH text={(+data.oyr_hgst.slice(1)).toLocaleString()} />
          </div>
          <div className="flex items-center gap-2">
            <Text.HEADING text="연중최저" />
            <Text.PARAGRAPH text={`${(+data.oyr_lwst.slice(1)).toLocaleString()}`} />
          </div>
        </div>

        {/* <BoardDetail code={code} /> */}
      </Wrapper.SECTION>
    </Wrapper.MAIN>
  );
}
