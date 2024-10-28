'use client';

import { IS_DEVELOPMENT } from '@/constants';
import { useGlobalStore } from '@/stores/global.store';
import {
  BaryonApiService,
  BaryonUtilsService,
  EvmLiquidityService,
  EvmStakeService,
  EvmTransaction,
  MODE,
} from '@baryon/sdk';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { API_MODE, BaseHttpRequest } from '@dagora/utils';
import { ChainId, Web3Service, getChainData } from '@dagora/web3-services';
import React, { useCallback, useEffect, useMemo } from 'react';

interface ServicesContextValue {
  web3Service: Web3Service;
  baryonApiService: BaryonApiService;
  infoService: BaseHttpRequest;
  baryonUtilsService: BaryonUtilsService;
  liquidityService: EvmLiquidityService;
  stakeService: EvmStakeService;
  onSendTransaction: (tx: EvmTransaction) => Promise<string>;
}

interface ServicesProviderProps {
  children: React.ReactNode;
}

const ServicesContext = React.createContext<ServicesContextValue | null>(null);

const BaryonServicesProvider = ({ children }: ServicesProviderProps) => {
  const { activeChainId } = useGlobalStore();
  const mode = IS_DEVELOPMENT ? MODE.DEVELOPMENT : MODE.PRODUCTION;
  const { address: walletAddress = '', sendTransaction } = useWallet();

  const chainData = getChainData(activeChainId as ChainId);
  const rpcURL = chainData.rpcURL;

  const infoService = useMemo(() => {
    return new BaseHttpRequest(API_MODE.PRODUCTION);
  }, []);

  const web3Service = useMemo(() => {
    return new Web3Service(activeChainId as ChainId);
  }, [activeChainId]);

  const baryonApiService = useMemo(() => {
    return new BaryonApiService(mode);
  }, []);

  const baryonUtilsService = useMemo(
    () => new BaryonUtilsService(activeChainId as ChainId),
    [activeChainId],
  );

  const onSendTransaction = useCallback(
    async (tx: EvmTransaction) => {
      if (!web3Service) {
        return '';
      }

      const gas = await web3Service.estimateGas({ tx });
      const txWithCheckFreeGas = await web3Service.checkFreeGas({
        tx,
        chainId: activeChainId as ChainId,
      });
      const hash = await sendTransaction({
        ...txWithCheckFreeGas,
        gas: Math.floor(gas * 1.2),
      });

      return hash.data;
    },
    [walletAddress, web3Service],
  );

  const liquidityService = useMemo(
    () =>
      new EvmLiquidityService({
        chainId: activeChainId as ChainId,
        mode,
        rpcURL,
        userAddress: walletAddress ?? '',
        onSendTransaction,
      }),
    [activeChainId, walletAddress],
  );

  const stakeService = useMemo(
    () =>
      new EvmStakeService({
        chainId: activeChainId as ChainId,
        mode,
        rpcURL,
        userAddress: walletAddress ?? '',
        onSendTransaction,
      }),
    [activeChainId, walletAddress],
  );
  const init = useCallback(async () => {
    const storageJwt = infoService.getStorageJWT();
    if (!storageJwt.base || !storageJwt.adapters) {
      await infoService.getJWT('');
    }

    const baryonJwt = baryonApiService.getBaryonStorageJWT();
    if (!baryonJwt.base || !baryonJwt.adapters) {
      await baryonApiService.getBaryonJWT('');
    }
  }, [infoService]);

  const updateJwt = useCallback(
    async (address: string | null) => {
      await infoService.getJWT(address ?? '');
      await baryonApiService.getBaryonJWT(address ?? '');
    },
    [infoService],
  );

  useEffect(() => {
    init();
  }, [infoService]);

  useEffect(() => {
    if (walletAddress) {
      updateJwt(walletAddress);
    }
  }, [walletAddress]);

  const value = {
    web3Service,
    baryonApiService,
    infoService,
    baryonUtilsService,
    liquidityService,
    onSendTransaction,
    stakeService,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

export default BaryonServicesProvider;

export const useBaryonServices = () => {
  const context = React.useContext(ServicesContext);
  if (!context) {
    throw new Error(
      'useBaryonServices must be used within a BaryonServicesProvider',
    );
  }
  return context;
};
