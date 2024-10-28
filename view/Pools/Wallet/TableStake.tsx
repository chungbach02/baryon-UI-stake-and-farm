'use client';

import CurrencyValue from '@/components/common/CurrencyValue';
import EmptyState from '@/components/ui/EmptyState';
import { TokenImg } from '@/components/ui/TokenImg';
import TokenInfo from '@/components/ui/TokenInfo';
import { DEFAULT_PAGINATION } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { PATHS } from '@/constants/paths';
import { useUtility } from '@/hook/useUtility';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import {
  IBaseResponse,
  IPaginationRequest,
  IPaginationResponse,
} from '@/types/base.model';
import { IFarmStakeWalletModel } from '@/types/wallet.mode';
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

const TableStake = ({ sort, search, address }: Props) => {
  const t = useTranslations();
  const { findToken } = useUtility();
  const { baryonApiService } = useBaryonServices();
  const router = useRouter();

  const [pagination, setPagination] = useState<IPaginationRequest>({
    page: DEFAULT_PAGINATION.PAGE_NUMBER,
    size: DEFAULT_PAGINATION.PAGE_SIZE,
  });

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.WALLETS_FARM, pagination, sort, search, address],
    queryFn: () =>
      baryonApiService.adapters.get<
        IBaseResponse<IPaginationResponse<IFarmStakeWalletModel>>
      >(ENDPOINTS.WALLET_FILTER_FARM_STAKE, {
        params: {
          ...pagination,
          sortType: sort || 'amountUSD',
          type: 'stake',
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
          render: (address) => {
            return (
              <div className="text-brand-primary">
                {formatAddress(String(address), 10)}
              </div>
            );
          },
        },
        {
          title: t('common_token'),
          key: 'token',
          width: 15,
          render: (_, row) => {
            return (
              <TokenInfo
                classNameMain="uppercase"
                token={{
                  img: get(row, 'tokenIn[0].image'),
                  name: get(row, 'tokenIn[0].symbol'),
                }}
              />
            );
          },
        },
        {
          title: t('common_apr'),
          key: 'apr',
          dataIndex: 'apr',
          width: 15,
          align: 'end',
          render: (value) => (
            <span>
              {formatReadableNumber(Number(value ?? 0), { postfix: '%' })}
            </span>
          ),
        },
        {
          title: t('common_status'),
          key: 'status',
          dataIndex: 'status',
          width: 15,
          align: 'end',
          render: (status) => (
            <div className="text-txt-yellow capitalize">{String(status)}</div>
          ),
        },
        {
          title: t('pool_token_value'),
          key: 'amountUSD',
          dataIndex: 'amountUSD',
          width: 15,
          align: 'end',
          render: (value) => <CurrencyValue value={Number(value ?? 0)} />,
        },
        {
          title: t('common_earn'),
          key: 'earn',
          align: 'end',
          width: 5,
          render: (_, row) => {
            return (
              <div className="flex gap-2">
                {get(row, 'tokenOut', []).map((token) => {
                  const tokenInfo = findToken(get(token, 'mintAddress', ''));
                  return (
                    <TokenImg
                      src={get(tokenInfo, 'image')}
                      key={token.address}
                    />
                  );
                })}
              </div>
            );
          },
        },
      ]}
    />
  );
};

export default TableStake;
