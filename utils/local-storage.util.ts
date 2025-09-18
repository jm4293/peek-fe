export class LocalStorageUtil {
  static setItem(name: string, value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, value);
    }
  }

  static getItem(name: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(name);
    }
  }

  static removeItem(name: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  }

  static clear() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}
