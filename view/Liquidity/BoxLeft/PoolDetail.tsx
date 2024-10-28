import CurrencyValue from '@/components/common/CurrencyValue';
import BoxDetailPool from '@/components/ui/BoxDetailPool';
import BoxSecondary from '@/components/ui/BoxSecondary';
import TokenInfo from '@/components/ui/TokenInfo';
import { useAddLiquidity } from '@/providers/AddLiquidityProvider';
import { useLiquidityInfo } from '@/providers/LiquidityInfoProvider';
import { formatReadableNumber } from '@/utils/format';
import { calculateLpReceive } from '@/utils/function';
import { formatAddress } from '@dagora/utils';
import { Icon, Skeleton, Tooltip } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useEffect } from 'react';

export const SkeletonPoolDetail = () => {
  return (
    <div>
      <div>
        <Skeleton width={'100%'} height={50} />
      </div>
      <BoxSecondary className="mt-4">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].fill(1).map((it, idx) => {
            return (
              <div key={idx}>
                <Skeleton height={20} width={'100%'} />
                <Skeleton height={20} width={'100%'} />
              </div>
            );
          })}
        </div>
      </BoxSecondary>

      <div className="mt-4">
        <BoxDetailPool isLoading />
      </div>
      <BoxSecondary className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(2)].map((it, idx) => {
            return (
              <div key={idx}>
                <Skeleton height={24} width={'100%'} />
                <Skeleton height={24} width={'100%'} />
              </div>
            );
          })}
        </div>
      </BoxSecondary>
    </div>
  );
};

interface Props {
  onBack: () => void;
}

const PoolDetail = ({ onBack }: Props) => {
  const t = useTranslations();
  const { token0, token1 } = useAddLiquidity();
  const { isLoading, poolInfo, isNotExist } = useLiquidityInfo();

  const token0Info =
    !isNotExist && get(poolInfo, 'info.token0')
      ? get(poolInfo, 'info.token0')
      : token0;
  const token1Info =
    !isNotExist && get(poolInfo, 'info.token1')
      ? get(poolInfo, 'info.token1')
      : token1;

  useEffect(() => {
    if (!token0Info || !token1Info) {
      onBack();
    }
  }, [token1Info, token0Info]);

  const total = [
    {
      title: t('common_liquidity'),
      volume: isNotExist ? 0 : (poolInfo?.liquidityUsd ?? 0),
    },
    {
      title: t('common_volume_24h'),
      volume: isNotExist ? 0 : (poolInfo?.volume24h ?? 0),
    },
    {
      title: t('common_fee_24h'),
      volume: isNotExist ? 0 : (poolInfo?.fee24h ?? 0),
    },
  ];
  const totalReward = [
    {
      title: t('liquidity_your_lp_farming'),
      volume: isNotExist ? 0 : 19.6,
    },
    {
      title: t('common_your_reward'),
      volume: isNotExist ? 0 : 19.6,
    },
  ];

  const dataPool = [
    {
      pool: get(token0Info, 'symbol', ''),
      address: get(token0Info, 'address', ''),
      link: '/',
      a: '/',
    },
    {
      pool: get(token1Info, 'symbol', ''),
      address: get(token1Info, 'address', ''),
      link: '/',
      a: '/',
    },
    {
      pool: t('liquidity_lp_pool'),
      address: get(poolInfo, 'poolAddress', ''),
      link: '/',
      a: '/',
    },
  ];

  const infoPool = () => {
    return (
      <div>
        <h6 className="text-brand-primary">{t('common_address')}</h6>
        <div className="flex flex-col space-y-2 mt-4">
          {dataPool.map((it, idx) => {
            return (
              <div key={idx} className="grid grid-cols-3 gap-4 items-center">
                <div className="uppercase text-xs whitespace-nowrap">
                  {it?.pool}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <span>{formatAddress(it?.address)}</span>
                  <div className="flex items-center mt-1 gap-2 text-txt-secondary">
                    <Link href={it?.link} className="hover:text-brand-primary">
                      <Icon size="xl" iconName="pool_info" />
                    </Link>
                    <a
                      href={it?.a}
                      className="hover:text-brand-primary"
                      target="_blank"
                    >
                      <Icon size="xl" iconName="pool_explore" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  if (isLoading) return <SkeletonPoolDetail />;

  return (
    <div>
      <div className="text-base flex items-center gap-4">
        <div className="flex items-center gap-2">
          <TokenInfo
            classNameMain="uppercase"
            token={{ img: token0Info?.image, name: token0Info?.symbol }}
          />{' '}
          /
          <TokenInfo
            classNameMain="uppercase"
            token={{ img: token1Info?.image, name: token1Info?.symbol }}
          />
        </div>
        {!isNotExist && (
          <div>
            <Tooltip
              direction="bottom"
              className="max-w-fit"
              trigger={infoPool()}
              id="poolDetail"
            >
              <Icon className="text-txt-secondary" iconName="info" />
            </Tooltip>
          </div>
        )}
      </div>
      <BoxSecondary className="mt-4">
        <div className="grid grid-cols-3">
          {total.map((it, idx) => {
            return (
              <div key={idx} className="flex-col gap-1 flex-center text-center">
                <span className="text-base">${it?.volume}</span>
                <span className="text-txt-secondary text-xs">{it?.title}</span>
              </div>
            );
          })}
        </div>
      </BoxSecondary>

      <div className="mt-4">
        <BoxDetailPool
          data={[
            {
              title: t('pool_your_pool_share'),
              content: formatReadableNumber(Number(poolInfo?.shareOfPool), {
                postfix: '%',
              }),
              background: '#f9e1e1',
            },
            {
              title: t('pool_your_pool_token'),
              content: <CurrencyValue value={0} />,
              background: '#cfe4f8',
            },
            {
              title: t('pool_pooled'),
              content: formatReadableNumber(
                poolInfo?.accountToken0Amount ?? 0,
                {
                  postfix: ` ${get(token0Info, 'symbol', '').toUpperCase()}`,
                },
              ),
              background: '#ddf2e8',
            },
            {
              title: t('pool_pooled'),
              content: formatReadableNumber(
                poolInfo?.accountToken1Amount ?? 0,
                {
                  postfix: ` ${get(token1Info, 'symbol', '').toUpperCase()}`,
                },
              ),
              background: '#fff8dd',
            },
          ]}
        />
      </div>
      <BoxSecondary className="mt-4">
        <div className="grid grid-cols-2">
          {totalReward.map((it, idx) => {
            return (
              <div
                key={idx}
                className="flex-col gap-1 flex-center text-center text-base"
              >
                <span>${it?.volume}</span>
                <span className="text-txt-secondary">{it?.title}</span>
              </div>
            );
          })}
        </div>
      </BoxSecondary>
    </div>
  );
};

export default PoolDetail;
