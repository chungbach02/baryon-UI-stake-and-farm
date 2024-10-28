'use client';

import BoxPrimary from '@/components/ui/BoxPrimary';
import { BARYON_CHAIN_DATA_LIST, CHAIN_DATA } from '@/constants/chain';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useFilterParams } from '@/hook/useFilterParams';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { IBaseResponse } from '@/types/base.model';
import { ICampaignStatisticModel } from '@/types/snapshot.model';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { Icon, Option, SelectDropdown, TabButton } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { find, get } from 'lodash';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import Banner from './Banner';
import SnapContainer from './component/SnapContainer';

const Snapshot = () => {
  const t = useTranslations();
  const { address } = useWallet();
  const { baryonApiService } = useBaryonServices();

  const sortOptions = [
    {
      title: t('common_earliest'),
      value: 'earliest',
    },
    {
      title: t('common_latest'),
      value: 'latest',
    },
  ];

  const chainOptions = [
    { title: t('common_all_chain'), value: 'all' },
    ...BARYON_CHAIN_DATA_LIST.map(({ chain, name }) => ({
      title: name,
      value: chain,
    })),
  ];

  const { data: dataStatistical } = useQuery({
    queryKey: [QUERY_KEYS.SNAPSHOT_CAMPAIGN_STATISTICAL],
    queryFn: () => {
      return baryonApiService.base.get<IBaseResponse<ICampaignStatisticModel>>(
        ENDPOINTS.SNAPSHOT_CAMPAIGN_STATISTICAL,
        {
          params: { address, from: 'C98BARYDMWN' },
        },
      );
    },
    enabled: false,
    initialData: {
      success: true,
      status: 200,
      data: {
        upComing: 0,
        completed: 2,
        onGoing: 0,
        participated: 0,
        total: 2,
      },
    },
  });

  const statusTabs = [
    {
      label: t('common_all'),
      value: 'all',
      count: get(dataStatistical, 'data.total', 0),
    },
    {
      label: t('common_on_going'),
      value: 'onGoing',
      count: get(dataStatistical, 'data.onGoing', 0),
    },
    {
      label: t('common_upComing'),
      value: 'upComing',
      count: get(dataStatistical, 'data.upComing', 0),
    },
    {
      label: t('common_completed'),
      value: 'completed',
      count: get(dataStatistical, 'data.completed', 0),
    },
    {
      label: t('common_participated'),
      value: 'participated',
      count: get(dataStatistical, 'data.total', 0),
    },
  ];

  const { params, setParams } = useFilterParams<{
    sort: string;
    chain: string;
    status: string;
  }>({
    status: statusTabs[0].value,
    chain: chainOptions[0].value,
    sort: sortOptions[0].value,
  });

  const dropdownChain = ({
    itemData,
    selected,
  }: {
    itemData: Option;
    selected: boolean;
  }) => {
    return (
      <div
        className={twMerge(
          'flex items-center gap-2 py-3 px-4 w-full',
          selected && 'bg-background-hover',
        )}
      >
        <Icon
          className={twMerge(selected && 'text-brand-primary')}
          iconName={get(CHAIN_DATA, itemData.value)?.image}
        />
        <span className="text-txt-secondary whitespace-nowrap">
          {itemData.title}
        </span>
      </div>
    );
  };
  return (
    <div className="container">
      <Banner />
      <div className="mt-6">
        <BoxPrimary className="flex-between gap-4 px-8 py-0 ipadPro:p-4 ipadPro:flex-col">
          <div className="flex items-center gap-6 phoneSm:w-full phoneSm:overflow-auto">
            {statusTabs.map((it, idx) => {
              const isActive = params.status === it?.value;
              return (
                <TabButton
                  key={idx}
                  onClick={() => setParams({ status: it?.value })}
                  variant={'line'}
                  isSelected={isActive}
                  className="gap-1 flex-center px-0 font-light py-8 ipadPro:py-4"
                >
                  <span>{it.label}</span>{' '}
                  {it?.count != undefined && (
                    <span
                      className={twMerge(
                        'text-txt-secondary',
                        isActive && 'text-txt-primary',
                      )}
                    >
                      ({it?.count})
                    </span>
                  )}
                </TabButton>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <SelectDropdown
              classNameItem="p-0"
              menuListClassName="w-max"
              dropdownItem={dropdownChain}
              selected={find(chainOptions, { value: params.chain })}
              options={chainOptions}
              onSelected={(opt) => setParams({ chain: opt.value })}
            />
            <SelectDropdown
              menuListClassName="w-max"
              selected={find(sortOptions, { value: params.sort })}
              options={sortOptions}
              onSelected={(opt) => setParams({ sort: opt.value })}
            />
          </div>
        </BoxPrimary>
      </div>
      <div className="mt-6 relative z-10 min-h-[50vh]">
        <SnapContainer chain={params.chain ?? ''} sort={params.sort ?? ''} />
      </div>
    </div>
  );
};

export default Snapshot;
