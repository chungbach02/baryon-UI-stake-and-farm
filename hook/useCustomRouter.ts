import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface Params {
  [key: string]: string;
}
export const useCustomRouter = <T extends Record<string, string>>() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (params: Params) => {
      const currParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        currParams.set(key, value);
      });
      return currParams.toString();
    },
    [searchParams],
  );

  const push = (path: string, params?: Params) => {
    if (!params) {
      router.push(path);
    } else {
      router.push(path + '?' + createQueryString(params));
    }
  };

  const replace = (path: string, params?: Params) => {
    if (!params) {
      router.replace(path);
    } else {
      router.replace(path + '?' + createQueryString(params));
    }
  };

  const paramsObject = Object.fromEntries(searchParams.entries()) as T;

  return { push, pathname, replace, ...paramsObject };
};
