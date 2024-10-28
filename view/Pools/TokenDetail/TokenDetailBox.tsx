'use client';

import CurrencyValue from '@/components/common/CurrencyValue';
import BoxPrimary from '@/components/ui/BoxPrimary';
import Tag from '@/components/ui/Tag';
import TokenInfo from '@/components/ui/TokenInfo';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import useTokenDetail from '@/hook/useTokenDetail';
import { useUtility } from '@/hook/useUtility';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { IGeckoTokenDetailModel, ITokenDetailModel } from '@/types/token.model';
import { formatReadableNumber } from '@/utils/format';
import { Button, Icon, Skeleton } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import BoxItemPool from '../component/BoxItemPool';

interface Props {
  address?: string;
}

const TokenDetailBox = ({ address }: Props) => {
  const t = useTranslations();
  const { findToken } = useUtility();
  const { activeChain } = useGlobalStore();
  const { baryonApiService, infoService } = useBaryonServices();
  const token = useMemo(() => findToken(address), [address, findToken]);
  const { token: geckoToken } = useTokenDetail(token?.cgkId);
  const isLoading = false;

  const { data } = useQuery<IGeckoTokenDetailModel>({
    queryKey: [QUERY_KEYS.TOKEN_DETAIL, token?.cgkId],
    queryFn: () =>
      infoService.baseAPI.get(ENDPOINTS.COIN_CGK_DETAIL, {
        params: { id: token?.cgkId },
      }),
    enabled: !!token?.cgkId,
  });

  const { data: dataTokenInfo } = useQuery<IBaseResponse<ITokenDetailModel>>({
    queryKey: [QUERY_KEYS.TOKEN_DETAIL, address, activeChain],
    queryFn: () =>
      baryonApiService.base.post<IBaseResponse<ITokenDetailModel>>(
        ENDPOINTS.TOKEN_INFO,
        {
          tokenAddress: address,
          chain: activeChain,
        },
      ),
    enabled: !!address,
  });

  const tokenInfo = useMemo(() => {
    const tokenInfo = { ...findToken(address) };

    const price = get(data, 'market_data.current_price.usd', 0);
    const priceChange = get(
      data,
      'market_data.price_change_24h_in_currency.usd',
      0,
    );
    return {
      ...tokenInfo,
      ...dataTokenInfo?.data,
      price,
      priceChange,
    };
  }, [findToken, data, dataTokenInfo]);

  const dataPair = [
    {
      background: '#f9e1e1',
      icon: 'volume_exchange',
      title: t('common_volume_24h'),
      value: tokenInfo.volume24h,
      percent: tokenInfo.volume24hChange,
    },
    {
      background: '#cfe4f8',
      icon: 'direct_inbox',
      title: t('common_liquidity'),
      value: tokenInfo.liquidity,
      percent: tokenInfo.liquidity24hChange,
    },
    {
      background: '#ddf2e8',
      icon: 'fee_percent',
      title: t('common_volume_7d'),
      value: tokenInfo.volume7d,
    },
    {
      background: '#fff8dd',
      icon: 'share_token',
      title: t('pool_transaction_24h'),
      value: tokenInfo.transaction24h,
      isCurrency: false,
    },
  ];

  return (
    <BoxPrimary className="ipad:order-first">
      {isLoading && (
        <div className="flex flex-col gap-6 ">
          <Skeleton width={'100%'} height={32} />
          <Skeleton width={'100%'} height={40} />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex-between gap-4">
            <TokenInfo
              classNameMain="capitalize"
              size="lg"
              dir="hor"
              className="text-2xl"
              classNameSub="text-txt-secondary uppercase"
              token={{
                img: tokenInfo.image,
                name: tokenInfo.name,
                subName: tokenInfo.symbol,
              }}
            />
            <Link href="" target="_blank">
              <Icon
                isHover
                className="text-txt-secondary cursor-pointer hover:text-brand-primary"
                size="xxl"
                iconName="pool_explore"
              />
            </Link>
          </div>
          <div className="flex-between gap-4 mt-6">
            <div className="text-4xl">
              <CurrencyValue value={Number(geckoToken?.current_price ?? 0)} />
            </div>
            <Tag
              type={
                Number(geckoToken?.price_change_percentage_24h) > 0
                  ? 'success'
                  : 'error'
              }
            >
              {formatReadableNumber(
                Number(geckoToken?.price_change_percentage_24h ?? 0),
                {
                  postfix: '%',
                },
              )}
            </Tag>
          </div>
        </>
      )}
      <div className="grid grid-cols-2 gap-4 mt-6 ipad:mt-4">
        {isLoading && [
          ...Array(4)
            .fill(1)
            .map((_, idx) => {
              return (
                <div
                  className="aspect-square rounded-xl overflow-hidden"
                  key={idx}
                >
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
      <Button className="mt-6 ipad:mt-4" isBlock>
        {t('common_swap')}
      </Button>
    </BoxPrimary>
  );
};

export default TokenDetailBox;
