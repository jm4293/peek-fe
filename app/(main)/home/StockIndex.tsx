'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { LineSkeleton } from '@/components/skeleton';
import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';

interface IIndex {
  bstp_cls_code: string; // ResponseBodybstp_cls_code    #업종 구분 코드
  bsop_hour: string; // 영업 시간
  prpr_nmix: string; // 현재가 지수
  prdy_vrss_sign: string; // 전일 대비 부호
  bstp_nmix_prdy_vrss: string; // 업종 지수 전일 대비
  acml_vol: string; // 누적 거래량
  acml_tr_pbmn: string; // 누적 거래 대금
  pcas_vol: string; // 건별 거래량
  pcas_tr_pbmn: string; // 건별 거래 대금
  prdy_ctrt: string; // 전일 대비율
  oprc_nmix: string; // 시가 지수
  nmix_hgpr: string; // 지수 최고가
  nmix_lwpr: string; // 지수 최저가
  oprc_vrss_nmix_prpr: string; // 시가 대비 지수 현재가
  oprc_vrss_nmix_sign: string; // 시가 대비 지수 부호
  hgpr_vrss_nmix_prpr: string; // 최고가 대비 지수 현재가
  hgpr_vrss_nmix_sign: string; // 최고가 대비 지수 부호
  lwpr_vrss_nmix_prpr: string; // 최저가 대비 지수 현재가
  lwpr_vrss_nmix_sign: string; // 최저가 대비 지수 부호
  prdy_clpr_vrss_oprc_rate: string; // 전일 종가 대비 시가2 비율
  prdy_clpr_vrss_hgpr_rate: string; // 전일 종가 대비 최고가 비율
  prdy_clpr_vrss_lwpr_rate: string; // 전일 종가 대비 최저가 비율
  uplm_issu_cnt: string; // 상한 종목 수
  ascn_issu_cnt: string; // 상승 종목 수
  stnr_issu_cnt: string; // 보합 종목 수
  down_issu_cnt: string; // 하락 종목 수
  lslm_issu_cnt: string; // 하한 종목 수
  qtqt_ascn_issu_cnt: string; // 기세 상승 종목수
  qtqt_down_issu_cnt: string; // 기세 하락 종목수
  tick_vrss: string; // TICK대비
}

export default function StockIndex() {
  const [kospi, setKospi] = useState<IIndex | null>(null);
  const [kosdaq, setKosdaq] = useState<IIndex | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_API_URL;

    const socket = io(`${serverUrl}/kis/korean/index`, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      setLoading(false);
    });

    socket.on('0001', (data: IIndex) => {
      setKospi(data.prpr_nmix ? data : null);
    });

    socket.on('1001', (data: IIndex) => {
      setKosdaq(data.prpr_nmix ? data : null);
    });

    socket.on('disconnect', () => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <Text.PARAGRAPH text="지수" />
          <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
        </div>

        <LineSkeleton />
      </Wrapper.SECTION>
    );
  }

  return (
    <>
      <Wrapper.SECTION>
        <div className="flex justify-between items-center">
          <Text.HEADING text="국내 지수" />
          <Text.CAPTION text="10초마다 갱신됩니다." color="gray" className="text-end" />
        </div>

        <div className="flex items-center gap-8 flex-nowrap overflow-x-auto">
          {kospi ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text.HEADING text="코스피" nowrap className="text-end" />

                <Text.HEADING
                  text={kospi.prpr_nmix}
                  color={`${kospi.prdy_vrss_sign === '2' ? 'red' : kospi.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                  nowrap
                  className="text-end"
                />

                <div className="flex items-center gap-1">
                  <Text.PARAGRAPH
                    text={`${kospi.bstp_nmix_prdy_vrss}`}
                    color={`${kospi.prdy_vrss_sign === '2' ? 'red' : kospi.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                    nowrap
                  />
                  <Text.PARAGRAPH
                    text={`(${kospi.prdy_clpr_vrss_lwpr_rate}%)`}
                    color={`${kospi.prdy_vrss_sign === '2' ? 'red' : kospi.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                    nowrap
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Text.PARAGRAPH text={`최고 ${kospi.nmix_hgpr}`} color="gray" nowrap />
                <Text.PARAGRAPH text={`최저 ${kospi.nmix_lwpr}`} color="gray" nowrap />
                <Text.CAPTION
                  text={
                    kospi.bsop_hour.slice(0, 2) + ':' + kospi.bsop_hour.slice(2, 4) + ':' + kospi.bsop_hour.slice(4, 6)
                  }
                  color="gray"
                  nowrap
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Text.HEADING text="코스피" nowrap />
              <Text.PARAGRAPH text="데이터가 없습니다." color="gray" nowrap />
            </div>
          )}

          {kosdaq ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text.HEADING text="코스닥" nowrap className="text-end" />

                <Text.HEADING
                  text={kosdaq.prpr_nmix}
                  color={`${kosdaq.prdy_vrss_sign === '2' ? 'red' : kosdaq.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                  nowrap
                  className="text-end"
                />

                <div className="flex items-center gap-1">
                  <Text.PARAGRAPH
                    text={`${kosdaq.bstp_nmix_prdy_vrss}`}
                    color={`${kosdaq.prdy_vrss_sign === '2' ? 'red' : kosdaq.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                    nowrap
                  />
                  <Text.PARAGRAPH
                    text={`(${kosdaq.prdy_clpr_vrss_lwpr_rate}%)`}
                    color={`${kosdaq.prdy_vrss_sign === '2' ? 'red' : kosdaq.prdy_vrss_sign === '5' ? 'blue' : 'default'}`}
                    nowrap
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Text.PARAGRAPH text={`최고 ${kosdaq.nmix_hgpr}`} color="gray" nowrap />
                <Text.PARAGRAPH text={`최저 ${kosdaq.nmix_lwpr}`} color="gray" nowrap />
                <Text.CAPTION
                  text={
                    kosdaq.bsop_hour.slice(0, 2) +
                    ':' +
                    kosdaq.bsop_hour.slice(2, 4) +
                    ':' +
                    kosdaq.bsop_hour.slice(4, 6)
                  }
                  color="gray"
                  nowrap
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Text.HEADING text="코스닥" nowrap />
              <Text.PARAGRAPH text="데이터가 없습니다." color="gray" nowrap />
            </div>
          )}
        </div>
      </Wrapper.SECTION>
    </>
  );
}
