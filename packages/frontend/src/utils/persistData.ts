export const persistData = (key: string, data: any) =>
  window.localStorage.setItem(key, JSON.stringify(data));
