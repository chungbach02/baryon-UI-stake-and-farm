'use client';

import BoxPrimary from '@/components/ui/BoxPrimary';
import Statistic from '@/components/ui/Statistic';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useFilterParams } from '@/hook/useFilterParams';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { IBaseResponse } from '@/types/base.model';
import { IWalletStatisticalModel } from '@/types/wallet.mode';
import { Input, SelectDropdown, TabButton } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { find, get } from 'lodash';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import TableTransaction from '../component/TableTransaction';
import TableFarm from './TableFarm';
import TableLiquidity from './TableLiquidity';
import TableStake from './TableStake';
import WalletDetail from './WalletDetail';

interface Props {
  address?: string;
}

const Wallet = ({ address }: Props) => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<String>('liquidityProvider');
  const { baryonApiService } = useBaryonServices();
  const [sortOptions, setSortOptions] = useState([
    { title: t('pool_lp_value'), value: 'amountUSD' },
    { title: t('pool_pool_share'), value: 'poolShare' },
  ]);

  const { params, setParams } = useFilterParams<{
    sort: string;
    search: string;
  }>({
    sort: sortOptions[0].value,
  });

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.WALLET_ADDRESS_STATISTICAL],
    queryFn: () =>
      baryonApiService.adapters.get<IBaseResponse<IWalletStatisticalModel>>(
        ENDPOINTS.WALLET_ADDRESS_STATISTICAL,
      ),
  });

  const itemsTab = [
    {
      title: t('pool_liquidity_provider'),
      value: 'liquidityProvider',
    },
    {
      title: t('common_farm'),
      value: 'farm',
    },
    {
      title: t('common_stake'),
      value: 'stake',
    },
  ];

  useEffect(() => {
    if (activeTab === 'farm') {
      setSortOptions([
        { title: t('pool_lp_value'), value: 'amountUSD' },
        { title: t('common_apr'), value: 'apr' },
      ]);
    }
    if (activeTab === 'stake') {
      setSortOptions([
        { title: t('pool_token_value'), value: 'amountUSD' },
        { title: t('common_apr'), value: 'apr' },
      ]);
    }
    if (activeTab === 'liquidity_providers') {
      setSortOptions([
        { title: t('pool_lp_value'), value: 'amountUSD' },
        { title: t('pool_pool_share'), value: 'poolShare' },
      ]);
    }
  }, [activeTab]);

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-6 ipad:gap-4 ipad:grid-cols-2">
        <BoxPrimary>
          <Statistic
            title={t('pool_total_active_addresses')}
            value={get(data, 'data.totalAddressActive', 0)}
            decimals={0}
          />
        </BoxPrimary>
        <BoxPrimary>
          <Statistic
            title={t('pool_liquidity_provider')}
            value={get(data, 'data.liquidityProvider', 0)}
          />
        </BoxPrimary>
        <BoxPrimary>
          <Statistic
            title={t('pool_account_farming')}
            value={get(data, 'data.accountFarming', 0)}
            decimals={0}
          />
        </BoxPrimary>
        <BoxPrimary>
          <Statistic
            title={t('pool_account_staked')}
            value={get(data, 'data.accountStaked', 0)}
            decimals={0}
          />
        </BoxPrimary>
      </div>
      {address && (
        <BoxPrimary className="mt-6">
          <WalletDetail address={address} />
        </BoxPrimary>
      )}
      <BoxPrimary className="mt-6">
        <div className="flex-between gap-4 ipad:flex-col">
          <div className="flex items-center gap-4 phone:overflow-auto phone:w-full">
            {itemsTab.map((it, idx) => {
              const isActive = activeTab === it?.value;
              return (
                <TabButton
                  isSelected={isActive}
                  key={idx}
                  onClick={() => setActiveTab(it?.value)}
                >
                  {it?.title}
                </TabButton>
              );
            })}
          </div>
          <div className="flex items-center gap-4 phone:w-full">
            <Input
              className="min-w-[260px] phone:w-full phone:min-w-0"
              placeholder={t('common_search_by_address')}
              isSearch
            />
          <SelectDropdown
              className="phone:!w-1/2"
              selected={sortOptions.find((opt) => opt.value === params.sort)}
              options={sortOptions}
              onSelected={(opt) => setParams({ sort: opt.value })}
            />
          </div>
        </div>
        <div className="mt-6 text-base ipad:text-sm min-h-[40vh]">
          {activeTab === 'liquidityProvider' && (
            <TableLiquidity sort={params.sort} search={params.search} />
          )}
          {activeTab === 'farm' && (
            <TableFarm sort={params.sort} search={params.search} />
          )}
          {activeTab === 'stake' && (
            <TableStake sort={params.sort} search={params.search} />
          )}
        </div>
      </BoxPrimary>
      <TableTransaction className="mt-6" />
    </div>
  );
};

export default Wallet;
