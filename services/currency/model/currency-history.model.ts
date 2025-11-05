export interface CurrencyHistoryModel {
  id: number;
  uuid: string;
  curUnit: string; // 통화코드
  curNm: string; // 국가/통화명
  curUnitDesc: string; // 통화 단위 설명
  ttb: string; // 전신환(송금) 받으실때
  tts: string; // 전신환(송금) 보내실때
  dealBasR: string; // 매매 기준율
  bkpr: string; // 장부가격
  yyEfeeR: string; // 년환가료율
  tenDdEfeeR: string; // 10일환가료율
  kftcDealBasR: string; // 서울외국환중개 매매기준율
  kftcBkpr: string; // 서울외국환중개 장부가격
  createdAt: Date;
}
