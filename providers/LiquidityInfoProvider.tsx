'use client';

import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import {
  ILpInfoModel,
  ILpInfoOnchainModel,
  IPoolModel,
} from '@/types/pool.model';
import { useQueries, useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import { useBaryonServices } from './BaryonServicesProvider';
import { get } from 'lodash';
import { calculateRate } from '@/utils/function';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { ChainId } from '@dagora/web3-services';
import { useUtility } from '@/hook/useUtility';
import { convertWeiToBalance } from '@dagora/utils';

interface LiquidityInfoValue {
  poolAddress: string;
  setPoolAddress: (poolAddress: string) => void;
  isLoading: boolean;
  poolInfo?: ILpInfoModel | null;
  isNotExist: boolean;
  isLoadingList: boolean;
  ownerPoolList: { address: string; balance: string }[];
}

interface LiquidityInfoProviderProps {
  children: React.ReactNode;
}

const LiquidityInfo = React.createContext<LiquidityInfoValue | null>(null);

const LiquidityInfoProvider = ({ children }: LiquidityInfoProviderProps) => {
  const { baryonApiService, liquidityService, baryonUtilsService } =
    useBaryonServices();
  const { address } = useWallet();
  const { findToken, getCurrentPrice } = useUtility();
  const { activeChain, activeChainId } = useGlobalStore();
  const [poolAddress, setPoolAddress] = useState('');
  const [ownerPoolList, setOwnerPoolList] = useState<
    { address: string; balance: string }[]
  >([]);

  const [
    { data, isLoading },
    { data: dataOnchain, isLoading: isLoadingOnchain },
    { data: poolAddressList, isLoading: isLoadingPoolAddressList },
  ] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.POOL_INFO, poolAddress, activeChain],
        queryFn: () =>
          baryonApiService.base.post<IBaseResponse<IPoolModel>>(
            ENDPOINTS.POOL_INFO,
            { chain: activeChain, poolAddress },
          ),
        enabled: !!poolAddress,
      },
      {
        queryKey: [QUERY_KEYS.POOL_INFO_ONCHAIN, poolAddress],
        queryFn: () =>
          liquidityService.getPoolInfoOnChain(
            poolAddress,
          ) as Promise<ILpInfoOnchainModel>,
        enabled: !!poolAddress,
      },
      {
        queryKey: [QUERY_KEYS.POOL_LIST, activeChain],
        queryFn: () =>
          baryonApiService.base.get<IBaseResponse<string[]>>(
            ENDPOINTS.POOL_LIST,
            { params: { chain: activeChain } },
          ),
      },
    ],
  });

  const poolInfo: ILpInfoModel | null | undefined = useMemo(() => {
    if (isLoading || isLoadingOnchain || !poolAddress) {
      return undefined;
    }
    if (data?.data && dataOnchain) {
      const lpOnchain: ILpInfoOnchainModel = dataOnchain;
      const token0AmountWei = Number(
        get(lpOnchain, 'firstToken.totalBalancePool', ''),
      );
      const token0 = findToken(get(lpOnchain, 'firstToken.address', ''));
      const token0Amount = convertWeiToBalance(
        token0AmountWei,
        token0?.decimal,
      ).toNumber();

      const token1AmountWei = Number(
        get(lpOnchain, 'secondToken.totalBalancePool', ''),
      );
      const token1 = findToken(get(lpOnchain, 'secondToken.address', ''));
      const token1Amount = convertWeiToBalance(
        token1AmountWei,
        token1?.decimal,
      ).toNumber();

      const accountToken0Amount = convertWeiToBalance(
        lpOnchain.firstToken.balance,
        token0?.decimal,
      ).toNumber();

      const accountToken1Amount = convertWeiToBalance(
        lpOnchain.secondToken.balance,
        token1?.decimal,
      ).toNumber();

      const poolRate = calculateRate(token0Amount, token1Amount);

      const poolRateReverse = poolRate ? 1 / poolRate : 0;
      return {
        ...data?.data,
        ...lpOnchain,
        poolRate,
        poolRateReverse,
        token0Amount,
        token1Amount,
        token0AmountWei,
        token1AmountWei,
        accountToken0Amount,
        accountToken1Amount,
      };
    }
    return null;
  }, [isLoading, data, poolAddress, dataOnchain]);

  useEffect(() => {
    const fetchPoolAddressList = async () => {
      poolAddressList?.data;
      await baryonUtilsService
        .getTokensBalance({
          chainId: activeChainId as ChainId,
          tokenAddresses: poolAddressList?.data ?? [],
          userAddress: address ?? '',
        })
        .then((poolList) => {
          setOwnerPoolList(poolList.filter((item) => Number(item.balance)));
        });
    };

    if (poolAddressList) {
      fetchPoolAddressList();
    }
  }, [poolAddressList]);

  const value = {
    poolAddress,
    setPoolAddress,
    isLoading: isLoading || isLoadingOnchain,
    poolInfo,
    isNotExist: poolInfo === null,
    ownerPoolList,
    isLoadingList: isLoadingPoolAddressList,
  };

  return (
    <LiquidityInfo.Provider value={value}>{children}</LiquidityInfo.Provider>
  );
};

export default LiquidityInfoProvider;

export const useLiquidityInfo = () => {
  const context = React.useContext(LiquidityInfo);
  if (!context) {
    throw new Error(
      'useLiquidityInfo must be used within a LiquidityInfoProvider',
    );
  }
  return context;
};
