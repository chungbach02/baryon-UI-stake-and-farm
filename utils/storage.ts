export const getItemStorage = <T>(key: string) => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const item = localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : undefined;
    }
  } catch (e) {
    return undefined;
  }
  return undefined;
};

export const setItemStorage = (key: string, item: string) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(key, item);
  }
};

export const removeItemStorage = (key: string) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
  }
};
