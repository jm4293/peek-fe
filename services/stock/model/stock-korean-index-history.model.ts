export interface StockKoreanIndexHistoryModel {
  id: number;
  uuid: string;
  type: number; // StockKoreanIndexTypeEnum
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
