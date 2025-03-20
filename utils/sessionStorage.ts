export class SessionStorage {
  static setItem(key: string, value: string) {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, value);
    }
  }

  static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem(key);
    }
    return null;
  }

  static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  }

  static clear() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
  }
}
