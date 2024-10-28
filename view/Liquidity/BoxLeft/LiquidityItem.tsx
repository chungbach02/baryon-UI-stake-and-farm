import TokenPair from '@/components/ui/TokenPair';
import { QUERY_KEYS } from '@/constants/keys';
import { useUtility } from '@/hook/useUtility';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { ILpInfoOnchainModel } from '@/types/pool.model';
import { formatReadableNumber } from '@/utils/format';
import { Skeleton, TokenImg } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import React, { Fragment } from 'react';

interface Props {
  address?: string;
  balance?: number;
  isLoading?: boolean;
}

const LiquidityItem = ({ isLoading, address, balance }: Props) => {
  const { liquidityService } = useBaryonServices();
  const { findToken } = useUtility();
  const { data, isLoading: isLoadingInfo } = useQuery({
    queryKey: [QUERY_KEYS.POOL_INFO_ONCHAIN, address],
    queryFn: () =>
      liquidityService.getPoolInfoOnChain(
        address ?? '',
      ) as Promise<ILpInfoOnchainModel>,
    enabled: !!address,
  });

  if (isLoading || isLoadingInfo) {
    <Fragment>
      <div className="w-1/2">
        <Skeleton width={'100%'} height={24} />
      </div>{' '}
      <div className="w-1/2">
        <Skeleton width={'100%'} height={24} />
      </div>{' '}
    </Fragment>;
  }

  const token0 = findToken(data?.firstToken.address);
  const token1 = findToken(data?.secondToken.address);

  return (
    <div className="p-4 bg-background-secondary rounded-lg flex-between gap-2 text-base duration-300 cursor-pointer hover:bg-background-hover">
      <Fragment>
        <div className="flex items-center uppercase gap-1">
          <TokenPair token0={token0} token1={token1} separator=" - " />
        </div>
        <span>{formatReadableNumber(balance ?? 0)}</span>
      </Fragment>
    </div>
  );
};

export default LiquidityItem;
