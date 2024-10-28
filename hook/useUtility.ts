import { MAIN_COIN_AMM, W_MAIN_COIN } from '@/constants/tokens';
import { useGlobalStore } from '@/stores/global.store';
import { isZeroAddress } from '@/utils/validate';
import { find, get, values } from 'lodash';
import { useCallback } from 'react';
import useSocket from './useSocket';
import { IMAGE } from '@/public';
import { ITokenInfoModel } from '@/types/token.model';

export const useUtility = () => {
  const { localCoins, activeChain } = useGlobalStore();
  const { getGeckoToken } = useSocket();

  const findToken = useCallback(
    (address?: string): ITokenInfoModel | undefined => {
      if (!address) {
        return undefined;
      }

      if (
        isZeroAddress(address) ||
        address === W_MAIN_COIN[activeChain].address
      ) {
        return MAIN_COIN_AMM[activeChain];
      }

      const token = find(
        values(localCoins).flat(),
        (localToken) =>
          get(localToken, 'address', '').toLowerCase() ===
          address?.toLowerCase(),
      );
      return (
        token ?? {
          address: address,
          symbol: 'TEST',
          name: 'TEST-TOKEN',
          image: IMAGE.unKnowDark,
          decimal: 18,
          id: 'test',
        }
      );
    },
    [localCoins],
  );

  const findGeckoToken = useCallback(
    async (id?: string) => {
      if (!id) {
        return undefined;
      }
      const token = await getGeckoToken(id);
      return token;
    },
    [getGeckoToken],
  );

  const getCurrentPrice = useCallback(
    async (id?: string, amount: number = 1) => {
      if (!id) {
        return 0;
      }
      const token = await findGeckoToken(id);
      return Number(get(token, 'current_price', 0)) * amount;
    },
    [findGeckoToken],
  );

  const nativeToken = MAIN_COIN_AMM[activeChain];

  const isNativeToken = useCallback(
    (id?: string) => {
      if (!id) {
        return false;
      }
      return nativeToken.id === id;
    },
    [nativeToken],
  );

  return {
    getCurrentPrice,
    findGeckoToken,
    findToken,
    nativeToken,
    isNativeToken,
  };
};
