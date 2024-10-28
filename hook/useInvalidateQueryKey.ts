import { QUERY_KEYS } from '@/constants/keys';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateQueryKey = () => {
  const { address } = useWallet();
  const queryClient = useQueryClient();
  const invalidateGlobal = () => {
    queryClient.invalidateQueries();
  };

  const invalidateFavorite = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.FAVORITE],
    });
  };

  const invalidateSnapshot = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.SNAPSHOT_CAMPAIGN],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.SNAPSHOT_PARTICIPANT_LIST],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.SNAPSHOT_PARTICIPANT_CAMPAIGN],
    });
  };
  const invalidatePoolInfo = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.POOL_INFO],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.POOL_INFO_ONCHAIN],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.POOL_LIST],
    });
  };

  const invalidateBalance = (tokensAddress?: string) => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.BALANCE, tokensAddress, address],
    });
  };

  const invalidateFarmStakePage = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.REWARD],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.USER_POOLS_INFO],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.STAKE],
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.FARM],
    });
  };

  const invalidateLiquidityPage = () => {};

  return {
    queryClient,
    invalidateGlobal,
    invalidateFavorite,
    invalidateSnapshot,
    invalidateLiquidityPage,
    invalidatePoolInfo,
    invalidateBalance,
    invalidateFarmStakePage,
  };
};
