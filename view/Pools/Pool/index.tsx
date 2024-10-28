'use client';

import FavoriteList from '@/components/ui/FavoriteList';
import { ENDPOINTS } from '@/constants/endpoints';
import { EndpointGenerator } from '@/constants/generatePath';
import { QUERY_KEYS } from '@/constants/keys';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { IPoolModel, IPoolStatisticalModel } from '@/types/pool.model';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import BoxTop from '../component/BoxTop';
import TableTopPools from '../component/TableTopPools';

const Pool = () => {
  const t = useTranslations();
  const router = useRouter();
  const { activeChain } = useGlobalStore();
  const { baryonApiService } = useBaryonServices();

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.POOL_STATISTICAL, activeChain],
    queryFn: () =>
      baryonApiService.adapters.get<IBaseResponse<IPoolStatisticalModel>>(
        ENDPOINTS.POOL_STATISTICAL,
        {
          params: {
            chain: activeChain,
          },
        },
      ),
  });

  const handleClick = (token?: IPoolModel) => {
    router.push(
      EndpointGenerator.getTokenPoolDetail(
        get(token, 'poolAddress', ''),
        false,
      ),
    );
  };

  return (
    <div className="container space-y-6">
      <div className=" text-sm max-w-[75%] duration-200 mx-auto ipadPro:max-w-full">
        <FavoriteList onClickPool={handleClick} isPool />
      </div>
      {get(data, 'data') &&  
      <div className="flex gap-6 ipad:flex-col text-base ipad:text-sm mt-6 justify-center">
        <BoxTop
          isLoading={isPending}
          items={get(data, 'data.popular', []).map((item) => ({
            token0: item.info.token0,
            token1: item.info.token1,
            poolAddress: item.poolAddress,
            value: item.liquidity,
          }))}
          title={t('pool_popular')}
        />
        <BoxTop
          isLoading={isPending}
          items={get(data, 'data.topVolume24h', []).map((item) => ({
            token0: item.info.token0,
            token1: item.info.token1,
            value: item.volume24h,
            poolAddress: item.poolAddress,
          }))}
          title={t('pool_top_volume_24h')}
        />
        <BoxTop
          isLoading={isPending}
          items={get(data, 'data.topLiquidity', []).map((item) => ({
            token0: item.info.token0,
            token1: item.info.token1,
            value: item.liquidity,
            poolAddress: item.poolAddress,
          }))}
          title={t('pool_top_liquidity')}
        />
      </div>
      }
      <TableTopPools />
    </div>
  );
};

export default Pool;
