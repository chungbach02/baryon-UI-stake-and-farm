import { IGeckoTokenModel } from '@/types/token.model';
import { useEffect, useState } from 'react';
import { useUtility } from './useUtility';

export const useTokenDetail = (id?: string) => {
  const [token, setToken] = useState<IGeckoTokenModel>();
  const { findGeckoToken } = useUtility();

  useEffect(() => {
    findGeckoToken(id).then(setToken);
  }, [id, findGeckoToken]);

  return { token };
};

export default useTokenDetail;
