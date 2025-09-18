import dayjs from 'dayjs';

export class DayjsUtil {
  private date: Date | undefined;

  constructor(date?: Date) {
    this.date = date;
  }

  static of(date?: Date): Dayjs {
    return new Dayjs(date);
  }

  formatMMDD(): string {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('MM.DD');
  }

  formatMMDDHHmm(): string {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('MM.DD HH:mm');
  }

  formatMMDDHHmmss(): string {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('MM.DD HH:mm:ss');
  }

  formatHHmmss(): string {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('HH:mm:ss');
  }

  formatYYMMDD(): string {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YY.MM.DD');
  }

  formatYYMMDDHHmm(): string {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YY.MM.DD HH:mm');
  }

  formatYYYYMMDD(): string {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YYYY.MM.DD');
  }

  formatYYYYMMDDHHmm(): string {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YYYY.MM.DD HH:mm');
  }

  // 추가적인 체이닝을 위한 메서드들
  addDays(days: number): Dayjs {
    if (!this.date) {
      return this;
    }

    this.date = dayjs(this.date).add(days, 'day').toDate();
    return this;
  }

  subtractDays(days: number): Dayjs {
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
