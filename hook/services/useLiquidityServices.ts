import { useToast } from '@/components/ui/Toast';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { IError } from '@/types/base.model';
import { DepositLiquidityParams, WithdrawLiquidityParams } from '@baryon/sdk';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInvalidateQueryKey } from '../useInvalidateQueryKey';
import { ApproveFungibleParams } from '@dagora/web3-services';

export const useLiquidityServices = () => {
  const { liquidityService, web3Service } = useBaryonServices();
  const { toast } = useToast();
  const { invalidateLiquidityPage } = useInvalidateQueryKey();

  const deposit = useMutation<
    string | undefined,
    IError,
    DepositLiquidityParams
  >({
    mutationFn: (data) => liquidityService.deposit(data),
    onSuccess: () => {
      invalidateLiquidityPage();
    },
  });

  const withdraw = useMutation<
    string | undefined,
    IError,
    WithdrawLiquidityParams
  >({
    mutationFn: (data) => liquidityService.withdraw(data),
    onSuccess: () => {
      invalidateLiquidityPage();
    },
  });

  const approveToken = useMutation<
    string | undefined,
    IError,
    ApproveFungibleParams
  >({
    mutationFn: (data) => web3Service.approveFungibleToken(data),
    onSuccess: () => {
      invalidateLiquidityPage();
    },
  });

  useEffect(() => {
    if (deposit.error) {
      toast({
        type: 'error',
        text: String(deposit.error),
      });
    }
  }, [deposit.error]);

  useEffect(() => {
    if (withdraw.error) {
      toast({
        type: 'error',
        text: String(withdraw.error),
      });
    }
  }, [withdraw.error]);

  useEffect(() => {
    if (approveToken.error) {
      toast({
        type: 'error',
        text: String(approveToken.error),
      });
    }
  }, [approveToken.error]);

  return {
    depositService: {
      deposit: deposit.mutate,
      tx: deposit.data,
      isLoading: deposit.isPending,
      isSuccess: deposit.isSuccess,
      error: deposit.error,
    },

    withdrawService: {
      withdraw: withdraw.mutate,
      tx: withdraw.data,
      isLoading: withdraw.isPending,
      isSuccess: withdraw.isSuccess,
      error: withdraw.error,
    },

    approveTokenService: {
      approveToken: approveToken.mutate,
      tx: approveToken.data,
      isLoading: approveToken.isPending,
      isSuccess: approveToken.isSuccess,
      error: approveToken.error,
    },
  };
};
