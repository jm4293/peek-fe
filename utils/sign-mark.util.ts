export const signMarkUtil = (sign: string) => {
  if (sign === '2') {
    return '+';
  }
  if (sign === '5') {
    return '-';
  }
  return '';
};
