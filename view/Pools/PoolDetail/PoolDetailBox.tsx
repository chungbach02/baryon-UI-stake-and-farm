'use client';

import BoxPrimary from '@/components/ui/BoxPrimary';
import BoxSecondary from '@/components/ui/BoxSecondary';
import TokenInfo from '@/components/ui/TokenInfo';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useUtility } from '@/hook/useUtility';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { IPoolModel } from '@/types/pool.model';
import { Button, Icon, Skeleton } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import BoxItemPool from '../component/BoxItemPool';

interface Props {
  address?: string;
}

const PoolDetailBox = ({ address }: Props) => {
  const t = useTranslations();
  const { activeChain } = useGlobalStore();
  const { findToken, findGeckoToken } = useUtility();
  const { baryonApiService, infoService } = useBaryonServices();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POOL_INFO],
    queryFn: () =>
      baryonApiService.base.post<IBaseResponse<IPoolModel>>(
        ENDPOINTS.POOL_INFO,
        { chain: activeChain, poolAddress: address },
      ),
  });

  const dataPair = [
    {
      background: '#f9e1e1',
      icon: 'volume_exchange',
      title: t('common_volume_24h'),
      volume: 3,
    },
    {
      background: '#cfe4f8',
      icon: 'direct_inbox',
      title: t('common_liquidity'),
      volume: 3,
    },
    {
      background: '#ddf2e8',
      icon: 'fee_percent',
      title: t('common_volume_7d'),
      volume: 3,
    },
    {
      background: '#fff8dd',
      icon: 'share_token',
      title: t('common_fee_24h'),
      volume: 3,
    },
  ];

  return (
    <BoxPrimary className="ipad:order-first">
      {isLoading && (
        <div className="flex flex-col gap-4">
          <Skeleton width={'100%'} height={24} />
          <Skeleton width={'100%'} height={32} />
          <Skeleton width={'100%'} height={32} />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex-between gap-4">
            <h6 className="text-txt-secondary">
              {t('pool_total_tokens_locked')}
            </h6>
            <a href="" target="_blank">
              <Icon
                isHover
                className="text-txt-secondary cursor-pointer hover:text-brand-primary"
                size="xxl"
                iconName="pool_explore"
              />
            </a>
          </div>
          <div className="flex-between gap-4 mt-4 text-xl uppercase">
            <TokenInfo
              size="xl"
              token={{
                img:
                  get(data, 'data.info.token0.image') ||
                  get(data, 'data.info.token0.logoURI'),
                name: get(data, 'data.info.token0.symbol'),
              }}
            />
            <span>126.2k</span>
          </div>
          <div className="flex-between gap-4 mt-4 text-xl uppercase">
            <TokenInfo
              size="xl"
              token={{
                img:
                  get(data, 'data.info.token1.image') ||
                  get(data, 'data.info.token1.logoURI'),
                name: get(data, 'data.info.token1.symbol'),
              }}
            />
            <span>126.2k</span>
          </div>
        </>
      )}
      <div className="grid grid-cols-2 gap-4 mt-4 text-txt-secondary text-xs uppercase">
        {isLoading ? (
          <>
            <Skeleton width={'100%'} height={32} />
            <Skeleton width={'100%'} height={32} />
          </>
        ) : (
          <>
            <BoxSecondary className="py-2 px-2">1 oid = 0.34 dd18</BoxSecondary>
            <BoxSecondary className="py-2 px-2">1 oid = 0.34 dd18</BoxSecondary>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {isLoading && [
          ...Array(4)
            .fill(1)
            .map((it, idx) => {
              return (
                <div className="aspect-square rounded-xl overflow-hidden">
                  <Skeleton width={'100%'} height={'100%'} />
                </div>
              );
            }),
        ]}
        {!isLoading &&
          dataPair.map((it, idx) => {
            return <BoxItemPool {...it} key={idx} />;
          })}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center flex flex-col gap-2 text-xs">
          <Button color="secondary" isBlock>
            <Icon size="xxl" iconName="add_liquidity" />
          </Button>
          <label className="text-txt-secondary">
            {t('pool_add_liquidity')}
          </label>
        </div>
        <div className="text-center flex flex-col gap-2">
          <Button isBlock>
            <Icon size="xxl" iconName="swap" />
          </Button>
          <label className="text-txt-secondary">{t('common_swap')}</label>
        </div>
      </div>
    </BoxPrimary>
  );
};

export default PoolDetailBox;
