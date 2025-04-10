import dayjs from 'dayjs';

export class Dayjs {
  static formatMMDD(date: Date | undefined): string {
    if (!date) {
      return '-';
    }

    return dayjs(date).format('MM.DD');
  }

  static formatYYMMDD(date: Date | undefined): string {
    if (!date) {
      return '-';
    }

    return dayjs(date).format('YY.MM.DD');
  }

  static formatYYYYMMDD(date: Date | undefined): string {
    if (!date) {
      return '-';
    }

    return dayjs(date).format('YYYY.MM.DD');
  }

  static formatYYYYMMDDHHmm(date: Date | undefined): string {
    if (!date) {
      return '-';
    }

    return dayjs(date).format('YYYY.MM.DD HH:mm');
  }
}
