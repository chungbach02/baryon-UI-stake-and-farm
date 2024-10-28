'use client';

import { useCustomRouter } from '@/hook/useCustomRouter';
import { useUtility } from '@/hook/useUtility';
import { useGlobalStore } from '@/stores/global.store';
import { IPairTokenParams } from '@/types/base.model';
import { IBaseTokenModel } from '@/types/token.model';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useBaryonServices } from './BaryonServicesProvider';
import { useLiquidityInfo } from './LiquidityInfoProvider';
import { isZeroAddress } from '@/utils/validate';
import { W_MAIN_COIN } from '@/constants/tokens';
import { calculateTokenAmount } from '@/utils/function';

interface AddLiquidityValue {
  token0?: IBaseTokenModel;
  token1?: IBaseTokenModel;
  setToken0: (token?: IBaseTokenModel) => void;
  setToken1: (token?: IBaseTokenModel) => void;
}

interface AddLiquidityProviderProps {
  children: React.ReactNode;
}

const AddLiquidity = React.createContext<AddLiquidityValue | null>(null);

const AddLiquidityProvider = ({ children }: AddLiquidityProviderProps) => {
  const { activeChain } = useGlobalStore();
  const { findToken } = useUtility();
  const { setPoolAddress, poolInfo, isNotExist } = useLiquidityInfo();
  const {
    token0: token0Mint,
    token1: token1Mint,
    replace,
    pathname,
  } = useCustomRouter<IPairTokenParams>();
  const { liquidityService } = useBaryonServices();
  const [tokenPair, setTokenPair] = useState<{
    token0: IBaseTokenModel | undefined;
    token1: IBaseTokenModel | undefined;
  }>({ token0: findToken(token0Mint), token1: findToken(token1Mint) });

  // useEffect(() => {
  //   if (activeChain) {
  //     replace(pathname);
  //   }
  // }, [activeChain]);

  useEffect(() => {
    if (tokenPair.token0 || tokenPair.token1) {
      replace(pathname, {
        token0: get(tokenPair, 'token0.address', ''),
        token1: get(tokenPair, 'token1.address', ''),
      });
    }
  }, [tokenPair.token0?.address, tokenPair.token1?.address]);

  const handleUpdateToken = (token?: IBaseTokenModel, isToken0?: boolean) => {
    if (isToken0 && token?.address === tokenPair.token1?.address) {
      setTokenPair({ token0: token, token1: tokenPair.token0 });
      return;
    }
    if (!isToken0 && token?.address === tokenPair.token0?.address) {
      setTokenPair({ token1: token, token0: tokenPair.token1 });
      return;
    }

    if (!isNotExist && poolInfo) {
      const tokenAmount = Number(token?.amount ?? 0);
      const poolRate = poolInfo.poolRate ?? 0;

      if (isToken0) {
        const amount1 = calculateTokenAmount(tokenAmount, poolRate);
        setTokenPair((prev) => ({
          token0: token,
          token1: {
            ...prev.token1,
            amount: amount1 ? String(amount1) : '',
          } as IBaseTokenModel,
        }));
      } else {
        const amount0 = calculateTokenAmount(tokenAmount, poolRate, false);
        setTokenPair((prev) => ({
          token1: token,
          token0: {
            ...prev.token0,
            amount: amount0 ? String(amount0) : '',
          } as IBaseTokenModel,
        }));
      }
    } else {
      setTokenPair((prev) =>
        isToken0
          ? { token0: token, token1: prev.token1 }
          : { token0: prev.token0, token1: token },
      );
    }
  };

  useEffect(() => {
    if (token0Mint) {
      setTokenPair((prev) => ({ ...prev, token0: findToken(token0Mint) }));
    }
    if (token1Mint) {
      setTokenPair((prev) => ({ ...prev, token1: findToken(token1Mint) }));
    }
  }, [findToken]);

  useEffect(() => {
    if (tokenPair.token0?.address && tokenPair.token1?.address) {
      const address0 = isZeroAddress(tokenPair.token0.address)
        ? W_MAIN_COIN[activeChain].address
        : tokenPair.token0.address;
      const address1 = isZeroAddress(tokenPair.token1.address)
        ? W_MAIN_COIN[activeChain].address
        : tokenPair.token1.address;
      liquidityService
        .getPair(address0, address1)
        .then(setPoolAddress)
        .catch(console.log);
    }
  }, [tokenPair, activeChain]);

  const value = {
    token0: tokenPair.token0,
    token1: tokenPair.token1,
    setToken0: (token?: IBaseTokenModel) => handleUpdateToken(token, true),
    setToken1: (token?: IBaseTokenModel) => handleUpdateToken(token, false),
  };

  return (
    <AddLiquidity.Provider value={value}>{children}</AddLiquidity.Provider>
  );
};

export default AddLiquidityProvider;

export const useAddLiquidity = () => {
  const context = React.useContext(AddLiquidity);
  if (!context) {
    throw new Error(
      'useAddLiquidity must be used within a AddLiquidityProvider',
    );
  }
  return context;
};
