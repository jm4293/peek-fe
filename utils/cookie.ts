export const parseCookie = {
  value: {} as Record<string, string>,
  get: function () {
    return this.value;
  },
  set: function (cookie: string | null) {
    if (!cookie) {
      this.value = {};
      return this;
    }

    this.value = cookie.split(';').reduce(
      (acc, part) => {
        const [key, value] = part.trim().split('=');

        acc[key] = decodeURIComponent(value);

        return acc;
      },
      {} as Record<string, string>,
    );

    // return this.value;
    return this;
  },
  pick: function (key: string) {
    return this.value[key] || null;
  },
};
