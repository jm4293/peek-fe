// 한국투자증권 국내 지수
// export interface KoreanStockIndex {
//   bstp_cls_code: string; // ResponseBodybstp_cls_code    #업종 구분 코드
//   bsop_hour: string; // 영업 시간
//   prpr_nmix: string; // 현재가 지수
//   prdy_vrss_sign: string; // 전일 대비 부호
//   bstp_nmix_prdy_vrss: string; // 업종 지수 전일 대비
//   acml_vol: string; // 누적 거래량
//   acml_tr_pbmn: string; // 누적 거래 대금
//   pcas_vol: string; // 건별 거래량
//   pcas_tr_pbmn: string; // 건별 거래 대금
//   prdy_ctrt: string; // 전일 대비율
//   oprc_nmix: string; // 시가 지수
//   nmix_hgpr: string; // 지수 최고가
//   nmix_lwpr: string; // 지수 최저가
//   oprc_vrss_nmix_prpr: string; // 시가 대비 지수 현재가
//   oprc_vrss_nmix_sign: string; // 시가 대비 지수 부호
//   hgpr_vrss_nmix_prpr: string; // 최고가 대비 지수 현재가
//   hgpr_vrss_nmix_sign: string; // 최고가 대비 지수 부호
//   lwpr_vrss_nmix_prpr: string; // 최저가 대비 지수 현재가
//   lwpr_vrss_nmix_sign: string; // 최저가 대비 지수 부호
//   prdy_clpr_vrss_oprc_rate: string; // 전일 종가 대비 시가2 비율
//   prdy_clpr_vrss_hgpr_rate: string; // 전일 종가 대비 최고가 비율
//   prdy_clpr_vrss_lwpr_rate: string; // 전일 종가 대비 최저가 비율
//   uplm_issu_cnt: string; // 상한 종목 수
//   ascn_issu_cnt: string; // 상승 종목 수
//   stnr_issu_cnt: string; // 보합 종목 수
//   down_issu_cnt: string; // 하락 종목 수
//   lslm_issu_cnt: string; // 하한 종목 수
//   qtqt_ascn_issu_cnt: string; // 기세 상승 종목수
//   qtqt_down_issu_cnt: string; // 기세 하락 종목수
//   tick_vrss: string; // TICK대비
// }

// LS증권 국내 지수
export interface KoreanStockIndex {
  time: string; // 시간
  jisu: string; // 지수
  sign: string; // 전일대비구분
  change: string; // 전일비
  drate: string; // 등락율
  cvolume: string; // 체결량
  volume: string; // 거래량
  value: string; // 거래대금
  upjo: string; // 상한종목수
  highjo: string; // 상승종목수
  unchgjo: string; // 보합종목수
  lowjo: string; // 하락종목수
  downjo: string; // 하한종목수
  upjrate: string; // 상승종목비율
  openjisu: string; // 시가지수
  opentime: string; // 시가시간
  highjisu: string; // 고가지수
  hightime: string; // 고가시간
  lowjisu: string; // 저가지수
  lowtime: string; // 저가시간
  frgsvolume: string; // 외인순매수수량
  orgsvolume: string; // 기관순매수수량
  frgsvalue: string; // 외인순매수금액
  orgsvalue: string; // 기관순매수금액
  upcode: string; // 업종코드
  createdAt: Date;
}
