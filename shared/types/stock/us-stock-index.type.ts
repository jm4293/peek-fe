// Body
// Element	한글명	type	Required	Length	Description
// date	일자	String	Y	8
// time	시간	String	Y	6
// kodate	한국일자	String	Y	8
// kotime	한국시간	String	Y	6
// open	시가	String	Y	9.2
// high	고가	String	Y	9.2
// low	저가	String	Y	9.2
// price	현재가	String	Y	9.2
// sign	전일대비구분	String	Y	1
// change	전일대비	String	Y	9.2
// uprate	등락율	String	Y	9.2
// bidho	매수호가	String	Y	9.2
// bidrem	매수잔량	String	Y	9
// offerho	매도호가	String	Y	9.2
// offerrem	매도잔량	String	Y	9
// volume	누적거래량	String	Y	12.0
// xsymbol	심벌	String	Y	16
// cvolume	체결거래량	String	Y	8.0

export interface UsStockIndex {
  date: string; // 일자
  time: string; // 시간
  kodate: string; // 한국일자
  kotime: string; // 한국시간
  open: string; // 시가
  high: string; // 고가
  low: string; // 저가
  price: string; // 현재가
  sign: string; // 전일대비구분
  change: string; // 전일대비
  uprate: string; // 등락율
  bidho: string; // 매수호가
  bidrem: string; // 매수잔량
  offerho: string; // 매도호가
  offerrem: string; // 매도잔량
  volume: string; // 누적거래량
  xsymbol: string; // 심벌
  cvolume: string; // 체결거래량
  createdAt: Date;
}
