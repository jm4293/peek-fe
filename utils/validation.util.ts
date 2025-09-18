export type ErrorHandler = (message: string) => void;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const defaultValidateEmail = (email: string): boolean => EMAIL_REGEX.test(email);

const isEmpty = (val: unknown) => {
  if (val === null || val === undefined) {
    return true;
  }

  if (typeof val === 'string') {
    return val.trim().length === 0;
  }

  if (Array.isArray(val)) {
    return val.length === 0;
  }

  return false;
};

export class ValidationUtil {
  private checks: Array<() => string | null> = [];

  static create() {
    return new ValidationUtil();
  }

  required(value: unknown, message: string) {
    this.checks.push(() => (isEmpty(value) ? message : null));

    return this;
  }

  text(value: string, message: string) {
    this.checks.push(() => (/^[a-zA-Z]+$/.test(value) ? null : message));

    return this;
  }

  email(value: string, message: string, validator: (v: string) => boolean = defaultValidateEmail) {
    this.checks.push(() => (validator(value) ? null : message));

    return this;
  }

  minLength(value: string, length: number, message: string) {
    this.checks.push(() => (value.length >= length ? null : message));

    return this;
  }

  maxLength(value: string, length: number, message: string) {
    this.checks.push(() => (value.length <= length ? null : message));

    return this;
  }

  custom(predicate: () => boolean, message: string) {
    this.checks.push(() => (predicate() ? null : message));

    return this;
  }

  validate(onError?: ErrorHandler): boolean {
    for (const check of this.checks) {
      const err = check();

      if (err) {
        onError?.(err);
        return false;
      }
    }

    return true;
  }
}
