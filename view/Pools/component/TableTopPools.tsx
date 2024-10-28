'use client';

import CurrencyValue from '@/components/common/CurrencyValue';
import EmptyState from '@/components/ui/EmptyState';
import TokenPair from '@/components/ui/TokenPair';
import { DEFAULT_PAGINATION, DURATION } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { EndpointGenerator } from '@/constants/generatePath';
import { QUERY_KEYS } from '@/constants/keys';
import { useFavorite } from '@/hook/useFavorite';
import { useFilterParams } from '@/hook/useFilterParams';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse, IPaginationResponse } from '@/types/base.model';
import { IPoolModel } from '@/types/pool.model';
import { PaginationParams } from '@baryon/sdk';
import {
  Card,
  Icon,
  PieLoading,
  SelectDropdown,
  Table,
  Tooltip,
  useBreakPoint,
} from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { find, get } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  tokenAddress?: string;
}

const TableTopPools = ({ className, tokenAddress }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const { takeFavoritePool, isFavoritePools } = useFavorite();

  const sortOptions = [
    { title: t('common_liquidity'), value: 'totalLiquidity' },
    { title: t('common_apr'), value: 'apr' },
    { title: t('common_volume_24h'), value: 'volume24h' },
    { title: t('common_volume_7d'), value: 'volume7d' },
    { title: t('common_fees'), value: 'fees' },
  ];

  const { isIpad } = useBreakPoint();
  const { activeChain } = useGlobalStore();
  const { baryonApiService } = useBaryonServices();

  const { params, setParams } = useFilterParams<
    PaginationParams & { sort: string }
  >({
    page: DEFAULT_PAGINATION.PAGE_NUMBER,
    size: DEFAULT_PAGINATION.PAGE_SIZE,
    sort: sortOptions[0].value,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.POOL_FILTER, params, activeChain],
    queryFn: () =>
      baryonApiService.adapters.get<
        IBaseResponse<IPaginationResponse<IPoolModel>>
      >(ENDPOINTS.POOL_FILTER, {
        params: { chain: activeChain, ...params, tokenAddress },
      }),
    placeholderData: (prev) => prev,
  });

  return (
    <Card
      className={twMerge('rounded-xl overflow-visible ipad:p-4', className)}
      title={<h4>{t('pool_top_pools')}</h4>}
      extra={
        <div className="flex items-center gap-4">
          <SelectDropdown
            selected={find(sortOptions, { value: params.sort })}
            options={sortOptions}
            onSelected={(opt) => setParams({ sort: opt.value })}
          />
          <Tooltip id="topTokens" trigger={t('common_data_auto_refresh')}>
            <PieLoading
              size={20}
              duration={DURATION.PIE_LOADING}
              onComplete={refetch}
            />
          </Tooltip>
        </div>
      }
    >
      <Table
      className='min-h-[400px]'
        isLoading={isLoading}
        isHoverLine
        emptyRender={<EmptyState className="my-20" />}
        dataSource={get(data, 'data.data', [])}
        pagination={{
          current: get(data, 'data.currentPage', params.page),
          pageSize: params.size,
          totalPage: get(data, 'data.total', 1),
          onChange: (page) => setParams({ page }),
        }}
        onClickRow={(row) =>
          router.push(
            EndpointGenerator.getTokenPoolDetail(row.poolAddress, false),
          )
        }
        columns={[
          {
            title: '',
            key: 'like',
            width: 3,
            render: (_, row) => {
              const isFavorite = isFavoritePools(row.poolAddress);
              return (
                <Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    takeFavoritePool(row ? [row] : []);
                  }}
                  isHover
                  className={twMerge(isFavorite && 'text-brand-primary')}
                  iconName={isFavorite ? 'like_active' : 'like'}
                />
              );
            },
          },

          {
            title: '',
            key: 'index',
            width: 3,
            hide: isIpad,
            render: (_, __, index) => {
              return <span>{++index}</span>;
            },
          },
          {
            title: t('common_pool'),
            key: 'pool',
            width: 20,
            render: (_, row) => {
              return (
                <TokenPair token0={row.info.token0} token1={row.info.token1} />
              );
            },
          },
          {
            title: t('common_liquidity'),
            key: 'liquidity',
            dataIndex: 'liquidity',
            width: 20,
            align: 'end',
            hide: isIpad,
            render: (value) => <CurrencyValue value={Number(value ?? 0)} />,
          },
          {
            title: t('common_volume_24h'),
            key: 'volume2h',
            dataIndex: 'volume24h',
            width: 15,
            align: 'end',
            render: (value) => <CurrencyValue value={Number(value ?? 0)} />,
          },
          {
            title: t('common_volume_7d'),
            key: 'volume7d',
            dataIndex: 'volume7d',
            width: 15,
            align: 'end',
            hide: isIpad,
            render: (value) => <CurrencyValue value={Number(value ?? 0)} />,
          },
          {
            title: t('common_fees'),
            key: 'fees',
            dataIndex: 'fee24h',
            width: 15,
            align: 'end',
            hide: isIpad,
            render: (value) => <CurrencyValue value={Number(value ?? 0)} />,
          },
          {
            title: t('common_apr'),
            key: 'apr',
            dataIndex: 'feeAPR',
            width: 15,
            align: 'end',
            hide: isIpad,
            render: (value) => <CurrencyValue value={Number(value ?? 0)} />,
          },
        ]}
      />
    </Card>
  );
};

export default TableTopPools;
