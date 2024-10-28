import { QUERY_KEYS } from '@/constants/keys';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { convertWeiToBalance } from '@dagora/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useUtility } from './useUtility';

export const useBalance = (tokenAddress?: string, skip: boolean = false) => {
  const { address } = useWallet();
  const { activeChain } = useGlobalStore();
  const { findToken } = useUtility();
  const { web3Service } = useBaryonServices();

  // if (!tokenAddress) {
  //   tokenAddress = CHAIN_DATA[activeChain].balances;
  // }
  const tokenInfo = findToken(tokenAddress);

  const { data, isLoading } = useQuery({
    queryKey: [
      QUERY_KEYS.BALANCE,
      tokenAddress,
      address,
      web3Service.chainId,
      activeChain,
    ],
    queryFn: () => web3Service.getBalance(address ?? '', tokenAddress),
    enabled: !skip && !!address,
  });

  const balance = useMemo(
    () => (data ? convertWeiToBalance(data, tokenInfo?.decimal).toNumber() : 0),
    [tokenInfo, data],
  );

  return { balance, isLoading };
};
