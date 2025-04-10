export enum StockKindEnum {
  KOSPI = 'KOSPI',
  KOSDAQ = 'KOSDAQ',
}

export const StockKindDescription: {
  [key in StockKindEnum]: string;
} = {
  KOSPI: '코스피',
  KOSDAQ: '코스닥',
};
