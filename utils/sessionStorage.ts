export class SessionStorage {
  static setItem(name: string, value: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(name, value);
    }
  }
  // static setItem(name: string, obj: { key: string; value: string }) {
  //   if (typeof window !== 'undefined') {
  //     const { key, value } = obj;
  //
  //     window.sessionStorage.setItem(key, JSON.stringify({ name, value }));
  //   }
  // }

  static getItem(name: string) {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(name);
    }
  }

  // static getItem(name: string, key: string) {
  //   if (typeof window !== 'undefined') {
  //     const item = window.sessionStorage.getItem(key);
  //
  //     if (!item) {
  //       return null;
  //     }
  //
  //     const parsedItem = JSON.parse(item);
  //
  //     return parsedItem['name'] === name ? parsedItem.value : null;
  //   }
  // }

  static removeItem(name: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(name);
    }
  }

  static clear() {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  }
}
