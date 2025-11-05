import dayjs from 'dayjs';

export class DayjsUtil {
  private date: Date | undefined;

  constructor(date?: Date) {
    this.date = date;
  }

  static of(date?: Date): DayjsUtil {
    return new DayjsUtil(date);
  }

  formatMMDD() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('MM.DD');
  }

  formatMMDDHHmm() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('MM.DD HH:mm');
  }

  formatMMDDHHmmss() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('MM.DD HH:mm:ss');
  }

  formatHHmmss() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('HH:mm:ss');
  }

  formatYYMMDD() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YY.MM.DD');
  }

  formatYYMMDDHHmm() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YY.MM.DD HH:mm');
  }

  formatYYYYMMDD() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YYYY.MM.DD');
  }

  formatYYYYMMDDHHmm() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YYYY.MM.DD HH:mm');
  }

  formatYYYYMMDDHHmmss() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YYYY.MM.DD HH:mm:ss');
  }

  // 추가적인 체이닝을 위한 메서드들
  addDays(days: number) {
    if (!this.date) {
      return this;
    }

    this.date = dayjs(this.date).add(days, 'day').toDate();
    return this;
  }

  subtractDays(days: number) {
    if (!this.date) {
      return this;
    }

    this.date = dayjs(this.date).subtract(days, 'day').toDate();
    return this;
  }

  toDate(): Date | undefined {
    return this.date;
  }
}
