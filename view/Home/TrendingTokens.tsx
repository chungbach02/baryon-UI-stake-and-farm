'use client';

import CurrencyValue from '@/components/common/CurrencyValue';
import Tag from '@/components/ui/Tag';
import { TokenImg } from '@/components/ui/TokenImg';
import { DEFAULT_CHART_FILTER, DEFAULT_PAGINATION } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useUtility } from '@/hook/useUtility';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse, IPaginationResponse } from '@/types/base.model';
import { IChartTokenModel } from '@/types/chart.model';
import { IGeckoTokenModel, ITokenModel } from '@/types/token.model';
import { formatReadableNumber } from '@/utils/format';
import { AreaChart, Skeleton } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { compact, find, get } from 'lodash';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const dataFake = [...Array(8)].fill(1).map((item, index) => {
  return {};
});

export const SkeletonExplore = () => {
  return (
    <div className="rounded-lg bg-background-primary p-5">
      <Skeleton width={'100%'} height={24} />
      <div className="mt-1">
        <Skeleton width={'100%'} height={24} />
      </div>
      <Skeleton width={'100%'} height={17} />
      <div className="w-full h-28 mt-2">
        <Skeleton width={'100%'} height={'100%'} />
      </div>
    </div>
  );
};

const TrendingToken = () => {
  const t = useTranslations();
  const { activeChain } = useGlobalStore();
  const { findGeckoToken } = useUtility();
  const { baryonApiService, infoService } = useBaryonServices();
  const [topList, setTopList] =
    useState<((Partial<IGeckoTokenModel> & ITokenModel) | undefined)[]>();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.TOKEN_TOP, activeChain],
    queryFn: () =>
      baryonApiService.base.post<
        IBaseResponse<IPaginationResponse<ITokenModel>>
      >(ENDPOINTS.TOKEN_TOP, {
        chain: activeChain,
        page: DEFAULT_PAGINATION.PAGE_NUMBER,
        size: DEFAULT_PAGINATION.PAGE_SIZE,
      }),
  });

  const idList = get(data, 'data.data', []).map((token: any) =>
    get(token, 'info.id'),
  );

  const { data: chartData = [] } = useQuery({
    queryKey: [QUERY_KEYS.TOKEN_CHART, activeChain, JSON.stringify(idList)],
    queryFn: () =>
      infoService.baseAPI.get<IChartTokenModel[]>(
        `${ENDPOINTS.COIN_CGK_CHART}?day=7&interval=${DEFAULT_CHART_FILTER.INTERVAL}&isMinimize=${DEFAULT_CHART_FILTER.IS_MINIMIZE}&idList=${idList.join('&idList=')}`,
      ),
  });
  useEffect(() => {
    if (data) {
      Promise.all(
        get(data, 'data.data')
          .slice(0, 8)
          .map(async (token: any) => {
            const geckoToken = await findGeckoToken(get(token, 'info.id', ''));
            return { ...geckoToken, ...token };
          }),
      ).then((list) => console.log(list));
    }
  }, [data]);

  if ((!isLoading && !chartData?.length) || !topList?.length) {
    return;
  }

  return (
    <div>
      <h2 className="flex-center text-center">{t('home_explore_trending')}</h2>
      <div className="grid grid-cols-4 ipad:grid-cols-2 phone:grid-cols-1 gap-6 ipadPro:gap-4 mt-14">
        {isLoading && [
          ...Array(8)
            .fill(1)
            .map((it, idx) => {
              return <SkeletonExplore key={idx} />;
            }),
        ]}
        {!isLoading &&
          compact(topList).map((token, idx) => {
            return (
              <Link
                href={''}
                className="rounded-lg bg-background-primary p-5 border border-transparent hover:border-brand-primary duration-300"
                key={idx}
              >
                <div className="flex-between gap-2">
                  <TokenImg src={get(token, 'info.image')} />
                  <CurrencyValue value={Number(token.current_price ?? 0)} />
                </div>
                <div className="flex-between gap-2 mt-1">
                  <span className="text-base">{get(token, 'info.name')}</span>
                  <Tag
                    type={
                      Number(token?.price_change_percentage_24h) > 0
                        ? 'success'
                        : 'error'
                    }
                  >
                    {formatReadableNumber(
                      Number(token?.price_change_percentage_24h ?? 0),
                      {
                        postfix: '%',
                      },
                    )}
                  </Tag>{' '}
                </div>
                <span className="uppercase text-txt-secondary text-sm">
                  {get(token, 'info.symbol')}
                </span>
                <div className="w-full h-28 mt-2">
                  <AreaChart
                    data={get(
                      chartData.find((t: any) => t.id === token.info.id),
                      'data',
                      [],
                    ).map((value: any, i: any) => ({
                      label: String(i),
                      value: value,
                    }))}
                    isPointVolume={false}
                    withHorizontal={false}
                    withVertical={false}
                    stroke=""
                  />
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default TrendingToken;
