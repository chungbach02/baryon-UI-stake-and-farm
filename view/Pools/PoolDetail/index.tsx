'use client';

import ButtonBack from '@/components/ui/ButtonBack';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import TableTransaction from '../component/TableTransaction';
import PoolChart from './PoolChart';
import PoolDetailBox from './PoolDetailBox';
import { PATHS } from '@/constants/paths';

interface Props {
  address?: string;
}

const PoolDetail = ({ address }: Props) => {
  const t = useTranslations();
  const [tab, setTab] = useState<string>('volume');

  const tabData = [
    {
      title: t('common_volume'),
      value: 'volume',
    },
    {
      title: t('common_liquidity'),
      value: 'liquidity',
    },
  ];

  const dataDetail = [
    {
      title: t('pool_your_pool_share'),
      value: 0,
    },
    {
      title: t('pool_your_pool_token'),
      value: 0,
    },
    {
      title: t('pool_pooled'),
      value: 0,
      symbol: 'c98',
    },
    {
      title: t('pool_pooled'),
      value: 0,
      symbol: 'c98',
    },
  ];

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

  const isLoading = false;

  return (
    <div className="container">
      <ButtonBack href={PATHS.POOLS} title={t('pool_back_to_all_pools')} />
      <div className="phone:mt-4 mt-6 grid grid-cols-3 gap-6 ipad:gap-4 ipad:grid-cols-1">
        <PoolChart address={address} />
        <PoolDetailBox address={address} />
        <TableTransaction className="col-span-3 ipad:col-span-1" />
      </div>
    </div>
  );
};

export default PoolDetail;
