import dayjs from 'dayjs';

export class DayjsUtil {
  private date: Date | undefined;

  constructor(date?: Date) {
    this.date = date;
  }

  static of(date?: Date): DayjsUtil {
    return new DayjsUtil(date);
  }

  // 시간만
  formatHHmmss() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('HH:mm:ss');
  }

  // 월.일
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

  // 년(2자리).월.일
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

  formatYYMMDDHHmmss() {
    if (!this.date) {
      return '-';
    }

    return dayjs(this.date).format('YY.MM.DD HH:mm:ss');
  }

  // 년(4자리).월.일
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

  // 상대 시간 포맷 (1시간 이전: "N분 전", 1시간 초과: "HH:mm", 하루 초과: "YYYY.MM.DD")
  formatRelative() {
    if (!this.date) {
      return '-';
    }

    const now = dayjs();
    const target = dayjs(this.date);
    const diffInMinutes = now.diff(target, 'minute');
    const diffInHours = now.diff(target, 'hour');

    // 1시간 이전: "N분 전"
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    }

    // 1시간 초과 ~ 하루 이내: "HH:mm"
    if (diffInHours < 24) {
      return target.format('HH:mm');
    }

    // 하루 초과: "YYYY.MM.DD"
    return target.format('YY.MM.DD');
  }

  // 날짜 조작
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
