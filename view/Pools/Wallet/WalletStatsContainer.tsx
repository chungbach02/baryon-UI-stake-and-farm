'use client';

import BoxSecondary from '@/components/ui/BoxSecondary';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { IWalletAddressInfoModel } from '@/types/wallet.mode';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import CountUp from 'react-countup';

interface Props {
  address?: string;
  className?: string;
}

const WalletStatsContainer = ({ address, className }: Props) => {
  const t = useTranslations();
  const { currency, priceRate } = useGlobalStore();
  const { baryonApiService } = useBaryonServices();

  const { data: dataStats } = useQuery({
    queryKey: [QUERY_KEYS.WALLET_STATS, address],
    queryFn: () =>
      baryonApiService.adapters.get<IBaseResponse<IWalletAddressInfoModel>>(
        ENDPOINTS.WALLET_ADDRESS_INFO,
        {
          params: { address },
        },
      ),
  });

  const data = [
    {
      title: t('pool_total_value_locked'),
      value: get(dataStats, 'data.tvl', 0),
    },
    {
      title: t('pool_pool_farming'),
      value: get(dataStats, 'data.poolFarming', 0),
    },
    {
      title: t('pool_pool_staked'),
      value: get(dataStats, 'data.poolStaked', 0),
    },
  ];

  return (
    <BoxSecondary className="h-full flex-center justify-between flex-col gap-6 p-6">
      {data.map((it, idx) => {
        return (
          <div key={idx} className="flex-center flex-col gap-2 text-center">
            <div className="text-3xl ipad:text-2xl">
              <CountUp start={0} end={it?.value} duration={2.75} />
            </div>
            <span>{it?.title}</span>
          </div>
        );
      })}
    </BoxSecondary>
  );
};

export default WalletStatsContainer;
