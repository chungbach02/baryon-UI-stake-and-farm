import { useToast } from '@/components/ui/Toast';
import { IError } from '@/types/base.model';
import { IFarmStakeModel } from '@/types/farmStake.model';

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInvalidateQueryKey } from '../useInvalidateQueryKey';
import {
  EvmClaimRewardParams,
  EvmStakeParams,
  EvmUnstakeParams,
} from '@baryon/sdk';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';

export const useFarmStakeServices = (poolInfo?: IFarmStakeModel) => {
  const { toast } = useToast();
  const { stakeService } = useBaryonServices();
  const { invalidateFarmStakePage, invalidateBalance } =
    useInvalidateQueryKey();

  const stakeMutation = useMutation<string, IError, EvmStakeParams>({
    mutationFn: (data) => stakeService.stake(data),
    onSuccess: () => {
      invalidateBalance();
      invalidateFarmStakePage();
    },
  });

  const unstakeMutation = useMutation<string, IError, EvmUnstakeParams>({
    mutationFn: (data) => stakeService.unstake(data),
    onSuccess: () => {
      invalidateBalance();
      invalidateFarmStakePage();
    },
  });

  const claimRewardMutation = useMutation<string, IError, EvmClaimRewardParams>(
    {
      mutationFn: (data) => stakeService.claimReward(data),
      onSuccess: () => {
        invalidateBalance();
        invalidateFarmStakePage();
      },
    },
  );

  // const claimAllRewardMutation = useMutation<
  //   string,
  //   IError,
  //   EvmClaimRewardParams
  // >({
  //   mutationFn: (data) => stakeService.claimAllReward(data),
  //   onSuccess: () => {
  //     invalidateFarmStakePage();
  //   },
  // });

  useEffect(() => {
    if (stakeMutation.error) {
      toast({
        type: 'error',
        text: String(stakeMutation.error),
      });
    }
  }, [stakeMutation.error]);

  useEffect(() => {
    if (unstakeMutation.error) {
      toast({
        type: 'error',
        text: String(unstakeMutation.error),
      });
    }
  }, [unstakeMutation.error]);

  useEffect(() => {
    if (claimRewardMutation.error) {
      toast({
        type: 'error',
        text: String(claimRewardMutation.error),
      });
    }
  }, [claimRewardMutation.error]);

  // useEffect(() => {
  //   if (claimAllRewardMutation.error) {
  //     toast({
  //       type: 'error',
  //       text: String(claimAllRewardMutation.error),
  //     });
  //   }
  // }, [claimAllRewardMutation.error]);

  return {
    stakeServices: {
      stake: stakeMutation.mutate,
      tx: stakeMutation.data,
      isLoading: stakeMutation.isPending,
      isSuccess: stakeMutation.isSuccess,
      error: stakeMutation.error,
    },

    unstakeServices: {
      unstake: unstakeMutation.mutate,
      tx: unstakeMutation.data,
      isLoading: unstakeMutation.isPending,
      isSuccess: unstakeMutation.isSuccess,
      error: unstakeMutation.error,
    },

    claimRewardServices: {
      claimReward: claimRewardMutation.mutate,
      tx: claimRewardMutation.data,
      isLoading: claimRewardMutation.isPending,
      isSuccess: claimRewardMutation.isSuccess,
      error: claimRewardMutation.error,
    },

    // claimAllRewardServices: {
    //   claimAllReward: claimAllRewardMutation.mutate,
    //   tx: claimAllRewardMutation.data,
    //   isLoading: claimAllRewardMutation.isPending,
    //   isSuccess: claimAllRewardMutation.isSuccess,
    //   error: claimAllRewardMutation.error,
    // },

    // rewardAmounts: rewardQueries.map(({ data }, idx) => ({
    //   amount: Number(data?.reward) > 0 ? data?.reward : 0,
    //   amountInWei: Number(data?.rewardInWei) > 0 ? data?.rewardInWei : 0,
    //   poolRewardAddress: poolInfo?.rewards?.[idx].poolRewardAddress,
    // })),
  };
};
