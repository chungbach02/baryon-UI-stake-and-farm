'use client';

import CurrencyValue from '@/components/common/CurrencyValue';
import EmptyState from '@/components/ui/EmptyState';
import TokenPair from '@/components/ui/TokenPair';
import { DEFAULT_PAGINATION } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { PATHS } from '@/constants/paths';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import {
  IBaseResponse,
  IPaginationRequest,
  IPaginationResponse,
} from '@/types/base.model';
import { ILpWalletModel } from '@/types/wallet.mode';
import { formatReadableNumber } from '@/utils/format';
import { formatAddress } from '@dagora/utils';
import { Table } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  className?: string;
  search?: string;
  address?: string;
  sort?: string;
}

const TableLiquidity = ({ sort, search, address }: Props) => {
  const t = useTranslations();
  const { baryonApiService } = useBaryonServices();
  const router = useRouter();

  const [pagination, setPagination] = useState<IPaginationRequest>({
    page: DEFAULT_PAGINATION.PAGE_NUMBER,
    size: DEFAULT_PAGINATION.PAGE_SIZE,
  });

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.WALLETS_LP, pagination, sort, search, address],
    queryFn: () =>
      baryonApiService.adapters.get<
        IBaseResponse<IPaginationResponse<ILpWalletModel>>
      >(ENDPOINTS.WALLET_FILTER_LP, {
        params: {
          ...pagination,
          sortType: sort || 'amountUSD',
          address: search || address,
        },
      }),
  });

  return (
    <Table
      classNameTable="table-fixed ipad:table-auto"
      dataSource={get(data, 'data.data', [])}
      emptyRender={<EmptyState className="my-20" />}
      onClickRow={(row) => router.push(`${PATHS.WALLET}/${row.address}`)}
      isHoverLine
      columns={[
        {
          title: '',
          key: 'index',
          width: 3,
          render: (_, __, index) => {
            return <span>{++index}</span>;
          },
        },
        {
          title: t('common_account'),
          key: 'account',
          dataIndex: 'address',
          width: 20,
          render: (value) => {
            return (
              <div className="text-brand-primary">
                {formatAddress(String(value), 10)}
              </div>
            );
          },
        },
        {
          title: t('common_pair'),
          key: 'pair',
          width: 22,
          render: (_, row) => {
            return (
              <TokenPair
                token0={row.poolInfo.token0}
                token1={row.poolInfo.token1}
              />
            );
          },
        },
        {
          title: t('pool_token_1_amount'),
          key: 'token1',
          dataIndex: 'token0Amount',
          align: 'end',
          render: (value) => {
            return <CurrencyValue value={Number(value ?? 0)} />;
          },
        },
        {
          title: t('pool_token_2_amount'),
          key: 'token2',
          dataIndex: 'token1Amount',
          align: 'end',
          render: (value) => {
            return <CurrencyValue value={Number(value ?? 0)} />;
          },
        },
        {
          title: t('pool_lp_value'),
          key: 'amountUSD',
          dataIndex: 'amountUSD',
          align: 'end',
          render: (value) => {
            return <CurrencyValue value={Number(value ?? 0)} />;
          },
        },
        {
          title: t('pool_pool_share'),
          key: 'poolShare',
          dataIndex: 'poolShare',
          align: 'end',
          render: (value) => {
            return formatReadableNumber(Number(value ?? 0) * 100, {
              postfix: '%',
            });
          },
        },
      ]}
    />
  );
};

export default TableLiquidity;
