import { useState } from 'react';

export const useFilterParams = <T>(defaultValue: Partial<T>) => {
  const [value, setValue] = useState<Partial<T>>(defaultValue);

  return {
    params: value,
    setParams: (params: Partial<T>) =>
      setValue((prev) => ({ ...prev, ...params })),
  };
};
