'use client';

import FavoriteList from '@/components/ui/FavoriteList';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { IBaseResponse } from '@/types/base.model';
import { ITokenStatisticalModel } from '@/types/token.model';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import BoxTop from '../component/BoxTop';
import TableTopToken from '../component/TableTopToken';

const Tokens = () => {
  const t = useTranslations();
  const { baryonApiService } = useBaryonServices();
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.TOKEN_STATISTICAL],
    queryFn: () =>
      baryonApiService.adapters.get<IBaseResponse<ITokenStatisticalModel>>(
        ENDPOINTS.TOKEN_STATISTICAL,
      ),
  });

  return (
    <div className="container space-y-6">
      <div className=" text-sm max-w-[75%] duration-200 mx-auto ipadPro:max-w-full">
        <FavoriteList className="gap-6 ipad:gap-4" />
      </div>
      {get(data, 'data') && 
      <div className="flex gap-6 ipad:flex-col text-base ipad:text-sm mt-6 justify-center">
        <BoxTop
          isSingle
          title={t('pool_trending')}
          items={get(data, 'data.trending', []).map((item) => ({
            token0: item.info,
          }))}
        />
        <BoxTop
          isSingle
          title={t('pool_gainer')}
          items={get(data, 'data.gainer', []).map((item) => ({
            token0: item.info,
            percent: Number(item.price_change_percentage_24h),
          }))}
        />
        <BoxTop
          isSingle
          title={t('pool_recently_added')}
          items={get(data, 'data.recentlyAdded', []).map((item) => ({
            token0: item.info,
            value: 1,
          }))}
        />
      </div>
      }
      <TableTopToken className="col-span-3" />
    </div>
  );
};

export default Tokens;
