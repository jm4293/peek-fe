export const StockSignMarkUtil = (sign: string) => {
  if (sign === '2') {
    return '+';
  }
  if (sign === '5') {
    return '-';
  }
  return '';
};
